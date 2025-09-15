"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

interface MenuSectionProps {
  language: "sq" | "en"
}

const translations = {
  sq: {
    title: "Menyja Jonë",
    espresso: "Espresso & Më Shumë",
    icedCoffee: "Kafe të Ftohtë & Specialitete",
    teas: "Çaj & Infuzione",
    smoothies: "Smoothie",
    milkshakes: "Milkshake",
    granitas: "Granita",
    food: "Ushqim",
    dessertTitle: "Ëmbëlsirat Tona",
    dessertMessage:
      "Kemi një larmi ëmbëlsirash të shijshme siç shihen në fotografitë më poshtë. Për të ditur saktësisht çfarë kemi në disponim sot, ju lutemi na vizitoni ose na kontaktoni.",
  },
  en: {
    title: "Our Menu",
    espresso: "Espresso & More",
    icedCoffee: "Iced Coffee & Specialty",
    teas: "Teas & Infusions",
    smoothies: "Smoothies",
    milkshakes: "Milkshakes",
    granitas: "Granitas",
    food: "Food",
    dessertTitle: "Our Desserts",
    dessertMessage:
      "We have a variety of delicious desserts as you can see in the pictures below. To know exactly what we have in store today, please visit us or contact us.",
  },
}

const categoryImages = {
  espresso: ["/Menu/espresso1.png", "/Menu/machiato1.png", "/Menu/turkcoffe1.jpg"],
  icedCoffee: ["/Menu/IcedCoffe1.jpg", "/Menu/MatchaLate1.jpg", "/Menu/IcedMotcha1.png", "/Menu/IcedCaramel1.png"],
  teas: ["/Menu/IcedTea1.jpg", "/Menu/IcedTea2.jpg", "/Menu/IcedTea3.jpg"],
  smoothies: [
    "/Menu/Smoothie1.jpg",
    "/Menu/Smoothie2.jpg",
    "/Menu/Smoothie3.jpg",
    "/Menu/Smoothie4.jpg",
    "/Menu/Smoothie5.jpg",
    "/Menu/Smoothie6.jpg",
    "/Menu/Smoothie7.jpg",
  ],
  milkshakes: ["/Menu/Milkshake1.jpg", "/Menu/Milkshake2.jpg", "/Menu/Milkshake3.jpg"],
  granitas: [
    "/Menu/Granita1.jpg",
    "/Menu/Granita2.jpg",
    "/Menu/Granita3.jpg",
    "/Menu/Granita4.jpg",
    "/Menu/Granita5.jpg",
    "/Menu/Granita6.jpg",
  ],
  food: [
    "/Menu/Food1.jpg",
    "/Menu/Food2.jpg",
    "/Menu/Food3.jpg",
    "/videos/SandwitchEaten1.mp4",
    "/videos/SandwithcEaten.mp4",
  ],
}

export function MenuSection({ language }: MenuSectionProps) {
  const t = translations[language]
  const [activeTab, setActiveTab] = useState<
    "espresso" | "icedCoffee" | "teas" | "smoothies" | "milkshakes" | "granitas" | "food"
  >("espresso")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const mobileTabsRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [mouseStart, setMouseStart] = useState<number | null>(null)
  const [mouseEnd, setMouseEnd] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      // Swipe left - next image
      setCurrentImageIndex((prev) => (prev + 1) % categoryImages[activeTab].length)
    } else if (isRightSwipe) {
      // Swipe right - previous image
      setCurrentImageIndex((prev) => (prev - 1 + categoryImages[activeTab].length) % categoryImages[activeTab].length)
    }
  }

  const onMouseDown = (e: React.MouseEvent) => {
    setMouseEnd(null)
    setMouseStart(e.clientX)
    setIsDragging(true)
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setMouseEnd(e.clientX)
  }

  const onMouseUp = () => {
    if (!mouseStart || !mouseEnd || !isDragging) {
      setIsDragging(false)
      return
    }

    const distance = mouseStart - mouseEnd
    const isLeftDrag = distance > minSwipeDistance
    const isRightDrag = distance < -minSwipeDistance

    if (isLeftDrag) {
      setCurrentImageIndex((prev) => (prev + 1) % categoryImages[activeTab].length)
    } else if (isRightDrag) {
      setCurrentImageIndex((prev) => (prev - 1 + categoryImages[activeTab].length) % categoryImages[activeTab].length)
    }

    setIsDragging(false)
  }

  const onMouseLeave = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % categoryImages[activeTab].length)
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [activeTab])

  useEffect(() => {
    setCurrentImageIndex(0)
  }, [activeTab])

  const menuItems = {
    espresso: [
      { name: "Espresso", prices: { small: "1.00€", double: "1.60€" } },
      { name: "Macchiato", prices: { small: "1.00€", large: "1.20€" } },
      { name: "Espresso Arabica", prices: { small: "1.30€" } },
      { name: "Espresso Tonic", prices: { small: "2.00€" } },
      { name: "Caffe Latte", prices: { small: "1.50€" } },
      { name: "Caffe Americano", prices: { small: "1.20€" } },
      { name: "Cappuccino", prices: { small: "1.20€" } },
      { name: "Spanish Latte", prices: { small: "1.60€" } },
      { name: "Caramel Macchiato", prices: { small: "2.00€" } },
      { name: "Mocha", prices: { small: "1.60€" } },
      { name: "Kafe Turke", prices: { small: "1.20€" } },
      { name: "Kafe Turke me Qumësht", prices: { small: "1.30€" } },
      { name: "Espresso Freddo", prices: { small: "2.00€" } },
      { name: "Cappuccino Freddo", prices: { small: "1.50€" } },
      { name: "Tiramisu Latte", prices: { small: "3.00€" } },
      { name: "Matcha Latte", prices: { small: "3.00€" } },
      { name: "Affogato", prices: { small: "3.00€" } },
      { name: "Hot Chocolate", prices: { small: "2.00€" } },
      { name: "Salep", prices: { small: "2.00€" } },
    ],
    icedCoffee: [
      { name: "Iced Mocha", prices: { small: "2.00€", medium: "2.50€", large: "3.00€" } },
      { name: "Iced Caramel Latte", prices: { small: "2.00€", medium: "2.50€", large: "3.00€" } },
      { name: "Iced Caffe Americano", prices: { small: "1.50€", medium: "1.80€", large: "2.10€" } },
      { name: "Iced Caffe Latte", prices: { small: "1.80€", medium: "2.10€", large: "2.40€" } },
      { name: "White Iced Matcha Latte", prices: { small: "3.00€", medium: "3.50€", large: "4.00€" } },
      { name: "Mocha Frappe", prices: { small: "2.50€", medium: "2.90€", large: "3.30€" } },
      { name: "Caramel Frappe", prices: { small: "2.50€", medium: "2.90€", large: "3.30€" } },
      { name: "Vanilla Bean Frappe", prices: { small: "2.50€", medium: "3.00€", large: "3.50€" } },
      { name: "Cookies and Cream Frappe", prices: { small: "3.00€", medium: "3.50€", large: "4.00€" } },
    ],
    teas: [
      { name: "Organic Tea", prices: { small: "1.20€" } },
      { name: "Matcha Tea", prices: { small: "2.00€" } },
      { name: "Passion Fruit Iced Tea", prices: { small: "1.50€", medium: "2.00€", large: "2.50€" } },
      { name: "Strawberry Iced Tea", prices: { small: "1.50€", medium: "2.00€", large: "2.50€" } },
      { name: "Raspberry Iced Tea", prices: { small: "1.50€", medium: "2.00€", large: "2.50€" } },
      { name: "Peach Iced Tea", prices: { small: "1.50€", medium: "2.00€", large: "2.50€" } },
      { name: "Mango Iced Tea", prices: { small: "1.50€", medium: "2.00€", large: "2.50€" } },
      { name: "Cherry Iced Tea", prices: { small: "1.50€", medium: "2.00€", large: "2.50€" } },
    ],
    smoothies: [
      { name: "Peach Smoothie", prices: { small: "3.00€" } },
      { name: "Raspberry Smoothie", prices: { small: "3.00€" } },
      { name: "Mango Smoothie", prices: { small: "3.00€" } },
      { name: "Strawberry Smoothie", prices: { small: "3.00€" } },
      { name: "Passion Fruit Smoothie", prices: { small: "3.00€" } },
      { name: "Cherry Smoothie", prices: { small: "3.00€" } },
    ],
    milkshakes: [
      { name: "Chocolate Milkshake", prices: { small: "2.40€", medium: "2.80€", large: "3.00€" } },
      { name: "Pistachio Milkshake", prices: { small: "2.40€", medium: "2.80€", large: "3.00€" } },
      { name: "Oreo Milkshake", prices: { small: "2.40€", medium: "2.80€", large: "3.00€" } },
      { name: "Coffee Milkshake", prices: { small: "2.40€", medium: "2.80€", large: "3.00€" } },
      { name: "Lotus Biscoff Milkshake", prices: { small: "2.40€", medium: "2.80€", large: "3.00€" } },
      { name: "Caramel Milkshake", prices: { small: "2.40€", medium: "2.80€", large: "3.00€" } },
    ],
    granitas: [
      { name: "Raspberry Lemonade Granita", prices: { small: "1.80€" } },
      { name: "Passion Fruit Granita", prices: { small: "1.80€" } },
      { name: "Strawberry Granita", prices: { small: "1.80€" } },
      { name: "Mango Lemonade Granita", prices: { small: "1.80€" } },
      { name: "Cherry Granita", prices: { small: "1.80€" } },
      { name: "Peach Granita", prices: { small: "1.80€" } },
    ],
    food: [
      { name: "Baguette me pulë dhe suxhuk te tymosur", prices: { small: "3.80€" } },
      { name: "Baguette Pulë Pesto", prices: { small: "3.80€" } },
      { name: "Baguette Vegjetarian", prices: { small: "3.80€" } },
      { name: "Baguette Tuna", prices: { small: "3.80€" } },
      { name: "Focaccia me Përshutë dhe Suxhuk të tymosur", prices: { small: "4.00€" } },
    ],
  }

  const handleTabSelect = (tab: typeof activeTab) => {
    setActiveTab(tab)

    if (mobileTabsRef.current) {
      const tabButtons = mobileTabsRef.current.querySelectorAll("button")
      const tabs = ["espresso", "icedCoffee", "teas", "smoothies", "milkshakes", "granitas", "food"]
      const tabIndex = tabs.indexOf(tab)

      if (tabButtons[tabIndex]) {
        const button = tabButtons[tabIndex] as HTMLElement
        const container = mobileTabsRef.current
        const buttonLeft = button.offsetLeft
        const containerScrollLeft = container.scrollLeft
        const containerWidth = container.clientWidth
        const buttonWidth = button.offsetWidth

        const targetScrollLeft = buttonLeft - 16

        container.scrollTo({
          left: Math.max(0, targetScrollLeft),
          behavior: "smooth",
        })
      }
    }
  }

  return (
    <section
      id="menu"
      className="py-20 min-h-screen"
      style={{
        backgroundColor: "#252421",
        minHeight: "100vh",
      }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold mb-8"
            style={{
              color: "#ffffff",
              textShadow: "0 4px 8px rgba(0,0,0,0.8)",
            }}
          >
            {t.title}
          </h2>
        </div>

        {/* Category Navigation */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-4xl">
            {/* Mobile: Horizontal scrolling tabs */}
            <div className="lg:hidden">
              <div
                ref={mobileTabsRef}
                className="flex gap-2 p-2 rounded-2xl border overflow-x-auto scrollbar-hide"
                style={{
                  backgroundColor: "#1a1a1a",
                  borderColor: "rgba(255,255,255,0.1)",
                }}
              >
                {(["espresso", "icedCoffee", "teas", "smoothies", "milkshakes", "granitas", "food"] as const).map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabSelect(tab)}
                      className="px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm whitespace-nowrap min-w-fit flex-shrink-0"
                      style={{
                        backgroundColor: activeTab === tab ? "#e18b1a" : "transparent",
                        color: "#ffffff",
                        minHeight: "44px", // Touch target size
                      }}
                    >
                      {t[tab]}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Tablet: Wrapped layout with centering */}
            <div className="hidden lg:flex xl:hidden justify-center">
              <div
                className="flex flex-wrap justify-center gap-2 p-2 rounded-2xl border"
                style={{
                  backgroundColor: "#1a1a1a",
                  borderColor: "rgba(255,255,255,0.1)",
                }}
              >
                {(["espresso", "icedCoffee", "teas", "smoothies", "milkshakes", "granitas", "food"] as const).map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className="px-4 py-2 md:px-6 md:py-3 rounded-xl font-medium transition-all duration-300 text-sm md:text-base"
                      style={{
                        backgroundColor: activeTab === tab ? "#e18b1a" : "transparent",
                        color: "#ffffff",
                      }}
                    >
                      {t[tab]}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Desktop: Single row layout */}
            <div className="hidden xl:flex justify-center">
              <div
                className="flex gap-2 p-2 rounded-2xl border"
                style={{
                  backgroundColor: "#1a1a1a",
                  borderColor: "rgba(255,255,255,0.1)",
                }}
              >
                {(["espresso", "icedCoffee", "teas", "smoothies", "milkshakes", "granitas", "food"] as const).map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className="px-6 py-3 rounded-xl font-medium transition-all duration-300 text-base whitespace-nowrap"
                      style={{
                        backgroundColor: activeTab === tab ? "#e18b1a" : "transparent",
                        color: "#ffffff",
                      }}
                    >
                      {t[tab]}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Split Screen Layout - Mobile Responsive */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto lg:items-start">
          {/* Left Side - Auto-Rotating Visual Gallery */}
          <div className="relative order-2 lg:order-1">
            <div className="lg:sticky lg:top-4">
              {/* Main Featured Image/Video with Auto Carousel */}
              <div
                ref={carouselRef}
                className="relative h-64 md:h-80 lg:h-[500px] rounded-3xl overflow-hidden mb-4 lg:mb-6 shadow-2xl cursor-grab active:cursor-grabbing select-none"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseLeave}
                style={{
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                }}
              >
                {categoryImages[activeTab][currentImageIndex]?.endsWith(".mp4") ? (
                  <video
                    src={categoryImages[activeTab][currentImageIndex]}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover transition-all duration-1000 pointer-events-none"
                    draggable={false}
                  />
                ) : (
                  <Image
                    src={categoryImages[activeTab][currentImageIndex] || "/placeholder.svg"}
                    alt={t[activeTab]}
                    fill
                    className="object-cover transition-all duration-1000 pointer-events-none"
                    draggable={false}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Category Badge */}
                <div className="absolute top-4 lg:top-6 left-4 lg:left-6 pointer-events-none">
                  <div
                    className="px-3 py-1.5 lg:px-4 lg:py-2 rounded-full backdrop-blur-md border"
                    style={{
                      backgroundColor: "rgba(225, 139, 26, 0.9)",
                      borderColor: "rgba(255,255,255,0.3)",
                    }}
                  >
                    <span className="text-white font-semibold text-xs lg:text-sm">{t[activeTab]}</span>
                  </div>
                </div>

                {/* Category Description */}
                <div className="absolute bottom-4 lg:bottom-6 left-4 lg:left-6 right-4 lg:right-6 pointer-events-none">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 lg:mb-2">{t[activeTab]}</h3>
                  <p className="text-white/80 text-xs md:text-sm lg:text-base">
                    {menuItems[activeTab].length} items available • Freshly prepared
                  </p>
                </div>

                {/* Carousel Indicators */}
                <div className="absolute bottom-4 right-4 lg:right-6 flex gap-2 pointer-events-auto">
                  {categoryImages[activeTab].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className="w-2 h-2 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: currentImageIndex === index ? "#e18b1a" : "rgba(255,255,255,0.5)",
                      }}
                    />
                  ))}
                </div>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none lg:hidden">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 opacity-0 animate-pulse">
                    <span className="text-white text-xs">← Swipe →</span>
                  </div>
                </div>
              </div>

              {/* Image Thumbnails - Hidden on Mobile */}
              <div className="hidden lg:block relative">
                <div
                  className={`flex gap-3 pb-2 scroll-smooth ${
                    categoryImages[activeTab].length <= 4 ? "justify-center" : "overflow-x-auto scrollbar-hide"
                  }`}
                  id={`thumbnails-${activeTab}`}
                >
                  {categoryImages[activeTab].map((media, index) => (
                    <div
                      key={index}
                      className={`relative rounded-xl overflow-hidden transition-opacity cursor-pointer ${
                        categoryImages[activeTab].length <= 4 ? "h-28 w-28 flex-shrink-0" : "h-24 w-24 flex-shrink-0"
                      }`}
                      style={{
                        opacity: currentImageIndex === index ? 1 : 0.6,
                      }}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      {media.endsWith(".mp4") ? (
                        <video src={media} muted className="w-full h-full object-cover" />
                      ) : (
                        <Image src={media || "/placeholder.svg"} alt="" fill className="object-cover" />
                      )}
                      <div className="absolute inset-0 bg-black/20" />
                      {media.endsWith(".mp4") && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                            <span className="text-black text-sm">▶</span>
                          </div>
                        </div>
                      )}
                      {currentImageIndex === index && (
                        <div className="absolute inset-0 border-2 border-[#e18b1a] rounded-xl" />
                      )}
                    </div>
                  ))}
                </div>

                {categoryImages[activeTab].length > 4 && (
                  <>
                    <button
                      onClick={() => {
                        const container = document.getElementById(`thumbnails-${activeTab}`)
                        if (container) container.scrollLeft -= 120
                      }}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 rounded-full bg-black/50 hover:bg-[#e18b1a] text-white flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => {
                        const container = document.getElementById(`thumbnails-${activeTab}`)
                        if (container) container.scrollLeft += 120
                      }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 rounded-full bg-black/50 hover:bg-[#e18b1a] text-white flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20"
                    >
                      →
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Menu Items - Mobile Responsive */}
          <div className="space-y-4 order-1 lg:order-2">
            <div className="space-y-3 max-h-[400px] lg:max-h-[626px] overflow-y-auto pr-2 custom-scrollbar">
              {menuItems[activeTab].map((item, index) => (
                <div
                  key={index}
                  className="group relative p-3 lg:p-4 rounded-xl lg:rounded-2xl transition-all duration-300 hover:scale-[1.02] border cursor-pointer"
                  style={{
                    backgroundColor: "#1a1a1a",
                    borderColor: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-2 lg:pr-4">
                      <h4
                        className="text-base lg:text-lg xl:text-xl font-semibold mb-1 group-hover:text-[#e18b1a] transition-colors duration-300 leading-tight"
                        style={{
                          color: "#ffffff",
                          textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                        }}
                      >
                        {item.name}
                      </h4>

                      <div className="hidden sm:flex items-center gap-2 mb-2">
                        <span className="text-xs text-gray-400 font-mono">#{String(index + 1).padStart(2, "0")}</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-gray-600 to-transparent" />
                      </div>

                      <div className="flex flex-wrap gap-1.5 lg:gap-2">
                        {Object.entries(item.prices).map(([size, price]) => (
                          <div key={size} className="flex items-center gap-1.5 lg:gap-2">
                            {Object.keys(item.prices).length > 1 && (
                              <span className="text-xs uppercase tracking-wider font-medium text-gray-400">{size}</span>
                            )}
                            <span
                              className="text-sm lg:text-base font-bold px-2.5 lg:px-3 py-1 rounded-full text-white"
                              style={{ backgroundColor: "#e18b1a" }}
                            >
                              {price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                        style={{ backgroundColor: "#e18b1a" }}
                      >
                        <span className="text-white text-sm font-bold">+</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 rounded-xl lg:rounded-2xl bg-gradient-to-r from-[#e18b1a]/5 to-transparent" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dessert Section */}
        <div className="mt-16 text-center">
          <h3
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
            style={{
              color: "#ffffff",
              textShadow: "0 4px 8px rgba(0,0,0,0.8)",
            }}
          >
            {t.dessertTitle}
          </h3>
          <div className="max-w-4xl mx-auto">
            <p
              className="text-sm md:text-base lg:text-lg leading-relaxed"
              style={{
                color: "rgba(255,255,255,0.8)",
                textShadow: "0 2px 4px rgba(0,0,0,0.6)",
              }}
            >
              {t.dessertMessage}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e18b1a;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d17a0f;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Added swipe hint animation */
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          50% { opacity: 0.7; }
        }
        
        .animate-pulse {
          animation: fadeInOut 3s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </section>
  )
}
