'use client'

import Link from 'next/link'
import { useState } from 'react'

interface ProductCardProps {
  id: string
  name: string
  price: number
  category: 'react' | 'nextjs' | 'nest' | 'wordpress'
  image?: string
  rating?: number
  downloads?: number
}

const categoryColors = {
  react: 'bg-blue-600',
  nextjs: 'bg-purple-600',
  nest: 'bg-red-600',
  wordpress: 'bg-orange-600',
}

const categoryLabels = {
  react: 'React',
  nextjs: 'Next.js',
  nest: 'Nest.js',
  wordpress: 'WordPress',
}

export default function ProductCard({
  id,
  name,
  price,
  category,
  image,
  rating = 5,
  downloads = 0,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/shop/templates/${id}`}>
      <div
        className="card group h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className={`relative bg-gray-800 h-48 rounded mb-4 flex items-center justify-center overflow-hidden transition-transform ${isHovered ? 'scale-105' : ''}`}>
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-4xl">📦</span>
          )}
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold">View Details</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold flex-1">{name}</h3>
          </div>

          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            Professional template with modern design
          </p>

          <div className="flex gap-2 mb-4">
            <span className={`text-xs px-2 py-1 rounded text-white ${categoryColors[category]}`}>
              {categoryLabels[category]}
            </span>
            {downloads > 0 && (
              <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-300">
                {downloads.toLocaleString()} downloads
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}>
                ★
              </span>
            ))}
            <span className="text-xs text-gray-400 ml-2">({rating})</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-800">
          <span className="text-2xl font-bold text-lime-300">${price}</span>
          <button className="bg-lime-300 text-black px-3 py-2 rounded font-semibold text-sm hover:bg-lime-400 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  )
}
