---
name: setup
description: Configure this repo for the project's workflow — set up its issue tracker, project and domain documentation folders. Run once before first use.
user-invocable: true
disable-model-invocation: true
---

# Setup

Scaffold the project's context that the tools and skills will rely on:

- **Issue tracker**: where issues live (GitHub by default; local markdown is also supported out of the box).
- **Project's documentation**: where the documentation folder live, and the rules for reading it.
- **Domain documentation**: where `GLOSSARY.md` and ADRs lives, and the consumer rules for reading them

This is a prompt-driven skill, not a deterministic script. Explore, present what you found, confirm with the user, then write.

## Process

### 1. Explore

Look at the current repo to understand its starting state. Read whatever exists; don't assume:

- `git remote -v` and `.git/config`: is this a GitHub repo? Which one?
- `AGENTS.md` and `CLAUDE.md` at the repo root: does either exist? Is there already an `## Project Context` section in either?
- `GLOSSARY.md` and `GLOSSARY-MAP.md` at the repo root.
- `docs/adr/` and any `src/*/docs/adr/` directories
- `docs/agents/`: is this directory exists?
- `.scratch/`: this is a sign that a local-markdown issue tracker convention is already in use.
- Monorepo signals: a `workspace:` entry in `pubspec.yaml`, or a populated `packages/*` with its own `src/`. These are present only in a genuinely large multi-package repo; their absence means single-glossary.

### 2. Present findings and ask

Summarise what's present and what's missing. Then take the sections in order. One section, one answer, then the next.

Lead each section with the recommended answer so the user can accept it in a word. Give a one-line explainer only when the choice genuinely branches.

**Section A: Issue tracker.**

> Explainer: The "issue tracker" is where issues live for this repo. Skills like `/to-spec`, `/to-tickets`, `/implement` read from and write to it. They need to know whether to call `gh issue create`, write a markdown file under `.scratch/`, or follow some other workflow you describe. Pick the place you actually track work for this repo.

Default posture: these skills were designed for GitHub. If a `git remote` points at GitHub, propose that. Otherwise (or if the user prefers), offer:

- **GitHub**: issues live in GitHub Issues (use the `gh` CLI).
- **Local markdown**: issues live as files under `.scratch/<feature>/` in this repo.
- **Other** (Jira, etc.): ask the user to describe the workflow in one paragraph; the skill will record it as freeform prose.

Record the choice in `docs/agents/issue-tracker.md`.

**Section C: Domain documentation.**

Default to single-glossary (one `GLOSSARY.md` at the repo root). This fits almost every repo; write it without asking.

Offer multi-glossary (a root `GLOSSARY-MAP.md` pointing to per-glossary `GLOSSARY.md` files) only when exploration found monorepo signals. Then confirm which layout they want.

**Section B: Project's documentation.**

Project documentation lives in `docs/`

### 3. Confirm and edit

Show the user a draft of:

- The `## Project Context` block to add to whichever of `CLAUDE.md` or `AGENTS.md` is being edited.
- The content of `docs/agents/issue-tracker.md` and `docs/agents/domain.md` that will be created.

Let them edit before writing.

### 4. Write

Pick the file to edit:

- If CLAUDE.md exists, edit it.
- Else if AGENTS.md exists, edit it.
- If neither exists, ask the user which one to create; don't pick for them.

Never create AGENTS.md when CLAUDE.md already exists (or vice versa); always edit the one that's already there.

If a `## Project Context` block already exists in the chosen file, update its contents in-place rather than appending a duplicate. Don't overwrite user edits to the surrounding sections.

The block:

```markdown
## Project Context

### Issue tracker

[one-line summary of where issues are tracked]. See `docs/agents/issue-tracker.md`.

### Project's documentation

[one-line summary of where the project's documentation is stored]. See `docs/*`.

### Domain documentation

[one-line summary of layout: "single-glossary" or "multi-glossary"]. See `docs/agents/domain.md`.
```

Then write the docs files using the seed templates in this skill folder as a starting point:

- [issue-tracker-github.md](./references/issue-tracker-github.md): Remote issue tracker.
- [issue-tracker-local.md](./references/issue-tracker-local.md): local-markdown issue tracker.
- [domain.md](./references/domain.md): Domain documentation.

For "other" issue trackers, write `docs/agents/issue-tracker.md` from scratch using the user's description.

### 5. Done

Tell the user the setup is complete. Mention they can edit `docs/agents/*.md` directly later; re-running this skill is only necessary if they want to switch issue trackers or restart from scratch.
