"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Search, LogOut, Menu, Home, Tv, Film, List, Eye, CheckCircle, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface User {
  username: string
  email: string
  isLoggedIn: boolean
}

const navigationItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/tv", label: "TV Shows", icon: Tv },
  { href: "/movies", label: "Movies", icon: Film },
  { href: "/watchlist", label: "Watchlist", icon: List },
  { href: "/wishlist", label: "Wishlist", icon: Bookmark },
  { href: "/watching", label: "Watching", icon: Eye },
  { href: "/watched", label: "Watched", icon: CheckCircle },
]

export function NetflixNav() {
  const [user, setUser] = useState<User | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/login")
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3">
        {/* Logo and Desktop Navigation */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-2xl font-bold text-red-600 hover:text-red-500 transition-colors">
            MYFLIX
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-6">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-gray-300",
                    isActive ? "text-white" : "text-gray-400",
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Button */}
          <Link href="/search">
            <Button variant="ghost" size="sm" className="text-white hover:text-gray-300 hover:bg-gray-800">
              <Search className="h-5 w-5" />
            </Button>
          </Link>

          {/* User Section */}
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300 hidden sm:block">{user.username}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-white hover:text-gray-300 hover:bg-gray-800"
              >
                <LogOut className="h-4 w-4" />
              </Button>
              <Link href="/profile">
                <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white text-sm font-bold hover:bg-red-500 transition-colors">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              </Link>
            </div>
          ) : (
            <Link href="/login">
              <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2">Sign In</Button>
            </Link>
          )}

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-gray-800">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-black border-gray-800">
                <div className="flex flex-col space-y-4 mt-8">
                  <div className="text-lg font-bold text-white mb-4">Menu</div>
                  {navigationItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-colors",
                          isActive ? "bg-red-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </Link>
                    )
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
