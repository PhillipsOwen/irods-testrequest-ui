// Copyright (c) 2024, The University of North Carolina at Chapel Hill All rights reserved.
//
// SPDX-License-Identifier: BSD 3-Clause

import {Card, CardBody, Col, Container, List, Row} from "reactstrap";

export default function About() {
    /**
     * render the page
     */
    return (
        <div className={"pt-2"}>
            <Container fluid>
                <Card className="about-layout">
                    <CardBody>
                        <h4 className={"pb-2"}>This application is the user interface to the iRODS Test request system.</h4>

                        <h5>The iRODS Test request system represents an integrated environment that spans numerous technologies and services:</h5>
                            <List>
                                <ul>
                                    <li>GitHub code repositories and actions.</li>
                                    <li>Docker container image registry.</li>
                                    <li>Kubernetes cluster.</li>
                                    <li>Web-based interfaces.</li>
                                    <li>Supporting application services.</li>
                                </ul>
                            </List>

                        <h5>Motivation: Improve iRODS testing performance and ease of use.</h5>

                            <List>
                                Design Goals - Primary
                                <ul className={"pb-1"}>
                                    <li>Speed up test runs by running existing iRODS tests on ‘more’ machines in parallel.</li>
                                    <li>iRODS Development team gets ‘hands-free’ testing automatically or upon request.</li>
                                    <li>Team visibility of ongoing testing and progress.</li>
                                </ul>
                                Design Goals - Secondary
                                <ul>
                                    <li>GitHub Action integration for per pull-request and support merged test runs.</li>
                                    <li>External visibility of ongoing testing progress.</li>
                                    <li>Automated builds in GitHub.</li>
                                </ul>
                            </List>

                        <h5>Technology list of the iRODS Test request system:</h5>
                        <List>
                            <Row>
                                <Col>
                                    <ul>
                                        <li>DBMS</li>
                                            <ul>
                                                <li>PostgreSQL v15.4</li>
                                            </ul>

                                        <li>Development environment</li>
                                            <ul>
                                                <li>PyLint v3.1.0</li>
                                                <li>PyTest v8.1.1</li>
                                                <li>Python v3.12.2</li>
                                            </ul>
                                        </ul>
                                </Col>
                                <Col>
                                    <ul>
                                        <li>Docker</li>
                                            <ul>
                                                <li>Engine v25.0.3</li>
                                                <li>API v1.44</li>
                                            </ul>

                                        <li>Kubernetes</li>
                                            <ul>
                                                <li>API v28.1.0</li>
                                                <li>Helm v3.12.1</li>
                                                <li>Client v1.28.7</li>
                                                <li>Server v1.27.10</li>
                                            </ul>
                                    </ul>
                                </Col>
                                <Col>
                                    <ul>
                                        <li>User interface</li>
                                            <ul>
                                                <li>Node.js v20.11.1</li>
                                                <li>Npm v10.5.0</li>
                                                <li>React v18.2.0</li>
                                                <li>ReactStrap v9.2.2</li>
                                            </ul>

                                        <li>Web-services</li>
                                            <ul>
                                                <li>FASTAPI v0.110.0</li>
                                            </ul>
                                    </ul>
                                </Col>
                            </Row>
                        </List>
                    </CardBody>
                </Card>
            </Container>
    </div>);
}
