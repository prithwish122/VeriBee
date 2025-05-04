import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PricingComparison() {
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
    <div id="pricing" className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10">
      <h2 className="text-3xl font-bold text-center text-white mb-2">Choose Your Plan</h2>
      <p className="text-center text-white/70 mb-8">Select the plan that fits your research needs</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"></div>
          <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
          <p className="text-white/70 mb-4">Perfect for getting started</p>
          <div className="mb-6">
            <span className="text-4xl font-bold text-white">$0</span>
            <span className="text-white/70">/month</span>
          </div>
          <Button className="w-full mb-8 bg-white/10 hover:bg-white/20 text-white">Get Started</Button>
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
        </div>

        {/* Paid Plan */}
        <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-md rounded-xl p-6 border border-purple-500/30 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl"></div>

          <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
            RECOMMENDED
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">Premium</h3>
          <p className="text-white/70 mb-4">For serious researchers</p>
          <div className="mb-6">
            <span className="text-4xl font-bold text-white">$29</span>
            <span className="text-white/70">/month</span>
          </div>
          <Button className="w-full mb-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0">
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
        </div>
      </div>
    </div>
  )
}
