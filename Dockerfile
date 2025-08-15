# 
FROM node:20.18.2-alpine3.21 AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json* ./


# 安装依赖
# 这一步会利用 Docker 的缓存，只有在 package.json 或 package-lock.json 发生变化时才会重新运行
# 设置 npm 镜像地址
# ENV HTTP_PROXY=http://host.docker.internal:7897
# ENV HTTPS_PROXY=http://host.docker.internal:7897

# RUN npm config set registry https://mirrors.huaweicloud.com/repository/npm && npm install
# RUN npm config set registry https://registry.npmmirror.com  \
# && npm install

COPY node_modules ./node_modules

# 构建
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"
# CMD ["node", "server.js"]
CMD ["npm", "start"]
