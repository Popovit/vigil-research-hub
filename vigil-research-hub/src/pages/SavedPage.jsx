import { useState, useEffect } from 'react'
import { useAuth } from '../AuthContext'
import { supabase } from '../supabaseClient'
import { Navigate } from 'react-router-dom'

export default function SavedPage() {
  const { user, loading: authLoading } = useAuth()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ title: '', url: '', tag: '' })
  const [filterTag, setFilterTag] = useState('')

  useEffect(() => {
    if (user) fetchArticles()
  }, [user])

  async function fetchArticles() {
    setLoading(true)
    const { data, error } = await supabase
      .from('saved_articles')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    if (!error) setArticles(data)
    setLoading(false)
  }

  async function addArticle(e) {
    e.preventDefault()
    if (!form.title.trim() || !form.url.trim()) return
    const { error } = await supabase.from('saved_articles').insert({
      user_id: user.id,
      title: form.title,
      url: form.url,
      tag: form.tag || 'Общо',
    })
    if (!error) {
      setForm({ title: '', url: '', tag: '' })
      fetchArticles()
    }
  }

  async function deleteArticle(id) {
    await supabase.from('saved_articles').delete().eq('id', id)
    setArticles((prev) => prev.filter((a) => a.id !== id))
  }

  if (authLoading) return null
  if (!user) return <Navigate to="/auth" replace />

  const tags = [...new Set(articles.map((a) => a.tag))]
  const filtered = filterTag ? articles.filter((a) => a.tag === filterTag) : articles

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 60 }}>
      <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.5px', marginBottom: 6 }}>
        Моите запазени статии
      </h1>
      <p className="muted" style={{ marginBottom: 28 }}>
        Лично пространство — само ти виждаш това, освен ако не маркираш статия като публична.
      </p>

      <div className="card" style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>Добави ръчно</h3>
        <form onSubmit={addArticle}>
          <div className="grid" style={{ gridTemplateColumns: '2fr 2fr 1fr auto', gap: 10, alignItems: 'end' }}>
            <div>
              <label className="label">Заглавие</label>
              <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Заглавие на статия" />
            </div>
            <div>
              <label className="label">URL</label>
              <input className="input" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} placeholder="https://..." />
            </div>
            <div>
              <label className="label">Тема</label>
              <input className="input" value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} placeholder="напр. Инфаркт" />
            </div>
            <button className="btn btn-primary" type="submit">
              <i className="ti ti-plus" style={{ fontSize: 14 }} aria-hidden="true"></i> Запази
            </button>
          </div>
        </form>
      </div>

      {tags.length > 0 && (
        <div className="flex gap-8" style={{ flexWrap: 'wrap', marginBottom: 20 }}>
          <button className={`chip ${!filterTag ? 'active' : ''}`} onClick={() => setFilterTag('')}>Всички</button>
          {tags.map((t) => (
            <button key={t} className={`chip ${filterTag === t ? 'active' : ''}`} onClick={() => setFilterTag(t)}>{t}</button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="grid grid-2">
          {[1, 2, 3, 4].map((i) => <div key={i} className="skeleton" style={{ height: 70 }} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <i className="ti ti-bookmark-off" style={{ fontSize: 32, marginBottom: 10, display: 'block' }} aria-hidden="true"></i>
          Все още няма запазени статии. Намери нещо в Търсене и натисни иконата за запазване.
        </div>
      ) : (
        <div className="grid grid-2">
          {filtered.map((a) => (
            <div key={a.id} className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <a href={a.url} target="_blank" rel="noreferrer" style={{ fontSize: 14, fontWeight: 500, display: 'block', marginBottom: 4 }}>
                  {a.title}
                </a>
                <div className="flex gap-8">
                  <span className="badge badge-market">{a.tag}</span>
                  {a.source_name && <span className="muted" style={{ fontSize: 11 }}>{a.source_name}</span>}
                </div>
              </div>
              <button className="btn btn-sm btn-ghost btn-danger" onClick={() => deleteArticle(a.id)} aria-label="Изтрий">
                <i className="ti ti-trash" style={{ fontSize: 14 }} aria-hidden="true"></i>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
