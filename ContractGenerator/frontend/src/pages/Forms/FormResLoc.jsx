// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "sonner";

// const FormulaireResLoc = () => {
//   const [formData, setFormData] = useState({
//     gender: "madame",
//     nom: "John",
//     prénom: "Doe",
//     cin: "123456789",
//     adresse: "123 Main Street",
//     nomSociété: "ABC Company",
//     adresseSociété: "456 Elm Street",
//     ID: "789",
//     représentant: "Jane Smith",
//     représentantCIN: "987654321",
//     creationDate: "2024-03-30",
//     recette: "XYZ",
//     dateEnregistrement: "2024-04-01",
//     numeroEnregistrement: "123456",
//     numQuitance: "7890123",
//     dateRes: "2024-03-30",
//     dateDebut: "2024-04-01",
//     lieuSignature: "City",
//     dateSignature: "2024-04-01",
//   });
//   const [errors, setErrors] = useState({});
//   const [formSuccess, setFormSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value }); // Update formData with the new value
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_API}/api/v1/forms/FormResLoc`,
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
//                       Formulaire de Résiliation de contrat
//                     </h2>
//                     <form onSubmit={handleSubmit}>
//                       {/* Gender select */}
//                       <div className="mb-3">
//                         <label>Gender</label>
//                         <select
//                           className="form-select"
//                           value={formData.gender}
//                           name="gender"
//                           onChange={handleChange}
//                           required
//                         >
//                           <option value="">Choose</option>
//                           <option value="Monsieur">Monsieur</option>
//                           <option value="Madame">Madame</option>
//                         </select>
//                       </div>
//                       <div className="mb-3">
//                         <label htmlFor="nom" className="form-label">
//                           Nom
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="nom"
//                           name="nom"
//                           value={formData.nom}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                       <div className="mb-3">
//                         <label htmlFor="prénom" className="form-label">
//                           Prénom
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="prénom"
//                           name="prénom"
//                           value={formData.prénom}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                       <div className="mb-3">
//                         <label htmlFor="cin" className="form-label">
//                           CIN
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="cin"
//                           name="cin"
//                           value={formData.cin}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                       <div className="mb-3">
//                         <label htmlFor="adresse" className="form-label">
//                           Adresse
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="adresse"
//                           name="adresse"
//                           value={formData.adresse}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                       <div className="mb-3">
//                         <label htmlFor="nomSociété" className="form-label">
//                           Nom de la Société
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="nomSociété"
//                           name="nomSociété"
//                           value={formData.nomSociété}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                       <div className="mb-3">
//                         <label htmlFor="adresseSociété" className="form-label">
//                           Adresse de la Société
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="adresseSociété"
//                           name="adresseSociété"
//                           value={formData.adresseSociété}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                       <div className="mb-3">
//                         <label htmlFor="ID" className="form-label">
//                           ID
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
//                         <label htmlFor="représentant" className="form-label">
//                           Représentant
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="représentant"
//                           name="représentant"
//                           value={formData.représentant}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                       <div className="mb-3">
//                         <label htmlFor="représentantCIN" className="form-label">
//                           CIN du Représentant
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="représentantCIN"
//                           name="représentantCIN"
//                           value={formData.représentantCIN}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                       <div className="mb-3">
//                         <label htmlFor="creationDate" className="form-label">
//                           Date de Création
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="creationDate"
//                           name="creationDate"
//                           value={formData.creationDate}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                       <div className="mb-3">
//                         <label htmlFor="recette" className="form-label">
//                           Recette
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="recette"
//                           name="recette"
//                           value={formData.recette}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                       <div className="mb-3">
//                         <label
//                           htmlFor="dateEnregistrement"
//                           className="form-label"
//                         >
//                           Date d'Enregistrement
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="dateEnregistrement"
//                           name="dateEnregistrement"
//                           value={formData.dateEnregistrement}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                       <div className="mb-3">
//                         <label
//                           htmlFor="numeroEnregistrement"
//                           className="form-label"
//                         >
//                           Numéro d'Enregistrement
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="numeroEnregistrement"
//                           name="numeroEnregistrement"
//                           value={formData.numeroEnregistrement}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                       <div className="mb-3">
//                         <label htmlFor="numQuitance" className="form-label">
//                           Numéro de Quitance
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="numQuitance"
//                           name="numQuitance"
//                           value={formData.numQuitance}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                       <div className="mb-3">
//                         <label htmlFor="dateRes" className="form-label">
//                           Date de Résiliation
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="dateRes"
//                           name="dateRes"
//                           value={formData.dateRes}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                       <div className="mb-3">
//                         <label htmlFor="dateDebut" className="form-label">
//                           Date de Début
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="dateDebut"
//                           name="dateDebut"
//                           value={formData.dateDebut}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                       <div className="mb-3">
//                         <label htmlFor="lieuSignature" className="form-label">
//                           Lieu de Signature
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="lieuSignature"
//                           name="lieuSignature"
//                           value={formData.lieuSignature}
//                           onChange={handleChange}
//                           required
//                         />
//                       </div>
//                       <div className="mb-3">
//                         <label htmlFor="dateSignature" className="form-label">
//                           Date de Signature
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="dateSignature"
//                           name="dateSignature"
//                           value={formData.dateSignature}
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
//                           Submit
//                         </button>
//                       </div>
//                     </form>{" "}
//                   </>
//                 ) : (
//                   <>
//                     <h2>Your form has been submitted!</h2>
//                     <p>
//                       To view your contract as PDF, please
//                       <a
//                         href={`http://localhost:8080/api/v1/forms/ContratResLocationPDF/${formSuccess.form._id}`}
//                         target="_blank"

//                       >
//                         {" "}
//                         click here
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

// export default FormulaireResLoc;
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const FormulaireResLoc = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    gender: "madame",
    nom: "John",
    prénom: "Doe",
    cin: "123456789",
    adresse: "123 Main Street",
    nomSociété: "ABC Company",
    adresseSociété: "456 Elm Street",
    ID: "789",
    représentant: "Jane Smith",
    représentantCIN: "987654321",
    creationDate: "2024-03-30",
    recette: "XYZ",
    dateEnregistrement: "2024-04-01",
    numeroEnregistrement: "123456",
    numQuitance: "7890123",
    dateRes: "2024-03-30",
    dateDebut: "2024-04-01",
    lieuSignature: "City",
    dateSignature: "2024-04-01",
  });
  const [errors, setErrors] = useState({});
  const [formSuccess, setFormSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update formData with the new value
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/forms/FormResLoc`,
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
      toast.error(t("formulaire:resloc:errorMessage"));
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
                    {t("formulaire:resloc:titre")}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    {/* Gender select */}
                    <div className="mb-3">
                      <label>{t("formulaire:resloc:gender")}</label>
                      <select
                        className="form-select"
                        value={formData.gender}
                        name="gender"
                        onChange={handleChange}
                        required
                      >
                        <option value="">
                          {t("formulaire:resloc:choose")}
                        </option>
                        <option value="Monsieur">
                          {t("formulaire:resloc:monsieur")}
                        </option>
                        <option value="Madame">
                          {t("formulaire:resloc:madame")}
                        </option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="nom" className="form-label">
                        {t("formulaire:resloc:nom")}
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
                      <label htmlFor="prénom" className="form-label">
                        {t("formulaire:resloc:prénom")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="prénom"
                        name="prénom"
                        value={formData.prénom}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="cin" className="form-label">
                        {t("formulaire:resloc:cin")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cin"
                        name="cin"
                        value={formData.cin}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="adresse" className="form-label">
                        {t("formulaire:resloc:adresse")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="adresse"
                        name="adresse"
                        value={formData.adresse}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="nomSociété" className="form-label">
                        {t("formulaire:resloc:nomSociété")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nomSociété"
                        name="nomSociété"
                        value={formData.nomSociété}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="adresseSociété" className="form-label">
                        {t("formulaire:resloc:adresseSociété")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="adresseSociété"
                        name="adresseSociété"
                        value={formData.adresseSociété}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="ID" className="form-label">
                        {t("formulaire:resloc:ID")}
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
                      <label htmlFor="représentant" className="form-label">
                        {t("formulaire:resloc:représentant")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="représentant"
                        name="représentant"
                        value={formData.représentant}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="représentantCIN" className="form-label">
                        {t("formulaire:resloc:représentantCIN")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="représentantCIN"
                        name="représentantCIN"
                        value={formData.représentantCIN}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="creationDate" className="form-label">
                        {t("formulaire:resloc:creationDate")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="creationDate"
                        name="creationDate"
                        value={formData.creationDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="recette" className="form-label">
                        {t("formulaire:resloc:recette")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="recette"
                        name="recette"
                        value={formData.recette}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="dateEnregistrement"
                        className="form-label"
                      >
                        {t("formulaire:resloc:dateEnregistrement")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="dateEnregistrement"
                        name="dateEnregistrement"
                        value={formData.dateEnregistrement}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="numeroEnregistrement"
                        className="form-label"
                      >
                        {t("formulaire:resloc:numeroEnregistrement")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="numeroEnregistrement"
                        name="numeroEnregistrement"
                        value={formData.numeroEnregistrement}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="numQuitance" className="form-label">
                        {t("formulaire:resloc:numQuitance")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="numQuitance"
                        name="numQuitance"
                        value={formData.numQuitance}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="dateRes" className="form-label">
                        {t("formulaire:resloc:dateRes")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="dateRes"
                        name="dateRes"
                        value={formData.dateRes}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="dateDebut" className="form-label">
                        {t("formulaire:resloc:dateDebut")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="dateDebut"
                        name="dateDebut"
                        value={formData.dateDebut}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="lieuSignature" className="form-label">
                        {t("formulaire:resloc:lieuSignature")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lieuSignature"
                        name="lieuSignature"
                        value={formData.lieuSignature}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="dateSignature" className="form-label">
                        {t("formulaire:resloc:dateSignature")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="dateSignature"
                        name="dateSignature"
                        value={formData.dateSignature}
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
                        {t("formulaire:resloc:submit")}
                      </button>
                    </div>
                  </form>{" "}
                </>
              ) : (
                <>
                  <h2>{t("formulaire:resloc:successMessage")}</h2>
                  <p>
                    {t("formulaire:resloc:viewContract")}
                    <a
                      href={`http://localhost:8080/api/v1/forms/ContratResLocationPDF/${formSuccess.form._id}`}
                      target="_blank"
                    >
                      {" "}
                      {t("formulaire:resloc:clickHere")}
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

export default FormulaireResLoc;
