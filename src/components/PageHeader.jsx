// Copyright (c) 2024, The University of North Carolina at Chapel Hill All rights reserved.
//
// SPDX-License-Identifier: BSD 3-Clause

import {Button, Col, Navbar, NavbarBrand} from 'reactstrap';
import {Link} from "react-router-dom";

    export default function PageHeader() {
        return (
            <header>
                <Navbar className="border-top border-gray">
                    <Col className="d-flex justify-content-start">
                        <NavbarBrand href={"/"}>
                            <img alt="logo" src={process.env.PUBLIC_URL + '/iRODS-Logo-RTM_teal_grey.png'}/>
                        </NavbarBrand>

                        <NavbarBrand className="d-inline-block p-0"><h1 style={{fontSize: "35px"}}>Test Request</h1></NavbarBrand>
                    </Col>
                </Navbar>

                <Navbar className="border-top border-bottom border-gray">
                    <Col className="d-flex justify-content-start">
                        <Link className="links" to="/"><Button color={"success"}> Create a test run </Button></Link>
                        <Link className="links" to="/WatchStatus"><Button color={"success"}> View test run progress </Button></Link>
                    </Col>
                </Navbar>
            </header>
        );
    }