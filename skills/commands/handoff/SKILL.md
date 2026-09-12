---
name: handoff
description: Create a compact handoff document so another agent can continue the current conversation.
argument-hint: What will the next session be used for?
user-invocable: true
disable-model-invocation: true
---

# Purpose

Create a handoff document for a fresh agent to continue the current work.

## Content

Include only information needed to continue the work:

1. **Objective**: What the user is trying to accomplish.
2. **Current state**: Decisions made, work completed, and relevant unresolved state.
3. **Next steps**: Work that remains.
4. **Open questions**: Decisions or unknowns that still block or affect progress.
5. **References**: Paths or URLs to relevant existing artifacts.
6. **Suggested skills**: Skills the next agent should invoke with the Skill tool.

If arguments were provided, treat them as the next session's focus and prioritize content relevant to that focus.

Rules:

- Do not duplicate content already captured in specs, plans, ADRs, issues, commits, diffs, or other artifacts. Reference the artifact instead.
- Include conversation context only when it is relevant to continuing the work.
- Redact secrets, credentials, and personally identifiable information.
- Do not invent missing information.

## Output

- Save the document in the temporary directory of the user's OS.
- Do not save it in the current workspace.
- Return the saved file path.

## Completeness check

Before saving, verify that:

- A fresh agent can identify the objective and next action.
- All unresolved decisions relevant to the next session are included.
- Existing artifacts are referenced instead of reproduced.
- Suggested skills are included.
- No sensitive information is exposed.
