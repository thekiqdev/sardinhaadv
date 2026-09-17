import type { ResponsiveImageAsset } from "@/components/site/ResponsiveImage";

const files = import.meta.glob("../assets/optimized/*.{webp,jpg,png}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function asset(name: string): string {
  const match = Object.entries(files).find(([key]) => key.endsWith(`/${name}`));
  if (!match) {
    throw new Error(`Missing optimized asset: ${name}`);
  }
  return match[1];
}

function srcset(entries: Array<[string, number]>): string {
  return entries.map(([name, width]) => `${asset(name)} ${width}w`).join(", ");
}

export const heroImage: ResponsiveImageAsset & { preloadHref: string; preloadSrcSet: string } = {
  webpSrcSet: srcset([
    ["hero-trabalhador-640.webp", 640],
    ["hero-trabalhador-960.webp", 960],
    ["hero-trabalhador-1280.webp", 1280],
    ["hero-trabalhador-1920.webp", 1920],
  ]),
  src: asset("hero-trabalhador-fallback.jpg"),
  width: 1920,
  height: 1088,
  sizes: "100vw",
  preloadHref: asset("hero-trabalhador-960.webp"),
  preloadSrcSet: srcset([
    ["hero-trabalhador-640.webp", 640],
    ["hero-trabalhador-960.webp", 960],
    ["hero-trabalhador-1280.webp", 1280],
    ["hero-trabalhador-1920.webp", 1920],
  ]),
};

export function serviceImage(slug: string): ResponsiveImageAsset {
  return {
    webpSrcSet: srcset([
      [`${slug}-400.webp`, 400],
      [`${slug}-800.webp`, 800],
    ]),
    src: asset(`${slug}-fallback.jpg`),
    width: 800,
    height: 600,
    sizes: "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw",
  };
}

export const portraitImage: ResponsiveImageAsset = {
  webpSrcSet: srcset([
    ["escolhida-400.webp", 400],
    ["escolhida-800.webp", 800],
  ]),
  src: asset("escolhida-fallback.jpg"),
  width: 800,
  height: 1067,
  sizes: "(min-width: 1024px) 28vw, (min-width: 640px) 50vw, 90vw",
};

export const driversImage: ResponsiveImageAsset = {
  webpSrcSet: srcset([["motoristas-800.webp", 800]]),
  src: asset("motoristas-fallback.jpg"),
  width: 800,
  height: 504,
  sizes: "100vw",
};

export const logoImage = {
  png: asset("logo-sardinha.png"),
  webp: asset("logo-sardinha.webp"),
  width: 695,
  height: 200,
};
