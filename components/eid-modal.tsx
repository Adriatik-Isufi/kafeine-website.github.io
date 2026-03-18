"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface EidModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function EidModal({ open, onOpenChange }: EidModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const slides = [
    { type: "image", src: "/celebrations/eid-2026/eid_fiter_2026_1.webp", alt: "Lotus Cheesecake - Eid al-Fitr 2026" },
    { type: "image", src: "/celebrations/eid-2026/eid_fiter_2026_2.webp", alt: "Forest Fruit Cheesecake - Eid al-Fitr 2026" },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  useEffect(() => {
    if (!open) {
      setCurrentSlide(0)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] h-[95vh] !p-0 bg-[#1a1918] border-2 border-[#e18b1a]">
        <DialogTitle className="sr-only">Eid al-Fitr 2026 Gallery</DialogTitle>
        <DialogDescription className="sr-only">Gallery of special Eid al-Fitr treats featuring Lotus and Forest Fruit Cheesecake</DialogDescription>
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div
          className="relative w-full h-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Poster Slides */}
          <div className="w-full h-full flex items-center justify-center p-2 md:p-8">
            <img
              src={slides[currentSlide].src}
              alt={slides[currentSlide].alt}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Navigation Arrows - Desktop */}
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10 bg-black/40 px-6 py-3 rounded-full backdrop-blur-sm border border-[#e18b1a]/30">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`relative transition-all duration-300 ${
                  index === currentSlide 
                    ? "w-10 h-3 bg-gradient-to-r from-[#e18b1a] to-[#f5a623] rounded-full shadow-lg shadow-[#e18b1a]/50" 
                    : "w-3 h-3 bg-white/40 hover:bg-white/60 rounded-full"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Swipe hint for mobile */}
          {currentSlide === 0 && (
            <div className="md:hidden absolute bottom-20 left-1/2 -translate-x-1/2 text-[#e2ba84] text-sm animate-bounce">
              Swipe for more
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
