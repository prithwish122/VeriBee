"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { VideoDemo } from "@/components/video-demo"
import { ArrowRight, Play } from "lucide-react"
import { useRouter } from "next/navigation"

export function Hero() {
  const [showVideo, setShowVideo] = useState(false)
  const router = useRouter()

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden">
      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-600/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-800/20 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            className="mb-6 inline-block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3, duration: 0.5 }}
          >
            <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-violet-900/30 text-violet-300 border border-violet-800/50">
              Revolutionizing Research Data Collection
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.2, duration: 0.5 }}
          >
            Secure, Verified Research Studies with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-600">
              VeriBee
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-white/70 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.4, duration: 0.5 }}
          >
            Create, collect, and analyze research data with our AI-powered platform. Incentivize participants with mini
            tokens and get valuable insights faster than ever.
          </motion.p>

          <motion.div
            className="mt-16 flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.6, duration: 0.5 }}
          >
            {/* <Button
              size="lg"
              className="bg-gradient-to-r from-violet-600 to-purple-800 hover:from-violet-700 hover:to-purple-900 text-white border-0 rounded-full"
              onClick={() => setShowVideo(true)}
            >
              <Play className="mr-2 h-4 w-4" /> Watch Demo
            </Button> */}
          </motion.div>
        </div>

        <motion.div
          className="mt-2 flex justify-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 0.7 }}
        >
          <div className="w-full max-w-4xl aspect-[16/9] relative">
            <VideoDemo isOpen={showVideo} onClose={() => setShowVideo(false)} />
          </div>
        </motion.div>

        <motion.div
  className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 4, duration: 0.5 }}
>
  <motion.div
    className="bg-black/60 backdrop-blur-md rounded-xl p-8 border border-violet-900/30 relative overflow-hidden group hover:shadow-lg hover:shadow-violet-900/20 transition-all duration-300"
    whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
  >
    <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-violet-600 to-purple-800 rounded-full filter blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
    
    <motion.div 
      className="flex items-center mb-4"
      whileHover={{ x: 5, transition: { duration: 0.2 } }}
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-purple-800 flex items-center justify-center text-2xl shadow-md">
        🔬
      </div>
      <h3 className="ml-4 text-2xl font-bold text-white">I'm a Researcher</h3>
    </motion.div>

    <p className="text-white/70 mb-6">Create studies, collect data, and gain valuable insights with our AI-powered platform.</p>
    
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        className="w-full bg-gradient-to-r from-violet-600 to-purple-800 hover:opacity-90 text-white rounded-full group relative overflow-hidden"
        onClick={() => router.push("/researcher")}
      >
        <span className="relative z-10 flex items-center justify-center">
          Get Started 
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-violet-700 to-purple-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </Button>
    </motion.div>
  </motion.div>

  <motion.div
    className="bg-black/60 backdrop-blur-md rounded-xl p-8 border border-violet-900/30 relative overflow-hidden group hover:shadow-lg hover:shadow-violet-900/20 transition-all duration-300"
    whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
  >
    <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-blue-600 to-violet-800 rounded-full filter blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
    
    <motion.div 
      className="flex items-center mb-4"
      whileHover={{ x: 5, transition: { duration: 0.2 } }}
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-violet-800 flex items-center justify-center text-2xl shadow-md">
        🧑‍🎓
      </div>
      <h3 className="ml-4 text-2xl font-bold text-white">I'm a Participant</h3>
    </motion.div>

    <p className="text-white/70 mb-6">Join studies, provide valuable feedback, and earn tokens for your participation.</p>
    
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        className="w-full bg-gradient-to-r from-blue-600 to-violet-800 hover:opacity-90 text-white rounded-full group relative overflow-hidden"
        onClick={() => router.push("/participant")}
      >
        <span className="relative z-10 flex items-center justify-center">
          Start Participating
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </span>
        <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-violet-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      </Button>
    </motion.div>
  </motion.div>
</motion.div>
      </div>
    </section>
  )
}

function UserTypeCard({
  title,
  description,
  buttonText,
  onClick,
  gradient,
  icon,
}: {
  title: string
  description: string
  buttonText: string
  onClick: () => void
  gradient: string
  icon: string
}) {
  return (
    <motion.div
      className="bg-black/60 backdrop-blur-md rounded-xl p-8 border border-violet-900/30 relative overflow-hidden hover:shadow-lg hover:shadow-violet-900/20 transition-all duration-300"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div
        className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${gradient} rounded-full filter blur-3xl opacity-10`}
      ></div>

      <div className="flex items-center mb-4">
        <div
          className={`w-12 h-12 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center text-2xl`}
        >
          {icon}
        </div>
        <h3 className="ml-4 text-2xl font-bold text-white">{title}</h3>
      </div>

      <p className="text-white/70 mb-6">{description}</p>

      <Button
        className={`w-full bg-gradient-to-r ${gradient} hover:opacity-90 text-white rounded-full`}
        onClick={onClick}
      >
        {buttonText} <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
  )
}
