"use client"

import { useState, useEffect } from "react"
import { LanguageToggle } from "./language-toggle"

interface NavigationProps {
  language?: "sq" | "en"
  onLanguageChange?: (lang: "sq" | "en") => void
}

const translations = {
  sq: {
    home: "Kreu",
    about: "Rreth Nesh",
    menu: "Menyja",
    work: "Puna",
    gallery: "Galeria",
    reviews: "Vlerësimet",
    contact: "Kontakti",
  },
  en: {
    home: "Home",
    about: "About",
    menu: "Menu",
    work: "Work",
    gallery: "Gallery",
    reviews: "Reviews",
    contact: "Contact",
  },
}

function Navigation({ language = "sq", onLanguageChange }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const t = translations[language]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: isScrolled ? "rgba(37, 36, 33, 0.95)" : "rgba(37, 36, 33, 0.8)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src="/images/logo.png" alt="Kafeinë" className="h-16 w-16" />
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("home")}
            className="font-medium transition-colors"
            style={{ color: "white" }}
            onMouseEnter={(e) => (e.target.style.color = "#e18b1a")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            {t.home}
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="font-medium transition-colors"
            style={{ color: "white" }}
            onMouseEnter={(e) => (e.target.style.color = "#e18b1a")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            {t.about}
          </button>
          <button
            onClick={() => scrollToSection("menu")}
            className="font-medium transition-colors"
            style={{ color: "white" }}
            onMouseEnter={(e) => (e.target.style.color = "#e18b1a")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            {t.menu}
          </button>
          <button
            onClick={() => scrollToSection("work")}
            className="font-medium transition-colors"
            style={{ color: "white" }}
            onMouseEnter={(e) => (e.target.style.color = "#e18b1a")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            {t.work}
          </button>
          <button
            onClick={() => scrollToSection("gallery")}
            className="font-medium transition-colors"
            style={{ color: "white" }}
            onMouseEnter={(e) => (e.target.style.color = "#e18b1a")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            {t.gallery}
          </button>
          <button
            onClick={() => scrollToSection("reviews")}
            className="font-medium transition-colors"
            style={{ color: "white" }}
            onMouseEnter={(e) => (e.target.style.color = "#e18b1a")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            {t.reviews}
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="font-medium transition-colors"
            style={{ color: "white" }}
            onMouseEnter={(e) => (e.target.style.color = "#e18b1a")}
            onMouseLeave={(e) => (e.target.style.color = "white")}
          >
            {t.contact}
          </button>
        </div>

        {onLanguageChange && (
          <div className="opacity-60 hover:opacity-100 transition-opacity">
            <LanguageToggle onLanguageChange={onLanguageChange} currentLang={language} />
          </div>
        )}
      </div>
    </nav>
  )
}

export { Navigation }
export default Navigation
