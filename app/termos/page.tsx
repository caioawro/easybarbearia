"use client"

import Link from "next/link"
import { Scissors, ArrowLeft, Shield, Scale, ScrollText, CreditCard, UserCheck, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TermsOfService() {
    const sections = [
        { id: "aceitacao", title: "1. Aceitação dos Termos", icon: UserCheck },
        { id: "descricao", title: "2. Descrição do Serviço", icon: Scissors },
        { id: "planos", title: "3. Planos e Assinaturas", icon: ScrollText },
        { id: "pagamentos", title: "4. Pagamentos", icon: CreditCard },
        { id: "responsabilidades", title: "5. Responsabilidades do Usuário", icon: Shield },
        { id: "cancelamento", title: "6. Suspensão ou Cancelamento", icon: AlertCircle },
        { id: "limitacao", title: "7. Limitação de Responsabilidade", icon: Scale },
        { id: "alteracoes", title: "8. Alterações nos Termos", icon: ScrollText },
    ]

    return (
        <div className="min-h-screen bg-background">
            {/* Sticky Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover:bg-primary/90 transition-colors">
                            <Scissors className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">EasyBarbearia</span>
                    </Link>
                    <Button variant="ghost" size="sm" asChild className="gap-2">
                        <Link href="/">
                            <ArrowLeft className="w-4 h-4" />
                            Voltar ao Início
                        </Link>
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12 lg:py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-12 text-center lg:text-left">
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
                            Termos de Uso
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Última atualização: {new Date().toLocaleDateString('pt-BR')}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-[250px_1fr] gap-12">
                        {/* Table of Contents - Desktop */}
                        <aside className="hidden lg:block sticky top-32 h-fit">
                            <nav className="space-y-1">
                                <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 px-3">
                                    Nesta página
                                </p>
                                {sections.map((section) => (
                                    <Link
                                        key={section.id}
                                        href={`#${section.id}`}
                                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-accent hover:bg-accent/5 rounded-md transition-all border-l-2 border-transparent hover:border-accent"
                                    >
                                        {section.title}
                                    </Link>
                                ))}
                            </nav>
                        </aside>

                        {/* Content Sections */}
                        <div className="space-y-16">
                            <section id="aceitacao" className="scroll-mt-24">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-accent/10">
                                        <UserCheck className="w-6 h-6 text-accent" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">1. Aceitação dos Termos</h2>
                                </div>
                                <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
                                    <p>
                                        Ao acessar e utilizar a plataforma EasyBarbearia, você concorda em cumprir e estar vinculado aos seguintes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços.
                                    </p>
                                    <p>
                                        Estes termos aplicam-se a todos os visitantes, usuários e outros que acessam ou usam o Serviço. O uso contínuo da plataforma após quaisquer alterações constitui aceitação dos novos Termos de Uso.
                                    </p>
                                </div>
                            </section>

                            <section id="descricao" className="scroll-mt-24">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-accent/10">
                                        <Scissors className="w-6 h-6 text-accent" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">2. Descrição do Serviço</h2>
                                </div>
                                <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
                                    <p>
                                        A EasyBarbearia é uma plataforma SaaS (Software as a Service) que fornece ferramentas tecnológicas integradas para a gestão e crescimento de barbearias, incluindo:
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Criação e hospedagem de sites profissionais para barbearias;</li>
                                        <li>Páginas de captura (Landing Pages) para aquisição de novos clientes;</li>
                                        <li>Sistema de gestão administrativa e operacional online;</li>
                                        <li>Ferramentas de agendamento online e gestão de calendário;</li>
                                        <li>CRM para gestão de relacionamento com clientes;</li>
                                        <li>Controle de vendas de produtos e estoque;</li>
                                        <li>Relatórios financeiros e dashboard de performance.</li>
                                    </ul>
                                </div>
                            </section>

                            <section id="planos" className="scroll-mt-24">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-accent/10">
                                        <ScrollText className="w-6 h-6 text-accent" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">3. Planos e Assinaturas</h2>
                                </div>
                                <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
                                    <p>Oferecemos diferentes planos de assinatura para atender às necessidades do seu negócio:</p>
                                    <div className="grid sm:grid-cols-3 gap-4 mb-6">
                                        <div className="p-4 rounded-xl border border-border bg-card/50">
                                            <h4 className="font-bold text-accent mb-1">Starter</h4>
                                            <p className="text-xs">Ideal para barbeiros autônomos.</p>
                                        </div>
                                        <div className="p-4 rounded-xl border border-accent bg-accent/5">
                                            <h4 className="font-bold text-accent mb-1">Professional</h4>
                                            <p className="text-xs">Plano completo para barbearias em expansão.</p>
                                        </div>
                                        <div className="p-4 rounded-xl border border-border bg-card/50">
                                            <h4 className="font-bold text-accent mb-1">Enterprise</h4>
                                            <p className="text-xs">Gestão multilojas e franquias.</p>
                                        </div>
                                    </div>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li><strong>Cobrança Recorrente:</strong> A assinatura é renovada automaticamente em ciclos mensais, utilizando o método de pagamento cadastrado.</li>
                                        <li><strong>Cancelamento:</strong> Você pode cancelar sua assinatura a qualquer momento através do painel de controle. O acesso permanecerá ativo até o final do período já pago.</li>
                                        <li><strong>Upgrade/Downgrade:</strong> A atualização de planos pode ser feita a qualquer tempo, com ajuste imediato ou no próximo ciclo, dependendo da configuração.</li>
                                    </ul>
                                </div>
                            </section>

                            <section id="pagamentos" className="scroll-mt-24">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-accent/10">
                                        <CreditCard className="w-6 h-6 text-accent" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">4. Pagamentos</h2>
                                </div>
                                <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
                                    <p>
                                        Todos os pagamentos dentro da plataforma são processados de forma segura através do <strong>Mercado Pago</strong>.
                                    </p>
                                    <p>
                                        <strong>Segurança:</strong> EasyBarbearia não armazena dados confidenciais de cartões de crédito em seus próprios servidores. Todas as transações são encriptadas e processadas diretamente pelo processador de pagamentos.
                                    </p>
                                    <p>Aceitamos os seguintes métodos:</p>
                                    <div className="flex gap-4 items-center grayscale opacity-70">
                                        <span className="text-xs font-bold border border-border px-2 py-1 rounded">PIX</span>
                                        <span className="text-xs font-bold border border-border px-2 py-1 rounded">CARTÃO DE CRÉDITO</span>
                                        <span className="text-xs font-bold border border-border px-2 py-1 rounded">CARTÃO DE DÉBITO</span>
                                    </div>
                                </div>
                            </section>

                            <section id="responsabilidades" className="scroll-mt-24">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-accent/10">
                                        <Shield className="w-6 h-6 text-accent" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">5. Responsabilidades do Usuário</h2>
                                </div>
                                <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
                                    <p>Como usuário da EasyBarbearia, você se compromete a:</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Fornecer informações precisas, completas e atualizadas durante o cadastro;</li>
                                        <li>Manter a segurança e confidencialidade da sua senha de acesso;</li>
                                        <li>Notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta;</li>
                                        <li>Utilizar a plataforma apenas para fins legais e éticos, respeitando a legislação vigente;</li>
                                        <li>Não utilizar robôs, scripts ou automações que possam prejudicar o desempenho do serviço.</li>
                                    </ul>
                                </div>
                            </section>

                            <section id="cancelamento" className="scroll-mt-24">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-accent/10">
                                        <AlertCircle className="w-6 h-6 text-accent" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">6. Suspensão ou Cancelamento</h2>
                                </div>
                                <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
                                    <p>
                                        Reservamo-nos o direito de suspender ou encerrar sua conta e acesso ao serviço imediatamente, sem aviso prévio ou responsabilidade, se:
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Identificarmos uso indevido ou violação sistemática destes Termos;</li>
                                        <li>Houver suspeita de atividades fraudulentas ou ilegais;</li>
                                        <li>Ocorrer falta de pagamento após tentativas de cobrança sem sucesso.</li>
                                    </ul>
                                </div>
                            </section>

                            <section id="limitacao" className="scroll-mt-24">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-accent/10">
                                        <Scale className="w-6 h-6 text-accent" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">7. Limitação de Responsabilidade</h2>
                                </div>
                                <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
                                    <p>
                                        A plataforma é fornecida "como está" e "conforme disponível". Embora busquemos a excelência técnica, a EasyBarbearia não garante que o serviço será ininterrupto, seguro ou livre de erros em todos os momentos.
                                    </p>
                                    <p>
                                        Poderão ocorrer manutenções programadas ou emergenciais. Não nos responsabilizamos por perdas de lucros ou danos indiretos resultantes do uso ou da incapacidade de usar o serviço.
                                    </p>
                                </div>
                            </section>

                            <section id="alteracoes" className="scroll-mt-24">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-accent/10">
                                        <ScrollText className="w-6 h-6 text-accent" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">8. Alterações nos Termos</h2>
                                </div>
                                <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
                                    <p>
                                        Podemos atualizar nossos Termos de Uso periodicamente para refletir mudanças em nossos serviços ou na lei. Notificaremos você sobre quaisquer alterações publicando os novos termos nesta página.
                                    </p>
                                    <p>
                                        Recomendamos a revisão regular deste documento. O uso da plataforma após as alterações entrarem em vigor implica em sua aceitação.
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>

            {/* Basic Footer for Legal Pages */}
            <footer className="border-t border-border py-12 bg-card/30">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-2">
                            <Scissors className="w-4 h-4 text-accent" />
                            <span className="font-bold">EasyBarbearia</span>
                        </div>
                        <div className="flex gap-6 text-sm text-muted-foreground">
                            <Link href="/termos" className="hover:text-accent transition-colors">Termos de Uso</Link>
                            <Link href="/privacidade" className="hover:text-accent transition-colors">Privacidade</Link>
                            <Link href="/#suporte" className="hover:text-accent transition-colors">Suporte</Link>
                            <Link href="/#contato" className="hover:text-accent transition-colors">Contato</Link>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            &copy; {new Date().getFullYear()} EasyBarbearia. Todos os direitos reservados.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
