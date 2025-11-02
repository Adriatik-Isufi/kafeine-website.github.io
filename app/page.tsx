"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { MenuSection } from "@/components/menu-section"
import { WorkSection } from "@/components/work-section"
import { GallerySection } from "@/components/gallery-section"
import { ReviewsSection } from "@/components/reviews-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import FloatingPumpkin from "@/components/floating-pumpkin"
import HalloweenModal from "@/components/halloween-modal"

export default function HomePage() {
  const [language, setLanguage] = useState<"sq" | "en">("sq")
  const [halloweenModalOpen, setHalloweenModalOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <Navigation language={language} onLanguageChange={setLanguage} />
      <HeroSection language={language} />
      <AboutSection language={language} />
      <MenuSection language={language} />
      <WorkSection language={language} />
      <GallerySection language={language} />
      <ReviewsSection language={language} />
      <ContactSection language={language} />
      <Footer language={language} />

      <FloatingPumpkin onClick={() => setHalloweenModalOpen(true)} />
      <HalloweenModal open={halloweenModalOpen} onOpenChange={setHalloweenModalOpen} />
    </div>
  )
}
