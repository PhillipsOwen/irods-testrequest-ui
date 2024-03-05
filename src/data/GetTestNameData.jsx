// Copyright (c) 2024, The University of North Carolina at Chapel Hill All rights reserved.
//
// SPDX-License-Identifier: BSD 3-Clause

import React, {useEffect, useState} from "react";

//const baseURL = 'http://localhost:4000/';
const baseURL = 'https://irods-settings-dev.apps.renci.org/'

export default function GetTestNameData() {
    /**
     * function to get data from a web service and return
     * the formatted items for the test name list
     */

    // store the items in state
    const [items, setItems] = useState([])

    // define the web service endpoint
    let URL = baseURL + 'get_test_names';

    const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiZWFyZXJfbmFtZSI6InNldHRpbmdzLWRldiIsImJlYXJlcl9zZWNyZXQiOiI2NTU0N2U0NDg2Y2I1ZTg0NzkzMWZjMjAwYTQ5MjM5OTA3ZmZhMTRhNDY4ZTM2MzMifQ.eBsy9qwrj8Axs9b_WV1cY8k_dHDMsc5vvhoIfqTZ1v0';

    // push up the data
    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    // // get the data
    useEffect(() => {
        const fetchTestNameData = () => {
            return fetch(URL, requestOptions
            )
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    setItems(data)
                })
                .catch(err => {
                    console.log(err);
                });
        };

        fetchTestNameData().then();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // return the rendered content
    return (
        <>
            {items.map(item => (
                <option key={item.label} value={item.label}>{item.label}</option>
            ))}
        </>
    );
}
