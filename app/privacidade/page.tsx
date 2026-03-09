"use client"

import Link from "next/link"
import { Scissors, ArrowLeft, Shield, Database, Lock, Eye, Users, HardDrive, MessageSquare, Handshake } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicy() {
    const sections = [
        { id: "coleta", title: "1. Dados Coletados", icon: Eye },
        { id: "finalidade", title: "2. Finalidade do Uso", icon: MessageSquare },
        { id: "armazenamento", title: "3. Armazenamento", icon: Database },
        { id: "infraestrutura", title: "4. Infraestrutura", icon: HardDrive },
        { id: "pagamentos", title: "5. Pagamentos", icon: Lock },
        { id: "compartilhamento", title: "6. Compartilhamento", icon: Handshake },
        { id: "lgpd", title: "7. Direitos do Usuário (LGPD)", icon: Users },
        { id: "seguranca", title: "8. Segurança", icon: Shield },
        { id: "contato", title: "9. Contato", icon: MessageSquare },
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
                            Política de Privacidade
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
                            <section id="coleta" className="scroll-mt-24">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-accent/10">
                                        <Eye className="w-6 h-6 text-accent" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">1. Dados Coletados</h2>
                                </div>
                                <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
                                    <p>
                                        Para fornecer nossos serviços de gestão, coletamos informações que você nos fornece diretamente ao se cadastrar e utilizar a EasyBarbearia:
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li><strong>Dados Pessoais:</strong> Nome completo, endereço de e-mail e número de telefone;</li>
                                        <li><strong>Dados do Negócio:</strong> Nome da barbearia, endereço, CNPJ (se aplicável) e fotos;</li>
                                        <li><strong>Dados de Clientes:</strong> Informações sobre os clientes que você cadastra no sistema (nomes, telefones, históricos de agendamento);</li>
                                        <li><strong>Dados de Uso:</strong> Informações sobre como você interage com a plataforma para fins de melhoria técnica.</li>
                                    </ul>
                                </div>
                            </section>

                            <section id="finalidade" className="scroll-mt-24">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-accent/10">
                                        <MessageSquare className="w-6 h-6 text-accent" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">2. Finalidade do Uso dos Dados</h2>
                                </div>
                                <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
                                    <p>Os dados coletados são utilizados exclusivamente para:</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li><strong>Operar a Plataforma:</strong> Garantir que as ferramentas de agendamento, financeiro e site funcionem corretamente para você;</li>
                                        <li><strong>Melhoria de Serviços:</strong> Analisar o uso para desenvolver novas funcionalidades e correções;</li>
                                        <li><strong>Comunicação:</strong> Enviar avisos sobre sua conta, atualizações do sistema ou newsletters (as quais você pode cancelar a qualquer momento);</li>
                                        <li><strong>Suporte Técnico:</strong> Auxiliar na resolução de problemas relatados por você.</li>
                                    </ul>
                                </div>
                            </section>

                            <section id="armazenamento" className="scroll-mt-24">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-accent/10">
                                        <Database className="w-6 h-6 text-accent" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">3. Armazenamento de Dados</h2>
                                </div>
                                <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
                                    <p>
                                        A segurança dos seus dados é prioridade. Utilizamos a infraestrutura de banco de dados do <strong>Supabase</strong> para armazenar todas as informações da plataforma de forma segura e escalável.
                                    </p>
                                    <p>
                                        Os dados são protegidos por camadas de autenticação robustas e criptografia em repouso, garantindo que apenas usuários autorizados tenham acesso às suas respectivas informações.
                                    </p>
                                </div>
                            </section>

                            <section id="infraestrutura" className="scroll-mt-24">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-accent/10">
                                        <HardDrive className="w-6 h-6 text-accent" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">4. Infraestrutura</h2>
                                </div>
                                <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
                                    <p>
                                        Nossa aplicação é hospedada globalmente através da infraestrutura de nuvem da <strong>Vercel</strong>.
                                    </p>
                                    <p>
                                        Isso garante alta disponibilidade, carregamento rápido em qualquer lugar e proteção contra ataques de negação de serviço (DDoS), mantendo seu site e sistema sempre online para seus clientes.
                                    </p>
                                </div>
                            </section>

                            <section id="pagamentos" className="scroll-mt-24">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-accent/10">
                                        <Lock className="w-6 h-6 text-accent" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">5. Pagamentos</h2>
                                </div>
                                <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
                                    <p>
                                        Processamos pagamentos por meio do <strong>Mercado Pago</strong>.
                                    </p>
                                    <p>
                                        A EasyBarbearia não tem acesso e não armazena dados de cartão de crédito ou informações bancárias sensíveis. Toda a transação ocorre em ambiente seguro providenciado pelo processador de pagamentos, que nos notifica apenas sobre o status da aprovação.
                                    </p>
                                </div>
                            </section>

                            <section id="compartilhamento" className="scroll-mt-24">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-accent/10">
                                        <Handshake className="w-6 h-6 text-accent" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">6. Compartilhamento de Dados</h2>
                                </div>
                                <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
                                    <p>
                                        <strong>Não vendemos seus dados para terceiros.</strong> Seu sucesso e privacidade são fundamentais.
                                    </p>
                                    <p>
                                        O compartilhamento de dados ocorre apenas com provedores de serviços essenciais (como os mencionados: Supabase, Vercel e Mercado Pago) e estritamente sob a necessidade de operar as funcionalidades da plataforma. Suas informações podem ser abertas a autoridades legais apenas se houver uma ordem judicial válida.
                                    </p>
                                </div>
                            </section>

                            <section id="lgpd" className="scroll-mt-24">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-accent/10">
                                        <Users className="w-6 h-6 text-accent" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">7. Direitos do Usuário (LGPD)</h2>
                                </div>
                                <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
                                    <p>
                                        De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem o direito de:
                                    </p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li>Solicitar acesso aos dados que temos sobre você/sua barbearia;</li>
                                        <li>Solicitar a correção de dados incompletos ou inexatos;</li>
                                        <li>Solicitar a exclusão de seus dados pessoais (o que resultará no encerramento da conta);</li>
                                        <li>Revogar consentimentos previamente dados para comunicações de marketing.</li>
                                    </ul>
                                </div>
                            </section>

                            <section id="seguranca" className="scroll-mt-24">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-accent/10">
                                        <Shield className="w-6 h-6 text-accent" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">8. Segurança</h2>
                                </div>
                                <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
                                    <p>
                                        Empregamos práticas de segurança de padrão industrial para proteger seus dados. Isso inclui o uso de protocolos HTTPS (SSL) em toda a comunicação, monitoramento contínuo de vulnerabilidades e firewalls de aplicação web.
                                    </p>
                                </div>
                            </section>

                            <section id="contato" className="scroll-mt-24">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-accent/10">
                                        <MessageSquare className="w-6 h-6 text-accent" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">9. Contato</h2>
                                </div>
                                <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
                                    <p>
                                        Se você tiver dúvidas sobre esta Política de Privacidade ou desejar exercer seus direitos de dados, entre em contato conosco através do e-mail:
                                    </p>
                                    <p className="font-bold text-accent">contato@easybarbearia.com.br</p>
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
