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
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-6">
      {/* Weißer Karten-Container mit festem Padding und maximaler Breite */}
      <div className="w-full max-w-[400px] bg-white rounded-3xl shadow-sm border border-slate-100 p-10 flex flex-col items-center">
        
        <h1 className="text-3xl font-bold text-[#1E293B] mb-10">
          {isRegistering ? 'Welcome' : 'Welcome Back'}
        </h1>

        <form onSubmit={handleAuth} className="w-full flex flex-col gap-4">
          
          {/* Email Input Gruppe */}
          <div className="relative w-full">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </span>
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-12 pr-4 py-3 bg-[#F1F5F9] border-none rounded-xl text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          {/* Password Input Gruppe */}
          <div className="relative w-full">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </span>
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-12 pr-4 py-3 bg-[#F1F5F9] border-none rounded-xl text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Remember & Forgot Row */}
          <div className="flex items-center justify-between w-full px-1">
            <label className="flex items-center gap-2 text-xs text-slate-500 font-medium cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
              Remember me
            </label>
            <button type="button" className="text-xs text-indigo-600 font-bold hover:text-indigo-700">
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            disabled={loading}
            className="w-full bg-[#6366F1] text-white py-3.5 rounded-xl font-bold text-sm shadow-md shadow-indigo-100 hover:bg-[#4F46E5] active:scale-[0.98] transition-all mt-4 disabled:opacity-50"
          >
            {loading ? 'Processing...' : isRegistering ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500 font-medium">
            {isRegistering ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-indigo-600 font-bold hover:underline ml-1"
            >
              {isRegistering ? 'Log In' : 'Signup'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}