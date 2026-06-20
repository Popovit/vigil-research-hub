import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function AuthPage() {
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setInfo('')
    setLoading(true)

    if (mode === 'signin') {
      const { error } = await signIn(email, password)
      if (error) setError(error.message)
      else navigate('/saved')
    } else {
      const { error } = await signUp(email, password)
      if (error) setError(error.message)
      else setInfo('Регистрацията е успешна. Провери имейла си за потвърждение, после влез.')
    }
    setLoading(false)
  }

  return (
    <div className="container" style={{ maxWidth: 420, paddingTop: 80, paddingBottom: 80 }}>
      <div className="card">
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>
          {mode === 'signin' ? 'Вход' : 'Регистрация'}
        </h2>
        <p className="muted" style={{ fontSize: 13, marginBottom: 24 }}>
          {mode === 'signin' ? 'Влез в своето изследователско пространство.' : 'Създай акаунт за лични бележки и любими.'}
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label className="label">Имейл</label>
            <input
              className="input" type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label className="label">Парола</label>
            <input
              className="input" type="password" required minLength={6} value={password}
              onChange={(e) => setPassword(e.target.value)} placeholder="минимум 6 символа"
            />
          </div>

          {error && (
            <div style={{ background: 'var(--danger-light)', color: 'var(--danger)', fontSize: 13, padding: '8px 12px', borderRadius: 8, marginBottom: 14 }}>
              {error}
            </div>
          )}
          {info && (
            <div style={{ background: 'var(--signal-light)', color: '#0A7A58', fontSize: 13, padding: '8px 12px', borderRadius: 8, marginBottom: 14 }}>
              {info}
            </div>
          )}

          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '10px' }}>
            {loading ? 'Моля изчакай...' : mode === 'signin' ? 'Влез' : 'Регистрирай се'}
          </button>
        </form>

        <p style={{ fontSize: 13, marginTop: 18, textAlign: 'center' }}>
          {mode === 'signin' ? (
            <>Нямаш акаунт? <a onClick={() => setMode('signup')} style={{ color: 'var(--signal)', cursor: 'pointer', fontWeight: 500 }}>Регистрирай се</a></>
          ) : (
            <>Вече имаш акаунт? <a onClick={() => setMode('signin')} style={{ color: 'var(--signal)', cursor: 'pointer', fontWeight: 500 }}>Влез</a></>
          )}
        </p>
      </div>
    </div>
  )
}
