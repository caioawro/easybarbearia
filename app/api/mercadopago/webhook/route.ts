import { MercadoPagoConfig, Payment } from "mercadopago"
import { NextRequest, NextResponse } from "next/server"

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || "",
})

const payment = new Payment(client)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Verifica o tipo de notificação
    if (body.type === "payment") {
      const paymentId = body.data.id
      
      // Busca os detalhes do pagamento
      const paymentData = await payment.get({ id: paymentId })
      
      console.log("[MercadoPago Webhook] Payment received:", {
        id: paymentData.id,
        status: paymentData.status,
        external_reference: paymentData.external_reference,
        amount: paymentData.transaction_amount,
      })

      // Aqui você pode:
      // 1. Atualizar o status do pedido no banco de dados
      // 2. Enviar e-mail de confirmação
      // 3. Ativar a conta do usuário
      // 4. etc.

      switch (paymentData.status) {
        case "approved":
          // Pagamento aprovado - ativar assinatura
          console.log("[MercadoPago] Pagamento aprovado!")
          break
        case "pending":
          // Pagamento pendente (ex: boleto gerado)
          console.log("[MercadoPago] Pagamento pendente")
          break
        case "rejected":
          // Pagamento rejeitado
          console.log("[MercadoPago] Pagamento rejeitado")
          break
        default:
          console.log("[MercadoPago] Status:", paymentData.status)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("[MercadoPago Webhook] Error:", error)
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    )
  }
}
