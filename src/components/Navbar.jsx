import { ShoppingCart, Menu, Search } from 'lucide-react'

export default function Navbar({ cartCount }) {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-extrabold text-amber-700 tracking-tight">Kahvaltı Sepeti</h1>
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input className="w-full pl-9 pr-3 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" placeholder="Ürün ara..." />
          </div>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
          <a href="/" className="hover:text-amber-700 transition">Ürünler</a>
          <a href="/checkout" className="hover:text-amber-700 transition">Sepet</a>
          <a href="/admin" className="hover:text-amber-700 transition">Yönetim</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="/checkout" className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-amber-700 transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </a>
          <Menu className="md:hidden w-6 h-6 text-gray-700" />
        </div>
      </div>
    </header>
  )
}
