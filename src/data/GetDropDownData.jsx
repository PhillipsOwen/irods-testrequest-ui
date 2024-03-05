// SPDX-FileCopyrightText: 2024 Renaissance Computing Institute. All rights reserved.
//
// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-License-Identifier: LicenseRef-RENCI
// SPDX-License-Identifier: MIT

import React, {useEffect, useState} from "react";
import {DropdownItem} from "reactstrap";

//const baseURL = 'http://localhost:4000/';
const baseURL = 'https://irods-settings-dev.apps.renci.org/'

export default function GetPulldownData({data_name, on_click}) {
    /**
     * function to get data from a web service and return
     * the formatted items for a dropdown
     */

    // store the items in state
    const [items, setItems] = useState([])

    // define the web service endpoint
    let URL = baseURL + data_name;

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
