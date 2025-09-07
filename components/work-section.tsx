"use client"

import { Wifi, Zap, Coffee, Users, Clock, MapPin } from "lucide-react"
import Image from "next/image"

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
  },
}

export function WorkSection({ language }: WorkSectionProps) {
  const t = translations[language]

  const features = [
    { icon: Wifi, title: t.wifi, desc: t.wifiDesc },
    { icon: Zap, title: t.power, desc: t.powerDesc },
    { icon: Users, title: t.quiet, desc: t.quietDesc },
    { icon: Coffee, title: t.comfort, desc: t.comfortDesc },
    { icon: Clock, title: t.hours, desc: t.hoursDesc },
    { icon: MapPin, title: t.location, desc: t.locationDesc },
  ]

  return (
    <section id="workspace" className="py-20 bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">{t.title}</h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">{t.subtitle}</p>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto text-muted-foreground">{t.description}</p>
        </div>

        <div className="relative mb-20">
          {/* Main content area with overlapping images */}
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left side - Features */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-6">
                {features.slice(0, 3).map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-primary/10 hover:bg-white/70 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1 text-foreground">{feature.title}</h4>
                      <p className="text-muted-foreground text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Center - Large image */}
            <div className="lg:col-span-7 relative">
              <div className="relative">
                {/* Main workspace image */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                  <Image
                    src="/images/workspace.png"
                    alt="Woman working in coffee shop"
                    width={600}
                    height={400}
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{t.workHere}</h3>
                    <p className="text-white/90 max-w-md">{t.workDescription}</p>
                  </div>
                </div>

                {/* Overlapping second image */}
                <div className="absolute -bottom-10 -right-10 w-64 h-64 overflow-hidden rounded-2xl shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white">
                  <Image
                    src="/images/workspace-male.png"
                    alt="Man working in coffee shop"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right side features - positioned absolutely for creative layout */}
          <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-8 space-y-4">
            {features.slice(3).map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 max-w-xs"
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

        <div className="lg:hidden grid sm:grid-cols-2 gap-4 mb-16">
          {features.slice(3).map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-primary/10"
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

        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-3xl p-12 max-w-3xl mx-auto border border-primary/20">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              {language === "sq" ? "Eja dhe Puno me Ne!" : "Come and Work with Us!"}
            </h3>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              {language === "sq"
                ? "Çdo ditë nga 07:00 deri në 23:00, hapësira jonë është e gatshme për ju. Thjesht ejani, zgjidhni tavolinën tuaj të preferuar dhe filloni punën."
                : "Every day from 07:00 to 23:00, our space is ready for you. Just come, choose your preferred table and start working."}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Wifi className="w-4 h-4" />
                Wi-Fi Falas
              </span>
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Priza Karikimi
              </span>
              <span className="flex items-center gap-2">
                <Coffee className="w-4 h-4" />
                Kafe e Freskët
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
