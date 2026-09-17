import { cn } from "@/lib/utils";
import { whatsappLink } from "@/lib/site-config";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.15-.15.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.19-.24-.57-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.46s1.06 2.86 1.21 3.06c.15.2 2.08 3.29 5.05 4.48 2.97 1.19 2.97.79 3.51.74.54-.05 1.75-.71 2-1.4.25-.69.25-1.28.17-1.4-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.19 4.23-9.41 9.42-9.41 2.51 0 4.87.98 6.64 2.76a9.34 9.34 0 0 1 2.75 6.66c0 5.19-4.23 9.41-9.4 9.41zM20.5 3.49A11.28 11.28 0 0 0 12.04 0C5.84 0 .79 5.04.79 11.24c0 1.98.52 3.91 1.5 5.62L.5 24l7.32-1.92a11.2 11.2 0 0 0 4.22 1.07h.01c6.2 0 11.25-5.04 11.25-11.24 0-3-1.17-5.83-3.3-7.95z" />
    </svg>
  );
}

type Props = {
  children?: React.ReactNode;
  context?: string;
  className?: string;
  variant?: "green" | "gold" | "outline";
  size?: "sm" | "md" | "lg";
  full?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-sans font-bold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const variants = {
  green:
    "bg-whatsapp text-whatsapp-foreground hover:brightness-110 shadow-[0_10px_24px_-14px_var(--whatsapp)] hover:-translate-y-0.5",
  gold: "bg-gold text-gold-foreground hover:bg-gold-soft shadow-gold hover:-translate-y-0.5",
  outline:
    "border border-navy-foreground/50 text-navy-foreground hover:bg-navy-foreground/10 hover:border-navy-foreground",
};

const sizes = {
  sm: "h-10 px-4 text-[11px]",
  md: "h-12 px-6 text-xs",
  lg: "h-14 px-8 text-sm",
};

export function WhatsAppButton({
  children = "Chamar no WhatsApp",
  context,
  className,
  variant = "green",
  size = "md",
  full,
}: Props) {
  return (
    <a
      href={whatsappLink(context)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(base, variants[variant], sizes[size], full && "w-full", className)}
    >
      <WhatsAppIcon className="size-4 shrink-0" />
      <span>{children}</span>
    </a>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com uma advogada trabalhista no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-[0_14px_30px_-10px_var(--whatsapp)] transition-transform duration-300 hover:scale-110"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}

export { WhatsAppIcon };
