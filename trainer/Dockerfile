FROM node:12.14.0

WORKDIR /usr/src/app
COPY package.json .
RUN yarn install --force --build-from-source
COPY . .

ENV PORT "50051"
EXPOSE 50051

CMD ["yarn", "start"]

