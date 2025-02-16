import FormulaireSural from "../models/FormulaireSural.js";
import FormulaireSarl from "../models/FormulaireSarl.js";
import FormContLocation from "../models/FormContLocation.js";
import DeclarModifRNEPhysique from "../models/DeclarModifRNEPhysique.js";
import DeclarModifRNESociete from "../models/DeclarModifRNESociete.js";
import FormulaireResLoc from "../models/FormulaireResLoc.js";
import DeclarImmRNESociete from "../models/DeclarImmRNESociete.js";
import DeclarImmRNEPhysique from "../models/DeclarImmRNEPhysique.js";
import PVAGOSural from "../models/PVAGOSural.js";
import PVAGOSarl from "../models/PVAGOSarl.js";

const submitForm = async (req, res, Model, successMessage) => {
  try {
    const formData = req.body;

    if (!formData) {
      return res.status(400).json({ message: "Form data is required" });
    }
    const newForm = new Model(formData);
    await newForm.save();
    res.status(201).json({
      success: true,
      message: successMessage,
      form: newForm,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};
export const submitFormPVAGOSarlController = async (req, res) => {
  await submitForm(req, res, PVAGOSarl, "form saved successfully");
};

export const submitFormPVAGOSuralController = async (req, res) => {
  await submitForm(req, res, PVAGOSural, "form saved successfully");
};

export const submitFormDeclarImmRNEPhysique = async (req, res) => {
  await submitForm(req, res, DeclarImmRNEPhysique, "form saved successfully");
};
export const submitFormDeclarImmRNESocieteController = async (req, res) => {
  await submitForm(req, res, DeclarImmRNESociete, "form saved successfully");
};
export const submitFormResLocController = async (req, res) => {
  await submitForm(req, res, FormulaireResLoc, "form saved successfully");
};

export const submitFormSuralController = async (req, res) => {
  await submitForm(req, res, FormulaireSural, "Sural form saved successfully");
};

export const submitFormSarlController = async (req, res) => {
  await submitForm(req, res, FormulaireSarl, "Sarl form saved successfully");
};
export const submitFormLocationController = async (req, res) => {
  await submitForm(req, res, FormContLocation, "form saved successfully");
};
export const submitForm_ModifRNEPhyController = async (req, res) => {
  await submitForm(
    req,
    res,
    DeclarModifRNEPhysique,
    "RNE form saved successfully"
  );
};

export const submitForm_ModifRNESocieteController = async (req, res) => {
  await submitForm(
    req,
    res,
    DeclarModifRNESociete,
    "RNE form saved successfully"
  );
};

const FetchForm = async (req, res, Model, successMessage) => {
  try {
    const forms = await Model.find();
    res
      .status(200)
      .json({ success: true, message: successMessage, data: forms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const FetchFormPVAGOSarlController = async (req, res) => {
  await FetchForm(req, res, PVAGOSarl, "Fetch saved successfully");
};
export const FetchFormPVAGOSuralController = async (req, res) => {
  await FetchForm(req, res, PVAGOSural, "Fetch saved successfully");
};

export const FetchFormDeclarImmRNEPhysique = async (req, res) => {
  await FetchForm(req, res, DeclarImmRNEPhysique, "Fetch saved successfully");
};
export const FetchFormDeclarImmRNESocieteController = async (req, res) => {
  await FetchForm(req, res, DeclarImmRNESociete, "Fetch saved successfully");
};
export const FetchFormResLocController = async (req, res) => {
  await FetchForm(req, res, FormulaireResLoc, "Fetch form saved successfully");
};

export const FetchFormSuralController = async (req, res) => {
  await FetchForm(req, res, FormulaireSural, "Fetch form successfully");
};

export const FetchFormSarlController = async (req, res) => {
  await FetchForm(req, res, FormulaireSarl, "Fetch form successfully");
};

export const FetchFormContLocationController = async (req, res) => {
  await FetchForm(req, res, FormContLocation, "Fetch form successfully");
};

export const FetchModifRNEPhysiqueController = async (req, res) => {
  await FetchForm(req, res, DeclarModifRNEPhysique, "Fetch form successfully");
};

export const FetchModifRNESocieteController = async (req, res) => {
  await FetchForm(req, res, DeclarModifRNESociete, "Fetch form successfully");
};

const fetchSingleForm = async (req, res, Model, successMessage) => {
  try {
    const { id } = req.params;
    const form = await Model.findById(id);
    if (!form) {
      return res
        .status(404)
        .json({ success: false, message: "Form not found" });
    }
    res
      .status(200)
      .json({ success: true, message: successMessage, data: form });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const FetchSingleFormPVAGOSarlController = async (req, res) => {
  await fetchSingleForm(req, res, PVAGOSarl, "Fetch saved successfully");
};

export const FetchSingleFormPVAGOSuralController = async (req, res) => {
  await fetchSingleForm(req, res, PVAGOSural, "Fetch form successfully");
};

export const FetchSingleFormDeclarImmRNEPhysique = async (req, res) => {
  await fetchSingleForm(
    req,
    res,
    DeclarImmRNEPhysique,
    "Fetch form successfully"
  );
};
export const FetchSingleFormDeclarImmRNESocieteController = async (
  req,
  res
) => {
  await fetchSingleForm(
    req,
    res,
    DeclarImmRNESociete,
    "Fetch form successfully"
  );
};
export const FetchSingleFormResLocController = async (req, res) => {
  await fetchSingleForm(req, res, FormulaireResLoc, "Fetch form successfully");
};

export const FetchSingleFormSuralController = async (req, res) => {
  await fetchSingleForm(req, res, FormulaireSural, "Fetch form successfully");
};

export const FetchSingleFormSarlController = async (req, res) => {
  await fetchSingleForm(req, res, FormulaireSarl, "Fetch form successfully");
};

export const FetchSingleFormContLocationController = async (req, res) => {
  await fetchSingleForm(req, res, FormContLocation, "Fetch form successfully");
};

export const FetchSingleModifRNEPhysiqueController = async (req, res) => {
  await fetchSingleForm(
    req,
    res,
    DeclarModifRNEPhysique,
    "Fetch form successfully"
  );
};

export const FetchSingleModifRNESocieteController = async (req, res) => {
  await fetchSingleForm(
    req,
    res,
    DeclarModifRNESociete,
    "Fetch form successfully"
  );
};
