'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Leaf, Upload, CheckCircle2 } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

const STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal',
]

export default function SignupPage() {
  const router = useRouter()
  const { login } = useAuth()

  const [form, setForm] = useState({
    name: '', mobile: '', email: '', password: '', confirm: '',
    state: '', city: '', address: '', terms: false,
  })
  const [licenseFile, setLicenseFile] = useState<File | null>(null)
  const [idFile, setIdFile] = useState<File | null>(null)
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const set = (k: string, v: string | boolean) =>
    setForm((p) => ({ ...p, [k]: v }))

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!/^\d{10}$/.test(form.mobile)) e.mobile = 'Enter a valid 10-digit mobile number'
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    if (!form.state) e.state = 'Please select your state'
    if (!form.city.trim()) e.city = 'City is required'
    if (!form.address.trim()) e.address = 'Address is required'
    if (!licenseFile) e.license = 'Fertilizer license photo is required'
    if (!idFile) e.id = 'ID proof photo is required'
    if (!form.terms) e.terms = 'You must accept the terms'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('email', form.email)
      formData.append('password', form.password)
      formData.append('mobile', form.mobile)
      formData.append('state', form.state)
      formData.append('city', form.city)
      formData.append('address', form.address)
      if (licenseFile) formData.append('licenseFile', licenseFile)
      if (idFile) formData.append('idFile', idFile)

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Signup failed')

      login(data.user, data.token)
      setDone(true)
      setTimeout(() => router.push('/#products'), 2000)
    } catch (err: any) {
      setErrors({ server: err.message })
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-[#f9f7f2] flex items-center justify-center">
        <div className="text-center">
          <CheckCircle2 size={64} className="text-[#0f2a04] mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-[#0f2a04] mb-2">Account Created!</h2>
          <p className="text-[#666] text-sm">Redirecting you to products…</p>
        </div>
      </div>
    )
  }

  const field = (
    id: string, label: string, type: string, placeholder: string,
    value: string, onChange: (v: string) => void,
    extra?: React.ReactNode
  ) => (
    <div>
      <label htmlFor={id} className="block text-[#0f2a04] text-sm font-semibold mb-1.5">{label}</label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-3 bg-white border rounded-xl text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#0f2a04]/20 focus:border-[#0f2a04] transition-all text-sm ${
            errors[id] ? 'border-red-400' : 'border-[#e0ddd6]'
          }`}
        />
        {extra}
      </div>
      {errors[id] && <p className="mt-1 text-xs text-red-500">{errors[id]}</p>}
    </div>
  )

  const fileField = (
    id: string, label: string, hint: string,
    file: File | null, onChange: (f: File) => void, errKey: string
  ) => (
    <div>
      <label className="block text-[#0f2a04] text-sm font-semibold mb-1.5">{label}</label>
      <label
        htmlFor={id}
        className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl py-6 px-4 cursor-pointer transition-all ${
          file ? 'border-[#0f2a04] bg-[#0f2a04]/5' : 'border-[#d4c9b0] hover:border-[#0f2a04] hover:bg-[#f0ede4]'
        } ${errors[errKey] ? 'border-red-400' : ''}`}
      >
        <Upload size={20} className={file ? 'text-[#0f2a04]' : 'text-[#999]'} />
        {file ? (
          <span className="text-[#0f2a04] text-sm font-medium">{file.name}</span>
        ) : (
          <>
            <span className="text-[#666] text-sm">{hint}</span>
            <span className="text-[#999] text-xs">JPG, PNG or PDF · Max 5 MB</span>
          </>
        )}
        <input
          id={id}
          type="file"
          accept="image/*,.pdf"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && onChange(e.target.files[0])}
        />
      </label>
      {errors[errKey] && <p className="mt-1 text-xs text-red-500">{errors[errKey]}</p>}
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f9f7f2]">
      {/* Top bar */}
      <div className="bg-[#0f2a04] py-4 px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-SPzh0eq0jCHnxTOHdZqlHZy8leXJSQ.png"
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <div>
            <p className="text-white font-bold text-sm">THE GUJARAT</p>
            <p className="text-[#d4af37] font-semibold tracking-widest text-xs">FERTILIZERS</p>
          </div>
        </Link>
        <Leaf className="text-white/20" size={32} />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif font-bold text-[#0f2a04] mb-2">Create Buyer Account</h1>
          <p className="text-[#666] text-sm">Fill in your details to register as a verified buyer</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-[#e8e4da] p-8 md:p-10 space-y-6">
          {errors.server && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
              {errors.server}
            </div>
          )}

          {/* Personal Info */}
          <div>
            <h3 className="text-[#0f2a04] font-bold text-base mb-4 pb-2 border-b border-[#f0ede4]">Personal Information</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              {field('name', 'Full Name *', 'text', 'As per your ID proof', form.name, (v) => set('name', v))}
              {field('mobile', 'Mobile Number *', 'tel', '10-digit number', form.mobile, (v) => set('mobile', v))}
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-[#0f2a04] font-bold text-base mb-4 pb-2 border-b border-[#f0ede4]">Account Details</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              {field('email', 'Email Address *', 'email', 'you@example.com', form.email, (v) => set('email', v))}
              <div />
              <div>
                <label htmlFor="password" className="block text-[#0f2a04] text-sm font-semibold mb-1.5">Password *</label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPass ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => set('password', e.target.value)}
                    placeholder="Min. 6 characters"
                    className={`w-full px-4 py-3 pr-12 bg-white border rounded-xl text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#0f2a04]/20 focus:border-[#0f2a04] transition-all text-sm ${errors.password ? 'border-red-400' : 'border-[#e0ddd6]'}`}
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#0f2a04]">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
              </div>
              <div>
                <label htmlFor="confirm" className="block text-[#0f2a04] text-sm font-semibold mb-1.5">Confirm Password *</label>
                <div className="relative">
                  <input
                    id="confirm"
                    type={showConfirm ? 'text' : 'password'}
                    value={form.confirm}
                    onChange={(e) => set('confirm', e.target.value)}
                    placeholder="Re-enter password"
                    className={`w-full px-4 py-3 pr-12 bg-white border rounded-xl text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#0f2a04]/20 focus:border-[#0f2a04] transition-all text-sm ${errors.confirm ? 'border-red-400' : 'border-[#e0ddd6]'}`}
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#0f2a04]">
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.confirm && <p className="mt-1 text-xs text-red-500">{errors.confirm}</p>}
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-[#0f2a04] font-bold text-base mb-4 pb-2 border-b border-[#f0ede4]">Address Details</h3>
            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label htmlFor="state" className="block text-[#0f2a04] text-sm font-semibold mb-1.5">State *</label>
                <select
                  id="state"
                  value={form.state}
                  onChange={(e) => set('state', e.target.value)}
                  className={`w-full px-4 py-3 bg-white border rounded-xl text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#0f2a04]/20 focus:border-[#0f2a04] transition-all text-sm ${errors.state ? 'border-red-400' : 'border-[#e0ddd6]'}`}
                >
                  <option value="">Select state</option>
                  {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state}</p>}
              </div>
              {field('city', 'City / District *', 'text', 'Your city', form.city, (v) => set('city', v))}
            </div>
            <div>
              <label htmlFor="address" className="block text-[#0f2a04] text-sm font-semibold mb-1.5">Full Address *</label>
              <textarea
                id="address"
                value={form.address}
                onChange={(e) => set('address', e.target.value)}
                placeholder="House/Plot No., Street, Village/Town"
                rows={3}
                className={`w-full px-4 py-3 bg-white border rounded-xl text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#0f2a04]/20 focus:border-[#0f2a04] transition-all text-sm resize-none ${errors.address ? 'border-red-400' : 'border-[#e0ddd6]'}`}
              />
              {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
            </div>
          </div>

          {/* Document Upload */}
          <div>
            <h3 className="text-[#0f2a04] font-bold text-base mb-4 pb-2 border-b border-[#f0ede4]">Document Verification</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              {fileField('license', 'Fertilizer License Photo *', 'Upload your fertilizer license', licenseFile, setLicenseFile, 'license')}
              {fileField('idproof', 'Aadhaar / ID Proof *', 'Upload Aadhaar, PAN, or Voter ID', idFile, setIdFile, 'id')}
            </div>
          </div>

          {/* Terms */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.terms}
                onChange={(e) => set('terms', e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#0f2a04]"
              />
              <span className="text-sm text-[#555]">
                I agree to the{' '}
                <Link href="#" className="text-[#0f2a04] font-semibold hover:text-[#d4af37] transition-colors">Terms & Conditions</Link>
                {' '}and confirm that all information provided is accurate and genuine.
              </span>
            </label>
            {errors.terms && <p className="mt-1 text-xs text-red-500 ml-7">{errors.terms}</p>}
          </div>

          <button
            type="submit"
            id="signup-submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#0f2a04] text-white py-4 rounded-full font-bold text-sm hover:bg-[#1a4a08] transition-all duration-300 hover:shadow-xl hover:shadow-[#0f2a04]/20 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <CheckCircle2 size={16} />
                Create My Account
              </>
            )}
          </button>

          <p className="text-center text-sm text-[#666]">
            Already have an account?{' '}
            <Link href="/login" className="text-[#0f2a04] font-bold hover:text-[#d4af37] transition-colors">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
