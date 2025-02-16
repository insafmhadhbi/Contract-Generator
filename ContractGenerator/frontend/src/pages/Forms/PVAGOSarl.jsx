import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const numberToWord = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);

  const yearsInWords = [
    "",
    "un",
    "deux",
    "trois",
    "quatre",
    "cinq",
    "six",
    "sept",
    "huit",
    "neuf",
  ];
  const tensInWords = [
    "",
    "dix",
    "vingt",
    "trente",
    "quarante",
    "cinquante",
    "soixante",
    "soixante-dix",
    "quatre-vingt",
    "quatre-vingt-dix",
  ];
  const teensInWords = [
    "dix",
    "onze",
    "douze",
    "treize",
    "quatorze",
    "quinze",
    "seize",
    "dix-sept",
    "dix-huit",
    "dix-neuf",
  ];
  const monthsInWords = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  let yearInWords = yearsInWords[Math.floor(year / 1000)];
  if (year % 1000 === 0) {
    yearInWords += " mille";
  } else {
    const hundreds = Math.floor((year % 1000) / 100);
    const tens = Math.floor((year % 100) / 10);
    const ones = year % 10;
    yearInWords += ` ${yearsInWords[hundreds]} mille`;
    if (tens > 1) {
      yearInWords += ` ${tensInWords[tens]}`;
      if (ones > 0) {
        yearInWords += `-${yearsInWords[ones]}`;
      }
    } else if (tens === 1) {
      yearInWords += ` ${teensInWords[ones]}`;
    } else {
      if (ones > 0) {
        yearInWords += `-${yearsInWords[ones]}`;
      }
    }
  }

  const monthInWords = monthsInWords[month - 1];

  let dayInWords = "";
  if (day >= 20) {
    const tens = Math.floor(day / 10);
    const ones = day % 10;
    dayInWords += tensInWords[tens];
    if (ones > 0) {
      dayInWords += `-${yearsInWords[ones]}`;
    }
  } else if (day >= 10) {
    dayInWords = teensInWords[day - 10];
  } else {
    dayInWords = yearsInWords[day];
  }

  return `L’an ${yearInWords}, le  ${dayInWords} ${monthInWords} `;
};
const numberToWordTime = (num) => {
  const numbersInWords = [
    "",
    "une",
    "deux",
    "trois",
    "quatre",
    "cinq",
    "six",
    "sept",
    "huit",
    "neuf",
    "dix",
    "onze",
    "douze",
    "treize",
    "quatorze",
    "quinze",
    "seize",
    "dix-sept",
    "dix-huit",
    "dix-neuf",
  ];

  const tensInWords = ["", "dix", "vingt", "trente", "quarante", "cinquante"];

  if (num < 20) {
    return numbersInWords[num];
  } else {
    const tens = Math.floor(num / 10);
    const ones = num % 10;
    if (ones === 0) {
      return tensInWords[tens];
    } else {
      return `${tensInWords[tens]}-${numbersInWords[ones]}`;
    }
  }
};

const FormPVAGOSarl = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    nomSociet: "Example Company",
    capital: "10000",
    nbParts: "5000",
    adresse: "123 Example Street",
    matriculeFiscale: "123456789",
    datePva: "2024-04-15",
    hour: "01",
    minute: "",

    hourEnd: "01",
    minuteEnd: "",
    dateClotureExercice: "2024-04-04",
    participants: [
      {
        genre: "Monsieur",
        type: "gérant et associé détenant ",
        nom: "A",
        prenom: "b",
        parts: "5",
        partEuro: 500,
        partDinars: 1000,
      },
    ],
    But: [{ content: "contrat" }],
    presidentAssemblee: [
      { presidentGenre: "Monsieur", presidentNom: "Med", presidentPrenom: "A" },
    ],
    documents:
      "- Les lettres de convocation;\n- La feuille de présence;\n- Les états financiers de l'exercice 2023;\n- L'inventaire des biens de la société;\n- Les rapports de gestion de l'exercice 2023;\n- Le rapport du commissaire aux comptes de l’exercice 2023;\n- Le rapport spécial du commissaire aux comptes sur les conventions réglementées;\n- Le texte des résolutions proposées.",
    documentsSoumis:
      "- Les lettres de convocation;\n- La feuille de présence;\n- Les états financiers de l'exercice 2023;\n- L'inventaire des biens de la société;\n- Les rapports de gestion de l'exercice 2023;\n- Le rapport du commissaire aux comptes de l’exercice 2023;\n- Le rapport spécial du commissaire aux comptes sur les conventions réglementées;\n- Le texte des résolutions proposées.",
    premiereResolution:
      "Les associés ratifient le mode de convocation de l'assemblée et déclarent qu'ils ne portent nullement atteinte à leurs intérêts. ",
    deuxiemeResolution:
      "Après lecture du rapport de gestion de la gérance, les associés approuvent les états financiers des exercices 2023 tels qu'ils leur sont présentés.",
    totalBilan: 4444,
    resultatBeneficiaire: 100,
    troisiemeResolution:
      "Ayant assuré la gestion de la société au titre de l'exercice 2023, l'Assemblée donne quitus entier, définitif et irrévocable au gérant ",
    nomGerant: "b",
    dividendesDinars: "10", // Field for dividends in dinars
    adresseAssemblee: "Monastir",
    resultatExercice: "Résultat de l'exercice 2023",
    resultatExerciceDinars: 1619.558, // Fill with example value

    soldeDisponibleDinars: 1619.558, // Fill with example value
    dividendesBrutsDinars: 1619.558, // Fill with example value
    retenueSourceDinars: 161.956,
    dividendesNetDinars: 1457.602,
    additionalEntries: [],
  });

  const handlePresidentChange = (index, field, value) => {
    setFormData((prevFormData) => {
      const updatedPresidents = [...prevFormData.presidentAssemblee];
      updatedPresidents[index][field] = value;
      return { ...prevFormData, presidentAssemblee: updatedPresidents };
    });
  };

  const removeButField = (indexToRemove) => {
    setFormData((prevState) => ({
      ...prevState,
      But: prevState.But.filter((item, index) => index !== indexToRemove),
    }));
  };
  const handleButChange = (index, value) => {
    const updatedBut = [...formData.But];
    updatedBut[index] = { content: value };
    setFormData({ ...formData, But: updatedBut });
  };

  const handleDeleteEntry = (index) => {
    const updatedEntries = [...formData.additionalEntries];
    updatedEntries.splice(index, 1);
    setFormData({ ...formData, additionalEntries: updatedEntries });
  };

  const addButField = () => {
    setFormData({
      ...formData,
      But: [...formData.But, { content: "" }], // Add another empty placeholder
    });
  };

  const handleAddEntry = () => {
    setFormData({
      ...formData,
      additionalEntries: [
        ...formData.additionalEntries,
        { type: "", euros: "", dinars: "" },
      ],
    });
  };
  const handleParticipantChange = (index, field, value) => {
    const updatedParticipants = [...formData.participants];
    updatedParticipants[index][field] = value;
    setFormData({ ...formData, participants: updatedParticipants });
  };

  const handleAddParticipant = () => {
    setFormData({
      ...formData,
      participants: [
        ...formData.participants,
        { genre: "", nom: "", prenom: "", parts: "" },
      ],
    });
  };

  const handleRemoveParticipant = (index) => {
    const updatedParticipants = formData.participants.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, participants: updatedParticipants });
  };

  const handleHourChange = (e) => {
    setFormData({ ...formData, hour: parseInt(e.target.value, 10) });
  };

  const handleMinuteChange = (e) => {
    setFormData({ ...formData, minute: parseInt(e.target.value, 10) });
  };

  const handleHourEndChange = (e) => {
    setFormData({ ...formData, hourEnd: parseInt(e.target.value, 10) });
  };

  const handleMinuteEndChange = (e) => {
    setFormData({ ...formData, minuteEnd: parseInt(e.target.value, 10) });
  };

  const dateInWords = numberToWord(formData.datePva);

  const [errors, setErrors] = useState({});
  const [formSuccess, setFormSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResolutionChange = (index, field, value) => {
    const updatedResolutions = [...formData.resolutions];
    updatedResolutions[index][field] = value;
    setFormData({ ...formData, resolutions: updatedResolutions });
  };

  const handleAddResolution = () => {
    setFormData({
      ...formData,
      resolutions: [
        ...formData.resolutions,
        { description: "", adoptee: false, details: "" },
      ],
    });
  };

  const handleRemoveResolution = (index) => {
    const updatedResolutions = formData.resolutions.filter(
      (resolution, i) => i !== index
    );
    setFormData({ ...formData, resolutions: updatedResolutions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert the date to words
    const dateInWords = numberToWord(formData.datePva);

    // Add the converted date to formData
    const updatedFormData = { ...formData, dateInWords };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/forms/FormPVAGOSarl`,
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
      toast.error("formulaire:pvSarl:successMessage");
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
                    {t("formulaire:pvSociete:titre")}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="nomSociet" className="form-label">
                        {t("formulaire:pvSociete:nomSociet")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nomSociet"
                        name="nomSociet"
                        value={formData.nomSociet}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="capital" className="form-label">
                        {t("formulaire:pvSociete:capital")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="capital"
                        name="capital"
                        value={formData.capital}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="nbParts" className="form-label">
                        Nombre des parts totale
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nbParts"
                        name="nbParts"
                        value={formData.nbParts}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="adresse" className="form-label">
                        {t("formulaire:pvSociete:adresse")}
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
                      <label htmlFor="matriculeFiscale" className="form-label">
                        {t("formulaire:pvSociete:matriculeFiscale")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="matriculeFiscale"
                        name="matriculeFiscale"
                        value={formData.matriculeFiscale}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="datePva" className="form-label">
                        {t("formulaire:pvSociete:datePva")}
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="datePva"
                        name="datePva"
                        value={formData.datePva}
                        onChange={handleChange}
                        required
                      />
                      <div>{dateInWords}</div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="hour" className="form-label">
                        {t("formulaire:pvSociete:hour")}
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="hour"
                        name="hour"
                        value={formData.hour}
                        onChange={handleHourChange}
                        min="0"
                        max="23"
                        required
                      />
                      <p>{numberToWordTime(formData.hour)}</p>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="minute" className="form-label">
                        {t("formulaire:pvSociete:minute")}
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="minute"
                        name="minute"
                        value={formData.minute}
                        onChange={handleMinuteChange}
                        min="1"
                        max="59"
                      />
                      <p>{numberToWordTime(formData.minute)}</p>
                    </div>

                    <h5>Heure du fin de la réunion.</h5>
                    <div className="mb-3">
                      <label htmlFor="hourEnd" className="form-label">
                        Heure
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="hourEnd"
                        name="hourEnd"
                        value={formData.hourEnd}
                        onChange={handleHourEndChange}
                        min="0"
                        max="23"
                        required
                      />
                      <p>{numberToWordTime(formData.hourEnd)}</p>{" "}
                      {/* Display the hour in words */}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="minuteEnd" className="form-label">
                        Minute
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="minuteEnd"
                        name="minuteEnd"
                        value={formData.minuteEnd}
                        onChange={handleMinuteEndChange}
                        min="1"
                        max="59"
                      />
                      <p>{numberToWordTime(formData.minuteEnd)}</p>{" "}
                      {/* Display the minute in words */}
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="dateClotureExercice"
                        className="form-label"
                      >
                        Date de clôture de l'exercice
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="dateClotureExercice"
                        name="dateClotureExercice"
                        value={formData.dateClotureExercice}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="but" className="form-label">
                        {t("formulaire:pvSociete:ordreDuJour")}
                      </label>
                      {formData.But.map((item, index) => (
                        <div key={index} className="input-group mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id={`But[${index}].content`}
                            name={`But[${index}].content`}
                            value={item.content}
                            onChange={(e) =>
                              handleButChange(index, e.target.value)
                            }
                            placeholder={`But ${index + 1}`}
                            required
                          />
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => removeButField(index)}
                          >
                            {t("formulaire:pvSociete:removeBut")}
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addButField}
                        className="btn btn-sm btn-secondary"
                      >
                        {t("formulaire:pvSociete:addBut")}
                      </button>
                    </div>
                    <br />
                    <hr />
                    <h5>{t("formulaire:pvSociete:associé")}:</h5>
                    <div>
                      {formData.participants.map((participant, index) => (
                        <div key={index}>
                          <div className="mb-3">
                            <label>{t("formulaire:pvSociete:genre")}</label>
                            <select
                              className="form-select"
                              value={participant.genre}
                              onChange={(e) =>
                                handleParticipantChange(
                                  index,
                                  "genre",
                                  e.target.value
                                )
                              }
                              required
                            >
                              <option value="">
                                {t("formulaire:pvSociete:choose")}
                              </option>
                              <option value="Monsieur">
                                {t("formulaire:pvSociete:monsieur")}
                              </option>
                              <option value="Madame">
                                {t("formulaire:pvSociete:madame")}
                              </option>
                            </select>
                          </div>

                          <div className="mb-3">
                            <label>Type:</label>
                            <br></br>
                            <select
                              className="form-select"
                              value={participant.type}
                              onChange={(e) =>
                                handleParticipantChange(
                                  index,
                                  "type",
                                  e.target.value
                                )
                              }
                              required
                            >
                              <option value="">_____</option>
                              <option value="gérant et associé détenant ">
                                gérant et associé détenant{" "}
                              </option>
                              <option value="associée détenant ">
                                associée détenant{" "}
                              </option>
                            </select>
                          </div>

                          <div className="mb-3">
                            <label>{t("formulaire:pvSociete:nom")}</label>
                            <input
                              type="text"
                              className="form-control"
                              value={participant.nom}
                              onChange={(e) =>
                                handleParticipantChange(
                                  index,
                                  "nom",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>

                          <div className="mb-3">
                            <label>{t("formulaire:pvSociete:prenom")}</label>
                            <input
                              type="text"
                              className="form-control"
                              value={participant.prenom}
                              onChange={(e) =>
                                handleParticipantChange(
                                  index,
                                  "prenom",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>

                          <div className="mb-3">
                            <label>{t("formulaire:pvSociete:parts")}</label>
                            <input
                              type="number"
                              className="form-control"
                              value={participant.parts}
                              onChange={(e) =>
                                handleParticipantChange(
                                  index,
                                  "parts",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>

                          <div className="mb-3">
                            <label>Parts en Euros</label>
                            <input
                              type="number"
                              className="form-control"
                              value={participant.partEuro}
                              onChange={(e) =>
                                handleParticipantChange(
                                  index,
                                  "partEuro",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label>Parts en Dinars</label>
                            <input
                              type="number"
                              className="form-control"
                              value={participant.partDinars}
                              onChange={(e) =>
                                handleParticipantChange(
                                  index,
                                  "partDinars",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveParticipant(index)}
                          >
                            {t("formulaire:pvSociete:removeParticipant")}
                          </button>
                        </div>
                      ))}

                      <br />
                      <button type="button" onClick={handleAddParticipant}>
                        {t("formulaire:pvSociete:addParticipant")}
                      </button>
                    </div>
                    <br />
                    <hr />
                    <h5>{t("formulaire:pvSociete:présidentDeAssemblée")}:</h5>
                    <div>
                      {formData.presidentAssemblee.map((president, index) => (
                        <div key={index}>
                          <div className="mb-3">
                            <label
                              htmlFor={`presidentGenre_${index}`}
                              className="form-label"
                            >
                              {t("formulaire:pvSociete:genre")}
                            </label>
                            <select
                              className="form-select"
                              id={`presidentGenre_${index}`}
                              name={`presidentGenre_${index}`}
                              value={president.presidentGenre}
                              onChange={(e) =>
                                handlePresidentChange(
                                  index,
                                  "presidentGenre",
                                  e.target.value
                                )
                              }
                              required
                            >
                              <option value="">
                                {t("formulaire:pvSociete:choose")}
                              </option>
                              <option value="Monsieur">
                                {t("formulaire:pvSociete:monsieur")}
                              </option>
                              <option value="Madame">
                                {t("formulaire:pvSociete:madame")}
                              </option>
                            </select>
                          </div>

                          <div className="mb-3">
                            <label
                              htmlFor={`presidentNom_${index}`}
                              className="form-label"
                            >
                              {t("formulaire:pvSociete:nomPresident")}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id={`presidentNom_${index}`}
                              name={`presidentNom_${index}`}
                              value={president.presidentNom}
                              onChange={(e) =>
                                handlePresidentChange(
                                  index,
                                  "presidentNom",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor={`presidentPrenom_${index}`}
                              className="form-label"
                            >
                              {t("formulaire:pvSociete:prenomPresident")}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id={`presidentPrenom_${index}`}
                              name={`presidentPrenom_${index}`}
                              value={president.presidentPrenom}
                              onChange={(e) =>
                                handlePresidentChange(
                                  index,
                                  "presidentPrenom",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="documentsSoumis" className="form-label">
                        {t("formulaire:pvSociete:documentsSoumis")}
                      </label>
                      <textarea
                        className="form-control"
                        id="documentsSoumis"
                        name="documentsSoumis"
                        value={formData.documentsSoumis}
                        onChange={handleChange}
                        required
                        rows={8}
                      />
                    </div>
                    <hr></hr>
                    <br></br>
                    <h5>PREMIERE RESOLUTION</h5>
                    <div className="mb-3">
                      <label
                        htmlFor="premiereResolution"
                        className="form-label"
                      ></label>
                      <textarea
                        className="form-control"
                        id="premiereResolution"
                        name="premiereResolution"
                        value={formData.premiereResolution}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <h5>DEUXIEME RESOLUTION</h5>
                    <div className="mb-3">
                      <label
                        htmlFor="deuxiemeResolution"
                        className="form-label"
                      ></label>
                      <textarea
                        className="form-control"
                        id="premiereResolution"
                        name="premiereResolution"
                        value={formData.deuxiemeResolution}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="totalBilan" className="form-label">
                        Total du Bilan (Dinars)
                      </label>
                      <input
                        type="number"
                        step="any"
                        className="form-control"
                        id="totalBilan"
                        name="totalBilan"
                        value={formData.totalBilan}
                        onChange={handleChange}
                        placeholder="Total du Bilan"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="resultatBeneficiaire"
                        className="form-label"
                      >
                        {t("formulaire:pvSociete:resultatBeneficiaire")}
                      </label>
                      <input
                        type="number"
                        step="any"
                        className="form-control"
                        id="resultatBeneficiaire"
                        name="resultatBeneficiaire"
                        value={formData.resultatBeneficiaire}
                        onChange={handleChange}
                        placeholder={t(
                          "formulaire:pvSociete:resultatBeneficiaire"
                        )}
                        required
                      />
                    </div>

                    <hr></hr>
                    <h5>TROISIEME RESOLUTION</h5>
                    <div className="mb-3">
                      <label
                        htmlFor="troisiemeResolution"
                        className="form-label"
                      ></label>
                      <textarea
                        className="form-control"
                        id="troisiemeResolution"
                        name="troisiemeResolution"
                        value={formData.deuxiemeResolution}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <hr />
                    <h5>{t("formulaire:pvSociete:deuxiemeResolution")}</h5>
                    <div className="mb-3">
                      <label htmlFor="totalBilan" className="form-label">
                        {t("formulaire:pvSociete:totalBilan")}
                      </label>
                      <input
                        type="number"
                        step="any"
                        className="form-control"
                        id="totalBilan"
                        name="totalBilan"
                        value={formData.totalBilan}
                        onChange={handleChange}
                        placeholder={t("formulaire:pvSociete:totalBilan")}
                        required
                      />
                    </div>

                    <hr />
                    <h5>{t("formulaire:pvSociete:troisiemeResolution")}</h5>
                    <div className="mb-3">
                      <label htmlFor="nomGerant" className="form-label">
                        {t("formulaire:pvSociete:nomGerant")}
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

                    <h5>{t("formulaire:pvSociete:cinquiemeResolution")}</h5>
                   
                    <div className="mb-3">
                      <label htmlFor="dividendesDinars" className="form-label">
                        {t("formulaire:pvSociete:dividendesDinars")}
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="dividendesDinars"
                        name="dividendesDinars"
                        value={formData.dividendesDinars}
                        onChange={handleChange}
                        placeholder={t("formulaire:pvSociete:dividendesDinars")}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="adresseAssemblee" className="form-label">
                        {t("formulaire:pvSociete:adresseAssemblee")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="adresseAssemblee"
                        name="adresseAssemblee"
                        value={formData.adresseAssemblee}
                        onChange={handleChange}
                        placeholder={t("formulaire:pvSociete:adresseAssemblee")}
                        required
                      />
                    </div>

                    <hr></hr>
                    <h5>RESULTAT REPORT A NOUVEAU n-1</h5>
                    <div className="mb-3">
                      <label
                        htmlFor="resultatExercice"
                        className="form-label"
                      ></label>
                      <input
                        type="text"
                        className="form-control"
                        id="resultatExercice"
                        name="resultatExercice"
                        value={formData.resultatExercice}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <hr />
                    <h5>{t("formulaire:pvSociete:resultatReportANouveau")}</h5>

                    <div className="mb-3">
                      <label
                        htmlFor="resultatExerciceDinars"
                        className="form-label"
                      >
                        {t("formulaire:pvSociete:resultatExerciceDinars")}
                      </label>
                      <input
                        type="number"
                        step="any"
                        className="form-control"
                        id="resultatExerciceDinars"
                        name="resultatExerciceDinars"
                        value={formData.resultatExerciceDinars}
                        onChange={handleChange}
                        placeholder={t(
                          "formulaire:pvSociete:resultatExerciceDinars"
                        )}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="soldeDisponibleDinars"
                        className="form-label"
                      >
                        {t("formulaire:pvSociete:soldeDisponibleDinars")}
                      </label>
                      <input
                        type="number"
                        step="any"
                        className="form-control"
                        id="soldeDisponibleDinars"
                        name="soldeDisponibleDinars"
                        value={formData.soldeDisponibleDinars}
                        onChange={handleChange}
                        placeholder={t(
                          "formulaire:pvSociete:soldeDisponibleDinars"
                        )}
                        required
                      />
                    </div>

                   

                    <div className="mb-3">
                      <label
                        htmlFor="dividendesBrutsDinars"
                        className="form-label"
                      >
                        {t("formulaire:pvSociete:dividendesBrutsDinars")}
                      </label>
                      <input
                        type="number"
                        step="any"
                        className="form-control"
                        id="dividendesBrutsDinars"
                        name="dividendesBrutsDinars"
                        value={formData.dividendesBrutsDinars}
                        onChange={handleChange}
                        placeholder={t(
                          "formulaire:pvSociete:dividendesBrutsDinars"
                        )}
                        required
                      />
                    </div>

                   

                    <div className="mb-3">
                      <label
                        htmlFor="retenueSourceDinars"
                        className="form-label"
                      >
                        {t("formulaire:pvSociete:retenueSourceDinars")}
                      </label>
                      <input
                        type="number"
                        step="any"
                        className="form-control"
                        id="retenueSourceDinars"
                        name="retenueSourceDinars"
                        value={formData.retenueSourceDinars}
                        onChange={handleChange}
                        placeholder={t(
                          "formulaire:pvSociete:retenueSourceDinars"
                        )}
                        required
                      />
                    </div>

                    

                    <div className="mb-3">
                      <label
                        htmlFor="dividendesNetDinars"
                        className="form-label"
                      >
                        {t("formulaire:pvSociete:dividendesNetDinars")}
                      </label>
                      <input
                        type="number"
                        step="any"
                        className="form-control"
                        id="dividendesNetDinars"
                        name="dividendesNetDinars"
                        value={formData.dividendesNetDinars}
                        onChange={handleChange}
                        placeholder={t(
                          "formulaire:pvSociete:dividendesNetDinars"
                        )}
                        required
                      />
                    </div>
                    <h6>{t("formulaire:pvSociete:valeurParts")}</h6>
                    {formData.additionalEntries.map((entry, index) => (
                      <div key={index} className="mb-3">
                        <p>
                          {t("formulaire:pvSociete:associé")} {index + 1}
                        </p>
                        <div className="row">
                          <div className="col-md-4">
                            <label htmlFor={`type${index}`}>
                              <input
                                type="text"
                                className="form-control"
                                id={`type${index}`}
                                name={`type${index}`}
                                value={entry.type}
                                onChange={(event) => handleChange(index, event)}
                              />
                            </label>
                          </div>
                          <div className="col-md-4">
                            <label htmlFor={`euros${index}`}>
                              {t("formulaire:pvSociete:valeurEnEuros")}
                              <input
                                type="number"
                                className="form-control"
                                id={`euros${index}`}
                                name={`euros${index}`}
                                value={entry.euros}
                                onChange={(event) => handleChange(index, event)}
                              />
                            </label>
                          </div>
                          <div className="col-md-4">
                            <label htmlFor={`dinars${index}`}>
                              {t("formulaire:pvSociete:valeurEnDinars")}
                              <input
                                type="number"
                                className="form-control"
                                id={`dinars${index}`}
                                name={`dinars${index}`}
                                value={entry.dinars}
                                onChange={(event) => handleChange(index, event)}
                              />
                            </label>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn btn-outline-danger mt-2"
                          onClick={() => handleDeleteEntry(index)}
                        >
                          -
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={handleAddEntry}
                      className="btn btn-sm btn-secondary"
                    >
                      +{" "}
                    </button>
                    <br />
                    <br />
                    <div className="d-grid">
                      <button type="submit" className="btn btn-custom">
                        {t("formulaire:pvSociete:submit")}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <h2>{t("formulaire:pvSociete:successMessage")}</h2>
                  <p>
                    {t("formulaire:pvSociete:pdfMessage")}{" "}
                    <a
                      href={`http://localhost:8080/api/v1/forms/ContratPVAGOSarlPDF/${formSuccess.form._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("formulaire:pvSociete:clickHere")}
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

export default FormPVAGOSarl;
