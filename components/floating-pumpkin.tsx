"use client"

export default function FloatingPumpkin({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 z-50 group transition-all duration-300 hover:scale-110"
      aria-label="View Halloween 2025 Event"
    >
      <div className="w-20 h-20 animate-float-slow">
        <img
          src="/halloween-2025/pumpkin.png"
          alt="Halloween Pumpkin"
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </div>
    </button>
  )
}
