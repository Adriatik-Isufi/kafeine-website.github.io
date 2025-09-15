"use client"

import type React from "react"
import { useState } from "react"
import emailjs from "@emailjs/browser"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Briefcase, ArrowRight } from "lucide-react"
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
    phoneText2: "+383 48 514 516",
    phoneField: "Telefoni",
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
    phoneText2: "+383 48 514 516",
    phoneField: "Phone",
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
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      // EmailJS configuration
      await emailjs.send(
        "service_2sbw13k", // Service ID
        "template_9jfsp93", // Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
          to_name: "Kafeinë",
        },
        "KKENUxLOnvZvdWiu2", // Public Key
      )

      setSubmitStatus("success")
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      })
    } catch (error) {
      console.error("Email send failed:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
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
        <div
          className="relative min-h-[50vh] lg:min-h-screen cursor-pointer group"
          onClick={() => window.open("https://maps.app.goo.gl/wNuyyjrLL8s8Mzwb7", "_blank")}
        >
          <Image
            src={getImagePath("/pristina-map-dark.png") || "/placeholder.svg"}
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
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`,
              }}
            ></div>
          </div>

          <div className="relative z-10">
            {/* Title with Lottie */}
            <div className="text-center mb-12 lg:mb-16">
              <div className="flex items-center justify-center gap-2 lg:gap-4 mb-4">
                <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white">{t.title}</h2>
                <div className="w-12 h-12 lg:w-20 lg:h-20">
                  <DotLottieReact
                    src="https://lottie.host/076689ac-fe46-4151-aa4f-dd3ef88582eb/gZ7nyyGSmr.lottie"
                    loop
                    autoplay
                  />
                </div>
              </div>
              <p className="text-lg lg:text-xl text-white/70 font-light">{t.subtitle}</p>
            </div>

            {/* Quick Contact Info - Mobile Optimized */}
            <div className="mb-12 lg:mb-16 space-y-6 lg:space-y-8">
              {/* Visit Us */}
              <div
                className="group cursor-pointer"
                onClick={() => window.open("https://maps.app.goo.gl/wNuyyjrLL8s8Mzwb7", "_blank")}
              >
                <h3 className="text-xs lg:text-sm uppercase tracking-widest text-[#e18b1a] mb-3">{t.visitUs}</h3>
                <div className="flex items-start gap-3 lg:gap-4">
                  <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-white/50 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white text-base lg:text-lg font-light leading-relaxed">{t.addressText}</p>
                    <p className="text-white/50 text-xs lg:text-sm mt-1">{t.hoursText}</p>
                  </div>
                </div>
                <div className="h-px bg-gradient-to-r from-white/10 to-transparent mt-4 lg:mt-6"></div>
              </div>

              {/* Call Us - Improved Tablet Layout */}
              <div className="group">
                <h3 className="text-xs lg:text-sm uppercase tracking-widest text-[#e18b1a] mb-3">{t.callUs}</h3>
                <div className="flex items-start gap-3 lg:gap-4">
                  <Phone className="w-4 h-4 lg:w-5 lg:h-5 text-white/50 flex-shrink-0 mt-1" />
                  <div className="space-y-4 md:space-y-3 lg:space-y-4 w-full">
                    <div className="flex flex-col md:flex-row md:items-start lg:flex-col lg:items-start gap-4 md:gap-6 lg:gap-4">
                      {/* Phone Numbers Row - Desktop gets more space */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 lg:gap-8">
                        {/* First Phone Number */}
                        <div className="flex items-center gap-3">
                          <a
                            href="tel:+38348419418"
                            className="text-white text-base lg:text-xl font-light hover:text-[#e18b1a] transition-colors"
                          >
                            {t.phoneText}
                          </a>
                          <button
                            onClick={() => window.open(`https://wa.me/38348419418`, "_blank")}
                            className="w-6 h-6 lg:w-6 lg:h-6 text-green-400 hover:text-green-300 transition-colors flex-shrink-0"
                            title="WhatsApp"
                          >
                            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                            </svg>
                          </button>
                        </div>

                        <span className="text-white/30 hidden sm:inline">|</span>

                        {/* Second Phone Number */}
                        <div className="flex items-center gap-3">
                          <a
                            href="tel:+38348514516"
                            className="text-white text-base lg:text-xl font-light hover:text-[#e18b1a] transition-colors"
                          >
                            {t.phoneText2}
                          </a>
                          <button
                            onClick={() => window.open(`https://wa.me/38348514516`, "_blank")}
                            className="w-6 h-6 lg:w-6 lg:h-6 text-green-400 hover:text-green-300 transition-colors flex-shrink-0"
                            title="WhatsApp"
                          >
                            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Email on separate line for desktop with better spacing */}
                      <div className="lg:mt-3 lg:pl-0">
                        <a
                          href="mailto:kafeine.ks@gmail.com"
                          className="text-white text-base lg:text-xl font-light hover:text-[#e18b1a] transition-colors block"
                        >
                          {t.emailText}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-px bg-gradient-to-r from-white/10 to-transparent mt-4 lg:mt-6"></div>
              </div>

              {/* Social Links - Mobile Optimized */}
              <div>
                <h3 className="text-xs lg:text-sm uppercase tracking-widest text-[#e18b1a] mb-4">{t.followUs}</h3>
                <div className="flex gap-3 lg:gap-4">
                  <a
                    href="https://www.instagram.com/kafeine.ks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600 transition-all duration-300 group"
                  >
                    <svg
                      className="w-4 h-4 lg:w-5 lg:h-5 text-white group-hover:scale-110 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.073-1.689-.073-4.948 0-3.259.013-3.668.07-4.949.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.013 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.057-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61567364573918"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 transition-all duration-300 group"
                  >
                    <svg
                      className="w-4 h-4 lg:w-5 lg:h-5 text-white group-hover:scale-110 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@kafeine.ks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-black hover:to-gray-800 transition-all duration-300 group"
                  >
                    <svg
                      className="w-4 h-4 lg:w-5 lg:h-5 text-white group-hover:scale-110 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form - Mobile Optimized */}
            <div className="mb-8 lg:mb-12">
              <h3 className="text-xl lg:text-2xl font-light text-white mb-6 lg:mb-8">{t.getInTouch}</h3>

              {submitStatus === "success" ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white">✓</span>
                    </div>
                  </div>
                  <p className="text-green-400 text-lg">{t.success}</p>
                </div>
              ) : submitStatus === "error" ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white">✗</span>
                    </div>
                  </div>
                  <p className="text-red-400 text-lg">Gabim në dërgim. Provoni përsëri.</p>
                  <Button
                    onClick={() => setSubmitStatus("idle")}
                    className="mt-4 bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-full"
                  >
                    Provo Përsëri
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                  <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="bg-transparent border-b border-white/20 text-white py-3 px-0 focus:border-[#e18b1a] focus:outline-none transition-colors placeholder:text-white/40 disabled:opacity-50"
                      placeholder={t.name}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="bg-transparent border-b border-white/20 text-white py-3 px-0 focus:border-[#e18b1a] focus:outline-none transition-colors placeholder:text-white/40 disabled:opacity-50"
                      placeholder={t.email}
                    />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full bg-transparent border-b border-white/20 text-white py-3 px-0 focus:border-[#e18b1a] focus:outline-none transition-colors placeholder:text-white/40 disabled:opacity-50"
                    placeholder={language === "sq" ? "Telefoni" : "Phone"}
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    disabled={isSubmitting}
                    className="w-full bg-transparent border-b border-white/20 text-white py-3 px-0 focus:border-[#e18b1a] focus:outline-none transition-colors resize-none placeholder:text-white/40 disabled:opacity-50"
                    placeholder={t.message}
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#e18b1a] hover:bg-[#e18b1a]/90 text-white px-8 py-6 rounded-full font-medium text-base transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (language === "sq" ? "Po dërgohet..." : "Sending...") : t.send}
                    {!isSubmitting && <ArrowRight className="ml-2 w-4 h-4" />}
                  </Button>
                </form>
              )}
            </div>

            {/* Careers CTA - Minimal */}
            <div
              className="border-t border-white/10 pt-8 cursor-pointer group"
              onClick={() => (window.location.href = "/careers")}
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
