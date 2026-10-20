import { Plus } from 'lucide-react'

export default function ProductCard({ product, onAdd }) {
  const out = (product.stock ?? 0) <= 0
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-amber-500/40 transition-all duration-300">
      <div className="overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-100">{product.name}</h3>
        <p className="text-sm text-gray-400">{product.weight}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-amber-400">{product.price} ₺</span>
          <button
            onClick={() => onAdd(product)}
            disabled={out}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition shadow-sm ${out ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-amber-500 text-black hover:bg-amber-400 font-semibold'}`}
          >
            <Plus className="w-4 h-4" /> {out ? 'Tükendi' : 'Sepete Ekle'}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">Stok: {product.stock ?? 0}</p>
      </div>
    </div>
  )
}
