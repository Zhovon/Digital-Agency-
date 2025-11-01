'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  category: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'React E-Commerce',
      price: 49,
      quantity: 1,
      category: 'React',
    },
    {
      id: '2',
      name: 'Next.js SaaS',
      price: 79,
      quantity: 1,
      category: 'Next.js',
    },
  ])

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0 // Free for digital products
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + shipping + tax

  if (cartItems.length === 0) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen bg-black flex items-center">
          <div className="section-padding w-full">
            <div className="max-w-6xl mx-auto text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
              <p className="text-gray-400 mb-8">
                Explore our collection of templates and add some to your cart
              </p>
              <Link href="/templates" className="btn-primary">
                Browse Templates
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-black">
        <div className="section-padding">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="card">
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 pb-4 border-b border-gray-800 last:border-b-0"
                      >
                        {/* Product Image Placeholder */}
                        <div className="w-20 h-20 bg-gray-800 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">📦</span>
                        </div>

                        {/* Product Info */}
                        <div className="flex-grow">
                          <h3 className="font-semibold mb-1">{item.name}</h3>
                          <p className="text-gray-400 text-sm">{item.category}</p>
                        </div>

                        {/* Quantity */}
                        <div className="flex items-center gap-2 bg-gray-900 rounded px-3 py-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-gray-400 hover:text-lime-300 transition"
                          >
                            −
                          </button>
                          <span className="w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-400 hover:text-lime-300 transition"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right w-20">
                          <p className="font-semibold text-lime-300">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-gray-400 text-sm">${item.price}/ea</p>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition ml-2"
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Continue Shopping */}
                <Link href="/templates" className="text-lime-300 hover:text-lime-400 mt-4 inline-block">
                  ← Continue Shopping
                </Link>
              </div>

              {/* Cart Summary */}
              <div>
                <div className="card space-y-4 sticky top-24">
                  <h2 className="text-xl font-bold">Order Summary</h2>

                  <div className="space-y-2 text-sm pb-4 border-b border-gray-800">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Shipping</span>
                      <span className="text-lime-300">Free</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-4 border-b border-gray-800">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-lime-300">${total.toFixed(2)}</span>
                  </div>

                  <Link href="/checkout" className="btn-primary w-full text-center block">
                    Proceed to Checkout
                  </Link>

                  {/* Security Badges */}
                  <div className="flex justify-center gap-4 mt-6 pt-4 border-t border-gray-800 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <span>🔒</span>
                      <span>SSL Secure</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>✓</span>
                      <span>Trusted</span>
                    </div>
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
