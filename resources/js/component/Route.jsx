import React from 'react';
import ReactDOM from 'react-dom/client';
import Googlelogin from "./Googlelogin";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Lighthouse from "./Lighthouse";
import Auth from './Auth';

function App() {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Googlelogin />} />
                    <Route path="/performanceScore" element={
                        <Auth>
                            <Lighthouse />
                        </Auth>
                    } />
                </Routes>
            </BrowserRouter>
    );
}


ReactDOM.createRoot(document.getElementById('app')).render(<App />);


