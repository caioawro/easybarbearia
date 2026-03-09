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
    features: [
      "Tudo do plano anterior, mais:",
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
    features: [
      "Tudo do plano anterior, mais:",
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
    barbershopName: "",
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
    isCPFValid &&
    formData.barbershopName.trim().length > 0

  useEffect(() => {
    console.log("[v0] Checkout state check:", { mpReady, isFormValid, hasController: !!paymentBrickController, hasResult: !!paymentResult })

    if (mpReady && isFormValid && !paymentBrickController && !paymentResult) {
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
    }
  }, [mpReady, isFormValid, plan, paymentBrickController, paymentResult])

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
      {/* Mercado Pago SDK */}
      <Script
        src="https://sdk.mercadopago.com/js/v2"
        onLoad={() => setMpReady(true)}
      />

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
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="w-4 h-4" />
              <span>Pagamento Seguro</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        {/* Back Button */}
        <Link
          href="/#precos"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground mb-6 sm:mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Voltar para planos
        </Link>

        {/* Checkout Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-2 sm:mb-3">
            Finalize sua assinatura
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Você está a poucos passos de profissionalizar sua barbearia.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Left Column - Plan Selection & Form */}
          <div className="space-y-6 sm:space-y-10 order-2 lg:order-1">
            {/* Plan Selector */}
            <div className="bg-card/30 p-4 sm:p-0 rounded-2xl sm:bg-transparent border border-border sm:border-0">
              <h2 className="text-lg font-semibold text-foreground mb-4">Escolha seu plano</h2>
              <div className="space-y-3">
                {(Object.keys(plans) as PlanKey[]).map((key) => {
                  const p = plans[key]
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedPlan(key)}
                      className={`w-full p-3.5 sm:p-4 rounded-xl border text-left transition-all ${selectedPlan === key
                        ? "border-accent bg-accent/10"
                        : "border-border bg-card/50 hover:border-border/80"
                        }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 sm:gap-3 shrink min-w-0">
                          <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedPlan === key ? "border-accent" : "border-muted-foreground"
                            }`}>
                            {selectedPlan === key && (
                              <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-accent" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-medium text-foreground text-sm sm:text-base truncate">{p.name}</span>
                              {p.popular && (
                                <Badge className="bg-accent text-accent-foreground text-[10px] sm:text-xs px-1.5 py-0">
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground truncate">{p.description}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="flex flex-col">
                            <span className="font-bold text-foreground text-sm sm:text-base">R$ {p.price}</span>
                            <span className="text-muted-foreground text-[10px] sm:text-xs">/mês</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Form */}
            <div className="bg-card/30 p-5 sm:p-0 rounded-2xl sm:bg-transparent border border-border sm:border-0">
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                <h2 className="text-lg font-semibold text-foreground mb-1">Seus dados</h2>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4">Preencha com seus dados reais para emissão da nota fiscal.</p>

                {error && (
                  <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs sm:text-sm font-medium text-foreground">
                        Nome completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-11 px-4 rounded-lg bg-input border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                        placeholder="Seu nome"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs sm:text-sm font-medium text-foreground">
                        E-mail
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-11 px-4 rounded-lg bg-input border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-xs sm:text-sm font-medium text-foreground">
                        WhatsApp
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                        className={`w-full h-11 px-4 rounded-lg bg-input border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all ${formData.phone && !isPhoneValid ? "border-red-500 focus:ring-red-500" : "border-border"
                          }`}
                        placeholder="(00) 00000-0000"
                        maxLength={15}
                      />
                      {formData.phone && !isPhoneValid && (
                        <p className="text-[10px] text-red-500 mt-0.5">Mínimo 10 dígitos</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="cpf" className="text-xs sm:text-sm font-medium text-foreground">
                        CPF
                      </label>
                      <input
                        type="text"
                        id="cpf"
                        required
                        value={formData.cpf}
                        onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
                        className={`w-full h-11 px-4 rounded-lg bg-input border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all ${formData.cpf && !isCPFValid ? "border-red-500 focus:ring-red-500" : "border-border"
                          }`}
                        placeholder="000.000.000-00"
                        maxLength={14}
                      />
                      {formData.cpf && !isCPFValid && (
                        <p className="text-[10px] text-red-500 mt-0.5">CPF inválido</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="barbershopName" className="text-xs sm:text-sm font-medium text-foreground">
                      Nome da sua barbearia
                    </label>
                    <input
                      type="text"
                      id="barbershopName"
                      required
                      value={formData.barbershopName}
                      onChange={(e) => setFormData({ ...formData, barbershopName: e.target.value })}
                      className="w-full h-11 px-4 rounded-lg bg-input border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                      placeholder="Barbearia Premium"
                    />
                  </div>
                </div>

                {/* Payment Section */}
                <div className="space-y-6 pt-4">
                  {!isFormValid ? (
                    <div className="p-6 rounded-xl border border-dashed border-border bg-card/30 text-center">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Preencha seus dados para habilitar o pagamento.
                      </p>
                      {/* Debug validation state */}
                      <div className="hidden">
                        {JSON.stringify({ isEmailValid, isPhoneValid, isCPFValid })}
                      </div>
                    </div>
                  ) : paymentResult ? (
                    <div className="p-5 sm:p-6 rounded-xl border border-accent bg-accent/5 mt-12 sm:mt-20 animate-in fade-in slide-in-from-bottom-8 duration-500">
                      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Check className="w-5 h-5 text-accent" />
                        <span className="pt-[5px] leading-none">
                          {paymentResult.status === "approved" ? "Assinatura Confirmada!" : "Pagamento em Processamento"}
                        </span>
                      </h3>

                      {paymentResult.point_of_interaction?.transaction_data?.qr_code_base64 && (
                        <div className="space-y-4 text-center">
                          <p className="text-xs sm:text-sm text-muted-foreground">Escaneie o QR Code para pagar via Pix:</p>
                          <div className="bg-white p-3 rounded-lg inline-block text-center flex justify-center mx-auto">
                            <img
                              src={`data:image/png;base64,${paymentResult.point_of_interaction.transaction_data.qr_code_base64}`}
                              alt="QR Code Pix"
                              className="w-40 h-40 sm:w-48 sm:h-48"
                            />
                          </div>
                          <div className="space-y-2">
                            <p className="text-[10px] sm:text-xs text-muted-foreground">Ou copie o código abaixo:</p>
                            <textarea
                              readOnly
                              className="w-full text-[10px] sm:text-xs p-2 bg-muted rounded border border-border resize-none h-16 sm:h-20"
                              value={paymentResult.point_of_interaction.transaction_data.qr_code}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full h-9 text-xs sm:text-sm"
                              onClick={() => {
                                if (paymentResult.point_of_interaction?.transaction_data?.qr_code) {
                                  navigator.clipboard.writeText(paymentResult.point_of_interaction.transaction_data.qr_code)
                                  alert("Código copiado!")
                                }
                              }}
                              type="button"
                            >
                              Copiar código Pix
                            </Button>
                          </div>
                        </div>
                      )}

                      <Link
                        href={`/checkout/sucesso?payment_id=${paymentResult.id}&plano=${selectedPlan}`}
                        className="mt-6 block text-center"
                      >
                        <Button className="w-full h-11 bg-accent text-accent-foreground">
                          {paymentResult.status === "approved" ? "Ir para o Painel" : "Verificar Pagamento"}
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div id="payment-brick-container" className="min-h-[250px]"></div>
                  )}
                </div>

                {/* Trust Footer */}
                <div className="flex flex-col items-center gap-4 pt-6 mt-2 border-t border-border">
                  <div className="flex flex-col items-center gap-2 mb-2">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold opacity-70">Processado por</p>
                    <img
                      src="https://images.seeklogo.com/logo-png/19/2/mercado-pago-logo-png_seeklogo-198430.png"
                      alt="Mercado Pago"
                      className="h-16 sm:h-18 object-contain brightness-110 contrast-125"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-xs sm:text-sm text-green-500 font-medium">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Pagamento Seguro</span>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground">
                      <Shield className="w-3.5 h-3.5" />
                      <span>7 dias de garantia</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Dados criptografados</span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="pt-2 text-center">
                  <p className="text-[10px] text-muted-foreground mb-2">Aceitamos Pix, Crédito e Débito</p>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-8 h-fit order-1 lg:order-2">
            <div className={`rounded-2xl border p-5 sm:p-8 ${plan.popular ? "border-accent/40 bg-card/60 shadow-xl shadow-accent/5" : "border-border bg-card/40"
              }`}>
              {plan.popular && (
                <Badge className="bg-accent text-accent-foreground mb-4 text-[10px] sm:text-xs">
                  Recomendado
                </Badge>
              )}

              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-accent" />
                </div>
              </div>

              {/* Price */}
              <div className="py-6 border-b border-border/50">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-bold text-foreground">R$ {plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                {plan.originalPrice && (
                  <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="text-xs sm:text-sm text-muted-foreground line-through opacity-60">R$ {plan.originalPrice}</span>
                    <Badge variant="outline" className="text-[10px] border-green-500/30 bg-green-500/5 text-green-500 w-fit">
                      Economize R$ {plan.originalPrice - plan.price}/mês
                    </Badge>
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="mt-6">
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">Recursos inclusos:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-accent" />
                      </div>
                      <span className="text-sm text-muted-foreground leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Satisfaction Guarantee */}
              <div className="mt-8 p-4 rounded-xl bg-muted/30 border border-border/30">
                <p className="text-[11px] text-muted-foreground text-center italic">
                  "Junte-se a centenas de barbeiros que já profissionalizaram sua gestão com a Easy Barbearia."
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-12 sm:mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
            <p className="text-center sm:text-left order-2 sm:order-1">
              © {new Date().getFullYear()} Easy Barbearia. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6 order-1 sm:order-2">
              <a href="#" className="hover:text-foreground transition-colors">Termos</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
              <a href="#" className="hover:text-foreground transition-colors">Suporte</a>
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
