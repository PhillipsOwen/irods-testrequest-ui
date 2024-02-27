import React, {useEffect, useState} from "react";
import {Input, InputGroupText, InputGroup} from "reactstrap";

const baseURL = 'http://localhost:4000/';
//const baseURL = 'https://irods-settings-dev.apps.renci.org/'

export default function GetTestRunStatusData({request_group}) {
    /**
     * function to get data from a web service and return
     * the formatted status of the test request
     */

    // store the items in state
    const [item, setItem] = useState([])
    const [isLoading, setIsLoading] = useState(false); // initial value is false to avoid component in loading state if the first call fails
    const refreshTime = 5000 //	refresh the data rate in ms

    // define the web service endpoint
    let URL = baseURL + 'get_run_status/?request_group=' + request_group;

    const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiZWFyZXJfbmFtZSI6InNldHRpbmdzLWRldiIsImJlYXJlcl9zZWNyZXQiOiI2NTU0N2U0NDg2Y2I1ZTg0NzkzMWZjMjAwYTQ5MjM5OTA3ZmZhMTRhNDY4ZTM2MzMifQ.eBsy9qwrj8Axs9b_WV1cY8k_dHDMsc5vvhoIfqTZ1v0';

    // push up the data
    const requestOptions = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const fetchTestRunStatusData = async () => {
        setIsLoading(true);

        setItem([]);

        const data = fetch(URL, requestOptions)
            .then(ddd => ddd.json())
            .then(data => {
                console.log("data -> request group:" + request_group + " URL: " + URL + " data:" + item);
                // check for issues in the one and only record
                if (!(data[0].startsWith('Error', 0) || data[0].startsWith('Warning', 0))) {
                    // save the data
                    setItem(data[0]);
            }
        });

        setIsLoading(false);
    }

    // // get the data
    useEffect(() => {
        // no need to call for data if there is no request group
//        if (request_group !== "") {
            console.log("effect -> request group:" + request_group + " URL: " + URL + " data:" + item);

            // This will refresh the data at regularIntervals of refreshTime
            const comInterval = setInterval(fetchTestRunStatusData, refreshTime);

            // This will refresh the data at regularIntervals of refreshTime
            return () => clearInterval(comInterval)
//        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    if (isLoading === false) {
        // return the rendered content
        return (
	        <InputGroup>
	            <InputGroupText>
	                Test request progress ("{request_group}")
	            </InputGroupText>

	            <Input type="textarea" defaultValue={item[0]} rows="5" />
	        </InputGroup>
        );
    }
}