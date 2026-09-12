---
name: to-tickets
description: Convert a specification, a plan, or the current conversation into a set of self-contained, implementation-ready tracer-bullets. Use when implementation should be decomposed into independently executable vertical slices.
user-invocable: true
disable-model-invocation: false
---

# To Tickets

## Purpose

Convert the provided specification or implementation plan into implementation tickets.

Each ticket must be a self-contained vertical slice that an implementer can execute using only the ticket and the repository.

Do not add requirements that are not supported by the source specification or repository.

## Workflow

### 1. Load the specification source

Identify the specification, plan, or artifact to decompose.

Extract:

- required behavior;
- constraints and invariants;
- affected interfaces and systems;
- acceptance criteria;
- explicit non-goals;
- dependencies and ordering constraints.

If a requirement necessary to create an implementation ticket is unclear or missing, ask the user. Do not infer new product or architectural decisions.

### 2. Explore the repository

Inspect the code relevant to the specification.

Determine:

- existing entry points and execution paths;
- affected modules and files;
- existing types, interfaces, boundaries, and conventions;
- tests and test seams;
- dependencies between required changes.

Use repository facts to make tickets implementation-ready. Do not change the specification.

### 3. Draft vertical slices

Decompose the work into tracer bullets.

Each ticket must:

- deliver one observable behavior or implementation capability;
- cross every layer required for that capability;
- be independently implementable once its declared dependencies are complete;
- include tests required to prove the slice;
- avoid unrelated refactoring or cleanup.

Prefer **end-to-end tracer bullets** over layer-based tickets such as "add database", "add API", or "add UI".

Order tickets by dependency. Create explicit blocking relationships when required.

### 4. Validate tickets

Before presenting them, verify that:

- every requirement in the source is covered by at least one ticket;
- every ticket traces to the source specification;
- no ticket introduces unsupported requirements;
- each ticket contains enough context to implement without rereading the specification;
- acceptance criteria are observable and testable;
- affected code and integration points are identified where repository evidence allows;
- dependencies are explicit;
- no two tickets duplicate responsibility.

If any check fails, revise the tickets before continuing.

### 5. Generate tickets

Use this template for every ticket: [Ticket template](./templates/ticket.template.md)

## Completion rule

The ticket set is complete only when an implementer can take any unblocked ticket and implement it without consulting the original specification.

## Publish

After the user approves the tickets, ask whether they want them published to the project's configured issue tracker.

If yes:

1. Detect the configured tracker. See `docs/agents/issue-tracker.md`.
2. Create one issue per ticket using the approved title and body.
3. Preserve dependency relationships when the tracker supports them.
4. Report the created issue identifiers and links.
