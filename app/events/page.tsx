"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import HalloweenModal from "@/components/halloween-modal"

export default function EventsPage() {
  const [language, setLanguage] = useState<"sq" | "en">("sq")
  const [halloweenModalOpen, setHalloweenModalOpen] = useState(false)

  const translations = {
    sq: {
      title: "Celebrations",
      subtitle: "Shfletoni ngjarjet tona të kaluara dhe të ardhshme",
      halloween: {
        title: "Halloween 2025",
        date: "Tetor 2025",
        description: "Atmosferë spooky, shije të veçanta dhe momente të paharrueshme në Kafeinë.",
      },
      newYear: {
        title: "Viti i Ri 2026",
        date: "Dhjetor 2025 - Janar 2026",
        description: "Festoni fundin e vitit me pije dhe ëmbëlsira të veçanta në Kafeinë.",
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
      newYear: {
        title: "New Year 2026",
        date: "December 2025 - January 2026",
        description: "Celebrate the end of the year with special drinks and treats at Kafeinë.",
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Halloween 2025 Event Card */}
            <button
              onClick={() => setHalloweenModalOpen(true)}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1918] to-[#252421] border-2 border-[#e18b1a]/30 hover:border-[#e18b1a] transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#e18b1a]/20"
            >
              <div className="aspect-[3/5] relative overflow-hidden">
                <img
                  src="/halloween-2025/poster-portrait.png"
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

            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a3a4a] to-[#0a1520] border-2 border-[#e18b1a]/30 cursor-default">
              <div className="aspect-[3/5] relative overflow-hidden bg-gradient-to-br from-[#1a3a4a] to-[#0a1520] flex items-center justify-center">
                {/* Coming Soon Badge */}
                <div className="absolute top-6 right-6 bg-[#e18b1a] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg z-10">
                  {t.newYear.comingSoon}
                </div>

                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 text-6xl">🎉</div>
                  <div className="absolute top-20 right-20 text-5xl">✨</div>
                  <div className="absolute bottom-20 left-20 text-5xl">🥂</div>
                  <div className="absolute bottom-10 right-10 text-6xl">🎊</div>
                </div>

                {/* Large centered text */}
                <div className="text-center z-10">
                  <h3 className="text-6xl font-bold text-white mb-4">2026</h3>
                  <p className="text-2xl text-[#e2ba84]">{language === "sq" ? "Viti i Ri" : "New Year"}</p>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                <p className="text-[#e18b1a] text-sm font-semibold mb-2">{t.newYear.date}</p>
                <h3 className="text-2xl font-bold text-white mb-2">{t.newYear.title}</h3>
                <p className="text-[#e2ba84] text-sm line-clamp-2">{t.newYear.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer language={language} />

      <HalloweenModal open={halloweenModalOpen} onOpenChange={setHalloweenModalOpen} />
    </div>
  )
}
