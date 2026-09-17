import { useEffect, useState } from "react";
import { Clock, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { WHATSAPP, whatsappLink } from "@/lib/site-config";
import { WhatsAppButton, WhatsAppIcon } from "./WhatsAppButton";
import { BrandLogo } from "./BrandLogo";

const links = [
  { label: "Áreas de atuação", href: "#areas" },
  { label: "Perguntas frequentes", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="hidden border-b border-navy-foreground/10 bg-navy-deep/95 text-navy-foreground lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <span className="inline-flex items-center gap-2 text-navy-foreground/80">
            <Clock className="size-3.5 text-gold" />
            Atendimento por WhatsApp
          </span>
          <div className="flex items-center gap-6">
            <a
              href={`https://wa.me/${WHATSAPP.primary}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold transition-colors hover:text-gold"
            >
              <WhatsAppIcon className="size-3.5 text-gold" />
              {WHATSAPP.primaryDisplay}
            </a>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "transition-all duration-300",
          scrolled ? "bg-navy/95 shadow-[0_8px_30px_-16px_oklch(0.2_0.04_258/0.8)]" : "bg-navy/80",
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-nowrap items-center justify-between gap-4 px-6 py-2">
          <a href="#top" className="shrink-0 text-navy-foreground">
            <BrandLogo />
          </a>

          <nav className="hidden min-w-0 items-center gap-5 whitespace-nowrap xl:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-navy-foreground/85 transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden shrink-0 lg:block">
            <WhatsAppButton size="sm" variant="gold">
              Falar com uma advogada
            </WhatsAppButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="text-navy-foreground xl:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-navy-foreground/10 bg-navy-deep px-6 pb-6 pt-4 xl:hidden">
            <nav className="flex flex-col divide-y divide-navy-foreground/10">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-navy-foreground/90"
                >
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="mt-5 space-y-3">
              <WhatsAppButton full variant="gold" size="md">
                Falar com uma advogada
              </WhatsAppButton>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-sm text-navy-foreground/70"
              >
                {WHATSAPP.primaryDisplay}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
