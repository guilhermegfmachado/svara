import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { GLOSSARY, GLOSSARY_CATEGORIES } from '../data/glossary.js'
import { SearchIcon, CloseIcon } from '../components/icons.jsx'
import styles from './GlossaryPage.module.css'

function slug(term) {
  return term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

const BY_TERM = new Map(GLOSSARY.map(t => [t.term.toLowerCase(), t]))

export default function GlossaryPage({ scales = [] }) {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return GLOSSARY.filter(t => {
      if (cat && t.cat !== cat) return false
      if (!q) return true
      return (
        t.term.toLowerCase().includes(q) ||
        (t.also || '').toLowerCase().includes(q) ||
        t.def.toLowerCase().includes(q)
      )
    })
  }, [query, cat])

  // Group results under their category headings, preserving category order
  const grouped = useMemo(() => {
    return GLOSSARY_CATEGORIES
      .map(c => ({ cat: c, terms: results.filter(t => t.cat === c) }))
      .filter(g => g.terms.length > 0)
  }, [results])

  const activeFilter = query.trim() || cat

  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Glossary</h1>
          <p className={styles.subtitle}>
            Terms you'll meet across this site — Western theory, Indian classical,
            Arabic maqam, gamelan, guitar and rhythm.
          </p>
        </header>

        <div className={styles.searchBar}>
          <span className={styles.searchIcon}><SearchIcon size={15} /></span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search terms and definitions…"
            aria-label="Search glossary"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button className={styles.clearBtn} onClick={() => setQuery('')} aria-label="Clear search">
              <CloseIcon size={11} />
            </button>
          )}
        </div>

        <div className={styles.cats}>
          <button
            className={`${styles.catBtn} ${cat === '' ? styles.catActive : ''}`}
            onClick={() => setCat('')}
          >
            All
          </button>
          {GLOSSARY_CATEGORIES.map(c => (
            <button
              key={c}
              className={`${styles.catBtn} ${cat === c ? styles.catActive : ''}`}
              onClick={() => setCat(cat === c ? '' : c)}
            >
              {c}
            </button>
          ))}
        </div>

        <p className={styles.count}>
          {results.length} term{results.length !== 1 ? 's' : ''}
          {activeFilter ? ' shown' : ''}
        </p>

        {results.length === 0 ? (
          <div className={styles.empty}>
            <p>No terms match that search.</p>
            <button className="btn btn-ghost" onClick={() => { setQuery(''); setCat('') }}>
              Clear
            </button>
          </div>
        ) : (
          grouped.map(group => (
            <section key={group.cat} className={styles.group}>
              <h2 className={styles.groupTitle}>{group.cat}</h2>
              <dl className={styles.list}>
                {group.terms.map(t => {
                  const examples = t.scaleMatch ? scales.filter(t.scaleMatch) : []
                  return (
                    <div key={t.term} id={slug(t.term)} className={styles.entry}>
                      <dt className={styles.term}>
                        {t.term}
                        {t.also && <span className={styles.also}>{t.also}</span>}
                      </dt>
                      <dd className={styles.def}>
                        <p>{t.def}</p>

                        {t.seeAlso?.length > 0 && (
                          <p className={styles.seeAlso}>
                            See also:{' '}
                            {t.seeAlso.map((s, i) => {
                              const known = BY_TERM.has(s.toLowerCase())
                              return (
                                <span key={s}>
                                  {i > 0 && ', '}
                                  {known
                                    ? <a href={`#${slug(s)}`} className={styles.xref}>{s}</a>
                                    : s}
                                </span>
                              )
                            })}
                          </p>
                        )}

                        {examples.length > 0 && (
                          <div className={styles.examples}>
                            <span className={styles.examplesLabel}>
                              {examples.length > 5
                                ? `${examples.length} on this site, e.g.`
                                : 'On this site'}
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
          ))
        )}
      </div>
    </div>
  )
}
