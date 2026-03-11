"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Calendar, TrendingUp, DollarSign } from "lucide-react"
import { VideoModal } from "./video-modal"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 lg:pt-0 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-secondary/50 via-background to-background" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Social Proof Badge */}
            <Badge variant="outline" className="w-fit px-4 py-2 gap-2 border-border bg-secondary/50">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-muted-foreground">Mais de</span>
                <span className="text-foreground font-semibold">100+</span>
                <span className="text-muted-foreground">barbearias já usam a plataforma</span>
              </span>
            </Badge>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Transforme sua Barbearia em um{" "}
              <span className="text-accent">Negócio Profissional</span> Online
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Site profissional + sistema completo de gestão para barbearias em uma única plataforma simples e acessível.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="font-medium text-base px-8 h-12" asChild>
                <Link href="#precos">
                  Começar Agora
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <VideoModal
                triggerText="Ver como funciona"
                title="Conheça a Easy Barbearia"
                triggerVariant="outline"
                triggerSize="lg"
                triggerClassName="font-medium text-base px-8 h-12"
              />
            </div>
          </div>

          <div className="relative group">
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl transition-all duration-300 group-hover:shadow-accent/10 group-hover:border-accent/30">
              <img
                src="https://i.imgur.com/s6LP1ET.png"
                alt="Easy"
                className="w-full h-auto block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-[100px] -z-10" />

            {/* Visual indicator badge */}
            <div className="absolute -bottom-4 -right-4 bg-background border border-border px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 animate-bounce-subtle">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-bold text-foreground">Gestão de Agendamentos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
