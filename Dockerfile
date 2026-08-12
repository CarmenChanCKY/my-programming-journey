## FOR AWS EC2 INSTANCE DEPLOYMENT

# --- Stage 1: Build ---
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Stage 2: Runner ---
FROM node:22-alpine AS runner
WORKDIR /app
USER node
COPY --from=builder --chown=node:node /app/.output ./.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]