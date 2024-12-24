FROM node:18 AS builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY backend ./backend
COPY shared ./shared
COPY esbuild.config.js ./
COPY .backend.docker.env ./.env
RUN npm install
RUN npx prisma generate --schema=prisma/schema.prisma
RUN npm run build:backend

FROM node:18
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/shared/prisma ./shared/prisma
COPY package.json package-lock.json ./
COPY .backend.docker.env ./.env
RUN npm install --omit=dev

EXPOSE 3001
CMD ["npm", "run", "start:backend"]