'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { Plus, Edit2, Trash2 } from 'lucide-react'

// Adjust type if needed to match what you return from API
export type Product = {
  id: string
  name: string
  price: number
  originalPrice: number | null
  image: string
  category: string[]
  tag: string | null
  description: string
  badge: string | null
  unit: string | null
  stock: number
}

export default function ProductTab() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  
  // Form State
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    originalPrice: '',
    image: '',
    category: '', // We'll convert to array
    tag: '',
    description: '',
    badge: '',
    unit: '',
    stock: ''
  })

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      if (Array.isArray(data)) {
        setProducts(data)
      } else {
        console.error('API Error:', data)
        setProducts([])
      }
    } catch (e) {
      console.error(e)
      setProducts([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingId(product.id)
      setFormData({
        id: product.id,
        name: product.name,
        price: product.price.toString(),
        originalPrice: product.originalPrice ? product.originalPrice.toString() : '',
        image: product.image,
        category: product.category.join(', '),
        tag: product.tag || '',
        description: product.description,
        badge: product.badge || '',
        unit: product.unit || '',
        stock: product.stock.toString()
      })
    } else {
      setEditingId(null)
      setFormData({
        id: '', name: '', price: '', originalPrice: '', image: '', category: '', tag: '', description: '', badge: '', unit: '', stock: '0'
      })
    }
    setIsModalOpen(true)
    // Scroll to top so the modal is always fully visible
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Convert category string to array
    const catArray = formData.category.split(',').map(c => c.trim()).filter(Boolean)

    const payload = {
      ...formData,
      category: catArray
    }

    const url = editingId ? `/api/products/${editingId}` : '/api/products'
    const method = editingId ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        setIsModalOpen(false)
        fetchProducts()
      } else {
        alert('Error saving product')
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    setIsLoading(true)
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchProducts()
      } else {
        alert('Error deleting product')
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-[#e8e4da] p-6 lg:p-8 relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#1a1a1a]">Products Inventory</h2>
          <p className="text-[#666666] text-sm mt-1">Manage stock, prices, and catalog items.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#2d5016] text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[#38631e] transition-colors"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {isLoading && products.length === 0 ? (
        <div className="py-20 text-center text-[#999]">Loading products...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#e8e4da] bg-[#faf8f3]">
                <th className="py-4 px-4 font-bold text-[#1a1a1a] rounded-tl-xl">Product</th>
                <th className="py-4 px-4 font-bold text-[#1a1a1a]">Price</th>
                <th className="py-4 px-4 font-bold text-[#1a1a1a]">Stock</th>
                <th className="py-4 px-4 font-bold text-[#1a1a1a]">Categories</th>
                <th className="py-4 px-4 text-right font-bold text-[#1a1a1a] rounded-tr-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8e4da]">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-[#faf8f3] transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#f0ede4] relative overflow-hidden shrink-0 border border-[#e8e4da]">
                        <Image src={p.image} alt={p.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-[#1a1a1a] text-sm">{p.name}</p>
                        <p className="text-xs text-[#666] truncate max-w-[200px]">{p.tag}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-bold text-[#2d5016]">₹{p.price}</p>
                    {p.originalPrice && <p className="text-xs text-[#999] line-through">₹{p.originalPrice}</p>}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${p.stock > 0 ? 'bg-[#2d5016]/10 text-[#2d5016]' : 'bg-red-100 text-red-700'}`}>
                      {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1 max-w-[180px]">
                      {p.category.slice(0,2).map(c => (
                        <span key={c} className="text-[10px] bg-[#e8e4da] text-[#555] px-2 py-0.5 rounded">{c}</span>
                      ))}
                      {p.category.length > 2 && <span className="text-[10px] bg-[#e8e4da] text-[#555] px-2 py-0.5 rounded">+{p.category.length - 2}</span>}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleOpenModal(p)} className="p-2 text-[#666] hover:bg-[#e8e4da] rounded-lg transition-colors" title="Edit">
                        <Edit2 size={15} />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && !isLoading && (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-[#666]">No products found in the database.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Add/Edit Modal (Portal to body to avoid z-index/transform issues) ── */}
      {mounted && isModalOpen && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-start justify-center bg-[#0f2a04]/80 backdrop-blur-sm p-4"
          style={{ overflowY: 'auto' }}
          onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false) }}
        >
          <div className="bg-white rounded-2xl w-full max-w-2xl my-8 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-[#e8e4da] sticky top-0 bg-white z-10 flex justify-between items-center rounded-t-2xl">
              <h3 className="text-xl font-bold text-[#1a1a1a]">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center text-[#999] hover:text-[#1a1a1a] hover:bg-[#f0ede4] rounded-lg transition-colors text-xl font-bold">&times;</button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {!editingId && (
                <div>
                  <label className="block text-xs font-bold text-[#666] uppercase mb-1">Product ID (Slug)</label>
                  <input required type="text" value={formData.id} onChange={e=>setFormData({...formData, id: e.target.value})} className="w-full border border-[#e8e4da] rounded-lg px-4 py-2.5 text-sm focus:border-[#2d5016] outline-none" placeholder="e.g. npk-fertilizer-50kg" />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#666] uppercase mb-1">Name</label>
                  <input required type="text" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full border border-[#e8e4da] rounded-lg px-4 py-2.5 text-sm focus:border-[#2d5016] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#666] uppercase mb-1">Image URL</label>
                  <input required type="text" value={formData.image} onChange={e=>setFormData({...formData, image: e.target.value})} className="w-full border border-[#e8e4da] rounded-lg px-4 py-2.5 text-sm focus:border-[#2d5016] outline-none" placeholder="/images/product.jpg or https://..." />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#666] uppercase mb-1">Price (₹)</label>
                  <input required type="number" value={formData.price} onChange={e=>setFormData({...formData, price: e.target.value})} className="w-full border border-[#e8e4da] rounded-lg px-4 py-2.5 text-sm focus:border-[#2d5016] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#666] uppercase mb-1">Original Price (₹)</label>
                  <input type="number" value={formData.originalPrice} onChange={e=>setFormData({...formData, originalPrice: e.target.value})} className="w-full border border-[#e8e4da] rounded-lg px-4 py-2.5 text-sm focus:border-[#2d5016] outline-none" placeholder="Optional" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#666] uppercase mb-1">Stock Qty</label>
                  <input required type="number" value={formData.stock} onChange={e=>setFormData({...formData, stock: e.target.value})} className="w-full border border-[#e8e4da] rounded-lg px-4 py-2.5 text-sm focus:border-[#2d5016] outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#666] uppercase mb-1">Categories (Comma separated)</label>
                <input required type="text" value={formData.category} onChange={e=>setFormData({...formData, category: e.target.value})} className="w-full border border-[#e8e4da] rounded-lg px-4 py-2.5 text-sm focus:border-[#2d5016] outline-none" placeholder="all, best-sellers, soil-health..." />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#666] uppercase mb-1">Description</label>
                <textarea required rows={3} value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} className="w-full border border-[#e8e4da] rounded-lg px-4 py-2.5 text-sm focus:border-[#2d5016] outline-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#666] uppercase mb-1">Short Tag</label>
                  <input type="text" value={formData.tag} onChange={e=>setFormData({...formData, tag: e.target.value})} className="w-full border border-[#e8e4da] rounded-lg px-4 py-2.5 text-sm focus:border-[#2d5016] outline-none" placeholder="e.g. For strong roots" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#666] uppercase mb-1">Unit</label>
                  <input type="text" value={formData.unit} onChange={e=>setFormData({...formData, unit: e.target.value})} className="w-full border border-[#e8e4da] rounded-lg px-4 py-2.5 text-sm focus:border-[#2d5016] outline-none" placeholder="e.g. 50 kg bag" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#666] uppercase mb-1">Badge</label>
                  <select value={formData.badge} onChange={e=>setFormData({...formData, badge: e.target.value})} className="w-full border border-[#e8e4da] rounded-lg px-4 py-2.5 text-sm focus:border-[#2d5016] outline-none bg-white">
                    <option value="">None</option>
                    <option value="hot">Hot (Best Seller)</option>
                    <option value="new">New</option>
                    <option value="sale">Sale</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-[#e8e4da] pt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-xl text-[#666] font-bold text-sm hover:bg-[#f0ede4] transition-colors">Cancel</button>
                <button type="submit" disabled={isLoading} className="bg-[#2d5016] text-white px-8 py-2.5 rounded-xl font-bold text-sm hover:bg-[#38631e] transition-colors disabled:opacity-50">
                  {isLoading ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
