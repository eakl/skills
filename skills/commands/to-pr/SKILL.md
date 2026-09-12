---
name: to-pr
description: Draft and create a GitHub pull request from the current branch.
user-invocable: true
disable-model-invocation: false
allowed-tools: Bash(git *) Bash(gh pr *) Bash(gh repo *)
---

# To PR

## Workflow

### 1. Gather context

Use:

- `git status`
- `git log <base>..HEAD --oneline`
- `git diff <base>...HEAD`
- Read any issue or specification referenced by the branch, commits, or changes when available.

### 2. Draft the PR

**Title**

- Use the title format: `<type>(<scope>): <subject>` or `<type>: <subject>` with the following allowed types: `feat` | `fix` | `docs` | `style` | `refactor` | `test` | `perf` | `build` | `ci` | `chore`
- The subject describes the outcome of the change.
- Keep it concise and specific.

**Body**

Use the following template for the body message:

```markdown
## Summary

{What changed and why.}

## Changes

- {Material change}
- {Material change}

## Validation

- {Checks or tests performed}
```

### 3. Validate before creating the PR

- The base branch is correct.
- The diff is non-empty.
- The title describes the actual change.
- The body matches the diff and contains no unsupported claims.
- Validation results are accurate.

### 4. Create the PR

Create the PR and return its URL to the user:

```sh
gh pr create --base <base> --title "<title>" --body "<body>"
```
