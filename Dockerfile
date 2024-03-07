# Copyright (c) 2024, The University of North Carolina at Chapel Hill All rights reserved.
#
# SPDX-License-Identifier: BSD 3-Clause

FROM node:20.11.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN ls -al

#COPY . .

#FROM nginx:stable-alpine
#
#COPY build/ /usr/share/nginx/html
