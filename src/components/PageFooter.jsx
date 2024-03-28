// Copyright (c) 2024, The University of North Carolina at Chapel Hill All rights reserved.
//
// SPDX-License-Identifier: BSD 3-Clause

import {Col, Navbar} from "reactstrap";
import {Link} from "react-router-dom";

export default function PageFooter() {
    // builds the footer on the page
    return (
        <footer>
            <Navbar expand="xs" className="border-top border-gray">
                <Col className="d-flex justify-content-start links">
                    Version: {process.env.REACT_APP_VERSION}
                </Col>

                <Col className="d-flex justify-content-center links">
                    <Link to="https://www.irods.org/">
                        <img alt="logo" src={process.env.PUBLIC_URL + '/favicon.png'} style={{height: 25}}/>
                    </Link>
                    <div className={"links"}> Copyright © iRODS Consortium 2024 </div>
                </Col>

                <Col className="d-flex justify-content-end links">
                    <Link className={"links"} to="/About">About</Link>
                </Col>
            </Navbar>
        </footer>
    );
}
