import { useState } from 'react'
import { Plus, Package, DollarSign, TrendingUp, ShoppingBag } from 'lucide-react'

const orders = [
  { id: 'S-1001', customer: 'ABC Market', total: 1240, status: 'Hazırlanıyor' },
  { id: 'S-1002', customer: 'Ahmet Yılmaz', total: 340, status: 'Kargoda' },
  { id: 'S-1003', customer: 'XYZ Toptan', total: 2890, status: 'Teslim Edildi' },
]

const statusColor = {
  'Hazırlanıyor': 'bg-amber-500/20 text-amber-300',
  'Kargoda': 'bg-blue-500/20 text-blue-300',
  'Teslim Edildi': 'bg-emerald-500/20 text-emerald-300',
}

export default function Admin() {
  const [tab, setTab] = useState('orders')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 text-gray-100">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-white">Satıcı Paneli</h2>
            <p className="text-gray-400 text-sm mt-1">Mağazanızı ve siparişlerinizi yönetin</p>
          </div>
          <div className="hidden md:flex gap-3">
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center">
              <p className="text-xs text-gray-400">Toplam Satış</p>
              <p className="text-lg font-bold text-amber-400">4.470 ₺</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-center">
              <p className="text-xs text-gray-400">Sipariş</p>
              <p className="text-lg font-bold text-emerald-400">3</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { key: 'orders', label: 'Siparişler', icon: ShoppingBag },
            { key: 'products', label: 'Ürünler', icon: Plus },
            { key: 'stock', label: 'Stok & Fiyat', icon: Package },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition ${tab === t.key ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30' : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'}`}
            >
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        {tab === 'orders' && (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur">
            <table className="w-full text-sm">
              <thead className="bg-white/5">
                <tr><th className="p-4 text-left text-gray-300">Sipariş No</th><th className="p-4 text-left text-gray-300">Müşteri</th><th className="p-4 text-left text-gray-300">Toplam</th><th className="p-4 text-left text-gray-300">Durum</th></tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id} className="border-t border-white/5 hover:bg-white/5 transition">
                    <td className="p-4 font-mono text-amber-300">{o.id}</td>
                    <td className="p-4">{o.customer}</td>
                    <td className="p-4 font-semibold">{o.total} ₺</td>
                    <td className="p-4">
                      <select defaultValue={o.status} className={`border-0 rounded-lg p-1.5 text-xs font-medium ${statusColor[o.status]} bg-transparent`}>
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
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-lg backdrop-blur">
            <h3 className="font-semibold flex items-center gap-2 mb-4 text-white"><Plus className="w-4 h-4 text-amber-400" /> Yeni Ürün Ekle</h3>
            <div className="space-y-3">
              <input className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-gray-500" placeholder="Ürün Adı" />
              <select className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm">
                <option>Süt Ürünleri & Tereyağı</option>
                <option>Zeytin Çeşitleri</option>
                <option>Et Ürünleri (Sucuk/Pastırma)</option>
                <option>Bal & Reçel & Fındık Kreması</option>
                <option>Diğer Kahvaltılıklar</option>
              </select>
              <input className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm placeholder-gray-500" placeholder="Gramaj/Kilo" />
              <input className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm placeholder-gray-500" placeholder="Fiyat (₺)" type="number" />
              <input className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm placeholder-gray-500" placeholder="Stok" type="number" />
              <button className="w-full bg-amber-600 hover:bg-amber-500 text-white py-3 rounded-xl font-semibold transition shadow-lg shadow-amber-600/30">Kaydet</button>
            </div>
          </div>
        )}

        {tab === 'stock' && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
            <h3 className="font-semibold flex items-center gap-2 mb-4 text-white"><Package className="w-4 h-4 text-amber-400" /> Stok & Toptan Fiyatlandırma</h3>
            <table className="w-full text-sm">
              <thead className="bg-white/5">
                <tr><th className="p-3 text-left text-gray-300">Ürün</th><th className="p-3 text-left text-gray-300">Stok</th><th className="p-3 text-left text-gray-300">Perakende</th><th className="p-3 text-left text-gray-300">Toptan</th><th className="p-3 text-left text-gray-300">Trend</th></tr>
              </thead>
              <tbody>
                <tr className="border-t border-white/5 hover:bg-white/5 transition"><td className="p-3">Çiftlik Tereyağı</td><td className="p-3">40</td><td className="p-3">180 ₺</td><td className="p-3 text-emerald-300">150 ₺</td><td className="p-3"><TrendingUp className="w-4 h-4 text-emerald-400" /></td></tr>
                <tr className="border-t border-white/5 hover:bg-white/5 transition"><td className="p-3">Dana Sucuk</td><td className="p-3">18</td><td className="p-3">320 ₺</td><td className="p-3 text-emerald-300">270 ₺</td><td className="p-3"><TrendingUp className="w-4 h-4 text-emerald-400" /></td></tr>
              </tbody>
            </table>
            <p className="text-xs text-gray-500 mt-4 flex items-center gap-1"><DollarSign className="w-3 h-3" /> B2B toptan fiyatlandırma aktif.</p>
          </div>
        )}
      </main>
    </div>
  )
}