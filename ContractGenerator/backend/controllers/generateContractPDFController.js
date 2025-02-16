import FormulaireSural from "../models/FormulaireSural.js";
import FormContratLocation from "../models/FormContLocation.js";
import FormulaireSarl from "../models/FormulaireSarl.js";
import FormulaireResLoc from "../models/FormulaireResLoc.js";
import PVAGOSarl from "../models/PVAGOSarl.js";
import PVAGOSural from "../models/PVAGOSural.js";
import DeclarModifRNEPhysique from "../models/DeclarModifRNEPhysique.js";
import DeclarImmRNEPhysique from "../models/DeclarImmRNEPhysique.js";

import generateSuralContractPDF from "../contracts/suralContract.js";
import generateContratLocationPDF from "../contracts/LocationContract.js";
import generateSarlContractPDF from "../contracts/sarlContrat.js";
import generateContratResLocationPDF from "../contracts/ContratResLocation.js";
import generatePVAGOSarlContractPDF from "../contracts/PVAGOSarlContrat.js";
import generatePVAGOSuralContractPDF from "../contracts/PVAGOSuarlContrat.js";
import generateRNEPhyModifContratPDF from "../contracts/RNEPhyModifContrat.js";
import generateRNEPhyImmContratPDF from "../contracts/RNEPhyImmContart.js";
import generateRNESocieteModifContratPDF from "../contracts/RNESocieteModifContrat.js";

import PdfLink from "../models/PdfLink.js";
import DeclarModifRNESociete from "../models/DeclarModifRNESociete.js";

const savePdfLink = async (pdfLink) => {
  try {
    await PdfLink.create({ link: pdfLink });
    console.log("PDF link saved successfully:", pdfLink);
  } catch (error) {
    console.error("Error saving PDF link:", error);
    throw new Error("Error saving PDF link");
  }
};

export const generateContractSuralPDFController = async (req, res) => {
  try {
    const contractId = req.params.contract_id;
    const formData = await FormulaireSural.findById(contractId);

    if (!formData) {
      return res
        .status(404)
        .json({ success: false, message: "Contract not found." });
    }

    // Set response headers to indicate inline content
    res.setHeader("Content-Disposition", "inline; filename=contract.pdf");
    res.setHeader("Content-Type", "application/pdf");

    // Generate PDF content for Sural contract
    const pdfData = await generateSuralContractPDF(formData);
    const pdfLink = `http://localhost:8080/api/v1/forms/ContratSuralPDF/${formData._id}`;
    savePdfLink(pdfLink);

    // Send the PDF data in the response
    res.send(pdfData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const generateContractPVAGOSuralPDFController = async (req, res) => {
  try {
    const contractId = req.params.contract_id;
    const formData = await PVAGOSural.findById(contractId);

    if (!formData) {
      return res
        .status(404)
        .json({ success: false, message: "Contract not found." });
    }

    // Set response headers to indicate inline content
    res.setHeader("Content-Disposition", "inline; filename=contract.pdf");
    res.setHeader("Content-Type", "application/pdf");

    // Generate PDF content for Sural contract
    const pdfData = await generatePVAGOSuralContractPDF(formData);
    const pdfLink = `http://localhost:8080/api/v1/forms/ContratPVAGOSuralPDF/${formData._id}`;
    savePdfLink(pdfLink);

    // Send the PDF data in the response
    res.send(pdfData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const generateContratLocationPDFController = async (req, res) => {
  try {
    const contractId = req.params.contract_id;
    const formData = await FormContratLocation.findById(contractId);

    if (!formData) {
      return res
        .status(404)
        .json({ success: false, message: "Contract not found." });
    }

    // Set response headers to indicate inline content
    res.setHeader("Content-Disposition", "inline; filename=contract.pdf");
    res.setHeader("Content-Type", "application/pdf");

    // Generate PDF content for Sural contract
    const pdfData = await generateContratLocationPDF(formData);
    const pdfLink = `http://localhost:8080/api/v1/forms/ContratLocationPDF/${formData._id}`;
    savePdfLink(pdfLink);

    // Send the PDF data in the response
    res.send(pdfData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const generateSarlContractPDFController = async (req, res) => {
  try {
    const contractId = req.params.contract_id;
    const formData = await FormulaireSarl.findById(contractId);

    if (!formData) {
      return res
        .status(404)
        .json({ success: false, message: "Contract not found." });
    }

    // Set response headers to indicate inline content
    res.setHeader("Content-Disposition", "inline; filename=contract.pdf");
    res.setHeader("Content-Type", "application/pdf");

    // Generate PDF content for Sural contract
    const pdfData = await generateSarlContractPDF(formData);
    const pdfLink = `http://localhost:8080/api/v1/forms/ContratSarlPDF/${formData._id}`;
    savePdfLink(pdfLink);

    // Send the PDF data in the response
    res.send(pdfData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//PVAGOSarl contrat
export const generatePVAGOSarlContractPDFController = async (req, res) => {
  try {
    const contractId = req.params.contract_id;
    const formData = await PVAGOSarl.findById(contractId);

    if (!formData) {
      return res
        .status(404)
        .json({ success: false, message: "Contract not found." });
    }

    // Set response headers to indicate inline content
    res.setHeader("Content-Disposition", "inline; filename=contract.pdf");
    res.setHeader("Content-Type", "application/pdf");

    // Generate PDF content for Sarl contract
    const pdfData = await generatePVAGOSarlContractPDF(formData);
    const pdfLink = `http://localhost:8080/api/v1/forms/ContratPVAGOSarlPDF/${formData._id}`;
    savePdfLink(pdfLink);

    // Send the PDF data in the response
    res.send(pdfData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const generateContratResLocationPDFController = async (req, res) => {
  try {
    const contractId = req.params.contract_id;
    const formData = await FormulaireResLoc.findById(contractId);

    if (!formData) {
      return res
        .status(404)
        .json({ success: false, message: "Contract not found." });
    }

    // Set response headers to indicate inline content
    res.setHeader("Content-Disposition", "inline; filename=contract.pdf");
    res.setHeader("Content-Type", "application/pdf");

    // Generate PDF content for Sural contract
    const pdfData = await generateContratResLocationPDF(formData);
    const pdfLink = `http://localhost:8080/api/v1/forms/ContratResLocationPDF/${formData._id}`;
    savePdfLink(pdfLink);

    // Send the PDF data in the response
    res.send(pdfData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//Rne physique modification
export const generateRNEPhyModifContractPDFController = async (req, res) => {
  try {
    const contractId = req.params.contract_id;
    const formData = await DeclarModifRNEPhysique.findById(contractId);

    if (!formData) {
      return res
        .status(404)
        .json({ success: false, message: "Contract not found." });
    }

    // Set response headers to indicate inline content
    res.setHeader("Content-Disposition", "inline; filename=contract.pdf");
    res.setHeader("Content-Type", "application/pdf");

    // Generate PDF content for Sural contract
    const pdfData = await generateRNEPhyModifContratPDF(formData);
    const pdfLink = `http://localhost:8080/api/v1/forms/RNEPhyModifContratPDF/${formData._id}`;
    savePdfLink(pdfLink);

    // Send the PDF data in the response
    res.send(pdfData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//Rne Societe modification
export const generateRNESocieteModifContractPDFController = async (
  req,
  res
) => {
  try {
    const contractId = req.params.contract_id;
    const formData = await DeclarModifRNESociete.findById(contractId);

    if (!formData) {
      return res
        .status(404)
        .json({ success: false, message: "Contract not found." });
    }

    // Set response headers to indicate inline content
    res.setHeader("Content-Disposition", "inline; filename=contract.pdf");
    res.setHeader("Content-Type", "application/pdf");

    // Generate PDF content for Sural contract
    const pdfData = await generateRNESocieteModifContratPDF(formData);
    const pdfLink = `http://localhost:8080/api/v1/forms/RNESocieteModifContratPDF/${formData._id}`;
    savePdfLink(pdfLink);

    // Send the PDF data in the response
    res.send(pdfData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//Rne physique Imm
export const generateRNEPhyImmContractPDFController = async (req, res) => {
  try {
    const contractId = req.params.contract_id;
    const formData = await DeclarImmRNEPhysique.findById(contractId);

    if (!formData) {
      return res
        .status(404)
        .json({ success: false, message: "Contract not found." });
    }

    // Set response headers to indicate inline content
    res.setHeader("Content-Disposition", "inline; filename=contract.pdf");
    res.setHeader("Content-Type", "application/pdf");

    // Generate PDF content for Sural contract
    const pdfData = await generateRNEPhyImmContratPDF(formData);
    const pdfLink = `http://localhost:8080/api/v1/forms/RNEPhyImmContratPDF/${formData._id}`;
    savePdfLink(pdfLink);

    // Send the PDF data in the response
    res.send(pdfData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getLinks = async (req, res) => {
  try {
    const links = await PdfLink.find({ isTrashed: false }).sort({ _id: -1 });

    const linksWithNames = links.map((link) => {
      let contractName = link.contractName || "";
      if (!contractName) {
        if (link.link.includes("ContratSuralPDF")) {
          contractName = "Sural Contract";
        } else if (link.link.includes("ContratLocationPDF")) {
          contractName = "Location Contract";
        } else if (link.link.includes("ContratSarlPDF")) {
          contractName = "Sarl Contract";
        } else if (link.link.includes("ContratResLocationPDF")) {
          contractName = "Resiliation Location Contract";
        } else if (link.link.includes("ContratPVAGOSarlPDF")) {
          contractName = "PVAGO Sarl Contract";
        } else if (link.link.includes("ContratPVAGOSuralPDF")) {
          contractName = "PVAGO Sural Contract";
        } else if (link.link.includes("RNEPhyModifContratPDF")) {
          contractName = "RNE Physical Modification Contract";
        } else if (link.link.includes("RNEPhyImmContratPDF")) {
          contractName = "RNE Physical Imm Contract";
        } else {
          contractName = link.link.split("/").pop();
        }
      }
      return { ...link._doc, contractName };
    });

    res.status(200).json({
      status: true,
      links: linksWithNames,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getLinksTrashed = async (req, res) => {
  try {
    const links = await PdfLink.find({ isTrashed: true }).sort({ _id: -1 });
    res.status(200).json({
      status: true,
      links,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getLink = async (req, res) => {
  try {
    const { id } = req.params;
    const link = await PdfLink.findById(id);

    if (!link) {
      return res
        .status(404)
        .json({ status: false, message: "Link not found." });
    }

    res.status(200).json({
      status: true,
      link,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const trashLink = async (req, res) => {
  try {
    const { id } = req.params;

    const link = await PdfLink.findById(id);

    link.isTrashed = true;

    await link.save();

    res.status(200).json({
      status: true,
      message: `Link trashed successfully.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};
export const verifyLink = async (req, res) => {
  try {
    const { id } = req.params;
    const pdfLink = await PdfLink.findById(id);

    if (pdfLink) {
      pdfLink.isVerified = !pdfLink.isVerified;
      await pdfLink.save();
      res.status(200).json({
        status: true,
        message: `PDF link has been ${
          pdfLink.isVerified ? "verified" : "unverified"
        }`,
      });
    } else {
      res.status(404).json({ status: false, message: "PDF link not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const deleteRestoreLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { actionType } = req.query;

    if (actionType === "delete") {
      await PdfLink.findByIdAndDelete(id);
    } else if (actionType === "deleteAll") {
      await PdfLink.deleteMany({ isTrashed: true });
    } else if (actionType === "restore") {
      const resp = await PdfLink.findById(id);

      resp.isTrashed = false;
      await resp.save();
    } else if (actionType === "restoreAll") {
      await PdfLink.updateMany(
        { isTrashed: true },
        { $set: { isTrashed: false } }
      );
    }

    res.status(200).json({
      status: true,
      message: `Operation performed successfully.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};
