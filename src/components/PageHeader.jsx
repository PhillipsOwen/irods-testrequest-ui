// Copyright (c) 2024, The University of North Carolina at Chapel Hill All rights reserved.
//
// SPDX-License-Identifier: BSD 3-Clause

import {Col, Navbar, NavbarBrand} from 'reactstrap';
import {Link} from "react-router-dom";

    export default function PageHeader() {
        return (
            <header>
                <Navbar className="border-top border-gray">
                    <Col className="d-flex justify-content-start">
                        <NavbarBrand href={"/"}>
                            <img alt="logo" src={process.env.PUBLIC_URL + '/iRODS-Logo-RTM_teal_grey.png'}/>
                        </NavbarBrand>

                        <NavbarBrand className="d-inline-block p-0"><h1>Test request</h1></NavbarBrand>
                    </Col>
                </Navbar>

                <Navbar className="border-top border-bottom border-gray">
                    <Col className="d-flex justify-content-start">
                        <Link className="links" to="/">Request a new test run</Link>
                        <Link className="links" to="/WatchStatus">Follow the run progress</Link>
                    </Col>
                </Navbar>
            </header>
        );
    }