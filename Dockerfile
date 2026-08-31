# Stage 1: Build da aplicação com Bun
FROM oven/bun:1.3-alpine AS builder

WORKDIR /app

# Instalar dependências
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copiar código-fonte e compilar para produção
COPY . .
RUN bun run build

# Stage 2: Servidor Web Nginx ultraleve e otimizado para produção
FROM nginx:alpine-slim

# Copiar configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar bundle estático gerado no estágio anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Expor porta HTTP padrão
EXPOSE 80

# Healthcheck usando 127.0.0.1 para suporte tanto a IPv4 quanto IPv6 sem resolução de DNS
HEALTHCHECK --interval=15s --timeout=3s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
