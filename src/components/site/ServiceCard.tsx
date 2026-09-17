import { Scale } from "lucide-react";
import { WhatsAppButton } from "./WhatsAppButton";
import { ResponsiveImage, type ResponsiveImageAsset } from "./ResponsiveImage";
import { InView } from "./InView";

export type Service = {
  title: string;
  description: string;
  image: ResponsiveImageAsset;
  alt: string;
};

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <InView
      as="article"
      delayMs={(index % 3) * 80}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-card transition-colors duration-500 hover:border-gold/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ResponsiveImage
          webpSrcSet={service.image.webpSrcSet}
          src={service.image.src}
          width={service.image.width}
          height={service.image.height}
          sizes={service.image.sizes}
          alt={service.alt}
          loading="lazy"
          decoding="async"
          className="size-full"
          imgClassName="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-navy-deep/10 transition-opacity duration-500 group-hover:opacity-0" />
      </div>

      <div className="relative flex flex-1 flex-col items-center px-6 pb-7 pt-9 text-center">
        <span className="absolute -top-6 flex size-12 items-center justify-center rounded-full border border-gold/40 bg-gold text-gold-foreground shadow-gold">
          <Scale className="size-5" />
        </span>
        <h3 className="text-xl leading-snug text-foreground">{service.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>
        <div className="mt-6 w-full">
          <WhatsAppButton full size="sm" context={service.title}>
            Chamar no WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </InView>
  );
}
