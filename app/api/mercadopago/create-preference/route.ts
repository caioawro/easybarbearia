import { MercadoPagoConfig, Preference } from "mercadopago"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  console.log("[v0] Iniciando criação de preferência...")
  console.log("[v0] Access Token configurado:", !!process.env.MERCADOPAGO_ACCESS_TOKEN)

  // Verifica se o Access Token está configurado
  if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
    console.error("[v0] MERCADOPAGO_ACCESS_TOKEN não está configurado!")
    return NextResponse.json(
      { error: "Credenciais do Mercado Pago não configuradas", details: "Configure a variável MERCADOPAGO_ACCESS_TOKEN nas configurações do projeto (Settings > Vars)." },
      { status: 500 }
    )
  }

  try {
    // Inicializa o cliente do Mercado Pago dentro da função
    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
    })
    const preference = new Preference(client)

    const body = await request.json()
    const { planId, planName, price, customerData } = body

    console.log("[v0] Dados recebidos:", { planId, planName, price, customerData })

    // Validação básica
    if (!planId || !planName || !price || !customerData) {
      console.log("[v0] Dados incompletos!")
      return NextResponse.json(
        { error: "Dados incompletos", details: "Preencha todos os campos obrigatórios." },
        { status: 400 }
      )
    }

    // Detecta a URL base automaticamente a partir do request e remove barra final se existir
    const requestUrl = new URL(request.url)
    const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || `${requestUrl.protocol}//${requestUrl.host}`).replace(/\/$/, "")

    console.log("[v0] Base URL detectada:", baseUrl)

    const back_urls = {
      success: `${baseUrl}/checkout/sucesso`,
      failure: `${baseUrl}/checkout/erro`,
      pending: `${baseUrl}/checkout/pendente`,
    }

    console.log("[v0] Back URLs configuradas:", back_urls)

    // Cria a preferência de pagamento
    const preferenceData = await preference.create({
      body: {
        items: [
          {
            id: planId,
            title: `Easy Barbearia - ${planName}`,
            description: `Assinatura mensal do plano ${planName}`,
            quantity: 1,
            currency_id: "BRL",
            unit_price: Number(price), // Garante que seja um número
          },
        ],
        payer: {
          name: customerData.name,
          email: customerData.email,
          phone: {
            area_code: customerData.phone?.replace(/\D/g, "").slice(0, 2) || "",
            number: customerData.phone?.replace(/\D/g, "").slice(2) || "",
          },
          identification: {
            type: "CPF",
            number: customerData.cpf?.replace(/\D/g, "") || "",
          },
        },
        back_urls,
        auto_return: baseUrl.includes("localhost") ? undefined : "approved",
        external_reference: `${planId}_${Date.now()}`,
        // Notification URL não funciona em localhost
        notification_url: baseUrl.includes("localhost") ? undefined : `${baseUrl}/api/mercadopago/webhook`,
        statement_descriptor: "EASYBARBEARIA",
        payment_methods: {
          excluded_payment_types: [
            { id: "ticket" } // Exclui Boleto/Ticket
          ],
          excluded_payment_methods: [
            { id: "bolbradesco" },
            { id: "pec" }
          ],
          installments: 12,
        },
      },
    })

    console.log("[v0] Preferência criada com sucesso:", preferenceData.id)

    return NextResponse.json({
      preferenceId: preferenceData.id,
      initPoint: preferenceData.init_point,
      sandboxInitPoint: preferenceData.sandbox_init_point,
    })
  } catch (error) {
    console.error("[v0] Erro ao criar preferência:", error)

    // Melhor tratamento de erro
    let errorMessage = "Erro desconhecido"
    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === "object" && error !== null) {
      errorMessage = JSON.stringify(error)
    }

    return NextResponse.json(
      { error: "Erro ao processar pagamento", details: errorMessage },
      { status: 500 }
    )
  }
}
