import { useState, useEffect } from 'react'
import { Plus, Package, DollarSign, TrendingUp, ShoppingBag } from 'lucide-react'
import { fetchOrders, fetchProducts, updateOrderStatus, updateProduct } from '../services/firestore'

const statusColor = {
  'Hazırlanıyor': 'bg-amber-500/20 text-amber-300',
  'Kargoda': 'bg-blue-500/20 text-blue-300',
  'Teslim Edildi': 'bg-emerald-500/20 text-emerald-300',
}

export default function Admin() {
  const [tab, setTab] = useState('orders')
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchOrders().then(setOrders).catch(() => {})
    fetchProducts().then(setProducts).catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 text-gray-100">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-extrabold text-white mb-8">Satıcı Paneli</h2>
        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { key: 'orders', label: 'Siparişler', icon: ShoppingBag },
            { key: 'products', label: 'Ürünler', icon: Plus },
            { key: 'stock', label: 'Stok & Fiyat', icon: Package },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${tab === t.key ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30' : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'}`}>
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        {tab === 'orders' && (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur">
            <table className="w-full text-sm">
              <thead className="bg-white/5"><tr><th className="p-4 text-left text-gray-300">Sipariş No</th><th className="p-4 text-left text-gray-300">Müşteri</th><th className="p-4 text-left text-gray-300">Toplam</th><th className="p-4 text-left text-gray-300">Durum</th></tr></thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id} className="border-t border-white/5 hover:bg-white/5 transition">
                    <td className="p-4 font-mono text-amber-300">{o.id.slice(0,8)}</td>
                    <td className="p-4">{o.name} ({o.phone})</td>
                    <td className="p-4 font-semibold">{o.total} ₺</td>
                    <td className="p-4">
                      <select value={o.status} onChange={e => { updateOrderStatus(o.id, e.target.value); setOrders(prev => prev.map(x => x.id === o.id ? { ...x, status: e.target.value } : x)) }} className={`border-0 rounded-lg p-1.5 text-xs font-medium ${statusColor[o.status]} bg-transparent`}>
                        <option>Hazırlanıyor</option>
                        <option>Kargoda</option>
                        <option>Teslim Edildi</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'products' && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
            <p className="text-gray-400 text-sm mb-4">Canlı ürünler Firestore'dan yüklenir.</p>
            <ul className="space-y-2">
              {products.map(p => (
                <li key={p.id} className="flex justify-between bg-white/5 rounded-lg p-3">
                  <span>{p.name}</span>
                  <span className="text-amber-300">{p.price} ₺ (Stok: {p.stock})</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === 'stock' && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
            <h3 className="font-semibold flex items-center gap-2 mb-4 text-white"><Package className="w-4 h-4 text-amber-400" /> Stok & Fiyat</h3>
            <table className="w-full text-sm">
              <thead className="bg-white/5"><tr><th className="p-3 text-left text-gray-300">Ürün</th><th className="p-3 text-left text-gray-300">Stok</th><th className="p-3 text-left text-gray-300">Fiyat</th></tr></thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-t border-white/5">
                    <td className="p-3">{p.name}</td>
                    <td className="p-3">
                      <input type="number" defaultValue={p.stock} onBlur={e => updateProduct(p.id, { stock: Number(e.target.value) })} className="w-20 bg-white/5 border border-white/10 rounded p-1 text-sm" />
                    </td>
                    <td className="p-3">
                      <input type="number" defaultValue={p.price} onBlur={e => updateProduct(p.id, { price: Number(e.target.value) })} className="w-24 bg-white/5 border border-white/10 rounded p-1 text-sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-gray-500 mt-4 flex items-center gap-1"><DollarSign className="w-3 h-3" /> B2B toptan fiyatlandırma aktif.</p>
          </div>
        )}
      </main>
    </div>
  )
}