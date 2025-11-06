"use client"

import { Card } from "@/components/ui/card"
import { Trophy, TrendingUp, Medal } from "lucide-react"

const leaderboardData = [
  { rank: 1, name: "CryptoKing", points: 45230, avatar: "👑", change: 0 },
  { rank: 2, name: "LiquidMaster", points: 42150, avatar: "🦸", change: 1 },
  { rank: 3, name: "GameChamp", points: 38920, avatar: "🎮", change: -1 },
  { rank: 4, name: "TokenHunter", points: 35670, avatar: "🎯", change: 2 },
  { rank: 5, name: "NFTWarrior", points: 32450, avatar: "⚔️", change: 0 },
  { rank: 6, name: "DeFiHero", points: 28930, avatar: "🛡️", change: -2 },
  { rank: 7, name: "BlockchainBoss", points: 25120, avatar: "💎", change: 1 },
  { rank: 8, name: "You", points: 12450, avatar: "🦸", change: 3 },
]

export function Leaderboard() {
  return (
    <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50" id="leaderboard">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">Global Leaderboard</h3>
            <p className="text-sm text-muted-foreground">Top players this season</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {leaderboardData.map((player) => (
          <div
            key={player.rank}
            className={`flex items-center justify-between p-4 rounded-lg border transition-all hover:scale-[1.02] ${
              player.name === "You"
                ? "bg-primary/10 border-primary/50 animate-pulse-glow"
                : "bg-muted/30 border-border/50 hover:bg-muted/50"
            }`}
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="flex items-center justify-center w-12">
                {player.rank <= 3 ? (
                  <div
                    className={`text-2xl ${
                      player.rank === 1
                        ? "text-warning"
                        : player.rank === 2
                          ? "text-muted-foreground"
                          : "text-warning/60"
                    }`}
                  >
                    <Medal className="w-8 h-8" />
                  </div>
                ) : (
                  <span className="text-lg font-bold text-muted-foreground">#{player.rank}</span>
                )}
              </div>

              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl">
                {player.avatar}
              </div>

              <div className="flex-1">
                <p className="font-semibold text-foreground">{player.name}</p>
                <p className="text-sm text-muted-foreground">{player.points.toLocaleString()} points</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {player.change !== 0 && (
                <div
                  className={`flex items-center gap-1 text-sm ${
                    player.change > 0 ? "text-success" : "text-destructive"
                  }`}
                >
                  <TrendingUp className={`w-4 h-4 ${player.change < 0 ? "rotate-180" : ""}`} />
                  <span>{Math.abs(player.change)}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
