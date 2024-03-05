// Copyright (c) 2024, The University of North Carolina at Chapel Hill All rights reserved.
//
// SPDX-License-Identifier: BSD 3-Clause License

import React, {useEffect, useState} from "react";
import {Input, InputGroupText, InputGroup} from "reactstrap";

//const baseURL = 'http://localhost:4000/';
const baseURL = 'https://irods-settings-dev.apps.renci.org/'

export default function GetTestForensicsData({request_group}) {
    /**
     * function to get data from a web service and return
     * the formatted status of test forensics
     */

    // store the items in state
    const [item, setItem] = useState('');

    // define the web service endpoint
    let URL = baseURL + '/get_run_forensics/?request_group=' + request_group;

    const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiZWFyZXJfbmFtZSI6InNldHRpbmdzLWRldiIsImJlYXJlcl9zZWNyZXQiOiI2NTU0N2U0NDg2Y2I1ZTg0NzkzMWZjMjAwYTQ5MjM5OTA3ZmZhMTRhNDY4ZTM2MzMifQ.eBsy9qwrj8Axs9b_WV1cY8k_dHDMsc5vvhoIfqTZ1v0';

    // push up the data
    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    // get the data
    useEffect(() => {
        const fetchTestForensicsData = () => {
            return fetch(URL, requestOptions
            )
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    // check for issues in the one and only record
                    if (!(data[0].startsWith('Error', 0) || data[0].startsWith('Warning', 0))) {
                        // save the text
                        setItem(data[0]);
                    }

                })
                .catch(err => {
                    console.log(err);
                }, []);
        };

        fetchTestForensicsData().then();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // return the rendered content
    return (
        <InputGroup>
            <InputGroupText>
                Test forensics
            </InputGroupText>

            <Input type="textarea" defaultValue={item} rows="15" />
        </InputGroup>
    );
}
