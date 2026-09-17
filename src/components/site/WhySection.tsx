import { Scale } from "lucide-react";
import { portraitImage } from "@/lib/optimized-images";
import { ResponsiveImage } from "./ResponsiveImage";
import { InView } from "./InView";

const practiceAreas = [
  "Acidentes de trabalho",
  "Doenças ocupacionais",
  "Horas extras",
  "Rescisão indireta",
  "Justa causa",
  "Insalubridade e periculosidade",
  "FGTS",
  "Ausência de registro",
  "Diferenças salariais",
  "Remuneração variável",
];

export function WhySection() {
  return (
    <section
      id="sobre"
      className="scroll-mt-24 bg-sand py-20 sm:py-28"
      aria-labelledby="orientacao-title"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <InView as="figure" className="relative mx-auto w-full max-w-md lg:mx-0 lg:sticky lg:top-28">
          <span className="absolute -left-4 -top-4 hidden h-28 w-28 border-l border-t border-gold/60 lg:block" />
          <ResponsiveImage
            webpSrcSet={portraitImage.webpSrcSet}
            src={portraitImage.src}
            width={portraitImage.width}
            height={portraitImage.height}
            sizes={portraitImage.sizes}
            alt="Dra. Bianca Sardinha, advogada trabalhista"
            loading="lazy"
            decoding="async"
            className="relative block"
            imgClassName="relative aspect-[3/4] w-full rounded-lg object-cover object-[center_18%] shadow-card"
          />
          <figcaption className="absolute inset-x-0 bottom-0 rounded-b-lg bg-gradient-to-t from-navy-deep via-navy-deep/80 to-transparent px-6 pb-5 pt-16">
            <p className="font-display text-2xl text-navy-foreground">Dra. Bianca Sardinha</p>
            <p className="mt-0.5 text-sm text-gold">Advogada trabalhista · +20 anos de atuação</p>
          </figcaption>
          <span className="absolute -bottom-4 -right-4 hidden h-28 w-28 border-b border-r border-gold/60 lg:block" />
        </InView>

        <div className="min-w-0">
          <p className="eyebrow text-gold-foreground/60">Sobre a atuação</p>
          <h2 id="orientacao-title" className="mt-4 text-balance text-3xl leading-tight sm:text-4xl">
            Experiência e atuação em Direito do Trabalho
          </h2>
          <span className="gold-rule mt-6" />

          <p className="mt-6 text-pretty text-lg leading-relaxed text-foreground">
            Dra. Bianca Sardinha é advogada com mais de 20 anos de experiência, com atuação voltada à
            defesa dos direitos dos trabalhadores de diversos ramos e atividades, com atendimento em
            todo o Brasil.
          </p>

          <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
            Ao longo de sua trajetória profissional, atua em questões envolvendo:
          </p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Áreas de atuação trabalhista">
            {practiceAreas.map((area) => (
              <li
                key={area}
                className="rounded-full border border-gold/35 bg-background/70 px-3.5 py-1.5 text-xs font-medium tracking-wide text-foreground"
              >
                {area}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Entre outras situações decorrentes da relação de trabalho.
          </p>

          <InView as="blockquote" className="mt-10 border-l-2 border-gold bg-background/60 px-6 py-5">
            <Scale className="size-5 text-gold" aria-hidden="true" />
            <p className="mt-3 text-pretty leading-relaxed text-foreground">
              Cada caso é analisado de forma individualizada, considerando as particularidades da
              relação de trabalho, os documentos e provas disponíveis e os direitos envolvidos.
            </p>
          </InView>
        </div>
      </div>
    </section>
  );
}
