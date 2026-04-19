const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const tasks = [];
let nextId = 1;
const PRIORITY_ORDER = {
  high: 3,
  medium: 2,
  low: 1
};

function sortTasksByPriority(items) {
  return [...items].sort((firstTask, secondTask) => {
    const priorityGap =
      PRIORITY_ORDER[secondTask.priority] - PRIORITY_ORDER[firstTask.priority];

    if (priorityGap !== 0) {
      return priorityGap;
    }

    return secondTask.id - firstTask.id;
  });
}

app.get('/api/tasks', (req, res) => {
  res.json({ tasks: sortTasksByPriority(tasks) });
});

app.post('/api/tasks', (req, res) => {
  const text = typeof req.body.text === 'string' ? req.body.text.trim() : '';
  const rawPriority =
    typeof req.body.priority === 'string' ? req.body.priority.toLowerCase() : 'medium';
  const priority = PRIORITY_ORDER[rawPriority] ? rawPriority : 'medium';

  if (!text) {
    return res.status(400).json({ error: 'Please provide a non-empty task text' });
  }

  const task = { id: nextId++, text, priority };
  tasks.push(task);
  res.status(201).json({ task });
});

const port = process.env.PORT || 5200;
app.listen(port, () => {
  console.log(`Todo API listening on http://localhost:${port}`);
});
