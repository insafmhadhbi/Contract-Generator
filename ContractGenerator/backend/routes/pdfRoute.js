// /src/routes/pdfRoute.js
import express from "express";
import { uploadPDF, extractData } from "../controllers/PDFController.js";

const router = express.Router();

router.post("/uploadPDF", uploadPDF);
router.post("/extractData", extractData);

export default router;