# SPDX-FileCopyrightText: 2024 Renaissance Computing Institute. All rights reserved.
#
# SPDX-License-Identifier: GPL-3.0-or-later
# SPDX-License-Identifier: LicenseRef-RENCI
# SPDX-License-Identifier: MIT

FROM node:20.11.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

#RUN ls -al

COPY . .

FROM nginx:stable-alpine

COPY build/ /usr/share/nginx/html
