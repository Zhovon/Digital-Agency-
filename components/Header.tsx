'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-black border-b border-gray-800 z-50">
      <div className="section-padding">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-lime-300 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-sm">ZZ</span>
            </div>
            <span className="hidden sm:block font-bold text-lime-300">ZZEROTECH</span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/templates" className="hover:text-lime-300 transition">
              Templates
            </Link>
            <Link href="/portfolio" className="hover:text-lime-300 transition">
              Portfolio
            </Link>
            <Link href="/about" className="hover:text-lime-300 transition">
              About
            </Link>
          </nav>

          {/* Auth & Cart */}
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="hidden sm:block hover:text-lime-300 transition">
              Login
            </Link>
            <Link href="/shop/cart" className="flex items-center gap-2 btn-primary text-sm py-2 px-4">
              <span>Cart</span>
              <span className="bg-black text-lime-300 rounded px-2 py-1 text-xs">0</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5"
          >
            <span className={`w-6 h-0.5 bg-lime-300 transition ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-lime-300 transition ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-lime-300 transition ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <Link href="/templates" className="hover:text-lime-300 transition">
              Templates
            </Link>
            <Link href="/portfolio" className="hover:text-lime-300 transition">
              Portfolio
            </Link>
            <Link href="/about" className="hover:text-lime-300 transition">
              About
            </Link>
            <Link href="/auth/login" className="hover:text-lime-300 transition">
              Login
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
