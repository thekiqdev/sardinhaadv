const YEAR = 31_536_000;
const DAY = 86_400;

const HASHED_ASSET =
  /\/assets\/.+\.[A-Za-z0-9_-]{6,}\.(?:js|css|mjs|map|woff2|woff|webp|jpg|jpeg|png|svg|avif|gif)$/i;

const SHORT_STATIC = new Set(["/favicon-32.png", "/favicon.png", "/robots.txt", "/sitemap.xml"]);

export function withCacheHeaders(request: Request, response: Response): Response {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return response;
  }
  if (response.status !== 200 && response.status !== 304) {
    return response;
  }

  const path = new URL(request.url).pathname;
  const headers = new Headers(response.headers);
  const contentType = headers.get("content-type") ?? "";

  if (HASHED_ASSET.test(path) || path.startsWith("/assets/")) {
    headers.set("Cache-Control", `public, max-age=${YEAR}, immutable`);
  } else if (SHORT_STATIC.has(path)) {
    headers.set("Cache-Control", `public, max-age=${DAY}`);
  } else if (contentType.includes("text/html") || path === "/" || !path.includes(".")) {
    headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  }

  if (!headers.has("Vary") && contentType.includes("text/html")) {
    headers.append("Vary", "Accept-Encoding");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
