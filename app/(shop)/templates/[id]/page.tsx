'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'

interface ProductDetailPageProps {
  params: {
    id: string
  }
}

const productDetails = {
  '1': {
    id: '1',
    name: 'React E-Commerce Template',
    price: 49,
    category: 'react' as const,
    rating: 5,
    downloads: 2000,
    description: 'A modern, fully functional e-commerce template built with React. Perfect for starting your online store.',
    features: [
      'Product catalog with filtering',
      'Shopping cart functionality',
      'User authentication',
      'Payment integration',
      'Admin dashboard',
      'Mobile responsive design',
      'SEO optimized',
      'TypeScript support',
    ],
    techStack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Redux', 'Stripe API'],
  },
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [activeTab, setActiveTab] = useState('features')
  const product = productDetails[params.id as keyof typeof productDetails]

  if (!product) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
            <p className="text-gray-400">The template you're looking for doesn't exist.</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const relatedProducts = [
    {
      id: '5',
      name: 'React Dashboard',
      price: 69,
      category: 'react' as const,
      rating: 5,
      downloads: 1200,
    },
    {
      id: '2',
      name: 'Next.js SaaS',
      price: 79,
      category: 'nextjs' as const,
      rating: 5,
      downloads: 1500,
    },
    {
      id: '6',
      name: 'Next.js Portfolio',
      price: 54,
      category: 'nextjs' as const,
      rating: 4,
      downloads: 900,
    },
  ]

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-black">
        {/* Product Detail */}
        <section className="section-padding">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
              {/* Left - Image */}
              <div>
                <div className="bg-gray-900 rounded-lg aspect-square flex items-center justify-center">
                  <span className="text-9xl">📦</span>
                </div>
              </div>

              {/* Right - Details */}
              <div className="flex flex-col justify-center">
                <div className="mb-6">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm">React</span>
                </div>

                <h1 className="text-5xl font-bold mb-4">{product.name}</h1>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={`text-2xl ${i < product.rating ? 'text-yellow-400' : 'text-gray-600'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-400">(254 reviews)</span>
                </div>

                <p className="text-lg text-gray-300 mb-8">{product.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-5xl font-bold text-lime-300">${product.price}</span>
                  <span className="text-gray-400 ml-4">{product.downloads.toLocaleString()} downloads</span>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button className="btn-primary text-lg py-4">Add to Cart</button>
                  <button className="btn-secondary text-lg py-4">View Demo</button>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-800">
                  <div>
                    <p className="text-gray-400 text-sm">License</p>
                    <p className="font-semibold">Personal & Commercial</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Support</p>
                    <p className="font-semibold">6 Months</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-800 mb-12">
              <div className="flex gap-8">
                {[
                  { id: 'features', label: 'Features' },
                  { id: 'tech', label: 'Tech Stack' },
                  { id: 'faq', label: 'FAQ' },
                  { id: 'reviews', label: 'Reviews' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-4 font-semibold transition border-b-2 ${
                      activeTab === tab.id
                        ? 'border-lime-300 text-lime-300'
                        : 'border-transparent text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="mb-20">
              {activeTab === 'features' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex gap-3">
                      <span className="text-lime-300 font-bold">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'tech' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mb-4">Technologies Included</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.techStack.map((tech) => (
                      <span key={tech} className="bg-gray-900 px-4 py-2 rounded border border-gray-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'faq' && (
                <div className="space-y-4">
                  {[
                    { q: 'Can I use this for commercial projects?', a: 'Yes, the license includes commercial use.' },
                    { q: 'Do I get updates?', a: 'Yes, free updates for 6 months after purchase.' },
                    { q: 'Is there documentation?', a: 'Comprehensive documentation included in the download.' },
                  ].map((item, idx) => (
                    <div key={idx} className="border border-gray-800 rounded p-4">
                      <p className="font-semibold mb-2">{item.q}</p>
                      <p className="text-gray-400">{item.a}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {[1, 2, 3].map((_, idx) => (
                    <div key={idx} className="border border-gray-800 rounded p-4">
                      <div className="flex gap-2 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className="text-yellow-400">
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="font-semibold mb-2">Amazing template! Saved me so much time.</p>
                      <p className="text-gray-400 text-sm">By John Doe • 2 weeks ago</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Related Products */}
            <div className="border-t border-gray-800 pt-12">
              <h2 className="text-3xl font-bold mb-8">Related Templates</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProducts.map((prod) => (
                  <ProductCard key={prod.id} {...prod} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
