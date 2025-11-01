'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

interface ProjectDetailPageProps {
  params: {
    slug: string
  }
}

const projectDetails = {
  'ecommerce-platform': {
    title: 'E-Commerce Platform',
    tagline: 'Full-stack e-commerce solution',
    image: '🛒',
    overview:
      'A comprehensive e-commerce platform built with modern web technologies. This platform handles product listings, shopping cart functionality, secure checkout with multiple payment options, and an admin dashboard for inventory management.',
    challenge:
      'The challenge was to create a scalable, performant platform that could handle thousands of products and concurrent users while maintaining security and data integrity.',
    solution:
      'I implemented a microservices architecture with React for the frontend, Node.js for the backend API, PostgreSQL for data persistence, and Redis for caching. The platform uses JWT for authentication and Stripe/PayPal for payment processing.',
    results:
      '✓ 98% uptime\n✓ Supports 10,000+ concurrent users\n✓ Average load time: 1.2 seconds\n✓ 95+ Lighthouse score',
    techStack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe API'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
  },
  'saas-dashboard': {
    title: 'SaaS Dashboard',
    tagline: 'Analytics and management dashboard',
    image: '📊',
    overview:
      'A comprehensive analytics dashboard for a SaaS platform. Features real-time data visualization, user management, reporting, and billing integration.',
    challenge:
      'Building a system that could handle large datasets efficiently and display real-time updates without compromising performance.',
    solution:
      'Implemented WebSocket connections for real-time updates, used GraphQL for efficient data querying, and implemented a sophisticated caching layer with Redis.',
    results:
      '✓ Real-time data updates\n✓ Handle 100K+ data points\n✓ Sub-100ms query response time\n✓ 99.9% uptime',
    techStack: ['Next.js', 'React', 'GraphQL', 'PostgreSQL', 'Redis', 'TypeScript'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
  },
  'portfolio-website': {
    title: 'Portfolio Website',
    tagline: 'Personal portfolio with animations',
    image: '🎨',
    overview:
      'A modern portfolio website showcasing projects and skills with smooth animations and transitions.',
    challenge:
      'Creating smooth, performant animations while maintaining accessibility and SEO.',
    solution:
      'Used Framer Motion for animations, implemented lazy loading, and optimized images for performance.',
    results:
      '✓ 100 Lighthouse score\n✓ Smooth 60fps animations\n✓ Mobile responsive',
    techStack: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
  },
  'chat-app': {
    title: 'Real-time Chat App',
    tagline: 'WebSocket-based messaging application',
    image: '💬',
    overview: 'A real-time messaging application built with WebSockets.',
    challenge: 'Implementing real-time communication with proper state management.',
    solution: 'Used Socket.io for real-time communication and Redux for state management.',
    results: '✓ Sub-100ms message delivery',
    techStack: ['React', 'Socket.io', 'Express', 'MongoDB'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
  },
  'mobile-app': {
    title: 'Mobile App UI',
    tagline: 'iOS app design and implementation',
    image: '📱',
    overview: 'Native iOS app for mobile commerce.',
    challenge: 'Adapting web technologies for mobile platforms.',
    solution: 'Used React Native for cross-platform development.',
    results: '✓ iOS and Android support\n✓ 4.8 star rating',
    techStack: ['React Native', 'TypeScript', 'Firebase'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
  },
  'api-management': {
    title: 'API Management System',
    tagline: 'API documentation and testing platform',
    image: '⚙️',
    overview: 'Comprehensive system for managing and documenting APIs.',
    challenge: 'Creating an intuitive interface for complex API interactions.',
    solution: 'Built with Next.js and integrated OpenAPI specifications.',
    results: '✓ Used by 500+ developers',
    techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'OpenAPI'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
  },
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project =
    projectDetails[params.slug as keyof typeof projectDetails]

  if (!project) {
    return (
      <>
        <Header />
        <main className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Project Not Found</h1>
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
        {/* Hero */}
        <section className="section-padding bg-gradient-to-b from-gray-950 to-black">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-8xl mb-6">{project.image}</div>
            <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
            <p className="text-xl text-gray-400 mb-8">{project.tagline}</p>
            <div className="flex gap-4 justify-center">
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Live Demo
              </a>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Overview */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Overview</h2>
              <p className="text-gray-300 leading-relaxed">{project.overview}</p>
            </div>

            {/* Challenge */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Challenge</h2>
              <p className="text-gray-300 leading-relaxed">{project.challenge}</p>
            </div>

            {/* Solution */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Solution</h2>
              <p className="text-gray-300 leading-relaxed">{project.solution}</p>
            </div>

            {/* Results */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Results</h2>
              <div className="bg-gray-900 p-6 rounded-lg">
                {project.results.split('\n').map((line, idx) => (
                  <p key={idx} className="text-gray-300 mb-2">
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Tech Stack</h2>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="bg-gray-900 px-4 py-2 rounded border border-gray-800 text-lime-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        <section className="section-padding bg-gray-950 border-t border-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">More Projects</h2>
            <div className="flex gap-4">
              <Link href="/portfolio" className="btn-primary">
                View All Projects
              </Link>
              <a href="#contact" className="btn-secondary">
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
