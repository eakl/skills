# ADR Reference

## Location and naming

Store ADRs in `/docs/adr/`. Name files sequentially: `0001-slug.md`, `0002-slug.md`, etc.

When creating an ADR:

1. Scan `/docs/adr/` for the highest existing numeric prefix.
2. Increment it by one.
3. Create `/docs/adr/` only if the directory does not exist.

## When to create an ADR

Create an ADR only when all three conditions are true:

- **Hard to reverse**: changing the decision later would have meaningful cost.
- **Surprising without context**: a future reader will look at the code and wonder "why on earth did they do it this way?".
- **Real trade-off**: multiple viable alternatives existed and one was deliberately selected.

If any condition is false, do not create an ADR.

## Format

Use the smallest format that preserves the decision and rationale:

```markdown
# {Decision title}

{1-3 sentences stating the context, decision, and rationale.}
```

That's it. An ADR can be a single paragraph that record _that_ a decision was made and _why_ it was made. Do not add sections unless required by the rules below.

### Optional sections

Add a section only when they add genuine value. Most ADRs won't need them.

**Status**: Add frontmatter when the decision may be revisited, replaced, or deprecated. Allowed values:

```yaml
status: proposed
status: accepted
status: deprecated
status: superseded by ADR-NNNN
```

**Considered Options**: Add when remembering rejected alternatives prevents likely reconsideration or explains the selected option.

**Consequences**: Add when the decision has important effects that are not obvious from the decision itself.

## Suitable ADR decisions

Do not create ADRs for routine, local, easily reversible, or self-explanatory choices.

ADRs may record decisions about:

**Architectural shape**:

> "We're using a monorepo."
> "The write model is event-sourced, the read model is projected into Postgres."

**Integration patterns between contexts**:

> "Ordering and Billing communicate via domain events, not synchronous HTTP."

**Technology choices with significant migration cost**:

Database, message bus, auth provider, deployment target. Not every library: just the ones that would take a quarter to swap out.

**Ownership, boundary, or scope decisions**:

The explicit no-s are as valuable as the yes-s.

> "Customer data is owned by the Customer context; other contexts reference it by ID only."

**Deliberate deviations from the expected approach**:

Anything where a reasonable reader would assume the opposite. These stop the next engineer from "fixing" something that was deliberate.

> "We're using manual SQL instead of an ORM because X."

**External constraints not visible in the code**:

> "We can't use AWS because of compliance requirements."
> "Response times must be under 200ms because of the partner API contract."

**Non-obvious rejection of viable alternatives**

If you considered GraphQL and picked REST for subtle reasons, record it; otherwise someone will suggest GraphQL again in six months.

## Validation

Before completing an ADR, verify:

- All three creation conditions are satisfied.
- The filename uses the next sequential number.
- The ADR states the context, decision, and rationale.
- Every optional section satisfies its inclusion condition.
- The ADR contains no implementation detail beyond what is required to understand the decision.
