"use client"

import { useEffect, useRef, useState, type VideoHTMLAttributes } from "react"

interface VideoSource {
  src: string
  type?: string
}

interface LazyVideoProps extends Omit<VideoHTMLAttributes<HTMLVideoElement>, "src"> {
  sources: VideoSource[]
  /** Shown until the video is near the viewport. */
  placeholder: React.ReactNode
}

/**
 * Autoplaying background videos are heavy (multi-MB MP4s). Mount the
 * <video>/<source> tags only once the element is about to enter the
 * viewport so they don't compete with the initial LCP path.
 *
 * Important: the observed wrapper must generate a real layout box.
 * `display: contents` breaks IntersectionObserver (no box → never intersects).
 */
export function LazyVideo({ sources, placeholder, className, ...videoProps }: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: "300px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!shouldLoad) return
    const video = videoRef.current
    if (!video) return
    // Dynamically mounted videos sometimes miss the autoplay attribute race.
    const play = () => {
      video.play().catch(() => {
        /* autoplay can be blocked; muted+playsInline usually succeeds */
      })
    }
    if (video.readyState >= 2) play()
    else video.addEventListener("loadeddata", play, { once: true })
  }, [shouldLoad])

  return (
    <div ref={containerRef} className="h-full w-full min-h-[1px]">
      {shouldLoad ? (
        <video ref={videoRef} {...videoProps} preload="metadata" className={className}>
          {sources.map((source) => (
            <source key={source.src} src={source.src} type={source.type ?? "video/mp4"} />
          ))}
        </video>
      ) : (
        placeholder
      )}
    </div>
  )
}
