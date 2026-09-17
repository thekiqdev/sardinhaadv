# EasyPanel: use this Dockerfile and expose port 3000.
# Debian (glibc) instead of Alpine: Tailwind/lightningcss needs the Linux native binary.
FROM node:22-bookworm-slim AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci \
  && npm install --no-save lightningcss-linux-x64-gnu @tailwindcss/oxide-linux-x64-gnu

COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV NITRO_HOST=0.0.0.0
ENV PORT=3000

COPY --from=build /app/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
