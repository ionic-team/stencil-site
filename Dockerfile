FROM mhart/alpine-node:8

WORKDIR /usr/src

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

RUN mv www /public
