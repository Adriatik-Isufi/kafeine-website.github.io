"use client"

import { Phone, Mail, MapPin } from "lucide-react"
import { getImagePath } from "@/lib/utils"

interface FooterProps {
  language?: "sq" | "en"
}

const translations = {
  sq: {
    description: "Kafeinë - Kafeja më e mirë në zemër të Prishtinës. Vizitoni na për një përvojë të paharrueshme.",
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
    description: "Kafeinë - The finest coffee in the heart of Pristina. Visit us for an unforgettable experience.",
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
              <img src={getImagePath("/images/logo.png")} alt="Kafeinë" className="h-10 w-auto object-contain" />
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
                <span className="text-gray-300 text-sm">+383 48 419 418</span>
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
        </div>
      </div>
    </footer>
  )
}

export default Footer
