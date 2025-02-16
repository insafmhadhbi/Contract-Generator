import mongoose from "mongoose";

const formulaireSuralSchema = new mongoose.Schema({
  // Définir la structure du formulaire
  titre: { type: String, required: true },
  capitalSocial: { type: String, required: true },
  siegeSocial: { type: String, required: true },
  denomination: { type: String, required: true },
  nomGerant: { type: String, required: true },
  Article1: [{ type: String, required: true }],
  Article2: [{ type: String, required: true }],
  persons: [
    {
      gender: { type: String, required: true },
      nom: { type: String, required: true },
      prénom: { type: String, required: true },
      adresse: { type: String, required: true },
      cin: { type: String, required: true },
      montantApport: { type: String, required: true },
      nombreParts: { type: String, required: true },
      valeurPart: { type: Number, required: true },
    },
  ],

  lieuSignature: { type: String, required: true },
  dateSignature: { type: String, required: true },
  signatureImage: { type: String },

});

const FormulaireSural = mongoose.model(
  "FormulaireSural",
  formulaireSuralSchema
);

export default FormulaireSural;
