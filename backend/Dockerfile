FROM node:14.17-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

# Copy app config files
COPY tsconfig.json tsconfig.build.json nest-cli.json ./

# Copy app sources
COPY src src/
COPY prisma prisma/
COPY public public/

RUN npm build

EXPOSE ${PORT_BACKEND}

CMD ["npm", "run", "start:prod"]
