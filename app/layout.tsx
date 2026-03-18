import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kafeine-ks.com"),
  title: "Kafeinë - Kafeja më e mirë në Prishtinë | Desserts & Light Meals",
  description:
    "Kafeinë: Kafeja më e mirë në zemër të Prishtinës. Zbuloni shijen autentike të kafesë së pjekur me dashuri, ëmbëlsirat e bëra me dorë dhe ushqimin e lehtë. Espresso, smoothies, granitas dhe më shumë.",
  keywords:
    "kafeinë prishtinë, kafe prishtina, coffee pristina, espresso kosovo, desserts prishtinë, smoothies kosovo, kafenë kosovo, restaurant prishtina, light meals kosovo",
  generator: "Next.js",
  authors: [{ name: "Kafeinë", url: "https://www.kafeine-ks.com" }],
  creator: "Kafeinë",
  publisher: "Kafeinë",
  applicationName: "Kafeinë",
  referrer: "strict-origin-when-cross-origin",
  category: "restaurant",
  openGraph: {
    title: "Kafeinë - Kafeja më e mirë në Prishtinë",
    description:
      "Zbuloni shijen autentike të kafesë së pjekur me dashuri dhe ëmbëlsirat tona të bëra me dorë në zemër të Prishtinës. Kafë, desserts, smoothies dhe më shumë.",
    type: "website",
    locale: "sq_AL",
    alternateLocale: ["en_US"],
    siteName: "Kafeinë",
    url: "https://www.kafeine-ks.com",
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
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://www.kafeine-ks.com",
    languages: {
      sq: "https://www.kafeine-ks.com",
      en: "https://www.kafeine-ks.com/en",
      "x-default": "https://www.kafeine-ks.com",
    },
  },
}

// CafeOrCoffeeShop Schema
const cafeSchema = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  "@id": "https://www.kafeine-ks.com/#cafe",
  name: "Kafeinë",
  description: "Kafeja më e mirë në zemër të Prishtinës me ëmbëlsira të bëra me dorë dhe ushqim të lehtë",
  url: "https://www.kafeine-ks.com",
  logo: "https://www.kafeine-ks.com/images/logo.png",
  image: [
    "https://www.kafeine-ks.com/images/logo.png",
    "https://www.kafeine-ks.com/images/coffee-pour.jpg",
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
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "07:00",
      closes: "23:00",
    },
  ],
  priceRange: "€€",
  servesCuisine: ["Coffee", "Desserts", "Light Meals", "Albanian"],
  paymentAccepted: ["Cash", "Credit Card"],
  currenciesAccepted: "EUR",
  hasMenu: "https://www.kafeine-ks.com#menu",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "150",
    bestRating: "5",
    worstRating: "1",
  },
  menu: {
    "@type": "Menu",
    hasMenuSection: [
      {
        "@type": "MenuSection",
        name: "Coffee & Espresso",
        description: "Freshly roasted coffee and espresso drinks",
      },
      {
        "@type": "MenuSection",
        name: "Desserts",
        description: "Handmade desserts and sweet treats",
      },
      {
        "@type": "MenuSection",
        name: "Light Meals",
        description: "Sandwiches, wraps and light food options",
      },
    ],
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=61567364573918",
    "https://www.instagram.com/kafeine.ks",
    "https://www.tiktok.com/@kafeine.ks",
  ],
}

// LocalBusiness / Organization Schema
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.kafeine-ks.com/#localbusiness",
  name: "Kafeinë",
  alternateName: ["Kafe Kafeinë", "Coffee Kafeine"],
  description:
    "The finest coffee shop in Pristina serving authentic Albanian coffee, handmade desserts, and light meals",
  url: "https://www.kafeine-ks.com",
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
  knowsLanguage: ["sq", "en"],
  areaServed: {
    "@type": "City",
    name: "Prishtinë",
    containedInPlace: {
      "@type": "Country",
      name: "Kosovo",
    },
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=61567364573918",
    "https://www.instagram.com/kafeine.ks",
    "https://www.tiktok.com/@kafeine.ks",
  ],
}

// WebSite Schema
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.kafeine-ks.com/#website",
  url: "https://www.kafeine-ks.com",
  name: "Kafeinë",
  description: "Kafeja më e mirë në zemër të Prishtinës",
  publisher: {
    "@id": "https://www.kafeine-ks.com/#localbusiness",
  },
  inLanguage: ["sq", "en"],
}

// BreadcrumbList Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.kafeine-ks.com/",
    },
  ],
}

// FAQPage Schema for rich snippets
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Ku ndodhet Kafeinë në Prishtinë?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kafeinë ndodhet në rrugën Luan Haradinaj, 92, Prishtinë, Kosovë. Jemi në zemër të qytetit dhe lehtë të arritshëm.",
      },
    },
    {
      "@type": "Question",
      name: "What are Kafeinë's opening hours?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kafeinë is open every day from 07:00 to 23:00, Monday through Sunday.",
      },
    },
    {
      "@type": "Question",
      name: "What does Kafeinë serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kafeinë serves freshly brewed espresso, specialty coffees, smoothies, granitas, handmade desserts, cakes, and light meals including sandwiches and wraps.",
      },
    },
    {
      "@type": "Question",
      name: "A ofron Kafeinë mundësi punësimi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Po, Kafeinë pranon aplikime për pozicione barista dhe arkatare. Vizitoni faqen tonë të karrierës ose na kontaktoni drejtpërdrejt.",
      },
    },
    {
      "@type": "Question",
      name: "Si mund të kontaktoni Kafeinë?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Mund të na kontaktoni me telefon në +383 48 419 418 ose me email në kafeine.ks@gmail.com. Na gjeni gjithashtu në Instagram @kafeine.ks.",
      },
    },
  ],
}

// SiteNavigationElement Schema
const navigationSchema = {
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  name: "Navigimi Kryesor",
  url: "https://www.kafeine-ks.com",
  hasPart: [
    { "@type": "SiteNavigationElement", name: "Kreu", url: "https://www.kafeine-ks.com/" },
    { "@type": "SiteNavigationElement", name: "Menu", url: "https://www.kafeine-ks.com/#menu" },
    { "@type": "SiteNavigationElement", name: "Rreth Nesh", url: "https://www.kafeine-ks.com/#about" },
    { "@type": "SiteNavigationElement", name: "Galeria", url: "https://www.kafeine-ks.com/#gallery" },
    { "@type": "SiteNavigationElement", name: "Vlerësimet", url: "https://www.kafeine-ks.com/#reviews" },
    { "@type": "SiteNavigationElement", name: "Kontakt", url: "https://www.kafeine-ks.com/#contact" },
    { "@type": "SiteNavigationElement", name: "Karriera", url: "https://www.kafeine-ks.com/careers/" },
    { "@type": "SiteNavigationElement", name: "Ngjarjet", url: "https://www.kafeine-ks.com/events/" },
  ],
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

        {/* Geographic Meta Tags */}
        <meta name="geo.region" content="XK" />
        <meta name="geo.placename" content="Prishtinë, Kosovo" />
        <meta name="geo.position" content="42.6629;21.1655" />
        <meta name="ICBM" content="42.6629, 21.1655" />

        {/* Enhanced SEO Meta Tags */}
        <meta name="author" content="Kafeinë" />
        <meta name="coverage" content="Prishtinë, Kosovo" />
        <meta name="distribution" content="local" />
        <meta name="language" content="Albanian" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        <meta name="subject" content="Coffee Shop and Café in Pristina" />
        <meta name="topic" content="Best Coffee Shop in Pristina Kosovo" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.kafeine-ks.com" />

        {/* Language alternates */}
        <link rel="alternate" href="https://www.kafeine-ks.com" hrefLang="sq" />
        <link rel="alternate" href="https://www.kafeine-ks.com/en" hrefLang="en" />
        <link rel="alternate" href="https://www.kafeine-ks.com" hrefLang="x-default" />

        {/* Favicon and Icons */}
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
        <meta name="MobileOptimized" content="width" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="format-detection" content="telephone=yes" />

        {/* Dublin Core Meta Tags */}
        <meta name="DC.title" content="Kafeinë - Kafeja më e mirë në Prishtinë" />
        <meta name="DC.creator" content="Kafeinë" />
        <meta name="DC.subject" content="Coffee Shop, Café, Desserts, Light Meals" />
        <meta name="DC.description" content="The finest coffee shop in the heart of Pristina." />
        <meta name="DC.publisher" content="Kafeinë" />
        <meta name="DC.type" content="Service" />
        <meta name="DC.format" content="text/html" />
        <meta name="DC.identifier" content="https://www.kafeine-ks.com" />
        <meta name="DC.language" content="sq" />
        <meta name="DC.coverage" content="Prishtinë, Kosovo" />
        <meta name="DC.rights" content="Copyright 2025 Kafeinë. All rights reserved." />

        {/* Additional Open Graph */}
        <meta property="og:image" content="https://www.kafeine-ks.com/images/logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Kafeinë - Coffee Shop në Prishtinë" />
        <meta name="twitter:image" content="https://www.kafeine-ks.com/images/logo.png" />

        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cafeSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }} />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
