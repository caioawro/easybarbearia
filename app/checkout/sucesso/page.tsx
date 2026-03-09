"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Scissors,
  CheckCircle,
  ArrowRight,
  UserPlus,
  Settings,
  Users,
  Share2,
  Play,
  MessageCircle,
  Shield,
  Loader2,
  AlertCircle,
  ArrowLeft
} from "lucide-react"

const plans = {
  site: {
    name: "Site Completo",
    price: 57,
    features: [
      "Site profissional para sua barbearia",
      "Página de agendamento online",
      "Otimizado para celular",
      "Plataforma completa de gestão",
    ],
  },
  gestao: {
    name: "Site completo + Plataforma de gestão",
    price: 97,
    features: [
      "Tudo do plano anterior",
      "Dashboard financeiro",
      "Controle de estoque",
      "Relatórios avançados",
    ],
  },
  franquias: {
    name: "Plataforma completa - Multilojas/Franquias",
    price: 249,
    features: [
      "Gestão de múltiplas unidades",
      "Painel administrativo central",
      "Relatórios consolidados",
      "Suporte exclusivo VIP",
    ],
  },
}

function SuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isVerifying, setIsVerifying] = useState(true)
  const [isValid, setIsValid] = useState(false)
  const [errorStatus, setErrorStatus] = useState<string | null>(null)

  const paymentId = searchParams.get("payment_id")
  const planId = searchParams.get("plano") || "gestao"
  const plan = plans[planId as keyof typeof plans] || plans.gestao

  useEffect(() => {
    async function verifyPayment() {
      if (!paymentId) {
        setIsVerifying(false)
        setIsValid(false)
        return
      }

      try {
        const res = await fetch(`/api/mercadopago/verify-payment?payment_id=${paymentId}`)
        const data = await res.json()

        if (data.status === "approved") {
          setIsValid(true)
        } else {
          setErrorStatus(data.status || "invalid")
          setIsValid(false)
        }
      } catch (err) {
        console.error("Erro ao verificar pagamento:", err)
        setIsValid(false)
      } finally {
        setIsVerifying(false)
      }
    }

    verifyPayment()
  }, [paymentId])

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <Loader2 className="w-10 h-10 animate-spin text-accent mb-4" />
        <h2 className="text-xl font-semibold text-foreground mb-2 text-center">Verificando seu pagamento...</h2>
        <p className="text-muted-foreground text-center">Isso levará apenas alguns segundos.</p>
      </div>
    )
  }

  if (!isValid) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2 text-center">Acesso não autorizado</h2>
        <p className="text-muted-foreground text-center mb-8 max-w-sm">
          {paymentId
            ? `O pagamento com ID ${paymentId} não pôde ser validado (Status: ${errorStatus}).`
            : "Não encontramos uma confirmação de pagamento para esta sessão."}
        </p>
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Button asChild>
            <Link href="/checkout">Ir para o Checkout</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/#precos">Voltar para Planos</Link>
          </Button>
        </div>
      </div>
    )
  }

  const steps = [
    {
      number: 1,
      icon: UserPlus,
      title: "Crie sua conta de acesso",
      description: "Configure seu login e senha para acessar a plataforma",
      button: "Criar minha conta",
      href: "#",
    },
    {
      number: 2,
      icon: Settings,
      title: "Configure sua barbearia",
      description: "Adicione nome da barbearia, cidade e serviços",
      button: null,
      href: null,
    },
    {
      number: 3,
      icon: Users,
      title: "Adicione barbeiros e agenda",
      description: "Configure sua equipe e horários de atendimento",
      button: null,
      href: null,
    },
    {
      number: 4,
      icon: Share2,
      title: "Compartilhe seu site com clientes",
      description: "Divulgue nas redes sociais e comece a receber agendamentos",
      button: null,
      href: null,
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Minimal Navbar */}
      <header className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-foreground">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Scissors className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">Easy Barbearia</span>
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Precisa de ajuda?
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Success Confirmation */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Pagamento confirmado!
            </h1>

            <p className="text-lg text-muted-foreground mb-2 text-center">
              Sua assinatura foi ativada com sucesso.
            </p>

            <p className="text-sm text-muted-foreground text-center">
              Seu acesso à plataforma já está disponível.
            </p>
          </div>

          {/* Plan Confirmation Card */}
          <Card className="mb-12 bg-card border-border overflow-hidden">
            <div className="h-2 bg-accent w-full" />
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-foreground">{plan.name}</CardTitle>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-accent">R${plan.price}</span>
                <span className="text-muted-foreground">/ mês</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Inclui:</p>
              <ul className="space-y-2 mb-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="p-3 rounded-lg bg-muted text-[10px] text-muted-foreground flex items-center gap-2">
                <AlertCircle className="w-3 h-3" />
                <span>Cobrança recorrente via Mercado Pago (ID: {paymentId})</span>
              </div>
            </CardContent>
          </Card>

          {/* Onboarding Steps */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
              Próximos passos para começar
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {steps.map((step) => (
                <Card key={step.number} className="bg-card border-border hover:border-accent/40 transition-colors">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        <step.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-accent">Passo {step.number}</span>
                        </div>
                        <h3 className="font-medium text-foreground mb-1">{step.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{step.description}</p>
                        {step.button && (
                          <Button size="sm" variant="outline" asChild className="h-8 text-xs">
                            <Link href={step.href || "#"}>
                              {step.button}
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Access Button */}
          <div className="text-center mb-12">
            <Button size="lg" className="w-full sm:w-auto px-12 h-14 text-base font-semibold shadow-lg shadow-primary/20" asChild>
              <Link href="#">
                Acessar Painel da Barbearia
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Setup Help */}
          <Card className="mb-12 bg-secondary/30 border-border">
            <CardContent className="p-6 text-center">
              <h3 className="font-medium text-foreground mb-4">
                Quer ajuda para configurar?
              </h3>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" className="gap-2 h-11">
                  <Play className="w-4 h-4" />
                  Assistir tutorial
                </Button>
                <Button variant="outline" className="gap-2 h-11">
                  <MessageCircle className="w-4 h-4" />
                  Falar no WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Termos de uso</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Privacidade</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Suporte</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  )
}
