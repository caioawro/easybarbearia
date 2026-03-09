export function Partners() {
  const partners = [
    "Barbearia Elite",
    "BarberKing",
    "The Gentlemen",
    "Urban Cuts",
    "Classic Barber",
    "Style Masters",
    "Prime Barber",
    "Royal Cuts",
  ]

  return (
    <section className="py-16 lg:py-20 border-y border-border bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-sm text-muted-foreground mb-2">Barbearias que confiam na plataforma</p>
          <p className="text-xs text-muted-foreground/70">
            Utilizado por barbearias modernas que querem crescer e profissionalizar a gestão.
          </p>
        </div>

        {/* Logo Grid */}
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-6 py-3 rounded-lg bg-secondary/50 border border-border/50 hover:border-border transition-colors"
            >
              <span className="text-sm font-medium text-muted-foreground">{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
