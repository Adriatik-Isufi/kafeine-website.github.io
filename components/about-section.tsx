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
      "Të krijojmë një hapësirë të ngrohtë dhe mikpritëse ku miqtë, familjet dhe komuniteti ynë mund të shijojnë produkte të përgatitur me kujdes, në një atmosferë që frymëzon relaks dhe bashkëbisedim.",
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-[400px]">
              {/* First Video - Our Story */}
              <div className="relative group overflow-hidden rounded-lg shadow-lg">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                >
                  <source src="/videos/about-kafeine2.mp4" type="video/mp4" />
                  <source src="/videos/about-kafeine.mp4" type="video/mp4" />
                  <div className="bg-gradient-to-br from-amber-100 to-amber-200 w-full h-full flex items-center justify-center rounded-lg">
                    <p className="text-amber-800 text-sm font-medium">Loading...</p>
                  </div>
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-medium">
                  Our Story
                </div>
              </div>

              {/* Second Video - Experience */}
              <div className="relative group overflow-hidden rounded-lg shadow-lg">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                >
                  <source src="/videos/about-kafeine.mp4" type="video/mp4" />
                  <div className="bg-gradient-to-br from-orange-100 to-orange-200 w-full h-full flex items-center justify-center rounded-lg">
                    <p className="text-orange-800 text-sm font-medium">Loading...</p>
                  </div>
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-medium">
                  Experience
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full blur-sm" />
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-amber-400/30 rounded-full blur-sm" />
          </div>
        </div>

        <div className="border-t border-border/40 pt-16 mt-4">
          <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-12 text-center">{t.values}</h3>

          <div className="grid sm:grid-cols-3 gap-px bg-border/30 rounded-xl overflow-hidden">
            {/* Quality */}
            <div className="group bg-card/60 hover:bg-card transition-colors duration-300 p-8 flex flex-col gap-5">
              <div className="w-8 h-8 text-primary/70 group-hover:text-primary transition-colors duration-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l2.09 6.26L20 9.27l-4.91 4.78L16.18 21 12 18.27 7.82 21l1.09-6.95L4 9.27l5.91-.01z" />
                </svg>
              </div>
              <div>
                <h4 className="text-base font-semibold text-foreground mb-2 tracking-wide">{t.quality}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.qualityText}</p>
              </div>
            </div>

            {/* Community */}
            <div className="group bg-card/60 hover:bg-card transition-colors duration-300 p-8 flex flex-col gap-5">
              <div className="w-8 h-8 text-primary/70 group-hover:text-primary transition-colors duration-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div>
                <h4 className="text-base font-semibold text-foreground mb-2 tracking-wide">{t.community}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.communityText}</p>
              </div>
            </div>

            {/* Tradition */}
            <div className="group bg-card/60 hover:bg-card transition-colors duration-300 p-8 flex flex-col gap-5">
              <div className="w-8 h-8 text-primary/70 group-hover:text-primary transition-colors duration-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div>
                <h4 className="text-base font-semibold text-foreground mb-2 tracking-wide">{t.tradition}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.traditionText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
