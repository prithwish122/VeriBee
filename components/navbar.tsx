"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, Wallet } from "lucide-react"
// import LoginButton from "./LoginButton"
import { useOCAuth } from "@opencampus/ocid-connect-js"

// Define types for MetaMask window object
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      isMetaMask?: boolean;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
}

// Define interface for wallet state
interface WalletState {
  isConnected: boolean;
  account: string | null;
  chainId: string | null;
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    account: null,
    chainId: null,
  })

  // const { authState, ocAuth } = useOCAuth() as {
  //   authState: { isLoading: boolean; isAuthenticated: boolean; error?: { message: string } }
  //   ocAuth: { getAuthState: () => { OCId: string } }
  // }

  // Check if MetaMask is installed
  const isMetaMaskInstalled = (): boolean => {
    return typeof window !== 'undefined' && window.ethereum?.isMetaMask === true;
  }

  // Handle connect wallet button click
  const connectWallet = async (): Promise<void> => {
    if (!isMetaMaskInstalled()) {
      alert("MetaMask is not installed. Please install MetaMask to continue.");
      window.open("https://metamask.io/download/", "_blank");
      return;
    }

    try {
      // Request account access - this triggers the MetaMask popup
      const accounts: string[] = await window.ethereum!.request({
        method: "eth_requestAccounts"
      });
      
      // Get the connected chain ID
      const chainId: string = await window.ethereum!.request({
        method: "eth_chainId"
      });

      setWalletState({
        isConnected: true,
        account: accounts[0],
        chainId
      });
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  // Handle account changes
  const handleAccountsChanged = (accounts: string[]): void => {
    if (accounts.length === 0) {
      // User disconnected their wallet
      setWalletState({
        isConnected: false,
        account: null,
        chainId: walletState.chainId
      });
    } else {
      // Account changed
      setWalletState({
        ...walletState,
        isConnected: true,
        account: accounts[0]
      });
    }
  };

  // Handle chain changes
  const handleChainChanged = (chainId: string): void => {
    setWalletState({
      ...walletState,
      chainId
    });
    // Reload the page when the chain changes as recommended by MetaMask
    window.location.reload();
  };

  // Check if wallet is already connected on component mount, but don't show popup
  useEffect(() => {
    if (isMetaMaskInstalled()) {
      // Check if already connected without triggering popup
      window.ethereum!.request({ method: "eth_accounts" })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            window.ethereum!.request({ method: "eth_chainId" })
              .then((chainId: string) => {
                setWalletState({
                  isConnected: true,
                  account: accounts[0],
                  chainId
                });
              });
          }
        })
        .catch((err: Error) => console.error(err));

      // Set up listeners
      window.ethereum!.on("accountsChanged", handleAccountsChanged);
      window.ethereum!.on("chainChanged", handleChainChanged);
    }

    // Clean up listeners
    return () => {
      if (isMetaMaskInstalled()) {
        window.ethereum!.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum!.removeListener("chainChanged", handleChainChanged);
      }
    };
  }, []);

  // Display wallet address in shortened form
  const shortenAddress = (address: string | null): string => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // if (!authState) {
  //   return <div>Loading authentication...</div>
  // }

  // if (authState.error) {
  //   return <div>Error: {authState.error.message}</div>
  // }

  // if (authState.isLoading) {
  //   return <div>Loading...</div>
  // }

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center">
      <motion.div
        className="relative w-auto max-w-5xl" // Increased from max-w-4xl to max-w-5xl
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.7, duration: 0.5 }}
      >
        {/* Animated border highlight effect */}
        <motion.div
          className="absolute -inset-[1.5px] rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 opacity-70 blur-[2px] z-0"
          animate={{
            background: [
              "linear-gradient(90deg, #8b5cf6, #6d28d9, #4f46e5)",
              "linear-gradient(180deg, #7c3aed, #5b21b6, #4338ca)",
              "linear-gradient(270deg, #8b5cf6, #6d28d9, #4f46e5)",
              "linear-gradient(360deg, #7c3aed, #5b21b6, #4338ca)",
            ],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />

        <motion.nav className="relative z-10 w-full px-1 py-1 rounded-full backdrop-blur-md bg-black/70 border border-violet-900/30">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center pl-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link href="/" className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-violet-700 flex items-center justify-center relative overflow-hidden group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-violet-600 to-purple-800"
                    animate={{
                      background: [
                        "linear-gradient(to bottom right, #8b5cf6, #6d28d9)",
                        "linear-gradient(to bottom right, #7c3aed, #5b21b6)",
                        "linear-gradient(to bottom right, #8b5cf6, #6d28d9)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "radial-gradient(circle at center, rgba(139, 92, 246, 0.7) 0%, rgba(109, 40, 217, 0) 70%)",
                    }}
                    animate={{ scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <span className="text-white font-bold text-xl relative z-10">V</span>
                </div>
                <span className="ml-1 text-white font-bold text-xl">eriBee</span>
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8 px-6">
              <NavLink href="#how-it-works">How It Works</NavLink>
              <NavLink href="#features">Features</NavLink>
              <NavLink href="#pricing">Pricing</NavLink>
              <NavLink href="https://veribee.gitbook.io/veribee">Docs</NavLink>
            </div>

            <div className="hidden md:flex items-center space-x-3 pr-3">
              {/* <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Link href="https://drpc.org/faucet/open-campus-codex">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-violet-600 text-violet-400 hover:bg-violet-900/20 rounded-full px-5"
                >
                  Faucet
                </Button>
                </Link>
              </motion.div> */}

              {/* <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white border-0 rounded-full px-5">
                  {authState.isAuthenticated ? <p>{JSON.stringify(ocAuth.getAuthState().OCId)} 🎉</p> : <LoginButton />}
                </Button>
              </motion.div> */}

              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Button 
                  size="sm" 
                  className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white border-0 rounded-full px-5"
                  onClick={connectWallet}
                >
                  <Wallet size={16} />
                  {walletState.isConnected 
                    ? shortenAddress(walletState.account)
                    : 'Connect Wallet'}
                </Button>
              </motion.div>
            </div>

            <div className="md:hidden pr-3">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <motion.div
              className="absolute top-full left-0 right-0 mt-2 py-4 px-4 space-y-2 bg-black/90 backdrop-blur-md rounded-xl border border-violet-900/30"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Link href="#how-it-works" className="block text-white/80 hover:text-white transition-colors py-2">
                How It Works
              </Link>
              <Link href="#features" className="block text-white/80 hover:text-white transition-colors py-2">
                Features
              </Link>
              <Link href="#pricing" className="block text-white/80 hover:text-white transition-colors py-2">
                Pricing
              </Link>
              <Link href="#docs" className="block text-white/80 hover:text-white transition-colors py-2">
                Docs
              </Link>
              <div className="pt-4 flex flex-col space-y-2">
                <Button
                  variant="outline"
                  className="border-violet-600 text-violet-400 hover:bg-violet-900/20 rounded-full"
                >
                  Faucet
                </Button>
                {/* <Button className="bg-violet-600 hover:bg-violet-700 text-white border-0 rounded-full">
                  {authState.isAuthenticated ? <p>{JSON.stringify(ocAuth.getAuthState().OCId)}</p> : <LoginButton />}
                </Button> */}
                <Button 
                  className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white border-0 rounded-full"
                  onClick={connectWallet}
                >
                  <Wallet size={16} />
                  {walletState.isConnected 
                    ? shortenAddress(walletState.account)
                    : 'Connect Wallet'}
                </Button>
              </div>
            </motion.div>
          )}
        </motion.nav>
      </motion.div>
    </div>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
      <Link href={href} className="text-white/80 hover:text-white transition-colors text-sm">
        {children}
      </Link>
    </motion.div>
  )
}