import GetTestRunStatusData from "../data/GetTestRunStatusData.jsx";
import {Button, Container, Form, Input, InputGroup, InputGroupText, Row} from "reactstrap";
import { useState } from 'react';

function WatchStatus() {
    const [request_name, set_RequestName] = useState('')

    const handleChange = (e) => {
        /**
         * event handler for the form controls
         */
        e.preventDefault();

        // save the event target
        const {target} = e;

        // save the event vale
        set_RequestName(target.value);
    };

    const handleSubmit = (e) => {
        /**
         * handles the form submission.
         */
        e.preventDefault();
    }

    return (
        <>
            <Container className='mt-3'>
                <Form className="form" onSubmit={(e) => handleSubmit(e)}>
                    <Row>
                        <InputGroup>
                            <InputGroupText>
                                Enter the test name &nbsp;
                                <Input type="text" name="test_RequestName" id="test_RequestName" value={request_name}
                                       placeholder="Enter a request name"
                                       onChange={(e) => { handleChange(e) }}>
                                </Input>
                            </InputGroupText>

                            <Button style={{width: "100"}} color={"primary"}>Start</Button>
                        </InputGroup>
                    </Row>
                    <br/>
                    <Row>
                        <GetTestRunStatusData request_group={request_name}/>
                    </Row>
                </Form>
            </Container>
        </>
    );
}

export default WatchStatus;
