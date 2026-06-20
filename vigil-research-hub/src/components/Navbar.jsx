import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const location = useLocation()

  return (
    <div className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">
          <span className="brand-dot"></span> Vigil Research Hub
        </Link>
        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Търсене</Link>
          <Link to="/saved" className={`nav-link ${location.pathname === '/saved' ? 'active' : ''}`}>Запазени</Link>
        </div>
        {user ? (
          <div className="flex gap-12">
            <span className="muted" style={{ fontSize: 12 }}>{user.email}</span>
            <button className="btn btn-sm" onClick={signOut}>Изход</button>
          </div>
        ) : (
          <Link to="/auth" className="btn btn-sm btn-primary">Вход</Link>
        )}
      </div>
    </div>
  )
}
