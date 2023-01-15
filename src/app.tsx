import React from "react";
import {  Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { AuthProvider } from './hooks/AuthContext';

import Root from './views/Root/Root';
import Home from './views/Home/Home';

const App = () => {

    const location = useLocation();

    return ( 
        <AnimatePresence mode="wait">

            <AuthProvider>
                {/* <Header></Header> */}
                <Routes location={location} key={location.pathname}>

                    <Route path='/' element={<Root/>}></Route>
                    <Route path='home' element={<Home/>}></Route>
                    
                </Routes>
            </AuthProvider>

        </AnimatePresence>
    );
}

export default App;