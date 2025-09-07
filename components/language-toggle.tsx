"use client"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

interface LanguageToggleProps {
  onLanguageChange: (lang: "sq" | "en") => void
  currentLang: "sq" | "en"
}

export function LanguageToggle({ onLanguageChange, currentLang }: LanguageToggleProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onLanguageChange(currentLang === "sq" ? "en" : "sq")}
      className="border-white/30 hover:border-[#e18b1a] transition-colors"
      style={{
        backgroundColor: "rgba(37, 36, 33, 0.8)",
        color: "white",
        borderColor: "rgba(255, 255, 255, 0.3)",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "rgba(225, 139, 26, 0.2)"
        e.target.style.borderColor = "#e18b1a"
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "rgba(37, 36, 33, 0.8)"
        e.target.style.borderColor = "rgba(255, 255, 255, 0.3)"
      }}
    >
      <Globe className="w-4 h-4 mr-2" style={{ color: "white" }} />
      <span style={{ color: "white" }}>{currentLang === "sq" ? "EN" : "SQ"}</span>
    </Button>
  )
}
