"use client"

import { JSX, useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export function VideoDemo(): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [progress, setProgress] = useState<number>(0)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)

  useEffect(() => {
    // Start playing automatically when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch((error: Error) => {
        console.error("Autoplay failed:", error)
        setIsPlaying(false)
      })
    }
  }, [])

  useEffect(() => {
    const updateProgress = (): void => {
      if (videoRef.current) {
        const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100
        setProgress(currentProgress)
      }
    }

    const videoElement = videoRef.current
    if (videoElement) {
      videoElement.addEventListener("timeupdate", updateProgress)
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("timeupdate", updateProgress)
      }
    }
  }, [])

  const togglePlay = (): void => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleFullscreen = (): void => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen().catch((err: Error) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div className="relative">
      {/* Ambient background elements */}
      <div className="absolute -inset-12 -z-10 bg-black rounded-3xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Animated gradient background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-800 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
            <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-700 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
          </div>
          
          {/* Particle effect */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{ 
                  x: Math.random() * 100 + "%", 
                  y: Math.random() * 100 + "%", 
                  opacity: Math.random() * 0.5 + 0.3 
                }}
                animate={{ 
                  x: Math.random() * 100 + "%", 
                  y: Math.random() * 100 + "%",
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{ 
                  duration: Math.random() * 20 + 15, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>
          
          {/* Grid lines */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40">
            <div className="absolute inset-0" style={{ 
              backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "40px 40px" 
            }}></div>
          </div>
        </div>
      </div>
      
      {/* Main video container with glow effect */}
      <div className="w-full aspect-[16/9] bg-gradient-to-b from-black to-violet-950/20 rounded-lg overflow-hidden border border-violet-800/30 relative group shadow-2xl shadow-violet-900/30">
        {/* Glass effect frame */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
        
        {/* Website interface animation directly embedded in the main view */}
        <div className="w-full h-full relative">
          <div className="absolute inset-0">
            <WebsiteDemo />
          </div>

          {/* Subtle pulsing glow when playing */}
          {isPlaying && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -inset-1 bg-violet-600/10 rounded-lg animate-pulse" style={{ animationDuration: "4s" }}></div>
            </div>
          )}

          {/* Video controls overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center mb-2">
              <button
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors mr-4 border border-white/10"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <div className="w-3 h-8 flex">
                    <div className="w-1 h-full bg-white mr-1"></div>
                    <div className="w-1 h-full bg-white"></div>
                  </div>
                ) : (
                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
                )}
              </button>

              <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden mx-4">
                <div className="h-full bg-violet-600" style={{ width: `${progress}%` }}></div>
              </div>

              <button
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors ml-4 border border-white/10"
                onClick={toggleFullscreen}
              >
                <div className="w-4 h-4 border-2 border-white"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Video title and description */}
      <div className="mt-4 px-2">
        <h3 className="text-lg font-medium text-white">VeriBee Platform Demo</h3>
        <p className="text-sm text-violet-300/70">Experience our research data collection platform</p>
      </div>
    </div>
  )
}

interface WebsiteDemoStep {
  content: JSX.Element
}

function WebsiteDemo(): JSX.Element {
  const [step, setStep] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 5)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-full bg-black overflow-hidden">
      {/* Step 1: Landing Page */}
      {step === 0 && (
        <motion.div
          className="absolute inset-0 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Navbar */}
          <div className="h-16 bg-black/80 border-b border-violet-900/30 flex items-center px-6">
            <div className="w-10 h-10 rounded-full bg-violet-700 flex items-center justify-center mr-2">
              <span className="text-white font-bold">V</span>
            </div>
            <div className="text-white font-bold text-xl">VeriBee</div>
            <div className="ml-auto flex space-x-6">
              <div className="text-white/70">How It Works</div>
              <div className="text-white/70">Features</div>
              <div className="text-white/70">Pricing</div>
              <div className="text-white/70">Docs</div>
              <div className="ml-4 px-4 py-1 border border-violet-600 text-violet-400 rounded-full">Faucet</div>
              {/* <div className="px-4 py-1 bg-violet-600 text-white rounded-full">OCID Login</div> */}
            </div>
          </div>

          {/* Hero section */}
          <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-600/20 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-800/20 rounded-full filter blur-3xl"></div>

            <div className="text-center z-10 mb-8">
              <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-violet-900/30 text-violet-300 border border-violet-800/50 mb-4">
                Revolutionizing Research Data Collection
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">
                Secure, Verified Research Studies with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-600">
                  VeriBee
                </span>
              </h1>
              <p className="text-white/70 max-w-2xl mx-auto mb-8">
                Create, collect, and analyze research data with our AI-powered platform. Incentivize participants with
                mini tokens and get valuable insights faster than ever.
              </p>
              <div className="flex justify-center space-x-4">
                <div className="px-6 py-2 bg-gradient-to-r from-violet-600 to-purple-800 text-white rounded-full">
                  Get Started
                </div>
                <div className="px-6 py-2 border border-violet-600 text-violet-400 rounded-full">Watch Demo</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 max-w-4xl w-full mt-8">
              <div className="bg-black/60 backdrop-blur-md rounded-xl p-6 border border-violet-900/30">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-purple-800 flex items-center justify-center text-2xl">
                    🔬
                  </div>
                  <h3 className="ml-4 text-xl font-bold text-white">I'm a Researcher</h3>
                </div>
                <p className="text-white/70 mb-6">
                  Create studies, collect data, and gain valuable insights with our AI-powered platform.
                </p>
                <div className="w-full py-2 bg-gradient-to-r from-violet-600 to-purple-800 text-white rounded-full text-center">
                  Get Started
                </div>
              </div>

              <div className="bg-black/60 backdrop-blur-md rounded-xl p-6 border border-violet-900/30">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-violet-800 flex items-center justify-center text-2xl">
                    🧑‍🎓
                  </div>
                  <h3 className="ml-4 text-xl font-bold text-white">I'm a Participant</h3>
                </div>
                <p className="text-white/70 mb-6">
                  Join studies, provide valuable feedback, and earn tokens for your participation.
                </p>
                <div className="w-full py-2 bg-gradient-to-r from-blue-600 to-violet-800 text-white rounded-full text-center">
                  Start Participating
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 2: Loading Animation */}
      {step === 1 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-violet-600 to-purple-800 flex items-center justify-center mb-8 relative">
              <div className="absolute w-full h-full rounded-full border-4 border-transparent border-t-white animate-spin"></div>
              <span className="text-white font-bold text-2xl">V</span>
            </div>
            <h2 className="text-white text-xl font-bold mb-4">Loading Researcher Dashboard</h2>
            <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-violet-600"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5 }}
              ></motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 3: Researcher Dashboard */}
      {step === 2 && (
        <motion.div
          className="absolute inset-0 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Navbar */}
          <div className="h-16 bg-black/80 border-b border-violet-900/30 flex items-center px-6">
            <div className="w-10 h-10 rounded-full bg-violet-700 flex items-center justify-center mr-2">
              <span className="text-white font-bold">V</span>
            </div>
            <div className="text-white font-bold text-xl">VeriBee</div>
            <div className="ml-8 flex space-x-6">
              <div className="text-white">Dashboard</div>
              <div className="text-white/70">Forms</div>
              <div className="text-white/70">Analytics</div>
              <div className="text-white/70">Tokens</div>
            </div>
            <div className="ml-auto flex items-center">
              <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center">JD</div>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="flex-1 bg-black p-6">
            <h1 className="text-2xl font-bold text-white mb-6">Researcher Dashboard</h1>

            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="bg-black/60 backdrop-blur-md rounded-xl p-4 border border-violet-900/30">
                <div className="text-white/70 text-sm mb-1">Active Studies</div>
                <div className="text-2xl font-bold text-white">3</div>
              </div>
              <div className="bg-black/60 backdrop-blur-md rounded-xl p-4 border border-violet-900/30">
                <div className="text-white/70 text-sm mb-1">Total Participants</div>
                <div className="text-2xl font-bold text-white">128</div>
              </div>
              <div className="bg-black/60 backdrop-blur-md rounded-xl p-4 border border-violet-900/30">
                <div className="text-white/70 text-sm mb-1">Completion Rate</div>
                <div className="text-2xl font-bold text-white">87%</div>
              </div>
              <div className="bg-black/60 backdrop-blur-md rounded-xl p-4 border border-violet-900/30">
                <div className="text-white/70 text-sm mb-1">Tokens Distributed</div>
                <div className="text-2xl font-bold text-white">4,250</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 bg-black/60 backdrop-blur-md rounded-xl p-6 border border-violet-900/30">
                <h2 className="text-xl font-bold text-white mb-4">Research Forms</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-violet-900/20">
                    <div>
                      <div className="text-white font-medium">Consumer Behavior Survey</div>
                      <div className="text-white/60 text-sm">Created 3 days ago • 45 responses</div>
                    </div>
                    <div className="px-3 py-1 bg-violet-600/20 text-violet-400 rounded-full text-sm">Active</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-violet-900/20">
                    <div>
                      <div className="text-white font-medium">Product Feedback Form</div>
                      <div className="text-white/60 text-sm">Created 1 week ago • 83 responses</div>
                    </div>
                    <div className="px-3 py-1 bg-violet-600/20 text-violet-400 rounded-full text-sm">Active</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-violet-900/20">
                    <div>
                      <div className="text-white font-medium">User Experience Study</div>
                      <div className="text-white/60 text-sm">Created 2 weeks ago • 0 responses</div>
                    </div>
                    <div className="px-3 py-1 bg-gray-600/20 text-gray-400 rounded-full text-sm">Draft</div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <div className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-800 text-white rounded-full text-sm">
                    Create New Form
                  </div>
                </div>
              </div>

              <div className="bg-black/60 backdrop-blur-md rounded-xl p-6 border border-violet-900/30">
                <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <div className="p-3 bg-black/40 rounded-lg border border-violet-900/20 hover:border-violet-600/50 transition-colors cursor-pointer">
                    <div className="text-white font-medium">Create & Manage Forms</div>
                  </div>
                  <div className="p-3 bg-black/40 rounded-lg border border-violet-900/20 hover:border-violet-600/50 transition-colors cursor-pointer">
                    <div className="text-white font-medium">Set AI Spam Filtering</div>
                    <div className="text-white/60 text-xs mt-1">Basic vs. Multi-Model (Premium)</div>
                  </div>
                  <div className="p-3 bg-black/40 rounded-lg border border-violet-900/20 hover:border-violet-600/50 transition-colors cursor-pointer">
                    <div className="text-white font-medium">Set Notification Timing</div>
                    <div className="text-white/60 text-xs mt-1">Premium feature</div>
                  </div>
                  <div className="p-3 bg-black/40 rounded-lg border border-violet-900/20 hover:border-violet-600/50 transition-colors cursor-pointer">
                    <div className="text-white font-medium">View Response Analytics</div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-violet-900/20 rounded-lg border border-violet-600/30">
                  <div className="text-violet-400 font-medium text-sm">Premium Features</div>
                  <div className="text-white/60 text-xs mt-1">
                    Upgrade to access advanced analytics, multi-model AI filtering, and custom notifications.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 4: Loading Animation for Participant */}
      {step === 3 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-600 to-violet-800 flex items-center justify-center mb-8 relative">
              <div className="absolute w-full h-full rounded-full border-4 border-transparent border-t-white animate-spin"></div>
              <span className="text-white font-bold text-2xl">V</span>
            </div>
            <h2 className="text-white text-xl font-bold mb-4">Loading Participant Dashboard</h2>
            <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-600"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5 }}
              ></motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 5: Participant Dashboard */}
      {step === 4 && (
        <motion.div
          className="absolute inset-0 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Navbar */}
          <div className="h-16 bg-black/80 border-b border-violet-900/30 flex items-center px-6">
            <div className="w-10 h-10 rounded-full bg-violet-700 flex items-center justify-center mr-2">
              <span className="text-white font-bold">V</span>
            </div>
            <div className="text-white font-bold text-xl">VeriBee</div>
            <div className="ml-8 flex space-x-6">
              <div className="text-white">Dashboard</div>
              <div className="text-white/70">Studies</div>
              <div className="text-white/70">Responses</div>
              <div className="text-white/70">Tokens</div>
            </div>
            <div className="ml-auto flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">AS</div>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="flex-1 bg-black p-6">
            <h1 className="text-2xl font-bold text-white mb-6">Participant Dashboard</h1>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-black/60 backdrop-blur-md rounded-xl p-4 border border-violet-900/30">
                <div className="text-white/70 text-sm mb-1">Available Studies</div>
                <div className="text-2xl font-bold text-white">12</div>
              </div>
              <div className="bg-black/60 backdrop-blur-md rounded-xl p-4 border border-violet-900/30">
                <div className="text-white/70 text-sm mb-1">Completed Studies</div>
                <div className="text-2xl font-bold text-white">8</div>
              </div>
              <div className="bg-black/60 backdrop-blur-md rounded-xl p-4 border border-violet-900/30">
                <div className="text-white/70 text-sm mb-1">Tokens Earned</div>
                <div className="text-2xl font-bold text-white">320</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 bg-black/60 backdrop-blur-md rounded-xl p-6 border border-violet-900/30">
                <h2 className="text-xl font-bold text-white mb-4">Available Research Studies</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-violet-900/20">
                    <div>
                      <div className="text-white font-medium">Consumer Behavior Survey</div>
                      <div className="text-white/60 text-sm">10 min • 30 tokens reward</div>
                    </div>
                    <div className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-violet-800 text-white rounded-full text-sm">
                      Participate
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-violet-900/20">
                    <div>
                      <div className="text-white font-medium">Product Feedback Form</div>
                      <div className="text-white/60 text-sm">15 min • 45 tokens reward</div>
                    </div>
                    <div className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-violet-800 text-white rounded-full text-sm">
                      Participate
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-violet-900/20">
                    <div>
                      <div className="text-white font-medium">Health & Wellness Survey</div>
                      <div className="text-white/60 text-sm">20 min • 60 tokens reward</div>
                    </div>
                    <div className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-violet-800 text-white rounded-full text-sm">
                      Participate
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <div className="px-4 py-2 bg-white/10 text-white rounded-full text-sm">View All Studies</div>
                </div>
              </div>

              <div className="bg-black/60 backdrop-blur-md rounded-xl p-6 border border-violet-900/30">
                <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <div className="p-3 bg-black/40 rounded-lg border border-violet-900/20 hover:border-violet-600/50 transition-colors cursor-pointer">
                    <div className="text-white font-medium">Browse Available Studies</div>
                  </div>
                  <div className="p-3 bg-black/40 rounded-lg border border-violet-900/20 hover:border-violet-600/50 transition-colors cursor-pointer">
                    <div className="text-white font-medium">Fill Forms & Submit Responses</div>
                  </div>
                  <div className="p-3 bg-black/40 rounded-lg border border-violet-900/20 hover:border-violet-600/50 transition-colors cursor-pointer">
                    <div className="text-white font-medium">Track Earned Tokens</div>
                  </div>
                  <div className="p-3 bg-black/40 rounded-lg border border-violet-900/20 hover:border-violet-600/50 transition-colors cursor-pointer">
                    <div className="text-white font-medium">Withdraw or Redeem Tokens</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}