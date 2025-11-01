'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-950 border-t border-gray-800 mt-20">
      <div className="section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-lime-300 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">ZZ</span>
              </div>
              <span className="font-bold text-lime-300">ZZEROTECH</span>
            </div>
            <p className="text-gray-400 text-sm">
              Premium templates for modern developers
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-lime-300">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/templates?category=react" className="text-gray-400 hover:text-lime-300 transition">
                  React Templates
                </Link>
              </li>
              <li>
                <Link href="/templates?category=nextjs" className="text-gray-400 hover:text-lime-300 transition">
                  Next.js Templates
                </Link>
              </li>
              <li>
                <Link href="/templates?category=nest" className="text-gray-400 hover:text-lime-300 transition">
                  Nest Templates
                </Link>
              </li>
              <li>
                <Link href="/templates?category=wordpress" className="text-gray-400 hover:text-lime-300 transition">
                  WordPress Templates
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-lime-300">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/portfolio" className="text-gray-400 hover:text-lime-300 transition">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-lime-300 transition">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-lime-300 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-lime-300">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-lime-300 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-lime-300 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/license" className="text-gray-400 hover:text-lime-300 transition">
                  License
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; {currentYear} ZZEROTECH Web Development. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-lime-300 transition">
                GitHub
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-lime-300 transition">
                Twitter
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-lime-300 transition">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
