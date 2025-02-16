import mongoose from "mongoose";

const declarModifRNEPhysiqueSchema = new mongoose.Schema({
  identifiantUnique: { type: String, required: true },
  certificatReservation: { type: String },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  numeroIdentiteDeclarant: { type: String, required: true },

  email: { type: String, required: true },
  numGsm: { type: String, required: true },

  nomDeclarant: { type: String, required: true },
  prenomDeclarant: { type: String, required: true },
  IDdeclarant: { type: String, required: true },

  typeModification: {
    type: String,
    enum: [
      "إضافة أو تغيير الإسم التجاري أو الشارة",
      "غلق فرع",
      "التشطيب على شخص طبيعي توقف نهائيا عن النشاط",
      "التصريح بالإبقاء المؤقت على التسجيل عند الوفاة أو تجديده",
      "التصريح بالإبقاء إثر التوقف الكلي عن النشاط أو تجديده",
      "تغيير عنوان المقر أو الفرع",
      "تغيير الحالة المدنية",
      "التوقف الجزئي عن النشاط",
      "تغيير أو إضافة نشاط بالأصل أو الفرع",
      "إ يداع عقود و وثائق",
      "إستئناف النشاط",
      "إضافة فرع",
      "إيداع القوائم المالية",
      "أخرى",
    ],
    required: true,
  },
  autreModification: { type: String },
  date: { type: Date, required: true },
});

const DeclarModifRNEPhysique = mongoose.model(
  "DeclarModifRNEPhysique",
  declarModifRNEPhysiqueSchema
);

export default DeclarModifRNEPhysique;
