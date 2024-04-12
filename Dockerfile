# Copyright (c) 2024, The University of North Carolina at Chapel Hill All rights reserved.
#
# SPDX-License-Identifier: BSD 3-Clause
# build phase one, create the build
FROM node:20.12 as build

# get some credit
LABEL maintainer="powen@renci.org"

# Create and set the working directory
RUN mkdir /src
WORKDIR /src

# Add `.../node_modules/.bin` to $PATH
ENV PATH /src/node_modules/.bin:$PATH

# get the build arguments
ARG APP_VERSION=$(APP_VERSION)
ARG APP_BASE_DATA_URL=$(APP_BASE_DATA_URL)
ARG APP_SETTINGS_DATA_TOKEN=$(APP_SETTINGS_DATA_TOKEN)
ARG APP_WATCH_REFRESH_TIMEOUT=$(APP_WATCH_REFRESH_TIMEOUT)

# now add the values into ENV params
ENV REACT_APP_VERSION=$APP_VERSION
ENV REACT_APP_BASE_DATA_URL=$APP_BASE_DATA_URL
ENV REACT_APP_SETTINGS_DATA_TOKEN=$APP_SETTINGS_DATA_TOKEN
ENV REACT_APP_WATCH_REFRESH_TIMEOUT=$APP_WATCH_REFRESH_TIMEOUT

# Copy in source files
COPY ./src ./src
COPY ./public ./public
COPY ./iRODS*.png ./
COPY ./package*.json ./

# install package components
RUN npm ci

# Build app
RUN npm run build

###################
# startup the nginx server
###################
FROM nginxinc/nginx-unprivileged:stable-alpine

# get the source files for the site in the right place
COPY --from=build /src/build /opt/bitnami/nginx/html/

# start the web server
CMD ["nginx", "-g", "daemon off;"]
