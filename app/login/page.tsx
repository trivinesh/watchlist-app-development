"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Demo login - extract username from email
    const username = email.split("@")[0] || email

    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store demo user info in localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({
        username,
        email,
        isLoggedIn: true,
      }),
    )

    setIsLoading(false)
    router.push("/")
  }

  const handleDemoLogin = () => {
    setEmail("demo@moviewatchlist.com")
    setPassword("demo123")
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-90"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-black/75 backdrop-blur-sm rounded-lg p-8 shadow-2xl border border-gray-800">
          <div className="text-center mb-8">
            <Link
              href="/"
              className="text-3xl font-bold text-red-600 hover:text-red-500 transition-colors duration-300 block mb-4"
            >
              MYFLIX
            </Link>
            <h1 className="text-2xl font-bold text-white mb-2">Sign In</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                placeholder="Email or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500/20 h-12 rounded"
              />
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500 focus:ring-red-500/20 h-12 rounded pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-12 rounded transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6">
            <Button
              variant="outline"
              onClick={handleDemoLogin}
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent transition-all duration-200"
            >
              Try Demo Login
            </Button>
          </div>

          <div className="text-center text-sm text-gray-400 mt-6 p-4 bg-gray-900/50 rounded">
            <p className="font-medium text-gray-300">Demo Mode</p>
            <p className="text-xs mt-1">Your username will be extracted from your email address</p>
          </div>
        </div>
      </div>
    </div>
  )
}
