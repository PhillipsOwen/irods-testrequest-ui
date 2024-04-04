// Copyright (c) 2024, The University of North Carolina at Chapel Hill All rights reserved.
//
// SPDX-License-Identifier: BSD 3-Clause
// noinspection JSUnresolvedReference

import React, {useState} from 'react';

import {
    Container, Row, Col,
    Button, ButtonGroup,
    Dropdown, DropdownMenu, DropdownToggle,
    Form,
    Input, InputGroupText, InputGroup, Label
} from 'reactstrap';

import GetTestTypeData from '../data/GetDropDownData.jsx';
import GetTestNameData from "../data/GetTestNameData.jsx";

export default function TestRequestForm() {
    /**
     * this class renders the form to capture users' selection for a test request.
     */
        // the name of the test request group
    const [test_RequestName, set_test_RequestName] = useState('');

    // the package directory name
    const [test_PackageDirectoryName, set_test_PackageDirectoryName] = useState('');

    // the type of test controllers
    const [test_EnvironmentTypeName, set_EnvironmentTypeName] = useState(null);
    const [test_EnvironmentTypeOpen, set_test_EnvironmentTypeOpen] = useState(false);
    const [test_EnvironmentTypeSelected, set_test_EnvironmentTypeSelected] = useState('Select an environment type');

    // the OS controllers
    const [os_ImageName, set_os_ImageName] = useState(null);
    const [os_ImageOpen, set_os_ImageOpen] = useState(false);
    const [os_ImageNameSelected, set_os_ImageNameSelected] = useState('Select an operating system');

    // the DBMS controllers
    const [dbms_ImageName, set_dbms_ImageName] = useState(null);
    const [dbms_ImageOpen, set_dbms_ImageOpen] = useState(false);
    const [dbms_ImageNameSelected, set_dbms_ImageNameSelected] = useState('Select a database type');
    const [dbms_TypeName, set_dbms_TypeName] = useState('');

    // set the test location controllers
    const [test_ExecutorName, set_test_ExecutorName] = useState(null);

    // list of the test names
    const [test_Names, set_test_Names] = useState([]);

    // validation state values
    const [test_RequestNameState, set_test_RequestNameState] = useState('');
    const [environment_TypeState, set_environment_TypeState] = useState('success');
    const [dbms_NameState, set_dbms_NameState] = useState('success');
    const [os_NameState, set_os_NameState] = useState('success');
    const [test_ExecutorConsumerState, set_test_ExecutorConsumerState] = useState('secondary');
    const [test_ExecutorProviderState, set_test_ExecutorProviderState] = useState('secondary');
    const [test_NameState, set_test_NameState] = useState('has-success');

    // submission items
    const [enableDebugModeChecked, set_enableDebugModeChecked] = useState(false);
    const [submissionStatus, set_submissionStatus] = useState(null);

    // init the form is valid flag
    let formIsValid = true;

    const toggle_EnvironmentType = () => {
        /**
         * toggles the state of the test type name pulldown
         */

        // save the new state of the control
        set_test_EnvironmentTypeOpen(!test_EnvironmentTypeOpen);
    }

    const change_enableDebugModeChecked = (value) => {
        /**
         * sets the current state of debug mode
         */
        set_enableDebugModeChecked(value);
    }

    const toggle_TestNamesSelected = () => {
        /**
         * selects all or clears the selected test names
         */
        // select all the tests if there are none selected
        if (test_Names.length === 0) {
            // define a list for all the options
            let options = []

            // for each option
            for (let i = 0, len = document.getElementById("testsNamesMulti").length; i < len; i++) {
                // set the option selected
                document.getElementById("testsNamesMulti")[i].selected=true;

                // save the options
                options.push(document.getElementById("testsNamesMulti")[i].label)
            }

            // set the options in state
            set_test_Names(options);
        }
        // else clear all the selections
        else {
            // for each option
            for (let i = 0, len = document.getElementById("testsNamesMulti").length; i < len; i++) {
                // un-select it
                document.getElementById("testsNamesMulti")[i].selected=false;
            }

            // clear the state
            set_test_Names([]);
        }
    }
    const toggle_osType = () => {
        /**
         * toggles the state of the os type name pulldown
         */

        // save the new state of the control
        set_os_ImageOpen(!os_ImageOpen);
    }

    const toggle_dbmsType = () => {
        /**
         * toggles the state of the test type name pulldown
         */

        // save the new state of the control
        set_dbms_ImageOpen(!dbms_ImageOpen);
    }

    const change_environmentTypeSelectValue = (value) => {
        /**
         * on change event handler for the environment type name dropdown control
         */

        // update the test type name in the class state
        set_EnvironmentTypeName(value);

        // update the test type name selected in the class state
        set_test_EnvironmentTypeSelected(value);
    }

    const change_osTypeSelectValue = (value) => {
        /**
         * on change event handler for the OS type name dropdown control
         */

        // update the test type name in the class state
        set_os_ImageName(value);

        // update the test type name selected in the class state
        set_os_ImageNameSelected(value);
    }

    const change_dbmsImageSelectValue = (value) => {
        /**
         * on change event handler for the DBMS image name dropdown control
         */

        // update the test type name in the class state
        set_dbms_ImageName(value);

        // update the test type name selected in the class state
        set_dbms_ImageNameSelected(value);

        // set the DBMS type by the name
        set_dbms_TypeName(value.split(":")[0].toLowerCase());
    }

    const change_ExecutorSelection = (value) => {
        /**
         * sets the test executor selection
         */

        // save the change
        set_test_ExecutorName(value)

        // set the button color
        if (value === 'CONSUMER') {
            set_test_ExecutorConsumerState('success')
            set_test_ExecutorProviderState('secondary')
        }
        else {
            set_test_ExecutorProviderState('success')
            set_test_ExecutorConsumerState('secondary')
        }
    }

    const change_TestsSelectValues = (e) => {
        /**
         * on change event handler for the test name selection control
         */

        // init some variables for the capture selections
        let opts = [], opt;

        // for each item
        for (let i = 0, len = e.target.options.length; i < len; i++) {
            // capture the option object
            opt = e.target.options[i];

            // is the option selected?
            if (opt.selected)
                // save the option
                opts.push(opt.value);
        }

        // update the test names in the class state
        set_test_Names(opts);
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

    const handleTest_PackageDirectoryNameChange = (e) => {
        /**
         * event handler for the form controls
         */
        e.preventDefault();

        // save the event target
        const {target} = e;

        // save the event vale
        set_test_PackageDirectoryName(target.value);
    };

    const validateRequestForm = () => {
        /**
         * Validates the data entered by the user.
         */
            // init a validation status text
        let submission_status = 'There were issues with your submission:\n';

        // check the request group name
        if (test_RequestName === '') {
            set_test_RequestNameState('has-danger');

            // set the error message
            submission_status += ' - A request name is required.\n';

            // set the failure flag
            formIsValid &= false;
        } else {
            set_test_RequestNameState('has-success');
        }

        // check the environment type
        if (test_EnvironmentTypeSelected.toUpperCase() === 'Select an environment type'.toUpperCase()) {
            set_environment_TypeState('danger');

            // set the error message
            submission_status += ' - A test environment type is required.\n';

            // set the failure flag
            formIsValid &= false;
        } else {
            set_environment_TypeState('success');
        }

        // check the operating system type
        if (os_ImageNameSelected.toUpperCase() === 'Select an operating system'.toUpperCase()) {
            set_os_NameState('danger');

            // set the error message
            submission_status += ' - An operating system type is required.\n';

            // set the failure flag
            formIsValid &= false;
        } else {
            set_os_NameState('success');
        }

        // check the database type
        if (dbms_ImageNameSelected.toUpperCase() === 'Select a database type'.toUpperCase()) {
            set_dbms_NameState('danger');

            // set the error message
            submission_status += ' - A database type is required.\n';

            // set the failure flag
            formIsValid &= false;
        } else {
            set_dbms_NameState('success');
        }

        // check the test executor location
        if (test_ExecutorName === null) {
            set_test_ExecutorConsumerState('danger');
            set_test_ExecutorProviderState('danger');

            // set the error message
            submission_status += ' - A test executor is required.\n';

            // set the failure flag
            formIsValid &= false;
        } else if (test_ExecutorName === 'CONSUMER') {
            // tests cant be run on a consumer when the environment is "CORE"
            if (test_EnvironmentTypeSelected === 'CORE') {
                set_test_ExecutorConsumerState('danger');
                set_test_ExecutorProviderState('secondary');

                submission_status += ' - CORE test environments do not support CONSUMER test executors.\n';

                // set the failure flag
                formIsValid &= false;
            }
            else {
                set_test_ExecutorConsumerState('success');
                set_test_ExecutorProviderState('secondary');
            }
        }
        else if (test_ExecutorName === 'PROVIDER') {
            set_test_ExecutorProviderState('success');
            set_test_ExecutorConsumerState('secondary');
        }

        // check the provider test names
        if (test_Names.length === 0) {
            set_test_NameState('has-danger');

            // set the error message
            submission_status += ' - One or more tests are required.\n';

            // set the failure flag
            formIsValid &= false;
        } else {
            set_test_NameState('has-success');
        }

        // alert the user
        if (!formIsValid) {
            set_submissionStatus(submission_status);
        } else {
            set_submissionStatus('Submission sent.');
        }

        // return the validation result
        return formIsValid;
    }

    const buildTestRequest = () => {
        /**
         * creates a build request to submit to the DB
         */
        let run_mode = 'new';

        // build up the test request
        const tests = { [test_ExecutorName]: test_Names }

        // use the debug mode checkbox data on the submission
        if (enableDebugModeChecked) run_mode = 'debug';

        // force the json to be HTML compatible
        const newTests = JSON.stringify(tests);

        // return the request to the caller
        return process.env.REACT_APP_BASE_DATA_URL +
            `superv_workflow_request/${test_EnvironmentTypeName}/run_status/${run_mode}` +
            `?package_dir=${encodeURIComponent(test_PackageDirectoryName)}` +
            `&db_type=${dbms_TypeName}` +
            `&db_image=${encodeURIComponent(dbms_ImageName)}` +
            `&os_image=${encodeURIComponent(os_ImageName)}` +
            `&request_group=${test_RequestName}` +
            `&tests=${encodeURIComponent(newTests)}`;
    }

    const handleSubmit = (e) => {
        /**
         * handles the form submission.
         */
        e.preventDefault();

        // init the form is valid flag
        formIsValid = true;

        // validate the data in the controls
        if (validateRequestForm()) {
            // build the request
            const URL = buildTestRequest();

            // set the setting security token
            const dataSecurityToken = process.env.REACT_APP_SETTINGS_DATA_TOKEN;

            // push up the data
            const requestOptions = {
                method: 'PUT',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${dataSecurityToken}`
                }
            };

            // make the request
            fetch(URL, requestOptions)
                .then(res => {
                    // check for an error
                    if(!res.ok)
                        // throw the error, it will be caught below
                        throw new Error(res.status);
                    // else continue along
                    else return res.json();
                })
                .then(data => {
                    // set the result status
                    set_submissionStatus(`"${test_RequestName}" Submitted. Response:\n"${JSON.stringify(data, null, 2)}"`);

                    // if this was a successful submission
                    if (data.Success === 'Request successfully submitted.')
                        // redirect to the status page
                        window.open(`${window.location.origin}/WatchStatus?request-name=${test_RequestName}`, '_blank');
                })
                .catch((error) => {
                    // output the error to the console
                    console.log(error);
                    // set the submission status with the error
                    set_submissionStatus(error);}
                );
        }
    }

    const ShowSubmissionResults = () => {
        /**
         * displays the submission results
         */
        // return the control
        return (
            <>
                <Input className="textarea-border"
                       type="textarea"
                       disabled={true}
                       defaultValue={submissionStatus}
                       placeholder="Submit your request when ready"
                       rows="6"></Input>
                <br/>
            </>
        )

    };

    return (
        <div>
            <Container fluid>
                <Form className="form" onSubmit={(e) => handleSubmit(e)}>
                    <Row className={"pt-2 pb-1"}>
                        <Col>
                            <InputGroup>
                                <InputGroupText className={"input-group-text"}> Request name </InputGroupText>

                                <Input type="text" name="test_RequestName" id="test_RequestName" value={test_RequestName}
                                       placeholder="Enter a request name"
                                       valid={test_RequestNameState === "has-success"}
                                       invalid={test_RequestNameState === "has-danger"}
                                       onChange={(e) => {
                                           handleTest_RequestNameChange(e)
                                       }}>
                                </Input>
                            </InputGroup>
                        </Col>

                        <Col>
                            <InputGroup>
                                <InputGroupText className={"input-group-text"}> Test environment </InputGroupText>

                                <Dropdown isOpen={test_EnvironmentTypeOpen} toggle={toggle_EnvironmentType}>
                                    <DropdownToggle caret color={environment_TypeState}>{test_EnvironmentTypeSelected || 'null'}</DropdownToggle>
                                    <DropdownMenu container="body">
                                        <GetTestTypeData data_name={'get_environment_type_names'} on_click={change_environmentTypeSelectValue}/>
                                    </DropdownMenu>
                                </Dropdown>
                            </InputGroup>
                        </Col>
                    </Row>

                    <Row className={"pb-1"}>
                        <Col>
                            <InputGroup>
                                <InputGroupText className={"input-group-text"}> Package directory </InputGroupText>

                                <Input type="text" name="test_PackageDirectoryName" id="test_PackageDirectoryName"
                                       value={test_PackageDirectoryName}
                                       placeholder="Enter a package directory name"
                                       valid={true}
                                       onChange={(e) => {handleTest_PackageDirectoryNameChange(e)}}>
                                </Input>
                            </InputGroup>
                        </Col>

                        <Col>
                            <InputGroup>
                                <InputGroupText className={"input-group-text"}> Test executor type </InputGroupText>

                                <ButtonGroup>
                                    <Button color={test_ExecutorProviderState}
                                            active={test_ExecutorName === 'PROVIDER'}
                                            className="button-size"
                                            onClick={() => change_ExecutorSelection('PROVIDER')}>
                                        PROVIDER</Button>
                                    <Button className={"button-size"}
                                            color={test_ExecutorConsumerState}
                                            active={test_ExecutorName === 'CONSUMER'}
                                            onClick={() => change_ExecutorSelection('CONSUMER')}>
                                        CONSUMER</Button>
                                </ButtonGroup>
                            </InputGroup>
                        </Col>
                    </Row>

                    <Row className={"pb-1"}>
                        <Col>
                            <InputGroup>
                                <InputGroupText className={"input-group-text"}> Operating system </InputGroupText>

                                <Dropdown isOpen={os_ImageOpen} toggle={toggle_osType}>
                                    <DropdownToggle caret color={os_NameState}>{os_ImageNameSelected || 'null'}</DropdownToggle>

                                    <DropdownMenu container={"body"}>
                                        <GetTestTypeData data_name={'get_os_image_names'} on_click={change_osTypeSelectValue}/>
                                    </DropdownMenu>
                                </Dropdown>
                            </InputGroup>
                        </Col>

                        <Col>
                            <InputGroup>
                                <InputGroupText className={"input-group-text"}> Database type </InputGroupText>

                                <Dropdown isOpen={dbms_ImageOpen} toggle={toggle_dbmsType}>
                                    <DropdownToggle caret color={dbms_NameState}>{dbms_ImageNameSelected || 'null'}</DropdownToggle>

                                    <DropdownMenu container={"body"}>
                                        <GetTestTypeData data_name={'get_dbms_image_names'} on_click={change_dbmsImageSelectValue}/>
                                    </DropdownMenu>
                                </Dropdown>
                            </InputGroup>
                        </Col>
                    </Row>

                    <Row className={"pb-1"}>
                        <Col>
                            <InputGroup>
                                <InputGroupText className={"input_group_text"}>
                                    <Col>
                                        <Row className="pb-1 justify-content-center"> Tests </Row>
                                        <Row className="pt-4">
                                            <div style={{alignItems: "center"}}>
                                                <Button color={"success"} onClick={() => toggle_TestNamesSelected()}>Select All/Clear</Button>
                                            </div>
                                        </Row>
                                    </Col>
                                </InputGroupText>

                                <Input type="select" name="testsNamesMulti" id="testsNamesMulti" multiple
                                       onChange={change_TestsSelectValues}
                                       valid={test_NameState === "primary"}
                                       invalid={test_NameState === "has-danger"}
                                       size="15">

                                    <GetTestNameData/>
                                </Input>
                            </InputGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <InputGroup>
                                <InputGroupText className={"input-group-text"}>
                                    <Col>
                                        <Row>
                                            <div style={{alignItems: "center"}}>
                                                <Button color={"success"}>Submit request</Button>
                                            </div>
                                        </Row>

                                        <Row className="pt-4">
                                            <Label check inline={"true"}>
                                                <Input
                                                    name="enableDebugModeChk"
                                                    id="enableDebugModeChk"
                                                    type="checkbox"
                                                    onChange={(e) =>
                                                        change_enableDebugModeChecked(e.target.checked)}/>
                                                &nbsp;Debug mode
                                            </Label>
                                        </Row>
                                    </Col>
                                </InputGroupText>

                                <ShowSubmissionResults/>
                            </InputGroup>
                        </Col>
                    </Row>
                </Form>
                <br/>
            </Container>
        </div>
    );
}
