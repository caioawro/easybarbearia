"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Preciso saber tecnologia para usar?",
    answer: "Não! Nossa plataforma foi desenvolvida para ser super simples e intuitiva. Você não precisa de nenhum conhecimento técnico. Em poucos minutos já estará usando todas as funcionalidades.",
  },
  {
    question: "O site já vem pronto?",
    answer: "Sim! Ao finalizar o pagamento, você já terá um site profissional pronto, otimizado para aparecer no Google. Basta personalizar com as informações da sua barbearia.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer: "Sim! Não existe fidelidade. Você pode cancelar sua assinatura a qualquer momento, sem multas ou taxas extras.",
  },
  {
    question: "Funciona para mais de uma barbearia?",
    answer: "Sim! Com o plano Enterprise você pode gerenciar múltiplas barbearias, franquias e ter um dashboard centralizado para acompanhar todas as unidades.",
  },
  {
    question: "O sistema funciona no celular?",
    answer: "Sim! Nossa plataforma é 100% responsiva. Você pode gerenciar sua barbearia de qualquer lugar, pelo celular, tablet ou computador.",
  },
  {
    question: "O dominio está incluso no plano?",
    answer: "Sim, já entregamos o site com um dominio, porém caso voce queira trocar por um de sua preferencia, o custo é de proximadamente R$ 40,00 por ano.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tire suas dúvidas sobre a plataforma
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-accent/50"
              >
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
