"use client"

export function FloatingCharacters() {
  const characters = ["🎮", "💎", "⚔️", "🛡️", "🏆", "⭐", "💫", "🎯"]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {characters.map((char, i) => (
        <div
          key={i}
          className="absolute text-4xl opacity-20 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        >
          {char}
        </div>
      ))}
    </div>
  )
}
