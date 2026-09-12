---
name: resolve-merge-conflict
description: Resolve Git conflicts while preserving linear history. Escalate when the intended resolution is ambiguous.
user-invocable: false
disable-model-invocation: false
allowed-tools: Bash(git *) Bash(gh pr *) Bash(gh repo *)
---

# Resolve Merge Conflict

## Invariants

- Never create a merge commit.
- Never use `git reset --hard`.
- Never use `git push --force`.
- Never discard user work.
- Do not guess conflicting intent.
- Use `git push --force-with-lease` only after explicit user approval.

## Workflow

1. Run `git status` and inspect every conflicted file.
2. If a merge is active, abort it and rebase the current branch onto its target branch.
3. For each conflicted file:
   - determine the intended result from both side;
   - stop and ask the user if intent is ambiguous;
   - resolve the conflict;
   - stage the resolved file with `git add`.
4. Continue the active operation:
   - rebase: `git rebase --continue`
   - cherry-pick: `git cherry-pick --continue`
5. Repeat steps 3-4 until Git reports no conflicts.
6. Run the relevant tests.
7. Verify:
   - `git status` reports no unresolved conflicts;
   - no merge commit was created;
   - tests pass.

If the intended resolution cannot be determined safely, stop and ask the user.
