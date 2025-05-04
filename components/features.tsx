"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Shield, Database, BarChart3, Users, Zap, Award, BellRing, Filter, Coins } from "lucide-react"
import Link from "next/link"

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "AI Spam Detection",
      description: "Advanced multi-model AI filtering ensures high-quality responses and eliminates spam submissions.",
      isPaid: true,
      color: "from-violet-600 to-purple-800",
    },
    {
      icon: <BellRing className="h-6 w-6" />,
      title: "Custom Notifications",
      description: "Set personalized notification schedules to alert participants about new studies and deadlines.",
      isPaid: true,
      color: "from-purple-600 to-pink-700",
    },
    {
      icon: <Coins className="h-6 w-6" />,
      title: "Mini Token Rewards",
      description: "Incentivize participants with token rewards that can be redeemed for various benefits.",
      isPaid: false,
      color: "from-amber-500 to-orange-700",
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "AI Data Analysis",
      description: "Get AI-generated insights and trends from your research data with visual reports.",
      isPaid: true,
      color: "from-blue-600 to-violet-800",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Participant Retargeting",
      description: "Easily reconnect with engaged participants for follow-up studies and longitudinal research.",
      isPaid: true,
      color: "from-green-600 to-teal-700",
    },
    {
      icon: <Filter className="h-6 w-6" />,
      title: "Advanced Filtering",
      description: "Target specific demographics with precise eligibility criteria for more relevant data.",
      isPaid: true,
      color: "from-violet-600 to-indigo-800",
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Secure Data Storage",
      description: "All research data is encrypted and stored securely with controlled access permissions.",
      isPaid: false,
      color: "from-red-600 to-rose-800",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-time Analytics",
      description: "Monitor study progress and participant engagement as responses come in.",
      isPaid: false,
      color: "from-cyan-500 to-blue-700",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Verified Participants",
      description: "All participants are verified through multiple authentication methods to ensure quality.",
      isPaid: false,
      color: "from-emerald-500 to-green-700",
    },
  ]

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-violet-900/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-20 w-80 h-80 bg-purple-900/10 rounded-full filter blur-3xl"></div>

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
            POWERFUL CAPABILITIES
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Platform Features</h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            VeriBee offers a comprehensive set of features to streamline your research process and ensure high-quality
            data collection.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-black/60 backdrop-blur-md rounded-xl overflow-hidden relative group"
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              {/* Top gradient border */}
              <div className={`h-1 w-full bg-gradient-to-r ${feature.color}`}></div>

              {/* Content */}
              <div className="p-6 border-x border-b border-violet-900/30">
                {/* Background glow effect */}
                <div
                  className={`absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br ${feature.color} rounded-full filter blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                {/* Paid badge */}
                {feature.isPaid && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 bg-gradient-to-r from-violet-600 to-purple-800 rounded-full text-xs font-semibold text-white shadow-lg shadow-violet-900/20">
                    Premium
                  </div>
                )}

                <div className="relative z-10">
                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-5 shadow-lg shadow-violet-900/20 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                    {feature.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-violet-900/20 flex justify-between items-center">
                    <span className="text-xs text-violet-400 font-medium">
                      {feature.isPaid ? "Premium Feature" : "Free Feature"}
                    </span>
                    <motion.div
                      className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-violet-400 cursor-pointer"
                      whileHover={{ scale: 1.2, backgroundColor: "rgba(139, 92, 246, 0.3)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-white/70 max-w-2xl mx-auto text-lg mb-6">
            Want to learn more about our features? Check out our detailed documentation.
          </p>
          <motion.a
            href="#docs"
            className="inline-block px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-800 hover:from-violet-700 hover:to-purple-900 text-white rounded-full font-medium transition-all duration-200 hover:shadow-lg hover:shadow-violet-600/20"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="https://veribee.gitbook.io/veribee" className="flex items-center">
            View Documentation
            </Link>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
