"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { categoryImages, dessertImages } from "@/data/menu-images"

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
    specialties: "Specialitetet",
    viewGallery: "Shiko Galerinë",
    closeGallery: "Mbyll",
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
    specialties: "Specialties",
    viewGallery: "View Gallery",
    closeGallery: "Close",
  },
}




export function MenuSection({ language }: MenuSectionProps) {
  const t = translations[language]
  const [activeTab, setActiveTab] = useState<
    "espresso" | "icedCoffee" | "teas" | "smoothies" | "milkshakes" | "granitas" | "food"
  >("espresso")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [currentDessertIndex, setCurrentDessertIndex] = useState(0)
  const [dessertTouchStart, setDessertTouchStart] = useState<number | null>(null)
  const [dessertTouchEnd, setDessertTouchEnd] = useState<number | null>(null)
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

  // Dessert gallery swipe handlers (separate from main menu swipe)
  const onDessertTouchStart = (e: React.TouchEvent) => {
    setDessertTouchEnd(null)
    setDessertTouchStart(e.targetTouches[0].clientX)
  }

  const onDessertTouchMove = (e: React.TouchEvent) => {
    setDessertTouchEnd(e.targetTouches[0].clientX)
  }

  const onDessertTouchEnd = () => {
    if (!dessertTouchStart || !dessertTouchEnd) return

    const distance = dessertTouchStart - dessertTouchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      // Swipe left - next image
      setCurrentDessertIndex((prev) => (prev + 1) % dessertImages.length)
    } else if (isRightSwipe) {
      // Swipe right - previous image  
      setCurrentDessertIndex((prev) => (prev - 1 + dessertImages.length) % dessertImages.length)
    }
  }

  const goToPrevDessert = () => {
    setCurrentDessertIndex((prev) => (prev - 1 + dessertImages.length) % dessertImages.length)
  }

  const goToNextDessert = () => {
    setCurrentDessertIndex((prev) => (prev + 1) % dessertImages.length)
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

                {/* Carousel Indicators - Modern Dots */}
                <div className="absolute bottom-4 right-4 lg:right-6 flex gap-2 pointer-events-auto bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  {categoryImages[activeTab].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`rounded-full transition-all duration-300 ${
                        currentImageIndex === index 
                          ? "w-3 h-3 bg-gradient-to-r from-[#e18b1a] to-[#f5a623]" 
                          : "w-2 h-2 bg-white/40 hover:bg-white/60"
                      }`}
                      aria-label={`Slide ${index + 1}`}
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

          {/* Right Side - Menu Items */}
          <div className="order-1 lg:order-2">
            <div className="max-h-[400px] lg:max-h-[626px] overflow-y-auto pr-2 custom-scrollbar">
              {menuItems[activeTab].map((item, index) => (
                <div
                  key={index}
                  className="group border-b border-white/10 last:border-0 py-3 lg:py-4"
                >
                  {/* Single price — simple one-liner */}
                  {Object.keys(item.prices).length === 1 ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-white/90 text-sm lg:text-base font-medium group-hover:text-[#e18b1a] transition-colors duration-200 leading-snug flex-1">
                        {item.name}
                      </span>
                      <span className="shrink-0 border-b border-dotted border-white/20 flex-1 mx-2 mb-1" />
                      <span className="shrink-0 text-[#e18b1a] font-semibold text-sm lg:text-base tabular-nums">
                        {Object.values(item.prices)[0]}
                      </span>
                    </div>
                  ) : (
                    /* Multiple sizes — name on top, sizes in a clean row below */
                    <div>
                      <span className="block text-white/90 text-sm lg:text-base font-medium group-hover:text-[#e18b1a] transition-colors duration-200 leading-snug mb-2">
                        {item.name}
                      </span>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 pl-1">
                        {Object.entries(item.prices).map(([size, price]) => (
                          <div key={size} className="flex items-baseline gap-1.5">
                            <span className="text-xs uppercase tracking-widest text-white/40 font-medium">{size}</span>
                            <span className="text-[#e18b1a] font-semibold text-sm tabular-nums">{price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
          <div className="max-w-4xl mx-auto mb-8">
            <p
              className="text-sm md:text-base lg:text-lg leading-relaxed mb-6"
              style={{
                color: "rgba(255,255,255,0.8)",
                textShadow: "0 2px 4px rgba(0,0,0,0.6)",
              }}
            >
              {t.dessertMessage}
            </p>
            
            {/* Story-like Gallery Thumbnails */}
            <div className="flex justify-center gap-3 flex-wrap">
              {dessertImages.slice(0, 5).map((image, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer group"
                  onClick={() => {
                    setCurrentDessertIndex(index)
                    setIsGalleryOpen(true)
                  }}
                >
                  {/* Story Ring - Instagram style */}
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-[3px] bg-gradient-to-r from-[#e18b1a] via-[#f4a261] to-[#e18b1a] group-hover:from-[#d17a0f] group-hover:to-[#d17a0f] transition-all duration-300">
                    <div className="w-full h-full rounded-full p-[2px] bg-[#252421]">
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <Image
                          src={image}
                          alt={`Dessert ${index + 1}`}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Label */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <span className="text-xs text-white/80 whitespace-nowrap">
                      {index === 0 ? t.specialties : `${index + 1}`}
                    </span>
                  </div>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
              
              {/* View All Button */}
              <div
                className="relative cursor-pointer group"
                onClick={() => {
                  setCurrentDessertIndex(0)
                  setIsGalleryOpen(true)
                }}
              >
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-[3px] bg-gradient-to-r from-white/20 to-white/10 group-hover:from-[#e18b1a] group-hover:to-[#e18b1a] transition-all duration-300">
                  <div className="w-full h-full rounded-full bg-[#252421] flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-white text-lg font-bold">+{dessertImages.length - 5}</div>
                      <div className="text-white/60 text-xs">more</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                  <span className="text-xs text-white/80 whitespace-nowrap">
                    {t.viewGallery}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dessert Gallery Modal */}
        {isGalleryOpen && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-5xl max-h-full w-full flex items-center justify-center">

              {/* Prev Button */}
              <button
                onClick={goToPrevDessert}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-[#e18b1a] rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
                style={{ fontSize: '20px' }}
              >
                ‹
              </button>

              {/* Main Image */}
              <div
                className="relative max-w-4xl max-h-full select-none"
                onTouchStart={onDessertTouchStart}
                onTouchMove={onDessertTouchMove}
                onTouchEnd={onDessertTouchEnd}
                style={{ userSelect: "none", WebkitUserSelect: "none" }}
              >
                <img
                  src={dessertImages[currentDessertIndex]}
                  alt={`Dessert ${currentDessertIndex + 1}`}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl pointer-events-none"
                  draggable={false}
                />

                {/* Close Button */}
                <button
                  onClick={() => setIsGalleryOpen(false)}
                  className="absolute top-4 right-4 text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#e18b1a] transition-colors"
                >
                  ✕
                </button>

                {/* Counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                  {currentDessertIndex + 1} / {dessertImages.length}
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={goToNextDessert}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-[#e18b1a] rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
                style={{ fontSize: '20px' }}
              >
                ›
              </button>

              {/* Thumbnail Strip */}
              <div
                data-dessert-carousel
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/30 p-3 rounded-xl backdrop-blur-sm overflow-x-auto scrollbar-hide max-w-[90vw]"
              >
                {dessertImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentDessertIndex(index)}
                    className={`w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 hover:scale-110 ${
                      index === currentDessertIndex
                        ? 'ring-2 ring-[#e18b1a] scale-110'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Background click to close */}
            <div className="absolute inset-0 -z-10" onClick={() => setIsGalleryOpen(false)} />
          </div>
        )}
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
