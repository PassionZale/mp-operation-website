FROM node:12.13-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --registry https://registry.npm.taobao.org

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npm run start"]