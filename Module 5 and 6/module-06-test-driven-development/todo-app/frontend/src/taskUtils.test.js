import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTaskPayload,
  formatTaskMeta,
  mergeCreatedTask,
  mergeUpdatedTask
} from './taskUtils.js';

test('buildTaskPayload normalizes empty due dates to null', () => {
  const payload = buildTaskPayload({
    title: 'Review prompts',
    due: '',
    notes: 'Check test coverage'
  });

  assert.deepEqual(payload, {
    title: 'Review prompts',
    due: null,
    notes: 'Check test coverage'
  });
});

test('mergeCreatedTask prepends a new task', () => {
  const result = mergeCreatedTask([{ id: '2' }], { id: '1' });
  assert.deepEqual(result.map((task) => task.id), ['1', '2']);
});

test('mergeUpdatedTask replaces only the matching task', () => {
  const tasks = [
    { id: '1', completed: false },
    { id: '2', completed: false }
  ];

  const result = mergeUpdatedTask(tasks, { id: '2', completed: true });

  assert.deepEqual(result, [
    { id: '1', completed: false },
    { id: '2', completed: true }
  ]);
});

test('formatTaskMeta shows due date and saved label', () => {
  const label = formatTaskMeta({
    due: '2026-04-19',
    createdAt: '2026-04-19T10:00:00.000Z'
  });

  assert.match(label, /Due 2026-04-19/);
  assert.match(label, /saved/);
});
