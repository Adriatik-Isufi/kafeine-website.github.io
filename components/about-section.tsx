"use client"

interface AboutSectionProps {
  language: "sq" | "en"
}

const translations = {
  sq: {
    title: "Rreth Nesh",
    story: "Historia Jonë",
    description:
      "Kafeinë lindi nga dashuria për kafenë, por edhe për gjithçka që e shoqëron atë. Nga espresso klasike deri te iced teas freskuese, mocha, çokollata të ngrohta, ëmbëlsira artizanale dhe ushqime të lehta – ne përpiqemi të sjellim diçka për secilin shije.",
    mission: "Misioni Ynë",
    missionText:
      "Të krijojmë një hapësirë të ngrohtë dhe mikpritëse ku miqtë, familjet dhe komuniteti ynë mund të shijojnë produkte të përgatitura me kujdes, në një atmosferë që frymëzon relaks dhe bashkëbisedim.",
    values: "Vlerat Tona",
    quality: "Cilësia",
    qualityText: "Përdorim vetëm përbërës të cilësisë së lartë",
    community: "Komuniteti",
    communityText: "Mbështesim prodhuesit lokalë dhe komunitetin",
    tradition: "Tradita",
    traditionText: "Respektojmë traditat e kafesë shqiptare",
  },
  en: {
    title: "About Us",
    story: "Our Story",
    description:
      "Kafeinë was born from a love for coffee, but also for everything that accompanies it. From classic espressos to refreshing iced teas, mochas, hot chocolates, artisanal desserts and light foods – we strive to bring something for every taste.",
    mission: "Our Mission",
    missionText:
      "To create a warm and welcoming space where friends, families and our community can enjoy carefully prepared products, in an atmosphere that inspires relaxation and conversation.",
    values: "Our Values",
    quality: "Quality",
    qualityText: "We use only the highest quality ingredients",
    community: "Community",
    communityText: "We support local producers and community",
    tradition: "Tradition",
    traditionText: "We respect Albanian coffee traditions",
  },
}

export function AboutSection({ language }: AboutSectionProps) {
  const t = translations[language]

  return (
    <section id="about" className="py-20 bg-muted relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">{t.title}</h2>
            <h3 className="text-2xl font-bold text-foreground mb-4">{t.story}</h3>
            <p className="text-lg leading-relaxed mb-6">{t.description}</p>
            <h3 className="text-2xl font-bold text-foreground mb-4">{t.mission}</h3>
            <p className="text-lg leading-relaxed">{t.missionText}</p>
          </div>
          <div className="relative">
            <video autoPlay muted loop playsInline className="rounded-lg shadow-xl w-full h-[500px] object-cover">
              {/* Primary source - Local video */}
              <source src="/videos/about-kafeine.mp4" type="video/mp4" />
              {/* Fallback source - Vercel Blob Storage */}
              <source
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2025-05-14_09-30-40_UTC-aycOG1Go9UmBZKPGnM0T8vFWWZOh6G.mp4"
                type="video/mp4"
              />
              {/* Fallback content for browsers that don't support video */}
              <div className="bg-gradient-to-br from-amber-100 to-amber-200 w-full h-full flex items-center justify-center rounded-lg">
                <p className="text-amber-800 text-lg font-medium">Loading coffee experience...</p>
              </div>
            </video>
          </div>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-foreground mb-8">{t.values}</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="group bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl">☕</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-bold text-foreground mb-2">{t.quality}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.qualityText}</p>
              </div>
            </div>
          </div>

          <div className="group bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl">🤝</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-bold text-foreground mb-2">{t.community}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.communityText}</p>
              </div>
            </div>
          </div>

          <div className="group bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-md hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-stone-600 to-stone-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl text-white">🏛️</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-bold text-foreground mb-2">{t.tradition}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.traditionText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
