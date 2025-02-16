import mongoose from "mongoose";

const declarImmRNESocieteSchema = new mongoose.Schema({
  identifiantUnique: { type: String, required: true },
  numCertificatReservation: { type: String },
  RIB: { type: String, required: true },
  Denomination: { type: String, required: true },
  representationLegal: { type: String, required: true },
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

const DeclarImmRNESociete = mongoose.model(
  "DeclarImmRNESociete",
  declarImmRNESocieteSchema
);

export default DeclarImmRNESociete;
