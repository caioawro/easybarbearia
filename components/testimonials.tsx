import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Carlos Silva",
    role: "Proprietário",
    company: "Barbearia Elite",
    avatar: "CS",
    rating: 5,
    text: "Agora tenho controle total da minha barbearia e mais clientes pelo Google. O sistema é muito fácil de usar.",
  },
  {
    name: "Pedro Santos",
    role: "Gerente",
    company: "BarberKing",
    avatar: "PS",
    rating: 5,
    text: "O financeiro e os relatórios me ajudam a tomar decisões melhores. Meu faturamento cresceu 30% em 3 meses.",
  },
  {
    name: "Lucas Oliveira",
    role: "Proprietário",
    company: "The Gentlemen",
    avatar: "LO",
    rating: 5,
    text: "Melhor investimento que fiz. A agenda organizada acabou com os conflitos de horário que eu tinha.",
  },
  {
    name: "Rafael Costa",
    role: "Proprietário",
    company: "Urban Cuts",
    avatar: "RC",
    rating: 5,
    text: "O CRM me ajuda a conhecer melhor meus clientes. Agora consigo fazer promoções direcionadas.",
  },
]

export function Testimonials() {
  return (
    <section id="depoimentos" className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Barbeiros que já estão crescendo com a plataforma
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Veja o que nossos clientes dizem sobre a experiência
          </p>
        </div>

        {/* Testimonials Infinite Scroll Wrapper */}
        <div className="relative w-full overflow-hidden mask-fade-edges">
          <div className="flex animate-scroll hover:[animation-play-state:paused] w-max gap-6 py-4">
            {/* Double the array for seamless loop */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl border border-border p-6 flex flex-col w-[300px] sm:w-[350px] shrink-0 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent text-sm font-bold">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role} • {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
