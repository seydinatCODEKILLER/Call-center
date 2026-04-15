FROM node:18-alpine

WORKDIR /app

# Active pnpm
RUN corepack enable

# Copie les fichiers de dépendances
COPY package.json pnpm-lock.yaml ./

# ⬇️ LE TRICK : On donne une fausse URL temporaire pour que le fichier prisma.config.ts 
# ne plante pas pendant la construction de l'image.
ARG DATABASE_URL="postgresql://postgres:fake@localhost:5432/fake"
ENV DATABASE_URL=$DATABASE_URL

# Installe les dépendances
RUN pnpm install

# Copie tout le reste du code (src, prisma, prisma.config.ts, etc.)
COPY . .

# Génère le client Prisma (ne plantera plus grâce à la fausse URL)
RUN npx prisma generate

EXPOSE 3000

CMD ["pnpm", "start"]