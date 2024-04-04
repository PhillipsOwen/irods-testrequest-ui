<!--
Copyright (c) 2024, The University of North Carolina at Chapel Hill All rights reserved.

SPDX-License-Identifier: BSD 3-Clause
-->

[![iRODS](iRODS-Logo.png)](https://docs.irods.org)

# iRODS-K8s Test Request UI
The iRODS-K8s Test Request UI is a Node.js/React website used to submit a test request to the iRODS K8s supervisor.

#### Licenses...
[![MIT License](https://img.shields.io/badge/License-MIT-orange.svg)](https://github.com/irods-contrib/iRODS-K8s-forensics/blob/main/LICENSE)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![RENCI License](https://img.shields.io/badge/License-RENCI-blue.svg)](https://www.renci.org/)
#### Components and versions...
[![Node.js](https://img.shields.io/badge/Node.js-v20.11.1-orange)](https://nodejs.org/en/download/)
[![NPM](https://img.shields.io/badge/NPM-10.4.0-yellow)](https://www.npmjs.com/)

#### Build status...
[![Build and push the Docker image](https://github.com/PhillipsOwen/irods-testrequest-ui/actions/workflows/image-push.yml/badge.svg)](https://github.com/PhillipsOwen/irods-testrequest-ui/actions/workflows/image-push.yml)

## Description
The iRODS-K8s Test Request UI product allows a user to create and submit a test request and watch its progression through K8s.

Standard Node.js/React build rules apply.

### The environment dependencies for this app are:

    User interface - Node.js: v20.11.1, Npm: v10.5.0, React: v18.2.0, ReactStrap: v9.2.2
    Docker - Engine: v25.0.3, API: v1.44

### The React packages are:
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "bootstrap": "^5.3.3",
    "express": "^4.18.2",
    "react": "^18.2.0",
    "react-bootstrap": "^2.10.1",
    "react-dom": "^18.2.0",
    "react-multi-select-component": "^4.3.4",
    "react-router-dom": "^6.22.1",
    "react-scripts": "5.0.1",
    "reactstrap": "^9.2.2",
    "web-vitals": "^2.1.4"

### How to build the Docker image for this product

 - docker build --build-arg APP_VERSION=<version> -f Dockerfile -t irods-testrequest-ui:latest .
 - Note: The Docker image must be placed in a container image registry and referenced in this component's Helm scripts.

### Helm/k8s charts for this product are available *[here](https://github.com/irods/irods_k8s/tree/main/helm/irods-testrequest-ui)*.
