---
name: commit
description: "Use when committing changes or writing a commit message. Triggers on: 'commit', 'git commit', 'commit changes', 'write a commit message'"
user-invocable: false
disable-model-invocation: false
disallowed-tools: Bash(git reset --hard) Bash(git push --force) Bash(git rebase main) Bash(git clean -fd) Bash(git checkout .) Bash(git commit --amend)
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
- Scope: the feature name (auth, transfer, wallet, cards, etc.)

**Example**:

- `feat(transfer): add beneficiary validation on amount input`.
- `fix(wallet): correct card display convention`.
- `chore(deps): upgrade zod to 1.2.3`

Always run linting and formatting before committing. Never commit with lint errors.
