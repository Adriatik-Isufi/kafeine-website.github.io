"use client"

import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react"

interface FooterProps {
  language?: "sq" | "en"
}

const translations = {
  sq: {
    description: "Kafeinë - Kafeja më e mirë në zemër të Tiranës. Vizitoni na për një përvojë të paharrueshme.",
    quickLinks: "Lidhje të Shpejta",
    home: "Kreu",
    about: "Rreth Nesh",
    menu: "Menyja",
    contact: "Kontakti",
    contactInfo: "Informacioni i Kontaktit",
    address: "Rruga e Kavajës, Tiranë",
    followUs: "Na Ndiqni",
    rights: "Të gjitha të drejtat e rezervuara.",
  },
  en: {
    description: "Kafeinë - The finest coffee in the heart of Tirana. Visit us for an unforgettable experience.",
    quickLinks: "Quick Links",
    home: "Home",
    about: "About",
    menu: "Menu",
    contact: "Contact",
    contactInfo: "Contact Information",
    address: "Kavaja Street, Tirana",
    followUs: "Follow Us",
    rights: "All rights reserved.",
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
    <footer className="bg-accent text-accent-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/images/logo.png" alt="Kafeinë" className="h-8 w-8" />
              <span className="text-2xl font-bold">Kafeinë</span>
            </div>
            <p className="text-accent-foreground/80 leading-relaxed max-w-md">{t.description}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-accent-foreground/80 hover:text-accent-foreground transition-colors"
                >
                  {t.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-accent-foreground/80 hover:text-accent-foreground transition-colors"
                >
                  {t.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("menu")}
                  className="text-accent-foreground/80 hover:text-accent-foreground transition-colors"
                >
                  {t.menu}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-accent-foreground/80 hover:text-accent-foreground transition-colors"
                >
                  {t.contact}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t.contactInfo}</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="text-accent-foreground/80 text-sm">{t.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="text-accent-foreground/80 text-sm">+355 69 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="text-accent-foreground/80 text-sm">info@kafeine.al</span>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold mb-3">{t.followUs}</h5>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="w-8 h-8 bg-accent-foreground/10 rounded-full flex items-center justify-center hover:bg-accent-foreground/20 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-accent-foreground/10 rounded-full flex items-center justify-center hover:bg-accent-foreground/20 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-accent-foreground/20 mt-12 pt-8 text-center">
          <p className="text-accent-foreground/60 text-sm">© 2024 Kafeinë. {t.rights}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
