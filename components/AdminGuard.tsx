'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoggedIn, isInitialized } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isInitialized) return
    if (!isLoggedIn || user?.role !== 'admin') {
      router.replace('/login?redirect=/admin')
    }
  }, [isLoggedIn, isInitialized, user, router])

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-[#faf8f3] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="w-10 h-10 border-4 border-[#0f2a04]/20 border-t-[#0f2a04] rounded-full animate-spin" />
          <p className="text-[#666] text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn || user?.role !== 'admin') {
    // Still show spinner while redirecting
    return (
      <div className="min-h-screen bg-[#faf8f3] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="w-10 h-10 border-4 border-[#0f2a04]/20 border-t-[#0f2a04] rounded-full animate-spin" />
          <p className="text-[#666] text-sm">Redirecting...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
