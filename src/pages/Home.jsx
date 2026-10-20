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
    <main>
      <section className="bg-gradient-to-br from-amber-50 to-orange-100 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-amber-800 mb-4">Doğal & Yöresel Kahvaltılıklar</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Çiftlikten sofranıza, taze ve doğal kahvaltılık ürünler. B2B toptan ve B2C perakende seçenekleriyle.</p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <button
            onClick={() => setActive('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${active === 'all' ? 'bg-amber-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            Tümü
          </button>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${active === c.id ? 'bg-amber-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
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
      </div>
    </main>
  )
}
