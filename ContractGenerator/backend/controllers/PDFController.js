import multer from "multer";
import PdfLink from "../models/PdfLink.js";
import { extractFormData } from "../service/PDFService.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).single("file");

export const uploadPDF = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "File upload failed" });
    }
    try {
      const pdfLink = `http://localhost:8080/uploads/${req.file.filename}`;
      const filePath = req.file.path;
      const formData = await extractFormData(filePath);
      const contractName = req.file.originalname;

      const newLink = await PdfLink.create({
        link: pdfLink,
        formData,
        contractName,
      });
      return res.status(200).json({
        success: true,
        message: "PDF uploaded successfully",
        link: newLink,
      });
    } catch (error) {
      console.error("Error saving PDF link:", error);
      return res
        .status(500)
        .json({ success: false, message: "Error saving PDF link" });
    }
  });
};

export const extractData = async (req, res) => {
  try {
    const { filePath } = req.body;
    const formData = await extractFormData(filePath);
    res.json({ success: true, formData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
