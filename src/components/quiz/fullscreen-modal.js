"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Maximize2 } from "lucide-react"

export default function FullscreenModal({ isOpen, onEnterFullscreen }) {
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Fullscreen Required</DialogTitle>
          <DialogDescription>
            This quiz requires fullscreen mode to prevent cheating. Please click the button below to continue in
            fullscreen mode.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center py-6">
          <Maximize2 className="h-16 w-16 text-gray-400" />
        </div>
        <DialogFooter className="sm:justify-center">
          <Button onClick={onEnterFullscreen}>Enter Fullscreen</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
