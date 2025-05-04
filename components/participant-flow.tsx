import { CheckCircle } from "lucide-react"

export function ParticipantFlow() {
  const steps = [
    {
      number: "1️⃣",
      title: "Sign-Up & Verification",
      description: "Register using 3 social logins + Wallet + OCID to prevent duplicate accounts.",
      features: [],
    },
    {
      number: "2️⃣",
      title: "Discover Available Studies",
      description: "Browse through studies matching their profile.",
      features: ["(🟢 Paid Researcher Feature) Some participants may get priority invitations."],
    },
    {
      number: "3️⃣",
      title: "Fill Out Forms & Submit Responses",
      description: "Complete forms digitally.",
      features: ["AI checks for spam or inconsistent responses before submission."],
    },
    {
      number: "4️⃣",
      title: "Earn Mini Tokens",
      description: "Receive tokens for each successfully completed form.",
      features: ["Higher-quality responses may be rewarded more (🟢 Paid Researcher Feature)."],
    },
    {
      number: "5️⃣",
      title: "Withdraw or Redeem Tokens",
      description: "Convert tokens into rewards, discounts, or cash-out options.",
      features: [],
    },
    {
      number: "6️⃣",
      title: "Stay Engaged",
      description: "Build a verified reputation for better opportunities.",
      features: ["(🟢 Paid Researcher Feature) Get timely notifications to participate in more studies."],
    },
  ]

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
          <span className="text-white font-bold text-xl">🧑‍🎓</span>
        </div>
        <h2 className="ml-4 text-2xl font-bold text-white">Participant's Flow</h2>
        <span className="ml-2 text-sm text-white/60">(Study Filler)</span>
      </div>

      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {index < steps.length - 1 && (
              <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-transparent h-16 z-0"></div>
            )}
            <div className="relative z-10 flex">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-900/50 border border-blue-500/50 flex items-center justify-center text-white">
                {step.number}
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-1 text-white/80">{step.description}</p>
                {step.features.length > 0 && (
                  <ul className="mt-2 space-y-1">
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
          </div>
        ))}
      </div>
    </div>
  )
}
