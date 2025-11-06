import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './components/About.js'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<About />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes