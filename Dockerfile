FROM node:18-alpine AS base
WORKDIR /app
RUN corepack enable

# Étape 1 : Installer les dépendances
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Étape 2 : Construction
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build 

# Étape 3 : Image finale légère
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./

EXPOSE 3000

# Génère le client Prisma avec la VRAIE URL du .env, puis lance l'api
CMD ["sh", "-c", "npx prisma generate && node dist/src/index.js"]