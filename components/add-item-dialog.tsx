"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { WatchlistItem, WatchStatus, ItemType } from "@/app/page"

interface AddItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (item: Omit<WatchlistItem, "id" | "addedDate">) => void
}

const GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "War",
  "Western",
]

export function AddItemDialog({ open, onOpenChange, onAdd }: AddItemDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    type: "movie" as ItemType,
    genre: "",
    rating: "",
    personalRating: "",
    status: "want-to-watch" as WatchStatus,
    releaseDate: "",
    poster: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.genre || !formData.rating || !formData.releaseDate) {
      return
    }

    const newItem: Omit<WatchlistItem, "id" | "addedDate"> = {
      title: formData.title,
      type: formData.type,
      genre: formData.genre,
      rating: Number.parseFloat(formData.rating),
      personalRating: formData.personalRating ? Number.parseFloat(formData.personalRating) : undefined,
      status: formData.status,
      releaseDate: formData.releaseDate,
      poster:
        formData.poster ||
        `/placeholder.svg?height=400&width=300&query=${encodeURIComponent(formData.title + " " + formData.type + " poster")}`,
      notes: formData.notes || undefined,
    }

    onAdd(newItem)

    // Reset form
    setFormData({
      title: "",
      type: "movie",
      genre: "",
      rating: "",
      personalRating: "",
      status: "want-to-watch",
      releaseDate: "",
      poster: "",
      notes: "",
    })

    onOpenChange(false)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-card-foreground">Add New Item</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-card-foreground">
              Title *
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter movie or TV show title"
              className="bg-input border-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-card-foreground">
              Type *
            </Label>
            <Select value={formData.type} onValueChange={(value: ItemType) => handleChange("type", value)}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="movie">Movie</SelectItem>
                <SelectItem value="tv-show">TV Show</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="genre" className="text-card-foreground">
              Genre *
            </Label>
            <Select value={formData.genre} onValueChange={(value) => handleChange("genre", value)}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                {GENRES.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rating" className="text-card-foreground">
                IMDb Rating *
              </Label>
              <Input
                id="rating"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={formData.rating}
                onChange={(e) => handleChange("rating", e.target.value)}
                placeholder="8.5"
                className="bg-input border-border"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="personalRating" className="text-card-foreground">
                My Rating
              </Label>
              <Input
                id="personalRating"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={formData.personalRating}
                onChange={(e) => handleChange("personalRating", e.target.value)}
                placeholder="9.0"
                className="bg-input border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-card-foreground">
              Watch Status
            </Label>
            <Select value={formData.status} onValueChange={(value: WatchStatus) => handleChange("status", value)}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="want-to-watch">Want to Watch</SelectItem>
                <SelectItem value="watching">Currently Watching</SelectItem>
                <SelectItem value="watched">Watched</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="releaseDate" className="text-card-foreground">
              Release Date *
            </Label>
            <Input
              id="releaseDate"
              type="date"
              value={formData.releaseDate}
              onChange={(e) => handleChange("releaseDate", e.target.value)}
              className="bg-input border-border"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="poster" className="text-card-foreground">
              Poster URL
            </Label>
            <Input
              id="poster"
              value={formData.poster}
              onChange={(e) => handleChange("poster", e.target.value)}
              placeholder="https://example.com/poster.jpg (optional)"
              className="bg-input border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-card-foreground">
              Notes
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Add your thoughts, reviews, or reminders..."
              className="bg-input border-border resize-none"
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              Add Item
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
