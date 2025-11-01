'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [sortBy, setSortBy] = useState('newest')
  const [priceRange, setPriceRange] = useState(100)
  const [searchQuery, setSearchQuery] = useState('')

  // Mock products data
  const allProducts = [
    {
      id: '1',
      name: 'React E-Commerce',
      price: 49,
      category: 'react' as const,
      rating: 5,
      downloads: 2000,
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
      id: '3',
      name: 'Nest API',
      price: 59,
      category: 'nest' as const,
      rating: 4,
      downloads: 800,
    },
    {
      id: '4',
      name: 'WordPress Blog',
      price: 39,
      category: 'wordpress' as const,
      rating: 5,
      downloads: 3000,
    },
    {
      id: '5',
      name: 'React Dashboard',
      price: 69,
      category: 'react' as const,
      rating: 5,
      downloads: 1200,
    },
    {
      id: '6',
      name: 'Next.js Portfolio',
      price: 54,
      category: 'nextjs' as const,
      rating: 4,
      downloads: 900,
    },
    {
      id: '7',
      name: 'Nest GraphQL',
      price: 89,
      category: 'nest' as const,
      rating: 5,
      downloads: 600,
    },
    {
      id: '8',
      name: 'WordPress E-Commerce',
      price: 49,
      category: 'wordpress' as const,
      rating: 4,
      downloads: 2500,
    },
  ]

  // Filter and sort products
  let filteredProducts = allProducts.filter((product) => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    const matchesPrice = product.price <= priceRange
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesPrice && matchesSearch
  })

  // Sort
  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price)
  } else if (sortBy === 'popular') {
    filteredProducts.sort((a, b) => b.downloads - a.downloads)
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating)
  }

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-black">
        {/* Header */}
        <section className="section-padding bg-gradient-to-b from-gray-950 to-black border-b border-gray-800">
          <div className="max-w-6xl mx-auto w-full">
            <h1 className="text-5xl font-bold mb-2">Templates Store</h1>
            <p className="text-gray-400">
              Browse our collection of {filteredProducts.length} templates
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="section-padding">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Filters */}
              <div className="lg:col-span-1">
                <div className="card sticky top-24 space-y-6">
                  {/* Search */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">Search</label>
                    <input
                      type="text"
                      placeholder="Search templates..."
                      className="input-field text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-semibold mb-3">Category</label>
                    <div className="space-y-2">
                      {[
                        { value: '', label: 'All Categories' },
                        { value: 'react', label: 'React' },
                        { value: 'nextjs', label: 'Next.js' },
                        { value: 'nest', label: 'Nest.js' },
                        { value: 'wordpress', label: 'WordPress' },
                      ].map((category) => (
                        <label key={category.value} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="category"
                            value={category.value}
                            checked={selectedCategory === category.value}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="rounded"
                          />
                          <span className="text-sm">{category.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Price: ${priceRange}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Sort */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="input-field text-sm"
                    >
                      <option value="newest">Newest</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="popular">Most Popular</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="lg:col-span-3">
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} {...product} />
                    ))}
                  </div>
                ) : (
                  <div className="card text-center py-12">
                    <p className="text-gray-400 mb-4">No templates found matching your filters</p>
                    <button
                      onClick={() => {
                        setSelectedCategory('')
                        setPriceRange(100)
                        setSearchQuery('')
                      }}
                      className="btn-secondary"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
