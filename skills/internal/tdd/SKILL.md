---
name: tdd
description: Test-driven development. Use when implementing features or bug fixes test-first, when the user requests red-green development, or when integration tests are required.
user-invocable: false
disable-model-invocation: false
---

# Test-Driven Development

## Definition

A **seam** is a public boundary where behavior is observable without accessing internal implementation. Tests are written at seams only.

A **slice** is one cycle consisting of one failing test followed by the minimum production code required to makes it pass.

## Purpose

Implement the requested behavior through repeated **Red → Green** vertical slices.

Use this skill during implementation. Do not refactor beyond changes required to make the current test pass. Structural cleanup belongs to `code-review`.

## Workflow

## 1. Load context

Before proposing tests, explore the codebase:

- Read `GLOSSARY.md` if it exists.
- Read applicable ADRs.
- Inspect existing public interfaces, domain vocabulary, and test conventions.
- Read [tests.md](./references/tests.md) for test examples.
- Read [mocking.md](./references/mocking.md) before introducing mocks.

## 2. Confirm test seams

Before writing any test :

1. Identify each seam required by the requested behavior.
2. For each seam, state:
   2.1. the public interface;
   2.2. the behavior observable through it;
   2.3. why that seam is appropriate.
3. Get user confirmation.

If the correct seam is unclear, consult the `codebase-design` skill before proposing it.

**Gate**:

- Write tests only against confirmed seams.
- If implementation requires a new seam, stop and repeat this step for that seam before continuing.

## 3. Write tests

For each behavior, write one test that:

- exercises one confirmed seam;
- verifies an observable capability or outcome;
- remains valid if internal implementation changes without changing behavior;
- derives expected values independently from the implementation under test.

Expected values may come from:

- the specification;
- a known literal;
- a worked example.

Do not:

- test private functions or internal collaborators;
- assert implementation details;
- observe behavior through an unrelated side channel;
- reproduce implementation logic in the assertion;
- write a test for a later slice before the current slice is green.

## 4. Run Red → Green slices

Repeat until all agreed behavior is implemented.

Work vertically: **one test → one minimal implementation → repeat**.

### Red

1. Select one remaining behavior for an agreed seam.
2. Write one test for that behavior.
3. Run that test.
4. Confirm that it fails because the behavior is missing.

**Gate**:

- Do not implement production code unless the test fails for the expected reason.
- If the test passes or fails for another reason, correct the test and run it again.

### Green

1. Write the minimum production code required to satisfy the failing test.
2. Run the relevant tests.
3. Confirm that they pass.

**Gate**:

- Start the next slice only when the current slice is green.

## 5. Completion

TDD is complete only if all conditions are true:

- [ ] Every agreed behavior has a passing test.
- [ ] Every test exercises a confirmed seam.
- [ ] Every test was observed failing for the expected reason before its implementation.
- [ ] No test depends on private implementation details.
- [ ] No assertion derives its expected value from the implementation under test.
- [ ] All relevant tests pass.
- [ ] No production behavior was implemented before a failing test required it.
- [ ] No refactoring beyond what was required to reach green was performed.

If any condition is false, TDD implementation is not complete.
