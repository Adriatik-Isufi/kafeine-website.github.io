"use client"

import { useState, useRef, useEffect } from "react"
import { Star, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import reviewsData from "@/data/reviews.json"

interface ReviewsSectionProps {
  language: "sq" | "en"
}

const translations = {
  sq: {
    title: "Çfarë Thonë Klientët Tanë",
    subtitle: "Vlerësimet dhe komentet e klientëve tanë të dashur",
    viewMore: "Shiko Më Shumë",
    leaveReview: "Lër Vlerësimin Tënd",
    allReviews: "Të Gjitha Vlerësimet",
    allReviewsDesc: "Lexoni çfarë thonë klientët tanë për ne",
    writeReview: "Shkruaj Vlerësim në Google",
    readMore: "Lexo më shumë",
    readLess: "Lexo më pak",
  },
  en: {
    title: "What Our Customers Say",
    subtitle: "Reviews and comments from our beloved customers",
    viewMore: "View More",
    leaveReview: "Leave Your Review",
    allReviews: "All Reviews",
    allReviewsDesc: "Read what our customers say about us",
    writeReview: "Write a Review on Google",
    readMore: "Read more",
    readLess: "Read less",
  },
}

function ReviewCard({
  review,
  language,
  expandable = false,
}: {
  review: (typeof reviewsData.reviews)[0]
  language: "sq" | "en"
  expandable?: boolean
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const t = translations[language]
  const shouldTruncate = review.text.length > 150

  return (
    <div className="bg-background border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
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
      <div>
        <p
          className={`text-muted-foreground leading-relaxed ${!expandable || !shouldTruncate || isExpanded ? "" : "line-clamp-3"}`}
        >
          {review.text}
        </p>
        {expandable && shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary text-sm font-medium mt-2 hover:underline"
          >
            {isExpanded ? t.readLess : t.readMore}
          </button>
        )}
      </div>
    </div>
  )
}

export function ReviewsSection({ language }: ReviewsSectionProps) {
  const t = translations[language]
  const [isModalOpen, setIsModalOpen] = useState(false)
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
                  <ReviewCard review={review} language={language} />
                </div>
              ))}
            </div>
            {/* Carousel indicators */}
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
              <ReviewCard key={review.id} review={review} language={language} />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg" className="min-w-[200px] bg-transparent">
                  {t.viewMore}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl w-[95vw] max-h-[85vh] overflow-hidden flex flex-col">
                <DialogHeader>
                  <DialogTitle className="text-2xl">{t.allReviews}</DialogTitle>
                  <DialogDescription>{t.allReviewsDesc}</DialogDescription>
                </DialogHeader>

                <div className="pb-4 border-b">
                  <Button className="w-full" onClick={() => window.open(reviewsData.googleReviewsUrl, "_blank")}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t.writeReview}
                  </Button>
                </div>

                <div className="overflow-y-auto flex-1 pr-2 -mr-2">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
                    {reviewsData.reviews.map((review) => (
                      <ReviewCard key={review.id} review={review} language={language} expandable={true} />
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              size="lg"
              className="min-w-[200px]"
              onClick={() => window.open(reviewsData.googleReviewsUrl, "_blank")}
            >
              {t.leaveReview}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
