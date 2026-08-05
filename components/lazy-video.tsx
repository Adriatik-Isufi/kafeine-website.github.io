"use client"

import { useEffect, useRef, useState, type VideoHTMLAttributes } from "react"

interface VideoSource {
  src: string
  type?: string
}

interface LazyVideoProps extends Omit<VideoHTMLAttributes<HTMLVideoElement>, "src"> {
  sources: VideoSource[]
  /** Rendered in place of the <video> until it is near the viewport, so layout never shifts. */
  placeholder: React.ReactNode
}

/**
 * Autoplaying background videos are heavy (multi-MB MP4s). Mounting the
 * <video>/<source> tags only once the element is about to enter the
 * viewport keeps the exact same look and autoplay behavior for real users
 * while not competing for bandwidth with the initial page load.
 */
export function LazyVideo({ sources, placeholder, className, ...videoProps }: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: "400px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="contents">
      {shouldLoad ? (
        <video {...videoProps} preload="metadata" className={className}>
          {sources.map((source) => (
            <source key={source.src} src={source.src} type={source.type ?? "video/mp4"} />
          ))}
          {placeholder}
        </video>
      ) : (
        placeholder
      )}
    </div>
  )
}
