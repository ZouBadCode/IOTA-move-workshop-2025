"use client"

import { Button } from "@/components/ui/button"
import { Wallet, Menu } from "lucide-react"
import Image from "next/image"

export function GameHeader() {
  return (
    <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Image
                src="/liquidlink-logo-purple.jpg"
                alt="Liquidlink Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Liquid<span className="text-primary">link</span> GameFi
              </h1>
              <p className="text-xs text-muted-foreground">Play. Earn. Dominate.</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#game" className="text-sm text-foreground hover:text-primary transition-colors">
              Game
            </a>
            <a href="#leaderboard" className="text-sm text-foreground hover:text-primary transition-colors">
              Leaderboard
            </a>
            <a href="#rewards" className="text-sm text-foreground hover:text-primary transition-colors">
              Rewards
            </a>
            <a href="#marketplace" className="text-sm text-foreground hover:text-primary transition-colors">
              Marketplace
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
