// Copyright (c) 2024, The University of North Carolina at Chapel Hill All rights reserved.
//
// SPDX-License-Identifier: BSD 3-Clause

import {
    Container, Row,
    Form, FormGroup,
    Dropdown, DropdownMenu, DropdownToggle,
    Button, Input, InputGroup

} from "reactstrap";
import React, {useEffect, useState} from 'react';
import GetTestTypeData from "../data/GetDropDownData";

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
    const [test_RequestName, set_test_RequestName] = useState(inRequestName || '');
    const [test_RequestOpen, set_test_RequestOpen] = useState(false);

    const toggle_TestRequest = () => {
        /**
         * toggles the state of the test type name pulldown
         */

        // save the new state of the control
        set_test_RequestOpen(!test_RequestOpen);
    }

    const change_TestRequestSelectValue = (value) => {
        /**
         * on change event handler for the testRequest type name dropdown control
         */

        // update the test type name in the class state
        set_test_RequestName(value);

        setScanning(false);

        // save the message
        // setStatusMsg(null);
    }

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
        return (
            <div style={{textAlign: "left"}}>
                <h4>{message}</h4>
                <Input className="input-control" type="textarea" disabled={true} defaultValue={statusMsg} rows="26"/>
            </div>
        )
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

    return (
        <div>
            <Container className='mt-3'>
                <Form className="form" onSubmit={(e) => handleSubmit(e)}>
                    <Row>
                        <FormGroup>
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
                                       onChange={(e) => {handleTest_RequestNameChange(e)}}>
                                </Input>

                                <Button className="button-size" color={"success"}>Submit</Button>
                            </InputGroup>
                        </FormGroup>
                    </Row>
                </Form>

                <Row>
                    <StatusPollingText/>
                </Row>
            </Container>
            <br/>
        </div>
    );
}
