export function buildTaskPayload({ title, due, notes }) {
  return {
    title,
    due: due || null,
    notes
  };
}

export function mergeCreatedTask(tasks, createdTask) {
  return [createdTask, ...tasks];
}

export function mergeUpdatedTask(tasks, updatedTask) {
  return tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
}

export function formatTaskMeta(task) {
  const dueLabel = task.due ? `Due ${task.due}` : 'No due date';
  const createdLabel = task.createdAt
    ? `saved ${new Date(task.createdAt).toLocaleTimeString()}`
    : 'saved just now';

  return `${dueLabel} | ${createdLabel}`;
}
