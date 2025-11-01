import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-black">
        {children}
      </main>
      <Footer />
    </>
  )
}
