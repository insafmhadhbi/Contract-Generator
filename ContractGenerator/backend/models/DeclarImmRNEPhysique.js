import mongoose from "mongoose";

const declarImmRNEPhysiqueSchema = new mongoose.Schema({
  profession: {
    type: String,
    enum: ["Métier Libéral - مهنة حرة", "Artisan - حرفي", "Commerçant - تاجر"],
  },
  identifiantUnique: { type: String, required: true },
  numCertificatReservation: { type: String },
  nom: { type: String, required: true },
  prénom: { type: String, required: true },
  typePieceIdentite: {
    type: String,
    enum: [
      "CIN - بطاقة تعريف",
      "PASSEPORT - رقم جواز سفر",
      "CARTE DE SEJOUR - بطاقة إقامة",
      "CARTE CONSULAIRE - بطاقة قنصلية",
    ],
    required: true,
  },
  ID: { type: String, required: true },

  Email: { type: String },
  numGSM: { type: String, required: true },
  nomDéposant: { type: String, required: true },
  numIDdéposant: { type: String, required: true },
  date: { type: Date, required: true },
});

const DeclarImmRNEPhysique = mongoose.model(
  "DeclarImmRNEPhysique",
  declarImmRNEPhysiqueSchema
);

export default DeclarImmRNEPhysique;
