# Copyright (c) 2024, The University of North Carolina at Chapel Hill All rights reserved.
#
# SPDX-License-Identifier: BSD 3-Clause


# build phase one, create the build
FROM node:20.12 as build

# get some credit
LABEL maintainer="powen@renci.org"

# set the working directory
WORKDIR /usr/src/app

# copy over the source files
COPY ./src ./src
COPY ./public ./public
COPY ./iRODS*.png ./
COPY ./package*.json ./

# install all packages/components
RUN npm install -g npm@10.5.1

# make sure we have the react scripts installed
RUN npm install react-scripts

# get the build argument that has the version
ARG APP_VERSION=$(APP_VERSION)

# now add the version arg value into a ENV param
ENV REACT_APP_VERSION=$APP_VERSION
