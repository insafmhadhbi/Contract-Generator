import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const FormContratLocation = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    nom: "insaf",
    adresse: "123 Rue de la ..",
    typePieceIdentite: "CIN",
    ID: "123456789",
    denomination: "ABC Company",
    representantLegal: "lamiss",
    typeIdentiteRepresentant: "CIN",
    IDrepresentant: "012345678",
    adresseLocalLoue: "456 lknhdqs",
    superficieLocal: "100",
    activite: "Retail",
    dateDebutContrat: "2024-04-01",
    dateFinContrat: "2025-04-01",
    montantLoyerHT: "1000",
    montantTVA: "200",
    montantLoyerTTC: "1200",
    modalitesPaiement: "Mois",
    lieu: "monastir",
    dateSignature: "01-04-2024",
  });

  const [errors, setErrors] = useState({});
  const [formSuccess, setFormSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/forms/FormContratLocation`,
        formData
      );

      if (res.data.success) {
        setFormSuccess(res.data);
        toast.success(t("formulaire:location:successMessage"), {
          autoClose: 500,
          onClose: () => {},
        });
      } else {
        setErrors({ message: res.data.message });
      }
    } catch (error) {
      console.error(error);
      toast.error(t("formulaire:location:errorMessage"));
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
              <h2 className="card-title text-center mb-4">
                {t("formulaire:location:titre")}
              </h2>
              <form onSubmit={handleSubmit}>
                {/* Nom */}
                <div className="mb-3">
                  <label htmlFor="nom" className="form-label">
                    {t("formulaire:location:nom")}
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

                {/* Adresse */}
                <div className="mb-3">
                  <label htmlFor="adresse" className="form-label">
                    {t("formulaire:location:adresse")}
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

                {/* Type de pièce d'identité */}
                <div className="mb-3">
                  <label htmlFor="typePieceIdentite" className="form-label">
                    {t("formulaire:location:typePieceIdentite")}
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
                      {t(
                        "formulaire:location:typeIdentiteRepresentantPlaceholder"
                      )}
                    </option>
                    <option value="CIN">{t("formulaire:location:CIN")}</option>
                    <option value="PASSEPORT">
                      {t("formulaire:location:PASSEPORT")}
                    </option>
                    <option value="CARTE DE SEJOUR">
                      {t("formulaire:location:CARTE_DE_SEJOUR")}
                    </option>
                    <option value="CARTE CONSULAIRE">
                      {t("formulaire:location:CARTE_CONSULAIRE")}
                    </option>
                  </select>
                </div>

                {/* N° Identité */}
                <div className="mb-3">
                  <label htmlFor="ID" className="form-label">
                    {t("formulaire:location:ID")}
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

                {/* Dénomination */}
                <div className="mb-3">
                  <label htmlFor="denomination" className="form-label">
                    {t("formulaire:location:denomination")}
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

                {/* Représentant Légal */}
                <div className="mb-3">
                  <label htmlFor="representantLegal" className="form-label">
                    {t("formulaire:location:representantLegal")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="representantLegal"
                    name="representantLegal"
                    value={formData.representantLegal}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Type de pièce d'identité du représentant */}
                <div className="mb-3">
                  <label
                    htmlFor="typeIdentiteRepresentant"
                    className="form-label"
                  >
                    {t("formulaire:location:typeIdentiteRepresentant")}
                  </label>
                  <select
                    className="form-select"
                    id="typeIdentiteRepresentant"
                    name="typeIdentiteRepresentant"
                    value={formData.typeIdentiteRepresentant}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      {t(
                        "formulaire:location:typeIdentiteRepresentantPlaceholder"
                      )}
                    </option>
                    <option value="CIN">{t("formulaire:location:CIN")}</option>
                    <option value="PASSEPORT">
                      {t("formulaire:location:PASSEPORT")}
                    </option>
                    <option value="CARTE DE SEJOUR">
                      {t("formulaire:location:CARTE_DE_SEJOUR")}
                    </option>
                    <option value="CARTE CONSULAIRE">
                      {t("formulaire:location:CARTE_CONSULAIRE")}
                    </option>
                  </select>
                </div>

                {/* N° Identité du représentant */}
                <div className="mb-3">
                  <label htmlFor="IDrepresentant" className="form-label">
                    {t("formulaire:location:IDrepresentant")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="IDrepresentant"
                    name="IDrepresentant"
                    value={formData.IDrepresentant}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Adresse du Local Loué */}
                <div className="mb-3">
                  <label htmlFor="adresseLocalLoue" className="form-label">
                    {t("formulaire:location:adresseLocalLoue")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="adresseLocalLoue"
                    name="adresseLocalLoue"
                    value={formData.adresseLocalLoue}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Superficie du Local */}
                <div className="mb-3">
                  <label htmlFor="superficieLocal" className="form-label">
                    {t("formulaire:location:superficieLocal")}
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="superficieLocal"
                    name="superficieLocal"
                    value={formData.superficieLocal}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Activité */}
                <div className="mb-3">
                  <label htmlFor="activite" className="form-label">
                    {t("formulaire:location:activite")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="activite"
                    name="activite"
                    value={formData.activite}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Date de Début du Contrat */}
                <div className="mb-3">
                  <label htmlFor="dateDebutContrat" className="form-label">
                    {t("formulaire:location:dateDebutContrat")}
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateDebutContrat"
                    name="dateDebutContrat"
                    value={formData.dateDebutContrat}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Date de Fin du Contrat */}
                <div className="mb-3">
                  <label htmlFor="dateFinContrat" className="form-label">
                    {t("formulaire:location:dateFinContrat")}
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateFinContrat"
                    name="dateFinContrat"
                    value={formData.dateFinContrat}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Montant du Loyer Mensuel Brut Hors Taxe */}
                <div className="mb-3">
                  <label htmlFor="montantLoyerHT" className="form-label">
                    {t("formulaire:location:montantLoyerHT")}
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="montantLoyerHT"
                    name="montantLoyerHT"
                    value={formData.montantLoyerHT}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Montant TVA */}
                <div className="mb-3">
                  <label htmlFor="montantTVA" className="form-label">
                    {t("formulaire:location:montantTVA")}
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="montantTVA"
                    name="montantTVA"
                    value={formData.montantTVA}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Montant du Loyer Mensuel TTC */}
                <div className="mb-3">
                  <label htmlFor="montantLoyerTTC" className="form-label">
                    {t("formulaire:location:montantLoyerTTC")}
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="montantLoyerTTC"
                    name="montantLoyerTTC"
                    value={formData.montantLoyerTTC}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Modalités de Paiement */}
                <div className="mb-3">
                  <label htmlFor="modalitesPaiement" className="form-label">
                    {t("formulaire:location:modalitesPaiement")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="modalitesPaiement"
                    name="modalitesPaiement"
                    value={formData.modalitesPaiement}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Lieu */}
                <div className="mb-3">
                  <label htmlFor="lieu" className="form-label">
                    {t("formulaire:location:lieu")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lieu"
                    name="lieu"
                    value={formData.lieu}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Date de Signature */}
                <div className="mb-3">
                  <label htmlFor="dateSignature" className="form-label">
                    {t("formulaire:location:dateSignature")}
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateSignature"
                    name="dateSignature"
                    value={formData.dateSignature}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Error messages */}
                {errors && <div className="text-danger">{errors.message}</div>}

                {/* Submit button */}
                <div className="d-grid">
                  <button type="submit" className="btn btn-custom">
                    {t("formulaire:location:submit")}
                  </button>
                </div>
              </form>

              {/* Success message */}
              {formSuccess && (
                <>
                  <h2>{t("formulaire:location:successMessage")}</h2>
                  <p>
                    {t("formulaire:location:viewContract")}
                    <a
                      href={`${process.env.REACT_APP_API}/api/v1/forms/ContratLocationPDF/${formSuccess.form._id}`}
                      target="_blank"
                    >
                      {t("formulaire:location:clickHere")}
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

export default FormContratLocation;
