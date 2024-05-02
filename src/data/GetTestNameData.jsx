// Copyright (c) 2024, The University of North Carolina at Chapel Hill All rights reserved.
//
// SPDX-License-Identifier: BSD 3-Clause
import React, {useEffect, useState} from "react";

export default function GetTestNameData() {
    /**
     * function to get data from a web service and return
     * the formatted items for the test name list
     */

    // store the items in state
    const [items, setItems] = useState([]);

    // define the web service endpoint
    const URL = process.env.REACT_APP_BASE_DATA_URL + 'get_test_names';

    // set the setting security token
    const dataSecurityToken = process.env.REACT_APP_SETTINGS_DATA_TOKEN;

    // push up the data
    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${dataSecurityToken}`
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
                    setItems(data);
                })
                .catch(err => {
                    console.log(err);
                });
        };

        fetchTestNameData().then();
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
