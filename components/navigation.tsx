"use client"

import { useState, useEffect } from "react"
import { LanguageToggle } from "./language-toggle"
import { getImagePath } from "@/lib/utils"
import { Menu, X, Phone, Mail, Home, Info, Utensils, ImageIcon, Star, MessageCircle, Laptop } from "lucide-react"

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
    workspace: "Hapësira Pune",
    gallery: "Galeria",
    reviews: "Vlerësimet",
    contact: "Kontakti",
  },
  en: {
    home: "Home",
    about: "About",
    menu: "Menu",
    workspace: "Workspace",
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
      const sections = ["home", "about", "menu", "workspace", "gallery", "reviews", "contact"]
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
      home: "white", // Dark background sections
      about: "#252421", // Light background sections
      menu: "white", // Dark background sections
      workspace: "#252421", // Light background sections
      gallery: "#252421", // Light background sections
      reviews: "white", // Dark background sections
      contact: "white", // Dark background sections (contact has dark gradient)
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
      case "workspace":
        return <Laptop className="w-5 h-5" />
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isCareerPage ? "career-nav" : ""}`}
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
                key === "workspace" ||
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

          <div className="p-4 pt-16 pb-8 w-full h-full flex flex-col justify-between overflow-y-auto">
            {/* Header with Logo and Language */}
            <header
              className={`flex justify-between items-center text-white mb-6 transition-all duration-700 delay-100 ${
                isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
              }`}
            >
              <div className="flex items-center">
                <img
                  src={getImagePath("/images/logo.png") || "/placeholder.svg"}
                  alt="Kafeinë"
                  className="h-20 w-auto object-contain filter brightness-0 invert"
                />
              </div>
              {onLanguageChange && (
                <div className="flex items-center space-x-2 border-b border-amber-400 pb-1">
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <LanguageToggle onLanguageChange={onLanguageChange} currentLang={language} />
                </div>
              )}
            </header>

            {/* Main Navigation Cards */}
            <nav
              className={`flex-grow flex items-start justify-center pt-4 transition-all duration-700 delay-200 ${
                isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <ul className="w-full max-w-sm space-y-3">
                {Object.entries(t).map(([key, label], index) => {
                  if (
                    key === "home" ||
                    key === "about" ||
                    key === "menu" ||
                    key === "workspace" ||
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
                          className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-amber-800/80 to-amber-900/80 text-white font-medium shadow-lg flex items-center space-x-3 transition-all duration-300 hover:from-amber-700 hover:to-amber-800 hover:scale-105 hover:shadow-xl border border-amber-600/30 active:scale-95 active:shadow-md transform-gpu"
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
                          <span className="text-base">{label}</span>
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
              className={`flex flex-col items-center space-y-4 mt-6 transition-all duration-700 delay-500 ${
                isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-30"></div>

              {/* Contact Cards */}
              <div className="w-full max-w-sm space-y-2">
                {/* Phone Number 1 with WhatsApp */}
                <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                  <div className="flex items-center justify-between">
                    <a
                      href="tel:+38348419418"
                      className="flex items-center space-x-2 text-white/80 hover:text-white transition-all duration-200 p-1 rounded hover:bg-white/10 flex-1"
                    >
                      <Phone className="w-4 h-4 text-amber-400" />
                      <span className="text-sm">+383 48 419 418</span>
                    </a>
                    <a
                      href="https://wa.me/38348419418"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-green-400 hover:text-green-300 transition-all duration-200 p-1 rounded hover:bg-green-400/10"
                      title="WhatsApp"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                      <span className="text-xs">WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Phone Number 2 with WhatsApp */}
                <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                  <div className="flex items-center justify-between">
                    <a
                      href="tel:+38348514516"
                      className="flex items-center space-x-2 text-white/80 hover:text-white transition-all duration-200 p-1 rounded hover:bg-white/10 flex-1"
                    >
                      <Phone className="w-4 h-4 text-amber-400" />
                      <span className="text-sm">+383 48 514 516</span>
                    </a>
                    <a
                      href="https://wa.me/38348514516"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-green-400 hover:text-green-300 transition-all duration-200 p-1 rounded hover:bg-green-400/10"
                      title="WhatsApp"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                      <span className="text-xs">WhatsApp</span>
                    </a>
                  </div>
                </div>

                <a
                  href="mailto:kafeine.ks@gmail.com"
                  className="flex items-center space-x-3 text-white/80 hover:text-white transition-all duration-200 p-2 rounded-lg hover:bg-white/10 hover:scale-105 active:scale-95"
                >
                  <Mail className="w-4 h-4 text-amber-400 transition-transform duration-200 hover:scale-110" />
                  <span className="text-sm break-all">kafeine.ks@gmail.com</span>
                </a>
              </div>

              {/* Social Media */}
              <div className="flex space-x-6 text-white/60">
                <a
                  href="https://www.instagram.com/kafeine.ks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-all duration-200 transform hover:scale-125 active:scale-110"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.073-1.689-.073-4.948 0-3.259.013-3.668.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61567364573918"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-all duration-200 transform hover:scale-125 active:scale-110"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@kafeine.ks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-all duration-200 transform hover:scale-125 active:scale-110"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
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
