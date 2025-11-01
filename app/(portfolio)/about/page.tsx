'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-black">
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-b from-gray-950 to-black border-b border-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-lime-300 to-lime-400 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-4xl">👨‍💻</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">Frontend Developer</h1>
            <p className="text-xl text-gray-400">4 Years Building Modern Web Experiences</p>
          </div>
        </section>

        {/* About Content */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Introduction */}
            <div className="card">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                I'm a passionate frontend developer with 4 years of experience building beautiful, performant, and user-centric web applications. I specialize in modern JavaScript frameworks like React and Next.js, and I'm committed to creating solutions that solve real problems.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Beyond development, I'm passionate about sharing knowledge through open-source contributions and mentoring other developers in the community.
              </p>
            </div>

            {/* Experience Timeline */}
            <div>
              <h2 className="text-4xl font-bold mb-8">My Journey</h2>
              <div className="space-y-8">
                {[
                  {
                    year: 'Year 1 (2021)',
                    title: 'Foundation & Learning',
                    description:
                      'Started with HTML, CSS, and vanilla JavaScript. Built my first projects and learned the fundamentals of web development.',
                    highlights: ['HTML/CSS Mastery', 'JavaScript Basics', 'First Freelance Projects'],
                  },
                  {
                    year: 'Year 2 (2022)',
                    title: 'React Era Begins',
                    description:
                      'Dived deep into React and learned about component architecture, state management, and modern development practices.',
                    highlights: ['React.js Proficiency', 'Redux & Context API', 'REST APIs'],
                  },
                  {
                    year: 'Year 3 (2023)',
                    title: 'Full-Stack Development',
                    description:
                      'Expanded into backend technologies and learned Node.js, databases, and became proficient with Next.js for fullstack applications.',
                    highlights: ['Next.js Framework', 'Node.js & Express', 'Database Design', 'Authentication Systems'],
                  },
                  {
                    year: 'Year 4 (2024)',
                    title: 'Specialization & Mastery',
                    description:
                      'Focused on performance optimization, system design, and mentoring. Created production-ready applications and open-source contributions.',
                    highlights: ['Performance Optimization', 'System Design', 'Team Leadership', 'Open Source'],
                  },
                ].map((period, idx) => (
                  <div key={idx} className="card relative pl-8 before:absolute before:left-0 before:top-6 before:w-4 before:h-4 before:bg-lime-300 before:rounded-full">
                    <p className="text-sm text-lime-300 font-semibold mb-1">{period.year}</p>
                    <h3 className="text-2xl font-bold mb-3">{period.title}</h3>
                    <p className="text-gray-300 mb-4">{period.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {period.highlights.map((h) => (
                        <span key={h} className="text-xs bg-gray-800 px-3 py-1 rounded text-gray-300">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-4xl font-bold mb-8">Technical Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { category: 'Frontend', skills: ['React 18+', 'Next.js 14+', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Redux', 'React Query'] },
                  { category: 'Backend', skills: ['Node.js', 'Express', 'Nest.js', 'PostgreSQL', 'MongoDB', 'GraphQL', 'REST APIs'] },
                  { category: 'Tools & DevOps', skills: ['Git', 'Docker', 'Vercel', 'CI/CD', 'AWS', 'Webpack', 'NPM/Yarn'] },
                  { category: 'Other', skills: ['Web Performance', 'SEO Optimization', 'Accessibility (a11y)', 'Testing', 'Agile/Scrum'] },
                ].map((skillGroup, idx) => (
                  <div key={idx} className="card">
                    <h3 className="text-xl font-bold text-lime-300 mb-4">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.skills.map((skill) => (
                        <span key={skill} className="bg-gray-900 px-3 py-1 rounded text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Proficiency Levels */}
            <div>
              <h2 className="text-4xl font-bold mb-8">Proficiency Levels</h2>
              <div className="space-y-4">
                {[
                  { skill: 'React', level: 95 },
                  { skill: 'Next.js', level: 90 },
                  { skill: 'TypeScript', level: 85 },
                  { skill: 'Node.js', level: 80 },
                  { skill: 'System Design', level: 75 },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">{item.skill}</span>
                      <span className="text-lime-300">{item.level}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded h-2">
                      <div
                        className="bg-lime-300 h-full rounded transition-all duration-500"
                        style={{ width: `${item.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div>
              <h2 className="text-4xl font-bold mb-8">What Others Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    quote:
                      'Exceptional developer who consistently delivers high-quality work. A pleasure to work with!',
                    author: 'CEO, Tech Startup',
                  },
                  {
                    quote:
                      'Innovative solutions and great communication. Highly recommended!',
                    author: 'Project Manager, Fortune 500',
                  },
                ].map((testimonial, idx) => (
                  <div key={idx} className="card">
                    <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                    <p className="text-lime-300 font-semibold">— {testimonial.author}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="card text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Collaborate?</h2>
              <p className="text-gray-400 mb-6">
                I'm always open to exciting projects and opportunities
              </p>
              <div className="flex gap-4 justify-center">
                <a href="mailto:hello@zzerotech.com" className="btn-primary">
                  Get in Touch
                </a>
                <Link href="/templates" className="btn-secondary">
                  View Templates
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
