"use client"

import { useState } from "react"

interface GallerySectionProps {
  language: "sq" | "en"
}

const translations = {
  sq: {
    title: "Fotografi Ushqimore",
    subtitle: "për Kafeinë Coffee Company",
    description:
      "Foto profesionale të ushqimit, kafesë dhe ëmbëlsirave për të bërë produktet tona më tërheqëse dhe të dallueshme.",
    cta: "Shiko Galerinë",
  },
  en: {
    title: "Food Photography",
    subtitle: "for Kafeinë Coffee Company",
    description: "Professional food, coffee and dessert photography to make our products more appealing and stand out.",
    cta: "View Gallery",
  },
}

export function GallerySection({ language }: GallerySectionProps) {
  const t = translations[language]
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const images = [
    { src: "/images/coffee-pour.jpg", alt: "Coffee Pour", size: "large" },
    { src: "/images/carrot-cake.jpg", alt: "Carrot Cake", size: "medium" },
    { src: "/images/berry-cake.jpg", alt: "Berry Cake", size: "small" },
    { src: "/images/lemon-cheesecake.jpg", alt: "Lemon Cheesecake", size: "medium" },
    { src: "/images/lemon-cake.jpg", alt: "Lemon Cake", size: "large" },
    { src: "/images/carrot-cake-slice.jpg", alt: "Carrot Cake Slice", size: "small" },
    { src: "/images/lotus-cheesecake.jpg", alt: "Lotus Cheesecake", size: "medium" },
  ]

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{t.title}</h2>
              <h3 className="text-2xl md:text-3xl font-light text-[#e18b1a] mb-6">{t.subtitle}</h3>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">{t.description}</p>

            <button
              onClick={() => setSelectedImage(images[0].src)}
              className="bg-[#e18b1a] hover:bg-[#d17a0f] text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              {t.cta}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className={`relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${
                  image.size === "large" ? "row-span-2" : image.size === "medium" ? "row-span-1" : "row-span-1"
                } ${index % 3 === 0 ? "col-span-2" : "col-span-1"}`}
                onClick={() => setSelectedImage(image.src)}
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className={`w-full object-cover group-hover:scale-110 transition-transform duration-300 ${
                    image.size === "large" ? "h-80" : image.size === "medium" ? "h-48" : "h-32"
                  }`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Selected dessert"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
