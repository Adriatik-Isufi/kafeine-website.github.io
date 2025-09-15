"use client"

import { Phone, Mail, MapPin } from "lucide-react"
import { getImagePath } from "@/lib/utils"

interface FooterProps {
  language?: "sq" | "en"
}

const translations = {
  sq: {
    description:
      "Kafeinë – Në zemër të Prishtinës, ku aroma e kafesë, ëmbëlsirat e ëmbla dhe miqësia krijojnë një përvojë të paharrueshme.",
    quickLinks: "Lidhje të Shpejta",
    home: "Kreu",
    about: "Rreth Nesh",
    menu: "Menyja",
    contact: "Kontakti",
    contactInfo: "Informacioni i Kontaktit",
    address: "Luan Haradinaj, 92, Prishtinë, Kosovë",
    followUs: "Na Ndiqni",
    rights: "Të gjitha të drejtat e rezervuara.",
    hours: "Orari",
    hoursText: "Hënë - Diel: 07:00 - 23:00",
  },
  en: {
    description: "Kafeinë – In the heart of Pristina, where the aroma of coffee, sweet desserts and friendship create an unforgettable experience.",
    quickLinks: "Quick Links",
    home: "Home",
    about: "About",
    menu: "Menu",
    contact: "Contact",
    contactInfo: "Contact Information",
    address: "Luan Haradinaj, 92, Pristina, Kosovo",
    followUs: "Follow Us",
    rights: "All rights reserved.",
    hours: "Hours",
    hoursText: "Mon - Sun: 07:00 - 23:00",
  },
}

export function Footer({ language = "sq" }: FooterProps) {
  const t = translations[language]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-[#1a1a1a] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src={getImagePath("/images/logo.png") || "/placeholder.svg"}
                alt="Kafeinë"
                className="h-10 w-auto object-contain"
              />
              <span className="text-2xl font-bold text-[#e18b1a]">Kafeinë</span>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-md">{t.description}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#e18b1a]">{t.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-gray-300 hover:text-[#e18b1a] transition-colors"
                >
                  {t.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-gray-300 hover:text-[#e18b1a] transition-colors"
                >
                  {t.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("menu")}
                  className="text-gray-300 hover:text-[#e18b1a] transition-colors"
                >
                  {t.menu}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-300 hover:text-[#e18b1a] transition-colors"
                >
                  {t.contact}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#e18b1a]">{t.contactInfo}</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#e18b1a]" />
                <span className="text-gray-300 text-sm">{t.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#e18b1a]" />
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center gap-2">
                    <a href="tel:+38348419418" className="text-gray-300 text-sm hover:text-[#e18b1a] transition-colors">
                      +383 48 419 418
                    </a>
                    <button
                      onClick={() => window.open(`https://wa.me/38348419418`, "_blank")}
                      className="w-4 h-4 text-green-400 hover:text-green-300 transition-colors"
                      title="WhatsApp"
                    >
                      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href="tel:+38348514516" className="text-gray-300 text-sm hover:text-[#e18b1a] transition-colors">
                      +383 48 514 516
                    </a>
                    <button
                      onClick={() => window.open(`https://wa.me/38348514516`, "_blank")}
                      className="w-4 h-4 text-green-400 hover:text-green-300 transition-colors"
                      title="WhatsApp"
                    >
                      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#e18b1a]" />
                <span className="text-gray-300 text-sm">kafeine.ks@gmail.com</span>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold mb-3 text-[#e18b1a]">{t.followUs}</h5>
              <div className="flex space-x-3">
                <a
                  href="https://www.instagram.com/kafeine.ks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-[#e18b1a]/20 rounded-full flex items-center justify-center hover:bg-[#e18b1a]/30 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.073-1.689-.073-4.948 0-3.259.013-3.668.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61567364573918"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-[#e18b1a]/20 rounded-full flex items-center justify-center hover:bg-[#e18b1a]/30 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@kafeine.ks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-[#e18b1a]/20 rounded-full flex items-center justify-center hover:bg-[#e18b1a]/30 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2024 Kafeinë. {t.rights}</p>
          <p className="text-gray-500 text-xs mt-2 flex items-center justify-center gap-1">
            Built by 
            <a 
              href="https://www.linkedin.com/in/adriatik-isufi-861b67320/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#e18b1a] hover:text-[#f4a127] transition-colors flex items-center gap-1 font-medium"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Adriatik Isufi
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
