// Copyright (c) 2024, The University of North Carolina at Chapel Hill All rights reserved.
//
// SPDX-License-Identifier: BSD 3-Clause

import {Container, Navbar, Row} from "reactstrap";
import {Link} from "react-router-dom";

export default function PageFooter() {
    // builds the footer on the page
    return (
        <div>
            <footer className="footer">
                <Container>
                    <Row>
                        <div>
                            <Navbar>
                                <nav>
                                    <div style={{color: "white", marginTop: "5px"}}>
                                        <Link style={{color: "white"}} to="/About">About</Link>

                                        <span style={{marginLeft: "30px"}}>
                                            Version: {process.env.REACT_APP_VERSION}
                                        </span>
                                    </div>
                                </nav>
                            </Navbar>
                        </div>
                    </Row>
                </Container>
            </footer>
        </div>
    );
}
