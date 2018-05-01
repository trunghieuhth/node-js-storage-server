# Use node version LTS
FROM node:8.11.1

MAINTAINER Hieu Hoang <info@hieuht.com>

# Create app directory in container
RUN mkdir -p /app

# Set /app directory as default working directory
WORKDIR /app

# Only copy package.json initially so that `RUN yarn` layer is recreated only
# if there are changes in package.json
ADD package.json yarn.lock /app/

# --pure-lockfile: Don’t generate a yarn.lock lockfile
RUN yarn --pure-lockfile

# Copy all file from current dir to /app in container
COPY . /app/

# Expose port
EXPOSE 5050

# Start service
CMD [ "yarn", "start" ]
