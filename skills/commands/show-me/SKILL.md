---
name: show-me
description: Help the user understand the current topic visually with concise diagrams, code-shape sketches, and focused HTML artifacts.
user-invocable: true
disable-model-invocation: true
---

# Show Me

## Purpose

Help the user understand the current topic of conversation visually. Skip the preamble and keep prose brief. Pick the smallest set of notations that makes the key point clear.

## Visuals

Use [Notation](../../../shared/code-notations.md) to select the appropriate set of visuals that makes the point clear.

## Diff blocks

Use diff block variations matching what you are trying to show.

**For a component change:**

```diff
 <SessionPage>
    useSessionEvents()
    <SessionToolbar>
+      <RunSkillButton />
    <SessionTimeline>
+      <SkillResultCard />
```

**For a file-layout change:**

```diff
 src/
 ├── commands/
+│   └── show-me.ts       # expands the slash command
 ├── sessions/
-└── transport.ts
+└── transport/
+    ├── client.ts
+    └── stream.ts
```

**For a call-tree or call-stack change:**

```diff
 submitForm
   createSession
     persistPrompt
+    expandSkillMention
     launchAgent
-  navigateToSession
+  navigateToSession
+    subscribeToEvents
```

**For a state or control-flow change:**

```diff
 on(save)
-   write content
+   if content is unchanged
+      return cached result
+   write new content
+   invalidate cache
```

## HTML artifact

Use HTML artifacts to provide visual representations of the system, such as visual UI, layout, diagrams, infographics, or concept that is too dense for the formats above.

Create one focused HTML file only when simpler formats are insufficient.

The artifact must:

- represent the actual concept, UI, labels, and data under discussion,
- match the relevant product styling when known,
- work on desktop and mobile,
- contain only information needed for the current point.

Name it: `show-me-{description}.html`

Then open it for the user.

```sh
Bash(open path/to/show-me-{description}.html)
```

### Guidance

**Keep only relevant detail**:

Include only the calls, files, components, props, states, boundaries, and labels required to explain:

- the user's current question, orl
- the options needed to resolve the current discussion point.

Do not expand the scope beyond the current topic.

**Use judgement**:

You may use one visual, or you may use several visual. It is unlikely you will use all of them. Use your judgement and don't overwhelm the user.

## Completion check

Before finishing, verify that:

- the visual directly answers the current discussion point,
- each visuals is placed next to a short supporting text,
- the selected format is the simplest adequate one,
- every included element contributes to the explanation,
- no required ownership, order, state, or boundary is hidden,
- the result does not introduce unrelated design or implementation decisions.
