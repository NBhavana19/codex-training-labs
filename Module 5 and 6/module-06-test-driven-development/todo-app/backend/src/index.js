const express = require('express');
const cors = require('cors');
const { randomUUID } = require('crypto');

function validateTaskPayload(payload) {
  if (!payload || typeof payload.title !== 'string' || !payload.title.trim()) {
    return 'Task title is required.';
  }

  return null;
}

function createTask(payload) {
  return {
    id: randomUUID(),
    title: payload.title.trim(),
    notes: payload.notes ? String(payload.notes).trim() : '',
    due: payload.due || null,
    completed: false,
    createdAt: new Date().toISOString()
  };
}

function toggleTaskCompletion(tasks, taskId) {
  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    return null;
  }

  task.completed = !task.completed;
  return task;
}

function createApp(initialTasks = []) {
  const app = express();
  const tasks = [...initialTasks];

  app.use(cors({ origin: '*' }));
  app.use(express.json());

  app.get('/tasks', (req, res) => {
    res.json(tasks);
  });

  app.post('/tasks', (req, res) => {
    const validationError = validateTaskPayload(req.body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const task = createTask(req.body);
    tasks.unshift(task);
    res.status(201).json(task);
  });

  app.patch('/tasks/:id/complete', (req, res) => {
    const task = toggleTaskCompletion(tasks, req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    res.json(task);
  });

  app.use((err, req, res, next) => {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  });

  return app;
}

function startServer(port = process.env.PORT || 4000) {
  const app = createApp();
  return app.listen(port, () => {
    console.log(`ToDo backend listening on http://localhost:${port}`);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = {
  createApp,
  createTask,
  startServer,
  toggleTaskCompletion,
  validateTaskPayload
};
