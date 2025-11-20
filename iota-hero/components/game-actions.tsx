"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Coins, Sparkles, Gem, Sword, Skull, Wand2 } from "lucide-react"

export function GameActions() {
  const [cooldowns, setCooldowns] = useState<Record<string, boolean>>({})

  const handleAction = (actionName: string, duration = 3000) => {
    setCooldowns((prev) => ({ ...prev, [actionName]: true }))
    setTimeout(() => {
      setCooldowns((prev) => ({ ...prev, [actionName]: false }))
    }, duration)
  }

  const actions = [
    {
      id: "claim",
      name: "每日提領代幣",
      icon: Coins,
      color: "from-yellow-500 to-amber-600",
      description: "領取每日獎勵",
    },
    {
      id: "summon",
      name: "召喚人物",
      icon: Sparkles,
      color: "from-primary to-accent",
      description: "召喚新角色",
    },
    {
      id: "forge-gem",
      name: "鑄造寶石",
      icon: Gem,
      color: "from-cyan-500 to-blue-600",
      description: "合成強化寶石",
    },
    {
      id: "forge-weapon",
      name: "鑄造武器",
      icon: Sword,
      color: "from-red-500 to-orange-600",
      description: "打造傳奇武器",
    },
    {
      id: "battle",
      name: "挑戰怪物",
      icon: Skull,
      color: "from-purple-500 to-pink-600",
      description: "進入戰鬥",
    },
    {
      id: "enchant",
      name: "附魔升級裝備",
      icon: Wand2,
      color: "from-green-500 to-emerald-600",
      description: "強化裝備屬性",
    },
  ]

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
      <h3 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
        遊戲功能
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action) => {
          const Icon = action.icon
          const isOnCooldown = cooldowns[action.id]

          return (
            <Button
              key={action.id}
              onClick={() => handleAction(action.id)}
              disabled={isOnCooldown}
              className={`h-auto flex-col gap-3 p-6 relative overflow-hidden group transition-all duration-300 ${
                isOnCooldown ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
              }`}
              variant="outline"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />
              <div
                className={`p-3 rounded-full bg-gradient-to-br ${action.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-center space-y-1">
                <div className="font-semibold text-sm">{action.name}</div>
                <div className="text-xs text-muted-foreground">{action.description}</div>
              </div>
              {isOnCooldown && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                  <div className="text-xs font-medium">冷卻中...</div>
                </div>
              )}
            </Button>
          )
        })}
      </div>
    </Card>
  )
}
