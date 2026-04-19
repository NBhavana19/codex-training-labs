# Repository Summarizer Lab

This lab gives students a small picker-based UI for exploring seeded code snippets before they ask Codex for a repository summary. The goal is to compare function-level and folder-level prompts while keeping the exercise fast and easy to repeat.

## What to build and practice
- Select one or more sample files from the React interface.
- Choose a summary strategy: `function-level` or `folder-level`.
- Call the Node/Express backend to retrieve structured summaries that highlight:
  - module purpose
  - entry points
  - dependencies
  - key files
- Compare the responses and log what changes when the prompt scope gets broader.

## Run the lab
- Backend: `npm install` then `npm start` inside `backend/`. The API runs on port `4100`.
- Frontend: `npm install` then `npm run dev` inside `frontend/`. Set `VITE_API_URL` if you want a different backend origin.

## API surface
- `GET /api/snippets` returns the seeded sample files for the picker UI.
- `POST /api/summarize` accepts `{ snippetIds: string[], strategy: "function" | "folder" }` and returns structured summary cards.

## Student tasks
1. Start with two files and ask for a function-level explanation.
2. Repeat with a folder-level prompt and note what architecture context appears.
3. Capture the best prompt wording in `docs/prompt-strategies.md`.
