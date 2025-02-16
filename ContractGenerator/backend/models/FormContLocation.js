import mongoose from "mongoose";

const contratLocationSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  adresse: { type: String, required: true },
  typePieceIdentite: {
    type: String,
    enum: ["CIN", "PASSEPORT", "CARTE DE SEJOUR", "CARTE CONSULAIRE"],
    required: true,
  },
  ID: { type: String, required: true },
  denomination: { type: String, required: true },
  representantLegal: { type: String, required: true },
  typeIdentiteRepresentant: {
    type: String,
    enum: ["CIN", "PASSEPORT", "CARTE DE SEJOUR", "CARTE CONSULAIRE"],
    required: true,
  },
  IDrepresentant: { type: String, required: true },
  adresseLocalLoue: { type: String, required: true },
  superficieLocal: { type: Number, required: true }, 
  activite: { type: String, required: true },
  dateDebutContrat: { type: String , required: true }, 
  dateFinContrat: { type: String, required: true }, 
  montantLoyerHT: { type: Number, required: true },
  montantTVA: { type: Number, required: true }, 
  montantLoyerTTC: { type: Number, required: true }, 
  modalitesPaiement: { type: String, required: true },
  lieu: { type: String, required: true },
  dateSignature: { type: String, required: true },
  signatureImage: { type: String },

});
const ContratLocation = mongoose.model(
  "ContratLocation",
  contratLocationSchema
);
export default ContratLocation;
