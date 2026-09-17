# EasyPanel — cache, compressão e TTFB (Sprint 4)

O app já envia `Cache-Control` no Node (`src/server.ts` + `routeRules` do Nitro):

| Recurso | Header |
| --- | --- |
| `/assets/*` (JS/CSS/imagens/fontes com hash) | `public, max-age=31536000, immutable` |
| HTML (`/`, SSR) | `public, max-age=0, must-revalidate` |
| favicon / robots.txt | `public, max-age=86400` |

## No painel (obrigatório conferir)

1. **Gzip / Brotli** no proxy (Nginx/Caddy do EasyPanel): ative compressão para `text/html`, `text/css`, `application/javascript`, `image/svg+xml`. O Node do Nitro atende `Accept-Encoding` nos estáticos quando o arquivo pré-comprimido existe; o proxy ainda deve comprimir o HTML.
2. **Porta do container:** `3000`.
3. **HTTPS** no domínio de produção.

## Se o PageSpeed acusar TTFB alto (> ~600 ms)

A landing é quase estática. Opções, nesta ordem:

1. Cache de borda / CDN na frente do EasyPanel (Cloudflare, Bunny, etc.), com HTML em “cache HTML curto” ou bypass só de `/`.
2. Manter o container próximo da audiência (região BR).
3. Não ligar cache longo no HTML, senão um deploy não aparece até expirar.

## Depois do deploy

Confira com:

```bash
curl -I https://SEU-DOMINIO/assets/
```

Um JS/CSS hashed deve trazer `max-age=31536000` e `immutable`. O HTML da home deve trazer `must-revalidate` (ou equivalente curto).
