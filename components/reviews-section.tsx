"use client"

import { useEffect } from "react"

interface ReviewsSectionProps {
  language: "sq" | "en"
}

const translations = {
  sq: {
    title: "Çfarë Thonë Klientët Tanë",
    subtitle: "Vlerësimet dhe komentet e klientëve tanë të dashur",
  },
  en: {
    title: "What Our Customers Say",
    subtitle: "Reviews and comments from our beloved customers",
  },
}

export function ReviewsSection({ language }: ReviewsSectionProps) {
  const t = translations[language]

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://static.elfsight.com/platform/platform.js"
    script.defer = true
    document.head.appendChild(script)

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t.title}</h2>
          <p className="text-xl text-muted-foreground">{t.subtitle}</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <div className="elfsight-app-6c554cba-f50e-4e80-b00a-0be0c2847328" data-elfsight-app-lazy></div>
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-white z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
