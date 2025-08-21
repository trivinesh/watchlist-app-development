"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Star, Calendar, Clock, CheckCircle, Eye, Trash2, Edit } from "lucide-react"
import type { WatchlistItem, WatchStatus } from "@/app/page"

interface ItemDetailsDialogProps {
  item: WatchlistItem
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (item: WatchlistItem) => void
  onDelete: (id: string) => void
}

const STATUS_CONFIG = {
  "want-to-watch": { label: "Want to Watch", icon: Clock, color: "bg-blue-500" },
  watching: { label: "Watching", icon: Eye, color: "bg-yellow-500" },
  watched: { label: "Watched", icon: CheckCircle, color: "bg-green-500" },
}

export function ItemDetailsDialog({ item, open, onOpenChange, onUpdate, onDelete }: ItemDetailsDialogProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    personalRating: item.personalRating?.toString() || "",
    status: item.status,
    notes: item.notes || "",
  })

  const handleSave = () => {
    const updatedItem: WatchlistItem = {
      ...item,
      personalRating: editData.personalRating ? Number.parseFloat(editData.personalRating) : undefined,
      status: editData.status,
      notes: editData.notes || undefined,
    }

    onUpdate(updatedItem)
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this item?")) {
      onDelete(item.id)
      onOpenChange(false)
    }
  }

  const StatusIcon = STATUS_CONFIG[item.status].icon

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-card-foreground flex items-center justify-between">
            <span>{item.title}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)} className="border-border">
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                className="border-border text-destructive hover:text-destructive bg-transparent"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Poster */}
          <div className="md:col-span-1">
            <img src={item.poster || "/placeholder.svg"} alt={item.title} className="w-full rounded-lg shadow-lg" />
          </div>

          {/* Details */}
          <div className="md:col-span-2 space-y-4">
            {/* Basic Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                  {item.type === "movie" ? "Movie" : "TV Show"}
                </Badge>
                <Badge className={`${STATUS_CONFIG[item.status].color} text-white`}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {STATUS_CONFIG[item.status].label}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Genre:</span>
                  <div className="font-medium text-card-foreground">{item.genre}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Release Date:</span>
                  <div className="font-medium text-card-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(item.releaseDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">IMDb Rating:</span>
                  <div className="font-medium text-card-foreground flex items-center gap-1">
                    <Star className="h-3 w-3 fill-accent text-accent" />
                    {item.rating}/10
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Added:</span>
                  <div className="font-medium text-card-foreground">
                    {new Date(item.addedDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Editable Fields */}
            <div className="space-y-4 pt-4 border-t border-border">
              {isEditing ? (
                <>
                  <div className="space-y-2">
                    <Label className="text-card-foreground">My Rating</Label>
                    <Input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      value={editData.personalRating}
                      onChange={(e) => setEditData((prev) => ({ ...prev, personalRating: e.target.value }))}
                      placeholder="Rate out of 10"
                      className="bg-input border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-card-foreground">Watch Status</Label>
                    <Select
                      value={editData.status}
                      onValueChange={(value: WatchStatus) => setEditData((prev) => ({ ...prev, status: value }))}
                    >
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
                    <Label className="text-card-foreground">Notes</Label>
                    <Textarea
                      value={editData.notes}
                      onChange={(e) => setEditData((prev) => ({ ...prev, notes: e.target.value }))}
                      placeholder="Add your thoughts, reviews, or reminders..."
                      className="bg-input border-border resize-none"
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)} className="border-border">
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {item.personalRating && (
                    <div>
                      <span className="text-muted-foreground text-sm">My Rating:</span>
                      <div className="font-medium text-card-foreground flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-lg">{item.personalRating}/10</span>
                      </div>
                    </div>
                  )}

                  {item.notes && (
                    <div>
                      <span className="text-muted-foreground text-sm">My Notes:</span>
                      <div className="mt-2 p-3 bg-muted rounded-lg text-card-foreground">{item.notes}</div>
                    </div>
                  )}

                  {!item.personalRating && !item.notes && (
                    <div className="text-center py-4 text-muted-foreground">
                      <p>No personal rating or notes yet.</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                        className="mt-2 border-border"
                      >
                        Add Rating & Notes
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
