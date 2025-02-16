import mongoose from "mongoose";

const pvAGOSarlSchema = new mongoose.Schema({
  nomSociet: { type: String, required: true },
  capital: { type: String, required: true },
  nbParts: { type: String, required: true },
  adresse: { type: String, required: true },
  matriculeFiscale: { type: String, required: true },
  datePva: { type: Date, required: true },
  hour: { type: Number, required: true },
  minute: { type: Number, required: false },
  hourEnd: { type: Number, required: true },
  minuteEnd: { type: Number, required: false },
  dateClotureExercice: { type: Date, required: true },
  participants: [
    {
      genre: { type: String, required: true },
      type: { type: String, required: true },
      nom: { type: String, required: true },
      prenom: { type: String, required: true },
      parts: { type: Number, required: true },
      partEuro: { type: Number, required: true },
      partDinars: { type: Number, required: true },
    },
  ],
  But: { type: [Object], required: true, default: [{ content: "" }] },
  presidentAssemblee: [
    {
      presidentGenre: { type: String, required: true },
      presidentNom: { type: String, required: true },
      presidentPrenom: { type: String, required: true },
    },
  ],

  documentsSoumis: { type: String, required: true },
  premiereResolution: { type: String, required: true },
  deuxiemeResolution: { type: String, required: true },
  totalBilan: { type: Number, required: true },

  resultatBeneficiaire: { type: Number, required: true },
  troisiemeResolution: { type: String, required: true },
  nomGerant: { type: String, required: true },

  dividendesDinars: { type: Number, required: true },
  adresseAssemblee: { type: String, required: true },

  resultatExercice: { type: String, required: true },
  resultatExerciceDinars: { type: Number, required: true },
  soldeDisponibleDinars: { type: Number, required: true },
  dividendesBrutsDinars: { type: Number, required: true },
  retenueSourceDinars: { type: Number, required: true },
  dividendesNetDinars: { type: Number, required: true },
  // hourEnd: { type: Number, required: true },
  // minuteEnd: { type: Number, required: false },
});

const PVAGOSarl = mongoose.model("PVAGOSarl", pvAGOSarlSchema);

export default PVAGOSarl;
