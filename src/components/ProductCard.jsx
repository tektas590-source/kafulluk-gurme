import { Plus } from 'lucide-react'

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.weight}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-amber-700">{product.price} ₺</span>
          <button
            onClick={() => onAdd(product)}
            className="flex items-center gap-1 bg-amber-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-amber-700 transition shadow-sm"
          >
            <Plus className="w-4 h-4" /> Sepete Ekle
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2">Stok: {product.stock}</p>
      </div>
    </div>
  )
}
