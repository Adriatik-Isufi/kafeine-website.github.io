"use client"

interface AboutSectionProps {
  language: "sq" | "en"
}

const translations = {
  sq: {
    title: "Rreth Nesh",
    story: "Historia Jonë",
    description:
      "Kafeinë u themelua me pasionin për të sjellë kafenë më të mirë në Prishtinë. Ne përdorim vetëm kokrra kafe të zgjedhura me kujdes dhe i pjekim ato çdo ditë për të siguruar shijen më të freskët.",
    mission: "Misioni Ynë",
    missionText:
      "Të krijojmë një hapësirë të ngrohtë ku komuniteti ynë mund të bashkohet, të shijoni kafenë e shkëlqyer, pijet e ndryshme dhe ëmbëlsirat e bëra me dorë në një atmosferë miqësore dhe të përshtatshme.",
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
      "Kafeinë was founded with a passion for bringing the finest coffee to Pristina. We use only carefully selected coffee beans and roast them daily to ensure the freshest taste.",
    mission: "Our Mission",
    missionText:
      "To create a warm space where our community can come together, enjoy excellent coffee, variety of drinks and handmade desserts in a friendly and welcoming atmosphere.",
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
            <video
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2025-05-14_09-30-40_UTC-aycOG1Go9UmBZKPGnM0T8vFWWZOh6G.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="rounded-lg shadow-xl w-full h-[500px] object-cover"
            />
          </div>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-foreground mb-8">{t.values}</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center bg-card p-8 rounded-lg shadow-lg">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">☕</span>
            </div>
            <h4 className="text-xl font-bold text-foreground mb-3">{t.quality}</h4>
            <p className="text-muted-foreground">{t.qualityText}</p>
          </div>
          <div className="text-center bg-card p-8 rounded-lg shadow-lg">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h4 className="text-xl font-bold text-foreground mb-3">{t.community}</h4>
            <p className="text-muted-foreground">{t.communityText}</p>
          </div>
          <div className="text-center bg-card p-8 rounded-lg shadow-lg">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "#252421" }}
            >
              <span className="text-2xl text-white">🏛️</span>
            </div>
            <h4 className="text-xl font-bold text-foreground mb-3">{t.tradition}</h4>
            <p className="text-muted-foreground">{t.traditionText}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
