import express from "express";
import {
    getAboutPage,
    updateAboutPage,
    getHeaderPage,
    updateHeaderPage,
    getFooterPage,
    updateFooterPage,
    getTermsPage,
    updateTermsPage
} from "../controllers/pageController.js";

const router = express.Router();

// Headers Page Routes
router.get("/header", getHeaderPage);
router.put("/header", updateHeaderPage);

// About Page Routes
router.get("/about", getAboutPage);
router.put("/about", updateAboutPage);

// Terms Page Routes
router.get("/terms", getTermsPage);
router.put("/terms", updateTermsPage);

// Footer Page Routes
router.get("/footer", getFooterPage);
router.put("/footer", updateFooterPage);
export default router;
