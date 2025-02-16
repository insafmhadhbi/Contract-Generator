// import React, { useState } from "react";
// import axios from "axios";
// //import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const Form_DeclarImmRNESociete = () => {
//   const [formData, setFormData] = useState({
//     identifiantUnique: "1234567890",
//     numCertificatReservation: "123ABC",
//     RIB: "0123456789",
//     Denomination: "ABC ",
//     representationLegal: "INSAF",
//     typePieceIdentite: "CIN - بطاقة تعريف",
//     ID: "123456789",
//     Email: "john.doe@example.com",
//     numGSM: "123456789",
//     nomDéposant: "Alice",
//     numIDdéposant: "987654321",
//     date: "2024-03-23",
//   });
//   const [errors, setErrors] = useState({});
//   const [formSuccess, setFormSuccess] = useState(false);
//   //const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_API}/api/v1/forms/Form_DeclarImmRNESociete`,
//         formData
//       );

//       if (res.data.success) {
//         setFormSuccess(res.data);
//         toast.success(res.data.message, {
//           autoClose: 500,
//           onClose: () => {},
//         });
//       } else {
//         setErrors({ message: res.data.message });
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-md-6">
//             <div className="card">
//               <div className="card-body">
//                 {!formSuccess ? (
//                   <>
//                     <h2 className="card-title text-center mb-4">
//                       DÉCLARATION D’IMMATRICULATION D’UNE PERSONNE MORALE
//                       <br></br>
//                       تصريح بتسجيل شخص معنوي
//                     </h2>
//                     <form onSubmit={handleSubmit}>
//                       <div className="mb-3">
//                         <label
//                           htmlFor="identifiantUnique"
//                           className="form-label"
//                         >
//                           Identifiant Unique / المعرف الوحيد
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="identifiantUnique"
//                           name="identifiantUnique"
//                           value={formData.identifiantUnique}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>

//                       <div className="mb-3">
//                         <label
//                           htmlFor="numCertificatReservation"
//                           className="form-label"
//                         >
//                           Numéro de Certificat de Réservation / رقم شهادة الحجز
//                           عند الإقتضاء
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="numCertificatReservation"
//                           name="numCertificatReservation"
//                           value={formData.numCertificatReservation}
//                           onChange={handleChange}
//                         />
//                       </div>
//                       <div className="mb-3">
//                         <label htmlFor="RIB" className="form-label">
//                           RIB / المعرف البنكي
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="RIB"
//                           name="RIB"
//                           value={formData.RIB}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>

//                       <div className="mb-3">
//                         <label htmlFor="denomination" className="form-label">
//                           Denomination / إسم المؤسسة
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="denomination"
//                           name="denomination"
//                           value={formData.denomination}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>

//                       <div className="mb-3">
//                         <label
//                           htmlFor="representationLegal"
//                           className="form-label"
//                         >
//                           Legal Representation / الممثل القانوني
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="representationLegal"
//                           name="representationLegal"
//                           value={formData.representationLegal}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>

//                       <div className="mb-3">
//                         <label
//                           htmlFor="typePieceIdentite"
//                           className="form-label"
//                         >
//                           Type de Pièce d'Identité / نوع الهوية
//                         </label>
//                         <select
//                           className="form-select"
//                           id="typePieceIdentite"
//                           name="typePieceIdentite"
//                           value={formData.typePieceIdentite}
//                           onChange={handleChange}
//                           required
//                         >
//                           <option value="">
//                             Sélectionnez le type de pièce d'identité
//                           </option>
//                           <option value="CIN - بطاقة تعريف">
//                             CIN - بطاقة تعريف
//                           </option>
//                           <option value="PASSEPORT - رقم جواز سفر">
//                             PASSEPORT - رقم جواز سفر
//                           </option>
//                           <option value="CARTE DE SEJOUR - بطاقة إقامة">
//                             CARTE DE SEJOUR - بطاقة إقامة
//                           </option>
//                           <option value="CARTE CONSULAIRE - بطاقة قنصلية">
//                             CARTE CONSULAIRE - بطاقة قنصلية
//                           </option>
//                         </select>
//                       </div>
//                       <div className="mb-3">
//                         <label htmlFor="ID" className="form-label">
//                           N° Identité / رقم الهوية
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="ID"
//                           name="ID"
//                           value={formData.ID}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                       <div className="mb-3">
//                         <label htmlFor="Email" className="form-label">
//                           E-mail / البريد الإلكتروني
//                         </label>
//                         <input
//                           type="email"
//                           className="form-control"
//                           id="Email"
//                           name="Email"
//                           value={formData.Email}
//                           onChange={handleChange}
//                         />
//                       </div>
//                       <div className="mb-3">
//                         <label htmlFor="numGSM" className="form-label">
//                           N° GSM / الهاتف الجوال
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="numGSM"
//                           name="numGSM"
//                           value={formData.numGSM}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>

//                       <div className="mb-3">
//                         <label htmlFor="nomDéposant" className="form-label">
//                           Nom du Déposant / إسم و لقب المودع
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="nomDéposant"
//                           name="nomDéposant"
//                           value={formData.nomDéposant}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                       <div className="mb-3">
//                         <label htmlFor="numIDdéposant" className="form-label">
//                           N° Identité du Déposant / رقم بطاقة هوية المودع للمودع
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="numIDdéposant"
//                           name="numIDdéposant"
//                           value={formData.numIDdéposant}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>

//                       <div className="mb-3">
//                         <label htmlFor="date" className="form-label">
//                           Date / التاريخ
//                         </label>
//                         <input
//                           type="date"
//                           className="form-control"
//                           id="date"
//                           name="date"
//                           value={formData.date}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>

//                       {/* Display errors */}
//                       {errors && (
//                         <div className="text-danger">{errors.message}</div>
//                       )}

//                       {/* Submit button */}
//                       <div className="d-grid">
//                         <button type="submit" className="btn btn-primary">
//                           Soumettre
//                         </button>
//                       </div>
//                     </form>
//                   </>
//                 ) : (
//                   <>
//                     <h2>Votre formulaire a été soumis avec succès!</h2>
//                     <p>
//                       Pour afficher votre formulaire en PDF, veuillez
//                       <a
//                         href={`http://localhost:8080/api/v1/forms/DeclarImmRNESocietePDF/${formSuccess.form._id}`}
//                         target="_blank"

//                       >
//                         {" "}
//                         cliquez ici
//                       </a>
//                     </p>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//   );
// };

// export default Form_DeclarImmRNESociete;
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Form_DeclarImmRNESociete = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    identifiantUnique: "1234567890",
    numCertificatReservation: "123ABC",
    RIB: "0123456789",
    denomination: "ABC",
    representationLegal: "INSAF",
    typePieceIdentite: "CIN - بطاقة تعريف",
    ID: "123456789",
    Email: "john.doe@example.com",
    numGSM: "123456789",
    nomDéposant: "Alice",
    numIDdéposant: "987654321",
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
        `${process.env.REACT_APP_API}/api/v1/forms/Form_DeclarImmRNESociete`,
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
      toast.error(t("formulaire:declarImmRNESociete:successMessage"));
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
                    {t("formulaire:declarImmRNESociete:titre")}
                    <br />
                    {t("formulaire:declarImmRNESociete:titre")}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="identifiantUnique" className="form-label">
                        {t("formulaire:declarImmRNESociete:identifiantUnique")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="identifiantUnique"
                        name="identifiantUnique"
                        value={formData.identifiantUnique}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="numCertificatReservation"
                        className="form-label"
                      >
                        {t(
                          "formulaire:declarImmRNESociete:numCertificatReservation"
                        )}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="numCertificatReservation"
                        name="numCertificatReservation"
                        value={formData.numCertificatReservation}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="RIB" className="form-label">
                        {t("formulaire:declarImmRNESociete:RIB")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="RIB"
                        name="RIB"
                        value={formData.RIB}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="denomination" className="form-label">
                        {t("formulaire:declarImmRNESociete:denomination")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="denomination"
                        name="denomination"
                        value={formData.denomination}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="representationLegal"
                        className="form-label"
                      >
                        {t(
                          "formulaire:declarImmRNESociete:representationLegal"
                        )}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="representationLegal"
                        name="representationLegal"
                        value={formData.representationLegal}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="typePieceIdentite" className="form-label">
                        {t("formulaire:declarImmRNESociete:typePieceIdentite")}
                      </label>
                      <select
                        className="form-select"
                        id="typePieceIdentite"
                        name="typePieceIdentite"
                        value={formData.typePieceIdentite}
                        onChange={handleChange}
                        required
                      >
                        <option value="">
                          {t("formulaire:declarImmRNESociete:selectionnez")}
                        </option>
                        <option value="CIN - بطاقة تعريف">
                          {t(
                            "formulaire:declarImmRNESociete:typePieceIdentiteOptions.CIN"
                          )}
                        </option>
                        <option value="PASSEPORT - رقم جواز سفر">
                          {t(
                            "formulaire:declarImmRNESociete:typePieceIdentiteOptions.PASSEPORT"
                          )}
                        </option>
                        <option value="CARTE DE SEJOUR - بطاقة إقامة">
                          {t(
                            "formulaire:declarImmRNESociete:typePieceIdentiteOptions.CARTE_DE_SEJOUR"
                          )}
                        </option>
                        <option value="CARTE CONSULAIRE - بطاقة قنصلية">
                          {t(
                            "formulaire:declarImmRNESociete:typePieceIdentiteOptions.CARTE_CONSULAIRE"
                          )}
                        </option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="ID" className="form-label">
                        {t("formulaire:declarImmRNESociete:ID")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ID"
                        name="ID"
                        value={formData.ID}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="Email" className="form-label">
                        {t("formulaire:declarImmRNESociete:Email")}
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="Email"
                        name="Email"
                        value={formData.Email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="numGSM" className="form-label">
                        {t("formulaire:declarImmRNESociete:numGSM")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="numGSM"
                        name="numGSM"
                        value={formData.numGSM}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="nomDéposant" className="form-label">
                        {t("formulaire:declarImmRNESociete:nomDéposant")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nomDéposant"
                        name="nomDéposant"
                        value={formData.nomDéposant}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="numIDdéposant" className="form-label">
                        {t("formulaire:declarImmRNESociete:numIDdéposant")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="numIDdéposant"
                        name="numIDdéposant"
                        value={formData.numIDdéposant}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="date" className="form-label">
                        {t("formulaire:declarImmRNESociete:date")}
                      </label>
                      <input
                        type="date"
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
                        {t("formulaire:declarImmRNESociete:submit")}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <h2>{t("formulaire:declarImmRNESociete:successMessage")}</h2>
                  <p>
                    {t("formulaire:declarImmRNESociete:pdfMessage")}
                    <a
                      href={`http://localhost:8080/api/v1/forms/DeclarImmRNESocietePDF/${formSuccess.form._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("formulaire:declarImmRNESociete:clickHere")}
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

export default Form_DeclarImmRNESociete;
