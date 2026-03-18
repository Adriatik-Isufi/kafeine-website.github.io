"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import HalloweenModal from "@/components/halloween-modal"
import EidModal from "@/components/eid-modal"

export default function EventsPage() {
  const [language, setLanguage] = useState<"sq" | "en">("sq")
  const [halloweenModalOpen, setHalloweenModalOpen] = useState(false)
  const [eidModalOpen, setEidModalOpen] = useState(false)

  const translations = {
    sq: {
      title: "Celebrations",
      subtitle: "Shfletoni ngjarjet tona të kaluara dhe të ardhshme",
      halloween: {
        title: "Halloween 2025",
        date: "Tetor 2025",
        description: "Atmosferë spooky, shije të veçanta dhe momente të paharrueshme në Kafeinë.",
      },
      eid: {
        title: "Fitër Bajrami 2026",
        date: "30 Mars 2026",
        description: "Ëmbëlsira të veçanta për Fitër Bajram — Lotus dhe Forest Fruit Cheesecake.",
        comingSoon: "Së shpejti",
      },
    },
    en: {
      title: "Celebrations",
      subtitle: "Browse our past and upcoming events",
      halloween: {
        title: "Halloween 2025",
        date: "October 2025",
        description: "Spooky atmosphere, special treats, and unforgettable moments at Kafeinë.",
      },
      eid: {
        title: "Eid al-Fitr 2026",
        date: "30 March 2026",
        description: "Special Eid treats — Lotus and Forest Fruit Cheesecake.",
        comingSoon: "Coming Soon",
      },
    },
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-[#252421]">
      <Navigation language={language} onLanguageChange={setLanguage} isCareerPage={true} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-center">{t.title}</h1>
          <p className="text-xl text-[#e2ba84] text-center">{t.subtitle}</p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Halloween 2025 Event Card */}
            <button
              onClick={() => setHalloweenModalOpen(true)}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1918] to-[#252421] border-2 border-[#e18b1a]/30 hover:border-[#e18b1a] transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#e18b1a]/20"
            >
              <div className="aspect-[3/5] relative overflow-hidden">
                <img
                  src="/celebrations/halloween-2025/poster-portrait.png"
                  alt="Halloween 2025"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                <p className="text-[#e18b1a] text-sm font-semibold mb-2">{t.halloween.date}</p>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#e18b1a] transition-colors">
                  {t.halloween.title}
                </h3>
                <p className="text-[#e2ba84] text-sm line-clamp-2">{t.halloween.description}</p>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-[#e18b1a]/0 group-hover:bg-[#e18b1a]/10 transition-all duration-300" />
            </button>

            {/* Eid al-Fitr 2026 Event Card */}
            <button
              onClick={() => setEidModalOpen(true)}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2a1f12] to-[#1a1208] border-2 border-[#b8956a]/30 hover:border-[#b8956a] transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#b8956a]/20"
            >
              <div className="aspect-[3/5] relative overflow-hidden">
                <img
                  src="/celebrations/eid-2026/eid_fiter_2026_1.webp"
                  alt="Eid al-Fitr 2026"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                <p className="text-[#b8956a] text-sm font-semibold mb-2">{t.eid.date}</p>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#b8956a] transition-colors">
                  {t.eid.title}
                </h3>
                <p className="text-[#e2ba84] text-sm line-clamp-2">{t.eid.description}</p>
              </div>

              <div className="absolute inset-0 bg-[#b8956a]/0 group-hover:bg-[#b8956a]/10 transition-all duration-300" />
            </button>
          </div>
        </div>
      </section>

      <Footer language={language} />

      <HalloweenModal open={halloweenModalOpen} onOpenChange={setHalloweenModalOpen} />
      <EidModal open={eidModalOpen} onOpenChange={setEidModalOpen} />
    </div>
  )
}
