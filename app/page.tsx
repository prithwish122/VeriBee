import { Preloader } from "@/components/preloader"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { Features } from "@/components/features"
import { Comparison } from "@/components/comparison"
import { FloatingElements } from "@/components/floating-elements"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Preloader */}
      <Preloader />

      {/* 3D Floating Elements Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FloatingElements />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        {/* Added extra padding-top to move content down from navbar */}
        <main className="pt-28">
          <Hero />
          <HowItWorks />
          <Features />
          <Comparison />
        </main>

        <Footer />
      </div>
    </div>
  )
}
