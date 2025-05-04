"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Comparison() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

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

  const features = [
    {
      name: "AI Spam Detection",
      free: "Basic (Single Model)",
      paid: "Advanced (Multi-Model)",
    },
    {
      name: "Notification to Participants",
      free: false,
      paid: "Customizable Notifications",
    },
    {
      name: "Mini Token Rewards",
      free: "Standard Payouts",
      paid: "Higher Token Incentives",
    },
    {
      name: "AI Data Analysis",
      free: "Raw Data Only",
      paid: "AI-Generated Insights & Trends",
    },
    {
      name: "Retargeting Engaged Participants",
      free: false,
      paid: "Priority for Active Participants",
    },
    {
      name: "Study Eligibility Filtering",
      free: "Basic Filters",
      paid: "Advanced Targeting",
    },
  ]

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-violet-900/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-900/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Choose Your Plan</h2>
          <p className="text-white/70 max-w-2xl mx-auto">Select the plan that fits your research needs and budget</p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Free Plan */}
          <motion.div
            variants={itemVariants}
            className="bg-black/60 backdrop-blur-md rounded-xl p-6 border border-violet-900/30 relative overflow-hidden hover:shadow-lg hover:shadow-violet-900/20 transition-all duration-300"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-violet-500/10 rounded-full blur-2xl"></div>
            <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
            <p className="text-white/70 mb-4">Perfect for getting started</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$0</span>
              <span className="text-white/70">/month</span>
            </div>
            <Button className="w-full mb-8 bg-white/10 hover:bg-white/20 text-white rounded-full">Get Started</Button>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  {feature.free ? (
                    <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  ) : (
                    <X className="h-5 w-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="text-white">{feature.name}</p>
                    <p className="text-white/60 text-sm">{feature.free ? feature.free : "Not Available"}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Paid Plan */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-violet-900/40 to-purple-900/40 backdrop-blur-md rounded-xl p-6 border border-violet-500/30 relative overflow-hidden hover:shadow-xl hover:shadow-violet-900/30 transition-all duration-300"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-violet-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl"></div>

            <div className="absolute top-0 right-0 bg-gradient-to-r from-violet-600 to-purple-800 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              RECOMMENDED
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
            <p className="text-white/70 mb-4">For serious researchers</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$29</span>
              <span className="text-white/70">/month</span>
            </div>
            <Button className="w-full mb-8 bg-gradient-to-r from-violet-600 to-purple-800 hover:from-violet-700 hover:to-purple-900 border-0 rounded-full">
              Get Started
            </Button>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white">{feature.name}</p>
                    <p className="text-white/60 text-sm">{feature.paid}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
