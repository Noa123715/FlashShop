import express from "express";
import { getAboutPage, updateAboutPage } from "../controllers/pageController.js";

const router = express.Router();

router.get("/about", getAboutPage);
router.put("/about", updateAboutPage);

export default router;
