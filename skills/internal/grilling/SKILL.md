---
name: grilling
description: Grill the user relentlessly about a plan, decision, or idea until every relevant decision is explicit and a shared understanding is reached. Use when the user wants to stress-test their thinking, or uses any 'grill' trigger phrase.
user-invocable: false
disable-model-invocation: false
---

# Grilling

## Purpose

Interview the user relentlessly until every relevant decision is settled and you share the same understanding.

Do not act on the result until the user confirms that understanding.

## Decision Model

Model the discussion as a **design tree**:

- Each node is a decision.
- A decision may depend on other decisions.
- A decision is **settled** only when the user explicitly answers or confirms it.
- The **frontier** is every unsettled decision whose prerequisites are already settled.

Never infer answers to user decisions.

## Workflow

Work the tree in **rounds**.

Repeat the following rounds until the frontier is empty:

1. Build or update the design tree from the conversation.
2. Resolve any required facts you can discover yourself. Never ask the user for discoverable facts.
3. Compute the complete frontier.
4. Ask every frontier decision in one round.
5. Wait for the user's answers.
6. Update the tree from those answers and recompute the frontier.

A question that depends on another unsettled question belongs to a later round.

User answers may add, remove, or reopen branches. Do not follow a fixed questionnaire.

## Round Format

For each frontier decision:

```text
❓ **Q1 - <title>**: <question and relevant choices>

➡️ **Recommendation:** <one recommended answer>
```

Rules:

- Number every question.
- Give exactly one recommendation per question.
- Ask the complete frontier.
- Do not ask blocked questions.
- Do not repeat settled decisions unless the user reopens them.
- Do not repeat established context unless needed to understand a new decision.

## Completion

The session is complete only when no relevant decision remains unsettled.

Then:

1. Summarize the settled decisions as the shared understanding.
2. Exclude interview history and discarded alternatives.
3. Ask the user to confirm it.

Do not proceed to specification, planning, implementation, or any other downstream action before confirmation.
