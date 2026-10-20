import { useState } from 'react'
import { categories, products } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Home({ cart, setCart }) {
  const [active, setActive] = useState('all')

  const filtered = active === 'all' ? products : products.filter(p => p.category === active)

  const handleAdd = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Ürün Kataloğu</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActive('all')}
          className={`px-4 py-2 rounded-full text-sm ${active === 'all' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          Tümü
        </button>
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className={`px-4 py-2 rounded-full text-sm ${active === c.id ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            {c.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} onAdd={handleAdd} />
        ))}
      </div>
    </main>
  )
}
