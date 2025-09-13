"use client"

import { useState, useEffect } from "react"
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
  },
  en: {
    title: "Our Menu",
    espresso: "Espresso & More",
    icedCoffee: "Iced Coffee & Specialty",
    teas: "Teas & Infusions",
    smoothies: "Smoothies",
    milkshakes: "Milkshakes",
    granitas: "Granitas",
  },
}

const categoryImages = {
  espresso: ["/Menu/espresso1.png", "/Menu/machiato1.png", "/Menu/turkcoffe1.jpg"],
  icedCoffee: ["/Menu/IcedMotcha1.png", "/Menu/IcedCaramel1.png", "/Menu/MatchaLate1.jpg", "/Menu/IcedCoffe1.jpg"],
  teas: ["/herbal-tea.jpg", "/images/workspace.png", "/images/workspace-male.png"],
  smoothies: ["/berry-smoothie.png", "/fresh-orange-juice.png", "/images/workspace.png"],
  milkshakes: ["/fresh-orange-juice.png", "/berry-smoothie.png", "/images/workspace.png"],
  granitas: ["/berry-smoothie.png", "/fresh-orange-juice.png", "/herbal-tea.jpg"],
}

export function MenuSection({ language }: MenuSectionProps) {
  const t = translations[language]
  const [activeTab, setActiveTab] = useState<
    "espresso" | "icedCoffee" | "teas" | "smoothies" | "milkshakes" | "granitas"
  >("espresso")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        (prev + 1) % categoryImages[activeTab].length
      )
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [activeTab])

  // Reset image index when category changes
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [activeTab])

  const menuItems = {
    espresso: [
      { name: "Espresso", prices: { small: "1.00€", double: "1.60€" } },
      { name: "Macchiato", prices: { small: "1.00€", large: "1.60€" } },
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
      { name: "Caramel Frappe", prices: { small: "2.50€", medium: "2.50€", large: "3.30€" } },
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
  }

  return (
    <section
      id="menu"
      className="py-20 min-h-screen"
      style={{
        backgroundColor: "#252421",
      }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl font-bold mb-8"
            style={{
              color: "#ffffff",
              textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            {t.title}
          </h2>
        </div>

        {/* Category Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-2 p-2 rounded-2xl border"
               style={{
                 backgroundColor: "#1a1a1a",
                 borderColor: "rgba(255,255,255,0.1)",
               }}>
            {(["espresso", "icedCoffee", "teas", "smoothies", "milkshakes", "granitas"] as const).map((tab) => (
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
            ))}
          </div>
        </div>

        {/* Split Screen Layout - Mobile Responsive */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
          
          {/* Left Side - Auto-Rotating Visual Gallery */}
          <div className="relative order-2 lg:order-1">
            <div className="lg:sticky lg:top-8">
              {/* Main Featured Image with Auto Carousel */}
              <div className="relative h-64 md:h-80 lg:h-[500px] rounded-3xl overflow-hidden mb-4 lg:mb-6 shadow-2xl">
                <Image
                  src={categoryImages[activeTab][currentImageIndex]}
                  alt={t[activeTab]}
                  fill
                  className="object-cover transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 lg:top-6 left-4 lg:left-6">
                  <div 
                    className="px-3 py-1.5 lg:px-4 lg:py-2 rounded-full backdrop-blur-md border"
                    style={{
                      backgroundColor: "rgba(225, 139, 26, 0.9)",
                      borderColor: "rgba(255,255,255,0.3)",
                    }}
                  >
                    <span className="text-white font-semibold text-xs lg:text-sm">
                      {t[activeTab]}
                    </span>
                  </div>
                </div>

                {/* Category Description */}
                <div className="absolute bottom-4 lg:bottom-6 left-4 lg:left-6 right-4 lg:right-6">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 lg:mb-2">
                    {t[activeTab]}
                  </h3>
                  <p className="text-white/80 text-xs md:text-sm lg:text-base">
                    {menuItems[activeTab].length} items available • Freshly prepared
                  </p>
                </div>

                {/* Carousel Indicators */}
                <div className="absolute bottom-4 right-4 lg:right-6 flex gap-2">
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
              </div>

              {/* Image Thumbnails - Hidden on Mobile */}
              <div className="hidden lg:grid grid-cols-3 gap-3">
                {categoryImages[activeTab].map((img, index) => (
                  <div 
                    key={index} 
                    className="relative h-24 rounded-xl overflow-hidden transition-opacity cursor-pointer"
                    style={{
                      opacity: currentImageIndex === index ? 1 : 0.6,
                    }}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    {currentImageIndex === index && (
                      <div className="absolute inset-0 border-2 border-[#e18b1a] rounded-xl" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Menu Items - Mobile Responsive */}
          <div className="space-y-4 order-1 lg:order-2">
            <div className="mb-4 lg:mb-6">
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">Menu Items</h3>
              <div className="w-12 lg:w-16 h-1 rounded-full" style={{ backgroundColor: "#e18b1a" }} />
            </div>

            {/* Menu Items List - Mobile Optimized */}
            <div className="space-y-3 max-h-[400px] lg:max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {menuItems[activeTab].map((item, index) => (
                <div
                  key={index}
                  className="group relative p-3 lg:p-4 rounded-xl lg:rounded-2xl transition-all duration-300 hover:scale-[1.02] border cursor-pointer"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderColor: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 pr-2 lg:pr-4">
                      <h4 className="text-base lg:text-lg xl:text-xl font-semibold text-white mb-1 group-hover:text-[#e18b1a] transition-colors duration-300 leading-tight">
                        {item.name}
                      </h4>
                      
                      {/* Item number - Hidden on small mobile */}
                      <div className="hidden sm:flex items-center gap-2 mb-2">
                        <span className="text-xs text-gray-400 font-mono">
                          #{String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="flex-1 h-px bg-gradient-to-r from-gray-600 to-transparent" />
                      </div>

                      {/* Prices - Mobile Optimized */}
                      <div className="flex flex-wrap gap-1.5 lg:gap-2">
                        {Object.entries(item.prices).map(([size, price]) => (
                          <div key={size} className="flex items-center gap-1.5 lg:gap-2">
                            {Object.keys(item.prices).length > 1 && (
                              <span className="text-xs uppercase tracking-wider font-medium text-gray-400">
                                {size}
                              </span>
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

                    {/* Add to cart icon - Hidden on mobile, shown on hover on desktop */}
                    <div className="hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                        style={{ backgroundColor: "#e18b1a" }}
                      >
                        <span className="text-white text-sm font-bold">+</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 rounded-xl lg:rounded-2xl bg-gradient-to-r from-[#e18b1a]/5 to-transparent" />
                  </div>
                </div>
              ))}
            </div>
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
      `}</style>
    </section>
  )
}
