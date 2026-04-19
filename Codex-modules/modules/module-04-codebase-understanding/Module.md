# Module 4: Codebase Understanding (1 Hour)

## Focus
- Strategies for reading and understanding large repositories using Codex (summaries, call graphs, etc.).
- Generating docs from code (API, README updates, inline explanations).
- Adding code on top of existing repositories by incrementally introducing modifications via prompts.

## Labs structure (1–2 hours each)
> Each lab is seeded with a mini repository (a couple of Node services and a basic React UI). Students focus on prompts for summarization and documentation rather than building the entire stack.

### Lab 4.1 – Repository Summarizer (labs/repo-summarizer)
- Deliverables: React file-picker interface that lets students upload sample code snippets or small folders; the Node/Express backend returns Codex-generated summaries (module purpose, entry points, dependencies) and highlights key files.
- Learning: build prompts that ask for high-level summaries and compare different prompt strategies (function-level vs. folder-level).

### Lab 4.2 – README + Doc Generator (labs/readme-generator)
- Deliverables: tiny Node service with a few stub modules; React UI allows students to describe features and request a generated README plus API documentation paragraphs.
- Learning: practice prompt scaffolding for documentation, tune the tone (technical vs. conversational), and validate that generated docs match code semantics.

### Lab 4.3 – E-Commerce Documentary (labs/ecommerce-documentary)
- Deliverables: a seeded React + Express e-commerce scaffold selling apparel and shoes, plus a guided prompt workbook; the backend/services branch and React UI emulate a sizeable marketplace so learners can practice summarizing every layer before they ask Codex to author documentation or README content.
- Learning focus: turn the app into a documentary by using Codex to summarize the entire backend folder, specific controller functions, shared services, and UI composition; compare function-level prompts (targeting one file or function) against folder-level prompts (surveying the entire backend or frontend folder) and capture the differences in a prompt log. After the summary step, students practice writing README sections (Overview, Data Flow, API surfaces) through Codex, then validate them against the actual code base.
- Bonus practice: the adjacent labs/ecommerce-documentary-extension folder contains the same catalog plus new experience-level features that learners unlock via Codex prompts when asked to extend the repo with style guides and promotional tiles. This demonstrates how Codex can both read a large repo and act as a collaborative extension author when the requirements evolve.

### Module lab takeaway
Capture the summarization prompts and documentation checks in Module.md so future labs can reference the sample prompts, token budgets, and simple repo scaffolds. Reference the e-commerce documentary repo and the extension folder for fresh prompt ideas that scale from reading to expanding a larger project.

## Implemented lab map

### Lab 4.1 - Repository Summarizer (`labs/repo-summarizer`)
- React picker UI for seeded sample files and snippets.
- Express backend that returns structured summaries covering module purpose, entry points, dependencies, and key files.
- Supporting docs:
  - `docs/prompt-strategies.md`
  - `docs/Documentary-template.md`

### Lab 4.2 - README + Doc Generator (`labs/readme-generator`)
- Tiny Node service with stub modules in `backend/src/modules`.
- React UI for feature briefs and tone selection.
- Generated outputs:
  - README draft
  - API notes
  - validation checklist

### Lab 4.3 - E-Commerce Documentary (`labs/ecommerce-documentary`)
- Multi-layer React + Express scaffold for broader repo-reading practice.
- Prompt comparison docs and documentary templates already included in the lab.

## Sample prompts to reuse
- Folder-level summary: "Survey the `backend/src` folder and explain the roles of routes, controllers, services, and data sources."
- Function-level summary: "Read `backend/src/services/inventoryService.js` and summarize inputs, outputs, dependencies, and where it is called from."
- README generation: "Use the modules in `backend/src/modules` as source material and draft Overview, Running the App, and API Notes sections. Do not invent APIs."
- Validation prompt: "Review this generated documentation against the code and list any unsupported claims, wrong ports, missing entry points, or invented functions."

## Documentation checks
- Verify port numbers, route names, exported functions, and component/file names.
- Confirm that README setup steps match the package scripts in each lab.
- Keep generated prose grounded in actual files before polishing tone.

## Token budget guidance
- Small files or single functions: 300-800 input tokens.
- Folder-level summaries: 800-2,000 input tokens depending on file count.
- README generation and verification loops: 1,000-2,500 tokens split across generation and validation passes.

## Suggested teaching flow
1. Start with `labs/repo-summarizer` to learn prompt scope control.
2. Move to `labs/readme-generator` to practice drafting and validating docs.
3. Finish with `labs/ecommerce-documentary` to apply the same patterns to a larger repo.
4. Use `labs/ecommerce-documentary-extension` when learners are ready to extend a codebase after understanding it.
