"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, AlertCircle, CheckCircle, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface StudyFormModalProps {
  isOpen: boolean
  onClose: () => void
  studyTitle: string
  studyDescription: string
}

export function StudyFormModal({ isOpen, onClose, studyTitle, studyDescription }: StudyFormModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    ageGroup: "",
    interests: {
      technology: false,
      education: false,
      healthcare: false,
      environment: false,
    },
    experience: "",
  })

  const [aiAnalytics, setAiAnalytics] = useState({
    wordCount: 0,
    aiScore: 0,
    uniqueness: 85,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Update AI analytics for text area
    if (name === "experience") {
      const words = value.trim().split(/\s+/).length
      const aiScore = Math.min(Math.floor(words * 1.5), 100)

      setAiAnalytics({
        wordCount: words,
        aiScore: value.length > 0 ? aiScore : 0,
        uniqueness: value.length > 0 ? Math.max(100 - aiScore, 0) : 85,
      })
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData({
      ...formData,
      interests: {
        ...formData.interests,
        [name]: checked,
      },
    })
  }

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, ageGroup: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted:", formData)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative w-full max-w-4xl bg-black border border-violet-900/30 rounded-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-violet-900/10 pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Form Section (2/3 width) */}
              <div className="md:col-span-2 p-6">
                <h2 className="text-2xl font-bold text-white mb-2">{studyTitle}</h2>
                <p className="text-white/70 mb-6">{studyDescription}</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-white mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/60 border border-violet-900/30 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/60 border border-violet-900/30 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <p className="block text-white mb-2">
                      Age Group <span className="text-red-500">*</span>
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {["18-24", "25-34", "35-44", "45+"].map((age) => (
                        <div key={age} className="flex items-center">
                          <input
                            type="radio"
                            id={age}
                            name="ageGroup"
                            value={age}
                            checked={formData.ageGroup === age}
                            onChange={handleRadioChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-violet-900/30 bg-black/60"
                          />
                          <label htmlFor={age} className="ml-2 text-white/70">
                            {age}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="block text-white mb-2">Research Interests</p>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { id: "technology", label: "Technology" },
                        { id: "education", label: "Education" },
                        { id: "healthcare", label: "Healthcare" },
                        { id: "environment", label: "Environment" },
                      ].map((interest) => (
                        <div key={interest.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={interest.id}
                            name={interest.id}
                            checked={formData.interests[interest.id as keyof typeof formData.interests]}
                            onChange={handleCheckboxChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-violet-900/30 bg-black/60"
                          />
                          <label htmlFor={interest.id} className="ml-2 text-white/70">
                            {interest.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="experience" className="block text-white mb-2">
                      Previous Research Experience
                    </label>
                    <textarea
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full bg-black/60 border border-violet-900/30 rounded-lg p-3 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      placeholder="Please describe your previous experience with research studies..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-violet-800 hover:opacity-90 text-white rounded-full px-8"
                    >
                      Submit Response
                    </Button>
                  </div>
                </form>
              </div>

              {/* Analytics Section (1/3 width) */}
              <motion.div
                className="bg-black/80 p-6 border-l border-violet-900/30"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white flex items-center mb-4">
                    <BarChart2 className="mr-2 h-5 w-5 text-blue-400" />
                    Response Analytics
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-white/70 text-sm">Word Count</span>
                        <span className="text-white text-sm font-medium">{aiAnalytics.wordCount}</span>
                      </div>
                      <Progress value={Math.min(aiAnalytics.wordCount / 2, 100)} className="h-2 bg-blue-950/50" />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-white/70 text-sm">AI Content Detection</span>
                        <span className="text-white text-sm font-medium">{aiAnalytics.aiScore}%</span>
                      </div>
                      <Progress
                        value={aiAnalytics.aiScore}
                        className={`h-2 bg-blue-950/50 ${aiAnalytics.aiScore > 70 ? "bg-red-500" : "bg-yellow-500"}`}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-white/70 text-sm">Uniqueness Score</span>
                        <span className="text-white text-sm font-medium">{aiAnalytics.uniqueness}%</span>
                      </div>
                      <Progress
                        value={aiAnalytics.uniqueness}
                        className={`h-2 bg-blue-950/50 ${aiAnalytics.uniqueness > 70 ? "bg-green-500" : "bg-yellow-500"}`}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-900/30">
                  <h4 className="text-white font-medium mb-2 flex items-center">
                    <AlertCircle className="h-4 w-4 text-blue-400 mr-2" />
                    AI Content Guidelines
                  </h4>
                  <p className="text-white/70 text-sm">
                    Our system analyzes your responses for AI-generated content. For the most accurate results:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-white/70">
                    <li className="flex items-start">
                      <CheckCircle className="h-3 w-3 text-green-400 mr-1 mt-1 flex-shrink-0" />
                      <span>Provide detailed, personal experiences</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-3 w-3 text-green-400 mr-1 mt-1 flex-shrink-0" />
                      <span>Use your own voice and writing style</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-3 w-3 text-green-400 mr-1 mt-1 flex-shrink-0" />
                      <span>Include specific examples when possible</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
