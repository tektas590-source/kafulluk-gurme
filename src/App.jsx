import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Checkout from './pages/Checkout'
import Admin from './pages/Admin'

export default function App() {
  const [cart, setCart] = useState([])

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#0F0F10]">
        <Navbar cartCount={cart.reduce((s, i) => s + i.qty, 0)} />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
        <footer className="border-t border-white/10 py-6 text-center text-gray-500 text-sm">
          © 2026 Kafulluk Gurme. Tüm hakları saklıdır.
        </footer>
      </div>
    </BrowserRouter>
  )
}
