import { CheckCircle } from "lucide-react"

export function ResearcherFlow() {
  const steps = [
    {
      number: "1️⃣",
      title: "Sign-Up & Verification",
      description: "Register using 3 social logins + Wallet + OCID for authenticity.",
      features: ["Choose a Free or Paid plan."],
    },
    {
      number: "2️⃣",
      title: "Create a Research Study",
      description: "Upload or design custom digital forms.",
      features: [
        "Set eligibility criteria (age, location, prior studies, etc.).",
        "(🟢 Paid) Set custom notification time to alert participants.",
      ],
    },
    {
      number: "3️⃣",
      title: "AI-Verified Data Collection",
      description: "Responses go through AI filtering for spam detection.",
      features: ["(🟢 Paid) Multi-layered AI spam detection for better quality responses."],
    },
    {
      number: "4️⃣",
      title: "Participant Incentivization",
      description: "Allocate mini tokens as incentives.",
      features: ["(🟢 Paid) Set higher token rewards for specific participants (e.g., verified professionals)."],
    },
    {
      number: "5️⃣",
      title: "Data Analysis & Insights",
      description: "Download raw data (Free).",
      features: ["(🟢 Paid) Access AI-generated reports, trends, and analytics."],
    },
    {
      number: "6️⃣",
      title: "Scale & Improve Research",
      description: "Track study completion rates.",
      features: ["(🟢 Paid) Retarget engaged participants for future studies."],
    },
  ]

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
          <span className="text-white font-bold text-xl">🔬</span>
        </div>
        <h2 className="ml-4 text-2xl font-bold text-white">Researcher's Flow</h2>
        <span className="ml-2 text-sm text-white/60">(Study Creator)</span>
      </div>

      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {index < steps.length - 1 && (
              <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-transparent h-16 z-0"></div>
            )}
            <div className="relative z-10 flex">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-900/50 border border-purple-500/50 flex items-center justify-center text-white">
                {step.number}
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-1 text-white/80">{step.description}</p>
                <ul className="mt-2 space-y-1">
                  {step.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
