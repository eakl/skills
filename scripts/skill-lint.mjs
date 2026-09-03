#!/usr/bin/env node
// Zero-dependency validator for this plugin's manifests, skills,
// commands, and agents. Exits non-zero with a message on any failure.

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const errors = []

function readJson(path) {
   try {
      return JSON.parse(readFileSync(path, 'utf8'))
   } catch (err) {
      errors.push(`${path}: invalid JSON (${err.message})`)
      return null
   }
}

// --- Frontmatter parsing (minimal YAML subset: "key: value" lines) ---
function parseFrontmatter(path) {
   const text = readFileSync(path, 'utf8')
   const match = text.match(/^---\n([\s\S]*?)\n---/)
   if (!match) {
      errors.push(`${path}: missing YAML frontmatter block`)
      return {}
   }
   const fm = {}
   for (const line of match[1].split('\n')) {
      const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
      if (m) fm[m[1]] = m[2].trim()
   }
   return fm
}

function listSkillDirs(root) {
   if (!existsSync(root)) return []
   return readdirSync(root).filter((name) => statSync(join(root, name)).isDirectory())
}

// --- Manifests ---
const pluginManifestPath = '.claude-plugin/plugin.json'
const marketplaceManifestPath = '.claude-plugin/marketplace.json'

const plugin = readJson(pluginManifestPath)
if (plugin && !plugin.name) {
   errors.push(`${pluginManifestPath}: missing required "name"`)
}

const marketplace = readJson(marketplaceManifestPath)
if (marketplace && !marketplace.name) {
   errors.push(`${marketplaceManifestPath}: missing required "name"`)
}

// --- skills/ (must be non-user-invocable) ---
for (const dir of listSkillDirs('skills')) {
   const path = join('skills', dir, 'SKILL.md')
   if (!existsSync(path)) {
      errors.push(`skills/${dir}: missing SKILL.md`)
      continue
   }
   const fm = parseFrontmatter(path)
   if (!fm.name) errors.push(`${path}: frontmatter missing "name"`)
   if (!fm.description) errors.push(`${path}: frontmatter missing "description"`)
   if (fm['user-invocable'] !== 'false') {
      errors.push(`${path}: skills/ entries must set "user-invocable: false"`)
   }
   if (fm['disable-model-invocation'] === 'true') {
      errors.push(`${path}: skills/ entries must not set "disable-model-invocation: true"`)
   }
}

// --- commands/ (must be user-invocable only) ---
for (const dir of listSkillDirs('commands')) {
   const path = join('commands', dir, 'SKILL.md')
   if (!existsSync(path)) {
      errors.push(`commands/${dir}: missing SKILL.md`)
      continue
   }
   const fm = parseFrontmatter(path)
   if (!fm.name) errors.push(`${path}: frontmatter missing "name"`)
   if (!fm.description) errors.push(`${path}: frontmatter missing "description"`)
   if (fm['disable-model-invocation'] !== 'true') {
      errors.push(`${path}: commands/ entries must set "disable-model-invocation: true"`)
   }
   if (fm['user-invocable'] === 'false') {
      errors.push(`${path}: commands/ entries must not set "user-invocable: false"`)
   }
}

// --- agents (every plugin.json agents[] path must exist and be valid) ---
if (plugin) {
   for (const path of plugin.agents ?? []) {
      if (!existsSync(path)) {
         errors.push(`plugin.json agents[]: ${path} does not exist`)
         continue
      }
      const fm = parseFrontmatter(path)
      if (!fm.name) errors.push(`${path}: frontmatter missing "name"`)
      if (!fm.description) errors.push(`${path}: frontmatter missing "description"`)
   }
}

if (errors.length > 0) {
   console.error(`skill-lint: ${errors.length} problem(s) found:\n`)
   for (const e of errors) console.error(`  - ${e}`)
   process.exit(1)
}

console.log('skill-lint: OK')
