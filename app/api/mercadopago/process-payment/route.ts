import { MercadoPagoConfig, Payment } from "mercadopago"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    console.log("[v0] Iniciando processamento de pagamento transparente...")

    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
        return NextResponse.json(
            { error: "Credenciais não configuradas" },
            { status: 500 }
        )
    }

    try {
        const client = new MercadoPagoConfig({
            accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
        })
        const payment = new Payment(client)

        const body = await request.json()
        console.log("[v0] Dados do pagamento recebidos:", {
            payment_method_id: body.payment_method_id,
            transaction_amount: body.transaction_amount,
            payer_email: body.payer?.email
        })

        // Processar o pagamento
        const paymentResponse = await payment.create({
            body: {
                transaction_amount: body.transaction_amount,
                token: body.token,
                description: body.description,
                installments: body.installments,
                payment_method_id: body.payment_method_id,
                issuer_id: body.issuer_id,
                payer: body.payer,
                notification_url: process.env.NEXT_PUBLIC_BASE_URL?.includes("localhost")
                    ? undefined
                    : `${process.env.NEXT_PUBLIC_BASE_URL}/api/mercadopago/webhook`,
                external_reference: body.external_reference,
            }
        })

        console.log("[v0] Pagamento processado. Status:", paymentResponse.status)

        return NextResponse.json({
            id: paymentResponse.id,
            status: paymentResponse.status,
            status_detail: paymentResponse.status_detail,
            point_of_interaction: paymentResponse.point_of_interaction, // Contém QR Code do Pix
        })
    } catch (error) {
        console.error("[v0] Erro ao processar pagamento:", error)
        let errorMessage = "Erro ao processar pagamento"
        let details = ""

        if (error && typeof error === "object") {
            // @ts-ignore - Mercado Pago error structure
            details = error.message || JSON.stringify(error)
        }

        return NextResponse.json(
            { error: errorMessage, details },
            { status: 500 }
        )
    }
}
