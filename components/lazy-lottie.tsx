"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"

interface LazyLottieProps {
  src: string
  className?: string
  style?: CSSProperties
}

/**
 * DotLottie pulls a large WASM player from a third-party CDN. Mount it only
 * when the placeholder is about to enter the viewport so it never competes
 * with the initial LCP path. Visual result is identical once loaded.
 */
export function LazyLottie({ src, className, style }: LazyLottieProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [Player, setPlayer] = useState<React.ComponentType<{
    src: string
    loop?: boolean
    autoplay?: boolean
    style?: CSSProperties
  }> | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let cancelled = false
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        import("@lottiefiles/dotlottie-react").then((mod) => {
          if (!cancelled) setPlayer(() => mod.DotLottieReact)
        })
      },
      { rootMargin: "200px 0px" }
    )
    observer.observe(el)
    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={ref} className={className} style={style}>
      {Player ? (
        <Player src={src} loop autoplay style={{ width: "100%", height: "100%" }} />
      ) : null}
    </div>
  )
}
