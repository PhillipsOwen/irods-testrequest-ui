// Copyright (c) 2024, The University of North Carolina at Chapel Hill All rights reserved.
//
// SPDX-License-Identifier: BSD 3-Clause

import {Col, Navbar, NavbarBrand, Row} from 'reactstrap';
import {Link} from "react-router-dom";

    export default function PageHeader() {
        return (
            <>
                <Navbar style={{backgroundColor: '#18bc9c'}} expand="xs" className="border-bottom border-gray">
                    <Col className="d-flex justify-content-start">
                        <NavbarBrand href="/About">
                            <img alt="logo" src={process.env.PUBLIC_URL + '/iRODS-Logo-RTM_white.png'} style={{height: 40}}/>
                        </NavbarBrand>
                    </Col>

                    <Col className="d-flex justify-content-center">
                        <NavbarBrand className="d-inline-block p-0">
                            <h1 style={{color: "white"}}>Test request</h1>
                        </NavbarBrand>
                    </Col>

                    <Col className="d-flex justify-content-end">
                        <span style={{color: "white"}}>Version: {process.env.REACT_APP_VERSION}</span>
                    </Col>
                </Navbar>
                <Navbar expand="xs" className="border-bottom border-gray">
                    <Row>
                        <Col>
                        <div>
                            <div>
                                <nav>
                                    <Link style={{color: "White", align: "left", marginRight: "100px"}} to="/">Request a new test run</Link>
                                    <Link style={{color: "White", align: "left"}} to="/WatchStatus">Follow the run progress</Link>
                                </nav>
                            </div>
                        </div>
                        </Col>
                    </Row>
                </Navbar>
            </>
        );
    }