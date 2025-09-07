"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock } from "lucide-react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"

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
      className="py-20 min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #252421 0%, #7e491d 50%, #e18b1a 100%)",
      }}
    >
      <div className="absolute top-10 right-10 w-32 h-32 opacity-20 animate-pulse">
        <DotLottieReact
          src="https://lottie.host/076689ac-fe46-4151-aa4f-dd3ef88582eb/gZ7nyyGSmr.lottie"
          loop
          autoplay
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.title}</h2>
          <p className="text-xl text-white/90">{t.subtitle}</p>
          <div className="w-24 h-24 mx-auto mt-6 opacity-60">
            <DotLottieReact
              src="https://lottie.host/076689ac-fe46-4151-aa4f-dd3ef88582eb/gZ7nyyGSmr.lottie"
              loop
              autoplay
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Google Maps - Left Side */}
            <div className="order-2 lg:order-1">
              <div className="backdrop-blur-lg rounded-3xl p-4 border border-white/20 shadow-2xl h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.60931165777!2d21.1572761769678!3d42.66185027116644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549fa11d8b2c87%3A0x8f4e20f50e02eeb2!2sKafein%C3%AB%20Coffee%20Company!5e1!3m2!1sen!2s!4v1757228442594!5m2!1sen!2s"
                  width="100%"
                  height="600"
                  style={{ border: 0, borderRadius: "20px" }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl"
                />
              </div>
            </div>

            {/* Contact Form - Right Side */}
            <div className="order-1 lg:order-2">
              <div
                className="backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl h-full"
                style={{
                  background: "linear-gradient(135deg, rgba(37, 36, 33, 0.9) 0%, rgba(126, 73, 29, 0.9) 100%)",
                }}
              >
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
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-white uppercase tracking-wider">{t.name}</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-0 border-b-2 border-white/30 text-white text-lg py-3 px-0 focus:border-[#e18b1a] focus:outline-none transition-colors placeholder:text-white/50"
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
                        className="w-full bg-transparent border-0 border-b-2 border-white/30 text-white text-lg py-3 px-0 focus:border-[#e18b1a] focus:outline-none transition-colors placeholder:text-white/50"
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
                        rows={6}
                        className="w-full bg-transparent border-0 border-b-2 border-white/30 text-white text-lg py-3 px-0 focus:border-[#e18b1a] focus:outline-none transition-colors resize-none placeholder:text-white/50"
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
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Address */}
            <div
              className="bg-gradient-to-br from-[#252421]/80 to-[#7e491d]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-[#e18b1a]/50 transition-all duration-300 group"
              style={{
                background: "linear-gradient(135deg, rgba(37, 36, 33, 0.9), rgba(126, 73, 29, 0.9))",
              }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#e18b1a] to-[#e2ba84] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-lg mb-2" style={{ color: "white" }}>
                  {t.address}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                  {t.addressText}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div
              className="bg-gradient-to-br from-[#252421]/80 to-[#7e491d]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-[#e2ba84]/50 transition-all duration-300 group"
              style={{
                background: "linear-gradient(135deg, rgba(37, 36, 33, 0.9), rgba(126, 73, 29, 0.9))",
              }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#e2ba84] to-[#7e491d] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-lg mb-2" style={{ color: "white" }}>
                  {t.phone}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                  {t.phoneText}
                </p>
              </div>
            </div>

            {/* Hours */}
            <div
              className="bg-gradient-to-br from-[#252421]/80 to-[#7e491d]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-green-500/50 transition-all duration-300 group"
              style={{
                background: "linear-gradient(135deg, rgba(37, 36, 33, 0.9), rgba(126, 73, 29, 0.9))",
              }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-bold text-lg mb-2" style={{ color: "white" }}>
                  {t.hours}
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                  {t.hoursText}
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div
              className="bg-gradient-to-br from-[#252421]/80 to-[#7e491d]/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-purple-500/50 transition-all duration-300 group"
              style={{
                background: "linear-gradient(135deg, rgba(37, 36, 33, 0.9), rgba(126, 73, 29, 0.9))",
              }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-2xl" style={{ color: "white" }}>
                    📱
                  </span>
                </div>
                <h4 className="font-bold text-lg mb-2" style={{ color: "white" }}>
                  {t.social}
                </h4>
                <div className="space-y-1">
                  <p className="text-sm" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                    @kafeine.ks
                  </p>
                  <p className="text-xs" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                    Instagram & TikTok
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
