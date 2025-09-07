"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock } from "lucide-react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import Image from "next/image"
import { getImagePath } from "@/lib/utils"

interface ContactSectionProps {
  language: "sq" | "en"
}

const translations = {
  sq: {
    title: "Na Kontaktoni",
    subtitle: "Jemi këtu për t'ju ndihmuar",
    name: "Emri",
    email: "Email-i",
    message: "Mesazhi",
    send: "Dërgo Mesazhin",
    success: "Mesazhi u dërgua me sukses!",
    address: "Adresa",
    addressText: "Luan Haradinaj, 92, Pristina, Kosovo",
    phone: "Telefoni",
    phoneText: "+383 48 419 418",
    whatsapp: "WhatsApp",
    whatsappText: "+383 48 419 418",
    hours: "Orari",
    hoursText: "Hënë - Diel: 07:00 - 23:00",
    emailLabel: "Email-i",
    emailText: "kafeine.ks@gmail.com",
    social: "Rrjetet Sociale",
    instagram: "Instagram: @kafeine.ks",
    tiktok: "TikTok: @kafeine.ks",
    getInTouch: "Kontaktoni",
    careersTitle: "Të Interesuar për Punë?",
    careersText: "Jeni të interesuar për të punuar me ne? Kontrolloni pozicionet e disponueshme dhe aplikoni tani për të bërë pjesë të familjes Kafeinë.",
    viewPositions: "Shiko Pozicionet",
  },
  en: {
    title: "Contact Us",
    subtitle: "We are here to help you",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send Message",
    success: "Message sent successfully!",
    address: "Address",
    addressText: "Luan Haradinaj, 92, Pristina, Kosovo",
    phone: "Phone",
    phoneText: "+383 48 419 418",
    whatsapp: "WhatsApp",
    whatsappText: "+383 48 419 418",
    hours: "Hours",
    hoursText: "Mon - Sun: 07:00 - 23:00",
    emailLabel: "Email",
    emailText: "kafeine.ks@gmail.com",
    social: "Social Media",
    instagram: "Instagram: @kafeine.ks",
    tiktok: "TikTok: @kafeine.ks",
    getInTouch: "Get In Touch",
    careersTitle: "Interested in Working for Us?",
    careersText: "Are you interested in working with us? Check our available positions and apply now to become part of the Kafeinë family.",
    viewPositions: "View Positions",
  },
}

export function ContactSection({ language }: ContactSectionProps) {
  const t = translations[language]
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Frontend only - just show success message
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", message: "" })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section
      id="contact"
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #252421 0%, #7e491d 50%, #e18b1a 100%)",
      }}
    >
      {/* Full Width Split Layout */}
      <div className="grid lg:grid-cols-2 min-h-screen">
        
        {/* Left Half - Full Height Map Image */}
        <div className="relative min-h-[50vh] lg:min-h-screen cursor-pointer group" onClick={() => window.open('https://maps.app.goo.gl/wNuyyjrLL8s8Mzwb7', '_blank')}>
          <Image
            src={getImagePath("/pristina-map-dark.png")}
            alt="Pristina Map"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority
          />
          {/* Location pin only - no dark overlay */}

        </div>

        {/* Right Half - All Content */}
        <div className="bg-[#2a2a2a] p-8 lg:p-12 flex flex-col justify-center">
          
          {/* Title Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white">{t.title}</h2>
              <div className="w-16 h-16 opacity-60">
                <DotLottieReact
                  src="https://lottie.host/076689ac-fe46-4151-aa4f-dd3ef88582eb/gZ7nyyGSmr.lottie"
                  loop
                  autoplay
                />
              </div>
            </div>
            <p className="text-xl text-white/90">{t.subtitle}</p>
          </div>

          {/* Contact Form */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">{t.getInTouch}</h3>
            
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">✓</span>
                  </div>
                </div>
                <p className="text-green-400 font-semibold text-lg">{t.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white uppercase tracking-wider">{t.name}</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border-0 border-b-2 border-white/30 text-white text-lg py-3 px-2 focus:border-[#e18b1a] focus:outline-none transition-colors placeholder:text-white/50 rounded-none"
                    placeholder="Your name..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white uppercase tracking-wider">{t.email}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border-0 border-b-2 border-white/30 text-white text-lg py-3 px-2 focus:border-[#e18b1a] focus:outline-none transition-colors placeholder:text-white/50 rounded-none"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white uppercase tracking-wider">
                    {t.message}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-white/10 border-0 border-b-2 border-white/30 text-white text-lg py-3 px-2 focus:border-[#e18b1a] focus:outline-none transition-colors resize-none placeholder:text-white/50 rounded-none"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>
                <div className="pt-4">
                  <Button
                    type="submit"
                    style={{
                      background: "linear-gradient(to right, #e18b1a, #e2ba84)",
                      color: "white",
                      border: "none",
                    }}
                    className="w-full hover:from-[#e2ba84] hover:to-[#e18b1a] px-12 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    {t.send}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-4 mb-12">
            {/* Address */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:border-[#e18b1a]/50 transition-all duration-300 group">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#e18b1a] to-[#e2ba84] rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-sm mb-2 text-white">{t.address}</h4>
                <p className="text-xs leading-relaxed text-white/80">{t.addressText}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:border-[#e2ba84]/50 transition-all duration-300 group">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#e2ba84] to-[#7e491d] rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-sm mb-2 text-white">{t.phone}</h4>
                <p className="text-xs leading-relaxed text-white/80">{t.phoneText}</p>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:border-green-500/50 transition-all duration-300 group">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-sm mb-2 text-white">{t.hours}</h4>
                <p className="text-xs leading-relaxed text-white/80">{t.hoursText}</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:border-purple-500/50 transition-all duration-300 group">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <span className="text-lg text-white">📱</span>
                </div>
                <h4 className="font-bold text-sm mb-2 text-white">{t.social}</h4>
                <p className="text-xs text-white/80">@kafeine.ks</p>
              </div>
            </div>
          </div>

          {/* Careers Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{t.careersTitle}</h3>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              {t.careersText}
            </p>
            <a
              href="/careers"
              className="inline-block bg-gradient-to-r from-[#e18b1a] to-[#e2ba84] hover:from-[#e2ba84] hover:to-[#e18b1a] text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-sm"
            >
              {t.viewPositions}
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}