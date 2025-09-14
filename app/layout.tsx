import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: "Kafeinë - Kafeja më e mirë në Prishtinë | Desserts & Light Meals",
  description:
    "Kafeinë: Kafeja më e mirë në zemër të Prishtinës. Zbuloni shijen autentike të kafesë së pjekur me dashuri, ëmbëlsirat e bëra me dorë dhe ushqimin e lehtë. Espresso, smoothies, granitas dhe më shumë.",
  keywords:
    "kafeinë prishtinë, kafe prishtina, coffee pristina, espresso kosovo, desserts prishtinë, smoothies kosovo, kafenë kosovo, restaurant prishtina, light meals kosovo",
  generator: "Next.js",
  openGraph: {
    title: "Kafeinë - Kafeja më e mirë në Prishtinë",
    description:
      "Zbuloni shijen autentike të kafesë së pjekur me dashuri dhe ëmbëlsirat tona të bëra me dorë në zemër të Prishtinës. Kafë, desserts, smoothies dhe më shumë.",
    type: "website",
    locale: "sq_AL",
    alternateLocale: ["en_US"],
    siteName: "Kafeinë",
    url: "https://kafeine.com",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Kafeinë - Coffee Shop Prishtinë",
      },
      {
        url: "/images/coffee-pour.jpg",
        width: 1200,
        height: 630,
        alt: "Fresh Coffee at Kafeinë Prishtinë",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kafeinë - The finest coffee in Pristina",
    description: "Discover authentic coffee and handmade desserts in the heart of Pristina",
    images: ["/images/logo.png"],
    creator: "@kafeine",
    site: "@kafeine",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/logo.ico", sizes: "any" },
      { url: "/images/logo.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/images/logo.png",
    shortcut: "/favicon.ico",
  },
  alternates: {
    canonical: "https://kafeine.com",
    languages: {
      'sq': 'https://kafeine.com',
      'en': 'https://kafeine.com/en',
    },
  },
  category: "restaurant",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sq" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="geo.region" content="XK" />
        <meta name="geo.placename" content="Prishtinë, Kosovo" />
        <meta name="geo.position" content="42.6629;21.1655" />
        <meta name="ICBM" content="42.6629, 21.1655" />
        <link rel="canonical" href="https://kafeine.com" />

        {/* Favicon and Icons - Comprehensive setup */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/images/logo.ico" />
        <link rel="icon" type="image/png" href="/images/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo.png" />
        <link rel="mask-icon" href="/images/logo.png" color="#e18b1a" />

        {/* Theme and App configurations */}
        <meta name="theme-color" content="#e18b1a" />
        <meta name="msapplication-TileColor" content="#e18b1a" />
        <meta name="msapplication-TileImage" content="/images/logo.ico" />
        <meta name="application-name" content="Kafeinë" />
        <meta name="apple-mobile-web-app-title" content="Kafeinë" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Additional favicon sizes for better compatibility */}
        <link rel="icon" type="image/x-icon" sizes="32x32" href="/images/logo.ico" />
        <link rel="icon" type="image/x-icon" sizes="16x16" href="/images/logo.ico" />

        {/* Language alternates */}
        <link rel="alternate" href="https://kafeine.com" hrefLang="sq" />
        <link rel="alternate" href="https://kafeine.com/en" hrefLang="en" />
        <link rel="alternate" href="https://kafeine.com" hrefLang="x-default" />

        {/* Additional Open Graph and Twitter Card metadata */}
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Kafeinë - Coffee Shop në Prishtinë" />
        <meta name="twitter:image" content="/images/logo.png" />

        {/* Structured Data for Restaurant/Cafe */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CafeOrCoffeeShop",
              name: "Kafeinë",
              description: "Kafeja më e mirë në zemër të Prishtinës me ëmbëlsira të bëra me dorë dhe ushqim të lehtë",
              url: "https://kafeine.com",
              logo: "https://kafeine.com/images/logo.png",
              image: [
                "https://kafeine.com/images/logo.png",
                "https://kafeine.com/images/coffee-pour.jpg",
                "https://kafeine.com/Menu/espresso1.png"
              ],
              telephone: "+383 48 419 418",
              email: "kafeine.ks@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Luan Haradinaj, 92",
                addressLocality: "Prishtinë",
                postalCode: "10000",
                addressCountry: "XK",
                addressRegion: "Kosovo",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "42.6629",
                longitude: "21.1655",
              },
              openingHours: [
                "Mo-Su 07:00-23:00" // Adjust based on actual hours
              ],
              priceRange: "€€",
              servesCuisine: ["Coffee", "Desserts", "Light Meals", "Albanian"],
              paymentAccepted: ["Cash", "Credit Card"],
              currenciesAccepted: "EUR",
              hasMenu: "https://kafeine.com#menu",
              serviceArea: {
                "@type": "Place",
                name: "Prishtinë, Kosovo",
              },
              potentialAction: {
                "@type": "OrderAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://kafeine.com#menu",
                  inLanguage: ["sq", "en"],
                  actionPlatform: [
                    "http://schema.org/DesktopWebPlatform",
                    "http://schema.org/IOSPlatform",
                    "http://schema.org/AndroidPlatform"
                  ]
                }
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "150"
              },
              menu: {
                "@type": "Menu",
                hasMenuSection: [
                  {
                    "@type": "MenuSection",
                    name: "Coffee & Espresso",
                    description: "Freshly roasted coffee and espresso drinks"
                  },
                  {
                    "@type": "MenuSection", 
                    name: "Desserts",
                    description: "Handmade desserts and sweet treats"
                  },
                  {
                    "@type": "MenuSection",
                    name: "Light Meals",
                    description: "Sandwiches, wraps and light food options"
                  }
                ]
              }
            }),
          }}
        />

        {/* Additional Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://kafeine.com",
              name: "Kafeinë",
              alternateName: ["Kafe Kafeinë", "Coffee Kafeine"],
              description: "The finest coffee shop in Pristina serving authentic Albanian coffee, handmade desserts, and light meals",
              url: "https://kafeine.com",
              sameAs: [
                "https://www.facebook.com/profile.php?id=61567364573918",
                "https://www.instagram.com/kafeine.ks",
                "https://www.tiktok.com/@kafeine.ks"
              ],
              knowsLanguage: ["sq", "en"],
              areaServed: {
                "@type": "City",
                name: "Prishtinë",
                containedInPlace: {
                  "@type": "Country",
                  name: "Kosovo"
                }
              }
            }),
          }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
