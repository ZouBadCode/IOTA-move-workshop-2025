"use client"

import { PlayerStats } from "@/components/player-stats"
import { GameArena } from "@/components/game-arena"
import { Leaderboard } from "@/components/leaderboard"
import { RewardsPanel } from "@/components/rewards-panel"
import { GameActions } from "@/components/game-actions"
import { CharacterEquipment } from "@/components/character-equipment"

export function GameDashboard() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-balance">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
            LiquidQuest
          </span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
          Battle, collect, and earn rewards in the ultimate GameFi experience
        </p>
      </section>

      {/* Player Stats */}
      <PlayerStats />

      <GameActions />

      {/* Main Game Area */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <GameArena />
        </div>
        <div className="space-y-6">
          <CharacterEquipment />
          <RewardsPanel />
        </div>
      </div>

      {/* Leaderboard */}
      <Leaderboard />
    </div>
  )
}
