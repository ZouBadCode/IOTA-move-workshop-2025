"use client"

import { Card } from "@/components/ui/card"
import { Trophy, Coins, Zap, Target } from "lucide-react"

const stats = [
  {
    label: "Total Points",
    value: "12,450",
    change: "+245",
    icon: Trophy,
    color: "text-primary",
  },
  {
    label: "Liquid Tokens",
    value: "8,920",
    change: "+120",
    icon: Coins,
    color: "text-secondary",
  },
  {
    label: "Energy",
    value: "85/100",
    change: "Regenerating",
    icon: Zap,
    color: "text-accent",
  },
  {
    label: "Win Rate",
    value: "68%",
    change: "+5%",
    icon: Target,
    color: "text-success",
  },
]

export function PlayerStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.label}
            className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all hover:scale-105"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs text-success font-medium">{stat.change}</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
