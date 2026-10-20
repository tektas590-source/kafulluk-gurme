import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { createOrder } from '../services/firestore'

export default function Checkout({ cart, setCart }) {
  const [customerType, setCustomerType] = useState('bireysel')
  const [payment, setPayment] = useState('kart')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [done, setDone] = useState(false)

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)

  const remove = (id) => setCart(prev => prev.filter(i => i.id !== id))

  const submit = async () => {
    if (!name || !phone || !address || cart.length === 0) return
    await createOrder({
      customerType, payment, name, phone, address,
      items: cart.map(i => ({ id: i.id, name: i.name, qty: i.qty, price: i.price })),
      total,
    })
    setCart([])
    setDone(true)
  }

  if (done) return <main className="bg-[#0F0F10] min-h-screen text-gray-100 flex items-center justify-center"><h2 className="text-2xl font-bold text-emerald-400">Siparişiniz alındı!</h2></main>

  return (
    <main className="bg-[#0F0F10] min-h-screen text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-amber-400">Sepet Özeti</h2>
          {cart.length === 0 && <p className="text-gray-500">Sepetiniz boş.</p>}
          <div className="space-y-3">
            {cart.map(i => (
              <div key={i.id} className="flex items-center justify-between bg-white/5 border border-white/10 p-3 rounded-lg">
                <div>
                  <p className="font-medium text-gray-100">{i.name}</p>
                  <p className="text-sm text-gray-400">{i.qty} x {i.price} ₺</p>
                </div>
                <button onClick={() => remove(i.id)} className="text-red-400"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right font-bold text-lg text-amber-400">Toplam: {total} ₺</div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-amber-400">Sipariş Bilgileri</h2>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Müşteri Tipi</label>
            <select value={customerType} onChange={e => setCustomerType(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-gray-100">
              <option value="bireysel">Bireysel</option>
            </select>
          </div>
          <input className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-gray-100 placeholder-gray-500" placeholder="Ad Soyad" value={name} onChange={e => setName(e.target.value)} />
          <input className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-gray-100 placeholder-gray-500" placeholder="Telefon" value={phone} onChange={e => setPhone(e.target.value)} />
          <textarea className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-gray-100 placeholder-gray-500" placeholder="Teslimat Adresi" rows={3} value={address} onChange={e => setAddress(e.target.value)} />
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Ödeme Yöntemi</label>
            <div className="flex gap-4 text-gray-300">
              <label><input type="radio" value="kart" checked={payment === 'kart'} onChange={() => setPayment('kart')} /> Kredi Kartı</label>
              <label><input type="radio" value="havale" checked={payment === 'havale'} onChange={() => setPayment('havale')} /> Havale/EFT</label>
            </div>
          </div>
          <button onClick={submit} className="w-full bg-amber-500 text-black py-3 rounded-lg font-semibold hover:bg-amber-400">
            Siparişi Tamamla
          </button>
        </section>
      </div>
    </main>
  )
}
