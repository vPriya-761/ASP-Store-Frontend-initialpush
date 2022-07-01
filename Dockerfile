FROM node:16-alpine as dependencies
WORKDIR /my-project
ARG ASP_API_URL
ENV ASP_API_URL=${ASP_API_URL}
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:16-alpine as builder
WORKDIR /my-project
ARG ASP_API_URL
ENV ASP_API_URL=${ASP_API_URL}
COPY . .
COPY --from=dependencies /my-project/node_modules ./node_modules
RUN yarn build

FROM node:16-alpine as runner
WORKDIR /my-project
ARG ASP_API_URL
ENV ASP_API_URL=${ASP_API_URL}
# If you are using a custom next.config.js file, uncomment this line.
COPY --from=builder /my-project/next.config.js ./
COPY --from=builder /my-project/public ./public
COPY --from=builder /my-project/.next ./.next
COPY --from=builder /my-project/node_modules ./node_modules
COPY --from=builder /my-project/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]
