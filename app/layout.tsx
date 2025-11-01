import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ZZEROTECH - Premium Templates Marketplace',
  description: 'High-quality React, Next.js, Nest, and WordPress templates for developers. Professional, production-ready, and fully customizable.',
  keywords: 'React templates, Next.js templates, Nest.js templates, WordPress templates, web development',
  openGraph: {
    title: 'ZZEROTECH - Premium Templates Marketplace',
    description: 'Professional templates for modern developers',
    url: 'https://zzerotech.com',
    siteName: 'ZZEROTECH',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
