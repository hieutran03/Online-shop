FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

COPY entrypoint.sh entrypoint.sh

RUN chmod +x entrypoint.sh

CMD ["./entrypoint.sh"]