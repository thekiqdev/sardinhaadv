import { MapPin } from "lucide-react";
import { ADDRESSES, WHATSAPP } from "@/lib/site-config";
import { WhatsAppButton, WhatsAppIcon } from "./WhatsAppButton";

export function ContactSection() {
  return (
    <section id="contato" className="scroll-mt-24 bg-sand py-20 sm:py-28" aria-labelledby="contato-title">
      <div className="mx-auto max-w-5xl px-6">
        <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div>
              <p className="eyebrow text-gold-foreground/60">Contato</p>
              <h2 id="contato-title" className="mt-4 text-balance text-3xl leading-tight sm:text-[2.1rem]">
                Fale com nossa equipe
              </h2>
              <span className="gold-rule mt-5" />
              <p className="mt-6 leading-relaxed text-muted-foreground">
                Conte brevemente o que aconteceu e entre em contato com nossa equipe.
              </p>
              <div className="mt-8">
                <WhatsAppButton size="lg" className="w-full sm:w-auto">
                  Chamar no WhatsApp
                </WhatsAppButton>
              </div>
            </div>

            <div className="space-y-6 lg:border-l lg:border-border lg:pl-12">
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${WHATSAPP.primary}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-foreground transition-colors hover:text-gold-foreground"
                >
                  <WhatsAppIcon className="size-4 text-whatsapp" />
                  <span className="font-semibold">{WHATSAPP.primaryDisplay}</span>
                </a>
              </div>

              <div className="space-y-4">
                {ADDRESSES.map((a) => (
                  <div key={a.city} className="flex gap-3">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      <span className="block font-semibold text-foreground">{a.city}</span>
                      {a.line}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
