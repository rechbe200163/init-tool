# syntax=docker/dockerfile:1
FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9 --activate

# --- deps: volle Dev+Prod-Dependencies (für Build/Generate)
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# --- build: generieren/kompilieren mit Dev-Deps
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY prisma ./prisma
# Prisma CLI temporär, falls nicht als devDep vorhanden:
RUN pnpm dlx prisma@latest generate
COPY . .
# Falls TS:
RUN pnpm build

# --- prod-deps: NUR Produktions-Dependencies
FROM base AS prod-deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# --- runner: klein & sauber
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# nur Prod-Node_modules übernehmen
COPY --from=prod-deps /app/node_modules ./node_modules
# App-Artefakte aus Build übernehmen
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json

EXPOSE 3333
CMD ["npm","run","start:migrate:prod"]
