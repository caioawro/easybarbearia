import { MercadoPagoConfig, Payment } from "mercadopago"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const paymentId = searchParams.get("payment_id")

    if (!paymentId) {
        return NextResponse.json({ error: "ID do pagamento não fornecido" }, { status: 400 })
    }

    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
        return NextResponse.json({ error: "Credenciais não configuradas" }, { status: 500 })
    }

    try {
        const client = new MercadoPagoConfig({
            accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
        })
        const payment = new Payment(client)

        const paymentResponse = await payment.get({ id: paymentId })

        return NextResponse.json({
            id: paymentResponse.id,
            status: paymentResponse.status,
            status_detail: paymentResponse.status_detail,
        })
    } catch (error) {
        console.error("[v0] Erro ao verificar pagamento:", error)
        return NextResponse.json({ error: "Erro ao verificar pagamento" }, { status: 500 })
    }
}
