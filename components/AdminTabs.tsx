'use client'

import { useState } from 'react'
import { FileText, ExternalLink, Calendar, MapPin, Phone, Users } from 'lucide-react'
import ProductTab from './admin/ProductTab'

type Buyer = {
  id: string
  name: string
  email: string
  mobile: string | null
  state: string | null
  city: string | null
  licenseUrl: string | null
  idProofUrl: string | null
  createdAt: Date
}

type Order = {
  id: string
  totalAmount: number
  paymentStatus: string
  status: string
  createdAt: Date
  user: { name: string; email: string }
}

export default function AdminTabs({ buyers, orders }: { buyers: Buyer[], orders: Order[] }) {
  const [activeTab, setActiveTab] = useState<'buyers' | 'orders' | 'products'>('buyers')

  return (
    <>
      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-[#e8e4da]">
        <button
          onClick={() => setActiveTab('buyers')}
          className={`pb-4 px-4 font-bold text-lg transition-all ${activeTab === 'buyers' ? 'text-[#2d5016] border-b-2 border-[#2d5016]' : 'text-[#666666] hover:text-[#1a1a1a]'}`}
        >
          Registered Buyers
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-4 px-4 font-bold text-lg transition-all ${activeTab === 'orders' ? 'text-[#2d5016] border-b-2 border-[#2d5016]' : 'text-[#666666] hover:text-[#1a1a1a]'}`}
        >
          Recent Orders
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-4 px-4 font-bold text-lg transition-all ${activeTab === 'products' ? 'text-[#2d5016] border-b-2 border-[#2d5016]' : 'text-[#666666] hover:text-[#1a1a1a]'}`}
        >
          Products
        </button>
      </div>

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && <ProductTab />}

      {/* BUYERS TAB */}
      {activeTab === 'buyers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buyers.length === 0 ? (
            <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-[#e8e4da]">
              <Users size={32} className="text-[#d4af37] mx-auto mb-4" />
              <p className="text-xl font-bold text-[#1a1a1a]">No buyers registered yet.</p>
            </div>
          ) : (
            buyers.map((buyer) => (
              <div key={buyer.id} className="bg-white rounded-3xl p-6 shadow-sm border border-[#e8e4da] hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#1a1a1a]">{buyer.name}</h3>
                    <p className="text-[#666666] text-sm break-all">{buyer.email}</p>
                  </div>
                  <span className="text-xs bg-[#2d5016]/10 text-[#2d5016] font-bold px-2 py-1 rounded">Buyer</span>
                </div>

                <div className="space-y-2 mb-5">
                  {buyer.mobile && (
                    <div className="flex items-center gap-2 text-sm text-[#666666]">
                      <Phone size={13} className="text-[#d4af37]" /> {buyer.mobile}
                    </div>
                  )}
                  {(buyer.city || buyer.state) && (
                    <div className="flex items-center gap-2 text-sm text-[#666666]">
                      <MapPin size={13} className="text-[#d4af37]" /> {[buyer.city, buyer.state].filter(Boolean).join(', ')}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-[#666666]">
                    <Calendar size={13} className="text-[#d4af37]" /> Joined: {new Date(buyer.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-[#1a1a1a] uppercase tracking-wide mb-2">KYC Documents</p>
                  {buyer.licenseUrl ? (
                    <a href={buyer.licenseUrl} target="_blank" rel="noreferrer"
                      className="flex items-center gap-2 text-sm bg-[#faf8f3] px-3 py-2 rounded-lg text-[#2d5016] border border-[#e8e4da] hover:border-[#2d5016] transition-colors">
                      <FileText size={15} /> Fertilizer License <ExternalLink size={13} className="ml-auto" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-2 text-sm bg-red-50 text-red-400 px-3 py-2 rounded-lg border border-red-100">
                      <FileText size={15} /> No License Uploaded
                    </div>
                  )}
                  {buyer.idProofUrl ? (
                    <a href={buyer.idProofUrl} target="_blank" rel="noreferrer"
                      className="flex items-center gap-2 text-sm bg-[#faf8f3] px-3 py-2 rounded-lg text-[#2d5016] border border-[#e8e4da] hover:border-[#2d5016] transition-colors">
                      <FileText size={15} /> ID Proof / Aadhaar <ExternalLink size={13} className="ml-auto" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-2 text-sm bg-red-50 text-red-400 px-3 py-2 rounded-lg border border-red-100">
                      <FileText size={15} /> No ID Proof Uploaded
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl shadow-sm border border-[#e8e4da] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#faf8f3] border-b border-[#e8e4da]">
                  <th className="py-4 px-6 font-bold text-[#1a1a1a]">Order ID</th>
                  <th className="py-4 px-6 font-bold text-[#1a1a1a]">Buyer</th>
                  <th className="py-4 px-6 font-bold text-[#1a1a1a]">Total Amount</th>
                  <th className="py-4 px-6 font-bold text-[#1a1a1a]">Payment</th>
                  <th className="py-4 px-6 font-bold text-[#1a1a1a]">Status</th>
                  <th className="py-4 px-6 font-bold text-[#1a1a1a]">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e4da]">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center text-[#666666]">No orders yet.</td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#faf8f3] transition-colors">
                      <td className="py-4 px-6 text-sm font-medium text-[#2d5016]">#{order.id.slice(-6).toUpperCase()}</td>
                      <td className="py-4 px-6">
                        <p className="font-bold text-[#1a1a1a] text-sm">{order.user.name}</p>
                        <p className="text-xs text-[#666666]">{order.user.email}</p>
                      </td>
                      <td className="py-4 px-6 font-bold text-[#1a1a1a]">Rs. {order.totalAmount.toLocaleString()}</td>
                      <td className="py-4 px-6">
                        <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase ${order.paymentStatus === 'paid' ? 'bg-[#2d5016]/10 text-[#2d5016]' : 'bg-[#d4af37]/20 text-[#1a1a1a]'}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-xs px-2 py-1 rounded-full font-bold uppercase bg-[#e8e4da]/50 text-[#666666]">{order.status}</span>
                      </td>
                      <td className="py-4 px-6 text-sm text-[#666666]">{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}
