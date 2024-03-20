// Copyright (c) 2024, The University of North Carolina at Chapel Hill All rights reserved.
//
// SPDX-License-Identifier: BSD 3-Clause

import {Container, Row} from "reactstrap";

export default function About() {
    /**
     * render the page
     */
    return (<>
        <Container className='mt-4'>
            <Row>
                <span style={{color: "white"}}>
                    <h3>
                        Here are some details on this application.
                    </h3>
                    <span style={{textAlign: "left"}}>
                        <p>
                            <br/>
                            The motivation for this application is...
                        </p>

                        <p>
                            <br/>
                            The components in this application are...
                        </p>

                        <p>
                            <br/>
                            The technologies used in this application are...
                        </p>
                    </span>
                </span>
            </Row>
        </Container>
    </>);
}
