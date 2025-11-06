"use client"

import { Card } from "@/components/ui/card"
import { useState } from "react"

interface Equipment {
  id: string
  name: string
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary"
  stats: string
}

export function CharacterEquipment() {
  const [equipment, setEquipment] = useState<{
    sword: Equipment | null
    shield: Equipment | null
    gem: Equipment | null
  }>({
    sword: {
      id: "sword-1",
      name: "紫晶之劍",
      icon: "⚔️",
      rarity: "epic",
      stats: "+50 攻擊力",
    },
    shield: {
      id: "shield-1",
      name: "守護者盾牌",
      icon: "🛡️",
      rarity: "rare",
      stats: "+30 防禦力",
    },
    gem: {
      id: "gem-1",
      name: "力量寶石",
      icon: "💎",
      rarity: "legendary",
      stats: "+20% 暴擊率",
    },
  })

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "from-yellow-500 to-orange-500"
      case "epic":
        return "from-purple-500 to-pink-500"
      case "rare":
        return "from-blue-500 to-cyan-500"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const EquipmentSlot = ({
    type,
    item,
    label,
  }: {
    type: "sword" | "shield" | "gem"
    item: Equipment | null
    label: string
  }) => (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`relative w-24 h-24 rounded-xl border-2 ${
          item ? "border-primary/50 bg-gradient-to-br from-primary/20 to-accent/20" : "border-muted bg-muted/20"
        } flex items-center justify-center transition-all hover:scale-105 hover:border-primary cursor-pointer group`}
      >
        {item ? (
          <>
            <div
              className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(item.rarity)} opacity-20 rounded-xl`}
            />
            <span className="text-4xl relative z-10 group-hover:scale-110 transition-transform">{item.icon}</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
          </>
        ) : (
          <span className="text-3xl opacity-30">❓</span>
        )}
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {item && (
          <>
            <p
              className={`text-xs font-semibold bg-gradient-to-r ${getRarityColor(
                item.rarity,
              )} bg-clip-text text-transparent`}
            >
              {item.name}
            </p>
            <p className="text-xs text-muted-foreground">{item.stats}</p>
          </>
        )}
      </div>
    </div>
  )

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
      <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        角色裝備
      </h3>

      <div className="flex flex-col items-center gap-8">
        {/* Character Display */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary via-accent to-secondary p-1">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
              <span className="text-6xl">🧙‍♂️</span>
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary/90 rounded-full">
            <p className="text-sm font-bold text-primary-foreground whitespace-nowrap">等級 25</p>
          </div>
        </div>

        {/* Equipment Slots */}
        <div className="grid grid-cols-3 gap-6 w-full max-w-md">
          <EquipmentSlot type="sword" item={equipment.sword} label="武器" />
          <EquipmentSlot type="shield" item={equipment.shield} label="盾牌" />
          <EquipmentSlot type="gem" item={equipment.gem} label="寶石" />
        </div>

        {/* Total Stats */}
        <div className="w-full max-w-md p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">50</p>
              <p className="text-xs text-muted-foreground">攻擊力</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">30</p>
              <p className="text-xs text-muted-foreground">防禦力</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-secondary">20%</p>
              <p className="text-xs text-muted-foreground">暴擊率</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
