import { useState, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { GLOSSARY, GLOSSARY_CATEGORIES, GLOSSARY_LANGUAGES } from '../data/glossary/index.js'
import { SearchIcon, CloseIcon } from '../components/icons.jsx'
import styles from './GlossaryPage.module.css'

function slug(term) {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

// Sorting/grouping letter, with diacritics folded so Étude files under E.
function initial(term) {
  const c = term.normalize('NFD').replace(/[̀-ͯ]/g, '')[0].toUpperCase()
  return /[A-Z]/.test(c) ? c : '#'
}

const LETTERS = [...new Set(GLOSSARY.map(t => initial(t.term)))].sort()

// This app runs on HashRouter, where location.hash IS the route. A plain
// href="#foo" would therefore navigate away instead of jumping in-page, so
// anchors scroll manually and never touch the hash.
function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
const BY_TERM = new Map(GLOSSARY.map(t => [t.term.toLowerCase(), t]))

export default function GlossaryPage({ scales = [] }) {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('')
  const [lang, setLang] = useState('')
  const [mode, setMode] = useState('az')
  const listRef = useRef(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return GLOSSARY.filter(t => {
      if (cat && t.cat !== cat) return false
      if (lang && t.lang !== lang) return false
      if (!q) return true
      return (
        t.term.toLowerCase().includes(q) ||
        (t.also || '').toLowerCase().includes(q) ||
        (t.lit || '').toLowerCase().includes(q) ||
        t.def.toLowerCase().includes(q)
      )
    })
  }, [query, cat, lang])

  const groups = useMemo(() => {
    if (mode === 'cat') {
      return GLOSSARY_CATEGORIES
        .map(c => ({ key: c, terms: results.filter(t => t.cat === c) }))
        .filter(g => g.terms.length > 0)
    }
    const map = new Map()
    results.forEach(t => {
      const k = initial(t.term)
      if (!map.has(k)) map.set(k, [])
      map.get(k).push(t)
    })
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]))
      .map(([key, terms]) => ({ key, terms }))
  }, [results, mode])

  const presentLetters = useMemo(
    () => new Set(results.map(t => initial(t.term))),
    [results]
  )

  const filtered = query.trim() || cat || lang

  function reset() { setQuery(''); setCat(''); setLang('') }

  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Glossary</h1>
          <p className={styles.subtitle}>
            Musical terms from the Western classical tradition and the world traditions
            covered on this site — Italian tempo and expression marks, German, French,
            Russian, Hungarian, Polish and Spanish vocabulary, notation, harmony, form,
            and the language of raga, maqam and gamelan.
          </p>
        </header>

        <div className={styles.toolbar}>
          <label className={styles.searchBar}>
            <span className={styles.searchIcon} aria-hidden="true"><SearchIcon size={15} /></span>
            <input
              type="search"
              className={styles.searchInput}
              placeholder="Search terms and definitions…"
              aria-label="Search glossary"
              enterKeyHint="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') e.currentTarget.blur() }}
            />
            {query && (
              <button
                type="button"
                className={styles.clearBtn}
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                <CloseIcon size={11} />
              </button>
            )}
          </label>

          <div className={styles.modeToggle} role="group" aria-label="Sort order">
            <button
              className={`${styles.modeBtn} ${mode === 'az' ? styles.modeActive : ''}`}
              onClick={() => setMode('az')}
              aria-pressed={mode === 'az'}
            >A–Z</button>
            <button
              className={`${styles.modeBtn} ${mode === 'cat' ? styles.modeActive : ''}`}
              onClick={() => setMode('cat')}
              aria-pressed={mode === 'cat'}
            >By topic</button>
          </div>
        </div>

        {mode === 'az' && (
          <nav className={styles.azBar} aria-label="Jump to letter">
            {LETTERS.map(l => (
              <button
                key={l}
                type="button"
                className={`${styles.azLink} ${presentLetters.has(l) ? '' : styles.azDim}`}
                disabled={!presentLetters.has(l)}
                aria-label={`Jump to ${l}`}
                onClick={() => scrollToId(`letter-${l}`)}
              >{l}</button>
            ))}
          </nav>
        )}

        <details className={styles.filters}>
          <summary className={styles.filtersSummary}>
            Filters{cat || lang ? ` · ${[cat, lang].filter(Boolean).join(' · ')}` : ''}
          </summary>

          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Topic</span>
            <div className={styles.chips}>
              <button className={`${styles.chip} ${!cat ? styles.chipActive : ''}`} onClick={() => setCat('')}>All</button>
              {GLOSSARY_CATEGORIES.map(c => (
                <button
                  key={c}
                  className={`${styles.chip} ${cat === c ? styles.chipActive : ''}`}
                  onClick={() => setCat(cat === c ? '' : c)}
                >{c}</button>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Language</span>
            <div className={styles.chips}>
              <button className={`${styles.chip} ${!lang ? styles.chipActive : ''}`} onClick={() => setLang('')}>All</button>
              {GLOSSARY_LANGUAGES.map(l => (
                <button
                  key={l}
                  className={`${styles.chip} ${lang === l ? styles.chipActive : ''}`}
                  onClick={() => setLang(lang === l ? '' : l)}
                >{l}</button>
              ))}
            </div>
          </div>
        </details>

        <p className={styles.count}>
          {results.length} of {GLOSSARY.length} terms
          {filtered && <button className={styles.resetBtn} onClick={reset}>Reset</button>}
        </p>

        {results.length === 0 ? (
          <div className={styles.empty}>
            <p>No terms match that search.</p>
            <button className="btn btn-ghost" onClick={reset}>Clear filters</button>
          </div>
        ) : (
          <div ref={listRef}>
            {groups.map(group => (
              <section key={group.key} className={styles.group}>
                <h2
                  className={styles.groupTitle}
                  id={mode === 'az' ? `letter-${group.key}` : undefined}
                >
                  {group.key}
                  <span className={styles.groupCount}>{group.terms.length}</span>
                </h2>
                <dl className={styles.list}>
                  {group.terms.map(t => {
                    const examples = t.scaleMatch ? scales.filter(t.scaleMatch) : []
                    return (
                      <div key={t.term} id={slug(t.term)} className={styles.entry}>
                        <dt className={styles.term}>
                          <span className={styles.termName}>{t.term}</span>
                          {t.lang && <span className={styles.lang}>{t.lang}</span>}
                          {t.lit && <span className={styles.lit}>lit. “{t.lit}”</span>}
                          {t.also && <span className={styles.also}>{t.also}</span>}
                        </dt>
                        <dd className={styles.def}>
                          <p>{t.def}</p>

                          {t.seeAlso?.length > 0 && (
                            <p className={styles.seeAlso}>
                              See also:{' '}
                              {t.seeAlso.map((s, i) => (
                                <span key={s}>
                                  {i > 0 && ', '}
                                  {BY_TERM.has(s.toLowerCase())
                                    ? <a
                                        href={`#${slug(s)}`}
                                        className={styles.xref}
                                        onClick={e => { e.preventDefault(); scrollToId(slug(s)) }}
                                      >{s}</a>
                                    : s}
                                </span>
                              ))}
                            </p>
                          )}

                          {examples.length > 0 && (
                            <div className={styles.examples}>
                              <span className={styles.examplesLabel}>
                                {examples.length > 5 ? `${examples.length} on this site, e.g.` : 'On this site'}
                              </span>
                              {examples.slice(0, 5).map(s => (
                                <Link key={s.id} to={`/scale/${s.id}`} className={styles.exampleLink}>
                                  {s.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </dd>
                      </div>
                    )
                  })}
                </dl>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
