"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Script from "next/script"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Lock,
  Check,
  Scissors,
  CreditCard,
  Star,
  ArrowLeft,
  Loader2,
  FileText
} from "lucide-react"

declare global {
  interface Window {
    MercadoPago: new (publicKey: string, options?: { locale: string }) => {
      checkout: (options: {
        preference: { id: string }
        autoOpen?: boolean
      }) => void
      bricks: () => {
        create: (brick: string, containerId: string, settings: any) => Promise<any>
      }
    }
  }
}

const plans = {
  site: {
    id: "site",
    name: "Site completo",
    price: 57,
    originalPrice: 97,
    period: "/ mês",
    description: "Para barbearias iniciantes",
    popular: false,
    // FOCO: Você pode alterar o link da imagem abaixo por qualquer outro de sua escolha
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop",
    features: [
      "Site profissional",
      "Gestão de barbeiros",
      "Serviços",
      "Combos e planos",
      "Produtos",
      "Configurações",
    ],
  },
  gestao: {
    id: "gestao",
    name: "Site completo + Plataforma de gestão",
    price: 97,
    originalPrice: 159,
    period: "/ mês",
    description: "Para barbearias em crescimento",
    popular: true,
    // FOCO: Você pode alterar o link da imagem abaixo por qualquer outro de sua escolha
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop",
    features: [
      "Site profissional",
      "Gestão de barbeiros",
      "Serviços",
      "Combos e planos",
      "Produtos",
      "Configurações",
      "Landing page profissional",
      "Agenda completa",
      "Relatórios",
      "Financeiro",
      "CRM de clientes",
      "Permissões avançadas",
      "Gestão completa da barbearia",
    ],
  },
  franquias: {
    id: "franquias",
    name: "Plataforma completa - Multilojas/Franquias",
    price: 249,
    originalPrice: 399,
    period: "/ mês",
    description: "Para redes de barbearias",
    popular: false,
    // FOCO: Você pode alterar o link da imagem abaixo por qualquer outro de sua escolha
    image: "https://images.unsplash.com/photo-1621605815841-db897fb4f07e?q=80&w=2070&auto=format&fit=crop",
    features: [
      "Site profissional",
      "Gestão de barbeiros",
      "Serviços",
      "Combos e planos",
      "Produtos",
      "Configurações",
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
  },
}

type PlanKey = keyof typeof plans

function CheckoutContent() {
  const searchParams = useSearchParams()
  const planParam = searchParams.get("plano") as PlanKey | null
  const [selectedPlan, setSelectedPlan] = useState<PlanKey>(planParam && plans[planParam] ? planParam : "gestao")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mpReady, setMpReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paymentResult, setPaymentResult] = useState<any>(null)
  const [paymentBrickController, setPaymentBrickController] = useState<any>(null)

  useEffect(() => {
    if (planParam && plans[planParam]) {
      setSelectedPlan(planParam)
    }
  }, [planParam])

  const plan = plans[selectedPlan]

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`
  }

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const isValidCPF = (cpf: string) => {
    const numbers = cpf.replace(/\D/g, "")
    if (numbers.length !== 11) return false
    if (/^(\d)\1{10}$/.test(numbers)) return false

    let sum = 0
    let remainder

    for (let i = 1; i <= 9; i++) sum = sum + parseInt(numbers.substring(i - 1, i)) * (11 - i)
    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(numbers.substring(9, 10))) return false

    sum = 0
    for (let i = 1; i <= 10; i++) sum = sum + parseInt(numbers.substring(i - 1, i)) * (12 - i)
    remainder = (sum * 10) % 11
    if (remainder === 10 || remainder === 11) remainder = 0
    if (remainder !== parseInt(numbers.substring(10, 11))) return false

    return true
  }

  const isPhoneValid = formData.phone.replace(/\D/g, "").length >= 10
  const isEmailValid = isValidEmail(formData.email)
  const isCPFValid = isValidCPF(formData.cpf)
  const isFormValid =
    formData.name.trim().length > 0 &&
    isEmailValid &&
    isPhoneValid &&
    isCPFValid

  useEffect(() => {
    console.log("[v0] Checkout state check:", { mpReady, isFormValid, hasController: !!paymentBrickController, hasResult: !!paymentResult })

    if (mpReady && !paymentBrickController && !paymentResult) {
      const renderPaymentBrick = async () => {
        try {
          console.log("[v0] Iniciando renderização do Payment Brick...")
          const mp = new window.MercadoPago(
            process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || "",
            { locale: "pt-BR" }
          )
          const bricksBuilder = mp.bricks()

          const settings = {
            initialization: {
              amount: plan.price,
              payer: {
                email: formData.email,
              },
            },
            customization: {
              paymentMethods: {
                bankTransfer: ["pix"],
                creditCard: "all",
                debitCard: "all",
              },
              visual: {
                style: {
                  theme: "dark",
                  customVariables: {
                    baseColor: "#eab308",
                    buttonBackgroundColor: "#eab308",
                    buttonTextColor: "#000000",
                    formBackgroundColor: "transparent",
                    formControlBackgroundColor: "transparent",
                    formControlInputBackgroundColor: "#18181b",
                    formControlBorderColor: "#27272a",
                    formControlFocusedBorderColor: "#eab308",
                    outlinePrimaryColor: "#eab308",
                    fontSizeExtraSmall: "10px",
                    fontSizeSmall: "12px",
                  }
                },
              },
            },
            callbacks: {
              onReady: () => {
                console.log("[v0] Brick de pagamento pronto")
              },
              onSubmit: ({ selectedPaymentMethod, formData: mpFormData }: any) => {
                return new Promise((resolve, reject) => {
                  fetch("/api/mercadopago/process-payment", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      ...mpFormData,
                      transaction_amount: plan.price,
                      description: `Assinatura Easy Barbearia - ${plan.name}`,
                      external_reference: `${plan.id}_${Date.now()}`,
                      payer: {
                        ...mpFormData.payer,
                        first_name: formData.name.split(" ")[0],
                        last_name: formData.name.split(" ").slice(1).join(" "),
                        identification: {
                          type: "CPF",
                          number: formData.cpf.replace(/\D/g, ""),
                        },
                      }
                    }),
                  })
                    .then((response) => response.json())
                    .then((result) => {
                      console.log("[v0] Resultado do pagamento:", result)
                      if (result.error) {
                        setError(result.details || result.error)
                        reject()
                      } else {
                        setPaymentResult(result)
                        resolve(result)
                      }
                    })
                    .catch((err) => {
                      console.error("[v0] Erro ao processar:", err)
                      setError("Erro ao processar o pagamento.")
                      reject()
                    })
                })
              },
              onError: (error: any) => {
                console.error("[v0] Erro no Brick:", error)
                setError("Erro ao carregar o checkout.")
              },
            },
          }

          const controller = await bricksBuilder.create(
            "payment",
            "payment-brick-container",
            settings
          )
          console.log("[v0] Brick de pagamento renderizado com sucesso")
          setPaymentBrickController(controller)
        } catch (err) {
          console.error("[v0] Erro ao renderizar Brick:", err)
          setError("Erro ao carregar o sistema de pagamento. Por favor, recarregue a página.")
        }
      }

      renderPaymentBrick()
    } else if (paymentBrickController && plan) {
      // Atualiza o valor se o plano mudar
      console.log("[v0] Atualizando valor do Brick para:", plan.price)
      paymentBrickController.update({
        initialization: {
          amount: plan.price,
        },
      })
    }
  }, [mpReady, plan, paymentBrickController, paymentResult])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Cria a preferência de pagamento no Mercado Pago
      const response = await fetch("/api/mercadopago/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId: plan.id,
          planName: plan.name,
          price: plan.price,
          customerData: formData,
        }),
      })

      const data = await response.json()
      console.log("[v0] Resposta da API:", data)

      if (!response.ok) {
        console.log("[v0] Erro na resposta:", data)
        throw new Error(data.details || "Erro ao criar preferência de pagamento")
      }

      // Verifica se o SDK do Mercado Pago está carregado
      if (window.MercadoPago && data.preferenceId) {
        const mp = new window.MercadoPago(
          process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || "",
          { locale: "pt-BR" }
        )

        // Abre o checkout do Mercado Pago
        mp.checkout({
          preference: {
            id: data.preferenceId,
          },
          autoOpen: true,
        })
      } else if (data.initPoint) {
        // Fallback: redireciona para o checkout do Mercado Pago
        window.location.href = data.initPoint
      }
    } catch (err) {
      console.error("[v0] Erro no checkout:", err)
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido"
      setError(`Erro: ${errorMessage}. Verifique se as credenciais do Mercado Pago estão configuradas.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mercado Pago SDK - Otimizado para After Interactive */}
      <Script
        src="https://sdk.mercadopago.com/js/v2"
        strategy="afterInteractive"
        onLoad={() => setMpReady(true)}
      />

      {/* Rastreamento (Pixel/GTM) - Cole seus IDs abaixo */}
      {/* 
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){...}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js'); fbq('init', 'SEU_PIXEL_ID'); fbq('track', 'PageView');`}
        </Script>
      */}

      {/* Layout Minimalista (Foca na Conversão) */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <Scissors className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-black text-xl tracking-tight text-foreground">Easy Barbearia</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16 max-w-4xl">
        {/* Botão Voltar Otimizado */}
        <Link
          href="/#precos"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-accent mb-12 transition-all group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Voltar para a página inicial
        </Link>

        {/* PASSO 1: Escolha do Produto */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">1</div>
            <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Escolha seu Plano</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {(Object.keys(plans) as PlanKey[]).map((key) => {
              const p = plans[key]
              const isSelected = selectedPlan === key
              return (
                <button
                  key={key}
                  onClick={() => setSelectedPlan(key)}
                  className={`p-6 rounded-2xl border text-left transition-all relative group/card ${isSelected
                    ? "border-accent bg-accent/5 ring-1 ring-accent/30 shadow-lg shadow-accent/5"
                    : "border-border bg-card hover:border-border/80"
                    }`}
                >
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-md animate-in zoom-in duration-300">
                      <Check className="w-3.5 h-3.5 text-accent-foreground" />
                    </div>
                  )}
                  <div className="mb-4">
                    <h4 className={`font-black uppercase tracking-wider text-[10px] mb-1 ${isSelected ? 'text-accent' : 'text-muted-foreground'}`}>
                      {p.id === 'gestao' ? 'Mais Popular' : 'Assinatura'}
                    </h4>
                    <h3 className="font-bold text-foreground text-lg leading-tight">{p.name}</h3>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-foreground font-mono">R${p.price}</span>
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter">/mês</span>
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        {/* PASSO 2: Banner Visual */}
        <section className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">2</div>
            <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Visualização do Produto</h2>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl min-h-[220px] sm:min-h-[280px]">
            <div className="absolute inset-0 z-0">
              {plan.image && (
                <img
                  src={plan.image}
                  alt={plan.name}
                  // @ts-ignore
                  fetchpriority="high"
                  className="w-full h-full object-cover opacity-60"
                  loading="eager"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
            </div>

            <div className="relative z-20 p-8 sm:p-12 flex flex-col justify-end h-full min-h-[220px] sm:min-h-[280px]">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <div>
                  <Badge className="bg-accent text-accent-foreground mb-4 font-bold uppercase tracking-widest text-[10px]">
                    {plan.name}
                  </Badge>
                  <h2 className="text-3xl sm:text-5xl font-black text-foreground tracking-tighter leading-none mb-4">
                    {plan.name}
                  </h2>
                  <p className="text-lg text-muted-foreground font-medium max-w-xl">
                    {plan.description}
                  </p>
                </div>
                <div className="flex items-baseline gap-2 shrink-0">
                  <span className="text-5xl font-black text-foreground">R$ {plan.price}</span>
                  <span className="text-sm text-muted-foreground font-bold">/mês</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PASSO 3: Recursos Inclusos */}
        <section className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">3</div>
            <h2 className="text-xl font-black text-foreground uppercase tracking-tight">O que você está levando</h2>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {plan.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border/50 hover:border-accent/30 transition-colors shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 border border-accent/20">
                  <Check className="w-4 h-4 text-accent" />
                </div>
                <span className="text-sm font-bold text-foreground leading-tight">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* PASSO 4: Pagamento */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">4</div>
            <h2 className="text-xl font-black text-foreground uppercase tracking-tight">Finalizar Assinatura</h2>
          </div>

          <div className="bg-card/50 p-6 sm:p-12 rounded-[2rem] border border-divider shadow-2xl relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -mr-32 -mt-32" />

            <form onSubmit={handleSubmit} className="relative z-10 space-y-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-foreground mb-1 uppercase tracking-tight">Dados do Assinante</h3>
                    <p className="text-xs text-muted-foreground mb-6">Informações para acesso e faturamento.</p>
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold animate-shake">
                      {error}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-14 px-5 rounded-xl bg-input border border-border text-foreground text-sm font-bold placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all shadow-inner"
                        placeholder="Nome e Sobrenome"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                        E-mail Principal
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-14 px-5 rounded-xl bg-input border border-border text-foreground text-sm font-bold placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all shadow-inner"
                        placeholder="seu@contato.com"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                          WhatsApp
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                          className={`w-full h-14 px-5 rounded-xl bg-input border text-sm font-bold text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all shadow-inner ${formData.phone && !isPhoneValid ? "border-red-500 focus:ring-red-500" : "border-border"
                            }`}
                          placeholder="(00) 00000-0000"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="cpf" className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                          CPF/CNPJ
                        </label>
                        <input
                          type="text"
                          id="cpf"
                          required
                          value={formData.cpf}
                          onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
                          className={`w-full h-14 px-5 rounded-xl bg-input border text-sm font-bold text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all shadow-inner ${formData.cpf && !isCPFValid ? "border-red-500 focus:ring-red-500" : "border-border"
                            }`}
                          placeholder="000.000.000-00"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-foreground mb-1 uppercase tracking-tight">Forma de Pagamento</h3>
                    <p className="text-xs text-muted-foreground mb-6">Escolha como prefere pagar sua assinatura.</p>
                  </div>

                  <div className="min-h-[350px]">
                    {!mpReady ? (
                      <div className="flex flex-col items-center justify-center p-16 space-y-4 border border-border/50 rounded-2xl bg-card/30">
                        <Loader2 className="w-12 h-12 animate-spin text-accent" />
                        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Criptografando...</p>
                      </div>
                    ) : paymentResult ? (
                      <div className="p-8 rounded-2xl border-2 border-accent bg-accent/5 animate-in zoom-in duration-500 text-center">
                        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-accent/20">
                          <Check className="w-8 h-8 text-accent-foreground" />
                        </div>
                        <h3 className="text-xl font-black text-foreground mb-2">
                          {paymentResult.status === "approved" ? "Assinatura Ativada!" : "Aguardando Pagamento"}
                        </h3>

                        {paymentResult.point_of_interaction?.transaction_data?.qr_code_base64 && (
                          <div className="mt-8 space-y-6">
                            <div className="bg-white p-4 rounded-2xl inline-block shadow-xl border-4 border-white">
                              <img
                                src={`data:image/png;base64,${paymentResult.point_of_interaction.transaction_data.qr_code_base64}`}
                                alt="Pix QR Code"
                                className="w-48 h-48"
                              />
                            </div>
                            <Button
                              className="w-full bg-accent text-accent-foreground font-black uppercase tracking-widest py-6 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                              onClick={() => {
                                if (paymentResult.point_of_interaction?.transaction_data?.qr_code) {
                                  navigator.clipboard.writeText(paymentResult.point_of_interaction.transaction_data.qr_code)
                                  alert("Código Copiado!")
                                }
                              }}
                            >
                              Copiar Código Pix
                            </Button>
                          </div>
                        )}

                        <Link href={`/checkout/sucesso?payment_id=${paymentResult.id}&plano=${selectedPlan}`} className="mt-8 block">
                          <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold">
                            {paymentResult.status === "approved" ? "Acessar Painel" : "Ver Detalhes"}
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div id="payment-brick-container" className="min-h-[350px] bg-card/20 rounded-2xl p-2 border border-border/50 shadow-inner"></div>
                    )}
                  </div>
                </div>
              </div>

              {/* Trust badges footer within the payment form area */}
              <div className="pt-10 border-t border-border/50 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20">
                    <Shield className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground">Proteção de Dados</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent border border-accent/20">
                    <Star className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground">7 Dias Garantidos</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                    <Lock className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground">Pagamento SSL</span>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground">Ativação Instantânea</span>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* Footer Focado em Autoridade e Confiança */}
      <footer className="border-t border-border bg-card/80 py-12 sm:py-20 mt-12 sm:mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Scissors className="w-5 h-5 text-accent" />
                <span className="font-bold text-lg text-foreground">Easy Barbearia</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto sm:mx-0">
                A plataforma #1 para barbeiros que buscam excelência na gestão e atendimento.
              </p>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-6 text-[10px] sm:text-xs text-muted-foreground font-medium">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} Easy Barbearia. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-8">
              <Link href="/termos" className="hover:text-accent transition-colors">Termos de Uso</Link>
              <Link href="/privacidade" className="hover:text-accent transition-colors">Privacidade</Link>
              <a href="https://wa.me/5585991073789" target="_blank" className="text-accent font-bold hover:underline italic">Falar com Suporte</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
