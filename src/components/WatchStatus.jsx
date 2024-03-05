// Copyright (c) 2024, The University of North Carolina at Chapel Hill All rights reserved.
//
// SPDX-License-Identifier: BSD 3-Clause

import {Container, Input, InputGroup, InputGroupText, Row} from "reactstrap";
import React, {useEffect, useRef, useState} from 'react';

export default function WatchStatus() {
    //const baseURL = 'http://localhost:4000/get_run_status/?request_group=';
    const baseURL = 'https://irods-settings-dev.apps.renci.org/get_run_status/?request_group=';

    const refreshTime = 5000
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiZWFyZXJfbmFtZSI6InNldHRpbmdzLWRldiIsImJlYXJlcl9zZWNyZXQiOiI2NTU0N2' +
    'U0NDg2Y2I1ZTg0NzkzMWZjMjAwYTQ5MjM5OTA3ZmZhMTRhNDY4ZTM2MzMifQ.eBsy9qwrj8Axs9b_WV1cY8k_dHDMsc5vvhoIfqTZ1v0';

    const request_group = useRef('');
    const [statusMsg, setStatusMsg] = useState('');
    const [scanning, setScanning] = useState(false);

    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    async function getStatusData() {
        /**
         * gets the status message from the DB
         */
        try {
            // attempt to get the data
            const statusData = await fetch(`${baseURL}${request_group.current.value}`, requestOptions);

            // if the data was not retrieved successfully
            if (!statusData.ok) {
                // set the error message
                setStatusMsg(`An error has occurred: ${statusData.status} - ${statusData.statusText}`);
            }
            else {
                // wait for the data
                const data = await statusData.json();

                // save the message
                setStatusMsg(replaceAll(data[0], ', ', '\n'));

                if (!(data[0].startsWith('Error', 0) || data[0].startsWith('Warning', 0))) {
                    // enable scanning
                    setScanning(true);
                } else {
                    // turn off scanning
                    setScanning(false);
                }
            }
        } catch (err) {
            // output the error to the status area
            setStatusMsg(err.message);
        }
    }

    const replaceAll = function(inStr, find, replace) {
        /**
         * method to replace all occurrences of a string in a string
         */
        return inStr.split(find).join(replace);
    };

    // get the data
    useEffect(() => {
        if (scanning) {
            // no need to call for data if there is no request group
            if (request_group !== "") {
                console.log("effect -> request group:" + request_group);

                // This will refresh the data at regularIntervals of refreshTime
                const comInterval = setInterval(getStatusData, refreshTime);

                // This will refresh the data at regularIntervals of refreshTime
                return () => clearInterval(comInterval)
            }
        }
    })

    const handleOnChange = () => {
        /**
         * handles the value change on the test request name
         */
        // are we in scan mode?
        if (scanning) {
            // turn off scanning
            setScanning(false);

            // clear the status message
            setStatusMsg('');
        }
    }

    const TextWithFormatting = () => {
        /**
         *
         */
        // init the message storage
        let message = ''

        // if we are currently scanning display a message
        if (scanning === true) {
            message = `Scanning the ${request_group.current.value} state...`;
        }
        else {
            message = "Standing by...";
        }

        // return the control
        return (
            <>
                <p/>
                    <div style={{align: "left"}}>
                            <h4 style={{color: "white"}}>{message}</h4>
                    </div>
                <br/>
            </>
        )
    };

    /**
     * render the results
     */
    return (
        <>
            <Container className='mt-4'>
                <Row>
                    <InputGroup>
                        <InputGroupText>
                            Enter the test name &nbsp;
                            {/*<Input type="text"*/}
                            {/*       placeholder="Enter a request name"*/}
                            {/*       ref={request_group}*/}
                            {/*       onChange={ handleOnChange } />*/}

                            <input
                                type="text"
                                ref={request_group}
                                placeholder="Enter a request name"
                                onChange={ handleOnChange }
                                />
                        </InputGroupText>

                        <button className="btn btn-md btn-primary" onClick={getStatusData}>Start</button>

                    </InputGroup>
                </Row>
                <Row>
                    <TextWithFormatting />
                </Row>
                <Row>
                    <InputGroupText>
	                    Test request progress &nbsp;
                        <Input type="textarea" disabled={true} defaultValue={statusMsg} rows="15"/>
	                </InputGroupText>
                </Row>
            </Container>
        </>
    );
}
