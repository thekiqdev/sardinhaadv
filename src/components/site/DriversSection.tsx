import { Check } from "lucide-react";
import { driversImage } from "@/lib/optimized-images";
import { ResponsiveImage } from "./ResponsiveImage";
import { WhatsAppButton } from "./WhatsAppButton";
import { InView } from "./InView";

const items = [
  "Horas extras e jornadas prolongadas",
  "Tempo de espera e à disposição",
  "Intervalos e períodos de descanso",
  "Trabalho antes e depois da jornada",
  "Descanso entre jornadas",
  "Domingos e feriados trabalhados",
  "Descontos indevidos",
  "Acidentes e doenças ocupacionais",
];

export function DriversSection() {
  return (
    <section
      id="motoristas"
      className="relative isolate scroll-mt-24 overflow-hidden bg-navy py-20 sm:py-28"
      aria-labelledby="motoristas-title"
    >
      <ResponsiveImage
        webpSrcSet={driversImage.webpSrcSet}
        src={driversImage.src}
        width={driversImage.width}
        height={driversImage.height}
        sizes={driversImage.sizes}
        alt="Motorista profissional ao volante ao anoitecer"
        loading="lazy"
        decoding="async"
        className="absolute inset-0"
        imgClassName="size-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-navy/85" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
        <InView>
          <p className="eyebrow text-gold">Atuação especializada</p>
          <h2
            id="motoristas-title"
            className="mt-4 text-balance text-3xl leading-tight text-navy-foreground sm:text-4xl lg:text-[2.6rem]"
          >
            Direitos dos Motoristas Profissionais e Caminhoneiros
          </h2>
          <span className="gold-rule mt-6" />
          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-navy-foreground/80">
            Jornadas extensas, longos períodos de espera e descanso insuficiente fazem parte da
            rotina de muitos motoristas. Conhecer as regras da jornada é importante para identificar
            horas extras e outros direitos trabalhistas.
          </p>
          <div className="mt-9">
            <WhatsAppButton
              variant="gold"
              size="lg"
              context="direitos de motoristas profissionais e caminhoneiros"
              className="w-full sm:w-auto"
            >
              Quero falar sobre meu caso
            </WhatsAppButton>
          </div>
        </InView>

        <InView
          as="ul"
          delayMs={80}
          className="grid gap-3 rounded-lg border border-navy-foreground/15 bg-navy-deep/70 p-6 sm:grid-cols-2 sm:p-8"
        >
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 border-b border-navy-foreground/10 pb-3 text-sm text-navy-foreground/90 last:border-0 sm:text-[0.95rem]"
            >
              <Check className="mt-0.5 size-4 shrink-0 text-gold" />
              {item}
            </li>
          ))}
        </InView>
      </div>
    </section>
  );
}
