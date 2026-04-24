'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, Leaf, LogIn, ShieldCheck, User } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import type { UserRole } from '@/lib/auth-context'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'
  const { login } = useAuth()

  const [role, setRole] = useState<UserRole>('buyer')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')

      login(data.user, data.token)

      // Role-aware redirect
      if (data.user.role === 'admin') {
        router.push('/admin')
      } else {
        router.push(redirect.startsWith('/') ? redirect : `/#${redirect}`)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f9f7f2] flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0f2a04] flex-col items-center justify-center p-16 overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #d4af37 0%, transparent 50%), radial-gradient(circle at 80% 20%, #4a8c1c 0%, transparent 50%)' }}
        />
        <div className="relative z-10 text-center">
          <Link href="/" className="inline-flex items-center gap-4 mb-12">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-SPzh0eq0jCHnxTOHdZqlHZy8leXJSQ.png"
              alt="The Gujarat Fertilizers"
              width={72}
              height={72}
              className="object-contain"
            />
            <div className="text-left">
              <p className="text-white font-bold text-xl tracking-wide">THE GUJARAT</p>
              <p className="text-[#d4af37] font-semibold tracking-widest text-sm">FERTILIZERS</p>
            </div>
          </Link>
          <div className="w-16 h-1 bg-[#d4af37] rounded-full mx-auto mb-8" />
          <h2 className="text-3xl font-serif font-bold text-white mb-4 leading-tight">
            Growing Agriculture<br />
            <span className="text-[#d4af37] italic">Since 1947</span>
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto">
            Sign in to access our full range of premium fertilizer products and place your order with confidence.
          </p>
          <div className="mt-12 grid grid-cols-3 gap-6 text-center">
            {[['100+', 'Products'], ['105K+', 'Farmers'], ['75+', 'Years']].map(([val, lbl]) => (
              <div key={lbl}>
                <div className="text-2xl font-serif font-bold text-[#d4af37]">{val}</div>
                <div className="text-white/50 text-xs mt-1">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Decorative leaf */}
        <Leaf className="absolute bottom-8 right-8 text-white/10" size={120} />
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-SPzh0eq0jCHnxTOHdZqlHZy8leXJSQ.png"
              alt="The Gujarat Fertilizers"
              width={48}
              height={48}
              className="object-contain"
            />
            <div>
              <p className="font-bold text-[#0f2a04] text-sm">THE GUJARAT</p>
              <p className="text-[#d4af37] font-semibold tracking-widest text-xs">FERTILIZERS</p>
            </div>
          </div>

          <h1 className="text-3xl font-serif font-bold text-[#0f2a04] mb-2">Welcome back</h1>
          <p className="text-[#666] text-sm mb-8">Sign in to your account to continue</p>

          {/* Role Toggle */}
          <div className="flex rounded-xl bg-[#f0ede4] p-1 mb-8">
            <button
              type="button"
              onClick={() => setRole('buyer')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                role === 'buyer'
                  ? 'bg-[#0f2a04] text-white shadow-md'
                  : 'text-[#666] hover:text-[#0f2a04]'
              }`}
            >
              <User size={15} />
              Buyer
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                role === 'admin'
                  ? 'bg-[#0f2a04] text-white shadow-md'
                  : 'text-[#666] hover:text-[#0f2a04]'
              }`}
            >
              <ShieldCheck size={15} />
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-[#0f2a04] text-sm font-semibold mb-2">Email Address</label>
              <input
                type="email"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-white border border-[#e0ddd6] rounded-xl text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#0f2a04]/20 focus:border-[#0f2a04] transition-all text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#0f2a04] text-sm font-semibold mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 bg-white border border-[#e0ddd6] rounded-xl text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#0f2a04]/20 focus:border-[#0f2a04] transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#0f2a04] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              id="login-submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#0f2a04] text-white py-4 rounded-full font-bold text-sm hover:bg-[#1a4a08] transition-all duration-300 hover:shadow-xl hover:shadow-[#0f2a04]/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={16} />
                  Sign In as {role === 'buyer' ? 'Buyer' : 'Admin'}
                </>
              )}
            </button>
          </form>

          {role === 'buyer' && (
            <p className="mt-6 text-center text-sm text-[#666]">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-[#0f2a04] font-bold hover:text-[#d4af37] transition-colors">
                Create Buyer Account
              </Link>
            </p>
          )}

          <p className="mt-4 text-center">
            <Link href="/" className="text-xs text-[#999] hover:text-[#0f2a04] transition-colors">
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
