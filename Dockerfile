FROM node:11.9.0-alpine

ENV APP_DIR=/srv/app

RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

RUN apk --no-cache --update add git

COPY package.json yarn.lock $APP_DIR/
RUN yarn

COPY . .

EXPOSE 8081

CMD ["yarn", "start"]
