import { CreditCard, Settings, Rocket } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: CreditCard,
    title: "Selecione seu plano",
    description: "Configure sua conta em poucos minutos com um processo simples e intuitivo.",
  },
  {
    number: "02",
    icon: Settings,
    title: "Configure seus serviços, barbeiros e produtos",
    description: "Adicione equipe, defina preços e organize seu catálogo de serviços, combos e planos.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Atue como um profissional",
    description: "Comece a acompanhar métricas, gerenciar agendamentos e veja seu faturamento crescer.",
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Como funciona
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comece em 3 passos simples
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-full h-px bg-border" />
                )}
                
                <div className="relative bg-card rounded-2xl border border-border p-8 text-center">
                  {/* Step number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-sm font-bold px-4 py-1 rounded-full">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-secondary mx-auto mb-6 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
