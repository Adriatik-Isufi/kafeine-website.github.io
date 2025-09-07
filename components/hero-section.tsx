"use client"

import { Button } from "@/components/ui/button"
import { getImagePath } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

interface HeroSectionProps {
  language: "sq" | "en"
}

const translations = {
  sq: {
    welcome: "Mirë se vini në",
    subtitle: "Kafeja më e mirë në zemër të Prishtinës",
    description: "Zbuloni shijen autentike të kafesë së pjekur me dashuri dhe ëmbëlsirat tona të bëra me dorë.",
    cta: "Shikoni Menynë",
    scrollDown: "Zbrit poshtë",
  },
  en: {
    welcome: "Welcome to",
    subtitle: "The finest coffee in the heart of Pristina",
    description: "Discover the authentic taste of lovingly roasted coffee and our handmade desserts.",
    cta: "View Menu",
    scrollDown: "Scroll down",
  },
}

export function HeroSection({ language }: HeroSectionProps) {
  const t = translations[language]

  const scrollToMenu = () => {
    const element = document.getElementById("menu")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#252421]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${getImagePath("/images/coffee-pour.jpg")})`,
          filter: "brightness(0.6)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in-up">
          <img src={getImagePath("/images/logo.png")} alt="Kafeinë Logo" className="h-20 w-20 mx-auto mb-6 animate-float" />
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-balance text-white">
            {t.welcome} <span className="text-[#e18b1a]">Kafeinë</span>
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-[#e2ba84] font-medium">{t.subtitle}</p>
          <p className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed text-white/90">{t.description}</p>
          <Button
            onClick={scrollToMenu}
            size="lg"
            className="bg-[#e18b1a] hover:bg-[#e18b1a]/90 text-white px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            {t.cta}
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2 text-white/80">{t.scrollDown}</span>
          <ChevronDown className="w-6 h-6 text-white/80" />
        </div>
      </div>
    </section>
  )
}
