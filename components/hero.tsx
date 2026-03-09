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
                <Link href="/checkout?plano=gestao">
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

          {/* Right Column - Dashboard Mockup */}
          <div className="relative">
            <div className="relative bg-card rounded-2xl border border-border p-4 shadow-2xl">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent text-sm font-bold">EB</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Easy Barbearia</p>
                    <p className="text-xs text-muted-foreground">Dashboard</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">Hoje</Badge>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-secondary/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-accent" />
                    <span className="text-xs text-muted-foreground">Clientes</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">248</p>
                  <p className="text-xs text-green-500">+12% este mês</p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span className="text-xs text-muted-foreground">Agendamentos</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">42</p>
                  <p className="text-xs text-muted-foreground">Esta semana</p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-accent" />
                    <span className="text-xs text-muted-foreground">Faturamento</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">R$ 8.4k</p>
                  <p className="text-xs text-green-500">+23% este mês</p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    <span className="text-xs text-muted-foreground">Crescimento</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">18%</p>
                  <p className="text-xs text-muted-foreground">Média mensal</p>
                </div>
              </div>

              {/* Appointments Preview */}
              <div className="bg-secondary/30 rounded-xl p-4">
                <p className="text-sm font-medium text-foreground mb-3">Próximos agendamentos</p>
                <div className="space-y-2">
                  {[
                    { name: "Carlos Silva", time: "14:00", service: "Corte + Barba" },
                    { name: "Pedro Santos", time: "15:30", service: "Corte" },
                    { name: "João Lima", time: "16:00", service: "Barba" },
                  ].map((appointment, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-xs font-medium text-accent">
                          {appointment.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{appointment.name}</p>
                          <p className="text-xs text-muted-foreground">{appointment.service}</p>
                        </div>
                      </div>
                      <span className="text-sm text-accent font-medium">{appointment.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
