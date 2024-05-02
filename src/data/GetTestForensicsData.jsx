// Copyright (c) 2024, The University of North Carolina at Chapel Hill All rights reserved.
//
// SPDX-License-Identifier: BSD 3-Clause
import React, {useEffect, useState} from "react";
import {Input, InputGroupText, InputGroup} from "reactstrap";
import PropTypes from 'prop-types';

export default function GetTestForensicsData({request_group}) {
    /**
     * function to get data from a web service and return
     * the formatted status of test forensics
     */
    // set component prop types
    GetTestForensicsData.propTypes = {request_group: PropTypes.string};

    // store the items in state
    const [item, setItem] = useState('');

    // define the web service endpoint
    const URL = process.env.REACT_APP_BASE_DATA_URL + 'get_run_forensics/?request_group=' + request_group;

    // set the setting security token
    const dataSecurityToken = process.env.REACT_APP_SETTINGS_DATA_TOKEN;

    // push up the data
    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${dataSecurityToken}`
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
