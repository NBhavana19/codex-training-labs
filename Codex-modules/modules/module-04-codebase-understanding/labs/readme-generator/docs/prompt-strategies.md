# README Generator Prompt Strategies

## Recommended prompt skeleton
"Read the modules in `backend/src/modules`, then draft README sections for Overview, Running the Service, and API Notes. Use a {technical|conversational} tone and do not invent functions that are not present."

## Validation prompts
- "Check this generated README against the actual module exports and flag any claim that cannot be supported by the code."
- "Rewrite the API notes so they only mention functions found in the stub modules."
