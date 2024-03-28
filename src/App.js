// Copyright (c) 2024, The University of North Carolina at Chapel Hill All rights reserved.
//
// SPDX-License-Identifier: BSD 3-Clause

import './App.css';

import TestRequestForm from './components/TestRequestForm.jsx'
import PageHeader from "./components/PageHeader.jsx";
import {Route, Routes} from "react-router-dom";
import WatchStatus from "./components/WatchStatus.jsx";
import About from "./components/About.jsx";
import PageFooter from "./components/PageFooter";

const App = () => {
    return (
        <div className='App'>
            <PageHeader/>
                <Routes>
                    <Route path="/" element={<TestRequestForm/>}/>
                    <Route path="/WatchStatus" element={<WatchStatus/>}/>
                    <Route path="/About" element={<About/>}/>
                </Routes>
            <PageFooter/>
        </div>
    );
}

export default App;
