import {Col, Navbar, NavbarBrand, Row} from 'reactstrap';
import {Link} from "react-router-dom";

    export default function PageHeader() {
        return (
            <>
                <Navbar style={{backgroundColor: '#18bc9c'}} expand="xs" className="border-bottom border-gray">
                    <Col className="justify-content-start">
                        <NavbarBrand href="https://www.irods.org">
                            <img alt="logo" src={process.env.PUBLIC_URL + '/iRODS-Logo-RTM_white.png'} style={{height: 40}}/>
                        </NavbarBrand>
                    </Col>

                    <Col className="justify-content-center">
                        <NavbarBrand className="d-inline-block p-0">
                            <h1 style={{color: "white"}}>Test request</h1>
                        </NavbarBrand>
                    </Col>

                    <Col></Col>
                </Navbar>
                <Navbar expand="xs" className="border-bottom border-gray">
                    <Row>
                        <Col>
                        <div>
                            <div>
                                <nav>
                                    <Link style={{color: "White", align: "left"}} to="/">Request a new test run</Link>
                                    <p/>
                                    <Link style={{color: "White", align: "left"}} to="/WatchStatus">Follow the run state</Link>
                                </nav>
                            </div>
                        </div>
                        </Col>
                    </Row>
                </Navbar>
            </>
        );
    }