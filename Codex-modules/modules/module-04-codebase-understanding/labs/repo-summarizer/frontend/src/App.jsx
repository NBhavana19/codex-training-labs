import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4100/api';

function App() {
  const [snippets, setSnippets] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [strategy, setStrategy] = useState('function');
  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState('Loading sample snippets...');

  useEffect(() => {
    fetch(`${API_BASE}/snippets`)
      .then((res) => res.json())
      .then((payload) => {
        setSnippets(payload.snippets || []);
        setSelectedIds((payload.snippets || []).slice(0, 2).map((item) => item.id));
        setStatus('Choose snippets and compare summary strategies.');
      })
      .catch(() => setStatus('Unable to load snippets.'));
  }, []);

  const toggleSnippet = (snippetId) => {
    setSelectedIds((currentIds) =>
      currentIds.includes(snippetId)
        ? currentIds.filter((id) => id !== snippetId)
        : [...currentIds, snippetId]
    );
  };

  const generateSummary = async () => {
    setStatus('Generating summary...');
    const res = await fetch(`${API_BASE}/summarize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ snippetIds: selectedIds, strategy })
    });

    const payload = await res.json();
    setResponse(payload);
    setStatus('Summary ready. Compare the detail level against a different strategy.');
  };

  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">Module 4 - Repository Summarizer</p>
        <h1>Practice reading a repo before you ask Codex to explain it</h1>
        <p>{status}</p>
      </header>

      <section className="panel">
        <div className="panel-header">
          <h2>Sample files</h2>
          <select value={strategy} onChange={(event) => setStrategy(event.target.value)}>
            <option value="function">Function-level</option>
            <option value="folder">Folder-level</option>
          </select>
        </div>
        <div className="snippet-grid">
          {snippets.map((snippet) => (
            <label key={snippet.id} className="snippet-card">
              <input
                type="checkbox"
                checked={selectedIds.includes(snippet.id)}
                onChange={() => toggleSnippet(snippet.id)}
              />
              <div>
                <strong>{snippet.name}</strong>
                <p>{snippet.folder}</p>
                <pre>{snippet.preview}</pre>
              </div>
            </label>
          ))}
        </div>
        <button className="action" type="button" onClick={generateSummary}>
          Generate summary
        </button>
      </section>

      <section className="panel">
        <h2>Summary response</h2>
        {!response ? (
          <p>Generate a summary to compare module purpose, entry points, and dependencies.</p>
        ) : (
          <>
            <p className="hint">{response.comparisonHint}</p>
            <div className="summary-grid">
              {response.summaries.map((item) => (
                <article key={item.id} className="summary-card">
                  <h3>{item.name}</h3>
                  <p><strong>Purpose:</strong> {item.modulePurpose}</p>
                  <p><strong>Entry point:</strong> {item.entryPoint}</p>
                  <p><strong>Dependencies:</strong> {item.dependencies.join(', ')}</p>
                  <p><strong>Key files:</strong> {item.keyFiles.join(' | ')}</p>
                  <p className="hint">{item.strategyNote}</p>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default App;
