FROM node:12.14.0

WORKDIR /usr/src/app
COPY package.json .
RUN yarn install --force --build-from-source
COPY . .

EXPOSE 50051

CMD ["yarn", "start"]

