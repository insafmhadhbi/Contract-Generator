import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Form_DeclarImmRNEPhysique = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    profession: "Métier Libéral - مهنة حرة  ",
    identifiantUnique: "12345678",
    numCertificatReservation: "123ABC",
    nom: "John",
    prénom: "Doe",
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
        `${process.env.REACT_APP_API}/api/v1/forms/Form_DeclarImmRNEPhysique`,
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
      toast.error(t("formulaire:declarImmRNEPhysique:errorMessage"));
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
                    {t("formulaire:declarImmRNEPhysique:titre")}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div class="mb-3">
                      <div>
                        <label htmlFor="profession" className="form-label">
                          {t("formulaire:declarImmRNEPhysique:profession")}
                        </label>
                      </div>
                      <div>
                        <select
                          class="form-select"
                          id="profession"
                          name="profession"
                          value={formData.profession}
                          onChange={handleChange}
                          required
                        >
                          <option value="Métier Libéral - مهنة حرة">
                            {t("formulaire:declarImmRNEPhysique:liberal")}
                          </option>
                          <option value="Artisan - حرفي">
                            {t("formulaire:declarImmRNEPhysique:artisan")}
                          </option>
                          <option value="Commerçant - تاجر">
                            {t("formulaire:declarImmRNEPhysique:commercant")}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="identifiantUnique" className="form-label">
                        {t("formulaire:declarImmRNEPhysique:identifiantUnique")}
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
                        htmlFor="numCertificatReservation"
                        className="form-label"
                      >
                        {t(
                          "formulaire:declarImmRNEPhysique:numCertificatReservation"
                        )}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="numCertificatReservation"
                        name="numCertificatReservation"
                        value={formData.numCertificatReservation}
                        onChange={handleChange}
                        maxLength={14}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="nom" className="form-label">
                        {t("formulaire:declarImmRNEPhysique:nom")}
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
                        {t("formulaire:declarImmRNEPhysique:prénom")}
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
                      <label htmlFor="typePieceIdentite" className="form-label">
                        {t("formulaire:declarImmRNEPhysique:typePieceIdentite")}
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
                          {t("formulaire:declarImmRNEPhysique:choose")}
                        </option>
                        <option value="CIN - بطاقة تعريف">
                          {t("formulaire:declarImmRNEPhysique:cin")}
                        </option>
                        <option value="PASSEPORT - رقم جواز سفر">
                          {t("formulaire:declarImmRNEPhysique:passeport")}
                        </option>
                        <option value="CARTE DE SEJOUR - بطاقة إقامة">
                          {t("formulaire:declarImmRNEPhysique:carteSejour")}
                        </option>
                        <option value="CARTE CONSULAIRE - بطاقة قنصلية">
                          {t("formulaire:declarImmRNEPhysique:carteConsulaire")}
                        </option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="ID" className="form-label">
                        {t("formulaire:declarImmRNEPhysique:ID")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ID"
                        name="ID"
                        value={formData.ID}
                        onChange={handleChange}
                        maxLength={11}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="Email" className="form-label">
                        {t("formulaire:declarImmRNEPhysique:Email")}
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
                        {t("formulaire:declarImmRNEPhysique:numGSM")}
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
                        {t("formulaire:declarImmRNEPhysique:nomDéposant")}
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
                        {t("formulaire:declarImmRNEPhysique:numIDdéposant")}
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
                        {t("formulaire:declarImmRNEPhysique:date")}
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
                        {t("formulaire:declarImmRNEPhysique:submit")}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <h2>{t("formulaire:declarImmRNEPhysique:successMessage")}</h2>
                  <p>
                    {t("formulaire:declarImmRNEPhysique:viewContract")}
                    <a
                      href={`${process.env.REACT_APP_API}/api/v1/forms/RNEPhyImmContratPDF/${formSuccess.form._id}`}
                      target="_blank"
                    >
                      {" "}
                      {t("formulaire:declarImmRNEPhysique:clickHere")}
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

export default Form_DeclarImmRNEPhysique;
