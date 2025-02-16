import React, { useState } from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Form_DeclarModifRNEPhysique = () => {
  const { t } = useTranslation();
  // const [formData, setFormData] = useState({
  //   identifiantUnique: "1234567890",
  //   certificatReservation: "123ABC",
  //   nomDeclarant: "insaf Mhadhbi",
  //   numeroIdentiteDeclarant: "123456789",
  //   typeModification: "توقف نهائيا عن النشاط",
  //   date: "2024-03-23",
  // });

  const [formData, setFormData] = useState({
    identifiantUnique: "12345678",
    certificatReservation: "12345678912345",
    nom: "Flen",
    prenom: "El Fouleni",
    numeroIdentiteDeclarant: "12345678901",

    email: "flenelfouleni@gmail.com",
    numGsm: "+78965826115",

    nomDeclarant: "insaf",
    prenomDeclarant: "Mhadhbi",
    IDdeclarant: "88888888",

    typeModification: "التشطيب على شخص طبيعي توقف نهائيا عن النشاط",
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
        `${process.env.REACT_APP_API}/api/v1/forms/Form_DeclarModifRNEPhysique`,
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
      toast.error("formulaire:declarModifRNEPhysique:successMessage");
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
                    {t("formulaire:declarModifRNEPhysique:titre")}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="identifiantUnique" className="form-label">
                        {t(
                          "formulaire:declarModifRNEPhysique:identifiantUnique"
                        )}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="identifiantUnique"
                        name="identifiantUnique"
                        value={formData.identifiantUnique}
                        onChange={handleChange}
                        maxLength={8}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="certificatReservation"
                        className="form-label"
                      >
                        {t(
                          "formulaire:declarModifRNEPhysique:certificatReservation"
                        )}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="certificatReservation"
                        name="certificatReservation"
                        value={formData.certificatReservation}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="nom" className="form-label">
                        Nom / اللقب
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="prenom" className="form-label">
                        Prénom / الإسم
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="prenom"
                        name="prenom"
                        value={formData.prenom}
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
                          "formulaire:declarModifRNEPhysique:numeroIdentiteDeclarant"
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
                      <label htmlFor="email" className="form-label">
                        E-mail / البريد الإلكتروني
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="numGsm" className="form-label">
                        N° GSM / الهاتف الجوال
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="numGsm"
                        name="numGsm"
                        value={formData.numGsm}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="nomDeclarant" className="form-label">
                        Nom du Déclarant / لقب المصرح
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
                        Prénom du Déclarant / إسم المصرح
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
                      <label htmlFor="IDdeclarant" className="form-label">
                        N° Identité du déclarant / رقم بطاقة هوية المصرح
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="IDdeclarant"
                        name="IDdeclarant"
                        value={formData.IDdeclarant}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="typeModification" className="form-label">
                        Type de Modification / طبيعة التحيين
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
                          Sélectionnez le type de modification
                        </option>
                        <option value="إضافة أو تغيير الإسم التجاري أو الشارة">
                          إضافة أو تغيير الإسم التجاري أو الشارة
                        </option>
                        <option value="غلق فرع">غلق فرع</option>

                        <option value="التشطيب على شخص طبيعي توقف نهائيا عن النشاط">
                          التشطيب على شخص طبيعي توقف نهائيا عن النشاط
                        </option>
                        <option value="التصريح بالإبقاء المؤقت على التسجيل عند الوفاة أو تجديده">
                          التصريح بالإبقاء المؤقت على التسجيل عند الوفاة أو
                          تجديده
                        </option>
                        <option value="التصريح بالإبقاء إثر التوقف الكلي عن النشاط أو تجديده">
                          التصريح بالإبقاء إثر التوقف الكلي عن النشاط أو تجديده
                        </option>
                        <option value="تغيير عنوان المقر أو الفرع">
                          تغيير عنوان المقر أو الفرع
                        </option>
                        <option value="تغيير الحالة المدنية">
                          تغيير الحالة المدنية
                        </option>
                        <option value="التوقف الجزئي عن النشاط">
                          التوقف الجزئي عن النشاط
                        </option>
                        <option value="تغيير أو إضافة نشاط بالأصل أو الفرع">
                          تغيير أو إضافة نشاط بالأصل أو الفرع
                        </option>
                        <option value="إ يداع عقود و وثائق">
                          إ يداع عقود و وثائق
                        </option>
                        <option value="إستئناف النشاط">إستئناف النشاط</option>
                        <option value="إضافة فرع">إضافة فرع</option>
                        <option value="إيداع القوائم المالية">
                          إيداع القوائم المالية
                        </option>
                        <option value="أخرى">أخرى</option>
                      </select>
                    </div>

                    {formData.typeModification === "أخرى" && (
                      <div className="mb-3">
                        <label
                          htmlFor="autreModification"
                          className="form-label"
                        >
                          Autre Modification / أخرى
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="autreModification"
                          name="autreModification"
                          value={formData.autreModification}
                          onChange={handleChange}
                        />
                      </div>
                    )}

                    {/* <div className="mb-3">
                      <label htmlFor="typeModification" className="form-label">
                        {t(
                          "formulaire:declarModifRNEPhysique:typeModification"
                        )}
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
                            "formulaire:declarModifRNEPhysique:selectModificationType"
                          )}
                        </option>
                        <option value="إضافة أو تغيير الإسم التجاري أو الشارة">
                          {t(
                            "formulaire:declarModifRNEPhysique:commercialNameChangeOrAddition"
                          )}
                        </option>
                        <option value="التشطيب على شخص طبيعي">
                          {t(
                            "formulaire:declarModifRNEPhysique:finishOnNaturalPerson"
                          )}
                        </option>
                        <option value="توقف نهائيا عن النشاط">
                          {t(
                            "formulaire:declarModifRNEPhysique:stopActivityCompletely"
                          )}
                        </option>

                        <option value="التوقف الجزئي عن النشاط">
                          {t(
                            "formulaire:declarModifRNEPhysique:partialStopActivity"
                          )}
                        </option>
                        <option value="التصريح بالإبقاء إثر التوقف الكلي عن النشاط أو تجديده">
                          {t(
                            "formulaire:declarModifRNEPhysique:declarationMaintainRegistration"
                          )}
                        </option>
                        <option value="إضافة فرع">
                          {t("formulaire:declarModifRNEPhysique:addBranch")}
                        </option>
                        <option value="يداع القوائم المالية">
                          {t(
                            "formulaire:declarModifRNEPhysique:submitFinancialStatements"
                          )}
                        </option>
                        <option value="تغيير أو إضافة نشاط بالأصل أو الفرع">
                          {t(
                            "formulaire:declarModifRNEPhysique:changeOrAddOriginalOrBranchActivity"
                          )}
                        </option>
                        <option value="إ يداع عقود و وثائق">
                          {t(
                            "formulaire:declarModifRNEPhysique:submitContractsAndDocuments"
                          )}
                        </option>
                        <option value="إستئناف النشاط">
                          {t(
                            "formulaire:declarModifRNEPhysique:resumeActivity"
                          )}
                        </option>
                        <option value="التصريح بالإبقاء المؤقت على التسجيل عند الوفاة أو تجديده">
                          {t(
                            "formulaire:declarModifRNEPhysique:temporaryMaintainRegistrationAfterDeathOrRenewal"
                          )}
                        </option>
                        <option value="أخرى">
                          {" "}
                          {t("formulaire:declarModifRNEPhysique:other")}
                        </option>
                      </select>
                    </div>


                    {formData.typeModification === "أخرى" && (
                      <div className="mb-3">
                        <label
                          htmlFor="autreModification"
                          className="form-label"
                        >
                          {t(
                            "formulaire:declarModifRNEPhysique:autreModification"
                          )}
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="autreModification"
                          name="autreModification"
                          value={formData.autreModification}
                          onChange={handleChange}
                        />
                      </div>
                    )} */}

                    <div className="mb-3">
                      <label htmlFor="date" className="form-label">
                        {t("formulaire:declarModifRNEPhysique:date")}
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
                        {t("formulaire:declarModifRNEPhysique:submit")}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <h2>
                    {t("formulaire:declarModifRNEPhysique:successMessage")}
                  </h2>
                  <p>
                    {t("formulaire:declarModifRNEPhysique:viewContract")}
                    <a
                      href={`http://localhost:8080/api/v1/forms/RNEPhyModifContratPDF/${formSuccess.form._id}`}
                      target="_blank"
                    >
                      {t("formulaire:declarModifRNEPhysique:clickHere")}
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

export default Form_DeclarModifRNEPhysique;
