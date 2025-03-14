FROM node:lts-bullseye

WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
COPY . .

CMD ["npm", "run", "dev"]