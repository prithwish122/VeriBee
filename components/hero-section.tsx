"use client"

import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Draw a stylized representation of a research dashboard
    const draw = () => {
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background
      ctx.fillStyle = "#1a103c"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw header
      ctx.fillStyle = "#2a1b4a"
      ctx.fillRect(0, 0, canvas.width, 40)

      // Draw sidebar
      ctx.fillStyle = "#2a1b4a"
      ctx.fillRect(0, 0, 60, canvas.height)

      // Draw some charts and elements

      // Chart 1 - Bar chart
      ctx.fillStyle = "#4c2a9e"
      ctx.fillRect(100, 80, 200, 120)

      // Chart bars
      ctx.fillStyle = "#8a5cf7"
      ctx.fillRect(120, 100, 20, 80)
      ctx.fillRect(150, 120, 20, 60)
      ctx.fillRect(180, 90, 20, 90)
      ctx.fillRect(210, 140, 20, 40)
      ctx.fillRect(240, 110, 20, 70)

      // Chart 2 - Pie chart
      ctx.fillStyle = "#4c2a9e"
      ctx.fillRect(320, 80, 150, 150)

      ctx.beginPath()
      ctx.arc(395, 155, 50, 0, Math.PI * 2)
      ctx.fillStyle = "#2a1b4a"
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(395, 155)
      ctx.arc(395, 155, 50, 0, Math.PI * 0.7)
      ctx.fillStyle = "#8a5cf7"
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(395, 155)
      ctx.arc(395, 155, 50, Math.PI * 0.7, Math.PI * 1.5)
      ctx.fillStyle = "#c4b5fd"
      ctx.fill()

      // Form section
      ctx.fillStyle = "#4c2a9e"
      ctx.fillRect(100, 220, 370, 150)

      // Form fields
      ctx.fillStyle = "#2a1b4a"
      ctx.fillRect(120, 240, 330, 30)
      ctx.fillRect(120, 280, 330, 30)
      ctx.fillRect(120, 320, 150, 30)

      // Submit button
      ctx.fillStyle = "#8a5cf7"
      ctx.fillRect(280, 320, 170, 30)
    }

    draw()
    window.addEventListener("resize", draw)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("resize", draw)
    }
  }, [])

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 pt-12">
      <div className="lg:w-1/2">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Revolutionize Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Research Studies
          </span>
        </h1>
        <p className="mt-6 text-lg text-white/80">
          Create, collect, and analyze research data with our AI-powered platform. Incentivize participants with mini
          tokens and get valuable insights faster than ever.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            Get Started
          </Button>
          
        </div>
      </div>
      <div className="lg:w-1/2 mt-8 lg:mt-0 rounded-lg overflow-hidden border border-white/20 shadow-2xl">
        <canvas ref={canvasRef} className="w-full aspect-[4/3]" />
      </div>
    </div>
  )
}
