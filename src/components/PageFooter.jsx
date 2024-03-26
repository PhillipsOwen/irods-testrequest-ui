// Copyright (c) 2024, The University of North Carolina at Chapel Hill All rights reserved.
//
// SPDX-License-Identifier: BSD 3-Clause

import {Container, Col, Row, Navbar} from "reactstrap";
import {Link} from "react-router-dom";

export default function PageFooter() {
    // builds the footer on the page
    return (
        <Container className='mt-3'>
            <Row>
                <footer className="footer" style={{color: "white"}}>
                    <Navbar expand="xs" className="border-top border-gray">
                        <Col className="d-flex justify-content-start">
                            Version: {process.env.REACT_APP_VERSION}
                        </Col>

                        <Col className="d-flex justify-content-center">
                            <img alt="logo" src={process.env.PUBLIC_URL + '/favicon.png'} style={{backgroundColor: "white", height: 20}}/>
                        </Col>

                        <Col className="d-flex justify-content-end">
                            <Link style={{textAlign: "center", color: "white"}} to="/About">About</Link>
                        </Col>
                    </Navbar>
                </footer>
            </Row>
        </Container>
    );
}
