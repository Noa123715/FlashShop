import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import Blog from "./components/Blog";
import TermsModal from "./components/Terms";
import LoginPage from "./pages/LoginPage";
import Tips from "./pages/Tips";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Login route - without Layout */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/forgot" element={<ForgotPasswordPage />} />
                {/* All other routes - with Layout */}
                <Route path="/" element={<Layout>  <HomePage /> </Layout>} />
                <Route path="/tips/*" element={<Layout><Blog /></Layout>} />
                <Route path="/terms" element={<Layout> <TermsModal /> </Layout>} />
                <Route path="/tips" element={<Layout> <Tips /> </Layout>} />

                {/* Redirect to home */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}