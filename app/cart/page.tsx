'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Trash2, Plus, Minus, ArrowLeft, ArrowRight, ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export default function CartPage() {
  const router = useRouter()
  const { items, updateQuantity, removeFromCart, totalAmount, itemCount } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) return <div className="min-h-screen bg-[#faf8f3]" />

  const tax = totalAmount * 0.05
  const finalTotal = totalAmount + tax

  const handleCheckout = () => {
    setIsCheckingOut(true)
    setTimeout(() => router.push('/checkout'), 800)
  }

  return (
    <div className="min-h-screen bg-[#faf8f3] pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-10">
          <Link href="/#products" className="inline-flex items-center gap-2 text-[#666666] hover:text-[#2d5016] transition-colors font-medium">
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
          <h1 className="text-4xl font-serif font-bold text-[#1a1a1a] mt-6">Your Shopping Cart</h1>
          <p className="text-[#666666] mt-2">You have {itemCount} item{itemCount !== 1 ? 's' : ''} in your cart.</p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-xl border border-[#e8e4da]">
            <div className="w-24 h-24 bg-[#f0ede4] rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart size={40} className="text-[#d4af37]" />
            </div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">Your cart is empty</h2>
            <p className="text-[#666666] mb-8">Looks like you haven't added any products yet.</p>
            <Link href="/#products" className="inline-flex items-center gap-2 bg-[#2d5016] text-white px-8 py-3 rounded-full font-bold hover:bg-[#d4af37] hover:text-[#1a1a1a] transition-all duration-300">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Cart Items */}
            <div className="flex-1 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-3xl shadow-md border border-[#e8e4da] flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative w-28 h-28 bg-[#f0ede4] rounded-2xl overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-bold text-[#1a1a1a]">{item.name}</h3>
                    <p className="text-[#d4af37] font-bold mt-1">Rs. {item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3 bg-[#faf8f3] border border-[#e8e4da] px-3 py-1.5 rounded-full">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white text-[#666666] hover:text-[#1a1a1a] shadow-sm transition-all">
                        <Minus size={14} />
                      </button>
                      <span className="font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white text-[#666666] hover:text-[#1a1a1a] shadow-sm transition-all">
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-right w-24 hidden md:block">
                      <span className="font-bold text-[#1a1a1a]">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-96">
              <div className="bg-white rounded-3xl shadow-xl border border-[#e8e4da] p-8 sticky top-32">
                <h3 className="text-2xl font-serif font-bold text-[#1a1a1a] mb-6">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-[#666666]">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#1a1a1a]">Rs. {totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#666666]">
                    <span>Taxes (5%)</span>
                    <span className="font-semibold text-[#1a1a1a]">Rs. {tax.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-[#666666]">
                    <span>Shipping</span>
                    <span className="font-semibold text-[#2d5016]">Free</span>
                  </div>
                </div>
                <div className="border-t border-[#e8e4da] pt-6 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-bold text-[#1a1a1a]">Total</span>
                    <span className="text-3xl font-bold text-[#2d5016]">Rs. {finalTotal.toFixed(0)}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full flex items-center justify-center gap-2 bg-[#d4af37] text-[#1a1a1a] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#2d5016] hover:text-white transition-all duration-300 disabled:opacity-75"
                >
                  {isCheckingOut ? 'Loading...' : (<>Proceed to Checkout <ArrowRight size={18} /></>)}
                </button>
                <div className="mt-6 text-center text-xs text-[#666666] flex flex-col items-center gap-2">
                  Secure Checkout Process
                  <div className="flex gap-2 opacity-50"><span>💳</span><span>🏦</span><span>🔒</span></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
