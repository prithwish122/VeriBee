"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { CheckCircle, User, Users } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Update the HowItWorks component to make it more professional and engaging
export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeTab, setActiveTab] = useState("researcher")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const researcherSteps = [
    {
      number: "1️⃣",
      title: "Sign-Up & Verification",
      description: "Register using 3 social logins + Wallet.",
      features: ["Choose a Free or Paid plan."],
      icon: "🔐",
    },
    {
      number: "2️⃣",
      title: "Create a Research Study",
      description: "Upload or design custom digital forms.",
      features: [
        "Set eligibility criteria (age, location, prior studies, etc.).",
        "(🟢 Paid) Set custom notification time to alert participants.",
      ],
      icon: "📝",
    },
    {
      number: "3️⃣",
      title: "AI-Verified Data Collection",
      description: "Responses go through AI filtering for spam detection.",
      features: ["(🟢 Paid) Multi-layered AI spam detection for better quality responses."],
      icon: "🤖",
    },
    {
      number: "4️⃣",
      title: "Participant Incentivization",
      description: "Allocate mini tokens as incentives.",
      features: ["(🟢 Paid) Set higher token rewards for specific participants (e.g., verified professionals)."],
      icon: "🎁",
    },
    {
      number: "5️⃣",
      title: "Data Analysis & Insights",
      description: "Download raw data (Free).",
      features: ["(🟢 Paid) Access AI-generated reports, trends, and analytics."],
      icon: "📊",
    },
    {
      number: "6️⃣",
      title: "Scale & Improve Research",
      description: "Track study completion rates.",
      features: ["(🟢 Paid) Retarget engaged participants for future studies."],
      icon: "📈",
    },
  ]

  const participantSteps = [
    {
      number: "1️⃣",
      title: "Sign-Up & Verification",
      description: "Register using 3 social logins + Wallet.",
      features: [],
      icon: "👤",
    },
    {
      number: "2️⃣",
      title: "Discover Available Studies",
      description: "Browse through studies matching their profile.",
      features: ["(🟢 Paid Researcher Feature) Some participants may get priority invitations."],
      icon: "🔍",
    },
    {
      number: "3️⃣",
      title: "Fill Out Forms & Submit Responses",
      description: "Complete forms digitally.",
      features: ["AI checks for spam or inconsistent responses before submission."],
      icon: "✏️",
    },
    {
      number: "4️⃣",
      title: "Earn Mini Tokens",
      description: "Receive tokens for each successfully completed form.",
      features: ["Higher-quality responses may be rewarded more (🟢 Paid Researcher Feature)."],
      icon: "💰",
    },
    {
      number: "5️⃣",
      title: "Withdraw or Redeem Tokens",
      description: "Convert tokens into rewards, discounts, or cash-out options.",
      features: [],
      icon: "💸",
    },
    {
      number: "6️⃣",
      title: "Stay Engaged",
      description: "Build a verified reputation for better opportunities.",
      features: ["(🟢 Paid Researcher Feature) Get timely notifications to participate in more studies."],
      icon: "🔔",
    },
  ]

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-violet-900/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-900/10 rounded-full filter blur-3xl"></div>

        {/* Decorative grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-semibold bg-violet-900/30 text-violet-300 border border-violet-800/50">
            STEP-BY-STEP PROCESS
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">How VeriBee Works</h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Our platform streamlines the research process for both researchers and participants, ensuring high-quality
            data collection with built-in verification.
          </p>

          {/* Toggle tabs */}
          <div className="mt-10 flex justify-center">
          <Tabs defaultValue="researcher" className="w-full max-w-md" onValueChange={setActiveTab}>
  <div className="relative">
    <TabsList className="grid grid-cols-2 bg-black/40 backdrop-blur-md border border-violet-900/20 rounded-full p-1 shadow-lg shadow-violet-900/10 relative overflow-hidden">
      {/* Border glow effect using Tailwind animations */}
      <div className="absolute inset-0 rounded-full pointer-events-none">
        {/* Top border light */}
        <div className="absolute top-0 left-1/4 w-6 h-6 bg-violet-500 rounded-full opacity-10 blur-md animate-ping"></div>
        
        {/* Right border light */}
        <div className="absolute top-1/4 right-0 w-4 h-4 bg-purple-500 rounded-full opacity-10 blur-md animate-pulse"></div>
        
        {/* Bottom border light */}
        <div className="absolute bottom-0 right-1/4 w-8 h-8 bg-violet-400 rounded-full opacity-10 blur-md animate-ping"></div>
        
        {/* Left border light */}
        <div className="absolute bottom-1/4 left-0 w-4 h-4 bg-purple-600 rounded-full opacity-10 blur-md animate-pulse"></div>
      </div>
      
      {/* Additional subtle glow points */}
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-violet-300 rounded-full opacity-20 blur-sm animate-pulse"></div>
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-purple-300 rounded-full opacity-20 blur-sm animate-pulse"></div>
      
      {/* Enhanced border glow */}
      <div className="absolute inset-0 rounded-full border border-violet-500/20 shadow-sm shadow-violet-500/30"></div>
      
      <TabsTrigger
        value="researcher"
        className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-purple-800 data-[state=active]:text-white transition-all duration-300 relative z-10 group"
      >
        <div className="absolute inset-0 bg-violet-500/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <Users className="w-4 h-4 mr-2" />
        Researchers
      </TabsTrigger>
      
      <TabsTrigger
        value="participant"
        className="rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-purple-800 data-[state=active]:text-white transition-all duration-300 relative z-10 group"
      >
        <div className="absolute inset-0 bg-violet-500/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <User className="w-4 h-4 mr-2" />
        Participants
      </TabsTrigger>
    </TabsList>
  </div>
</Tabs>
          </div>
        </motion.div>

        <div ref={ref} className="relative">
          {/* 3D falling page effect */}
          <motion.div
            className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-full max-w-3xl h-20 bg-gradient-to-b from-violet-900/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />

          <AnimatePresence mode="wait">
            {activeTab === "researcher" ? (
              <motion.div
                key="researcher"
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20, rotateX: -10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -20, rotateX: 10 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-black/60 backdrop-blur-md rounded-xl p-8 border border-violet-900/30 shadow-xl shadow-violet-900/10">
                  <div className="flex items-center mb-8">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-purple-800 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">🔬</span>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-2xl font-bold text-white">Researcher's Flow</h3>
                      <p className="text-sm text-white/60">(Study Creator)</p>
                    </div>
                  </div>

                  <div className="space-y-10">
                    {researcherSteps.map((step, index) => (
                      <motion.div
                        key={index}
                        className="relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                      >
                        {index < researcherSteps.length - 1 && (
                          <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-violet-500 to-transparent h-24 z-0"></div>
                        )}
                        <div className="relative z-10 flex group">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-violet-900/50 border border-violet-500/50 flex items-center justify-center text-white group-hover:bg-violet-800/70 transition-colors duration-300">
                            <span className="text-xl">{step.icon}</span>
                          </div>
                          <div className="ml-5 bg-black/30 p-4 rounded-lg border border-violet-900/20 flex-1 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:shadow-lg group-hover:shadow-violet-900/10">
                            <div className="flex justify-between items-start">
                              <h4 className="text-xl font-semibold text-white">{step.title}</h4>
                              <span className="text-violet-400 font-bold">{step.number}</span>
                            </div>
                            <p className="mt-2 text-white/80">{step.description}</p>
                            <ul className="mt-3 space-y-2">
                              {step.features.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-start">
                                  <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                                  <span className="text-white/70">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="participant"
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20, rotateX: -10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -20, rotateX: 10 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-black/60 backdrop-blur-md rounded-xl p-8 border border-violet-900/30 shadow-xl shadow-violet-900/10">
                  <div className="flex items-center mb-8">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-purple-800 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">🧑‍🎓</span>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-2xl font-bold text-white">Participant's Flow</h3>
                      <p className="text-sm text-white/60">(Study Filler)</p>
                    </div>
                  </div>

                  <div className="space-y-10">
                    {participantSteps.map((step, index) => (
                      <motion.div
                        key={index}
                        className="relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                      >
                        {index < participantSteps.length - 1 && (
                          <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-transparent h-24 z-0"></div>
                        )}
                        <div className="relative z-10 flex group">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-900/50 border border-purple-500/50 flex items-center justify-center text-white group-hover:bg-purple-800/70 transition-colors duration-300">
                            <span className="text-xl">{step.icon}</span>
                          </div>
                          <div className="ml-5 bg-black/30 p-4 rounded-lg border border-violet-900/20 flex-1 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:shadow-lg group-hover:shadow-violet-900/10">
                            <div className="flex justify-between items-start">
                              <h4 className="text-xl font-semibold text-white">{step.title}</h4>
                              <span className="text-violet-400 font-bold">{step.number}</span>
                            </div>
                            <p className="mt-2 text-white/80">{step.description}</p>
                            {step.features.length > 0 && (
                              <ul className="mt-3 space-y-2">
                                {step.features.map((feature, featureIndex) => (
                                  <li key={featureIndex} className="flex items-start">
                                    <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                                    <span className="text-white/70">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
