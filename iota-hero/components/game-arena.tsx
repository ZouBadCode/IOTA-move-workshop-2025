"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Swords, Heart } from "lucide-react"
import { useState } from "react"

export function GameArena() {
  const [playerHealth, setPlayerHealth] = useState(100)
  const [enemyHealth, setEnemyHealth] = useState(100)
  const [isAttacking, setIsAttacking] = useState(false)

  const handleAttack = () => {
    setIsAttacking(true)
    const damage = Math.floor(Math.random() * 20) + 10
    setEnemyHealth((prev) => Math.max(0, prev - damage))

    setTimeout(() => {
      const counterDamage = Math.floor(Math.random() * 15) + 5
      setPlayerHealth((prev) => Math.max(0, prev - counterDamage))
      setIsAttacking(false)
    }, 500)
  }

  return (
    <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-foreground">Battle Arena</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Swords className="w-4 h-4" />
            <span>Round 1</span>
          </div>
        </div>

        {/* Battle Area */}
        <div className="relative aspect-video bg-gradient-to-b from-muted/30 to-muted/10 rounded-lg border border-border/50 overflow-hidden">
          {/* Player Character */}
          <div className="absolute bottom-8 left-12">
            <div className={`transition-transform ${isAttacking ? "translate-x-8" : ""}`}>
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-5xl animate-float">
                🦸
              </div>
              <div className="mt-2 text-center">
                <div className="flex items-center justify-center gap-1 text-sm">
                  <Heart className="w-4 h-4 text-destructive" />
                  <span className="text-foreground font-bold">{playerHealth}</span>
                </div>
                <p className="text-xs text-muted-foreground">You</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 right-1/4 transform translate-x-1/2">
            <div className={`transition-transform ${isAttacking ? "-translate-x-4 scale-95" : ""}`}>
              <div
                className="w-40 h-40 rounded-full bg-gradient-to-br from-destructive to-warning flex items-center justify-center text-8xl animate-float shadow-2xl shadow-destructive/50"
                style={{ animationDelay: "1s" }}
              >
                👾
              </div>
              <div className="mt-3 text-center">
                <div className="flex items-center justify-center gap-2 text-lg">
                  <Heart className="w-5 h-5 text-destructive" />
                  <span className="text-foreground font-bold text-xl">{enemyHealth}</span>
                </div>
                <p className="text-sm text-muted-foreground font-semibold">Enemy Boss</p>
              </div>
            </div>
          </div>

          {/* Battle Effects */}
          {isAttacking && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl animate-ping">⚔️</div>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleAttack}
            disabled={isAttacking || enemyHealth === 0 || playerHealth === 0}
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 px-12 py-6 text-lg"
          >
            <Swords className="w-5 h-5 mr-2" />
            Attack
          </Button>
        </div>

        {/* Battle Result */}
        {(enemyHealth === 0 || playerHealth === 0) && (
          <div className="text-center p-6 bg-muted/30 rounded-lg border border-border/50">
            <p className="text-2xl font-bold mb-2">{enemyHealth === 0 ? "🎉 Victory!" : "💀 Defeated!"}</p>
            <p className="text-muted-foreground mb-4">
              {enemyHealth === 0 ? "You earned 250 Liquid Tokens!" : "Better luck next time!"}
            </p>
            <Button
              onClick={() => {
                setPlayerHealth(100)
                setEnemyHealth(100)
              }}
              className="bg-gradient-to-r from-primary to-accent"
            >
              New Battle
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
