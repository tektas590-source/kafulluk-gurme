import { ShoppingCart, Menu, Search } from 'lucide-react'

export default function Navbar({ cartCount }) {
  return (
    <header className="bg-[#0F0F10]/90 backdrop-blur-md sticky top-0 z-50 border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-extrabold text-amber-400 tracking-tight">Kafulluk Gurme</h1>
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input className="w-full pl-9 pr-3 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="Ürün ara..." />
          </div>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
          <a href="/" className="hover:text-amber-400 transition">Ürünler</a>
          <a href="/checkout" className="hover:text-amber-400 transition">Sepet</a>
          <a href="/admin" className="hover:text-amber-400 transition">Yönetim</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="/checkout" className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-300 hover:text-amber-400 transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </a>
          <Menu className="md:hidden w-6 h-6 text-gray-300" />
        </div>
      </div>
    </header>
  )
}
