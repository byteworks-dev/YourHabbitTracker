import { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const { error } = isRegistering 
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })

    if (error) alert(error.message)
    setLoading(false)
  }

  return (
    // Hintergrund in einem festen Pastellblau
    <div className="min-h-screen flex items-center justify-center bg-[#E0F2FE] p-4">
      
      {/* Die Kachel in einem sehr hellen Mint-Weiß (Glassmorphism Light) */}
      <div className="w-full max-w-md bg-[#F0FDF4]/80 backdrop-blur-xl p-10 rounded-[48px] border-4 border-white shadow-2xl">
        
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-white rounded-3xl shadow-sm mb-4">
            <span className="text-3xl">🔑</span>
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            {isRegistering ? 'Konto erstellen' : 'Willkommen'}
          </h1>
          <p className="text-blue-600/60 mt-2 font-semibold uppercase text-xs tracking-[0.2em]">
            Dein Habit Tracker
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email Adresse"
              className="w-full p-4 rounded-2xl bg-white border-none shadow-inner focus:ring-4 focus:ring-blue-200 outline-none transition-all placeholder:text-slate-300 text-slate-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Passwort"
              className="w-full p-4 rounded-2xl bg-white border-none shadow-inner focus:ring-4 focus:ring-blue-200 outline-none transition-all placeholder:text-slate-300 text-slate-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-4 mt-6 rounded-2xl bg-blue-500 text-white font-bold text-lg hover:bg-blue-600 hover:shadow-[0_10px_20px_rgba(59,130,246,0.3)] hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? 'Lade...' : isRegistering ? 'Registrieren' : 'Anmelden'}
          </button>
        </form>

        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="w-full mt-8 text-sm font-bold text-blue-400 hover:text-blue-600 transition-colors"
        >
          {isRegistering ? 'Bereits Mitglied? Hier einloggen' : 'Noch kein Konto? Jetzt erstellen'}
        </button>
      </div>
    </div>
  )
}