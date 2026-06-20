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
      else setInfo('Sign-up successful. Check your email to confirm, then sign in.')
    }
    setLoading(false)
  }

  return (
    <div className="container" style={{ maxWidth: 420, paddingTop: 80, paddingBottom: 80 }}>
      <div className="card">
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>
          {mode === 'signin' ? 'Sign in' : 'Sign up'}
        </h2>
        <p className="muted" style={{ fontSize: 13, marginBottom: 24 }}>
          {mode === 'signin' ? 'Sign in to your research space.' : 'Create an account for personal notes and favorites.'}
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
