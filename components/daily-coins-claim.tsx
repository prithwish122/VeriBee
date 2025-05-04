"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Coins, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BrowserProvider, ethers } from 'ethers';
import contractAddress from "@/contractInfo/contractAddress.json"
import contractAbi from "@/contractInfo/abi.json"


export function DailyCoinsClaimContainer() {
  const [claimed, setClaimed] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [coinsAmount] = useState(Math.floor(Math.random() * 30) + 20); // Random between 20-50

  // Simulate proper countdown timer
  useEffect(() => {
    // Set the initial target time (24 hours from now)
    const targetTime = new Date();
    targetTime.setHours(targetTime.getHours() + 24);
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetTime.getTime() - now.getTime();
      
      // If countdown is finished
      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft("00:00:00");
        setClaimed(false); // Allow claiming again
        return;
      }
      
      // Calculate hours, minutes, seconds
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      
      // Format and update the time left
      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [claimed]); // Reset timer when claimed state changes


  const withdraw = async () => {
    console.log("====================")
    const abi = contractAbi;
    const amount = coinsAmount;

    if (window.ethereum !== undefined) {

      const provider = new BrowserProvider(window.ethereum);

      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const bounceContract = new ethers.Contract(contractAddress.address, abi, signer)

      await (await bounceContract.mint(address, ethers.parseUnits(amount.toString(), 18))).wait();
    }
  }

  const handleClaim = async () => {
    await withdraw()
    setClaimed(true)
    setShowAnimation(true)

    // Reset after animation completes
    setTimeout(() => {
      setShowAnimation(false)
    }, 3000)
  }

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="container mx-auto px-4 mb-8"
      >
        <div className="bg-black rounded-xl p-4 border border-blue-800/30 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-700/10 rounded-full blur-2xl"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-700/10 rounded-full blur-2xl"></div>

          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center mr-4 shadow-lg shadow-amber-600/20">
                <Coins className="h-6 w-6 text-white" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">Daily Tokens Available!</h3>
                <p className="text-gray-400">Claim your daily tokens to use in research studies</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {!claimed ? (
                <>
                  <div className="flex items-center bg-black/40 px-3 py-1 rounded-full border border-gray-800">
                    <Clock className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-gray-400 text-sm">Resets in {timeLeft}</span>
                  </div>

                  <Button
                    onClick={handleClaim}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white font-medium rounded-full px-6"
                  >
                    Claim {coinsAmount} Tokens
                  </Button>
                </>
              ) : (
                <div className="flex items-center bg-green-900/30 px-4 py-2 rounded-full border border-green-800/30">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  <span className="text-white font-medium">Claimed {coinsAmount} Tokens!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Coin animation overlay */}
      <AnimatePresence>
        {showAnimation && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            <div className="relative w-full h-full">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{
                    x: "50%",
                    y: "50%",
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                    scale: [0, 1, 0.8],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.05,
                    ease: "easeOut",
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-600/20">
                    <Coins className="h-4 w-4 text-white" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}