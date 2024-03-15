// Copyright (c) 2024, The University of North Carolina at Chapel Hill All rights reserved.
//
// SPDX-License-Identifier: BSD 3-Clause

import React, { useState } from 'react';

import {
    Button, Form, FormGroup, Input, Dropdown,
    DropdownMenu, DropdownToggle, Container,
    Row, Col, InputGroupText, InputGroup, Label
} from 'reactstrap';

import GetTestTypeData from '../data/GetDropDownData.jsx';
import GetTestNameData from "../data/GetTestNameData.jsx";

export default function TestRequestForm() {
    /**
     * this class renders the form to capture users' selection for a test request.
     */
    // the name of the test request group
    const [test_RequestName, set_test_RequestName] =  useState('');
     
    // the package directory name
    const [test_PackageDirectoryName, set_test_PackageDirectoryName] = useState('');

    // list of the test names
    const [test_ProviderNames, set_test_ProviderNames] = useState([]);
    const [test_ConsumerNames, set_test_ConsumerNames] = useState([]);
    const [test_ProviderChecked, set_testProviderChecked] = useState(false);
    const [test_ConsumerChecked, set_testConsumerChecked] = useState(false);

    // the type of test controllers
    const [test_TypeName, set_test_TypeName] = useState('');
    const [test_TypeOpen, set_test_TypeOpen] = useState(false);
    const [test_TypeNameSelected, set_test_TypeNameSelected] = useState('Select a test type');

    // the OS controllers
    const [os_ImageName, set_os_ImageName] = useState('');
    const [os_ImageOpen, set_os_ImageOpen] = useState(false);
    const [os_ImageNameSelected, set_os_ImageNameSelected] = useState('Select a OS');

    // the DBMS controllers
    const [dbms_ImageName, set_dbms_ImageName] = useState('');
    const [dbms_ImageOpen, set_dbms_ImageOpen] = useState(false);
    const [dbms_ImageNameSelected, set_dbms_ImageNameSelected] = useState('Select a DBMS');
    const [dbms_TypeName, set_dbms_TypeName] = useState('');

    // validation state values
    const [test_RequestNameState, set_test_RequestNameState] = useState('has-success');
    const [dbms_NameState, set_dbms_NameState] = useState('primary');
    const [os_NameState, set_os_NameState] = useState('primary');
    const [type_NameState, set_type_NameState] = useState('primary');
    const [test_ProviderNameState, set_test_ProviderNameState] = useState('has-success');
    const [test_ConsumerNameState, set_test_ConsumerNameState] = useState('has-success');

    // submission items
    const [enableDebugModeChecked, set_enableDebugModeChecked] = useState(false);
    const [submissionStatus, set_submissionStatus] = useState('');

    // init the form is valid flag
    let formIsValid = true;

    const change_testProviderChecked = (value) => {
        /**
         * sets the current state of the checkbox
         */
        set_testProviderChecked(value)
    }

    const change_testConsumerChecked = (value) => {
        /**
         * sets the current state of the checkbox
         */
        set_testConsumerChecked(value)
    }

    const change_enableDebugModeChecked = (value) => {
        /**
         * sets the current state of debug mode
         */
        set_enableDebugModeChecked(value);
    }

    const toggle_TestType = () => {
        /**
         * toggles the state of the test type name pulldown
         */

        // save the new state of the control
        set_test_TypeOpen(!test_TypeOpen);
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

    const change_TestTypeSelectValue = (value) => {
        /**
         * on change event handler for the test type name dropdown control
         */

        // update the test type name in the class state
        set_test_TypeName(value);

        // update the test type name selected in the class state
        set_test_TypeNameSelected(value);
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

    const change_ProviderTestsSelectValues = (e) => {
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
        set_test_ProviderNames(opts);
    }

    const change_ConsumerTestsSelectValues = (e) => {
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
        set_test_ConsumerNames(opts);
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

        // check the group name
        if (test_RequestName === '') {
            set_test_RequestNameState('has-danger');

            // set the error message
            submission_status += ' - A Request Name required.\n';

            // set the failure flag
            formIsValid &= false;
        } else {
            set_test_RequestNameState('has-success');
        }

        // check the test type name
        if (os_ImageNameSelected.toUpperCase() === 'Select a OS'.toUpperCase()) {
            set_os_NameState('danger');

            // set the error message
            submission_status += ' - An OS Image Name is required.\n';

            // set the failure flag
            formIsValid &= false;
        } else {
            set_os_NameState('primary');
        }

        // check the test type name
        if (dbms_ImageNameSelected.toUpperCase() === 'Select a DBMS'.toUpperCase()) {
            set_dbms_NameState('danger');

            // set the error message
            submission_status += ' - A DBMS Image Name is required.\n';

            // set the failure flag
            formIsValid &= false;
        } else {
            set_dbms_NameState('primary');
        }

        // check the test type name
        if (test_TypeNameSelected.toUpperCase() === 'Select a test type'.toUpperCase()) {
            set_type_NameState('danger');

            // set the error message
            submission_status += ' - A Test Type Name is required.\n';

            // set the failure flag
            formIsValid &= false;
        } else {
            set_type_NameState('primary');
        }

        // check the provider test names
        if (test_ProviderNames.length === 0 && test_ProviderChecked) {
            set_test_ProviderNameState('has-danger');

            // set the error message
            submission_status += ' - One or more Provider tests are required.\n';

            // set the failure flag
            formIsValid &= false;
        } else {
            set_test_ProviderNameState('has-success');
        }

        // check the consumer test names
        if (test_ConsumerNames.length === 0 && test_ConsumerChecked) {
            set_test_ConsumerNameState('has-danger');

            // set the error message
            submission_status += ' - One or more Consumer tests are required.\n';

            // set the failure flag
            formIsValid &= false;
        } else {
            set_test_ConsumerNameState('has-success');
        }

        // log the captured results to the console
        console.log(`FormIsValid: ${formIsValid}, Request: ${test_RequestName}, suite: ${test_TypeName}, provider tests: ${test_ProviderNames}, \
        consumer tests: ${test_ConsumerNames}, os: ${os_ImageName}, dbms: ${dbms_ImageName}, package dir: ${test_PackageDirectoryName}`);

        console.log(`RequestNameState: ${test_RequestNameState}, dbms_NameState: ${dbms_NameState}, os_NameState: ${os_NameState}, \
        type_NameState: ${type_NameState}, ConsumerNameState: ${test_ConsumerNameState}, ProviderNameState: ${test_ProviderNameState}`);

        // alert the user
        if (!formIsValid) {
            set_submissionStatus(submission_status);
        }
        else {
            set_submissionStatus('Submission sent.');
        }

        // return the validation result
        return formIsValid;
    }

    const buildTestRequest = () => {
        /**
         * creates a build request to submit to the DB
         */

        // build up the tests
        const tests = [];
        let run_mode = 'new';

        // if the provider is checked, then add the tests
        if (test_ProviderChecked) {
            tests.push({'PROVIDER': test_ProviderNames});
        }

        // if the consumer is checked, then add the tests
        if (test_ConsumerChecked) {
            tests.push({'CONSUMER': test_ConsumerNames});
        }

        // use the debug mode checkbox data on the submission
        if (enableDebugModeChecked) run_mode = 'debug';

        // force the json to be HTL compatible
        const newTests = JSON.stringify(tests);

        // return the request to the caller
        return process.env.REACT_APP_BASE_DATA_URL +
            `superv_workflow_request/${test_TypeName}/run_status/${run_mode}` +
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
            console.log('Validation succeeded.')

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
                .then(res => { return res.json(); })
                .then(data => { console.log(data); })
                .then(response => set_submissionStatus(`Submitted the "${test_RequestName}" request.`))
                .then(window.open(`${window.location.origin}/WatchStatus?request-name=${test_RequestName}`, '_blank'))
                .catch(err => set_submissionStatus(err))
                .catch(error => set_submissionStatus(error));
        }
    }

    const ShowSubmissionResults = () => {
    /**
     * displays the submission results
     */
        // return the control
        return (
            <>
                <Input type="textarea" disabled={true} defaultValue={submissionStatus} rows="8"></Input>
                <br/>
            </>
        )

    };

    return (
        <>
            <Container className='mt-3'>
                <Row>
                    <Form className="form" onSubmit={(e) => handleSubmit(e)}>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupText>
                                            Request name
                                        </InputGroupText>

                                        <Input type="text" name="test_RequestName" id="test_RequestName" value={test_RequestName}
                                               placeholder="Enter a request name"
                                               valid={test_RequestNameState === "has-success"}
                                               invalid={test_RequestNameState === "has-danger"}
                                               onChange={(e) => { handleTest_RequestNameChange(e) }}>
                                        </Input>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupText>
                                            Package directory name
                                        </InputGroupText>

                                        <Input type="text" name="test_PackageDirectoryName" id="test_PackageDirectoryName" value={test_PackageDirectoryName}
                                               placeholder="Enter a package directory name"
                                               onChange={(e) => { handleTest_PackageDirectoryNameChange(e) }}>
                                        </Input>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupText>
                                            Test type
                                        </InputGroupText>
                                        <Dropdown style={{width: "100px"}} isOpen={test_TypeOpen} toggle={toggle_TestType}>
                                            <DropdownToggle caret color={type_NameState}>{test_TypeNameSelected || 'null'}</DropdownToggle>
                                            <DropdownMenu container="body">
                                                <GetTestTypeData data_name={'get_test_type_names'} on_click={change_TestTypeSelectValue}/>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupText>
                                            Operating system
                                        </InputGroupText>
                                        <Dropdown style={{width: "100px"}} isOpen={os_ImageOpen} toggle={toggle_osType}>
                                            <DropdownToggle caret color={os_NameState}>{os_ImageNameSelected || 'null'}</DropdownToggle>
                                            <DropdownMenu container="body">
                                                <GetTestTypeData data_name={'get_os_image_names'} on_click={change_osTypeSelectValue}/>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupText>
                                            DBMS
                                        </InputGroupText>
                                        <Dropdown style={{width: "100px"}} isOpen={dbms_ImageOpen} toggle={toggle_dbmsType}>
                                            <DropdownToggle caret color={dbms_NameState}>{dbms_ImageNameSelected || 'null'}</DropdownToggle>
                                            <DropdownMenu container="body">
                                                <GetTestTypeData data_name={'get_dbms_image_names'} on_click={change_dbmsImageSelectValue}/>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupText>
                                            <Label check inline={"true"}>
                                                <Input
                                                    name="testProviderChk"
                                                    id="testProviderChk"
                                                    type="checkbox"
                                                    onChange={(e) => change_testProviderChecked(e.target.checked)} />
                                                &nbsp;Enable provider tests
                                            </Label>
                                        </InputGroupText>

                                        <Input type="select" name="testsProviderMulti" id="testsProviderMulti" multiple disabled={!test_ProviderChecked}
                                               onChange={change_ProviderTestsSelectValues}
                                               valid={test_ProviderNameState === "has-success"}
                                               invalid={test_ProviderNameState === "has-danger"}>

                                            <GetTestNameData />
                                        </Input>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupText>
                                            <Label check inline={"true"}>
                                                <Input
                                                    name="testConsumerChk"
                                                    id="testConsumerChk"
                                                    type="checkbox"
                                                    onChange={(e) => change_testConsumerChecked(e.target.checked)} />
                                                &nbsp;Enable consumer tests
                                            </Label>
                                        </InputGroupText>

                                        <Input type="select" name="testsConsumerMulti" id="testsConsumerMulti" multiple disabled={!test_ConsumerChecked}
                                               onChange={change_ConsumerTestsSelectValues}
                                               valid={test_ConsumerNameState === "has-success"}
                                               invalid={test_ConsumerNameState === "has-danger"}>
                                            <GetTestNameData />
                                        </Input>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col style={{align: "center"}}>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupText>
                                            <Label check inline={"true"}>
                                                <Input
                                                    name="enableDebugModeChk"
                                                    id="enableDebugModeChk"
                                                    type="checkbox"
                                                    onChange={(e) =>
                                                        change_enableDebugModeChecked(e.target.checked)} />
                                                &nbsp;Enable debug mode
                                            </Label>
                                        </InputGroupText>

                                        <Button style={{width: "100"}} color={"primary"}>Submit</Button>
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                        <Row>
                            <Col>
                                <InputGroupText>
                                    Submission results &nbsp;
                                    <ShowSubmissionResults/>
                                </InputGroupText>
                                <br/>
                            </Col>
                        </Row>
                        </Row>
                    </Form>
                </Row>
            </Container>
        </>
    );
}
