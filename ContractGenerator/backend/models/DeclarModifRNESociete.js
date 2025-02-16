import mongoose from "mongoose";

const DeclarModifRNESocieteSchema = new mongoose.Schema({
  identifiantUnique: { type: String, required: true },
  certificatReservation: { type: String },
  rib: { type: String },
  numeroIdentite: { type: String, required: true },
  representantLegalNom: { type: String, required: true },
  representantLegalPrénom: { type: String, required: true },
  email: { type: String },
  numeroGSM: { type: String },
  nomDeclarant: { type: String, required: true },
  prenomDeclarant: { type: String, required: true },
  numeroIdentiteDeclarant: { type: String, required: true },
  typeModification: {
    type: String,
    enum: [
      "تغيير التسمية الإجتماعية أو الإسم التجاري أو الشارة",
      "إيداع المستفيد الحقيقي",
      "تغيير عنوان المقر الإجتماعي",
      "إيداع تقرير التصرف والنشاط",
      "تحيين الشركاء أو المساهمين",
      "إيداع مشروع الإندماج والإنقسام",
      "تغيير الحساب البنكي",
      "تعيين / تجديد مهام / تغيير المصفي",
      "تغيير أو إضافة أو حذف نشاط",
      "فتح فرع",
      "تعيين أو تجديد مراقب حسابات",
      "إيداع عقود أو وثائق اخرى",
      "إحالة الحصص أو إحالة الأسهم",
      "الإنقسام",
      "تغيير تاريخ قفل الموازنة",
      "إيداع ختم القوائم المالية للتصفية",
      "تعليق السجل أو إيقاف التعليق",
      "غلق فرع",
      "إيداع القوائم المالية",
      "تحيين القانون الأساسي",
      "تغيير الشكل القانوني",
      "إيداع مشروع الترفيع في رأس المال",
      "الحل والتصفية",
      "ختم أعمال التصفية",
      "إدراج عقل / قيود إحتياطية",
      "تغيير عنوان الفرع",
      "إيداع تقرير مراقب الحصص العينية",
      "إضافة أو تحيين المسيرين",
      "التمديد في مدة الشركة",
      "الإندماج",
      "التشطيب",
    ],
    required: true,
  },
  autreModification: { type: String },
  date: { type: String, required: true },
});

const DeclarModifRNESociete = mongoose.model(
  "DeclarModifRNESociete",
  DeclarModifRNESocieteSchema
);

export default DeclarModifRNESociete;
