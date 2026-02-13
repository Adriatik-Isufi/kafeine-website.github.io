import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Puno me Ne | Kafeinë - Karriera",
  description: "Bashkohu me ekipin tonë dhe bëhu pjesë e familjes Kafeinë. Pozicione të hapura për barista dhe arkatare në Prishtinë.",
  alternates: {
    canonical: "https://www.kafeine-ks.com/careers/",
  },
  openGraph: {
    title: "Puno me Ne | Kafeinë",
    description: "Bashkohu me ekipin tonë dhe bëhu pjesë e familjes Kafeinë. Kërkojmë persona të pasionuar që duan të krijojnë përvojë të veçanta.",
    url: "https://www.kafeine-ks.com/careers/",
  },
}

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
