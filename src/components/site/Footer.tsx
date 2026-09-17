import { ADDRESSES, OFFICE_NAME, WHATSAPP } from "@/lib/site-config";
import { WhatsAppIcon } from "./WhatsAppButton";
import { BrandLogo } from "./BrandLogo";

const quickLinks = [
  { label: "Áreas de Atuação", href: "#areas" },
  { label: "Contato", href: "#contato" },
];

const legalLinks = [
  { label: "Política de Privacidade", href: "#" },
  { label: "Termos de Uso", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-navy-deep text-navy-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#top" className="inline-flex items-center">
              <BrandLogo className="h-20 max-h-20 sm:h-20 sm:max-h-20" />
            </a>
            <p className="mt-5 text-sm leading-relaxed text-navy-foreground/70">
              Atuação em Direito Trabalhista na defesa dos direitos do trabalhador.
            </p>
          </div>

          <nav aria-label="Menu rápido">
            <h3 className="eyebrow text-gold">Menu rápido</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-navy-foreground/75 transition-colors hover:text-gold">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="eyebrow text-gold">Contato</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP.primary}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-navy-foreground/75 transition-colors hover:text-gold"
                >
                  <WhatsAppIcon className="size-3.5 text-gold" />
                  {WHATSAPP.primaryDisplay}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-gold">Endereços</h3>
            <ul className="mt-5 space-y-4 text-sm text-navy-foreground/75">
              {ADDRESSES.map((a) => (
                <li key={a.city}>
                  <span className="block font-semibold text-navy-foreground">{a.city}</span>
                  {a.line}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-navy-foreground/10 pt-6 text-xs text-navy-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {OFFICE_NAME}. Todos os direitos reservados.</p>
          <ul className="flex flex-wrap gap-6">
            {legalLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="transition-colors hover:text-gold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
