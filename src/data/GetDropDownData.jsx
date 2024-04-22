// Copyright (c) 2024, The University of North Carolina at Chapel Hill All rights reserved.
//
// SPDX-License-Identifier: BSD 3-Clause
import React, {useEffect, useState} from "react";
import {DropdownItem} from "reactstrap";

export default function GetPulldownData({data_name, on_click}) {
    /**
     * function to get data from a web service and return
     * the formatted items for a dropdown
     */

    // store the items in state
    const [items, setItems] = useState([])

    // define the web service endpoint
    const URL = process.env.REACT_APP_BASE_DATA_URL + data_name;

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
        const fetchPullDownData = () => {
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

        fetchPullDownData().then();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // return the rendered content
    return (
        <>
            {items.map(item => (
                <DropdownItem key={item} onClick={() => on_click(item)}>{item}</DropdownItem>
            ))}
        </>
    );
}
