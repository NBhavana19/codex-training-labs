const express = require('express');
const cors = require('cors');
const snippets = require('./data/snippets');

const app = express();
const port = process.env.PORT || 4100;

app.use(cors());
app.use(express.json());

function buildSummary(snippet, strategy) {
  const strategyNote =
    strategy === 'folder'
      ? `Folder-level summary: ${snippet.folder} contributes a reusable building block to the repo.`
      : `Function-level summary: ${snippet.entryPoint} is the main starting point students should inspect first.`;

  return {
    id: snippet.id,
    name: snippet.name,
    modulePurpose: `${snippet.name} handles ${snippet.name.includes('Grid') ? 'UI rendering for catalog items' : 'one focused layer of the marketplace flow'}.`,
    entryPoint: snippet.entryPoint,
    dependencies: snippet.dependencies,
    keyFiles: [snippet.folder, `${snippet.folder}/${snippet.name}`],
    strategyNote
  };
}

app.get('/api/snippets', (req, res) => {
  res.json({
    snippets: snippets.map((snippet) => ({
      id: snippet.id,
      name: snippet.name,
      folder: snippet.folder,
      language: snippet.language,
      preview: snippet.code
    }))
  });
});

app.post('/api/summarize', (req, res) => {
  const { snippetIds = [], strategy = 'function' } = req.body || {};
  const selected = snippets.filter((snippet) => snippetIds.includes(snippet.id));

  const summaries = (selected.length ? selected : snippets).map((snippet) =>
    buildSummary(snippet, strategy)
  );

  res.json({
    strategy,
    comparisonHint:
      strategy === 'folder'
        ? 'Use this response to compare broad architecture context against single-file precision.'
        : 'Use this response to compare precision against the broader folder-level narrative.',
    summaries
  });
});

app.listen(port, () => {
  console.log(`Repo summarizer API listening on http://localhost:${port}`);
});
