import { OFFICE_NAME } from "@/lib/site-config";
import { logoImage } from "@/lib/optimized-images";
import { cn } from "@/lib/utils";

export function BrandLogo({ className }: { className?: string }) {
  return (
    <picture>
      <source type="image/webp" srcSet={logoImage.webp} />
      <img
        src={logoImage.png}
        alt={OFFICE_NAME}
        width={logoImage.width}
        height={logoImage.height}
        decoding="async"
        className={cn("h-16 w-auto max-h-16 object-contain sm:h-20 sm:max-h-20", className)}
      />
    </picture>
  );
}
