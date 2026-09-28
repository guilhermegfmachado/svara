import { CORE } from './core.js'
import { TEMPO } from './tempo.js'
import { DYNAMICS } from './dynamics.js'
import { EXPRESSION } from './expression.js'
import { ARTICULATION } from './articulation.js'
import { ORNAMENTS } from './ornaments.js'
import { NOTATION } from './notation.js'
import { HARMONY } from './harmony.js'
import { FORM } from './form.js'
import { VOICE } from './voice.js'
import { INSTRUMENTS } from './instruments.js'
import { DANCES } from './dances.js'
import { NATIONAL } from './national.js'
import { EARLY } from './early.js'

// Display order for category browsing.
export const GLOSSARY_CATEGORIES = [
  'Fundamentals',
  'Scale Structure',
  'Western Harmony',
  'Harmony & Counterpoint',
  'Form & Structure',
  'Notation',
  'Tempo',
  'Dynamics',
  'Expression',
  'Articulation',
  'Ornaments',
  'Voice',
  'Instruments & Technique',
  'Dances & Genres',
  'Early & Sacred Music',
  'German Terms',
  'French Terms',
  'Russian & Slavic',
  'Hungarian & Central European',
  'Polish & Baltic',
  'Spanish & Iberian',
  'Indian Classical',
  'Arabic & Turkish',
  'East & Southeast Asian',
  'Guitar',
  'Rhythm',
  'Tuning & Temperament',
]

const ALL = [
  ...CORE, ...TEMPO, ...DYNAMICS, ...EXPRESSION, ...ARTICULATION, ...ORNAMENTS,
  ...NOTATION, ...HARMONY, ...FORM, ...VOICE, ...INSTRUMENTS, ...DANCES,
  ...NATIONAL, ...EARLY,
]

// First definition of a term wins; later duplicates are dropped.
const seen = new Set()
export const GLOSSARY = ALL.filter(t => {
  const k = t.term.toLowerCase()
  if (seen.has(k)) return false
  seen.add(k)
  return true
}).sort((a, b) => a.term.localeCompare(b.term, 'en', { sensitivity: 'base' }))

// Languages present, ordered by how many terms use each.
export const GLOSSARY_LANGUAGES = Object.entries(
  GLOSSARY.reduce((acc, t) => {
    if (t.lang) acc[t.lang] = (acc[t.lang] || 0) + 1
    return acc
  }, {})
).sort((a, b) => b[1] - a[1]).map(([lang]) => lang)
