'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Lock, CreditCard, ShoppingBag } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { useCart } from '@/lib/cart-context'

export default function CheckoutPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { items, totalAmount, clearCart } = useCart()

  const [method, setMethod] = useState<'card' | 'upi'>('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Don't render anything until client-side mounted (avoids hydration mismatch)
  if (!mounted) return <div className="min-h-screen bg-[#faf8f3]" />

  const tax = totalAmount * 0.05
  const finalTotal = totalAmount + tax

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setError('')
    try {
      const token = localStorage.getItem('tgf_auth_token')
      await new Promise(r => setTimeout(r, 1500))
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ items, totalAmount: finalTotal })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Payment failed')
      setSuccess(true)
      clearCart()
    } catch (err: any) {
      setError(err.message)
      setIsProcessing(false)
    }
  }

  // Success screen
  if (success) {
    return (
      <div className="min-h-screen bg-[#faf8f3] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-[#e8e4da] max-w-lg w-full text-center">
          <div className="w-24 h-24 bg-[#0f2a04] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-[#d4af37]" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#1a1a1a] mb-2">Payment Successful!</h1>
          <p className="text-[#666666] mb-8">Thank you{user?.name ? `, ${user.name}` : ''}! Your order has been placed and is now processing.</p>
          <Link href="/#products" className="inline-block w-full bg-[#2d5016] text-white px-8 py-4 rounded-full font-bold hover:bg-[#1a3a0a] transition-all">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  // Empty cart screen
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#faf8f3] flex flex-col items-center justify-center p-4 gap-4">
        <div className="w-20 h-20 bg-[#f0ede4] rounded-full flex items-center justify-center">
          <ShoppingBag size={36} className="text-[#d4af37]" />
        </div>
        <h1 className="text-2xl font-bold text-[#1a1a1a]">Your cart is empty</h1>
        <p className="text-[#666666]">Add some products before checking out.</p>
        <Link href="/#products" className="mt-2 bg-[#2d5016] text-white px-8 py-3 rounded-full font-bold hover:bg-[#d4af37] hover:text-[#1a1a1a] transition-all">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#faf8f3] pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Checkout Form */}
          <div className="flex-1">
            <Link href="/cart" className="inline-flex items-center gap-2 text-[#666666] hover:text-[#2d5016] transition-colors mb-8 font-medium">
              <ArrowLeft size={16} /> Back to Cart
            </Link>
            <h1 className="text-4xl font-serif font-bold text-[#1a1a1a] mb-8">Secure Checkout</h1>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">{error}</div>
            )}

            <form onSubmit={handlePayment} className="bg-white p-8 md:p-10 rounded-3xl shadow-md border border-[#e8e4da]">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-6 flex items-center gap-2">
                <CreditCard size={20} className="text-[#2d5016]" /> Payment Method
              </h2>

              <div className="flex gap-4 mb-8">
                <button type="button" onClick={() => setMethod('card')}
                  className={`flex-1 py-4 border-2 rounded-xl font-bold transition-all ${method === 'card' ? 'border-[#2d5016] bg-[#f8faf6] text-[#2d5016]' : 'border-[#e8e4da] text-[#666666] hover:border-[#2d5016]/50'}`}>
                  Credit Card
                </button>
                <button type="button" onClick={() => setMethod('upi')}
                  className={`flex-1 py-4 border-2 rounded-xl font-bold transition-all ${method === 'upi' ? 'border-[#2d5016] bg-[#f8faf6] text-[#2d5016]' : 'border-[#e8e4da] text-[#666666] hover:border-[#2d5016]/50'}`}>
                  UPI
                </button>
              </div>

              {method === 'card' ? (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-[#1a1a1a] mb-2">Card Number</label>
                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-5 py-3 rounded-xl border border-[#e0e0e0] focus:outline-none focus:border-[#2d5016] focus:ring-1 focus:ring-[#2d5016]" required />
                  </div>
                  <div className="flex gap-5">
                    <div className="flex-1">
                      <label className="block text-sm font-bold text-[#1a1a1a] mb-2">Expiry Date</label>
                      <input type="text" placeholder="MM/YY" className="w-full px-5 py-3 rounded-xl border border-[#e0e0e0] focus:outline-none focus:border-[#2d5016] focus:ring-1 focus:ring-[#2d5016]" required />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-bold text-[#1a1a1a] mb-2">CVV</label>
                      <input type="password" placeholder="123" maxLength={3} className="w-full px-5 py-3 rounded-xl border border-[#e0e0e0] focus:outline-none focus:border-[#2d5016] focus:ring-1 focus:ring-[#2d5016]" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#1a1a1a] mb-2">Name on Card</label>
                    <input type="text" placeholder="John Doe" className="w-full px-5 py-3 rounded-xl border border-[#e0e0e0] focus:outline-none focus:border-[#2d5016] focus:ring-1 focus:ring-[#2d5016]" required />
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-[#1a1a1a] mb-2">UPI ID</label>
                    <input type="text" placeholder="username@upi" className="w-full px-5 py-3 rounded-xl border border-[#e0e0e0] focus:outline-none focus:border-[#2d5016] focus:ring-1 focus:ring-[#2d5016]" required />
                  </div>
                </div>
              )}

              <div className="mt-10">
                <button type="submit" disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 bg-[#d4af37] text-[#1a1a1a] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#2d5016] hover:text-white transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed">
                  {isProcessing ? 'Processing Payment...' : `Pay Rs. ${finalTotal.toFixed(0)}`}
                  {!isProcessing && <Lock size={16} />}
                </button>
                <p className="text-center text-xs text-[#666666] mt-4 flex items-center justify-center gap-1">
                  <Lock size={12} /> Payments are secure and encrypted.
                </p>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-[#f8faf6] rounded-3xl p-8 border border-[#e8e4da] sticky top-32">
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-6">Order Details</h3>
              <div className="space-y-4 mb-6">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-[#666666] pr-4">{item.quantity}x {item.name}</span>
                    <span className="font-semibold text-[#1a1a1a]">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#e8e4da] pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-[#666666] text-sm">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1a1a1a]">Rs. {totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#666666] text-sm">
                  <span>Taxes (5%)</span>
                  <span className="font-semibold text-[#1a1a1a]">Rs. {tax.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-[#666666] text-sm">
                  <span>Shipping</span>
                  <span className="font-semibold text-[#2d5016]">Free</span>
                </div>
              </div>
              <div className="border-t border-[#2d5016]/20 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#1a1a1a]">Total</span>
                  <span className="text-2xl font-bold text-[#2d5016]">Rs. {finalTotal.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
