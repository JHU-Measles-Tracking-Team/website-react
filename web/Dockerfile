FROM node:20-alpine AS base

ARG GIT_HASH
ENV GIT_HASH=$GIT_HASH
ENV NEXT_TELEMETRY_DISABLED 1

FROM base AS deps

WORKDIR /app
ARG GITHUB_TOKEN

COPY package.json pnpm-lock.yaml ./

RUN apk add --no-cache py3-pip make g++
RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile

FROM base AS runner

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

WORKDIR /app
ENV NODE_ENV=production

EXPOSE 3000
CMD ["sh", "scripts/build-and-run.sh"]
