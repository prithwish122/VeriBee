"use client"

import { useState, useEffect, SetStateAction } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { FloatingElements } from "@/components/floating-elements"
import { motion } from "framer-motion"
import { CheckCircle, ChevronRight, Lock, Plus, X, Save, Eye, EyeOff, PenLine, Users, Target, Calendar, AlertCircle, FileText, ArrowDown, Copy, Upload } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ResearcherPage() {
  const [loading, setLoading] = useState(true)
  const [showPremiumPopup, setShowPremiumPopup] = useState(false)
  const [premiumFeature, setPremiumFeature] = useState("")
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showFormBuilder, setShowFormBuilder] = useState(false)
  const [formFields, setFormFields] = useState([
    { id: 1, type: "text", label: "Full Name", required: true, placeholder: "Enter your full name" },
    { id: 2, type: "email", label: "Email Address", required: true, placeholder: "your@email.com" },
    { id: 3, type: "radio", label: "Age Group", required: true, options: ["18-24", "25-34", "35-44", "45+"] },
    { id: 4, type: "checkbox", label: "Research Interests", required: false, options: ["Technology", "Healthcare", "Education", "Environment"] },
    { id: 5, type: "textarea", label: "Previous Research Experience", required: false, placeholder: "Please describe your previous experience with research studies..." }
  ])
  const [formSettings, setFormSettings] = useState({
    title: "Technology Usage Research Study",
    description: "This study aims to understand technology usage patterns across different age groups and demographics.",
    aiFiltering: true,
    tokenReward: 25,
    eligibility: {
      location: "United States",
      minAge: 18,
      maxParticipants: 500
    },
    notifications: {
      onSubmission: true,
      onRejection: true,
      reminders: true
    }
  })
  const [formPreview, setFormPreview] = useState(false)
  const [responses, setResponses] = useState([
    { id: 1, name: "Alex Johnson", email: "alex@example.com", quality: "High", status: "Approved", date: "Apr 8, 2025", reward: 25 },
    { id: 2, name: "Taylor Smith", email: "taylor@example.com", quality: "Medium", status: "Pending", date: "Apr 8, 2025", reward: 0 },
    { id: 3, name: "Jordan Lee", email: "jordan@example.com", quality: "Low", status: "Rejected", date: "Apr 7, 2025", reward: 0 },
    { id: 4, name: "Casey Williams", email: "casey@example.com", quality: "High", status: "Approved", date: "Apr 7, 2025", reward: 30 }
  ])
  const [activeForm, setActiveForm] = useState(null)
  const [savedForms, setSavedForms] = useState([
    { id: 1, title: "Technology Usage Research Study", responses: 4, created: "Apr 5, 2025", status: "Active" },
    { id: 2, title: "Healthcare Access Survey", responses: 12, created: "Mar 28, 2025", status: "Closed" }
  ])
  const [newFieldType, setNewFieldType] = useState("text")
  const [tokenBalance, setTokenBalance] = useState(2500)
  const [notificationCount, setNotificationCount] = useState(3)
  const [analyticsData, setAnalyticsData] = useState({
    responseRate: 78,
    completionTime: 8.5,
    qualityScore: 4.2,
    participantDemographics: {
      age: [25, 42, 18, 15],
      gender: [55, 40, 5],
      location: [65, 18, 12, 5]
    }
  })

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handlePremiumFeatureClick = (feature) => {
    setPremiumFeature(feature)
    setShowPremiumPopup(true)
  }

  const addNewField = () => {
    const newId = formFields.length > 0 ? Math.max(...formFields.map(field => field.id)) + 1 : 1
    let newField = { id: newId, required: false }

    switch(newFieldType) {
      case "text":
        newField = {...newField, type: "text", label: "New Text Field", placeholder: "Enter text..." }
        break
      case "email":
        newField = {...newField, type: "email", label: "Email Address", placeholder: "user@example.com" }
        break
      case "number":
        newField = {...newField, type: "number", label: "Numeric Input", placeholder: "Enter a number" }
        break
      case "radio":
        newField = {...newField, type: "radio", label: "Multiple Choice", options: ["Option 1", "Option 2", "Option 3"] }
        break
      case "checkbox":
        newField = {...newField, type: "checkbox", label: "Checkboxes", options: ["Option 1", "Option 2", "Option 3"] }
        break
      case "textarea":
        newField = {...newField, type: "textarea", label: "Long Answer", placeholder: "Enter your response..." }
        break
      case "select":
        newField = {...newField, type: "select", label: "Dropdown", options: ["Option 1", "Option 2", "Option 3"] }
        break
    }

    setFormFields([...formFields, newField])
  }

  const removeField = (id) => {
    setFormFields(formFields.filter(field => field.id !== id))
  }

  const updateField = (id, updates) => {
    setFormFields(formFields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ))
  }

  const saveForm = () => {
    const newForm = {
      id: activeForm ? activeForm.id : savedForms.length + 1,
      title: formSettings.title,
      responses: activeForm ? activeForm.responses : 0,
      created: activeForm ? activeForm.created : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: "Active"
    }
    
    if (activeForm) {
      setSavedForms(savedForms.map(form => form.id === activeForm.id ? newForm : form))
    } else {
      setSavedForms([...savedForms, newForm])
    }
    
    setShowFormBuilder(false)
    setActiveForm(null)
    
    // Show success notification
    alert("Form saved successfully!")
  }

  const editForm = (form) => {
    setActiveForm(form)
    setShowFormBuilder(true)
  }

  if (loading) {
    return <LoadingScreen text="Loading Researcher Dashboard" />
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

        <main className="pt-28 pb-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-purple-800 mr-4 flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-white">Researcher Dashboard</h1>
                    <p className="text-white/70">Welcome back, Dr. Smith</p>
                  </div>
                </div>
              </motion.div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-white/70 text-sm">Token Balance</p>
                  <p className="text-white font-bold">{tokenBalance} <span className="text-violet-400">tokens</span></p>
                </div>
                <div className="relative">
                  <Button variant="outline" className="border-violet-600 text-violet-400 hover:bg-violet-900/20 rounded-full relative">
                    Notifications
                    {notificationCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {notificationCount}
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Tabs Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="bg-black/40 backdrop-blur-md border border-violet-900/20 rounded-lg p-1 shadow-lg shadow-violet-900/10">
                <TabsTrigger 
                  value="dashboard" 
                  className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-purple-800 data-[state=active]:text-white transition-all duration-300"
                >
                  Dashboard
                </TabsTrigger>
                <TabsTrigger 
                  value="forms" 
                  className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-purple-800 data-[state=active]:text-white transition-all duration-300"
                >
                  Research Forms
                </TabsTrigger>
                <TabsTrigger 
                  value="responses" 
                  className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-purple-800 data-[state=active]:text-white transition-all duration-300"
                >
                  Responses
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics" 
                  className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-purple-800 data-[state=active]:text-white transition-all duration-300"
                >
                  Analytics
                </TabsTrigger>
              </TabsList>
            
              {/* Dashboard Tab Content */}
              <TabsContent value="dashboard" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <DashboardCard
                    title="Create & Manage Research Forms"
                    description="Design custom digital forms for your research studies."
                    icon="📝"
                    features={[
                      "Upload Digital Forms",
                      "Set Eligibility Filters (Location, Age, Demographics)",
                      "Configure Incentives (Mini Tokens)",
                    ]}
                    cta="Create New Form"
                    ctaAction={() => {
                      setActiveForm(null)
                      setShowFormBuilder(true)
                    }}
                  />

                  <DashboardCard
                    title="AI Spam Filtering"
                    description="Configure AI filtering to ensure high-quality responses."
                    icon="🤖"
                    features={[
                      "Basic Single-Model Filtering (Free)",
                      "Multi-Model Advanced Filtering (Premium)",
                      "Automatic Response Validation",
                    ]}
                    cta="Configure Filtering"
                    ctaAction={() => handlePremiumFeatureClick("Multi-Model AI Spam Filtering")}
                    isPremium
                  />

                  <DashboardCard
                    title="Response Analytics"
                    description="View and analyze the data collected from your studies."
                    icon="📊"
                    features={[
                      "View Summarized Data & Trends",
                      "Run AI-Based Hypothesis Testing (Premium)",
                      "Export Cleaned Data",
                    ]}
                    cta="View Analytics"
                    ctaAction={() => setActiveTab("analytics")}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <DashboardCard
                    title="Notification Settings"
                    description="Configure when and how participants are notified about your studies."
                    icon="🔔"
                    features={[
                      "Set Custom Notification Timing (Premium)",
                      "Target Specific Participant Groups (Premium)",
                      "Schedule Reminders for Incomplete Responses",
                    ]}
                    cta="Configure Notifications"
                    ctaAction={() => handlePremiumFeatureClick("Custom Notification Settings")}
                    isPremium
                    isWide
                  />

                  <DashboardCard
                    title="Token Management"
                    description="Allocate and manage token rewards for study participants."
                    icon="💰"
                    features={[
                      "Set Token Rewards for Studies",
                      "Bonus Rewards for Quality Responses",
                      "Track Token Distribution",
                    ]}
                    cta="Manage Tokens"
                    ctaAction={() => {}}
                    isWide
                  />
                </div>
              </TabsContent>
              
              {/* Forms Tab Content */}
              <TabsContent value="forms" className="mt-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Your Research Forms</h2>
                  <Button 
                    className="bg-gradient-to-r from-violet-600 to-purple-800 hover:opacity-90 text-white rounded-full"
                    onClick={() => {
                      setActiveForm(null)
                      setShowFormBuilder(true)
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Create New Form
                  </Button>
                </div>
                
                <div className="bg-black/60 backdrop-blur-md rounded-xl border border-violet-900/30 overflow-hidden">
                  <div className="grid grid-cols-12 p-4 border-b border-violet-900/30 text-white/70 text-sm font-medium">
                    <div className="col-span-5">Form Title</div>
                    <div className="col-span-2 text-center">Responses</div>
                    <div className="col-span-2">Created</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-1"></div>
                  </div>
                  
                  {savedForms.map((form) => (
                    <div key={form.id} className="grid grid-cols-12 p-4 border-b border-violet-900/20 text-white hover:bg-violet-900/10 transition-colors">
                      <div className="col-span-5 font-medium flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-violet-400" />
                        {form.title}
                      </div>
                      <div className="col-span-2 text-center">{form.responses}</div>
                      <div className="col-span-2 text-white/70">{form.created}</div>
                      <div className="col-span-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          form.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                        }`}>
                          {form.status}
                        </span>
                      </div>
                      <div className="col-span-1 flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 rounded-full hover:bg-violet-900/20 text-violet-400"
                          onClick={() => editForm(form)}
                        >
                          <PenLine className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 rounded-full hover:bg-violet-900/20 text-violet-400"
                          onClick={() => {
                            // Clone form functionality
                            const newForm = {
                              ...form,
                              id: savedForms.length + 1,
                              title: `${form.title} (Copy)`,
                              responses: 0,
                              created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                              status: "Draft"
                            }
                            setSavedForms([...savedForms, newForm])
                          }}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {savedForms.length === 0 && (
                    <div className="p-8 text-center text-white/50">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">No forms created yet</p>
                      <p className="text-sm mt-2">Create your first research form to start collecting data</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              {/* Responses Tab Content */}
              <TabsContent value="responses" className="mt-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Study Responses</h2>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px] bg-black/60 border-violet-900/30 text-white">
                      <SelectValue placeholder="Filter by form" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-violet-900/30 text-white">
                      <SelectItem value="all">All Forms</SelectItem>
                      <SelectItem value="tech">Technology Usage Study</SelectItem>
                      <SelectItem value="health">Healthcare Access Survey</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="bg-black/60 backdrop-blur-md rounded-xl border border-violet-900/30 overflow-hidden">
                  <div className="grid grid-cols-12 p-4 border-b border-violet-900/30 text-white/70 text-sm font-medium">
                    <div className="col-span-3">Participant</div>
                    <div className="col-span-3">Email</div>
                    <div className="col-span-2">Quality</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-1">Date</div>
                    <div className="col-span-1 text-right">Reward</div>
                  </div>
                  
                  {responses.map((response) => (
                    <div key={response.id} className="grid grid-cols-12 p-4 border-b border-violet-900/20 text-white hover:bg-violet-900/10 transition-colors">
                      <div className="col-span-3 font-medium">{response.name}</div>
                      <div className="col-span-3 text-white/70">{response.email}</div>
                      <div className="col-span-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          response.quality === "High" ? "bg-green-500/20 text-green-400" : 
                          response.quality === "Medium" ? "bg-yellow-500/20 text-yellow-400" : 
                          "bg-red-500/20 text-red-400"
                        }`}>
                          {response.quality}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          response.status === "Approved" ? "bg-green-500/20 text-green-400" : 
                          response.status === "Pending" ? "bg-blue-500/20 text-blue-400" : 
                          "bg-red-500/20 text-red-400"
                        }`}>
                          {response.status}
                        </span>
                      </div>
                      <div className="col-span-1 text-white/70">{response.date}</div>
                      <div className="col-span-1 text-right font-medium text-violet-400">{response.reward > 0 ? `${response.reward} tokens` : "-"}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              {/* Analytics Tab Content */}
              <TabsContent value="analytics" className="mt-6">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Response Analytics</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-black/60 backdrop-blur-md rounded-xl p-6 border border-violet-900/30">
                      <h3 className="text-lg text-white/70 mb-2">Response Rate</h3>
                      <div className="flex items-end space-x-2">
                        <p className="text-3xl font-bold text-white">{analyticsData.responseRate}%</p>
                        <p className="text-green-400 text-sm">↑ 12%</p>
                      </div>
                      <div className="mt-4 h-2 bg-violet-900/30 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-violet-600 to-purple-800" 
                          style={{ width: `${analyticsData.responseRate}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="bg-black/60 backdrop-blur-md rounded-xl p-6 border border-violet-900/30">
                      <h3 className="text-lg text-white/70 mb-2">Avg. Completion Time</h3>
                      <div className="flex items-end space-x-2">
                        <p className="text-3xl font-bold text-white">{analyticsData.completionTime} min</p>
                        <p className="text-green-400 text-sm">↓ 0.8 min</p>
                      </div>
                      <div className="mt-4 flex items-center space-x-1">
                        <div className="h-2 w-1/5 bg-green-500/50 rounded-l-full"></div>
                        <div className="h-2 w-2/5 bg-green-500/30"></div>
                        <div className="h-2 w-1/5 bg-violet-600/50"></div>
                        <div className="h-2 w-1/5 bg-violet-600/30 rounded-r-full"></div>
                      </div>
                    </div>
                    
                    <div className="bg-black/60 backdrop-blur-md rounded-xl p-6 border border-violet-900/30">
                      <h3 className="text-lg text-white/70 mb-2">Quality Score</h3>
                      <div className="flex items-end space-x-2">
                        <p className="text-3xl font-bold text-white">{analyticsData.qualityScore}/5</p>
                        <p className="text-green-400 text-sm">↑ 0.3</p>
                      </div>
                      <div className="mt-4 flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <div 
                            key={star} 
                            className={`h-2 flex-1 rounded-full ${
                              star <= Math.floor(analyticsData.qualityScore) 
                                ? "bg-violet-600" 
                                : star === Math.ceil(analyticsData.qualityScore) && star > Math.floor(analyticsData.qualityScore)
                                  ? "bg-gradient-to-r from-violet-600 to-violet-900/30"
                                  : "bg-violet-900/30"
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/60 backdrop-blur-md rounded-xl p-6 border border-violet-900/30 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">Participant Demographics</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div>
                        <h4 className="text-white mb-2">Age Distribution</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-white/70">18-24</span>
                            <div className="w-3/4 bg-violet-900/30 rounded-full h-4 overflow-hidden">
                              <div className="bg-violet-600 h-full" style={{ width: `${analyticsData.participantDemographics.age[0]}%` }}></div>
                            </div>
                            <span className="text-white/70">{analyticsData.participantDemographics.age[0]}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white/70">25-34</span>
                            <div className="w-3/4 bg-violet-900/30 rounded-full h-4 overflow-hidden">
                              <div className="bg-violet-600 h-full" style={{ width: `${analyticsData.participantDemographics.age[1]}%` }}></div>
                            </div>
                            <span className="text-white/70">{analyticsData.participantDemographics.age[1]}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white/70">35-44</span>
                            <div className="w-3/4 bg-violet-900/30 rounded-full h-4 overflow-hidden">
                              <div className="bg-violet-600 h-full" style={{ width: `${analyticsData.participantDemographics.age[2]}%` }}></div>
                            </div>
                            <span className="text-white/70">{analyticsData.participantDemographics.age[2]}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white/70">45+</span>
                            <div className="w-3/4 bg-violet-900/30 rounded-full h-4 overflow-hidden">
                              <div className="bg-violet-600 h-full" style={{ width: `${analyticsData.participantDemographics.age[3]}%` }}></div>
                            </div>
                            <span className="text-white/70">{analyticsData.participantDemographics.age[3]}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-white mb-2">Gender Distribution</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-white/70">Female</span>
                            <div className="w-3/4 bg-violet-900/30 rounded-full h-4 overflow-hidden">
                              <div className="bg-purple-600 h-full" style={{ width: `${analyticsData.participantDemographics.gender[0]}%` }}></div>
                            </div>
                            <span className="text-white/70">{analyticsData.participantDemographics.gender[0]}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white/70">Male</span>
                            <div className="w-3/4 bg-violet-900/30 rounded-full h-4 overflow-hidden">
                              <div className="bg-purple-600 h-full" style={{ width: `${analyticsData.participantDemographics.gender[1]}%` }}></div>
                            </div>
                            <span className="text-white/70">{analyticsData.participantDemographics.gender[1]}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white/70">Other</span>
                            <div className="w-3/4 bg-violet-900/30 rounded-full h-4 overflow-hidden">
                              <div className="bg-purple-600 h-full" style={{ width: `${analyticsData.participantDemographics.gender[2]}%` }}></div>
                            </div>
                            <span className="text-white/70">{analyticsData.participantDemographics.gender[2]}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-white mb-2">Location Distribution</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-white/70">Urban</span>
                            <div className="w-3/4 bg-violet-900/30 rounded-full h-4 overflow-hidden">
                              <div className="bg-indigo-600 h-full" style={{ width: `${analyticsData.participantDemographics.location[0]}%` }}></div>
                            </div>
                            <span className="text-white/70">{analyticsData.participantDemographics.location[0]}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white/70">Suburban</span>
                            <div className="w-3/4 bg-violet-900/30 rounded-full h-4 overflow-hidden">
                              <div className="bg-indigo-600 h-full" style={{ width: `${analyticsData.participantDemographics.location[1]}%` }}></div>
                            </div>
                            <span className="text-white/70">{analyticsData.participantDemographics.location[1]}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white/70">Rural</span>
                            <div className="w-3/4 bg-violet-900/30 rounded-full h-4 overflow-hidden">
                              <div className="bg-indigo-600 h-full" style={{ width: `${analyticsData.participantDemographics.location[2]}%` }}></div>
                            </div>
                            <span className="text-white/70">{analyticsData.participantDemographics.location[2]}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-white/70">International</span>
                            <div className="w-3/4 bg-violet-900/30 rounded-full h-4 overflow-hidden">
                              <div className="bg-indigo-600 h-full" style={{ width: `${analyticsData.participantDemographics.location[3]}%` }}></div>
                            </div>
                            <span className="text-white/70">{analyticsData.participantDemographics.location[3]}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/60 backdrop-blur-md rounded-xl p-6 border border-violet-900/30">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-white">Advanced Analytics</h3>
                      <Button 
                        className="bg-gradient-to-r from-violet-600 to-purple-800 hover:opacity-90 text-white rounded-full"
                        onClick={() => handlePremiumFeatureClick("Advanced Analytics")}
                      >
                        <Lock className="mr-2 h-4 w-4" /> Unlock Premium Analytics
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-violet-900/20">
                        <h4 className="text-white mb-2">Response Correlation Analysis</h4>
                        <p className="text-white/70 mb-4">Discover relationships between participant demographics and response patterns.</p>
                        <div className="w-full h-32 flex items-center justify-center border border-violet-900/20 rounded-lg">
                          <Lock className="h-8 w-8 text-violet-500/50" />
                        </div>
                      </div>
                      <div className="bg-black/40 backdrop-blur-md rounded-xl p-6 border border-violet-900/20">
                        <h4 className="text-white mb-2">AI-Generated Insights</h4>
                        <p className="text-white/70 mb-4">Automatic analysis of open-ended responses and pattern detection.</p>
                        <div className="w-full h-32 flex items-center justify-center border border-violet-900/20 rounded-lg">
                          <Lock className="h-8 w-8 text-violet-500/50" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <Footer />
      </div>

      {/* Form Builder Modal */}
      {showFormBuilder && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="bg-black/90 rounded-xl border border-violet-900/30 w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 z-10 bg-black/90 border-b border-violet-900/30 p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                {activeForm ? "Edit Research Form" : "Create New Research Form"}
              </h2>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  className="border-violet-600 text-violet-400 hover:bg-violet-900/20" 
                  onClick={() => setFormPreview(!formPreview)}
                >
                  {formPreview ? (
                    <><PenLine className="mr-2 h-4 w-4" /> Edit Form</>
                  ) : (
                    <><Eye className="mr-2 h-4 w-4" /> Preview Form</>
                  )}
                </Button>
                <Button 
                  className="bg-gradient-to-r from-violet-600 to-purple-800 hover:opacity-90 text-white"
                  onClick={saveForm}
                >
                  <Save className="mr-2 h-4 w-4" /> Save Form
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-violet-900/20 text-white/70" 
                  onClick={() => setShowFormBuilder(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {formPreview ? (
              <div className="p-6">
                <div className="bg-black/60 backdrop-blur-md rounded-xl border border-violet-900/30 p-6 mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">{formSettings.title}</h2>
                  <p className="text-white/70 mb-6">{formSettings.description}</p>
                  
                  <form className="space-y-6">
                    {formFields.map((field) => (
                      <div key={field.id} className="space-y-2">
                        <Label 
                          htmlFor={`field-${field.id}`} 
                          className="text-white font-medium flex items-center"
                        >
                          {field.label}
                          {field.required && <span className="ml-1 text-red-500">*</span>}
                        </Label>
                        
                        {field.type === "text" && (
                          <Input 
                            id={`field-${field.id}`} 
                            placeholder={field.placeholder} 
                            className="bg-black/60 border-violet-900/30 text-white"
                          />
                        )}
                        
                        {field.type === "email" && (
                          <Input 
                            id={`field-${field.id}`} 
                            type="email" 
                            placeholder={field.placeholder} 
                            className="bg-black/60 border-violet-900/30 text-white"
                          />
                        )}
                        
                        {field.type === "textarea" && (
                          <Textarea 
                            id={`field-${field.id}`} 
                            placeholder={field.placeholder} 
                            className="bg-black/60 border-violet-900/30 text-white min-h-24"
                          />
                        )}
                        
                        {field.type === "radio" && field.options && (
                          <RadioGroup id={`field-${field.id}`} className="grid grid-cols-2 gap-4">
                            {field.options.map((option, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <RadioGroupItem id={`${field.id}-${idx}`} value={option} className="text-violet-500" />
                                <Label htmlFor={`${field.id}-${idx}`} className="text-white">
                                  {option}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        )}
                        
                        {field.type === "checkbox" && field.options && (
                          <div className="grid grid-cols-2 gap-4">
                            {field.options.map((option, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <Checkbox id={`${field.id}-${idx}`} className="text-violet-500" />
                                <Label htmlFor={`${field.id}-${idx}`} className="text-white">
                                  {option}
                                </Label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    
                    <div className="pt-4">
                      <Button 
                        className="bg-gradient-to-r from-violet-600 to-purple-800 hover:opacity-90 text-white"
                      >
                        Submit Response
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-6">
                    <div className="bg-black/60 backdrop-blur-md rounded-xl border border-violet-900/30 p-6">
                      <h3 className="text-lg font-medium text-white mb-4">Form Builder</h3>
                      
                      <div className="space-y-4 mb-6">
                        <div>
                          <Label htmlFor="form-title" className="text-white mb-1 block">Form Title</Label>
                          <Input 
                            id="form-title" 
                            value={formSettings.title} 
                            onChange={(e) => setFormSettings({...formSettings, title: e.target.value})}
                            className="bg-black/60 border-violet-900/30 text-white"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="form-description" className="text-white mb-1 block">Description</Label>
                          <Textarea 
                            id="form-description" 
                            value={formSettings.description} 
                            onChange={(e) => setFormSettings({...formSettings, description: e.target.value})}
                            className="bg-black/60 border-violet-900/30 text-white min-h-16"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-6">
                        <h4 className="text-white font-medium">Form Fields</h4>
                        
                        {formFields.map((field, index) => (
                          <div 
                            key={field.id} 
                            className="bg-black/80 rounded-lg border border-violet-900/30 p-4 relative"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs">
                                  {index + 1}
                                </div>
                                <Input 
                                  value={field.label}
                                  onChange={(e) => updateField(field.id, { label: e.target.value })}
                                  className="bg-transparent border-0 border-b border-violet-900/30 text-white text-lg font-medium px-0 focus-visible:ring-0 focus-visible:border-violet-600"
                                />
                              </div>
                              <div className="flex space-x-2">
                                <div className="flex items-center">
                                  <Switch 
                                    id={`required-${field.id}`}
                                    checked={field.required}
                                    onCheckedChange={(checked) => updateField(field.id, { required: checked })}
                                    className="data-[state=checked]:bg-violet-600"
                                  />
                                  <Label htmlFor={`required-${field.id}`} className="ml-2 text-white/70 text-sm">Required</Label>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0 rounded-full hover:bg-red-900/20 text-red-400"
                                  onClick={() => removeField(field.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor={`field-type-${field.id}`} className="text-white/70 text-sm">Field Type</Label>
                                <Select 
                                  value={field.type} 
                                  onValueChange={(value) => updateField(field.id, { type: value })}
                                >
                                  <SelectTrigger className="bg-black/60 border-violet-900/30 text-white">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-black/90 border-violet-900/30 text-white">
                                    <SelectItem value="text">Text Field</SelectItem>
                                    <SelectItem value="email">Email Field</SelectItem>
                                    <SelectItem value="number">Number Field</SelectItem>
                                    <SelectItem value="textarea">Long Text</SelectItem>
                                    <SelectItem value="radio">Multiple Choice</SelectItem>
                                    <SelectItem value="checkbox">Checkboxes</SelectItem>
                                    <SelectItem value="select">Dropdown</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              {(field.type === "text" || field.type === "email" || field.type === "number" || field.type === "textarea") && (
                                <div>
                                  <Label htmlFor={`placeholder-${field.id}`} className="text-white/70 text-sm">Placeholder</Label>
                                  <Input 
                                    id={`placeholder-${field.id}`}
                                    value={field.placeholder || ""}
                                    onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                                    className="bg-black/60 border-violet-900/30 text-white"
                                  />
                                </div>
                              )}
                              
                              {(field.type === "radio" || field.type === "checkbox" || field.type === "select") && (
                                <div>
                                  <Label htmlFor={`options-${field.id}`} className="text-white/70 text-sm">Options (comma separated)</Label>
                                  <Input 
                                    id={`options-${field.id}`}
                                    value={field.options ? field.options.join(", ") : ""}
                                    onChange={(e) => updateField(field.id, { options: e.target.value.split(",").map(opt => opt.trim()) })}
                                    className="bg-black/60 border-violet-900/30 text-white"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                        
                        <div className="mt-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Select 
                              value={newFieldType} 
                              onValueChange={setNewFieldType}
                            >
                              <SelectTrigger className="bg-black/60 border-violet-900/30 text-white w-40">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-black/90 border-violet-900/30 text-white">
                                <SelectItem value="text">Text Field</SelectItem>
                                <SelectItem value="email">Email Field</SelectItem>
                                <SelectItem value="number">Number Field</SelectItem>
                                <SelectItem value="textarea">Long Text</SelectItem>
                                <SelectItem value="radio">Multiple Choice</SelectItem>
                                <SelectItem value="checkbox">Checkboxes</SelectItem>
                                <SelectItem value="select">Dropdown</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Button 
                              variant="outline" 
                              className="border-violet-600 text-violet-400 hover:bg-violet-900/20"
                              onClick={addNewField}
                            >
                              <Plus className="mr-2 h-4 w-4" /> Add Field
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-black/60 backdrop-blur-md rounded-xl border border-violet-900/30 p-6">
                      <h3 className="text-lg font-medium text-white mb-4">Form Settings</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-white/70 mb-2 flex items-center">
                            <Target className="h-4 w-4 mr-2" /> Eligibility
                          </h4>
                          
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="location" className="text-white/70 text-sm">Location</Label>
                              <Select 
                                value={formSettings.eligibility.location}
                                onValueChange={(val) => setFormSettings({
                                  ...formSettings, 
                                  eligibility: {...formSettings.eligibility, location: val}
                                })}
                              >
                                <SelectTrigger className="bg-black/60 border-violet-900/30 text-white">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-black/90 border-violet-900/30 text-white">
                                  <SelectItem value="United States">United States</SelectItem>
                                  <SelectItem value="Europe">Europe</SelectItem>
                                  <SelectItem value="Asia">Asia</SelectItem>
                                  <SelectItem value="Global">Global</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <Label className="text-white/70 text-sm">Minimum Age</Label>
                              <Input 
                                type="number" 
                                value={formSettings.eligibility.minAge}
                                onChange={(e) => setFormSettings({
                                  ...formSettings, 
                                  eligibility: {...formSettings.eligibility, minAge: parseInt(e.target.value)}
                                })}
                                className="bg-black/60 border-violet-900/30 text-white"
                                min="0"
                              />
                            </div>
                            
                            <div>
                              <Label className="text-white/70 text-sm">Maximum Participants</Label>
                              <Input 
                                type="number" 
                                value={formSettings.eligibility.maxParticipants}
                                onChange={(e) => setFormSettings({
                                  ...formSettings, 
                                  eligibility: {...formSettings.eligibility, maxParticipants: parseInt(e.target.value)}
                                })}
                                className="bg-black/60 border-violet-900/30 text-white"
                                min="1"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-white/70 mb-2 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-2" /> AI Quality Control
                          </h4>
                          
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id="ai-filtering"
                              checked={formSettings.aiFiltering}
                              onCheckedChange={(checked) => setFormSettings({...formSettings, aiFiltering: checked})}
                              className="data-[state=checked]:bg-violet-600"
                            />
                            <Label htmlFor="ai-filtering" className="text-white">Enable AI Filtering</Label>
                          </div>
                          <p className="text-white/50 text-sm mt-1">Uses basic AI to filter out low-quality responses.</p>
                        </div>
                        
                        <div>
                          <h4 className="text-white/70 mb-2 flex items-center">
                            <Calendar className="h-4 w-4 mr-2" /> Notifications
                          </h4>
                          
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Switch 
                                id="notify-submission"
                                checked={formSettings.notifications.onSubmission}
                                onCheckedChange={(checked) => setFormSettings({
                                  ...formSettings, 
                                  notifications: {...formSettings.notifications, onSubmission: checked}
                                })}
                                className="data-[state=checked]:bg-violet-600"
                              />
                              <Label htmlFor="notify-submission" className="text-white">New submission alerts</Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Switch 
                                id="notify-rejection"
                                checked={formSettings.notifications.onRejection}
                                onCheckedChange={(checked) => setFormSettings({
                                  ...formSettings, 
                                  notifications: {...formSettings.notifications, onRejection: checked}
                                })}
                                className="data-[state=checked]:bg-violet-600"
                              />
                              <Label htmlFor="notify-rejection" className="text-white">Rejected submission alerts</Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Switch 
                                id="notify-reminders"
                                checked={formSettings.notifications.reminders}
                                onCheckedChange={(checked) => setFormSettings({
                                  ...formSettings, 
                                  notifications: {...formSettings.notifications, reminders: checked}
                                })}
                                className="data-[state=checked]:bg-violet-600"
                              />
                              <Label htmlFor="notify-reminders" className="text-white">Send participant reminders</Label>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-white/70 mb-2 flex items-center">
                            <ArrowDown className="h-4 w-4 mr-2" /> Token Reward
                          </h4>
                          
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <Slider
                                defaultValue={[formSettings.tokenReward]}
                                max={100}
                                step={5}
                                onValueChange={(val) => setFormSettings({...formSettings, tokenReward: val[0]})}
                                className="flex-1 mr-4"
                              />
                              <div className="bg-black/60 border border-violet-900/30 rounded-md px-3 py-1 text-white font-medium min-w-14 text-center">
                                {formSettings.tokenReward}
                              </div>
                            </div>
                            <p className="text-white/50 text-sm">
                              Tokens to award for each approved submission.
                              Higher rewards typically attract more participants.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Premium Feature Popup */}
      {showPremiumPopup && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="bg-black/90 rounded-xl border border-violet-900/30 w-11/12 max-w-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Upgrade to Premium</h2>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full hover:bg-violet-900/20 text-white/70" 
                onClick={() => setShowPremiumPopup(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-600 to-purple-800 flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{premiumFeature}</h3>
              <p className="text-white/70">
                This feature is available exclusively for Premium subscribers.
                Upgrade your account to unlock advanced research capabilities.
              </p>
            </div>
            
            <div className="bg-violet-900/20 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-violet-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-white">Premium Benefits</h4>
                  <p className="text-white/70 text-sm">Advanced AI tools, unlimited forms, priority analytics, and more.</p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="border-violet-600 text-violet-400 hover:bg-violet-900/20 flex-1"
                onClick={() => setShowPremiumPopup(false)}
              >
                Maybe Later
              </Button>
              <Button 
                className="bg-gradient-to-r from-violet-600 to-purple-800 hover:opacity-90 text-white flex-1"
                onClick={() => setShowPremiumPopup(false)}
              >
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Dashboard Card Component
// interface DashboardCardProps {
//   title: string;
//   description: string;
//   icon: string;
//   features: string[];
//   cta: string;
//   ctaAction: () => void;
//   isPremium?: boolean;
//   isWide?: boolean;
// }

function DashboardCard({ title, description, icon, features, cta, ctaAction, isPremium, isWide }) {
  return (
    <div className={`bg-black/60 backdrop-blur-md rounded-xl border border-violet-900/30 p-6 ${isWide ? "md:col-span-1" : ""}`}>
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-violet-900/30 flex items-center justify-center text-xl mr-3">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
        {isPremium && (
          <div className="ml-auto">
            <span className="px-2 py-1 bg-violet-900/30 rounded-full text-xs text-violet-400 flex items-center">
              <Lock className="h-3 w-3 mr-1" /> Premium
            </span>
          </div>
        )}
      </div>
      
      <p className="text-white/70 mb-4">{description}</p>
      
      <ul className="space-y-2 mb-6">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start space-x-2">
            <CheckCircle className="h-4 w-4 text-violet-400 mt-0.5" />
            <span className="text-white/80 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button
        className={`w-full ${
          isPremium 
            ? "border border-violet-600 text-violet-400 hover:bg-violet-900/20" 
            : "bg-gradient-to-r from-violet-600 to-purple-800 hover:opacity-90 text-white"
        }`}
        onClick={ctaAction}
      >
        {isPremium && <Lock className="mr-2 h-4 w-4" />}
        {cta}
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}

// Loading Screen Component
// Loading Screen Component
function LoadingScreen({ text }) {
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