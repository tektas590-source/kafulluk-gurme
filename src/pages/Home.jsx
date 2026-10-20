import { useState, useEffect } from 'react'
import { categories } from '../data/products'
import { fetchProducts } from '../services/firestore'
import ProductCard from '../components/ProductCard'

export default function Home({ cart, setCart }) {
  const [active, setActive] = useState('all')
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts().then(setProducts).catch(() => {})
  }, [])

  const filtered = active === 'all' ? products : products.filter(p => p.category === active)

  const handleAdd = (product) => {
    if ((product.stock ?? 0) <= 0) return
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
  }

  return (
    <main className="bg-[#0F0F10] min-h-screen text-gray-100">
      <section className="bg-gradient-to-br from-[#0F0F10] to-[#1a1a1c] py-16 border-b border-amber-500/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-amber-400 mb-4">Kafulluk Gurme</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Doğal ve yöresel kahvaltılıklar, taze ve özenle seçilmiş ürünlerle sofranıza.</p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <button onClick={() => setActive('all')} className={`px-4 py-2 rounded-full text-sm font-medium transition ${active === 'all' ? 'bg-amber-500 text-black shadow' : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'}`}>Tümü</button>
          {categories.map(c => (
            <button key={c.id} onClick={() => setActive(c.id)} className={`px-4 py-2 rounded-full text-sm font-medium transition ${active === c.id ? 'bg-amber-500 text-black shadow' : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'}`}>{c.name}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} onAdd={handleAdd} />
          ))}
        </div>
      </div>
    </main>
  )
}
