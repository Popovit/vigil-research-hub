import { useState, useEffect } from 'react'
import { SOURCES, CAT_LABELS, CAT_BADGE_CLASS, TOPICS } from '../sources'
import { useAuth } from '../AuthContext'
import { supabase } from '../supabaseClient'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [activeCats, setActiveCats] = useState([])
  const [savedMsg, setSavedMsg] = useState(null)
  const { user } = useAuth()

  const cats = ['free', 'uni', 'reg', 'market']

  function toggleCat(cat) {
    setActiveCats((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat])
  }

  const visibleSources = activeCats.length === 0
    ? SOURCES
    : SOURCES.filter((s) => activeCats.includes(s.cat))

  async function quickSave(source) {
    if (!user) {
      setSavedMsg({ type: 'error', text: 'Sign in to save articles.' })
      setTimeout(() => setSavedMsg(null), 3000)
      return
    }
    if (!query.trim()) return

    const { error } = await supabase.from('saved_articles').insert({
      user_id: user.id,
      title: `${query} — search on ${source.name}`,
      url: source.url(query),
      tag: query,
      source_name: source.name,
    })

    if (error) {
      setSavedMsg({ type: 'error', text: 'Error saving article.' })
    } else {
      setSavedMsg({ type: 'success', text: `Saved under "${query}"` })
    }
    setTimeout(() => setSavedMsg(null), 2500)
  }

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 60 }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.5px', marginBottom: 6 }}>
        Search the sources
      </h1>
      <p className="muted" style={{ marginBottom: 28 }}>
        One search, twelve databases. Scientific, regulatory, and market data for predictive healthcare AI.
      </p>

      <input
        className="input"
        style={{ fontSize: 16, padding: '14px 16px', marginBottom: 14 }}
        placeholder="e.g. mmWave heart rate prediction"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="flex gap-8" style={{ flexWrap: 'wrap', marginBottom: 10 }}>
        {TOPICS.map((t) => (
          <button key={t} className="chip" onClick={() => setQuery(t.split(' / ')[0])}>
            {t}
          </button>
        ))}
      </div>

      <div className="flex gap-8" style={{ flexWrap: 'wrap', marginBottom: 28, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
        <span className="muted" style={{ fontSize: 12, marginRight: 4 }}>Filter:</span>
        {cats.map((c) => (
          <button
            key={c}
            className={`chip ${activeCats.includes(c) ? 'active' : ''}`}
            onClick={() => toggleCat(c)}
          >
            {CAT_LABELS[c]}
          </button>
        ))}
      </div>

      {savedMsg && (
        <div style={{
          marginBottom: 16, fontSize: 13, padding: '8px 14px', borderRadius: 8,
          background: savedMsg.type === 'success' ? 'var(--signal-light)' : 'var(--danger-light)',
          color: savedMsg.type === 'success' ? '#0A7A58' : 'var(--danger)',
        }}>
          {savedMsg.text}
        </div>
      )}

      <div className="grid grid-3">
        {visibleSources.map((s) => (
          <div key={s.id} className="card">
            <div className="flex gap-8" style={{ marginBottom: 8 }}>
              <i className={`ti ${s.icon}`} style={{ fontSize: 18, color: 'var(--muted)' }} aria-hidden="true"></i>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</span>
            </div>
            <span className={`badge ${CAT_BADGE_CLASS[s.cat]}`} style={{ marginBottom: 8, display: 'inline-block' }}>
              {CAT_LABELS[s.cat]}
            </span>
            <p className="muted" style={{ fontSize: 12, marginBottom: 14 }}>{s.desc}</p>
            <div className="flex gap-8">
              <a
                href={query ? s.url(query) : undefined}
                target="_blank" rel="noreferrer"
                className="btn btn-sm"
                style={{ flex: 1, justifyContent: 'center', opacity: query ? 1 : 0.4, pointerEvents: query ? 'auto' : 'none' }}
              >
                Open <i className="ti ti-external-link" style={{ fontSize: 13 }} aria-hidden="true"></i>
              </a>
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => quickSave(s)}
                disabled={!query}
                style={{ opacity: query ? 1 : 0.4 }}
                aria-label="Save this search"
              >
                <i className="ti ti-bookmark" style={{ fontSize: 14 }} aria-hidden="true"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
