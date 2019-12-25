FROM node:12.14.0

WORKDIR /usr/src/app
COPY package.json .
RUN yarn install --force --build-from-source
COPY . .

ENV PORT "50053"
EXPOSE 50053

CMD ["yarn", "start"]

