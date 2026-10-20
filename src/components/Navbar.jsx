import { ShoppingCart, Menu } from 'lucide-react'

export default function Navbar({ cartCount }) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-amber-700">Kahvaltı Sepeti</h1>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
          <a href="/" className="hover:text-amber-700">Ürünler</a>
          <a href="/checkout" className="hover:text-amber-700">Sepet</a>
          <a href="/admin" className="hover:text-amber-700">Yönetim</a>
        </nav>
        <div className="flex items-center gap-3">
          <a href="/checkout" className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
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
