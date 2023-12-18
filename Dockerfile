FROM node:14-alpine

WORKDIR /usr/src/app

COPY build/ .

RUN npm install -g serve

EXPOSE 3000

CMD ["npm", "start"]



