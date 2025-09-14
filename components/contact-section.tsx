"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock, Mail, MessageCircle, Briefcase, ArrowRight } from "lucide-react"
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
                    href="https://www.instagram.com/kafeine.ks" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600 transition-all duration-300 group"
                  >
                    <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.073-1.689-.073-4.948 0-3.259.013-3.668.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a 
                    href="https://www.facebook.com/profile.php?id=61567364573918" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 transition-all duration-300 group"
                  >
                    <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a 
                    href="https://www.tiktok.com/@kafeine.ks" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-black hover:to-gray-800 transition-all duration-300 group"
                  >
                    <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    </svg>
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