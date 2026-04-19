import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4200/api';

function App() {
  const [features, setFeatures] = useState('Add a short section about how catalog filtering and delivery badges help shoppers.');
  const [tone, setTone] = useState('technical');
  const [modules, setModules] = useState([]);
  const [docs, setDocs] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/context`)
      .then((res) => res.json())
      .then((payload) => setModules(payload.modules || []))
      .catch(() => setModules([]));
  }, []);

  const generateDocs = async () => {
    const res = await fetch(`${API_BASE}/generate-docs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ features, tone })
    });

    const payload = await res.json();
    setDocs(payload);
  };

  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">Module 4 - README + Doc Generator</p>
        <h1>Generate docs from code, then verify every claim</h1>
        <p>Students can tune the prompt tone, add a feature brief, and compare generated docs against the stub modules.</p>
      </header>

      <section className="panel">
        <h2>Stub module context</h2>
        <div className="module-grid">
          {modules.map((item) => (
            <article key={item.name} className="module-card">
              <h3>{item.name}</h3>
              <p>{item.responsibility}</p>
              <p className="meta">{item.apiSurface.join(' | ')}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Documentation prompt inputs</h2>
        <label className="field">
          Tone
          <select value={tone} onChange={(event) => setTone(event.target.value)}>
            <option value="technical">Technical</option>
            <option value="conversational">Conversational</option>
          </select>
        </label>
        <label className="field">
          Feature brief
          <textarea
            rows="5"
            value={features}
            onChange={(event) => setFeatures(event.target.value)}
          />
        </label>
        <button className="action" type="button" onClick={generateDocs}>
          Generate README and API notes
        </button>
      </section>

      <section className="panel">
        <h2>Generated output</h2>
        {!docs ? (
          <p>Generate docs to inspect README sections, API notes, and a validation checklist.</p>
        ) : (
          <div className="docs-grid">
            <article className="doc-card">
              <h3>README draft</h3>
              <pre>{docs.readme}</pre>
            </article>
            <article className="doc-card">
              <h3>API notes</h3>
              <pre>{docs.apiDocs}</pre>
              <h4>Validation checklist</h4>
              <ul>
                {docs.validationChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
