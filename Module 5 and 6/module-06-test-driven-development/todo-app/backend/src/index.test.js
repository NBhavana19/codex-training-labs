const test = require('node:test');
const assert = require('node:assert/strict');
const {
  createApp,
  createTask,
  toggleTaskCompletion,
  validateTaskPayload
} = require('./index');

async function withServer(app, run) {
  const server = await new Promise((resolve) => {
    const instance = app.listen(0, () => resolve(instance));
  });

  const { port } = server.address();

  try {
    await run(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
}

test('validateTaskPayload rejects empty titles', () => {
  assert.equal(validateTaskPayload({ title: '   ' }), 'Task title is required.');
});

test('createTask trims fields and defaults completion state', () => {
  const task = createTask({ title: '  Ship lab  ', notes: '  demo  ', due: '2026-04-20' });

  assert.equal(task.title, 'Ship lab');
  assert.equal(task.notes, 'demo');
  assert.equal(task.due, '2026-04-20');
  assert.equal(task.completed, false);
  assert.ok(task.id);
  assert.ok(task.createdAt);
});

test('toggleTaskCompletion flips task state', () => {
  const tasks = [{ id: 'task-1', completed: false }];

  const updated = toggleTaskCompletion(tasks, 'task-1');

  assert.equal(updated.completed, true);
  assert.equal(tasks[0].completed, true);
});

test('GET and POST /tasks keep server state in sync', async () => {
  await withServer(createApp(), async (baseUrl) => {
    const createResponse = await fetch(`${baseUrl}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Practice TDD', notes: 'Write tests first' })
    });

    assert.equal(createResponse.status, 201);
    const createdTask = await createResponse.json();
    assert.equal(createdTask.title, 'Practice TDD');

    const listResponse = await fetch(`${baseUrl}/tasks`);
    assert.equal(listResponse.status, 200);

    const tasks = await listResponse.json();
    assert.equal(tasks.length, 1);
    assert.equal(tasks[0].id, createdTask.id);
    assert.equal(tasks[0].completed, false);
  });
});

test('PATCH /tasks/:id/complete toggles a saved task and 404s for missing ids', async () => {
  await withServer(createApp(), async (baseUrl) => {
    const createResponse = await fetch(`${baseUrl}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Toggle me' })
    });
    const createdTask = await createResponse.json();

    const patchResponse = await fetch(`${baseUrl}/tasks/${createdTask.id}/complete`, {
      method: 'PATCH'
    });
    assert.equal(patchResponse.status, 200);

    const updatedTask = await patchResponse.json();
    assert.equal(updatedTask.completed, true);

    const missingResponse = await fetch(`${baseUrl}/tasks/missing-id/complete`, {
      method: 'PATCH'
    });
    assert.equal(missingResponse.status, 404);
  });
});
