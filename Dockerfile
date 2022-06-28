FROM node:16-alpine AS base
WORKDIR /app
EXPOSE 8080

FROM base AS build-backend
WORKDIR /app

# install packages
COPY package.json .
RUN yarn install --frozen-lockfile

# copy other files and build
COPY . .
RUN yarn build

FROM build-backend AS build-frontend
# build frontend
WORKDIR /app/client
RUN yarn install --frozen-lockfile
RUN yarn build
RUN cp -R /app/client/dist /app/dist/client

FROM base AS production-modules
ENV NODE_ENV production
COPY package.json .
RUN yarn install --frozen-lockfile

FROM base AS final
ENV NODE_ENV production
COPY --from=production-modules /app/node_modules ./node_modules
COPY --from=build-frontend /app/dist/ ./dist

CMD [ "node", "./dist/main.js" ]