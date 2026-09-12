---
name: implement
description: Implement a piece of work based on a specification or a set of tickets.
user-invocable: true
disable-model-invocation: true
---

# Implement

## Purpose

Implement the work described by the user in the specification or tickets.

## Workflow

1. Use `/tdd` where possible, at pre-agreed seams.
2. Run typechecking regularly, single test files regularly, and the full test suite once at the end.
3. Once done, use `/code-review` to review the work.
