FROM node:18-buster

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY ./dist /app/dist/


EXPOSE 4000

CMD ["npm", "start"]