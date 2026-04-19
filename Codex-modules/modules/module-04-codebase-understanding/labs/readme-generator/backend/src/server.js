const express = require('express');
const cors = require('cors');
const catalogService = require('./modules/catalogService');
const deliveryService = require('./modules/deliveryService');

const app = express();
const port = process.env.PORT || 4200;

app.use(cors());
app.use(express.json());

const modules = [catalogService, deliveryService];

function generateReadme(features, tone) {
  const introTone =
    tone === 'conversational'
      ? 'This project is a small teaching app that shows how a product catalog and delivery messaging work together.'
      : 'This repository demonstrates a compact Node service whose modules coordinate catalog retrieval and delivery messaging.';

  const featureText = features
    ? `Requested feature focus: ${features}.`
    : 'No extra feature brief was supplied, so the README stays grounded in the current modules.';

  return `# README Draft

## Overview
${introTone}

## Modules
${modules.map((item) => `- ${item.name}: ${item.responsibility}`).join('\n')}

## Feature Focus
${featureText}

## Running the Service
1. Install dependencies with npm install.
2. Start the API with npm start.
3. Review the generated API notes before publishing documentation.`;
}

function generateApiDocs() {
  return modules
    .map(
      (item) =>
        `${item.name} exposes ${item.apiSurface.join(', ')} and is responsible for ${item.responsibility.toLowerCase()}`
    )
    .join('\n\n');
}

app.get('/api/context', (req, res) => {
  res.json({ modules });
});

app.post('/api/generate-docs', (req, res) => {
  const { features = '', tone = 'technical' } = req.body || {};

  res.json({
    readme: generateReadme(features, tone),
    apiDocs: generateApiDocs(),
    validationChecklist: [
      'Check that module names match the code exactly.',
      'Verify that every function mentioned in the API docs actually exists.',
      'Confirm ports and start commands before publishing.'
    ]
  });
});

app.listen(port, () => {
  console.log(`README generator API listening on http://localhost:${port}`);
});
