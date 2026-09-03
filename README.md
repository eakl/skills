# Agent Skills

A self-hosted Claude Code marketplace publishing one plugin,
`eakl-skills`: skills, slash commands, and agents shared from this
repo.

## Install

```sh
/plugin marketplace add eakl/skills
/plugin install eakl-skills
```

## Structure

- `skills/` — background knowledge Claude can use automatically. **Not**
  exposed as slash commands (`user-invocable: false` in frontmatter).
- `commands/` — user-invocable slash commands, authored as skills with
  `disable-model-invocation: true` so Claude never triggers them itself.
- `agents/<name>/<name>.md` — installable subagents. One flat `.md` per
  folder; each path must be listed in `.claude-plugin/plugin.json`'s
  `agents` array.

Both `skills/` and `commands/` hold ordinary `<name>/SKILL.md` Agent
Skills — the folder and the frontmatter field together are what separate
"Claude-only" from "user-invocable", not a different file format.

## Adding a skill

Copy `skills/example-context/` (background knowledge) or
`commands/example-command/` (slash command) to a new folder, rename, and
edit the frontmatter `name`/`description` plus the body.

## Adding an agent

Copy `agents/example-agent/`, rename the folder and file, edit the
frontmatter and system prompt, then add the new path to `agents` in
`.claude-plugin/plugin.json`.

## Validation

`node scripts/skill-lint.mjs` checks both manifests parse, every skill
has the frontmatter its bucket requires, and every agent path in
`plugin.json` exists. Runs automatically in CI on every push and PR.
