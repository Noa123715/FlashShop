import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './components/About.js'
import Terms from './components/Terms.js'
import LoginPage from './pages/LoginPage.js'
import SignUpPage from './pages/SignUpPage.js'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/about/*" element={<About />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes