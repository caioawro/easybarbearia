"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Scissors, Clock, ArrowRight } from "lucide-react"

export default function PendingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            <Link href="/" className="flex items-center gap-2 text-foreground">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Scissors className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-lg">Easy Barbearia</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-yellow-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Pagamento Pendente
          </h1>
          
          <p className="text-muted-foreground mb-8">
            Seu pagamento está sendo processado. Assim que for confirmado, você 
            receberá um e-mail com as instruções de acesso à sua conta.
          </p>

          <div className="bg-card border border-border rounded-xl p-6 mb-8 text-left">
            <h3 className="font-medium text-foreground mb-3">O que fazer agora?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Se você gerou um boleto, efetue o pagamento</li>
              <li>• Aguarde a confirmação do pagamento</li>
              <li>• Você receberá um e-mail quando for aprovado</li>
            </ul>
          </div>

          <Button size="lg" className="w-full" asChild>
            <Link href="/">
              Voltar ao início
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
