"use client"

import { GamificationDashboard } from "@/components/gamification/gamification-dashboard"
import { NetflixNav } from "@/components/netflix-nav"

export default function GamificationPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <NetflixNav />
      <GamificationDashboard />
    </div>
  )
}
