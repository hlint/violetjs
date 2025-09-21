FROM imbios/bun-node:23-slim AS oven


FROM oven AS base
WORKDIR /app

FROM base AS builder
WORKDIR /app
COPY ./package.json ./bun.lock ./
COPY ./patches ./patches
RUN bun ci
COPY . .
RUN bun run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist .
CMD bun app.js
