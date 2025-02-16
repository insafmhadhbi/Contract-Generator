
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Button from "./../../components/Button";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const FormSarl = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    titre: "Form",
    siegeSocial: "Monastir",
    capitalSocial: "5000",
    objetSocial: "Commerce de biens immobiliers",
    denomination: "Société Immobilière Tunisienne",
    nombreParts: "5",
    valeurPart: "10",
    Article1:"Il est formé une Société à Responsabilité Limitée régie par le Code des Sociétés Commerciales et par les présents statuts.",
    Article2:"La société a pour objet :\n- Commerce de biens immobiliers.\n- La prise de participation ou d’intérêt dans toutes sociétés ou opérations quelconques par voie de fusion, \n apports,\n souscription, achat de titres et droits sociaux, constitution de sociétés nouvelles ou de toute autre manière.\n- Et généralement toutes opérations commerciales, financières, industrielles, mobilières ou immobilières se\nrattachant directement ou indirectement aux objets ci-dessus ou à tout autre objet similaire ou connexe.",
    persons: [
      {
        gender: "madame",
        nom: "insaf",
        prénom: "B",
        adresse: "ABC",
        cin: "000000",
        montantApport: "50",
        nombreParts: "2",
        minNumeroParts: "1",
        maxNumeroParts: "2",
      },
    ],
    nomGerant: "AB",
    prenomGerant: "CD",
    gerantCIN: "1111",
    lieuSignature: "MONASTIR",
    dateSignature: "",
  });

  const [formSuccess, setFormSuccess] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePersonChange = (index, field, value) => {
    const updatedPersons = [...formData.persons];
    updatedPersons[index][field] = value;
    setFormData({ ...formData, persons: updatedPersons });
  };

  const handleAddPerson = () => {
    setFormData({
      ...formData,
      persons: [
        ...formData.persons,
        {
          gender: "",
          nom: "",
          prénom: "",
          adresse: "",
          cin: "",
          montantApport: "",
          nombreParts: "",
          minNumeroParts: "",
          maxNumeroParts: "",
        },
      ],
    });
  };

  const handleRemovePerson = (index) => {
    const updatedPersons = formData.persons.filter((_, i) => i !== index);
    setFormData({ ...formData, persons: updatedPersons });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/forms/FormSarl`,
        formData
      );

      if (res.data.success) {
        setFormSuccess(res.data.form);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(t("formulaire:sarl:errorMessage"));
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="back-button-container2">
            <Link to="/Contracts" className="back-link">
              <FontAwesomeIcon icon={faAngleLeft} />
            </Link>
          </div>
          <div className="card">
            <div className="card-body">
              {!formSuccess ? (
                <>
                  <h2 className="card-title text-center mb-4">
                    {t("formulaire:sarl:titre")}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="titre" className="form-label">
                        {t("formulaire:sarl:formTitre")}
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
                        {t("formulaire:sarl:capitalSocial")}
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
                      <label htmlFor="objetSocial" className="form-label">
                        {t("formulaire:sarl:objetSocial")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="objetSocial"
                        name="objetSocial"
                        value={formData.objetSocial}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="denomination" className="form-label">
                        {t("formulaire:sarl:denomination")}
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
                      <label htmlFor="nombreParts" className="form-label">
                        {t("formulaire:sarl:nombreParts")}
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="nombreParts"
                        name="nombreParts"
                        value={formData.nombreParts}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="valeurPart">
                        {t("formulaire:sarl:valeurPart")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="valeurPart"
                        name="valeurPart"
                        value={formData.valeurPart}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="siegeSocial" className="form-label">
                        {t("formulaire:sarl:siegeSocial")}
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
                    <br />
                    <h5>{t("formulaire:sarl:associes")}:</h5>
                    <br />
                    {formData.persons.map((person, index) => (
                      <div key={index}>
                        <div className="mb-3">
                          <label>{t("formulaire:sarl:gender")}</label>
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
                              {t("formulaire:sarl:choose")}
                            </option>
                            <option value="Monsieur">
                              {t("formulaire:sarl:monsieur")}
                            </option>
                            <option value="Madame">
                              {t("formulaire:sarl:madame")}
                            </option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label>{t("formulaire:sarl:nom")}</label>
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
                          <label>{t("formulaire:sarl:prénom")}</label>
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
                          <label>{t("formulaire:sarl:adresse")}</label>
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
                          <label>{t("formulaire:sarl:cin")}</label>
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
                    <h5>{t("formulaire:Sarl:Article1")}:</h5>
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
                    <h5>{t("formulaire:Sarl:Article2")}:</h5>
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
                          <label htmlFor="montantApport">
                            {t("formulaire:sarl:montantApport")} :
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
                          <label htmlFor="nombreParts">
                            {t("formulaire:sarl:nombrePartsRecu")} :
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
                          <label htmlFor="minNumeroParts">
                            {t("formulaire:sarl:minNumeroParts")} :
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="minNumeroParts"
                            name="minNumeroParts"
                            value={person.minNumeroParts}
                            onChange={(e) =>
                              handlePersonChange(
                                index,
                                "minNumeroParts",
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="maxNumeroParts">
                            {t("formulaire:sarl:maxNumeroParts")} :
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="maxNumeroParts"
                            name="maxNumeroParts"
                            value={person.maxNumeroParts}
                            onChange={(e) =>
                              handlePersonChange(
                                index,
                                "maxNumeroParts",
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
                            {t("formulaire:sarl:removePerson")}
                          </button>
                        )}
                      </div>
                    ))}
                    <br />
                    <div>
                      <button type="button" onClick={handleAddPerson}>
                        {t("formulaire:sarl:addPerson")}
                      </button>
                    </div>
                    <br />
                    <h5>{t("formulaire:sarl:gerant")}:</h5>
                    <div className="mb-3">
                      <label htmlFor="nomGerant" className="form-label">
                        {t("formulaire:sarl:nomGerant")}
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
                    <div className="mb-3">
                      <label htmlFor="prenomGerant" className="form-label">
                        {t("formulaire:sarl:prenomGerant")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="prenomGerant"
                        name="prenomGerant"
                        value={formData.prenomGerant}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="gerantCIN" className="form-label">
                        {t("formulaire:sarl:gerantCIN")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="gerantCIN"
                        name="gerantCIN"
                        value={formData.gerantCIN}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="lieuSignature" className="form-label">
                        {t("formulaire:sarl:lieuSignature")}
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
                        {t("formulaire:sarl:dateSignature")}
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
                    
                    <br />
                    <button type="submit" className="btn btn-custom">
                      {t("formulaire:sarl:submit")}
                    </button>
                    {errors && (
                      <div className="text-danger">{errors.message}</div>
                    )}
                  </form>
                </>
              ) : (
                <>
                  <h2>{t("formulaire:sarl:successMessage")}</h2>
                  <p>
                    {t("formulaire:sarl:viewContract")}
                    <a
                      href={`${process.env.REACT_APP_API}/api/v1/forms/ContratSarlPDF/${formSuccess._id}`}
                      target="_blank"
                    >
                      {t("formulaire:sarl:clickHere")}
                    </a>
                  </p>{" "}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSarl;
