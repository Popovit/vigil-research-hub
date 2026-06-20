import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import Navbar from './components/Navbar'
import SearchPage from './pages/SearchPage'
import SavedPage from './pages/SavedPage'
import AuthPage from './pages/AuthPage'

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </AuthProvider>
  )
}
