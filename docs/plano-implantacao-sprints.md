# Plano de implantação — sprints PageSpeed

**Referência técnica:** [plano-otimizacao-pagespeed.md](./plano-otimizacao-pagespeed.md)  
**Branch:** `v1`  
**Como começar cada bloco:** no chat, envie exatamente **`ok sprint 1`**, depois **`ok sprint 2`**, e assim por diante.

Nada é implementado até o `ok` da sprint. Ao terminar uma sprint: commit + push em `v1` (e `main` se o EasyPanel estiver nela) + o que conferir no ar.

---

## Visão geral

| Sprint | Nome | Etapas do plano | Extra | Duração sugerida |
| --- | --- | --- | --- | --- |
| **1** | Imagens e LCP | 2, 3, 4, 5 (+ recorte do logo da 12) | D (favicon, se couber) | 1 ciclo |
| **2** | Fontes e CSS | 6, 7, 13 | — | 1 ciclo |
| **3** | JavaScript e INP | 8, 9, 10, 11 | B | 1 ciclo |
| **4** | Cache e servidor | 14, 15 | C (`npm audit`) | 1 ciclo |
| **5** | SEO, a11y e reteste | 16, 17, 18 | A (seção Motoristas) | 1 ciclo |

**5 sprints** no total.  
Baseline (etapa 1): na Sprint 1, se houver URL de produção; senão, medimos no reteste da Sprint 5 e comparamos.

---

## Protocolo no chat

```
ok sprint 1     → implementa só a Sprint 1
ok sprint 2     → só a Sprint 2
ok sprint 3     → …
ok sprint 4
ok sprint 5
```

Se quiser pular ou juntar: `ok sprint 3 e 4` ou `pular extra A`.

---

## Sprint 1 — Imagens e LCP

**Objetivo:** o PSI parar (ou reduzir forte) “next-gen formats”, “properly size images” e “preload LCP image”.

**Fazer**

1. Converter fotos da landing para WebP (e AVIF se o pipeline permitir), com JPEG/PNG de fallback.
2. Gerar `srcset` / `sizes` (hero 640–1920; cards 400/800; retrato 400/800; motoristas ~800).
3. Hero: `fetchPriority="high"`, `decoding="async"`, **sem** lazy, `preload` no `head` da home.
4. Below the fold: lazy + decoding; `width`/`height` reais.
5. Logo menor (altura ~160–240 px no arquivo) + `width`/`height` no HTML (Header e Footer).
6. Favicon leve (Extra D), se o PNG atual for grande.

**Arquivos:** `Hero.tsx`, `ServiceCard.tsx`, `ServicesGrid.tsx`, `WhySection.tsx`, `DriversSection.tsx`, `Header.tsx`, `Footer.tsx`, `index.tsx`, `src/assets/` / `public/`.

**Pronto quando:** hero e cards usam formato moderno + tamanhos certos; LCP com preload/priority; layout do logo sem pulo óbvio.

**Fora desta sprint:** fontes Google, Motion, cache EasyPanel.

---

## Sprint 2 — Fontes e CSS

**Objetivo:** tirar Google Fonts do caminho crítico (render-blocking).

**Fazer**

1. Autohospedar Karla (400/700) e Cormorant Garamond (500) em `.woff2`.
2. `@font-face` com `font-display: swap` e fallback com `size-adjust` se possível (etapa 13).
3. Remover links `fonts.googleapis.com` / `fonts.gstatic.com` em `__root.tsx`.
4. Simplificar overlay do hero (3 camadas → 1–2), sem mudar a cara da marca.

**Arquivos:** `__root.tsx`, `styles.css`, `public/fonts/`, `Hero.tsx`.

**Pronto quando:** a página não pede fonte no Google; tipografia igual ou muito próxima.

**Fora desta sprint:** Framer Motion, headers de cache.

---

## Sprint 3 — JavaScript e INP

**Objetivo:** menos JS no first load; H1/hero sem animação de entrada.

**Fazer**

1. Remover `motion` do Hero (HTML estático).
2. Trocar `motion` de cards, Drivers, Steps, Why, CTA por CSS leve **ou** animação só `whileInView` com `prefers-reduced-motion`.
3. Não importar UI morta; opcional: enxugar `package.json` do que a landing não usa.
4. Header: scroll mais barato (menos `backdrop-blur` contínuo / rAF).
5. Extra B: CTAs dos cards continuam `<a>` simples (já são).

**Arquivos:** `Hero.tsx`, `ServiceCard.tsx`, `DriversSection.tsx`, `StepsSection.tsx`, `WhySection.tsx`, `CTASection.tsx`, `Header.tsx`, talvez `package.json`.

**Pronto quando:** hero sem Framer; bundle cliente visivelmente menor ou Motion só abaixo da dobra.

**Fora desta sprint:** sitemap, `lang`, cache.

---

## Sprint 4 — Cache e servidor (EasyPanel)

**Objetivo:** TTFB e “efficient cache lifetimes”.

**Fazer**

1. `Cache-Control` longo + `immutable` nos assets com hash; HTML com cache curto.
2. Confirmar gzip/brotli no painel.
3. Se TTFB alto: nota de CDN ou cache da home (landing quase estática).
4. Extra C: `npm audit` e correções seguras (sem quebrar o build).

**Arquivos:** Nitro/headers, `Dockerfile` se preciso; EasyPanel (você aplica no painel o que não der no código). Checklist: [easypanel-cache.md](./easypanel-cache.md).

**Pronto quando:** estáticos hashed cacheáveis; HTML não fica preso 1 ano.

**Fora desta sprint:** copy, SEO.

---

## Sprint 5 — SEO, acessibilidade, extras e reteste

**Objetivo:** fechar Lighthouse SEO/BP/a11y e medir o ganho.

**Fazer**

1. `html lang="pt-BR"`; canonical/`og:url` absolutos; `og:image` 1200×630; `sitemap.xml` + `robots.txt`.
2. Contraste ouro/navy; hit area ≥ 48 px no menu mobile; `prefers-reduced-motion`.
3. Extra A (com sua confirmação): remover ou aliviar a seção Motoristas.
4. PSI mobile 3× (mediana) vs baseline; anotar no plano de ação.

**Arquivos:** `__root.tsx`, `index.tsx`, `public/robots.txt`, `public/sitemap.xml`, `Header.tsx`, talvez `DriversSection` / `index.tsx`.

**Pronto quando:** reteste PSI registrado; sprint encerrada.

---

## Dependências entre sprints

```
Sprint 1 (imagens/LCP)
    ↓
Sprint 2 (fontes)     ← pode em paralelo com 1 só se não conflitar no Hero
    ↓
Sprint 3 (JS)
    ↓
Sprint 4 (cache)      ← melhor depois que os assets hashed existirem
    ↓
Sprint 5 (SEO + PSI)
```

Sprint 1 e 2 não devem misturar no mesmo commit bagunçado no Hero; por isso o `ok` é **uma sprint por vez**.

---

## Definition of Done (toda sprint)

- [ ] Escopo da sprint só
- [ ] Landing visualmente ok (hero, cards, header)
- [ ] Commit na `v1` com mensagem clara
- [ ] Push GitHub
- [ ] Redeploy EasyPanel quando a sprint alterar o que vai para produção
- [ ] Nota curta no chat: o que entrou / o que ficou para a próxima

---

## Próximo comando

Envie **`ok sprint 1`** para começar imagens e LCP.
