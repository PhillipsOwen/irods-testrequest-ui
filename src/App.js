// Copyright (c) 2024, The University of North Carolina at Chapel Hill All rights reserved.
//
// SPDX-License-Identifier: BSD 3-Clause License

import './App.css';

import TestRequestForm from './components/TestRequestForm.jsx'
import PageHeader from "./components/PageHeader.jsx";
import {Route, Routes} from "react-router-dom";
import WatchStatus from "./components/WatchStatus";

const App = () => {
    return (
        <>
            <div className='App'>
                <PageHeader/>

                <Routes>
                    <Route path="/" element={<TestRequestForm/>}/>
                    <Route path="/WatchStatus" element={<WatchStatus/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;
