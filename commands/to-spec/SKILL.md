---
name: to-spec
description: Turn the current conversation into a specification — no interview, just a synthesis of what you've already discussed. Use when you need a typed architecture handoff.
user-invocable: true
disable-model-invocation: true
---

# To Spec

## Purpose

Produce a technical specification from the current conversation and repository context.

The specification is a **typed architecture handoff**: required behavior, contracts, execution, repository ownership, and correctness evidence.

This skill is design-only. Do not implement the specification.

Use [Notation](../../shared/code-notation.md) for all code-shaped architectural representations. Select the smallest applicable notation set. Do not duplicate the same information across notations unless each view adds implementation-relevant information.

## Workflow

### 1. Load repository context

Inspect relevant code and documentation.

Identify applicable existing conventions for:

- vocabulary and domain concepts;
- module and file structure;
- architecture boundaries;
- interfaces, schemas, ports, and adapters;
- dependency injection;
- error handling;
- runtime and deployment;
- testing style and seams.

Do not introduce a new pattern, library, schema style, adapter style, DI pattern, or test strategy when an applicable project pattern already exists.

**Gate:**

- Relevant existing implementation has been inspected.
- Applicable project vocabulary, structure, patterns, and conventions are known.

### 2. Define required behavior

Determine what must be true from conversation, code, and documentation.

Capture applicable:

- current behavior;
- desired behavior;
- goals;
- non-goals;
- constraints;
- invariants;
- affected entrypoints, modules, boundaries, external systems, and user-facing surfaces;
- operational or runtime requirements;
- unresolved requirements.

Rules:

- Distinguish observed current state from requested behavior.
- Do not convert existing implementation details into requirements unless explicitly constrained.
- Do not infer unstated product behavior.
- Record missing implementation-significant information as an open question.
- Do not create empty categories.
- Include context only when it affects the design.

**Gate:**

- Every required behavior identified from available sources is represented.
- Every relevant constraint and invariant is explicit.
- No requirement depends on an unstated assumption.
- Unresolved implementation-significant requirements are open questions.

### 3. Resolve design decisions

Identify architecture-significant decisions required before implementation.

Explore alternatives only when reasonable designs materially differ in:

- ownership;
- contract shape;
- seam placement;
- module boundary;
- persistence model;
- runtime topology;
- execution flow.

Compare alternatives only on applicable factors:

- complexity;
- caller burden;
- responsibility placement;
- invariant locality;
- seam quality;
- testability;
- consistency with existing architecture.

Follow established project patterns when no material alternative exists. Do not invent alternatives for completeness.

Do not specify incidental implementation choices that can safely remain local to implementation.

**Gate:**

- Every implementation-blocking design decision is resolved or an open question.
- Material alternatives have a justified recommendation.

### 4. Define contracts

Specify every affected contract that is added, changed, or removed.

Include applicable:

- domain and refined types;
- state variants;
- inputs and outputs;
- request and response DTOs;
- function signatures;
- module interfaces;
- expected failures;
- ports and adapter interfaces;
- persistence projections;
- runtime-boundary codecs;
- public APIs.

For each affected boundary, define:

- owner;
- data crossing it;
- dependencies each side may know;
- implementation details that must not cross it.

Explicitly identify affected boundaries whose contracts remain unchanged when that fact matters to the design.

Use the applicable contract notation from [Notation](../../shared/code-notation.md).

**Gate:**

- Every changed boundary has a concrete contract.
- Important states and expected failures are representable.
- Boundary ownership and dependency direction are unambiguous.

### 5. Define execution

Specify every affected behavior from entrypoint through relevant responsibilities, boundaries, side effects, and result.

Follow existing repository boundaries. Preserve application/domain and infrastructure separation where applicable.

Prefer small responsibilities and explicit seams.

Represent applicable:

- normal execution;
- business rules and branching;
- type transformations;
- data movement;
- state transitions;
- events and resulting behavior;
- cross-runtime or cross-system interactions;
- UI structure, state, interactions, visual states, and accessibility behavior;
- validation;
- authorization;
- expected failures;
- transactions;
- retries;
- cancellation;
- idempotency;
- runtime hops;
- observability.

Use [Notation](../../shared/code-notation.md) to select the appropriate representation for each design question.

When existing behavior changes, use the notation's diff modifier when the delta is clearer than restating the complete design.

**Gate:**

- Every affected behavior has sufficient execution detail for implementation.
- Every side effect crosses an explicit seam.
- Each responsibility has a clear owner.
- Relevant failure and runtime paths are represented.
- No notation is present unless it answers a distinct implementation-relevant question.

### 6. Map repository changes

Map the design to repository ownership.

Show applicable:

- files or modules to add;
- files or modules to change;
- files or modules to remove;
- tests;
- migrations;
- configuration;
- runtime wiring.

State the responsibility owned by each affected file or module.

Use the applicable structure notation from [Notation](../../shared/code-notation.md).

**Gate:**

- Every changed contract has an owning file or module.
- Every execution responsibility has an identifiable owner.
- File and module ownership is unambiguous.

### 7. Define correctness

Specify how the design will be verified.

Capture applicable:

- test seams;
- required positive behavior;
- expected failures;
- invariants requiring coverage;
- integration or runtime verification that cannot be proven at a smaller seam.

Do not write implementation-level test code.

**Gate:**

- Every required behavior has appropriate correctness evidence.
- Expected failures and important invariants are covered.
- Verification follows existing project testing patterns.

### 8. Validate

Before emitting, verify:

- required behavior maps to contracts and execution where applicable;
- contracts referenced by execution exist;
- execution responsibilities map to repository ownership;
- correctness evidence covers required behavior;
- unresolved design-significant information is explicit;
- sections do not contradict or unnecessarily duplicate each other;
- every code-shaped representation follows [Notation](../../shared/code-notation.md).

Define each fact once in its canonical section. Reference it elsewhere instead of restating it.

The specification must allow an implementation agent to proceed without inventing required behavior, contracts, ownership boundaries, or execution steps.

## Output

Emit the specification using [Specification](./templates/spec.template.md), then stop.

Always include the common sections. Under `Design`, include only applicable groups and sections:

- **System**: include when domain behavior, contracts, application logic, data, architecture, integrations, infrastructure, or runtime behavior is affected.
- **UI**: include when components, UI state, user interactions, accessibility, visual behavior, or responsive behavior is affected.
- Include both for cross-stack changes.
- Within each group, omit sections that do not contribute implementation-relevant information.

Do not implement. Do not ask to implement unless explicitly requested.

Use [Notation](../../shared/code-notations.md) for code-shaped representations.
