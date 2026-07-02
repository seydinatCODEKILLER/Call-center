FROM node:18-alpine AS base
WORKDIR /app
RUN corepack enable

# Étape 1 : Installer les dépendances
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Étape 2 : Image finale
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npx prisma generate && node src/server.js"]