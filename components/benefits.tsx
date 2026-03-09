import { Search, LayoutDashboard, CalendarDays, LineChart, UserCheck, ShoppingBag } from "lucide-react"

const benefits = [
  {
    icon: Search,
    title: "Mais clientes pelo Google",
    description: "Tenha um site profissional otimizado para aparecer nas buscas da sua região.",
    featured: true,
  },
  {
    icon: LayoutDashboard,
    title: "Gestão completa da barbearia",
    description: "Controle barbeiros, serviços, produtos e combos em um único sistema.",
    featured: false,
  },
  {
    icon: CalendarDays,
    title: "Agenda e organização",
    description: "Gerencie horários e evite conflitos de agenda.",
    featured: false,
  },
  {
    icon: LineChart,
    title: "Controle financeiro",
    description: "Veja faturamento, relatórios e performance do negócio.",
    featured: true,
  },
  {
    icon: UserCheck,
    title: "CRM de clientes",
    description: "Saiba quem são seus melhores clientes e aumente a recorrência.",
    featured: false,
  },
  {
    icon: ShoppingBag,
    title: "Venda de produtos",
    description: "Gerencie e venda produtos diretamente pelo sistema.",
    featured: false,
  },
]

export function Benefits() {
  return (
    <section id="beneficios" className="py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
            Benefícios
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tudo o que sua barbearia precisa para crescer e se profissionalizar
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            const isLarge = index === 0 || index === 3
            
            return (
              <div
                key={index}
                className={`group relative rounded-2xl border border-border bg-card p-6 lg:p-8 transition-all duration-300 hover:border-accent/50 hover:bg-card/80 ${
                  isLarge ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                {/* Icon */}
                <div className="mb-4 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-6 h-6 text-accent" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>

                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-accent/5 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
