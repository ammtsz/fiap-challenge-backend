FROM node:20

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run test
RUN npm run build

CMD [ "node", "dist/main.js"]