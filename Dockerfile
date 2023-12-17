# Build Stage
FROM node:16.15.1 as build
WORKDIR /usr/src
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Runtime Stage
FROM node:16.15.1
WORKDIR /usr/app
COPY --from=build /usr/src/dist ./dist
COPY package*.json ./
RUN npm install --production
EXPOSE 3000
CMD ["npm", "start"]
