---
name: domain-modeling
description: Build and sharpen then project's domain model. Use when defining, challenging, or changing domain terminology, relationships, or glossary entries.
user-invocable: false
disable-model-invocation: false
---

# Domain Modeling

## Purpose

Build and sharpen then project's domain model. Use only when the domain model is being changed. Reading existing domain vocabulary does not activate this skill.

## Files

Use one root glossary by default:

```text
/
├── GLOSSARY.md
├── docs/adr/
│   ├── 0001-event-sourced-orders.md
│   └── 0002-postgres-for-write-model.md
└── src/
```

If `/GLOSSARY-MAP.md` exists, use it to locate the glossary for the affected context:

```text
/
├── GLOSSARY-MAP.md                 ← system-wide glossary map
├── docs/adr/
└── src/
    ├── ordering/
    │   ├── GLOSSARY.md             ← context-specific glossary
    │   └── docs/adr/
    └── billing/
        ├── GLOSSARY.md             ← context-specific glossary
        └── docs/adr/
```

Create files only when needed:

- Create the applicable `GLOSSARY.md` when the first term is resolved.
- Create the applicable `docs/adr/` when the first ADR is created.

## Workflow

### 1. Load the current model

Before changing terminology:

- Read the applicable `GLOSSARY.md`, if present.
- If `/GLOSSARY-MAP.md` exists, use the glossary mapped to the affected context.

### 2. Resolve terminology

For each domain term introduced or changed:

- If it conflicts with an existing glossary term, surface the conflict and resolve it before proceeding.
- If it is vague or overloaded, propose distinct canonical terms and resolve their meanings.
- If its boundaries or relationships are unclear, test them with concrete scenarios until they are unambiguous.
- If code behavior contradicts the proposed model, surface the contradiction and resolve which behavior is authoritative.

Do not write unresolved terminology to the glossary.

### 3. Update the glossary

Immediately after a term is resolved:

- Add or update it in the applicable `GLOSSARY.md`.
- Follow [GLOSSARY](./references/GLOSSARY.md).
- Include domain meaning only.
- Exclude implementation details, design decisions, specifications, and unresolved questions.

### 4. Create an ADR when required

Create an ADR only when all of the following are true:

- **Hard to reverse**: the cost of changing your mind later is meaningful;
- **Surprising without context**: a future reader will wonder "why did they do it this way?";
- **The result of a real trade-off**: there were genuine alternatives and you picked one for specific reasons.

Otherwise, do not create one.

When required, use [ADR](./references/ADR.md).

## Validation

Before completing the domain-modeling work, verify:

- Every resolved term changed during the session is represented in the applicable glossary.
- No unresolved or ambiguous term was added.
- No glossary entry contains implementation details.
- Every surfaced glossary or code contradiction was resolved.
- Every ADR created satisfies all three ADR conditions.
