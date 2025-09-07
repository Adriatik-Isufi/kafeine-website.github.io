"use client"

import { Wifi, Zap, Coffee, Users, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import { getImagePath } from "@/lib/utils"

interface WorkSectionProps {
  language: "sq" | "en"
}

const translations = {
  sq: {
    title: "Hapësira Pune",
    subtitle: "Vendi perfekt për të punuar dhe studiuar",
    description:
      "Kafeinë ofron një mjedis të qetë dhe të rehatshëm për të gjithë ata që duan të punojnë ose studiojnë. Me Wi-Fi të shpejtë, priza për karikimin e pajisjeve dhe atmosferë të ngrohtë.",
    features: "Përparësitë",
    wifi: "Wi-Fi Falas",
    wifiDesc: "Internet i shpejtë dhe i qëndrueshëm",
    power: "Priza Karikimi",
    powerDesc: "Priza të disponueshme në çdo tavolinë",
    quiet: "Zonë e Qetë",
    quietDesc: "Hapësira e dedikuar për punë dhe studim",
    comfort: "Ulëse të Rehatshme",
    comfortDesc: "Karrige dhe tavolina ergonomike",
    hours: "Orari i Punës",
    hoursDesc: "E hapur çdo ditë nga 07:00 - 23:00",
    location: "Lokacioni",
    locationDesc: "Në qendër të Prishtinës, lehtë i arritshëm",
    workHere: "Puno Këtu",
    workDescription:
      "Sill laptopën tënde, porosit kafenë e preferuar dhe gëzo një ditë produktive në mjedisin tonë të ngrohtë dhe frymëzues.",
    cta: "Eja dhe Puno me Ne!",
    ctaDesc: "Çdo ditë nga 07:00 deri në 23:00, hapësira jonë është e gatshme për ju. Thjesht ejani, zgjidhni tavolinën tuaj të preferuar dhe filloni punën.",
  },
  en: {
    title: "Workspace",
    subtitle: "The perfect place to work and study",
    description:
      "Kafeinë offers a quiet and comfortable environment for everyone who wants to work or study. With fast Wi-Fi, charging outlets, and a warm atmosphere.",
    features: "Features",
    wifi: "Free Wi-Fi",
    wifiDesc: "Fast and reliable internet connection",
    power: "Charging Outlets",
    powerDesc: "Power outlets available at every table",
    quiet: "Quiet Zone",
    quietDesc: "Dedicated space for work and study",
    comfort: "Comfortable Seating",
    comfortDesc: "Ergonomic chairs and tables",
    hours: "Working Hours",
    hoursDesc: "Open daily from 07:00 - 23:00",
    location: "Location",
    locationDesc: "In the center of Pristina, easily accessible",
    workHere: "Work Here",
    workDescription:
      "Bring your laptop, order your favorite coffee and enjoy a productive day in our warm and inspiring environment.",
    cta: "Come and Work with Us!",
    ctaDesc: "Every day from 07:00 to 23:00, our space is ready for you. Just come, choose your preferred table and start working.",
  },
}

export function WorkSection({ language }: WorkSectionProps) {
  const t = translations[language]

  const features = [
    { icon: Wifi, title: t.wifi, desc: t.wifiDesc },
    { icon: Zap, title: t.power, desc: t.powerDesc },
    { icon: Users, title: t.quiet, desc: t.quietDesc },
  ]

  const bottomFeatures = [
    { icon: Coffee, title: t.comfort, desc: t.comfortDesc },
    { icon: Clock, title: t.hours, desc: t.hoursDesc },
    { icon: MapPin, title: t.location, desc: t.locationDesc },
  ]

  return (
    <section id="workspace" className="py-20 bg-gradient-to-br from-background via-muted/20 to-primary/5 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">{t.title}</h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">{t.subtitle}</p>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto text-muted-foreground">{t.description}</p>
        </div>

        {/* Main Content Grid with Asymmetric Layout */}
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 mb-20">
            
            {/* Left Column - Features + First Image */}
            <div className="lg:col-span-5 space-y-6">
              {/* Feature Cards */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="group relative overflow-hidden"
                  >
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/60 backdrop-blur-sm border border-primary/10 hover:bg-white/80 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-1 text-foreground">{feature.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Woman with Tea Image - Positioned below features */}
              <div className="relative group cursor-pointer">
                <div className="overflow-hidden rounded-3xl shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
                  <Image
                    src={getImagePath("/New Batch/DNnqzMuIqqi_7.jpg")}
                    alt="Woman with tea"
                    width={500}
                    height={400}
                    className="w-full h-[320px] object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>

            {/* Right Column - Hero Image + Overlapping Elements */}
            <div className="lg:col-span-7 relative">
              {/* Main Hero Image */}
              <div className="relative">
                <div className="overflow-hidden rounded-3xl shadow-2xl transform rotate-1 hover:rotate-0 transition-all duration-500">
                  <Image
                    src={getImagePath("/images/workspace.png")}
                    alt="Woman working in coffee shop"
                    width={700}
                    height={500}
                    className="w-full h-[600px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Text Overlay */}
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <h3 className="text-3xl font-bold mb-3">{t.workHere}</h3>
                    <p className="text-white/90 text-lg leading-relaxed max-w-xl">{t.workDescription}</p>
                  </div>
                </div>

                {/* Floating Coffee Cup Image - Top Right */}
                <div className="absolute -top-12 -right-8 w-72 h-48 hidden lg:block">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500 border-4 border-white">
                    <Image
                      src={getImagePath("/New Batch/DNz_ox82HJV_1.jpg")}
                      alt="Coffee and laptop"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Bottom Feature Cards - Floating Style */}
                <div className="absolute -bottom-16 left-0 right-0 hidden lg:flex justify-center gap-4 px-8">
                  {bottomFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-primary/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                      style={{
                        transform: `translateY(${index * 10}px) rotate(${index % 2 === 0 ? -1 : 1}deg)`,
                      }}
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-foreground">{feature.title}</h4>
                        <p className="text-muted-foreground text-xs">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Bottom Features */}
          <div className="lg:hidden grid sm:grid-cols-2 gap-4 mb-16 mt-8">
            {bottomFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-primary/10 hover:bg-white/80 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">{feature.title}</h4>
                  <p className="text-muted-foreground text-xs">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section with Modern Design */}
          <div className="relative mt-24 lg:mt-32">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-3xl" />
            <div className="relative bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-3xl p-12 border border-primary/20 shadow-2xl">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {t.cta}
                </h3>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  {t.ctaDesc}
                </p>
                
                {/* Feature Pills */}
                <div className="flex flex-wrap justify-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                    <Wifi className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Wi-Fi Falas</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full">
                    <Zap className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-medium text-foreground">Priza Karikimi</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                    <Coffee className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Kafe e Freskët</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}