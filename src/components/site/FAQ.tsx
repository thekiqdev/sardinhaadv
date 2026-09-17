import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Fui demitido por justa causa. Posso questionar?",
    a: "Sim. A justa causa pode ser questionada quando não estiverem presentes os requisitos necessários para sua aplicação ou quando a penalidade for indevida ou desproporcional. Cada situação deve ser analisada individualmente.",
  },
  {
    q: "Trabalhei sem carteira assinada. Tenho direitos?",
    a: "Se estiverem presentes os requisitos da relação de emprego, o trabalhador pode buscar o reconhecimento do vínculo e os direitos trabalhistas correspondentes.",
  },
  {
    q: "A empresa não pagou minhas horas extras. O que posso fazer?",
    a: "Quando há trabalho além da jornada contratual ou legal sem o pagamento correto, podem existir horas extras e reflexos a serem apurados. É importante analisar a jornada efetivamente cumprida, os registros de ponto e as demais provas disponíveis.",
  },
  {
    q: "Posso sair da empresa e receber como se tivesse sido demitido?",
    a: "Em determinadas situações de descumprimento grave das obrigações pelo empregador, o trabalhador pode requerer a rescisão indireta do contrato, com os direitos previstos em lei.",
  },
  {
    q: "Sofri um acidente no trabalho. Quais são meus direitos?",
    a: "O acidente de trabalho pode gerar diferentes direitos, conforme as circunstâncias do caso, como estabilidade no emprego, indenizações e outros direitos trabalhistas e previdenciários. A situação deve ser analisada individualmente, considerando o acidente, suas consequências e as provas disponíveis.",
  },
  {
    q: "Preciso pagar para conversar com a equipe?",
    a: "Entre em contato pelo WhatsApp para confirmar as condições de atendimento com a nossa equipe.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-24 bg-background py-20 sm:py-28" aria-labelledby="faq-title">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="eyebrow text-gold-foreground/60">Perguntas frequentes</p>
          <h2 id="faq-title" className="mt-4 text-3xl leading-tight sm:text-4xl">
            Dúvidas comuns de quem enfrenta problemas no trabalho
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-12 w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="py-5 text-left font-display text-lg leading-snug hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export const faqItems = faqs;
