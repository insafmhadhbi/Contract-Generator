

import mongoose from "mongoose";

const pvAGOSuralSchema = new mongoose.Schema({
  nomSociet: { type: String, required: true },
  capital: { type: String, required: true },
  adresse: { type: String, required: true },
  MF: { type: String, required: true },
  datePva: { type: Date, required: true },
  hour: { type: Number, required: true },
  minute: { type: Number, required: false },
  hourEnd: { type: Number, required: true },
  minuteEnd: { type: Number, required: false },
  genre: { type: String, required: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  parts: { type: Number, required: true },
  ordreDuJour: [{ type: String, required: true }],
  documentsSoumis: [{ type: String, required: true }],
  premiereResolution: { type: String, required: true },
  deuxiemeResolution: { type: String, required: true },
  troisiemeResolution: { type: String, required: true },
  dateReporte: { type: Date, required: true },
  montantDnt1: { type: Number, required: true },
  beneficeExercice: { type: Number, required: true },
  montantDnt2: { type: Number, required: true },

  montantDnt3: { type: Number, required: true },
  montantEuro3: { type: Number, required: true },

  montantDnt4: { type: Number, required: true },
  montantEuro4: { type: Number, required: true },
  resolutions: [
    {
      numero: { type: Number, required: true },
      description: { type: String, required: true },
      adoptee: { type: Boolean, required: true },
    },
  ],
});

const PVAGOSural = mongoose.model("PVAGOSural", pvAGOSuralSchema);

export default PVAGOSural;
