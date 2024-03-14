// Copyright (c) 2024, The University of North Carolina at Chapel Hill All rights reserved.
//
// SPDX-License-Identifier: BSD 3-Clause

import {Button, Container, Form, FormGroup, Input, InputGroup, InputGroupText, Row} from "reactstrap";
import React, {useEffect, useState} from 'react';

export default function WatchStatus() {

    // set the default refresh time
    const refreshTime = Number(process.env.REACT_APP_WATCH_REFRESH_TIMEOUT);

    // set the setting security token
    const dataSecurityToken = process.env.REACT_APP_SETTINGS_DATA_TOKEN;

    // handle the query string
    const queryParams = new URLSearchParams(window.location.search);
    const inRequestName = queryParams.get("request-name");

    // define the state variables
    const [test_RequestName, set_test_RequestName] = useState(inRequestName);
    const [statusMsg, setStatusMsg] = useState('');
    const [scanning, setScanning] = useState(false);

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
                } else {
                    // save the message
                    setStatusMsg(JSON.stringify(data, null, 2));

                    // enable scanning
                    setScanning(true);
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
                return () => clearInterval(comInterval)
            }
        }
    })

    const StatusPollingText = () => {
        /**
         * display of what request is being polled
         */
        // init the message storage
        let message;

        // if we are currently scanning display a message
        if (scanning === true) {
            message = `Polling the "${test_RequestName}" request for status updates...`;
        } else {
            message = "Standing by...";
        }

        // return the control
        return (<>
            <p/>
            <div style={{align: "left"}}>
                <h4 style={{color: "white"}}>{message}</h4>
            </div>
            <br/>
        </>)
    };

    const handleSubmit = (e) => {
        /**
         * handles the form submission.
         */
        e.preventDefault();

        // start getting the data
        getStatusData().then();
    }

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

    /**
     * render the page
     */
    return (<>
        <Container className='mt-4'>
            <Row>
                <Form className="form" onSubmit={(e) => handleSubmit(e)}>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupText>
                                Enter the test request name &nbsp;
                            </InputGroupText>

                            <Input type="text" name="test_RequestName" id="test_RequestName" value={test_RequestName}
                                   placeholder="Enter a request name"
                                   onChange={(e) => {handleTest_RequestNameChange(e)}}>
                            </Input>

                            <Button style={{width: "100"}} color={"primary"}>Submit</Button>
                        </InputGroup>
                    </FormGroup>
                </Form>
            </Row>
            <Row>
                <StatusPollingText/>
            </Row>
            <Row>
                <InputGroupText>
                    Test request progress &nbsp;
                    <Input type="textarea" disabled={true} defaultValue={statusMsg} rows="15"/>
                </InputGroupText>

            </Row>
        </Container>
    </>);
}
