import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./components/About";
import TermsModal from "./components/Terms";
import LoginPage from "./pages/LoginPage";

export default function AppRoutes() {
    return (
        // <Router>
        //     <Routes>
        //         {/* Login route - without Layout */}
        //         <Route path="/" element={<LoginPage />} />

        //         {/* All other routes - with Layout */}
        //         <Route path="/home" element={<Layout>  <HomePage /> </Layout>} />
        //         <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        //         <Route path="/terms" element={<Layout> <TermsModal /> </Layout>} />

        //         {/* Redirect to home */}
        //         <Route path="*" element={<Navigate to="/" />} />
        //     </Routes>
        // </Router>

        <Router>
            <Routes>
                {/* Login route - without Layout */}
                <Route path="/" element={<LoginPage />} />

                {/* All other routes - with Layout */}
                <Route path="/home" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/terms" element={<TermsModal />} />

                {/* Redirect to home */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}