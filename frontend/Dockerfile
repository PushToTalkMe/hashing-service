FROM node:18 AS builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY tsconfig.json ./
COPY frontend ./frontend
COPY shared ./shared
COPY prisma ./prisma
COPY .frontend.docker.env ./frontend/.env
RUN npm install
RUN npx prisma generate --schema=prisma/schema.prisma
RUN npm run build:frontend

FROM node:18
WORKDIR /app

COPY --from=builder /app/frontend/.next ./frontend/.next
COPY --from=builder /app/shared/prisma ./shared/prisma
COPY package.json package-lock.json ./
COPY .frontend.docker.env ./frontend/.env
COPY ./frontend/package.json ./frontend/package-lock.json /app/frontend/
RUN npm install --omit=dev

EXPOSE 3000
CMD ["npm", "run", "start:frontend"]