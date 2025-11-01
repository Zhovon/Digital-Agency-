'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement admin authentication
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="card">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 bg-lime-300 rounded-full flex items-center justify-center">
                <span className="text-black font-bold">ZZ</span>
              </div>
              <h1 className="text-2xl font-bold">ZZEROTECH Admin</h1>
            </div>
            <p className="text-gray-400">Admin Dashboard Login</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Email Address</label>
              <input
                type="email"
                placeholder="admin@zzerotech.com"
                className="input-field"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="input-field"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full mt-6" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Admin Sign In'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-gray-900 rounded border border-gray-800 text-sm text-gray-400">
            <p className="mb-2 font-semibold">Demo Credentials:</p>
            <p>Email: admin@zzerotech.com</p>
            <p>Password: demo123456</p>
          </div>

          <p className="text-center text-gray-400 mt-6">
            <Link href="/" className="text-lime-300 hover:text-lime-400">
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
