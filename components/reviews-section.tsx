"use client"

import { useState, useRef, useEffect } from "react"
import { Star, X } from "lucide-react"
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
    allReviews: "Të Gjitha Vlerësimet",
    allReviewsSubtitle: "Lexoni çfarë thonë klientët tanë për ne",
    writeReview: "Shkruaj Vlerësim në Google",
    readMore: "Lexo më shumë",
    fullReview: "Vlerësimi i Plotë",
  },
  en: {
    title: "What Our Customers Say",
    subtitle: "Reviews and comments from our beloved customers",
    leaveReview: "Leave Your Review",
    viewMore: "View More",
    allReviews: "All Reviews",
    allReviewsSubtitle: "Read what our customers say about us",
    writeReview: "Write a Review on Google",
    readMore: "Read more",
    fullReview: "Full Review",
  },
}

function ReviewCard({
  review,
  language,
  onReadMore,
  showFullText = false,
}: {
  review: (typeof reviewsData.reviews)[0]
  language: "sq" | "en"
  onReadMore?: () => void
  showFullText?: boolean
}) {
  const t = translations[language]
  const shouldTruncate = review.text.length > 150 && !showFullText

  return (
    <div className="bg-background border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col break-inside-avoid mb-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold flex-shrink-0">
          {review.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{review.name}</h3>
          <div className="flex gap-0.5 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground mt-1 block">
            {new Date(review.date).toLocaleDateString("sq-AL", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <p className={`text-muted-foreground leading-relaxed ${shouldTruncate ? "line-clamp-4" : ""}`}>{review.text}</p>
        {shouldTruncate && onReadMore && (
          <button onClick={onReadMore} className="text-primary text-sm font-medium mt-2 hover:underline self-start">
            {t.readMore}
          </button>
        )}
      </div>
    </div>
  )
}

function MasonryReviewCard({ review }: { review: (typeof reviewsData.reviews)[0] }) {
  const textLength = review.text.length
  const getColSpan = () => {
    if (textLength > 300) return "lg:col-span-4 xl:col-span-3"
    if (textLength > 200) return "lg:col-span-3 xl:col-span-2"
    if (textLength > 100) return "lg:col-span-2"
    return "lg:col-span-2"
  }

  return (
    <div
      className={`bg-background border border-border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all ${getColSpan()}`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold flex-shrink-0">
          {review.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground">{review.name}</h3>
          <div className="flex gap-0.5 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground mt-1 block">
            {new Date(review.date).toLocaleDateString("sq-AL", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
      <p className="text-muted-foreground leading-relaxed">{review.text}</p>
    </div>
  )
}

export function ReviewsSection({ language }: ReviewsSectionProps) {
  const t = translations[language]
  const [selectedReview, setSelectedReview] = useState<(typeof reviewsData.reviews)[0] | null>(null)
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const displayedReviews = reviewsData.reviews.slice(0, 5)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let startX = 0
    let scrollLeft = 0

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].pageX
      scrollLeft = container.scrollLeft
    }

    const handleTouchMove = (e: TouchEvent) => {
      const x = e.touches[0].pageX
      const walk = (startX - x) * 2
      container.scrollLeft = scrollLeft + walk
    }

    const handleScroll = () => {
      const slideWidth = container.offsetWidth
      const newSlide = Math.round(container.scrollLeft / slideWidth)
      setCurrentSlide(newSlide)
    }

    container.addEventListener("touchstart", handleTouchStart)
    container.addEventListener("touchmove", handleTouchMove)
    container.addEventListener("scroll", handleScroll)

    return () => {
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSlide = (index: number) => {
    const container = scrollContainerRef.current
    if (!container) return
    const slideWidth = container.offsetWidth
    container.scrollTo({ left: slideWidth * index, behavior: "smooth" })
  }

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h2>
          <p className="text-xl text-muted-foreground">{t.subtitle}</p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="md:hidden mb-8">
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {displayedReviews.map((review) => (
                <div key={review.id} className="flex-shrink-0 w-full snap-center">
                  <ReviewCard review={review} language={language} onReadMore={() => setSelectedReview(review)} />
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {displayedReviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index ? "bg-primary w-6" : "bg-muted"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mb-8">
            {displayedReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                language={language}
                onReadMore={() => setSelectedReview(review)}
              />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              variant="outline"
              className="min-w-[200px] bg-transparent"
              onClick={() => setShowAllReviews(true)}
            >
              {t.viewMore}
            </Button>
            <Button
              size="lg"
              className="min-w-[200px]"
              onClick={() => window.open(reviewsData.googleReviewsUrl, "_blank")}
            >
              {t.leaveReview}
            </Button>
          </div>

          <Dialog open={!!selectedReview} onOpenChange={() => setSelectedReview(null)}>
            <DialogContent className="max-w-2xl w-[95vw] max-h-[80vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <DialogTitle className="text-xl">{t.fullReview}</DialogTitle>
              </DialogHeader>

              {selectedReview && (
                <div className="overflow-y-auto flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold flex-shrink-0">
                      {selectedReview.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">{selectedReview.name}</h3>
                      <div className="flex gap-0.5 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < selectedReview.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground mt-1 block">
                        {new Date(selectedReview.date).toLocaleDateString("sq-AL", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{selectedReview.text}</p>
                </div>
              )}
            </DialogContent>
          </Dialog>

          <Dialog open={showAllReviews} onOpenChange={setShowAllReviews}>
            <DialogContent className="!max-w-[96vw] w-[96vw] h-[92vh] p-0 overflow-hidden flex flex-col">
              <div className="sticky top-0 z-10 bg-background border-b px-6 py-4">
                <div className="flex items-center justify-between mb-2">
                  <DialogTitle className="text-2xl font-bold">{t.allReviews}</DialogTitle>
                  <button
                    onClick={() => setShowAllReviews(false)}
                    className="rounded-full p-2 hover:bg-muted transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-muted-foreground mb-4">{t.allReviewsSubtitle}</p>
                <Button
                  className="w-full sm:w-auto"
                  onClick={() => window.open(reviewsData.googleReviewsUrl, "_blank")}
                >
                  {t.writeReview}
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 auto-rows-auto">
                    {reviewsData.reviews.map((review) => (
                      <MasonryReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
}
