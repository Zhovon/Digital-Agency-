'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminSidebar() {
  const pathname = usePathname()

  const links = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/admin/products', label: 'Products', icon: '📦' },
    { href: '/admin/orders', label: 'Orders', icon: '🛒' },
    { href: '/admin/users', label: 'Users', icon: '👥' },
    { href: '/admin/analytics', label: 'Analytics', icon: '📈' },
  ]

  return (
    <div className="w-64 bg-gray-950 border-r border-gray-800 min-h-screen p-6 fixed left-0 top-0 overflow-y-auto">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-lime-300 rounded-full flex items-center justify-center">
          <span className="text-black font-bold text-sm">ZZ</span>
        </div>
        <span className="font-bold text-lime-300">ZZEROTECH Admin</span>
      </Link>

      {/* Navigation */}
      <nav className="space-y-2 mb-8">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-3 rounded transition ${
              pathname === link.href
                ? 'bg-lime-300 text-black font-semibold'
                : 'hover:bg-gray-800 text-gray-300'
            }`}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-800 pt-4">
        <button className="w-full px-4 py-3 rounded text-left text-red-500 hover:bg-gray-800 transition">
          🚪 Logout
        </button>
      </div>
    </div>
  )
}
