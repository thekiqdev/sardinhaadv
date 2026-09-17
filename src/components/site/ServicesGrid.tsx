import { Scale } from "lucide-react";
import { serviceImage } from "@/lib/optimized-images";
import { ServiceCard, type Service } from "./ServiceCard";

const services: Service[] = [
  {
    title: "Acidente de Trabalho",
    description:
      "Sofreu um acidente no trabalho, ficou afastado ou teve alguma sequela? O acidente de trabalho pode gerar direitos como estabilidade, indenizações e outras reparações trabalhistas.",
    image: serviceImage("servico-acidente"),
    alt: "Trabalhador com lesão no braço sendo auxiliado em galpão industrial",
  },
  {
    title: "Doenças Ocupacionais",
    description:
      "Burnout, ansiedade, depressão, LER/DORT, tendinite e problemas de coluna podem estar relacionados ao trabalho. Se o trabalho causou ou agravou o adoecimento, é importante analisar os direitos envolvidos.",
    image: serviceImage("servico-doencas-ocupacionais"),
    alt: "Trabalhador estressado e cansado sentado à mesa do escritório",
  },
  {
    title: "Insalubridade e Periculosidade",
    description:
      "Trabalha exposto a agentes nocivos, produtos químicos, ruído, calor excessivo, eletricidade ou outras situações de risco? A atividade exercida pode gerar direito aos adicionais de insalubridade ou periculosidade.",
    image: serviceImage("servico-insalubridade"),
    alt: "Trabalhador industrial com capacete e equipamentos de proteção próximo a máquinas",
  },
  {
    title: "Horas Extras e Intervalo de Almoço",
    description:
      "Trabalha além do horário, antes ou depois do ponto, ou não consegue fazer corretamente o intervalo de almoço? Essas situações podem gerar horas extras e outros direitos trabalhistas.",
    image: serviceImage("servico-horas-extras"),
    alt: "Trabalhador na mesa do escritório à noite com relógio na parede",
  },
  {
    title: "Rescisão Indireta",
    description:
      "A empresa descumpre suas obrigações e continuar no emprego se tornou difícil? Faltas graves do empregador podem permitir a rescisão indireta do contrato, com os direitos previstos em lei.",
    image: serviceImage("servico-rescisao"),
    alt: "Trabalhadora em conversa tensa com gestor em sala de reunião",
  },
  {
    title: "Demissão por Justa Causa",
    description:
      "Foi demitido por justa causa e considera que a penalidade foi injusta ou desproporcional? A justa causa pode ser questionada. Podemos analisar se existem fundamentos para buscar sua reversão.",
    image: serviceImage("servico-justa-causa"),
    alt: "Profissional deixando o escritório carregando caixa com seus pertences",
  },
  {
    title: "Carteira de Trabalho e FGTS",
    description:
      "Trabalhou sem registro, teve períodos sem anotação ou descobriu que o FGTS não foi depositado corretamente? Essas irregularidades podem gerar direitos e diferenças a serem apuradas.",
    image: serviceImage("servico-carteira"),
    alt: "Carteira de Trabalho e Previdência Social ao lado do aplicativo FGTS da Caixa",
  },
  {
    title: "Assédio Moral e Dano Moral",
    description:
      "Humilhações, perseguições, constrangimentos e cobranças abusivas fazem parte da sua rotina de trabalho? Essas condutas podem ultrapassar os limites do poder do empregador e gerar direito à reparação.",
    image: serviceImage("servico-assedio"),
    alt: "Funcionário cabisbaixo em mesa de reunião com colegas ao fundo",
  },
  {
    title: "Comissões, Prêmios e Remuneração Variável",
    description:
      "Suas comissões diminuíram, as metas não são claras ou você não consegue conferir os valores recebidos? Podemos analisar os critérios de cálculo e verificar a existência de diferenças na remuneração.",
    image: serviceImage("servico-comissoes"),
    alt: "Vendedor atendendo cliente no balcão de uma loja",
  },
];

export function ServicesGrid() {
  return (
    <section id="areas" className="scroll-mt-24 bg-sand py-20 sm:py-28" aria-labelledby="areas-title">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-gold-foreground/60">Identifique o seu problema</p>
          <h2 id="areas-title" className="mt-4 text-balance text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]">
            Está passando por algum desses problemas no trabalho?
          </h2>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground">
            Cada situação pode envolver direitos diferentes. Conheça alguns dos principais casos em que
            atuamos na defesa dos trabalhadores.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className="h-px w-24 bg-border sm:w-40" />
            <Scale className="size-5 text-gold" />
            <span className="h-px w-24 bg-border sm:w-40" />
          </div>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
