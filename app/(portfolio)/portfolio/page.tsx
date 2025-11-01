'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function PortfolioPage() {
  const [selectedFilter, setSelectedFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React and Node.js',
      image: '🛒',
      category: 'ecommerce',
      tech: ['React', 'TypeScript', 'Tailwind', 'Node.js'],
      slug: 'ecommerce-platform',
    },
    {
      id: 2,
      title: 'SaaS Dashboard',
      description: 'Analytics dashboard for a SaaS platform',
      image: '📊',
      category: 'saas',
      tech: ['Next.js', 'React', 'PostgreSQL', 'GraphQL'],
      slug: 'saas-dashboard',
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'Personal portfolio with animations',
      image: '🎨',
      category: 'portfolio',
      tech: ['Next.js', 'Framer Motion', 'Tailwind', 'TypeScript'],
      slug: 'portfolio-website',
    },
    {
      id: 4,
      title: 'Real-time Chat App',
      description: 'WebSocket-based messaging application',
      image: '💬',
      category: 'other',
      tech: ['React', 'Socket.io', 'Express', 'MongoDB'],
      slug: 'chat-app',
    },
    {
      id: 5,
      title: 'Mobile App UI',
      description: 'iOS app design and implementation',
      image: '📱',
      category: 'other',
      tech: ['React Native', 'TypeScript', 'Firebase'],
      slug: 'mobile-app',
    },
    {
      id: 6,
      title: 'API Management System',
      description: 'Comprehensive API documentation and testing platform',
      image: '⚙️',
      category: 'saas',
      tech: ['Next.js', 'Node.js', 'PostgreSQL', 'REST API'],
      slug: 'api-management',
    },
  ]

  const filteredProjects =
    selectedFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedFilter)

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-black">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-b from-gray-950 to-black border-b border-gray-800">
          <div className="max-w-6xl mx-auto w-full text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">My Work</h1>
            <p className="text-xl text-gray-400">
              4 Years of Frontend Development Excellence
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="section-padding bg-black">
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              {[
                { value: 'all', label: 'All Projects' },
                { value: 'ecommerce', label: 'E-Commerce' },
                { value: 'saas', label: 'SaaS' },
                { value: 'portfolio', label: 'Portfolio' },
                { value: 'other', label: 'Other' },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setSelectedFilter(filter.value)}
                  className={`px-6 py-2 rounded transition ${
                    selectedFilter === filter.value
                      ? 'bg-lime-300 text-black font-semibold'
                      : 'border-2 border-gray-800 text-gray-400 hover:border-lime-300'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Link key={project.id} href={`/portfolio/${project.slug}`}>
                  <div className="card group h-full cursor-pointer">
                    <div className="bg-gray-900 h-48 rounded mb-4 flex items-center justify-center text-6xl group-hover:bg-gray-800 transition">
                      {project.image}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs bg-gray-800 px-2 py-1 rounded text-lime-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
