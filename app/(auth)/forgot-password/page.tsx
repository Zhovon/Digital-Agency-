'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement password reset
    setTimeout(() => {
      setIsLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  if (submitted) {
    return (
      <div className="section-padding">
        <div className="max-w-md mx-auto">
          <div className="card text-center">
            <div className="text-5xl mb-4">📧</div>
            <h1 className="text-3xl font-bold mb-4">Check Your Email</h1>
            <p className="text-gray-400 mb-6">
              We've sent a password reset link to {email}. Check your inbox and follow the instructions to reset your password.
            </p>
            <p className="text-gray-400 text-sm mb-8">
              Didn't receive it? Check your spam folder or{' '}
              <button
                onClick={() => setSubmitted(false)}
                className="text-lime-300 hover:text-lime-400"
              >
                try again
              </button>
            </p>
            <Link href="/auth/login" className="btn-primary">
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="section-padding">
      <div className="max-w-md mx-auto">
        <div className="card">
          <h1 className="text-3xl font-bold mb-2 text-center">Reset Password</h1>
          <p className="text-gray-400 text-center mb-8">
            Enter your email and we'll send you a link to reset your password
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          {/* Back to Login */}
          <p className="text-center text-gray-400 mt-6">
            <Link href="/auth/login" className="text-lime-300 hover:text-lime-400">
              ← Back to Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
