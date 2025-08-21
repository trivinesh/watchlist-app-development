"use client"

import { useState } from "react"
import { ChevronDown, Smile, Frown, Zap, Coffee, Heart, Compass } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Mood, MOOD_MAPPINGS } from "@/lib/mood-mapping"

interface MoodSelectorProps {
  selectedMood: Mood | null
  onMoodChange: (mood: Mood | null) => void
}

const moodIcons = {
  happy: Smile,
  sad: Frown,
  thriller: Zap,
  relax: Coffee,
  romantic: Heart,
  adventurous: Compass,
}

export function MoodSelector({ selectedMood, onMoodChange }: MoodSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-white mb-2">
            Entertainment that matches your mood
          </h2>
          <p className="text-gray-300">
            Select your mood and discover perfect content for how you're feeling
          </p>
        </div>
        
        <div className="relative">
          <Button
            variant="outline"
            className={cn(
              "w-full sm:w-auto bg-black/50 border-white/20 text-white hover:bg-white/10",
              "flex items-center justify-between px-4 py-2"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="flex items-center gap-2">
              {selectedMood ? (
                <>
                  {(() => {
                    const Icon = moodIcons[selectedMood]
                    return <Icon className="h-4 w-4" />
                  })()}
                  {MOOD_MAPPINGS.find(m => m.mood === selectedMood)?.title}
                </>
              ) : (
                "Select Mood"
              )}
            </span>
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform",
              isOpen && "rotate-180"
            )} />
          </Button>

          {isOpen && (
            <div className="absolute top-full mt-2 w-full sm:w-64 bg-black/90 border border-white/20 rounded-lg shadow-xl z-50">
              <div className="p-2">
                <button
                  className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-white/10 rounded"
                  onClick={() => {
                    onMoodChange(null)
                    setIsOpen(false)
                  }}
                >
                  All Moods
                </button>
                
                {MOOD_MAPPINGS.map((mapping) => {
                  const Icon = moodIcons[mapping.mood]
                  return (
                    <button
                      key={mapping.mood}
                      className={cn(
                        "w-full text-left px-3 py-2 text-sm rounded flex items-center gap-2",
                        selectedMood === mapping.mood
                          ? "bg-white/20 text-white"
                          : "text-gray-300 hover:bg-white/10"
                      )}
                      onClick={() => {
                        onMoodChange(mapping.mood)
                        setIsOpen(false)
                      }}
                    >
                      <Icon className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{mapping.title}</div>
                        <div className="text-xs opacity-75">{mapping.description}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
