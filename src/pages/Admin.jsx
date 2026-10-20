import { useState } from 'react'
import { Plus, Package, DollarSign } from 'lucide-react'

const orders = [
  { id: 'S-1001', customer: 'ABC Market', total: 1240, status: 'Hazırlanıyor' },
  { id: 'S-1002', customer: 'Ahmet Yılmaz', total: 340, status: 'Kargoda' },
  { id: 'S-1003', customer: 'XYZ Toptan', total: 2890, status: 'Teslim Edildi' },
]

export default function Admin() {
  const [tab, setTab] = useState('orders')

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Yönetim Paneli</h2>
      <div className="flex gap-2 mb-6">
        <button onClick={() => setTab('orders')} className={`px-4 py-2 rounded-lg ${tab === 'orders' ? 'bg-amber-600 text-white' : 'bg-gray-100'}`}>Siparişler</button>
        <button onClick={() => setTab('products')} className={`px-4 py-2 rounded-lg ${tab === 'products' ? 'bg-amber-600 text-white' : 'bg-gray-100'}`}>Ürünler</button>
        <button onClick={() => setTab('stock')} className={`px-4 py-2 rounded-lg ${tab === 'stock' ? 'bg-amber-600 text-white' : 'bg-gray-100'}`}>Stok & Fiyat</button>
      </div>

      {tab === 'orders' && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr><th className="p-3 text-left">Sipariş No</th><th className="p-3 text-left">Müşteri</th><th className="p-3 text-left">Toplam</th><th className="p-3 text-left">Durum</th></tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} className="border-t">
                  <td className="p-3">{o.id}</td>
                  <td className="p-3">{o.customer}</td>
                  <td className="p-3">{o.total} ₺</td>
                  <td className="p-3">
                    <select defaultValue={o.status} className="border rounded p-1">
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
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-3 max-w-lg">
          <h3 className="font-semibold flex items-center gap-2"><Plus className="w-4 h-4" /> Yeni Ürün Ekle</h3>
          <input className="w-full border rounded-lg p-2" placeholder="Ürün Adı" />
          <select className="w-full border rounded-lg p-2">
            <option>Süt Ürünleri & Tereyağı</option>
            <option>Zeytin Çeşitleri</option>
            <option>Et Ürünleri (Sucuk/Pastırma)</option>
            <option>Bal & Reçel & Fındık Kreması</option>
            <option>Diğer Kahvaltılıklar</option>
          </select>
          <input className="w-full border rounded-lg p-2" placeholder="Gramaj/Kilo" />
          <input className="w-full border rounded-lg p-2" placeholder="Fiyat (₺)" type="number" />
          <input className="w-full border rounded-lg p-2" placeholder="Stok" type="number" />
          <button className="bg-amber-600 text-white px-4 py-2 rounded-lg">Kaydet</button>
        </div>
      )}

      {tab === 'stock' && (
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold flex items-center gap-2 mb-4"><Package className="w-4 h-4" /> Stok & Toptan Fiyatlandırma</h3>
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr><th className="p-3 text-left">Ürün</th><th className="p-3 text-left">Stok</th><th className="p-3 text-left">Perakende</th><th className="p-3 text-left">Toptan</th></tr>
            </thead>
            <tbody>
              <tr className="border-t"><td className="p-3">Çiftlik Tereyağı</td><td className="p-3">40</td><td className="p-3">180 ₺</td><td className="p-3">150 ₺</td></tr>
              <tr className="border-t"><td className="p-3">Dana Sucuk</td><td className="p-3">18</td><td className="p-3">320 ₺</td><td className="p-3">270 ₺</td></tr>
            </tbody>
          </table>
          <p className="text-xs text-gray-400 mt-4 flex items-center gap-1"><DollarSign className="w-3 h-3" /> B2B toptan fiyatlandırma aktif.</p>
        </div>
      )}
    </main>
  )
}
