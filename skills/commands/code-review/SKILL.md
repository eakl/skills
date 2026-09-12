---
name: code-review
description: "Review changes from a git ref to HEAD on two independent axes: repository standards and originating specifications. Use for branch, PR, work-in-progress, or 'review since X' requests."
user-invocable: true
disable-model-invocation: false
---

# Code Review

## Purpose

Review `HEAD` against a git ref on two independent axes:

- **Standards Review**: compliance with repository coding standards and the smell baseline.
- **Specification Review**: compliance with the originating issue or specification.

Run both axes in parallel sub-agents, validate their findings, then produce a code review report.

## Workflow

### 1. Resolve the git ref

Require a **git ref** (commit SHA, branch name, tag, `main`, `HEAD~5`, etc.)

If none was supplied, ask for it.

Confirm:

- the git ref resolves with `git rev-parse <git-ref>`;
- the diff is non-empty with `git diff <git-ref>...HEAD`;
- the commit log is available with `git log <git-ref>..HEAD --oneline`.

Stop if:

- the git ref does not resolve; or
- the diff is empty.

### 2. Resolve the specification source

Find the originating specification in this order:

- Issue references in commit messages, using `docs/agents/issue-tracker.md`.
- A specification path supplied by the user.
- A matching file under `docs/`, or `.scratch/`.

If `docs/agents/issue-tracker.md` is required but missing, tell the user to run `/setup`.

If no specification is found:

- ask the user for its location;
- if the user confirms that no specification exists, skip the **Specification Review** sub-agent and report "No specification available".

### 3. Resolve standards sources

Find repository instructions applicable to the changed files, including files such as:

- Rules and conventions in `docs/rules/*`
- applicable agent or architecture instructions

Also apply this smell baseline:

- **Unclear Name**: the name does not reveal the purpose.
- **Duplicated Code**: the same logic appears in multiple places.
- **Feature Envy**: code relies more on another object's data than its own.
- **Data Clumps**: the same group of values is passed around together repeatedly.
- **Primitive Obsession**: a basic type is used where a dedicated domain type would be clearer.
- **Repeated Switches**: the same conditional logic is repeated in different places.
- **Shotgun Surgery**: a single change requires updates in many locations.
- **Divergent Change**: one module changes for several unrelated reasons.
- **Speculative Generality**: an abstraction exists without a real current need.
- **Message Chains**: callers navigate through multiple objects unnecessarily.
- **Middle Man**: an abstraction mainly delegates requests without adding responsibility.
- **Refused Bequest**: an implementation inherits behavior that it does not need or use.

Rules:

- Repository standards override the smell baseline.
- Baseline smells are judgement calls, not hard violations.
- Do not report rules already enforced mechanically by project tooling such as linter.

### 4. Run reviews in parallel

Run both available reviewers in parallel.

#### Standards Reviewer sub-agent

Provide the following to the sub-agent:

- the diff command;
- the commit-log command and output;
- all applicable standards-source paths;
- the complete smell baseline.

Instruct the sub-agent to perform the following tasks:

- Inspect only code introduced or affected by the diff.
- Compare it against documented repository rules.
- Check remaining code against the smell baseline.
- Suppress tooling-enforced issues and smells explicitly permitted by repository rules.

Each finding must contain:

```markdown
**File/hunk**: {file or hunk}
**Severity**: Violation | Smell
**Rule**: {repository rule or smell name}
**Evidence**: {evidence from changed code}
**Source**: {standards source for violations only}
```

Constraints:

- Violation requires a documented repository rule.
- Smell requires one baseline smell.
- Suppress a smell when repository standards explicitly permit the pattern.
- Do not report tooling-enforced issues.
- Return No findings. when nothing qualifies.
- Return at most 400 words.

#### Specification Reviewer

Run only when a specifications source exists.

Provide the following to the sub-agent:

- the diff command;
- the commit-log command and output;
- the specification source path or fetched contents.

Instruct the sub-agent to compare the changed behavior against the specifications and report only:

- **Missing**: required behavior is absent.
- **Partial**: required behavior is incomplete.
- **Incorrect**: implementation attempts a specification incorrectly.
- **Scope creep**: added behavior has no supporting specifications.

Each finding must contain:

```
Category: Missing | Partial | Incorrect | Scope creep
File/hunk: {file or hunk}
Requirement: {quoted or cited requirement}
Evidence: {evidence from changed code}
```

Constraints:

- Every finding must be traceable to a specification.
- Inspect only behavior introduced or affected by the diff.
- Return No findings. when nothing qualifies.
- Return at most 400 words.

### 5. Validate sub-agent findings

Before aggregation, reject any finding that fails its reviewer contract.

Verify:

- every finding concerns `<git-ref>...HEAD`;
- every **Standards Review** violation cites a documented rule;
- every **Standards Review** smell names a baseline smell;
- every **Specification Review** finding cites its originating specification;
- no tooling-enforced issue is reported.

Do not create new findings during aggregation.

### 6. Aggregate and report

Keep both axes independent.

Do not merge, deduplicate, or rank findings across reviewers.

Output exactly:

```markdown
## Standards Review

{validated Standards Reviewer output or "No findings."}

## Specification Review

{validated Specification Reviewer output, "No findings.", or "No specification available."}

## Summary

- **Standards**: {count} findings, worst: {Violation, Smell, or none}.
- **Specification**: {count} findings, worst: {Missing, Partial, Incorrect, Scope creep, or none}.
```

For worst, use the highest-severity category actually present:

- Standards: Violation before Smell.
- Specification: Incorrect → Missing → Partial → Scope creep.

## Completeness check

Before returning verify completeness:

- [ ] Git ref resolved and <git-ref>...HEAD was reviewed.
- [ ] Required context was resolved before delegation.
- [ ] Both available reviewers completed independently.
- [ ] Every reported finding passed its reviewer contract.
- [ ] Summary counts and worst categories match the report.

The main structural change is that **context resolution happens once**, then each sub-agent receives an explicit input/task/output contract. Aggregation is deliberately non-analytical: it validates, preserves, counts, and formats findings rather than re-reviewing the code.
