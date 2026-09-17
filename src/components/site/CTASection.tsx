import { WhatsAppButton } from "./WhatsAppButton";
import { InView } from "./InView";

export function CTASection() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep py-20 sm:py-24">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, oklch(0.34 0.05 258) 0%, transparent 65%)",
        }}
      />
      <InView className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="gold-rule mx-auto" />
        <h2 className="mt-7 text-balance text-3xl leading-tight text-navy-foreground sm:text-4xl">
          Aconteceu algo no seu trabalho e você não sabe se seus direitos foram respeitados?
        </h2>
        <p className="mt-5 text-navy-foreground/75">
          Converse com nossa equipe e conte o que aconteceu.
        </p>
        <div className="mt-9 flex justify-center">
          <WhatsAppButton variant="gold" size="lg" className="w-full sm:w-auto">
            Falar com uma advogada
          </WhatsAppButton>
        </div>
      </InView>
    </section>
  );
}
