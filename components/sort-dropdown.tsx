"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export type SortOption = "release-date-newest" | "release-date-oldest" | "rating-highest" | "rating-lowest" | "personal-rating-highest" | "personal-rating-lowest"

interface SortDropdownProps {
  onSortChange: (sortOption: SortOption) => void
  currentSort?: SortOption
}

export function SortDropdown({ onSortChange, currentSort }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const sortOptions = [
    { value: "release-date-newest" as SortOption, label: "Release Date (Newest First)" },
    { value: "release-date-oldest" as SortOption, label: "Release Date (Oldest First)" },
    { value: "rating-highest" as SortOption, label: "Rating (Highest First)" },
    { value: "rating-lowest" as SortOption, label: "Rating (Lowest First)" },
    { value: "personal-rating-highest" as SortOption, label: "Personal Rating (Highest First)" },
    { value: "personal-rating-lowest" as SortOption, label: "Personal Rating (Lowest First)" },
  ]

  const getCurrentLabel = () => {
    const option = sortOptions.find(opt => opt.value === currentSort)
    return option?.label || "Sort by..."
  }

  return (
    <div className="relative">
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {getCurrentLabel()}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
          <div className="py-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSortChange(option.value)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 ${
                  currentSort === option.value ? "font-semibold bg-gray-700" : ""
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
