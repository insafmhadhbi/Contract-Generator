import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Form_DeclarModifRNESociete = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    identifiantUnique: "12345678",
    certificatReservation: "123456789azert",
    rib: "123456789012345678901",
    numeroIdentite: "12345678911",
    representantLegalNom: "b",
    representantLegalPrénom: "a",
    email: "insafmh6@gmail.com",
    numeroGSM: "6541",
    nomDeclarant: "Mhadhbi",
    prenomDeclarant: "Insaf",
    numeroIdentiteDeclarant: "123456789",
    typeModification: "تغيير عنوان الفرع",
    date: "2024-03-23",
  });
  const [errors, setErrors] = useState({});
  const [formSuccess, setFormSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/forms/Form_DeclarModifRNESociete`,
        formData
      );

      if (res.data.success) {
        setFormSuccess(res.data);
        toast.success(res.data.message, {
          autoClose: 500,
          onClose: () => {},
        });
      } else {
        setErrors({ message: res.data.message });
      }
    } catch (error) {
      console.error(error);
      toast.error(t("formulaire:declarModifRNESoc:successMessage"));
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="back-button-container2">
            <Link to="/Contracts" className="back-link">
              <FontAwesomeIcon icon={faAngleLeft} />
              {/* &nbsp; {t("formContratPersonneMorale:back")} */}
            </Link>
          </div>
          <div className="card">
            <div className="card-body">
              {!formSuccess ? (
                <>
                  <h2 className="card-title text-center mb-4">
                    {t("formulaire:declarModifRNESoc:titre")}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="identifiantUnique" className="form-label">
                        {t("formulaire:declarModifRNESoc:identifiantUnique")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="identifiantUnique"
                        name="identifiantUnique"
                        value={formData.identifiantUnique}
                        onChange={handleChange}
                        maxLength={8}
                        identifiantUnique
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="certificatReservation"
                        className="form-label"
                      >
                        {t(
                          "formulaire:declarModifRNESoc:certificatReservation"
                        )}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="certificatReservation"
                        name="certificatReservation"
                        value={formData.certificatReservation}
                        maxLength={14}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="rib" className="form-label">
                        {t("formulaire:declarModifRNESoc:rib")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="rib"
                        name="rib"
                        value={formData.rib}
                        onChange={handleChange}
                        maxLength={21}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="numeroIdentite" className="form-label">
                        {t("formulaire:declarModifRNESoc:numeroIdentite")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="numeroIdentite"
                        name="numeroIdentite"
                        value={formData.numeroIdentite}
                        onChange={handleChange}
                        maxLength={11}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="representantLegalNom"
                        className="form-label"
                      >
                        Nom du representant legal
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="representantLegalNom"
                        name="representantLegalNom"
                        value={formData.representantLegalNom}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="representantLegalPrénom"
                        className="form-label"
                      >
                        Prénom du representant legal
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="representantLegalPrénom"
                        name="representantLegalPrénom"
                        value={formData.representantLegalPrénom}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        {t("formulaire:declarModifRNESoc:email")}
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="numeroGSM" className="form-label">
                        {t("formulaire:declarModifRNESoc:numeroGSM")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="numeroGSM"
                        name="numeroGSM"
                        value={formData.numeroGSM}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="nomDeclarant" className="form-label">
                        Nom du déclarant
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nomDeclarant"
                        name="nomDeclarant"
                        value={formData.nomDeclarant}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="prenomDeclarant" className="form-label">
                        Prénom du déclarant
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="prenomDeclarant"
                        name="prenomDeclarant"
                        value={formData.prenomDeclarant}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="numeroIdentiteDeclarant"
                        className="form-label"
                      >
                        {t(
                          "formulaire:declarModifRNESoc:numeroIdentiteDeclarant"
                        )}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="numeroIdentiteDeclarant"
                        name="numeroIdentiteDeclarant"
                        value={formData.numeroIdentiteDeclarant}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="typeModification" className="form-label">
                        {t("formulaire:declarModifRNESoc:typeModification")}
                      </label>
                      <select
                        className="form-select"
                        id="typeModification"
                        name="typeModification"
                        value={formData.typeModification}
                        onChange={handleChange}
                        required
                      >
                        <option value="">
                          {t(
                            "formulaire:declarModifRNESoc:selectModificationType"
                          )}
                        </option>
                        <option value="تغيير التسمية الإجتماعية أو الإسم التجاري أو الشارة">
                          تغيير التسمية الإجتماعية أو الإسم التجاري أو الشارة
                        </option>
                        <option value="إيداع المستفيد الحقيقي">
                          إيداع المستفيد الحقيقي
                        </option>
                        <option value="تغيير عنوان المقر الإجتماعي">
                          تغيير عنوان المقر الإجتماعي
                        </option>
                        <option value="إيداع تقرير التصرف والنشاط">
                          إيداع تقرير التصرف والنشاط
                        </option>
                        <option value="تحيين الشركاء أو المساهمين">
                          تحيين الشركاء أو المساهمين
                        </option>
                        <option value="إيداع مشروع الإندماج والإنقسام">
                          إيداع مشروع الإندماج والإنقسام
                        </option>
                        <option value="تغيير الحساب البنكي">
                          تغيير الحساب البنكي
                        </option>
                        <option value="تعيين / تجديد مهام / تغيير المصفي">
                          تعيين / تجديد مهام / تغيير المصفي
                        </option>
                        <option value="تغيير أو إضافة أو حذف نشاط">
                          تغيير أو إضافة أو حذف نشاط
                        </option>
                        <option value="فتح فرع">فتح فرع</option>

                        <option value="تعيين أو تجديد مراقب حسابات">
                          تعيين أو تجديد مراقب حسابات
                        </option>
                        <option value="إيداع عقود أو وثائق اخرى">
                          إيداع عقود أو وثائق اخرى
                        </option>
                        <option value="إحالة الحصص أو إحالة الأسهم">
                          إحالة الحصص أو إحالة الأسهم
                        </option>
                        <option value="الإنقسام">الإنقسام</option>
                        <option value="تغيير تاريخ قفل الموازنة">
                          تغيير تاريخ قفل الموازنة
                        </option>
                        <option value="إيداع ختم القوائم المالية للتصفية">
                          إيداع ختم القوائم المالية للتصفية
                        </option>
                        <option value="تعليق السجل أو إيقاف التعليق">
                          تعليق السجل أو إيقاف التعليق
                        </option>
                        <option value="غلق فرع">غلق فرع</option>
                        <option value="إيداع القوائم المالية">
                          إيداع القوائم المالية
                        </option>
                        <option value="تحيين القانون الأساسي">
                          تحيين القانون الأساسي
                        </option>
                        <option value="تغيير الشكل القانوني">
                          تغيير الشكل القانوني
                        </option>
                        <option value="إيداع مشروع الترفيع في رأس المال">
                          إيداع مشروع الترفيع في رأس المال
                        </option>
                        <option value="الحل والتصفية">الحل والتصفية</option>
                        <option value="ختم أعمال التصفية">
                          ختم أعمال التصفية
                        </option>
                        <option value="إدراج عقل / قيود إحتياطية">
                          إدراج عقل / قيود إحتياطية
                        </option>
                        <option value="تغيير عنوان الفرع">
                          تغيير عنوان الفرع
                        </option>
                        <option value="إيداع تقرير مراقب الحصص العينية">
                          إيداع تقرير مراقب الحصص العينية
                        </option>
                        <option value="إضافة أو تحيين المسيرين">
                          إضافة أو تحيين المسيرين
                        </option>
                        <option value="التمديد في مدة الشركة">
                          التمديد في مدة الشركة
                        </option>

                        <option value="الإندماج">الإندماج</option>
                        <option value="التشطيب">التشطيب</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="date" className="form-label">
                        {t("formulaire:declarModifRNESoc:date")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Display errors */}
                    {errors && (
                      <div className="text-danger">{errors.message}</div>
                    )}

                    {/* Submit button */}
                    <div className="d-grid">
                      <button type="submit" className="btn btn-custom">
                        {t("formulaire:declarModifRNESoc:submit")}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <h2>{t("formulaire:declarModifRNESoc:successMessage")}</h2>
                  <p>
                    {t("formulaire:declarModifRNESoc:pdfMessage")}
                    <a
                      href={`${process.env.REACT_APP_API}/api/v1/forms/RNESocieteModifContratPDF/${formSuccess.form._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      {t("formulaire:declarModifRNESoc:clickHere")}
                    </a>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form_DeclarModifRNESociete;
