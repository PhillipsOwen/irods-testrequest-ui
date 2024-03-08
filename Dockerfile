# Copyright (c) 2024, The University of North Carolina at Chapel Hill All rights reserved.
#
# SPDX-License-Identifier: BSD 3-Clause


# build phase one, create the build
FROM node:20.11.1 as build

# get some credit
LABEL maintainer="powen@renci.org"

# set the working directory
WORKDIR /usr/src/app

# copy all the source files there
COPY . .

# install all packages/componenets
RUN npm install

# create a production build
RUN npm run build

# build phase two, create the web server
FROM nginx:stable-alpine

# copy in the build files into the image
COPY --from=build /usr/src/app/build/ /usr/share/nginx/html
