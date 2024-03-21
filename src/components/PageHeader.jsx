// Copyright (c) 2024, The University of North Carolina at Chapel Hill All rights reserved.
//
// SPDX-License-Identifier: BSD 3-Clause

import {Col, Navbar, NavbarBrand, Row} from 'reactstrap';
import {Link} from "react-router-dom";

    export default function PageHeader() {
        return (
            <div style={{backgroundColor: "0a534e"}}>
                <Navbar expand="xs" className="border-top border-gray">
                    <Col className="d-flex justify-content-start">
                        <NavbarBrand>
                            <img alt="logo" src={process.env.PUBLIC_URL + '/iRODS-Logo-RTM_white.png'} style={{height: 40}}/>
                        </NavbarBrand>

                        <NavbarBrand className="d-inline-block p-0">
                            <h1 style={{color: "white"}}>Test request</h1>
                        </NavbarBrand>
                    </Col>
                </Navbar>
                <Navbar expand="xs" className="border-top border-bottom border-gray">
                    <Row>
                        <Col>
                            <div>
                                <nav>
                                    <Link style={{color: "White", align: "left", marginLeft: "50px", marginRight: "100px"}} to="/">Request a new test run</Link>
                                    <Link style={{color: "White", align: "left"}} to="/WatchStatus">Follow the run progress</Link>
                                </nav>
                            </div>
                        </Col>
                    </Row>
                </Navbar>
            </div>
        );
    }