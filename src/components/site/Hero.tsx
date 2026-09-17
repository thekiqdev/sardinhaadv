import { ArrowDown } from "lucide-react";
import { WhatsAppButton } from "./WhatsAppButton";
import { ResponsiveImage } from "./ResponsiveImage";
import { heroImage } from "@/lib/optimized-images";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-navy-deep">
      <ResponsiveImage
        webpSrcSet={heroImage.webpSrcSet}
        src={heroImage.src}
        width={heroImage.width}
        height={heroImage.height}
        sizes={heroImage.sizes}
        alt="Trabalhador em ambiente corporativo"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0"
        imgClassName="size-full object-cover object-center"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.2 0.042 258 / 0.88) 0%, oklch(0.2 0.042 258 / 0.7) 42%, oklch(0.2 0.042 258 / 0.9) 100%)",
        }}
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-40 text-center sm:pb-32 sm:pt-48 lg:pb-40 lg:pt-56">
        <p className="eyebrow text-gold">Consulta trabalhista</p>

        <h1 className="mt-5 text-balance font-display text-3xl leading-[1.12] text-navy-foreground sm:text-4xl lg:text-[2.75rem]">
          Problemas no trabalho?{" "}
          <span className="relative mt-1 inline-block text-[0.82em] text-gold sm:mt-0">
            Entenda seus direitos e saiba o que pode ser feito.
            <span className="absolute -bottom-1 left-0 h-px w-full bg-gold/60" />
          </span>
        </h1>

        <p className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-navy-foreground/80 sm:text-lg">
          Atuação especializada na defesa dos direitos do trabalhador em casos de demissão por justa
          causa, acidente de trabalho, doença ocupacional, horas extras, rescisão indireta, FGTS, trabalho sem registro e
          outras irregularidades trabalhistas.
        </p>

        <div className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <WhatsAppButton variant="gold" size="lg" className="w-full sm:w-auto">
            Falar com uma advogada trabalhista
          </WhatsAppButton>
          <a
            href="#areas"
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-md border border-navy-foreground/45 px-8 font-sans text-sm font-bold uppercase tracking-wider text-navy-foreground transition-colors duration-300 hover:border-gold hover:text-gold sm:w-auto"
          >
            Conheça nossas áreas de atuação
            <ArrowDown className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
