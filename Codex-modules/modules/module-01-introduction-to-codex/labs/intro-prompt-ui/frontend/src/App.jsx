import { useEffect, useState } from 'react';

const PRIORITY_ORDER = {
  high: 3,
  medium: 2,
  low: 1
};

export default function App() {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) {
        throw new Error('Failed to load tasks');
      }
      const data = await response.json();
      setTasks(data.tasks);
    } catch (err) {
      setError('Unable to reach the backend. Please start the server first.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!taskText.trim()) return;
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: taskText, priority })
      });

      if (!response.ok) {
        throw new Error('Could not save task');
      }

      const data = await response.json();
      setTasks((currentTasks) =>
        [...currentTasks, data.task].sort(
          (firstTask, secondTask) =>
            PRIORITY_ORDER[secondTask.priority] - PRIORITY_ORDER[firstTask.priority] ||
            secondTask.id - firstTask.id
        )
      );
      setTaskText('');
      setPriority('medium');
    } catch (err) {
      setError('Something went wrong while saving this task.');
    } finally {
      setLoading(false);
    }
  };

  const sortedTasks = [...tasks].sort(
    (firstTask, secondTask) =>
      PRIORITY_ORDER[secondTask.priority] - PRIORITY_ORDER[firstTask.priority] ||
      secondTask.id - firstTask.id
  );

  return (
    <div className="app-shell">
      <main className="card">
        <header>
          <p className="eyebrow">Module 01 - Todo UI</p>
          <h1>Your simple todo list</h1>
          <p>Type a task, choose a priority, and keep the list ordered highest to lowest.</p>
        </header>

        <form className="task-form" onSubmit={handleSubmit}>
          <label htmlFor="new-task">New task</label>
          <div className="input-row">
            <input
              id="new-task"
              value={taskText}
              onChange={(event) => setTaskText(event.target.value)}
              placeholder="Buy milk, plan presentation, etc."
            />
          </div>
          <div className="input-row controls-row">
            <select
              id="task-priority"
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
            >
              <option value="high">High priority</option>
              <option value="medium">Medium priority</option>
              <option value="low">Low priority</option>
            </select>
            <button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Add Task'}
            </button>
          </div>
        </form>

        {error && <p className="error">{error}</p>}

        <section className="task-list">
          <h2>Tasks</h2>
          {loading && tasks.length === 0 ? (
            <p className="muted">Loading tasks...</p>
          ) : sortedTasks.length === 0 ? (
            <p className="muted">Task list is empty. Add something above.</p>
          ) : (
            <ul>
              {sortedTasks.map((task) => (
                <li key={task.id}>
                  <span>{task.text}</span>
                  <span className={`priority-badge priority-${task.priority}`}>
                    {task.priority}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
