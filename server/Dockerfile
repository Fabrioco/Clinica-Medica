FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npm run build

CMD ["node", "dist/src/main.js"]
