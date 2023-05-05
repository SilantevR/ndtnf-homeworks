FROM node:18-buster

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY ./client /app/client/
COPY ./server /app/server/

EXPOSE 3000

CMD ["npm", "start"]