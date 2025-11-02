"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight } from "lucide-react"
import GlitchText from "./glitch-text"

interface HalloweenModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function HalloweenModal({ open, onOpenChange }: HalloweenModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swiped left
      if (currentSlide < 1) setCurrentSlide(1)
    }

    if (touchStart - touchEnd < -75) {
      // Swiped right
      if (currentSlide > 0) setCurrentSlide(0)
    }
  }

  const handleVideoTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleVideoTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleVideoTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swiped left
      if (currentVideoIndex < 2) setCurrentVideoIndex(currentVideoIndex + 1)
    }

    if (touchStart - touchEnd < -75) {
      // Swiped right
      if (currentVideoIndex > 0) setCurrentVideoIndex(currentVideoIndex - 1)
    }
  }

  const nextSlide = () => {
    if (currentSlide < 1) setCurrentSlide(currentSlide + 1)
  }

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1)
  }

  const videos = [
    {
      src: "/halloween-2025/video1.mp4",
      title: "Halloween ka arritur",
      description:
        "Hajdeni dhe shijoni një ditë me ambient spooky, shumë shije të veçanta dhe atmosferë të paharrueshme në Kafeinë.",
      textPosition: "top",
    },
    {
      src: "/halloween-2025/video2.mp4",
      title: "Order if you dare",
      description:
        "Përjetoni atmosferën spooky ndërsa barista jonë fantazmë ju shërben kafenë tuaj të preferuar me një prekje Halloween.",
      textPosition: "bottom",
    },
    {
      src: "/halloween-2025/video3.mp4",
      title: "Trick or treat ☕👻",
      description: "#kafeinë #coffeeshop #kafe #smoothie #food #drinks #chessecake #lemonade",
      textPosition: "top",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="!max-w-[95vw] !w-[95vw] h-[90vh] p-0 bg-black border-[#e18b1a] border-2 overflow-hidden"
        showCloseButton={true}
      >
        <div
          className="relative w-full h-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slide 1: Poster */}
          <div
            className={`absolute inset-0 transition-transform duration-500 ease-out ${
              currentSlide === 0 ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="w-full h-full flex items-center justify-center md:p-2 pb-16">
              <picture>
                <source media="(min-width: 1024px)" srcSet="/halloween-2025/poster.png" />
                <img
                  src="/halloween-2025/poster-portrait.png"
                  alt="Kafeinë Halloween 2025"
                  className="max-w-full max-h-full object-contain"
                />
              </picture>
            </div>

            {/* Swipe hint */}
            {currentSlide === 0 && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[#e2ba84] animate-pulse">
                <span className="text-sm">Swipe for videos</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            )}
          </div>

          {/* Slide 2: Videos */}
          <div
            className={`absolute inset-0 transition-transform duration-500 ease-out ${
              currentSlide === 1 ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div
              className="w-full h-full flex items-center justify-center scrollbar-hide p-4"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L50 100 M0 50 L100 50 M15 15 L85 85 M85 15 L15 85' stroke='%23333' strokeWidth='0.5' fill='none'/%3E%3C/svg%3E")`,
                backgroundSize: "100px 100px",
                backgroundRepeat: "repeat",
              }}
            >
              {/* Desktop view */}
              <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-7xl mx-auto items-center w-full">
                {videos.map((video, index) => (
                  <div key={index} className="flex flex-col gap-3">
                    {video.textPosition === "top" && (
                      <>
                        <GlitchText
                          speed={1}
                          enableShadows={true}
                          enableOnHover={false}
                          className="!text-2xl md:!text-3xl !font-bold text-[#e2ba84]"
                        >
                          {video.title}
                        </GlitchText>
                        <p className="text-[#e2ba84] text-sm md:text-base">{video.description}</p>
                      </>
                    )}
                    <video
                      src={video.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full aspect-[9/16] max-h-[50vh] object-contain rounded-lg"
                    />
                    {video.textPosition === "bottom" && (
                      <>
                        <GlitchText
                          speed={1}
                          enableShadows={true}
                          enableOnHover={false}
                          className="!text-2xl md:!text-3xl !font-bold text-[#e2ba84]"
                        >
                          {video.title}
                        </GlitchText>
                        <p className="text-[#e2ba84] text-sm md:text-base">{video.description}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile view - Swipeable carousel */}
              <div
                className="md:hidden relative w-full h-full flex items-center justify-center"
                onTouchStart={handleVideoTouchStart}
                onTouchMove={handleVideoTouchMove}
                onTouchEnd={handleVideoTouchEnd}
              >
                <div className="flex flex-col gap-4 max-w-sm mx-auto px-4">
                  {videos[currentVideoIndex].textPosition === "top" && (
                    <>
                      <GlitchText
                        speed={1}
                        enableShadows={true}
                        enableOnHover={false}
                        className="!text-2xl !font-bold text-[#e2ba84] text-center"
                      >
                        {videos[currentVideoIndex].title}
                      </GlitchText>
                      <p className="text-[#e2ba84] text-sm text-center">{videos[currentVideoIndex].description}</p>
                    </>
                  )}
                  <video
                    key={currentVideoIndex}
                    src={videos[currentVideoIndex].src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full aspect-[9/16] max-h-[60vh] object-contain rounded-lg"
                  />
                  {videos[currentVideoIndex].textPosition === "bottom" && (
                    <>
                      <GlitchText
                        speed={1}
                        enableShadows={true}
                        enableOnHover={false}
                        className="!text-2xl !font-bold text-[#e2ba84] text-center"
                      >
                        {videos[currentVideoIndex].title}
                      </GlitchText>
                      <p className="text-[#e2ba84] text-sm text-center">{videos[currentVideoIndex].description}</p>
                    </>
                  )}
                </div>

                {/* Mobile video indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {videos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentVideoIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentVideoIndex === index ? "bg-[#e18b1a] w-6" : "bg-[#e2ba84]/50"
                      }`}
                      aria-label={`Go to video ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Swipe hint for mobile videos */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[#e2ba84]/70 text-xs animate-pulse">
                  Swipe to see more videos
                </div>
              </div>
            </div>
          </div>

          {/* Navigation arrows for desktop */}
          {currentSlide > 0 && (
            <button
              onClick={prevSlide}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-[#e18b1a] hover:bg-[#e2ba84] transition-colors z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </button>
          )}

          {currentSlide < 1 && (
            <button
              onClick={nextSlide}
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center rounded-full bg-[#e18b1a] hover:bg-[#e2ba84] transition-colors z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </button>
          )}

          {/* Slide indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:flex hidden">
            {[0, 1].map((index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? "bg-[#e18b1a] w-8" : "bg-[#e2ba84]/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
