import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const FormSural = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    titre: t("formulaire:sural:titre"),
    capitalSocial: "10000",
    siegeSocial: "123 Rue de la République, Tunis",
    denomination: "Société Immobilière Tunisienne",
    nomGerant: "Jean Dupont",
    Article1:"Il est formé une Société à Responsabilité Limitée régie par le Code des Sociétés Commerciales et par les présents statuts.",
    Article2:"La société a pour objet :\n- Commerce de biens immobiliers.\n- La prise de participation ou d’intérêt dans toutes sociétés ou opérations quelconques par voie de fusion,\n apports,souscription, achat de titres et droits sociaux, constitution de sociétés nouvelles ou de toute autre \n manière.\n- Et généralement toutes opérations commerciales, financières, industrielles, mobilières ou immobilières\n serattachant directement ou indirectement aux objets ci-dessus ou à tout autre objet similaire ou connexe.",
    persons: [
      {
        gender: t("formulaire:sural:monsieur"),
        nom: "Ahmed",
        prénom: "Ali",
        adresse: "456 Avenue Habib Bourguiba, Sousse",
        cin: "0123456789",
        montantApport: "5000",
        nombreParts: "50",
        valeurPart: "100",
      },
    ],
    lieuSignature: "Tunis",
    dateSignature: "02-04-2024",
  });
  const [errors, setErrors] = useState({});
  const [formSuccess, setFormSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePersonChange = (index, field, value) => {
    const updatedPersons = [...formData.persons];
    updatedPersons[index][field] = value;
    setFormData({ ...formData, persons: updatedPersons });
  };

  const handleAddPerson = () => {
    setFormData({
      ...formData,
      persons: [...formData.persons, { gender: "", nom: "" }],
    });
  };

  const handleRemovePerson = (index) => {
    const updatedPersons = formData.persons.filter((person, i) => i !== index);
    setFormData({ ...formData, persons: updatedPersons });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/forms/FormSural`,
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
      toast.error(t("formulaire:sural:errorMessage"));
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
                    {t("formulaire:sural:titre1")}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="titre" className="form-label">
                        {t("formulaire:sural:titre")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="titre"
                        name="titre"
                        value={formData.titre}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="capitalSocial" className="form-label">
                        {t("formulaire:sural:capitalSocial")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="capitalSocial"
                        name="capitalSocial"
                        value={formData.capitalSocial}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="siegeSocial" className="form-label">
                        {t("formulaire:sural:siegeSocial")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="siegeSocial"
                        name="siegeSocial"
                        value={formData.siegeSocial}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="denomination" className="form-label">
                        {t("formulaire:sural:denomination")}
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
                      <label htmlFor="nomGerant" className="form-label">
                        {t("formulaire:sural:nomGerant")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nomGerant"
                        name="nomGerant"
                        value={formData.nomGerant}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <br />
                    <hr />
                    <h5>{t("formulaire:sural:persons")} :</h5>
                    <br />
                    {formData.persons.map((person, index) => (
                      <div key={index}>
                        <div className="mb-3">
                          <label>{t("formulaire:sural:gender")}</label>
                          <select
                            className="form-select"
                            value={person.gender}
                            onChange={(e) =>
                              handlePersonChange(
                                index,
                                "gender",
                                e.target.value
                              )
                            }
                            required
                          >
                            <option value="">
                              {t("formulaire:sural:choose")}
                            </option>
                            <option value="Monsieur">
                              {t("formulaire:sural:monsieur")}
                            </option>
                            <option value="Madame">
                              {t("formulaire:sural:madame")}
                            </option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label>{t("formulaire:sural:nom")}</label>
                          <input
                            type="text"
                            className="form-control"
                            value={person.nom}
                            onChange={(e) =>
                              handlePersonChange(index, "nom", e.target.value)
                            }
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label>{t("formulaire:sural:prénom")}</label>
                          <input
                            type="text"
                            className="form-control"
                            value={person.prénom}
                            onChange={(e) =>
                              handlePersonChange(
                                index,
                                "prénom",
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label>{t("formulaire:sural:adresse")}</label>
                          <input
                            type="text"
                            className="form-control"
                            value={person.adresse}
                            onChange={(e) =>
                              handlePersonChange(
                                index,
                                "adresse",
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label>{t("formulaire:sural:cin")}</label>
                          <input
                            type="text"
                            className="form-control"
                            value={person.cin}
                            onChange={(e) =>
                              handlePersonChange(index, "cin", e.target.value)
                            }
                            required
                          />
                        </div>
                        <br />
                    <hr />
                    <h5>{t("formulaire:Suarl:Article1")}:</h5>
                    <div className="mb-3">
                      <label
                        htmlFor="Article1"
                        className="form-label"
                      ></label>
                      <textarea
                        className="form-control"
                        id="Article1"
                        name="Article1"
                        value={formData.Article1}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <br />
                    <hr />
                    <h5>{t("formulaire:Suarl:Article2")}:</h5>
                    <div className="mb-3">
                      <label
                        htmlFor="Article2"
                        className="form-label"
                      ></label>
                      <textarea
                        className="form-control"
                        id="Article2"
                        name="Article2"
                        value={formData.Article2}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <br />
                    <hr />

                        <div className="mb-3">
                          <label htmlFor="montantApport" className="form-label">
                            {t("formulaire:sural:montantApport")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="montantApport"
                            name="montantApport"
                            value={person.montantApport}
                            onChange={(e) =>
                              handlePersonChange(
                                index,
                                "montantApport",
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="nombreParts" className="form-label">
                            {t("formulaire:sural:nombreParts")}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="nombreParts"
                            name="nombreParts"
                            value={person.nombreParts}
                            onChange={(e) =>
                              handlePersonChange(
                                index,
                                "nombreParts",
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="valeurPart" className="form-label">
                            {t("formulaire:sural:valeurPart")}
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="valeurPart"
                            name="valeurPart"
                            value={person.valeurPart}
                            onChange={(e) =>
                              handlePersonChange(
                                index,
                                "valeurPart",
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>
                        {formData.persons.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemovePerson(index)}
                          >
                            {t("formulaire:sural:removePerson")}
                          </button>
                        )}
                      </div>
                    ))}
                    <div>
                      <button type="button" onClick={handleAddPerson}>
                        {t("formulaire:sural:addPerson")}
                      </button>
                    </div>
                    <br />
                    <hr />
                    <div className="mb-3">
                      <label htmlFor="lieuSignature" className="form-label">
                        {t("formulaire:sural:lieuSignature")}
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
                        {t("formulaire:sural:dateSignature")}
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
                    {errors && (
                      <div className="text-danger">{errors.message}</div>
                    )}
                    <div className="d-grid">
                      <button type="submit" className="btn btn-custom">
                        {t("formulaire:sural:submit")}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <h2>{t("formulaire:sural:successMessage")}</h2>
                  <p>
                    {t("formulaire:sural:viewContract")}
                    <a
                      href={`http://localhost:8080/api/v1/forms/ContratSuralPDF/${formSuccess.form._id}`}
                      target="_blank"
                    >
                      {" "}
                      {t("formulaire:sural:clickHere")}
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

export default FormSural;
