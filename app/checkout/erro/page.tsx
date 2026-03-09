"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Scissors, XCircle, ArrowLeft } from "lucide-react"

export default function ErrorPage() {
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
          <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Pagamento não aprovado
          </h1>
          
          <p className="text-muted-foreground mb-8">
            Infelizmente não foi possível processar seu pagamento. Por favor, 
            verifique os dados do cartão ou tente outro método de pagamento.
          </p>

          <div className="space-y-3">
            <Button size="lg" className="w-full" asChild>
              <Link href="/checkout?plano=gestao">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Tentar novamente
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" className="w-full" asChild>
              <Link href="/">
                Voltar ao início
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
