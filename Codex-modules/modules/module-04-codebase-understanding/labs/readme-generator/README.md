# README + Doc Generator Lab

This lab gives students a tiny codebase plus a documentation UI so they can ask Codex for README sections and API notes, then validate those claims against real modules.

## Lab goals
- Feed a short feature brief into the UI.
- Switch between `technical` and `conversational` tone.
- Generate README and API documentation drafts from the backend context.
- Verify each generated statement against the stub modules in `backend/src/modules`.

## Run the lab
- Backend: `npm install` then `npm start` inside `backend/`. The API runs on port `4200`.
- Frontend: `npm install` then `npm run dev` inside `frontend/`.

## API surface
- `GET /api/context` returns the module descriptions that the frontend displays.
- `POST /api/generate-docs` accepts `{ features: string, tone: "technical" | "conversational" }` and returns generated README text, API notes, and a validation checklist.

## Student tasks
1. Generate a technical README draft and check it against the code.
2. Repeat with a conversational tone and compare what changes.
3. Add your best prompt wording to `docs/prompt-strategies.md`.
