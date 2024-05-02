// Copyright (c) 2024, The University of North Carolina at Chapel Hill All rights reserved.
//
// SPDX-License-Identifier: BSD 3-Clause
import React, {useEffect, useState} from 'react';
import {
    Container, Row, Col,
    Form,
    Dropdown, DropdownMenu, DropdownToggle,
    Button, Input, InputGroup} from "reactstrap";
import GetTestTypeData from "../data/GetDropDownData";
import {Link} from "react-router-dom";

export default function WatchStatus() {

    // set the default refresh time
    const refreshTime = Number(process.env.REACT_APP_WATCH_REFRESH_TIMEOUT);

    // set the setting security token
    const dataSecurityToken = process.env.REACT_APP_SETTINGS_DATA_TOKEN;

    // handle the query string
    const queryParams = new URLSearchParams(window.location.search);
    const inRequestName = queryParams.get("request-name");

    // define the state variables
    const [statusMsg, setStatusMsg] = useState('');
    const [scanning, setScanning] = useState(false);
    const [scanningMsg, setScanningMsg] = useState('Standing by. Select or enter a test request name and submit...');
    const [test_RequestName, set_test_RequestName] = useState(inRequestName || '');
    const [test_RequestOpen, set_test_RequestOpen] = useState(false);
    const [downloadButtonView, set_download_button_state] = useState(false);


    const toggle_TestRequest = () => {
        /**
         * toggles the state of the test type name pulldown
         */

        // save the new state of the control
        set_test_RequestOpen(!test_RequestOpen);
    };

    const change_TestRequestSelectValue = (value) => {
        /**
         * on change event handler for the testRequest type name dropdown control
         */

        // update the test type name in the class state
        set_test_RequestName(value);

        // set the scanning state
        setScanning(false);

        // and set the scanning message
        setScanningMsg(`Standing by. Select or enter a test request name and submit...`);

        // clear the test results
        setStatusMsg('');

        // hide the download button
        set_download_button_state(false);
    };

    // set the request header
    const requestOptions = {
        method: 'GET', headers: {
            Authorization: `Bearer ${dataSecurityToken}`
        }
    };

    async function getStatusData() {
        /**
         * gets the status message from the DB
         */
        try {
            // attempt to get the data
            const statusData = await fetch(process.env.REACT_APP_BASE_DATA_URL + `get_run_status/?request_group=${test_RequestName}`,
                requestOptions);

            // if the data was not retrieved successfully
            if (!statusData.ok) {
                // set the error message
                setStatusMsg(`An error has occurred: ${statusData.status} - ${statusData.statusText}`);
            } else {
                // wait for the data
                const data = await statusData.json();

                // if no job data was found
                if (data['Jobs'] === null) {
                    // set a warning
                    data['Jobs'] = 'Not found';

                    // save the message
                    setStatusMsg(JSON.stringify(data, null, 2));

                    // turn off scanning
                    setScanning(false);

                    // and set the scanning message
                    setScanningMsg(`Standing by. Select or enter a test request name and submit...`);

                    // hide the download button
                    set_download_button_state(false);
                } else {
                    // save the message
                    setStatusMsg(JSON.stringify(data, null, 2));

                    // if the testing is complete
                    if (data['Testing Jobs']['Total'] === data['Testing Jobs']['Complete']) {
                        // enable scanning
                        setScanning(false);

                        // and set the scanning message
                        setScanningMsg(`"${test_RequestName}" testing complete...`);

                        // view the download button
                        set_download_button_state(true);
                    }
                    else {
                        // enable scanning
                        setScanning(true);

                        // and set the scanning message
                        setScanningMsg(`Scanning the "${test_RequestName}" request for status updates...`);

                        // hide the download button
                        set_download_button_state(false);
                    }
                }
            }
        } catch (err) {
            // output the error to the status area
            setStatusMsg(err.message);
        }
    }

    // get the data
    useEffect(() => {
        // if we are in scan mode
        if (scanning) {
            // no need to call for data if there is no request group
            if (test_RequestName !== "") {
                // This will refresh the data at regularIntervals of refreshTime
                const comInterval = setInterval(getStatusData, refreshTime);

                // This will refresh the data at regularIntervals of refreshTime
                return () => clearInterval(comInterval);
            }
        }
    });

    const handleSubmit = (e) => {
        /**
         * handles the form submission.
         */
        e.preventDefault();

        // and set the scanning message
        setScanningMsg(``);

        // start getting the data
        getStatusData().then();
    };

    const handleTest_RequestNameChange = (e) => {
        /**
         * event handler for the form controls
         */
        e.preventDefault();

        // save the event target
        const {target} = e;

        // save the event vale
        set_test_RequestName(target.value);
    };

    const StatusPollingText = () => {
        /**
         * display of what request is being polled
         */
        // return the control
        return (
            <div className={"pt-3"}>
                <Row>
                    <Col className="d-flex">
                        <h4 className={"pe-3"}>{scanningMsg}</h4>
                    {
                        downloadButtonView &&
                        <div className={"pb-1"}>
                            <Link to={`https://irods-settings-dev.apps.renci.org/get_test_result_file?request_name=${test_RequestName}`}><Button color={"success"}> Ready to Download </Button></Link>
                        </div>
                    }
                    </Col>
                </Row>

                <Input
                    className="input-control"
                    type="textarea"
                    disabled={true}
                    defaultValue={statusMsg}
                    rows="22"/>
            </div>

        );
    };

    /**
     * render the page
     */
    return (
        <div>
            <Container fluid>
                <Form className="form" onSubmit={(e) => handleSubmit(e)}>
                    <Row className={"pt-2"}>
                        <Col xs={"8"}>
                            <InputGroup>
                                <Dropdown isOpen={test_RequestOpen} toggle={toggle_TestRequest}>
                                    <DropdownToggle caret color={"success"}>Test request name</DropdownToggle>

                                    <DropdownMenu container="body">
                                        <GetTestTypeData data_name={'get_test_request_names'} on_click={change_TestRequestSelectValue}/>
                                    </DropdownMenu>
                                </Dropdown>

                                <Input name="test_RequestName"
                                       type="text"
                                       id="test_RequestName"
                                       value={test_RequestName}
                                       placeholder="Select or enter a test request name"
                                       onChange={(e) => {handleTest_RequestNameChange(e);}}>
                                </Input>

                                <Button className="button-size" color={"success"}>Submit</Button>
                            </InputGroup>
                        </Col>
                    </Row>
                </Form>

                <Row className={"pb-0"}>
                    <StatusPollingText/>
                </Row>
            </Container>
            <br/>
        </div>
    );
}
