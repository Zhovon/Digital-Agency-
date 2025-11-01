'use client'

import { useState } from 'react'
import AdminSidebar from '@/components/Admin/Sidebar'
import Link from 'next/link'

export default function AdminProductsPage() {
  const [products, setProducts] = useState([
    { id: 1, name: 'React E-Commerce', category: 'React', price: '$49', sales: 245, status: 'Active' },
    { id: 2, name: 'Next.js SaaS', category: 'Next.js', price: '$79', sales: 198, status: 'Active' },
    { id: 3, name: 'Nest API', category: 'Nest', price: '$59', sales: 112, status: 'Active' },
    { id: 4, name: 'WordPress Blog', category: 'WordPress', price: '$39', sales: 156, status: 'Active' },
  ])

  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 ml-64 bg-black min-h-screen">
        {/* Header */}
        <div className="bg-gray-950 border-b border-gray-800 p-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">Products</h1>
              <p className="text-gray-400">Manage your templates</p>
            </div>
            <button className="btn-primary">+ Add Product</button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* Search */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
              />
            </div>

            {/* Table */}
            <div className="card overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-800">
                  <tr>
                    <th className="text-left py-3 px-4">Product Name</th>
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-left py-3 px-4">Price</th>
                    <th className="text-left py-3 px-4">Sales</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b border-gray-800">
                      <td className="py-3 px-4 font-semibold">{product.name}</td>
                      <td className="py-3 px-4">{product.category}</td>
                      <td className="py-3 px-4 text-lime-300">{product.price}</td>
                      <td className="py-3 px-4">{product.sales}</td>
                      <td className="py-3 px-4">
                        <span className="bg-green-600 px-3 py-1 rounded text-xs">
                          {product.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button className="text-blue-400 hover:text-blue-300">Edit</button>
                          <button className="text-red-400 hover:text-red-300">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
