"use client"

import { useState, useRef, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import reviewsData from "@/data/reviews.json"

interface ReviewsSectionProps {
  language: "sq" | "en"
}

const translations = {
  sq: {
    title: "Çfarë Thonë Klientët Tanë",
    subtitle: "Vlerësimet dhe komentet e klientëve tanë të dashur",
    leaveReview: "Lër Vlerësimin Tënd",
    viewMore: "Shiko Më Shumë",
    googleReviews: "Vlerësime në Google",
    basedOn: "Bazuar në",
    reviews: "vlerësime",
    readMore: "Lexo më shumë",
    close: "Mbyll",
  },
  en: {
    title: "What Our Customers Say",
    subtitle: "Reviews and comments from our beloved customers",
    leaveReview: "Leave Your Review",
    viewMore: "View More",
    googleReviews: "Google Reviews",
    basedOn: "Based on",
    reviews: "reviews",
    readMore: "Read more",
    close: "Close",
  },
}

function ReviewCard({
  review,
  language,
}: {
  review: (typeof reviewsData.reviews)[0]
  language: "sq" | "en"
}) {
  const t = translations[language]
  const [showFullModal, setShowFullModal] = useState(false)
  const shouldTruncate = review.text.length > 120

  return (
    <>
      <div className="bg-white border border-[#D4A574]/20 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-[#D4A574]/40 h-[280px] flex flex-col">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B4513] to-[#D4A574] flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow-md">
            {review.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[#2C1810] text-base truncate">{review.name}</h3>
            <div className="flex gap-0.5 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < review.rating ? "fill-[#D4A574] text-[#D4A574]" : "fill-gray-200 text-gray-200"}`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 mt-1 block">{review.date}</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">{review.text}</p>
          {shouldTruncate && (
            <button
              onClick={() => setShowFullModal(true)}
              className="text-[#8B4513] text-sm font-semibold mt-2 hover:text-[#D4A574] transition-colors self-start"
            >
              {t.readMore}
            </button>
          )}
        </div>
      </div>

      <Dialog open={showFullModal} onOpenChange={setShowFullModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B4513] to-[#D4A574] flex items-center justify-center text-white font-bold text-base shadow-md">
                {review.avatar}
              </div>
              <div>
                <div className="font-bold text-[#2C1810] text-lg">{review.name}</div>
                <div className="flex gap-0.5 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "fill-[#D4A574] text-[#D4A574]" : "fill-gray-200 text-gray-200"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 mt-1">{review.date}</span>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-gray-700 leading-relaxed">{review.text}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export function ReviewsSection({ language }: ReviewsSectionProps) {
  const t = translations[language]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth
      if (width < 768) {
        setCardsPerView(1)
      } else if (width < 1024) {
        setCardsPerView(2)
      } else if (width < 1280) {
        setCardsPerView(3)
      } else if (width < 1536) {
        setCardsPerView(4)
      } else {
        setCardsPerView(5)
      }
    }

    updateCardsPerView()
    window.addEventListener("resize", updateCardsPerView)
    return () => window.removeEventListener("resize", updateCardsPerView)
  }, [])

  const maxIndex = Math.max(0, reviewsData.reviews.length - cardsPerView)

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let startX = 0
    let isDragging = false

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].pageX
      isDragging = true
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isDragging) return
      const endX = e.changedTouches[0].pageX
      const diff = startX - endX

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          handleNext()
        } else {
          handlePrev()
        }
      }
      isDragging = false
    }

    container.addEventListener("touchstart", handleTouchStart)
    container.addEventListener("touchend", handleTouchEnd)

    return () => {
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchend", handleTouchEnd)
    }
  }, [currentIndex, maxIndex])

  return (
    <section id="reviews" className="py-20 bg-gradient-to-b from-[#FFF8F0] to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C1810] mb-3">{t.title}</h2>
          <p className="text-base text-gray-600 mb-6">{t.subtitle}</p>

          <div className="inline-flex items-center gap-6 bg-white rounded-xl shadow-md px-8 py-4 border border-[#D4A574]/20">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700">{t.googleReviews}</span>
            </div>

            <div className="h-8 w-px bg-gray-200" />

            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-[#2C1810]">{reviewsData.overallRating}</span>
              <div className="flex flex-col items-start">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.round(reviewsData.overallRating) ? "fill-[#D4A574] text-[#D4A574]" : "fill-gray-200 text-gray-200"}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 mt-0.5">
                  {reviewsData.totalReviews} {t.reviews}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mb-8">
          <div className="relative">
            <div ref={containerRef} className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out gap-6"
                style={{
                  transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
                }}
              >
                {reviewsData.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="flex-shrink-0"
                    style={{ width: `calc(${100 / cardsPerView}% - ${((cardsPerView - 1) * 24) / cardsPerView}px)` }}
                  >
                    <ReviewCard review={review} language={language} />
                  </div>
                ))}
              </div>
            </div>

            {currentIndex > 0 && (
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-3 rounded-full bg-white shadow-lg border-2 border-[#D4A574] text-[#8B4513] hover:bg-[#8B4513] hover:text-white transition-all duration-300 z-10"
                aria-label="Previous reviews"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {currentIndex < maxIndex && (
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-3 rounded-full bg-white shadow-lg border-2 border-[#D4A574] text-[#8B4513] hover:bg-[#8B4513] hover:text-white transition-all duration-300 z-10"
                aria-label="Next reviews"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index ? "bg-[#8B4513] w-8" : "bg-gray-300 w-2"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="lg"
            variant="outline"
            className="min-w-[200px] border-2 border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white transition-all duration-300 font-semibold bg-transparent"
            onClick={() => window.open(reviewsData.googleReviewsUrl, "_blank")}
          >
            {t.viewMore}
          </Button>
          <Button
            size="lg"
            className="min-w-[200px] bg-gradient-to-r from-[#8B4513] to-[#D4A574] hover:from-[#D4A574] hover:to-[#8B4513] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={() => window.open(reviewsData.googleReviewsUrl, "_blank")}
          >
            {t.leaveReview}
          </Button>
        </div>
      </div>
    </section>
  )
}
