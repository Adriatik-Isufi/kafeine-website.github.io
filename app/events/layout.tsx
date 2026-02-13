import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Events | Kafeinë - Ngjarjet",
  description: "Shfletoni ngjarjet tona të kaluara dhe të ardhshme në Kafeinë. Halloween, Viti i Ri dhe më shumë.",
  alternates: {
    canonical: "https://www.kafeine-ks.com/events/",
  },
  openGraph: {
    title: "Events | Kafeinë",
    description: "Shfletoni ngjarjet tona të kaluara dhe të ardhshme në Kafeinë. Halloween, Viti i Ri dhe më shumë.",
    url: "https://www.kafeine-ks.com/events/",
  },
}

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
