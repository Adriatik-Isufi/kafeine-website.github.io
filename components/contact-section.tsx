"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock, Mail, MessageCircle, Instagram, Music, Briefcase, ArrowRight } from "lucide-react"
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
    careersText: "Bëhu pjesë e familjes Kafeinë",
    viewPositions: "Shiko Pozicionet",
    visitUs: "Na Vizitoni",
    callUs: "Na Telefononi",
    messageUs: "Na Shkruani",
    followUs: "Na Ndiqni",
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
    careersText: "Join the Kafeinë family",
    viewPositions: "View Positions",
    visitUs: "Visit Us",
    callUs: "Call Us",
    messageUs: "Message Us",
    followUs: "Follow Us",
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
      <div className="grid lg:grid-cols-2 min-h-screen">
        
        {/* Left Half - Map */}
        <div className="relative min-h-[50vh] lg:min-h-screen cursor-pointer group" onClick={() => window.open('https://maps.app.goo.gl/wNuyyjrLL8s8Mzwb7', '_blank')}>
          <Image
            src={getImagePath("/pristina-map-dark.png")}
            alt="Pristina Map"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority
          />
          {/* Floating location indicator */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-[#e18b1a] rounded-full animate-ping opacity-75"></div>
              <div className="relative bg-[#e18b1a] rounded-full p-3">
                <MapPin className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Half - Content */}
        <div className="bg-gradient-to-b from-[#1a1a1a] to-[#2a2a2a] p-8 lg:p-16 flex flex-col justify-center relative overflow-hidden">
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`,
            }}></div>
          </div>

          <div className="relative z-10">
            {/* Title with Lottie */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-4">
                <h2 className="text-5xl lg:text-6xl font-bold text-white">{t.title}</h2>
                <div className="w-20 h-20">
                  <DotLottieReact
                    src="https://lottie.host/076689ac-fe46-4151-aa4f-dd3ef88582eb/gZ7nyyGSmr.lottie"
                    loop
                    autoplay
                  />
                </div>
              </div>
              <p className="text-xl text-white/70 font-light">{t.subtitle}</p>
            </div>

            {/* Quick Contact Info - Minimal Style */}
            <div className="mb-16 space-y-8">
              
              {/* Visit Us */}
              <div className="group cursor-pointer" onClick={() => window.open('https://maps.app.goo.gl/wNuyyjrLL8s8Mzwb7', '_blank')}>
                <h3 className="text-sm uppercase tracking-widest text-[#e18b1a] mb-3">{t.visitUs}</h3>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-white/50 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white text-lg font-light leading-relaxed">{t.addressText}</p>
                    <p className="text-white/50 text-sm mt-1">{t.hoursText}</p>
                  </div>
                </div>
                <div className="h-px bg-gradient-to-r from-white/10 to-transparent mt-6"></div>
              </div>

              {/* Call Us */}
              <div className="group">
                <h3 className="text-sm uppercase tracking-widest text-[#e18b1a] mb-3">{t.callUs}</h3>
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-white/50 flex-shrink-0" />
                  <div className="flex gap-6">
                    <a href="tel:+38348419418" className="text-white text-lg font-light hover:text-[#e18b1a] transition-colors">
                      {t.phoneText}
                    </a>
                    <span className="text-white/30">|</span>
                    <a href="mailto:kafeine.ks@gmail.com" className="text-white text-lg font-light hover:text-[#e18b1a] transition-colors">
                      {t.emailText}
                    </a>
                  </div>
                </div>
                <div className="h-px bg-gradient-to-r from-white/10 to-transparent mt-6"></div>
              </div>

              {/* Message Us - WhatsApp prominent */}
              <div 
                className="group cursor-pointer bg-gradient-to-r from-green-500/10 to-transparent p-6 -mx-6 rounded-2xl hover:from-green-500/20 transition-all duration-300"
                onClick={() => window.open(`https://wa.me/38348419418`, '_blank')}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white text-lg font-medium">WhatsApp</p>
                      <p className="text-white/60 text-sm">{t.whatsappText}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-green-400 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>

              {/* Social Links - Inline */}
              <div>
                <h3 className="text-sm uppercase tracking-widest text-[#e18b1a] mb-4">{t.followUs}</h3>
                <div className="flex gap-4">
                  <a 
                    href="https://instagram.com/kafeine.ks" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600 transition-all duration-300 group"
                  >
                    <Instagram className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                  </a>
                  <a 
                    href="https://tiktok.com/@kafeine.ks" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
                  >
                    <Music className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>

            </div>

            {/* Contact Form - Cleaner Design */}
            <div className="mb-12">
              <h3 className="text-2xl font-light text-white mb-8">{t.getInTouch}</h3>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white">✓</span>
                    </div>
                  </div>
                  <p className="text-green-400 text-lg">{t.success}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-transparent border-b border-white/20 text-white py-3 px-0 focus:border-[#e18b1a] focus:outline-none transition-colors placeholder:text-white/40"
                      placeholder={t.name}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-transparent border-b border-white/20 text-white py-3 px-0 focus:border-[#e18b1a] focus:outline-none transition-colors placeholder:text-white/40"
                      placeholder={t.email}
                    />
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-white/20 text-white py-3 px-0 focus:border-[#e18b1a] focus:outline-none transition-colors resize-none placeholder:text-white/40"
                    placeholder={t.message}
                  />
                  <Button
                    type="submit"
                    className="bg-[#e18b1a] hover:bg-[#e18b1a]/90 text-white px-8 py-6 rounded-full font-medium text-base transition-all duration-300 hover:scale-105"
                  >
                    {t.send}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              )}
            </div>

            {/* Careers CTA - Minimal */}
            <div 
              className="border-t border-white/10 pt-8 cursor-pointer group"
              onClick={() => window.location.href = '/careers'}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Briefcase className="w-10 h-10 text-[#e18b1a]" />
                  <div>
                    <h3 className="text-white font-medium text-lg">{t.careersTitle}</h3>
                    <p className="text-white/60 text-sm">{t.careersText}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[#e18b1a] group-hover:gap-4 transition-all">
                  <span className="text-sm font-medium">{t.viewPositions}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}