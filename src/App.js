// SPDX-FileCopyrightText: 2024 Renaissance Computing Institute. All rights reserved.
//
// SPDX-License-Identifier: GPL-3.0-or-later
// SPDX-License-Identifier: LicenseRef-RENCI
// SPDX-License-Identifier: MIT

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
