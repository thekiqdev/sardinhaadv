# Plano de ação — otimização PageSpeed (landing Sardinha)

**Página:** landing trabalhista (TanStack Start + Vite + Nitro)  
**Data do plano:** 24/08/2026  
**Ambiente de deploy:** EasyPanel (Docker, porta 3000)  
**Branch sugerida para as mudanças:** `v1`

> **Sobre a avaliação do PageSpeed:** o relatório (print ou JSON do [PageSpeed Insights](https://pagespeed.web.dev/)) não foi anexado a esta conversa. Este plano traduz as **oportunidades e diagnósticos padrão do PSI/Lighthouse** para o código atual da landing. Depois de colar os scores (Performance mobile/desktop, LCP, INP, CLS, FCP, TBT e a lista de Opportunities), as etapas abaixo podem ser reordenadas pelo maior “Estimated savings”.

**Meta de qualidade (Google Core Web Vitals):**

| Métrica | Bom | Precisa melhorar | Ruim |
| --- | --- | --- | --- |
| LCP | ≤ 2,5 s | ≤ 4,0 s | > 4,0 s |
| INP | ≤ 200 ms | ≤ 500 ms | > 500 ms |
| CLS | ≤ 0,1 | ≤ 0,25 | > 0,25 |

Foco principal: **mobile** (indexação mobile-first).

---

## Diagnóstico atual (código da landing)

O que o PSI costuma apontar neste tipo de página **já aparece no projeto**:

### LCP / carregamento

- Imagem do hero (`hero-trabalhador.jpg`, ~129 KB) é JPEG, sem `fetchpriority="high"`, sem `<link rel="preload">`, sem `srcset`/`sizes`.
- Logo PNG ~103 KB no header (above the fold, sem prioridade explícita).
- CSS do app + **Google Fonts** (Cormorant Garamond + Karla, vários pesos) via `fonts.googleapis.com` — recurso clássico de **render-blocking**.
- Hero usa `motion` (Framer Motion) com fade/slide no H1 — o elemento de LCP não deve ser animado na entrada.

### Imagens (oportunidade “Properly size images” / “Serve images in next-gen formats”)

Pesos atuais em `src/assets` (JPEG/PNG, sem WebP/AVIF):

| Arquivo | ~KB | Uso |
| --- | --- | --- |
| servico-carteira.jpg | 178 | card (abaixo da dobra, mas grande) |
| hero-trabalhador.jpg | 129 | LCP |
| motoristas.jpg | 120 | fundo de seção |
| servico-acidente.jpg e demais cards | 62–107 cada | grade 3 colunas |
| escolhida.jpg | 97 | retrato |
| logo-sardinha.png | 103 | header + footer |

Cards declaram `width={1024}` / `height={768}` mas a célula visual é bem menor (~350–530 px). O PSI marca isso como imagem superdimensionada.

Não há `srcSet`, `sizes`, `decoding`, nem `fetchPriority` em nenhum `<img>`.

### JavaScript / INP / TBT

- Build de cliente recente: `index-*.js` ~402 KB e `routes-*.js` ~149 KB (antes do gzip).
- `motion/react` importado em Hero, cards, Drivers, Steps, Why, CTA — puxa Framer Motion (~centenas de KB no servidor e no cliente).
- Dezenas de componentes shadcn/Radix em `src/components/ui` **não usados na landing** (não entram no bundle se não forem importados; ainda assim incham o repositório e o `npm ci` do Docker).
- Header registra listener de `scroll` + `backdrop-blur` (custo de pintura no mobile).
- FAQ usa Accordion (Radix) — ok, mas deve permanecer lazy/abaixo da dobra.

### CLS

- Logo com `h-16`/`h-20` e `w-auto` **sem `width`/`height` intrínsecos** no markup.
- Hero em `position: absolute` cobre a seção (espaço do H1 existe; a imagem de fundo em si pode não ser o LCP se o texto pintar antes).
- Fontes externas podem causar **FOIT/FOUT** (desvio de layout ao trocar fallback → webfont).

### Servidor / cache (PSI: TTFB, cache policy)

- Docker serve Nitro `node-server` sem CDN obrigatória.
- Assets do Vite já saem com hash (`servico-carteira-DOhAbcG3.jpg`); falta garantir **Cache-Control: immutable** no EasyPanel/proxy.
- `html lang="en"` (deveria `pt-BR`) — não é Performance, mas o Lighthouse Best Practices/SEO aponta.

### SEO que o PSI também lista (Best Practices / SEO)

- Canonical relativo `href: "/"` (melhor URL absoluta de produção).
- Sem `og:image` / Twitter image (compartilhamento + Lighthouse SEO).
- `robots.txt` ok; falta sitemap.xml.

---

## Quantidade de etapas

**8 fases · 18 etapas de execução · 2 etapas extras opcionais**

Ordem pensada para o maior ganho no score mobile: **LCP e imagens primeiro**, depois fontes, depois JS/INP, depois cache/servidor, depois SEO fino e reteste.

---

## Fase 0 — Baseline (1 etapa)

### Etapa 1 — Congelar a medição

- Rodar PSI **mobile e desktop** na URL de produção EasyPanel.
- Guardar: Performance, Acessibilidade, Best Practices, SEO, LCP, INP, CLS, FCP, TBT, Speed Index.
- Exportar JSON ou print para `docs/pagespeed-baseline/` (data + URL).
- Anotar o **elemento LCP** que o relatório indicar (quase certamente hero ou H1).

**Critério de pronto:** planilha ou trecho neste doc preenchido com os números reais.

---

## Fase 1 — Imagens (4 etapas) — maior impacto no LCP

### Etapa 2 — Converter para formatos modernos

- Gerar **AVIF + WebP** (fallback JPEG/PNG) de todas as fotos da landing.
- Comprimir com qualidade visual institucional (hero ~70–80 WebP; retrato um pouco mais alto).
- Meta: hero &lt; 40 KB (WebP) / cards &lt; 25–40 KB cada.

### Etapa 3 — Servir o tamanho certo (`srcset` + `sizes`)

- Hero: 640 / 960 / 1280 / 1920 (a tela não precisa de 1920 em mobile).
- Cards (aspect 4/3): 400 / 800.
- Retrato Why: 400 / 800.
- Fundo motoristas: versão baixa (é overlay escuro; 800 px basta).
- Logo: PNG/WebP recortado na altura real (80 px CSS → asset ~160–240 px de altura, não o arquivo cheio).

### Etapa 4 — Prioridade do LCP (hero)

No `<img>` do hero:

- `fetchPriority="high"`
- `decoding="async"`
- **não** usar `loading="lazy"`
- `<link rel="preload" as="image" …>` no `head` da home (mesmo arquivo que o LCP)

### Etapa 5 — Below the fold

- Cards, motoristas, escolhida: `loading="lazy"` + `decoding="async"` (cards já têm lazy).
- `width` e `height` reais de cada variante para CLS.

**Critério de pronto:** PSI deixa de listar (ou reduz forte) “Serve images in next-gen formats”, “Properly size images”, “Preload Largest Contentful Paint image”.

---

## Fase 2 — Fontes e CSS bloqueante (2 etapas)

### Etapa 6 — Autohospedar e subsetar as fontes

- Baixar **Karla** e **Cormorant Garamond** só nos pesos usados (Karla 400/700; Cormorant 500).
- Servir `.woff2` em `/public/fonts` ou import no CSS.
- `font-display: swap` (ou `optional` no texto do hero se LCP for o H1).
- Remover o `<link>` de `fonts.googleapis.com` / `fonts.gstatic.com` em `__root.tsx`.

### Etapa 7 — CSS crítico

- Manter um único CSS do Vite (já hashed).
- Evitar CSS extra de terceiros.
- Conferir se o overlay do hero (3 camadas: img + `bg-navy-deep/80` + gradient inline) pode virar **uma** camada (ganho de paint, não de download).

**Critério de pronto:** PSI reduz “Eliminate render-blocking resources” ligado a Google Fonts.

---

## Fase 3 — JavaScript e INP (4 etapas)

### Etapa 8 — Tirar Motion do above-the-fold

- Hero **sem** `motion` (HTML estático): o H1/imagem pintam no primeiro frame.
- Manter animação só `whileInView` abaixo da dobra, ou CSS `@media (prefers-reduced-motion)`.

### Etapa 9 — Reduzir Framer Motion no restante

- Substituir `motion` dos cards/steps/CTA por CSS `animation` leve **ou** um único wrapper lazy.
- Objetivo: encolher o `index-*.js` (~402 KB) de forma visível no “Reduce unused JavaScript”.

### Etapa 10 — Cortar JS morto

- Landing não usa a maior parte de `src/components/ui` + Radix no `package.json`.
- Não precisa deletar tudo agora; **não importar** (já é o caso). Opcional: limpar deps não usadas para Docker mais rápido.
- Importar ícones `lucide-react` só os usados (já pontual).

### Etapa 11 — Trabalho na thread principal

- Header: preferir `document.documentElement.classList` com CSS em vez de `backdrop-blur` pesado no scroll; ou `useState` com rAF.
- Accordion do FAQ: ok; não hidratar nada pesado acima da dobra.
- Evitar `QueryClient` extra se a home não faz fetch (avaliar se o provider é obrigatório no Start).

**Critério de pronto:** TBT/INP melhores no laboratório; menos “Minimize main-thread work”.

---

## Fase 4 — CLS (2 etapas)

### Etapa 12 — Dimensões explícitas

- Logo: `width` e `height` no HTML (proporção real do PNG).
- Todos os `<img>` com par width/height coerente com o `aspect-*` do CSS.

### Etapa 13 — Fontes sem pulo de texto

- Fallback com métricas próximas (`size-adjust` / `ascent-override` no `@font-face`) para Karla e Cormorant.
- Header com altura mínima fixa (já reduzida para 80 px) para não “pular” o hero.

**Critério de pronto:** CLS laboratório &lt; 0,1.

---

## Fase 5 — Servidor, cache e EasyPanel (2 etapas)

### Etapa 14 — Cache de estáticos

- Assets `/assets/*` (hash no nome): `Cache-Control: public, max-age=31536000, immutable`.
- HTML (SSR): `no-cache` ou `max-age` curto.
- Conferir gzip/brotli no proxy EasyPanel (Nitro já gzipa em parte; o painel deve comprimir na borda).

### Etapa 15 — TTFB

- Manter Node 22 Debian (já no Dockerfile).
- Se TTFB &gt; ~600 ms no PSI: CDN na frente do EasyPanel ou cache de HTML da home (a landing é quase estática).
- Preconnect só para origens que restarem (hoje Google Fonts some na etapa 6; WhatsApp é navegação, não recurso).

**Critério de pronto:** “Initial server response time” e “Use efficient cache lifetimes” ok ou mitigados.

---

## Fase 6 — Itens do Lighthouse (SEO / Acessibilidade / BP) (2 etapas)

Não sobem o **Performance score**, mas saem no mesmo relatório PSI.

### Etapa 16 — SEO técnico

- `html lang="pt-BR"`.
- Canonical e `og:url` com domínio de produção.
- `og:image` / `twitter:image` (logo ou hero otimizado, 1200×630).
- `sitemap.xml` + referência no `robots.txt`.

### Etapa 17 — Acessibilidade e BP

- Contraste texto dourado sobre navy (Lighthouse Contrast).
- Botão/menu mobile com área ≥ 48 px.
- `prefers-reduced-motion` nas animações que restarem.
- Links WhatsApp com texto visível (já têm).

---

## Fase 7 — Validação (1 etapa)

### Etapa 18 — Reteste e aceite

- PSI mobile **3 vezes**, usar a mediana.
- Comparar com a Etapa 1.
- Aceite sugerido (laboratório, mobile): Performance ≥ 85–90 se LCP/imagens/fontes forem feitos; Core Web Vitals “Passed” quando houver dados de campo (CrUX demora dias/semanas em site novo).

---

## Etapas extras (sugestões além do relatório típico)

Não são “obrigatórias” do PSI, mas ajudam conversão e peso.

### Extra A — Conteúdo que pesa sem estar no menu

- A seção **Motoristas** ainda baixa `motoristas.jpg` (~120 KB) mesmo fora do menu. Se não for estratégica, remover da home (ganho direto de bytes e JS da seção).

### Extra B — Muitos CTAs WhatsApp

- Vários botões iguais não quebram PSI, mas cada card hidrata o mesmo componente. Um CTA por card via `<a>` simples (já é âncora) está ok; evitar JS extra.

### Extra C — Segurança (`npm audit`)

- O `npm ci` do Docker já listou vulnerabilidades altas. Não mexe em LCP, mas deve entrar no backlog de deploy.

### Extra D — Favicon

- `favicon.png` no `public/`; gerar 32×32 + ICO leve. PNG grande no `head` compete com o LCP.

---

## Ordem de implementação recomendada (resumo)

```
1  Baseline PSI
2–5  Imagens + LCP hero          ← começar aqui
6–7  Fontes locais
8–11 JS / Motion / INP
12–13 CLS
14–15 Cache / TTFB EasyPanel
16–17 SEO + a11y
18 Reteste PSI
(+ A–D se houver folga)
```

**Esforço relativo**

| Fase | Etapas | Esforço | Impacto esperado no Performance |
| --- | --- | --- | --- |
| 0 Baseline | 1 | Baixo | — |
| 1 Imagens | 2–5 | Médio | Muito alto |
| 2 Fontes | 6–7 | Médio | Alto |
| 3 JS | 8–11 | Médio-alto | Alto (INP/TBT) |
| 4 CLS | 12–13 | Baixo | Médio |
| 5 Servidor | 14–15 | Baixo-médio | Médio (TTFB) |
| 6 SEO/a11y | 16–17 | Baixo | Score SEO/A11y |
| 7 Reteste | 18 | Baixo | — |

**Total a executar na landing:** **18 etapas** (+ 4 extras opcionais).

---

## Arquivos principais a tocar (quando for implementar)

| Área | Arquivos |
| --- | --- |
| Hero / LCP | `src/components/site/Hero.tsx`, `src/routes/index.tsx` (preload) |
| Fontes | `src/routes/__root.tsx`, `src/styles.css`, `public/fonts/` |
| Cards | `src/components/site/ServiceCard.tsx`, `src/components/site/ServicesGrid.tsx` |
| Retrato | `src/components/site/WhySection.tsx` |
| Motoristas | `src/components/site/DriversSection.tsx` |
| Header/logo | `src/components/site/Header.tsx`, `Footer.tsx` |
| Cache | EasyPanel / Nitro headers (Dockerfile ou config do painel) |
| SEO | `__root.tsx`, `index.tsx`, `public/robots.txt`, `public/sitemap.xml` |

---

## Próximo passo

Implantação por sprints: [plano-implantacao-sprints.md](./plano-implantacao-sprints.md).

No chat: **`ok sprint 1`**, depois **`ok sprint 2`**, até a **5**.
