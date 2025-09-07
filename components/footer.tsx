"use client"

import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react"
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
    address: "Luan Haradinaj, 92, Prishtinë",
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
    address: "Luan Haradinaj, 92, Pristina",
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
                  href="https://www.instagram.com/kafeine.ks/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-[#e18b1a]/20 rounded-full flex items-center justify-center hover:bg-[#e18b1a]/30 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#e18b1a]" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-[#e18b1a]/20 rounded-full flex items-center justify-center hover:bg-[#e18b1a]/30 transition-colors"
                >
                  <Facebook className="w-4 h-4 text-[#e18b1a]" />
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
