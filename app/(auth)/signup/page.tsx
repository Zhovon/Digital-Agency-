'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email'
    }
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms'
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    // TODO: Implement registration
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="section-padding">
      <div className="max-w-md mx-auto">
        <div className="card">
          <h1 className="text-3xl font-bold mb-2 text-center">Create Account</h1>
          <p className="text-gray-400 text-center mb-8">
            Join us and start browsing templates
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className={`input-field ${errors.password ? 'border-red-500' : ''}`}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className={`input-field ${errors.confirmPassword ? 'border-red-500' : ''}`}
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    agreeToTerms: e.target.checked,
                  })
                }
                className="rounded"
              />
              <span className="text-sm">
                I agree to the{' '}
                <Link href="/terms" className="text-lime-300 hover:text-lime-400">
                  Terms of Service
                </Link>
              </span>
            </label>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>
            )}

            <button type="submit" className="btn-primary w-full mt-6" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-gray-400 mt-6">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-lime-300 hover:text-lime-400 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
