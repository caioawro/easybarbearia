"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { PlanVideoModal } from "./video-modal"

const plans = [
  {
    id: "site",
    name: "Site completo",
    price: "R$ 57",
    originalPrice: "R$ 97",
    period: "/ mês",
    description: "Para barbearias iniciantes",
    popular: false,
    videoId: "dQw4w9WgXcQ",
    checkoutUrl: "https://easy-barbearia.pay.yampi.com.br/r/QYSQ10ZMF3",
    features: [
      "Site profissional",
      "Gestão de barbeiros",
      "Gestão de serviços",
      "Combos e planos",
      "Gestão de produtos",
      "Configurações básicas",
    ],
    cta: "Começar",
    ctaVariant: "outline" as const,
  },
  {
    id: "gestao",
    name: "Site completo + Plataforma de gestão",
    price: "R$ 97",
    originalPrice: "R$ 159",
    period: "/ mês",
    description: "Para barbearias em crescimento",
    popular: true,
    videoId: "dQw4w9WgXcQ",
    checkoutUrl: "https://easy-barbearia.pay.yampi.com.br/r/JY56FRZLT6",
    features: [
      "Site profissional",
      "Gestão de barbeiros",
      "Gestão de serviços",
      "Combos e planos",
      "Gestão de produtos",
      "Configurações básicas",
      "Landing page profissional",
      "Agenda completa",
      "Relatórios",
      "Financeiro",
      "CRM de clientes",
      "Permissões avançadas",
      "Gestão completa da barbearia",
    ],
    cta: "Começar Agora",
    ctaVariant: "default" as const,
  },
  {
    id: "franquias",
    name: "Plataforma completa - Multilojas/Franquias",
    price: "R$ 249",
    originalPrice: "R$ 399",
    period: "/ mês",
    description: "Para redes de barbearias",
    popular: false,
    videoId: "dQw4w9WgXcQ",
    checkoutUrl: "https://easy-barbearia.pay.yampi.com.br/r/NLIATW6MYO",
    features: [
      "Site profissional",
      "Gestão de barbeiros",
      "Gestão de serviços",
      "Combos e planos",
      "Gestão de produtos",
      "Configurações básicas",
      "Tudo do plano anterior, mais:",
      "Landing page profissional",
      "Agenda completa",
      "Relatórios",
      "Financeiro",
      "CRM de clientes",
      "Permissões avançadas",
      "Gestão completa da barbearia",
      "Gestão de múltiplas barbearias",
      "Controle de franquias",
      "Dashboard centralizado",
      "Administração multi-lojas",
    ],
    cta: "Falar com especialista",
    ctaVariant: "outline" as const,
  },
]

export function Pricing() {
  return (
    <section id="precos" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Planos para todos os tamanhos de barbearia
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para o seu negócio
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-start">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border p-6 lg:p-8 flex flex-col ${plan.popular
                ? "border-accent bg-card scale-105 shadow-xl shadow-accent/10"
                : "border-border bg-card/50"
                }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4">
                  Mais Popular
                </Badge>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                {plan.originalPrice && (
                  <p className="text-sm text-muted-foreground mt-1">
                    <span className="line-through">{plan.originalPrice}</span>
                    <span className="text-green-500 ml-2">Economia de {parseInt(plan.originalPrice.replace(/\D/g, '')) - parseInt(plan.price.replace(/\D/g, ''))}%</span>
                  </p>
                )}
              </div>

              {/* Video Details Button */}
              <div className="mb-6">
                <PlanVideoModal planName={plan.name} videoId={plan.videoId} />
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 mt-0.5 ${plan.popular ? "text-accent" : "text-muted-foreground"}`} />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.ctaVariant}
                size="lg"
                className={`w-full font-medium ${plan.popular ? "bg-accent text-accent-foreground hover:bg-accent/90" : ""}`}
                asChild
              >
                <a href={plan.checkoutUrl}>
                  {plan.cta}
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
