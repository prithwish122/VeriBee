"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 - prev) * 0.1
        return newProgress >= 99 ? 100 : newProgress
      })
    }, 100)

    // Complete loading after a set time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" },
          }}
        >
          <motion.div
            className="relative flex flex-col items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: { duration: 0.5, ease: "easeOut" },
            }}
          >
            {/* Hexagon grid background */}
            <div className="absolute w-60 h-60 opacity-20">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern
                    id="hexagons"
                    width="10"
                    height="17.32"
                    patternUnits="userSpaceOnUse"
                    patternTransform="scale(1)"
                  >
                    <path d="M5 0L10 8.66L5 17.32L0 8.66Z" fill="none" stroke="#8b5cf6" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#hexagons)" />
              </svg>
            </div>

            {/* Logo container */}
            <motion.div
              className="relative w-24 h-24 rounded-full bg-gradient-to-r from-violet-600 to-purple-800 flex items-center justify-center"
              animate={{
                boxShadow: [
                  "0 0 0 rgba(139, 92, 246, 0.4)",
                  "0 0 20px rgba(139, 92, 246, 0.6)",
                  "0 0 0 rgba(139, 92, 246, 0.4)",
                ],
                rotate: [0, 360],
              }}
              transition={{
                boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              }}
            >
              {/* Orbiting particles */}
              <motion.div
                className="absolute w-4 h-4 rounded-full bg-violet-400"
                animate={{
                  x: [0, 30, 0, -30, 0],
                  y: [-30, 0, 30, 0, -30],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <motion.div
                className="absolute w-3 h-3 rounded-full bg-purple-400"
                animate={{
                  x: [20, 20, -20, -20, 20],
                  y: [20, -20, -20, 20, 20],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              <motion.div
                className="absolute w-2 h-2 rounded-full bg-pink-400"
                animate={{
                  x: [-15, 15, 15, -15, -15],
                  y: [15, 15, -15, -15, 15],
                }}
                transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              {/* Inner circle */}
              <motion.div
                className="w-16 h-16 rounded-full bg-black flex items-center justify-center"
                animate={{
                  scale: [1, 0.9, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <motion.div
                  className="text-3xl font-bold"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <span className="text-white font-bold text-2xl">V</span>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.h1
              className="mt-6 text-2xl font-bold text-white"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              VeriBee
            </motion.h1>

            {/* Progress bar */}
            <motion.div className="mt-8 w-48 h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-600 to-purple-800"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 50, damping: 10 }}
              />
            </motion.div>

            <motion.p
              className="mt-4 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Loading research platform...
            </motion.p>

            {/* Loading dots */}
            <div className="flex mt-2 space-x-1">
              <LoadingDot delay={0} />
              <LoadingDot delay={0.2} />
              <LoadingDot delay={0.4} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function LoadingDot({ delay }: { delay: number }) {
  return (
    <motion.div
      className="w-1.5 h-1.5 rounded-full bg-violet-500"
      animate={{
        y: ["0%", "-50%", "0%"],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 0.6,
        repeat: Number.POSITIVE_INFINITY,
        delay: delay,
        ease: "easeInOut",
      }}
    />
  )
}
