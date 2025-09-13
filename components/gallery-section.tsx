"use client"

import React, { useState } from "react"
import { getImagePath } from "@/lib/utils"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"

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
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)

  const images = [
    { src: getImagePath("/New Batch/DJJvASBPbHA_3.jpg"), alt: "Coffee and Pastry", size: "large" },
    { src: getImagePath("/New Batch/DJlmvvUtCIi_1.jpg"), alt: "Delicious Cake", size: "medium" },
    { src: getImagePath("/New Batch/DJtwuGLu8MD_1.jpg"), alt: "Fresh Dessert", size: "small" },
    { src: getImagePath("/New Batch/DKw8QbUteRT_1.jpg"), alt: "Sweet Treat", size: "medium" },
    { src: getImagePath("/New Batch/DLmRJ2-PFT4_1.jpg"), alt: "Gourmet Cake", size: "large" },
    { src: getImagePath("/New Batch/DMsS1AUqodn_1.jpg"), alt: "Artisan Dessert", size: "small" },
    { src: getImagePath("/New Batch/DOLmerZDDpw_6.jpg"), alt: "Premium Pastry", size: "medium" },
    { src: getImagePath("/New Batch/DM93hBlhIZS_3.jpg"), alt: "Coffee Specialty", size: "small" },
    { src: getImagePath("/New Batch/DJWwCVVtALD_1.jpg"), alt: "Elegant Dessert", size: "medium" },
    { src: getImagePath("/New Batch/DKZbjqhu64R_1.jpg"), alt: "Artisan Creation", size: "large" },
    { src: getImagePath("/New Batch/DLt4okuMGV9_1.jpg"), alt: "Sweet Delicacy", size: "small" },
  ]

  const openGallery = (index: number) => {
    setCurrentImageIndex(index)
    setSelectedImage(images[index].src)
  }

  const closeGallery = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % images.length
    setCurrentImageIndex(nextIndex)
    setSelectedImage(images[nextIndex].src)
  }

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length
    setCurrentImageIndex(prevIndex)
    setSelectedImage(images[prevIndex].src)
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!selectedImage) return
    if (e.key === 'ArrowRight') nextImage()
    if (e.key === 'ArrowLeft') prevImage()
    if (e.key === 'Escape') closeGallery()
  }

  // Add keyboard event listeners
  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedImage, currentImageIndex])

  return (
    <section id="gallery" className="py-20 bg-[#2a2a2a]">
      <div className="container mx-auto px-4">
        {/* Gallery Container */}
        <div className="gallery-container relative w-full max-w-7xl mx-auto min-h-[800px] md:min-h-[900px] overflow-visible">
          {/* Content Block - Text in top-left */}
          <div className="content-block relative z-10 max-w-md">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {t.title}
              <br />
              <span className="text-xl md:text-2xl font-light text-[#ff9500]">{t.subtitle}</span>
            </h1>
            <p className="text-gray-300 text-base leading-relaxed mb-6">{t.description}</p>
            <button
              onClick={() => openGallery(0)}
              className="bg-[#ff9500] hover:bg-[#e6860a] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              {t.cta}
            </button>
          </div>

          {/* Mobile Layout - Grid on mobile */}
          <div className="md:hidden mt-8 grid grid-cols-2 gap-3">
            {images.map((image, index) => (
              <div
                key={index}
                className={`
                  relative group cursor-pointer overflow-hidden rounded-xl shadow-lg 
                  hover:shadow-xl transition-all duration-300
                  ${index === 0 ? 'col-span-2 h-64' : ''}
                  ${index === 1 || index === 2 ? 'h-48' : ''}
                  ${index === 3 ? 'col-span-2 h-56' : ''}
                  ${index === 4 || index === 5 ? 'h-48' : ''}
                  ${index === 6 ? 'col-span-2 h-56' : ''}
                `}
                onClick={() => openGallery(index)}
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
            ))}
          </div>

          {/* Desktop Layout - Absolute positioned images */}
          <div className="hidden md:block">
            {/* Lottie Animation - Bottom left */}
            <div 
              className="absolute bottom-10 left-10 hover:rotate-2 transition-transform duration-300"
              style={{width: '300px', height: '360px', zIndex: 1}}
            >
              <DotLottieReact
                src="https://lottie.host/c5b2c2f8-8a34-4f4c-b7c5-0c7de60e81ad/QmAiB5name.lottie"
                loop
                autoplay
                style={{width: '100%', height: '100%'}}
              />
            </div>
            {/* Image 1 - Center focal point */}
            <div 
              className="image-wrapper absolute cursor-pointer group hover:z-50 hover:scale-105"
              style={{
                width: '340px',
                height: '260px',
                top: '280px',
                left: '50%',
                transform: 'translateX(-50%) rotate(-2deg)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 25px 70px rgba(0,0,0,0.5)',
                zIndex: 3,
                transition: 'all 0.3s ease',
                transitionDelay: '0s'
              }}
              onClick={() => openGallery(0)}
            >
              <img
                src={images[0]?.src || "/placeholder.svg"}
                alt={images[0]?.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
            </div>

            {/* Image 2 - Top right */}
            <div 
              className="image-wrapper absolute cursor-pointer group hover:z-50 hover:scale-105"
              style={{
                width: '280px',
                height: '350px',
                top: '20px',
                right: '80px',
                transform: 'rotate(3deg)',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
                zIndex: 2,
                transition: 'all 0.3s ease',
                transitionDelay: '0.05s'
              }}
              onClick={() => openGallery(1)}
            >
              <img
                src={images[1]?.src || "/placeholder.svg"}
                alt={images[1]?.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
            </div>

            {/* Image 3 - Left side */}
            <div 
              className="image-wrapper absolute cursor-pointer group hover:z-50 hover:scale-105"
              style={{
                width: '260px',
                height: '200px',
                top: '320px',
                left: '60px',
                transform: 'rotate(-3deg)',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 25px 70px rgba(0,0,0,0.4)',
                zIndex: 3,
                transition: 'all 0.3s ease',
                transitionDelay: '0.1s'
              }}
              onClick={() => openGallery(2)}
            >
              <img
                src={images[2]?.src || "/placeholder.svg"}
                alt={images[2]?.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
            </div>

            {/* Image 4 - Middle right */}
            <div 
              className="image-wrapper absolute cursor-pointer group hover:z-50 hover:scale-105"
              style={{
                width: '240px',
                height: '240px',
                top: '200px',
                right: '200px',
                transform: 'rotate(4deg)',
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 12px 35px rgba(0,0,0,0.25)',
                zIndex: 2,
                transition: 'all 0.3s ease',
                transitionDelay: '0.15s'
              }}
              onClick={() => openGallery(3)}
            >
              <img
                src={images[3]?.src || "/placeholder.svg"}
                alt={images[3]?.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
            </div>

            {/* Image 5 - Center bottom */}
            <div 
              className="image-wrapper absolute cursor-pointer group hover:z-50 hover:scale-105"
              style={{
                width: '300px',
                height: '220px',
                bottom: '120px',
                left: '50%',
                transform: 'translateX(-50%) rotate(-1deg)',
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
                zIndex: 4,
                transition: 'all 0.3s ease',
                transitionDelay: '0.2s'
              }}
              onClick={() => openGallery(4)}
            >
              <img
                src={images[4]?.src || "/placeholder.svg"}
                alt={images[4]?.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
            </div>

            {/* Image 6 - Bottom right */}
            <div 
              className="image-wrapper absolute cursor-pointer group hover:z-50 hover:scale-105"
              style={{
                width: '220px',
                height: '180px',
                bottom: '60px',
                right: '100px',
                transform: 'rotate(2deg)',
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: '0 10px 28px rgba(0,0,0,0.3)',
                zIndex: 2,
                transition: 'all 0.3s ease',
                transitionDelay: '0.25s'
              }}
              onClick={() => openGallery(5)}
            >
              <img
                src={images[5]?.src || "/placeholder.svg"}
                alt={images[5]?.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
            </div>

            {/* Image 7 - Middle left */}
            <div 
              className="image-wrapper absolute cursor-pointer group hover:z-50 hover:scale-105"
              style={{
                width: '200px',
                height: '280px',
                top: '180px',
                left: '320px',
                transform: 'rotate(-4deg)',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 18px 50px rgba(0,0,0,0.35)',
                zIndex: 1,
                transition: 'all 0.3s ease',
                transitionDelay: '0.3s'
              }}
              onClick={() => openGallery(6)}
            >
              <img
                src={images[6]?.src || "/placeholder.svg"}
                alt={images[6]?.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
            </div>

            {/* Image 8 - Small accent */}
            <div 
              className="image-wrapper absolute cursor-pointer group hover:z-50 hover:scale-105"
              style={{
                width: '160px',
                height: '120px',
                bottom: '200px',
                right: '40px',
                transform: 'rotate(5deg)',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
                zIndex: 3,
                transition: 'all 0.3s ease',
                transitionDelay: '0.35s'
              }}
              onClick={() => openGallery(7)}
            >
              <img
                src={images[7]?.src || "/placeholder.svg"}
                alt={images[7]?.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
            </div>

            {/* Image 9 - Right side of text */}
            <div 
              className="image-wrapper absolute cursor-pointer group hover:z-50 hover:scale-105"
              style={{
                width: '280px',
                height: '200px',
                top: '25px',
                left: '380px',
                transform: 'rotate(-2deg)',
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0 18px 45px rgba(0,0,0,0.35)',
                zIndex: 2,
                transition: 'all 0.3s ease',
                transitionDelay: '0.4s'
              }}
              onClick={() => openGallery(8)}
            >
              <img
                src={images[8]?.src || "/placeholder.svg"}
                alt={images[8]?.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
            </div>

            {/* Image 10 - Far right edge */}
            <div 
              className="image-wrapper absolute cursor-pointer group hover:z-50 hover:scale-105"
              style={{
                width: '180px',
                height: '240px',
                top: '400px',
                right: '-20px',
                transform: 'rotate(6deg)',
                borderRadius: '22px',
                overflow: 'hidden',
                boxShadow: '0 20px 55px rgba(0,0,0,0.4)',
                zIndex: 1,
                transition: 'all 0.3s ease',
                transitionDelay: '0.45s'
              }}
              onClick={() => openGallery(9)}
            >
              <img
                src={images[9]?.src || "/placeholder.svg"}
                alt={images[9]?.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
            </div>

            {/* Image 11 - Bottom left floating */}
            <div 
              className="image-wrapper absolute cursor-pointer group hover:z-50 hover:scale-105"
              style={{
                width: '140px',
                height: '140px',
                bottom: '320px',
                left: '240px',
                transform: 'rotate(-5deg)',
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 15px 40px rgba(0,0,0,0.35)',
                zIndex: 4,
                transition: 'all 0.3s ease',
                transitionDelay: '0.5s'
              }}
              onClick={() => openGallery(10)}
            >
              <img
                src={images[10]?.src || "/placeholder.svg"}
                alt={images[10]?.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
            </div>
          </div>
        </div>

        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-5xl max-h-full w-full flex items-center justify-center">
              {/* Previous Image Button */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
                style={{ fontSize: '20px' }}
              >
                ‹
              </button>

              {/* Main Image */}
              <div className="relative max-w-4xl max-h-full">
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt={images[currentImageIndex]?.alt || "Gallery image"}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                />
                
                {/* Close Button */}
                <button
                  onClick={closeGallery}
                  className="absolute top-4 right-4 text-white bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  ✕
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>

              {/* Next Image Button */}
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
                style={{ fontSize: '20px' }}
              >
                ›
              </button>

              {/* Thumbnail Strip */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-black/30 p-3 rounded-xl backdrop-blur-sm">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => openGallery(index)}
                    className={`w-12 h-12 rounded-lg overflow-hidden transition-all duration-300 hover:scale-110 ${
                      index === currentImageIndex ? 'ring-2 ring-[#ff9500] scale-110' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Background Click to Close */}
            <div 
              className="absolute inset-0 -z-10" 
              onClick={closeGallery}
            />
          </div>
        )}
      </div>
    </section>
  )
}
