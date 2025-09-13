"use client"

import { useState, useEffect } from "react"
import { LanguageToggle } from "./language-toggle"
import { getImagePath } from "@/lib/utils"
import { Menu, X, Phone, Mail, Home, Info, Utensils, ImageIcon, Star, MessageCircle } from "lucide-react"

interface NavigationProps {
  language?: "sq" | "en"
  onLanguageChange?: (lang: "sq" | "en") => void
  isCareerPage?: boolean
}

const translations = {
  sq: {
    home: "Kreu",
    about: "Rreth Nesh",
    menu: "Menyja",
    gallery: "Galeria",
    reviews: "Vlerësimet",
    contact: "Kontakti",
  },
  en: {
    home: "Home",
    about: "About",
    menu: "Menu",
    gallery: "Gallery",
    reviews: "Reviews",
    contact: "Contact",
  },
}

function Navigation({ language = "sq", onLanguageChange, isCareerPage = false }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentSection, setCurrentSection] = useState(isCareerPage ? "" : "home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = translations[language]

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 50)

      // Skip section detection on career page
      if (isCareerPage) return

      // Define sections in order
      const sections = ["home", "about", "menu", "gallery", "reviews", "contact"]
      const navbarHeight = 80

      let currentSectionId = "home"
      let maxVisibleArea = 0

      // Find the section with the most visible area in the viewport
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          
          // Calculate the visible portion of this section
          const visibleTop = Math.max(0, rect.top)
          const visibleBottom = Math.min(window.innerHeight, rect.bottom)
          const visibleHeight = Math.max(0, visibleBottom - visibleTop)
          
          // If this section has more visible area and meets minimum threshold
          if (visibleHeight > maxVisibleArea && visibleHeight > 150) {
            maxVisibleArea = visibleHeight
            currentSectionId = sectionId
          }
          
          // Special case: if section takes up more than 60% of viewport, it's definitely current
          if (visibleHeight > window.innerHeight * 0.6) {
            currentSectionId = sectionId
          }
        }
      })

      setCurrentSection(currentSectionId)
    }

    handleScroll() // Initial call
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isCareerPage])

  const getTextColor = () => {
    // Simplified approach: define sections with their appropriate text colors
    const sectionTextColors = {
      home: "white",      // Dark background sections
      about: "#252421",   // Light background sections  
      menu: "white",      // Dark background sections
      gallery: "#252421", // Light background sections
      reviews: "white",   // Dark background sections
      contact: "white"    // Dark background sections (contact has dark gradient)
    }

    // Return the appropriate color for current section, fallback to white
    return sectionTextColors[currentSection] || "white"
  }

  const scrollToSection = (sectionId: string) => {
    if (isCareerPage) {
      // Navigate back to main page with section hash
      window.location.href = `/#${sectionId}`
      return
    }
    
    const element = document.getElementById(sectionId)
    if (element) {
      const navbarHeight = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navbarHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
    setIsMenuOpen(false)
  }

  const textColor = isCareerPage ? "white" : getTextColor()

  const getNavIcon = (key: string) => {
    switch (key) {
      case "home":
        return <Home className="w-5 h-5" />
      case "about":
        return <Info className="w-5 h-5" />
      case "menu":
        return <Utensils className="w-5 h-5" />
      case "gallery":
        return <ImageIcon className="w-5 h-5" />
      case "reviews":
        return <Star className="w-5 h-5" />
      case "contact":
        return <MessageCircle className="w-5 h-5" />
      default:
        return <Home className="w-5 h-5" />
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isCareerPage ? 'career-nav' : ''}`}
        style={{
          background: isScrolled ? "rgba(37, 36, 33, 0.95)" : "rgba(37, 36, 33, 0.8)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={getImagePath("/images/logo.png") || "/placeholder.svg"}
              alt="Kafeinë"
              className="h-20 w-auto object-contain"
            />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {Object.entries(t).map(([key, label]) => {
              if (
                key === "home" ||
                key === "about" ||
                key === "menu" ||
                key === "gallery" ||
                key === "reviews" ||
                key === "contact"
              ) {
                return (
                  <button
                    key={key}
                    onClick={() => scrollToSection(key)}
                    className={`font-medium transition-all duration-300 ${currentSection === key ? "font-bold" : ""}`}
                    style={{
                      color: currentSection === key ? "#e18b1a" : textColor,
                      textShadow: textColor === "white" ? "0 1px 2px rgba(0,0,0,0.3)" : "none",
                    }}
                    onMouseEnter={(e) => {
                      if (currentSection !== key) {
                        e.target.style.color = "#e18b1a"
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentSection !== key) {
                        e.target.style.color = textColor
                      }
                    }}
                  >
                    {label}
                  </button>
                )
              }
              return null
            })}
          </div>

          <div className="flex items-center space-x-4">
            {onLanguageChange && (
              <div className="opacity-60 hover:opacity-100 transition-opacity">
                <LanguageToggle onLanguageChange={onLanguageChange} currentLang={language} />
              </div>
            )}

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2" style={{ color: textColor }}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Debug indicator - remove in production */}
        {process.env.NODE_ENV === "development" && (
          <div className="absolute top-full left-4 bg-black text-white px-2 py-1 text-xs rounded">
            Current: {currentSection}
          </div>
        )}
      </nav>

      {isMenuOpen && (
        <div
          className={`md:hidden fixed inset-0 z-60 transition-all duration-500 ease-out ${
            isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
          style={{
            background: "rgba(37, 36, 33, 0.95)",
            backdropFilter: "blur(12px)",
            transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 z-50 p-2 text-white hover:text-amber-300 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="p-8 w-full h-full flex flex-col justify-between">
            {/* Header with Logo and Language */}
            <header
              className={`flex justify-between items-center text-white mb-8 transition-all duration-700 delay-100 ${
                isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
              }`}
            >
              <div className="flex items-center">
                <img
                  src={getImagePath("/images/logo.png") || "/placeholder.svg"}
                  alt="Kafeinë"
                  className="h-16 w-auto object-contain filter brightness-0 invert"
                />
              </div>
              {onLanguageChange && (
                <div className="flex items-center space-x-2 border-b border-amber-400 pb-1">
                  <div className="w-4 h-4 rounded-full bg-amber-400"></div>
                  <LanguageToggle onLanguageChange={onLanguageChange} currentLang={language} />
                </div>
              )}
            </header>

            {/* Main Navigation Cards */}
            <nav
              className={`flex-grow flex items-center justify-center transition-all duration-700 delay-200 ${
                isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <ul className="w-full max-w-sm space-y-4">
                {Object.entries(t).map(([key, label], index) => {
                  if (
                    key === "home" ||
                    key === "about" ||
                    key === "menu" ||
                    key === "gallery" ||
                    key === "reviews" ||
                    key === "contact"
                  ) {
                    return (
                      <li
                        key={key}
                        className={`transition-all duration-500 ${
                          isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                        }`}
                        style={{
                          transitionDelay: `${300 + index * 100}ms`,
                        }}
                      >
                        <button
                          onClick={() => scrollToSection(key)}
                          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-800/80 to-amber-900/80 text-white font-medium shadow-lg flex items-center space-x-4 transition-all duration-300 hover:from-amber-700 hover:to-amber-800 hover:scale-105 hover:shadow-xl border border-amber-600/30 active:scale-95 active:shadow-md transform-gpu"
                          onTouchStart={(e) => {
                            const target = e.currentTarget
                            if (target && target.style) {
                              target.style.transform = "scale(0.95)"
                            }
                          }}
                          onTouchEnd={(e) => {
                            const target = e.currentTarget
                            if (target && target.style) {
                              setTimeout(() => {
                                if (target.style) {
                                  target.style.transform = "scale(1)"
                                }
                              }, 150)
                            }
                          }}
                        >
                          <div className="text-amber-300 transition-transform duration-200 group-hover:scale-110">
                            {getNavIcon(key)}
                          </div>
                          <span className="text-lg">{label}</span>
                        </button>
                      </li>
                    )
                  }
                  return null
                })}
              </ul>
            </nav>

            {/* Footer with Contact Info */}
            <div
              className={`flex flex-col items-center space-y-6 transition-all duration-700 delay-500 ${
                isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-30"></div>

              {/* Contact Cards */}
              <div className="w-full max-w-sm space-y-3">
                <a
                  href="tel:+38349123456"
                  className="flex items-center space-x-3 text-white/80 hover:text-white transition-all duration-200 p-3 rounded-lg hover:bg-white/10 hover:scale-105 active:scale-95"
                >
                  <Phone className="w-5 h-5 text-amber-400 transition-transform duration-200 hover:scale-110" />
                  <span className="text-sm">+383 49 123 456</span>
                </a>

                <a
                  href="mailto:info@kafeine.com"
                  className="flex items-center space-x-3 text-white/80 hover:text-white transition-all duration-200 p-3 rounded-lg hover:bg-white/10 hover:scale-105 active:scale-95"
                >
                  <Mail className="w-5 h-5 text-amber-400 transition-transform duration-200 hover:scale-110" />
                  <span className="text-sm">info@kafeine.com</span>
                </a>
              </div>

              {/* Social Media */}
              <div className="flex space-x-6 text-white/60">
                <a
                  href="#"
                  className="hover:text-amber-400 transition-all duration-200 transform hover:scale-125 active:scale-110"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="hover:text-amber-400 transition-all duration-200 transform hover:scale-125 active:scale-110"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="hover:text-amber-400 transition-all duration-200 transform hover:scale-125 active:scale-110"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.073-1.689-.073-4.948 0-3.259.013-3.668.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export { Navigation }
export default Navigation
