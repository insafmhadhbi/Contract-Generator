import express from "express";
import {
  getLinks,
  getLink,
  trashLink,
  deleteRestoreLink,
  getLinksTrashed,
  verifyLink, // Consolidated import
} from "../controllers/generateContractPDFController.js";
import { isAdminRoute } from "../middlewares/authmiddleware.js";

const router = express.Router();

// Routes for link operations
router.get("/links", getLinks);
router.get("/links/trashed", getLinksTrashed); // Route for fetching trashed links
router.get("/links/:id", getLink);
router.put("/links/trash/:id", trashLink);
router.put("/links/delete-restore/:id", deleteRestoreLink); // Removed optional parameter
router.patch("/verify-link/:id", verifyLink);
export default router;
