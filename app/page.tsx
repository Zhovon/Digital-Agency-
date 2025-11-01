import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'ZZEROTECH - Premium React, Next.js, Nest & WordPress Templates',
  description: 'High-quality, production-ready templates for developers. Save hours on setup. Browse React, Next.js, Nest, and WordPress templates now.',
  openGraph: {
    title: 'ZZEROTECH - Premium Templates Marketplace',
    description: 'Professional templates for modern developers',
  },
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-b from-black via-black to-gray-950 min-h-screen flex items-center">
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center space-y-6 mb-12">
              <div className="inline-block bg-gray-900 border border-gray-800 rounded-full px-4 py-2 mb-4">
                <span className="text-lime-300 text-sm font-semibold">Welcome to ZZEROTECH</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Premium Templates for
                <span className="block gradient-text">Modern Developers</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                React • Next.js • Nest • WordPress - Ready to Use, Fully Customizable
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Link href="/templates" className="btn-primary">
                  Browse Templates
                </Link>
                <Link href="/about" className="btn-secondary">
                  Learn About Me
                </Link>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
              {['React', 'Next.js', 'Nest', 'WordPress'].map((tech) => (
                <div
                  key={tech}
                  className="card aspect-square flex items-center justify-center"
                >
                  <span className="text-center">
                    <div className="text-2xl mb-2">📦</div>
                    <p className="text-sm font-semibold">{tech}</p>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Templates Preview */}
        <section className="section-padding bg-black">
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Templates</h2>
              <p className="text-gray-400 text-lg">
                Curated selection of our most popular templates
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'React E-Commerce', price: '$49', category: 'React' },
                { name: 'Next.js SaaS', price: '$79', category: 'Next.js' },
                { name: 'Nest API', price: '$59', category: 'Nest' },
                { name: 'WordPress Blog', price: '$39', category: 'WordPress' },
              ].map((template, idx) => (
                <div key={idx} className="card group cursor-pointer">
                  <div className="bg-gray-800 h-48 rounded mb-4 flex items-center justify-center group-hover:bg-gray-700 transition">
                    <span className="text-4xl">🎨</span>
                  </div>
                  <h3 className="font-semibold mb-2">{template.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-lime-300 font-bold">{template.price}</span>
                    <span className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-300">
                      {template.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/templates" className="btn-secondary">
                View All Templates
              </Link>
            </div>
          </div>
        </section>

        {/* Portfolio Preview */}
        <section className="section-padding bg-gray-950">
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                4 Years of Frontend Excellence
              </h2>
              <p className="text-gray-400 text-lg">
                Building beautiful, performant web experiences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'E-Commerce Platform', tech: ['React', 'TypeScript', 'Tailwind'] },
                { title: 'SaaS Dashboard', tech: ['Next.js', 'Node.js', 'PostgreSQL'] },
                { title: 'Portfolio Website', tech: ['Next.js', 'Framer Motion', 'Tailwind'] },
              ].map((project, idx) => (
                <div key={idx} className="card">
                  <div className="bg-gray-800 h-32 rounded mb-4 flex items-center justify-center">
                    <span className="text-3xl">💼</span>
                  </div>
                  <h3 className="font-semibold mb-3">{project.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="text-xs bg-gray-800 px-2 py-1 rounded text-lime-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/portfolio" className="btn-primary">
                View Full Portfolio
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section-padding bg-black">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Templates Sold', value: '500+' },
                { label: 'Happy Customers', value: '1000+' },
                { label: 'Years Experience', value: '4' },
                { label: 'GitHub Stars', value: '2.5K' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-lime-300 mb-2">
                    {stat.value}
                  </div>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-to-r from-gray-950 to-black border-y border-gray-800">
          <div className="max-w-3xl mx-auto w-full text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Start Building Today</h2>
            <p className="text-gray-400 text-lg mb-8">
              Choose from our collection of premium templates and save hours on setup
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/templates" className="btn-primary">
                Browse Templates
              </Link>
              <Link href="/about" className="btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
