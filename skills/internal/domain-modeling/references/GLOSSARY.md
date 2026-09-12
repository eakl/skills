# Glossary Reference

## Repository structure

Determine the glossary structure before editing.

- **Single glossary**: use one `/GLOSSARY.md` at the repo root.
- **Multiple glossaries**: use a `/GLOSSARY-MAP.md` at the root of the monorepo that lists the glossaries, where they live, and how they relate to each other.
  **No glossary**: if neither `/GLOSSARY-MAP.md` nor `/GLOSSARY.md` exists, create `/GLOSSARY.md` when the first term is resolved.

In case of multiple glossaries:

1. Read `GLOSSARY-MAP.md`.
2. Identify the glossary that owns the current domain concept.
3. Edit that glossary.
4. If ownership is unclear, resolve the owning context before editing.

## `GLOSSARY.md` format

```markdown
# {Glossary Name}

{One or two sentences defining the domain covered by this glossary.}

## Language

**{Canonical Term}**:

{One or two sentences defining what the concept is.}
_Avoid_: {Alternative term}, {Alternative term}
```

Group entries under additional headings only when distinct domain clusters exist.

For every entry:

- Use one canonical term for one domain concept.
- Define what the concept is in at most two sentences.
- Add `_Avoid_` only when alternative names should not be used.
- Include only concepts belonging to the glossary's domain.
- Exclude implementation details, programming concepts, design decisions, and unresolved terminology.

Do not add an entry until its meaning and owning glossary are resolved.

## `GLOSSARY-MAP.md` format

Use only when the repository contains multiple glossaries.

```markdown
# Glossary Map

## Glossaries

- [{Context A}](./path/to/context-a//GLOSSARY.md): {domain owned by this glossary}
- [{Context B}](./path/to/context-b/GLOSSARY.md): {domain owned by this glossary}

## Relationships

- **{Context A} → {Context B}**: {domain-level relationship}
```

Record only relationships needed to understand boundaries between glossaries. Do not duplicate glossary definitions.

## Validation

Before completing an update, verify:

- Every added term has exactly one canonical meaning.
- Every added term belongs to the glossary being edited.
- No unresolved terminology was added.
- No entry exceeds two definition sentences.
- No entry contains implementation or design details.
- If multiple glossaries exist, every edited glossary is listed in `/GLOSSARY-MAP.md`.
- If a cross-glossary relationship was added, it appears once under `Relationships`.
