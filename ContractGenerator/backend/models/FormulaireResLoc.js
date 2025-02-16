import mongoose from "mongoose";

const formResLocSchema = new mongoose.Schema({
  // Définir la structure du formulaire
  gender: { type: String, required: true },
  nom: { type: String, required: true },
  prénom: { type: String, required: true },
  cin: { type: String, required: true },
  adresse: { type: String, required: true },
  nomSociété: { type: String, required: true },
  adresseSociété: { type: String, required: true },
  ID: { type: String, required: true },
  représentant: { type: String, required: true },
  représentantCIN: { type: String, required: true },
  creationDate: { type: String, required: true },
  recette: { type: String, required: true },
  dateEnregistrement: { type: String, required: true },
  numeroEnregistrement: { type: String, required: true },
  numQuitance: { type: String, required: true },
  dateRes: { type: String, required: true },
  dateDebut: { type: String, required: true },
  
  lieuSignature: { type: String, required: true },
  dateSignature: { type: String, required: true },
  signatureImage: { type: String },

});

const FormulaireResLoc = mongoose.model("FormulaireResLoc", formResLocSchema);

export default FormulaireResLoc;
