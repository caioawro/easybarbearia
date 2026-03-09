"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Play, X } from "lucide-react"

interface VideoModalProps {
  videoId?: string
  title?: string
  triggerText?: string
  triggerVariant?: "default" | "outline" | "ghost" | "link"
  triggerSize?: "default" | "sm" | "lg" | "icon"
  triggerClassName?: string
  showIcon?: boolean
}

export function VideoModal({
  videoId = "dQw4w9WgXcQ", // Placeholder video ID
  title = "Veja como funciona",
  triggerText = "Ver vídeo",
  triggerVariant = "outline",
  triggerSize = "lg",
  triggerClassName = "",
  showIcon = true,
}: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        variant={triggerVariant}
        size={triggerSize}
        className={triggerClassName}
        onClick={() => setIsOpen(true)}
      >
        {showIcon && <Play className="w-4 h-4 mr-1 fill-current" />}
        {triggerText}
      </Button>

      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden bg-background border-border">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-foreground">{title}</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface PlanVideoModalProps {
  planName: string
  videoId?: string
}

export function PlanVideoModal({ planName, videoId = "dQw4w9WgXcQ" }: PlanVideoModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="w-full text-xs gap-2 border-accent/20 hover:border-accent/40 text-accent hover:bg-accent/5 transition-all h-9"
      >
        <Play className="w-3.5 h-3.5 fill-current" />
        Ver demonstração em vídeo
      </Button>

      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden bg-background border-border">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="text-foreground">Detalhes do plano: {planName}</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={`Detalhes do plano ${planName}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
