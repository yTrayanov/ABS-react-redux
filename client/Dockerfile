FROM node AS base
ARG NODE_ENV
ENV NODE_ENV "${NODE_ENV:-production}"


FROM base as deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install


FROM base
WORKDIR /app
COPY . ./
COPY --from=deps /app/node_modules ./node_modules/
EXPOSE 3000
CMD ["npm", "start"]