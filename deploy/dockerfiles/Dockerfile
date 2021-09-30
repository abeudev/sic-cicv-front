# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app/client

# add `/app/client/node_modules/.bin` to $PATH
ENV PATH /app/client/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/client/package.json
RUN npm install

# start app
CMD ["npm", "run", "serve"]