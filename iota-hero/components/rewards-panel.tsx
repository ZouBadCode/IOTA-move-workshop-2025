"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift, Star, Sparkles } from "lucide-react"

const dailyRewards = [
  { day: 1, reward: "100", claimed: true },
  { day: 2, reward: "150", claimed: true },
  { day: 3, reward: "200", claimed: false },
  { day: 4, reward: "250", claimed: false },
  { day: 5, reward: "500", claimed: false },
]

export function RewardsPanel() {
  return (
    <div className="space-y-6">
      {/* Daily Rewards */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Daily Rewards</h3>
          <Gift className="w-5 h-5 text-primary" />
        </div>

        <div className="space-y-3">
          {dailyRewards.map((item) => (
            <div
              key={item.day}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                item.claimed
                  ? "bg-muted/30 border-border/30 opacity-50"
                  : "bg-muted/50 border-primary/50 animate-pulse-glow"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    item.claimed ? "bg-muted" : "bg-gradient-to-br from-primary to-accent"
                  }`}
                >
                  <span className="text-lg">{item.claimed ? "✓" : "🎁"}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Day {item.day}</p>
                  <p className="text-xs text-muted-foreground">{item.reward} Tokens</p>
                </div>
              </div>
              {!item.claimed && item.day === 3 && (
                <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
                  Claim
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Achievements */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Achievements</h3>
          <Star className="w-5 h-5 text-warning" />
        </div>

        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">🏆</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">First Victory</p>
                <p className="text-xs text-muted-foreground">Win your first battle</p>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style={{ width: "100%" }} />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">⚔️</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Battle Master</p>
                <p className="text-xs text-muted-foreground">Win 10 battles (7/10)</p>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style={{ width: "70%" }} />
            </div>
          </div>
        </div>
      </Card>

      {/* Special Offer */}
      <Card className="p-6 bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm border-primary/50">
        <div className="text-center space-y-3">
          <Sparkles className="w-8 h-8 text-primary mx-auto" />
          <h3 className="text-lg font-bold text-foreground">Limited Offer!</h3>
          <p className="text-sm text-muted-foreground">Get 2x rewards for the next 24 hours</p>
          <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">Activate Boost</Button>
        </div>
      </Card>
    </div>
  )
}
