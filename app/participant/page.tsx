"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { FloatingElements } from "@/components/floating-elements"
import { motion } from "framer-motion"
import { CheckCircle, ChevronRight, Clock, Coins } from "lucide-react"
import { StudyFormModal } from "@/components/ui/study-form-modal"
import { DailyCoinsClaimContainer } from "@/components/daily-coins-claim"

export default function ParticipantPage() {
  const [loading, setLoading] = useState(true)
  const [activeStudy, setActiveStudy] = useState<{
    title: string
    description: string
    isOpen: boolean
  }>({
    title: "",
    description: "",
    isOpen: false,
  })

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleParticipateClick = (title: string, description: string) => {
    setActiveStudy({
      title,
      description,
      isOpen: true,
    })
  }

  const handleCloseModal = () => {
    setActiveStudy({
      ...activeStudy,
      isOpen: false,
    })
  }

  if (loading) {
    return <LoadingScreen text="Loading Participant Dashboard" />
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* 3D Floating Elements Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
        <FloatingElements />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        {/* Daily Coins Claim Container */}
        <div className="pt-32">
          <DailyCoinsClaimContainer />
        </div>

        <main className="pt-4 pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* <h1 className="text-4xl font-bold text-white mb-4">Participant Dashboard</h1>
              <p className="text-white/70 max-w-3xl">
                Welcome to your participant dashboard. Browse available studies, submit responses, and earn tokens for
                your valuable feedback.
              </p> */}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <StudyCard
                title="Consumer Behavior Survey"
                description="Share your shopping habits and preferences to help improve consumer experiences."
                time="10 minutes"
                tokens={30}
                tags={["Shopping", "Consumer", "Preferences"]}
                onParticipate={() =>
                  handleParticipateClick(
                    "Consumer Behavior Survey",
                    "Share your shopping habits and preferences to help improve consumer experiences.",
                  )
                }
              />

              <StudyCard
                title="Health & Wellness Study"
                description="Provide insights about your health routines and wellness practices."
                time="15 minutes"
                tokens={45}
                tags={["Health", "Wellness", "Lifestyle"]}
                onParticipate={() =>
                  handleParticipateClick(
                    "Health & Wellness Study",
                    "Provide insights about your health routines and wellness practices.",
                  )
                }
              />

              <StudyCard
                title="Technology Usage Survey"
                description="Share how you use technology in your daily life and work."
                time="12 minutes"
                tokens={35}
                tags={["Technology", "Digital", "Devices"]}
                onParticipate={() =>
                  handleParticipateClick(
                    "Technology Usage Survey",
                    "Share how you use technology in your daily life and work.",
                  )
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <DashboardCard
                title="Track Your Tokens"
                description="Monitor your token earnings and redemption history."
                icon="💰"
                features={["Current Balance: 120 tokens", "Pending Earnings: 45 tokens", "Total Earned: 320 tokens"]}
                cta="Manage Tokens"
                gradient="from-blue-600 to-violet-800"
              />

              <DashboardCard
                title="Your Participation"
                description="Track your study participation and response history."
                icon="📊"
                features={["Completed Studies: 8", "Pending Responses: 1", "Available Studies: 12"]}
                cta="View History"
                gradient="from-violet-600 to-purple-800"
              />
            </div>
          </div>
        </main>

        <Footer />
      </div>

      {/* Study Form Modal */}
      <StudyFormModal
        isOpen={activeStudy.isOpen}
        onClose={handleCloseModal}
        studyTitle={activeStudy.title}
        studyDescription={activeStudy.description}
      />
    </div>
  )
}

function StudyCard({
  title,
  description,
  time,
  tokens,
  tags,
  onParticipate,
}: {
  title: string
  description: string
  time: string
  tokens: number
  tags: string[]
  onParticipate: () => void
}) {
  return (
    <motion.div
      className="bg-black/60 backdrop-blur-md rounded-xl p-6 border border-violet-900/30 relative overflow-hidden hover:shadow-lg hover:shadow-violet-900/20 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>

      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/70 mb-4">{description}</p>

      <div className="flex items-center mb-4">
        <div className="flex items-center mr-4">
          <Clock className="h-4 w-4 text-blue-400 mr-1" />
          <span className="text-white/70 text-sm">{time}</span>
        </div>
        <div className="flex items-center">
          <Coins className="h-4 w-4 text-yellow-400 mr-1" />
          <span className="text-white/70 text-sm">{tokens} tokens</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded-full text-xs">
            {tag}
          </span>
        ))}
      </div>

      <Button
        className="w-full bg-gradient-to-r from-blue-600 to-violet-800 hover:opacity-90 text-white rounded-full"
        onClick={onParticipate}
      >
        Participate <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
  )
}

function DashboardCard({
  title,
  description,
  icon,
  features,
  cta,
  gradient,
}: {
  title: string
  description: string
  icon: string
  features: string[]
  cta: string
  gradient: string
}) {
  return (
    <motion.div
      className="bg-black/60 backdrop-blur-md rounded-xl p-6 border border-violet-900/30 relative overflow-hidden hover:shadow-lg hover:shadow-violet-900/20 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
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
        <h3 className="ml-4 text-xl font-bold text-white">{title}</h3>
      </div>

      <p className="text-white/70 mb-4">{description}</p>

      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-white/70">{feature}</span>
          </li>
        ))}
      </ul>

      <Button className={`w-full bg-gradient-to-r ${gradient} hover:opacity-90 text-white rounded-full`}>
        {cta} <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </motion.div>
  )
}

function LoadingScreen({ text }: { text: string }) {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="w-16 h-16 mb-8 relative">
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-violet-600/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-t-4 border-violet-600"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <motion.h2
        className="text-xl font-medium text-white"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {text}
      </motion.h2>
      <motion.div
        className="flex space-x-2 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" style={{ animationDelay: "0ms" }} />
        <div className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" style={{ animationDelay: "300ms" }} />
        <div className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" style={{ animationDelay: "600ms" }} />
      </motion.div>
    </div>
  )
}