# Instruções de instalação — Sardinha Advogados

Landing page institucional do escritório **Sardinha - Advogados associados** (Direito Trabalhista).

Use **npm** (não bun, yarn nem pnpm). O Node precisa ser **22** ou superior.

## 1. Clonar o repositório

```bash
git clone https://github.com/thekiqdev/sardinhaadv.git
cd sardinhaadv
```

## 2. Instalar dependências

```bash
npm install
```

## 3. Ambiente de desenvolvimento

```bash
npm run dev
```

Abra no navegador o endereço que o terminal mostrar (em geral `http://localhost:5173`).

Para encerrar, use `Ctrl+C` no terminal.

## 4. Build e execução em produção (sem Docker)

```bash
npm run build
npm start
```

O servidor sobe em **http://localhost:3000**.

Variáveis opcionais:

| Variável | Padrão | Função |
|----------|--------|--------|
| `PORT` | `3000` | Porta HTTP |
| `HOST` | `0.0.0.0` (no Docker) | Interface de escuta |

## 5. Docker

O `Dockerfile` já faz o build e expõe a porta **3000**. Imagem baseada em Debian (`node:22-bookworm-slim`); não use Alpine.

```bash
docker build -t sardinhaadv .
docker run --rm -p 3000:3000 sardinhaadv
```

Acesse **http://localhost:3000**.

## 6. Painel (EasyPanel / Coolify)

1. Tipo de serviço: aplicativo a partir deste repositório, usando o `Dockerfile` da raiz.
2. Porta interna do container: **3000** (não 80).
3. Domínio público em HTTPS, por exemplo `https://sardinhaadvogados.com.br`.
4. Cadastre também `www.sardinhaadvogados.com.br` apontando para a mesma porta **3000**, senão o `www` cai em 404 do proxy.
5. No DNS: registro `A` da raiz e `CNAME` (ou `A`) de `www` para o IP do servidor.

## 7. Conteúdo do escritório

Nome, WhatsApp e endereços ficam em `src/lib/site-config.ts`. Depois de alterar, rode `npm run build` (ou faça um novo deploy) para publicar.

## Scripts úteis

| Comando | O que faz |
|---------|-----------|
| `npm install` | Instala as dependências |
| `npm run dev` | Sobe o ambiente local |
| `npm run build` | Gera a pasta `.output` |
| `npm start` | Sobe o servidor de produção |
| `npm run lint` | Verifica o código |
