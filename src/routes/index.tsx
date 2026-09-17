import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { ServicesGrid } from "@/components/site/ServicesGrid";
import { DriversSection } from "@/components/site/DriversSection";
import { WhySection } from "@/components/site/WhySection";
import { CTASection } from "@/components/site/CTASection";
import { FAQ, faqItems } from "@/components/site/FAQ";
import { ContactSection } from "@/components/site/ContactSection";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppButton";
import { OFFICE_NAME, PAGE_TITLE } from "@/lib/site-config";
import { heroImage } from "@/lib/optimized-images";

const title = PAGE_TITLE;
const description =
  "Atuação especializada na defesa dos direitos dos trabalhadores em casos de justa causa, acidente de trabalho, horas extras, rescisão indireta, FGTS e outras questões trabalhistas.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      {
        rel: "preload",
        href: heroImage.preloadHref,
        as: "image",
        type: "image/webp",
        fetchPriority: "high",
        imageSrcSet: heroImage.preloadSrcSet,
        imageSizes: heroImage.sizes,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LegalService",
          name: OFFICE_NAME,
          description,
          areaServed: "Rio de Janeiro",
          telephone: "+5521970116797",
          address: [
            {
              "@type": "PostalAddress",
              streetAddress: "Avenida Presidente Vargas, 633, sala 1703, Centro",
              addressLocality: "Rio de Janeiro",
              addressRegion: "RJ",
              postalCode: "20071-004",
              addressCountry: "BR",
            },
            {
              "@type": "PostalAddress",
              streetAddress: "Rua Aurelino Leal, 40, sala 507, Centro",
              addressLocality: "Niterói",
              addressRegion: "RJ",
              postalCode: "24020-110",
              addressCountry: "BR",
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ServicesGrid />
        <DriversSection />
        <WhySection />
        <CTASection />
        <FAQ />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
