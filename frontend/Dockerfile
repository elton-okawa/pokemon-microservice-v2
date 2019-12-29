FROM node:12.14.0

WORKDIR /usr/src/app
COPY package.json .
RUN yarn install --force --build-from-source
COPY . .

ENV PORT "8080"
EXPOSE 8080

CMD ["yarn", "start"]
