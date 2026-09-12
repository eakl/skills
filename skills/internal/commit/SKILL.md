---
name: commit
description: "Use when committing changes or writing a commit message. Triggers on: 'commit', 'git commit', 'commit changes', 'write a commit message'"
user-invocable: false
disable-model-invocation: false
allowed-tools: Bash(git add *) Bash(git commit *) Bash(git status *)
---

# Commit

## Purpose

## Format

Follow conventional commit format:

**Type**: `feat` | `fix` | `docs` | `style` | `refactor` | `test` | `perf` | `build` | `ci` | `chore`

**Format**: `type(scope): short imperative summary`

**Rules**:

- Subject line: max 72 characters.
- Imperative mood: "add" instead of "added", "fix" instead of "fixed".
- Scope: the feature name (auth, transfert, wallet, cards, etc.)

**Example**:

- `feat(transfer): add beneficiary validation on amount input`.
- `fix(wallet): correct card display convention`.
- `chore(deps): upgrade zod to 1.2.3`

Always run linting and formatting before committing. Never commit with lint errors.
