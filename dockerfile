FROM node:20.2.0

WORKDIR /app 

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3306

RUN npx prisma generate

RUN npx prisma migrate dev --name init

RUN npx prisma db seed

CMD ["npm", "run", "dev"]