import express from "express";
import {
  submitFormDeclarImmRNEPhysique,
  submitFormDeclarImmRNESocieteController,
  submitFormResLocController,
  submitFormSuralController,
  submitFormSarlController,
  submitForm_ModifRNEPhyController,
  submitForm_ModifRNESocieteController,
  submitFormLocationController,
  submitFormPVAGOSuralController,
  submitFormPVAGOSarlController,
} from "../controllers/FormController.js";
import {
  FetchFormDeclarImmRNEPhysique,
  FetchFormDeclarImmRNESocieteController,
  FetchFormResLocController,
  FetchFormSuralController,
  FetchFormSarlController,
  FetchFormContLocationController,
  FetchModifRNEPhysiqueController,
  FetchModifRNESocieteController,
  FetchFormPVAGOSuralController,
  FetchFormPVAGOSarlController,
} from "../controllers/FormController.js";

import {
  FetchSingleFormDeclarImmRNEPhysique,
  FetchSingleFormDeclarImmRNESocieteController,
  FetchSingleFormResLocController,
  FetchSingleFormSuralController,
  FetchSingleFormSarlController,
  FetchSingleFormContLocationController,
  FetchSingleModifRNEPhysiqueController,
  FetchSingleModifRNESocieteController,
  FetchSingleFormPVAGOSuralController,
  FetchSingleFormPVAGOSarlController,
} from "../controllers/FormController.js";

import {
  generateContractSuralPDFController,
  generateContratLocationPDFController,
  generateSarlContractPDFController,
  generatePVAGOSarlContractPDFController,
  generateContratResLocationPDFController,
  generateContractPVAGOSuralPDFController,
  generateRNEPhyModifContractPDFController,
  generateRNEPhyImmContractPDFController,
  generateRNESocieteModifContractPDFController,
} from "../controllers/generateContractPDFController.js";

const router = express.Router();

// Route pour soumettre les formulaires
router.post("/FormSural", submitFormSuralController);
router.post("/Form_DeclarImmRNEPhysique", submitFormDeclarImmRNEPhysique);
router.post("/FormPVAGOSural", submitFormPVAGOSuralController);
router.post("/FormPVAGOSarl", submitFormPVAGOSarlController);

router.post(
  "/Form_DeclarImmRNESociete",
  submitFormDeclarImmRNESocieteController
);

router.post("/FormResLoc", submitFormResLocController);

router.post("/FormSarl", submitFormSarlController);
router.post("/Form_DeclarModifRNEPhysique", submitForm_ModifRNEPhyController);
router.post(
  "/Form_DeclarModifRNESociete",
  submitForm_ModifRNESocieteController
);
router.post("/FormContratLocation", submitFormLocationController);

// Route pour soumettre le formulaire Contrat
router.get("/ContratSuralPDF/:contract_id", generateContractSuralPDFController);

// Route pour soumettre le contrat RNEPhyModifContrat
router.get(
  "/RNEPhyModifContratPDF/:contract_id",
  generateRNEPhyModifContractPDFController
);

router.get(
  "/RNESocieteModifContratPDF/:contract_id",
  generateRNESocieteModifContractPDFController
);

router.get(
  "/RNEPhyImmContratPDF/:contract_id",
  generateRNEPhyImmContractPDFController
);

router.get(
  "/ContratLocationPDF/:contract_id",
  generateContratLocationPDFController
);

router.get(
  "/ContratPVAGOSarlPDF/:contract_id",
  generatePVAGOSarlContractPDFController
);

router.get(
  "/ContratPVAGOSuarlPDF/:contract_id",
  generateContractPVAGOSuralPDFController
);

router.get("/ContratSarlPDF/:contract_id", generateSarlContractPDFController);
router.get(
  "/ContratResLocationPDF/:contract_id",
  generateContratResLocationPDFController
);
router.get(
  "/Single-Form_DeclarImmRNEPhysique/:id",
  FetchSingleFormDeclarImmRNEPhysique
);
router.get("/Single-FormPVAGOSural/:id", FetchSingleFormPVAGOSuralController);
router.get("/Single-FormPVAGOSarl/:id", FetchSingleFormPVAGOSarlController);
router.get(
  "/Single-Form_DeclarModifRNESociete/:id",
  FetchSingleFormDeclarImmRNESocieteController
);
router.get("/Single-FormSural/:id", FetchSingleFormSuralController);
router.get("/Single-FormResLoc/:id", FetchSingleFormResLocController);
router.get("/Single-FormSarl/:id", FetchSingleFormSarlController);
router.get(
  "/Single-FormContratLocation/:id",
  FetchSingleFormContLocationController
);
router.get(
  "/Single-Form_DeclarModifRNEPhysique/:id",
  FetchSingleModifRNEPhysiqueController
);
router.get(
  "/Single-Form_DeclarModifRNESociete/:id",
  FetchSingleModifRNESocieteController
);

export default router;
