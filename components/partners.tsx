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

        {/* Infinite Scroll Wrapper */}
        <div className="relative w-full overflow-hidden mask-fade-edges">
          <div className="flex animate-scroll hover:[animation-play-state:paused] w-max gap-8 lg:gap-12 py-4">
            {/* Double the array for seamless loop */}
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center px-8 py-4 rounded-xl bg-secondary/40 border border-border/50 hover:border-accent/40 hover:bg-secondary/60 transition-all duration-300 shadow-sm shrink-0"
              >
                <span className="text-sm lg:text-base font-semibold text-muted-foreground group-hover:text-foreground">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
