/**
 * Configuração central do escritório.
 * Para trocar o número do WhatsApp, altere apenas aqui.
 */

export const OFFICE_NAME = "Sardinha - Advogados associados";
export const PAGE_TITLE = `${OFFICE_NAME} | Direito Trabalhista`;

export const WHATSAPP = {
  // Número principal (formato internacional, apenas dígitos)
  primary: "5521970116797",
  primaryDisplay: "(21) 97011-6797",
  defaultMessage:
    "Olá! Gostaria de falar com uma advogada trabalhista sobre um problema no meu trabalho.",
};

export function whatsappLink(context?: string) {
  const message = context
    ? `Olá! Gostaria de falar com uma advogada trabalhista sobre: ${context}.`
    : WHATSAPP.defaultMessage;
  return `https://wa.me/${WHATSAPP.primary}?text=${encodeURIComponent(message)}`;
}

export const ADDRESSES = [
  {
    city: "Rio de Janeiro",
    line: "Avenida Presidente Vargas, 633 — sala 1703, Centro. CEP 20071-004",
  },
  {
    city: "Niterói",
    line: "Rua Aurelino Leal, 40 — sala 507, Centro. CEP 24020-110",
  },
];
