'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    country: '',
    state: '',
    city: '',
    postalCode: '',
    phone: '',
    saveAddress: true,
  })
  const [paymentMethod, setPaymentMethod] = useState('stripe')

  const cartItems = [
    { name: 'React E-Commerce', price: 49, quantity: 1 },
    { name: 'Next.js SaaS', price: 79, quantity: 1 },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    })
  }

  const steps = [
    { number: 1, label: 'Billing' },
    { number: 2, label: 'Review' },
    { number: 3, label: 'Payment' },
    { number: 4, label: 'Confirmation' },
  ]

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-black">
        <div className="section-padding">
          <div className="max-w-6xl mx-auto">
            {/* Progress Indicator */}
            <div className="mb-12">
              <div className="flex justify-between mb-8">
                {steps.map((s, idx) => (
                  <div key={s.number} className="flex items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                        step >= s.number
                          ? 'bg-lime-300 text-black'
                          : 'bg-gray-800 text-gray-400'
                      }`}
                    >
                      {s.number}
                    </div>
                    <span
                      className={`flex-1 h-1 mx-2 transition ${
                        step > s.number ? 'bg-lime-300' : 'bg-gray-800'
                      }`}
                    ></span>
                    {idx < steps.length - 1 && <div></div>}
                  </div>
                ))}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= steps[steps.length - 1].number
                      ? 'bg-lime-300 text-black'
                      : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  {steps[steps.length - 1].number}
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                {steps.map((s) => (
                  <span key={s.number}>{s.label}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="card">
                  {/* Step 1: Billing Information */}
                  {step === 1 && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold mb-6">Billing Information</h2>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="you@example.com"
                          className="input-field"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="John Doe"
                          className="input-field"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Country</label>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="input-field"
                          >
                            <option value="">Select country</option>
                            <option value="US">United States</option>
                            <option value="UK">United Kingdom</option>
                            <option value="CA">Canada</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">State</label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder="CA"
                            className="input-field"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">City</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="San Francisco"
                            className="input-field"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Postal Code</label>
                          <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            placeholder="94105"
                            className="input-field"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 000-0000"
                          className="input-field"
                        />
                      </div>

                      <label className="flex items-center gap-2 mt-4">
                        <input
                          type="checkbox"
                          name="saveAddress"
                          checked={formData.saveAddress}
                          onChange={handleInputChange}
                          className="rounded"
                        />
                        <span className="text-sm">Save address for next time</span>
                      </label>
                    </div>
                  )}

                  {/* Step 2: Review Order */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold mb-6">Order Review</h2>

                      <div className="space-y-3 pb-4 border-b border-gray-800">
                        {cartItems.map((item, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span>
                              {item.name} x {item.quantity}
                            </span>
                            <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-gray-400">
                          <span>Subtotal</span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span>Tax (10%)</span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between pt-3 border-t border-gray-800">
                          <span className="font-bold">Total</span>
                          <span className="text-lime-300 text-xl font-bold">${total.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="bg-gray-900 p-4 rounded mt-6">
                        <h3 className="font-semibold mb-2">Billing Address</h3>
                        <p className="text-gray-400 text-sm">
                          {formData.fullName}
                          <br />
                          {formData.city}, {formData.state} {formData.postalCode}
                          <br />
                          {formData.country}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Payment Method */}
                  {step === 3 && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

                      <div className="space-y-3">
                        {[
                          { value: 'stripe', label: 'Stripe' },
                          { value: 'paypal', label: 'PayPal' },
                        ].map((method) => (
                          <label
                            key={method.value}
                            className="flex items-center gap-3 p-4 border-2 border-gray-800 rounded cursor-pointer hover:border-lime-300 transition"
                          >
                            <input
                              type="radio"
                              name="payment"
                              value={method.value}
                              checked={paymentMethod === method.value}
                              onChange={(e) => setPaymentMethod(e.target.value)}
                              className="w-4 h-4"
                            />
                            <span className="font-semibold">{method.label}</span>
                          </label>
                        ))}
                      </div>

                      <div className="bg-gray-900 p-4 rounded mt-6 text-center text-sm text-gray-400">
                        <p>
                          {paymentMethod === 'stripe'
                            ? 'Secure payment processing with Stripe'
                            : 'Pay securely with your PayPal account'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Confirmation */}
                  {step === 4 && (
                    <div className="text-center space-y-4">
                      <div className="text-6xl mb-4">✓</div>
                      <h2 className="text-3xl font-bold text-lime-300">Thank You!</h2>
                      <p className="text-gray-400">Your order has been confirmed</p>
                      <div className="bg-gray-900 p-4 rounded mt-6">
                        <p className="text-sm text-gray-400 mb-2">Order Number</p>
                        <p className="font-bold text-lg">ORD-2024-001</p>
                      </div>
                      <p className="text-gray-400 text-sm">
                        A confirmation email has been sent to {formData.email}
                      </p>
                      <Link href="/downloads" className="btn-primary inline-block mt-6">
                        Download Templates
                      </Link>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  {step < 4 && (
                    <div className="flex gap-4 mt-8 pt-6 border-t border-gray-800">
                      <button
                        onClick={() => setStep(Math.max(1, step - 1))}
                        className="btn-secondary flex-1"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setStep(Math.min(4, step + 1))}
                        className="btn-primary flex-1"
                      >
                        {step === 3 ? 'Complete Purchase' : 'Next'}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <div>
                <div className="card sticky top-24">
                  <h3 className="font-bold mb-4">Order Summary</h3>
                  <div className="space-y-3 mb-4 pb-4 border-b border-gray-800 text-sm">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-gray-400">
                        <span>{item.name}</span>
                        <span>${item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t border-gray-800">
                    <span>Total</span>
                    <span className="text-lime-300">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
