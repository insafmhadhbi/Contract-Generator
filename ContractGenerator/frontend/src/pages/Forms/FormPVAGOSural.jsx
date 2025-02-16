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

const FormPVAGOSural = () => {
  const { t } = useTranslation();


  const [formData, setFormData] = useState({
    nomSociet: "Example Company",
    capital: "10000",
    adresse: "123 Example Street",
    MF: "A123",
    datePva: "2024-04-15",
    hour: "01",
    minute: "",

    hourEnd: "01",
    minuteEnd: "",

   
    genre: "Madame",
    nom: "Dupont",
    prenom: "Jean",
    parts: 100,

    ordreDuJour:
      "-Rapport de la gérance sur l'exercice .....\n-Approbation des comptes\n-Quitus définitif à la gérante pour la gestion .....\n-Affectation du résultat de l'exercice clos le .....",
    documentsSoumis:
      "- Statuts de la société \n- L'inventaire\n- le bilan et les comptes annexes arrêtés au 31/12/.....\n-Rapport de la Gérance et le texte de résolution soumise à l'approbation de l'assemblée ",

    premiereResolution:
      "Après avoir entendu la lecture du rapport de la gérance sur l'exercice s'étalant du 1er janvier au 31 décembre ........, l'associée approuve sans réserve aucune ce rapport ainsi que le bilan, Etat de résultat, Etat de flux, et annexes. ",
    deuxiemeResolution:
      "L'assemblée Générale des associés donne quitus entier, définitif et sans réserve au gérante Madame.....  pour la gestion de l'exercice ......",
    troisiemeResolution:
      "L'assemblée Générale des associés décide d'affecter le résultat bénéficiaire de l'année 2023 comme suit :",

    dateReporte: "14/05/2024",
    montantDnt1: "100",
    beneficeExercice: "2023",
    montantDnt2: "10000000",
    montantDnt3: "60",
    montantEuro3: "20",
    montantDnt4: "60",
    montantEuro4: "20",
    resolutions: [],
  });
  const [errors, setErrors] = useState({});
  const [formSuccess, setFormSuccess] = useState(null);
  const dateInWords = numberToWord(formData.datePva);
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
        { description: "", adoptee: false },
      ],
    });
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

  const handleRemoveResolution = (index) => {
    const updatedResolutions = formData.resolutions.filter(
      (resolution, i) => i !== index
    );
    setFormData({ ...formData, resolutions: updatedResolutions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/forms/FormPVAGOSural`,
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
      toast.error(t("formulaire:pvSociete:successMessage"));
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
                    {t("formulaire:pvSuarl:titre")}
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="nomSociet" className="form-label">
                        {t("formulaire:pvSuarl:nomSociet")}
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
                        {t("formulaire:pvSuarl:capital")}
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
                      <label htmlFor="adresse" className="form-label">
                        {t("formulaire:pvSuarl:adresse")}
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
                      <label htmlFor="MF" className="form-label">
                        {t("formulaire:pvSuarl:MF")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="MF"
                        name="MF"
                        value={formData.MF}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="datePva" className="form-label">
                        {t("formulaire:pvSuarl:datePva")}
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
                        {t("formulaire:pvSuarl:hour")}
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
                        {t("formulaire:pvSuarl:minute")}
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

                    <br />
                    <hr />
                    <h5>{t("formulaire:pvSuarl:ordreDuJour")}:</h5>
                    <div className="mb-3">
                      <label
                        htmlFor="ordreDuJour"
                        className="form-label"
                      ></label>
                      <textarea
                        className="form-control"
                        id="ordreDuJour"
                        name="ordreDuJour"
                        value={formData.ordreDuJour}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <h5>{t("formulaire:pvSuarl:genre")}:</h5>
                    <div className="mb-3">
                      <label htmlFor="genre" className="form-label">
                        {t("formulaire:pvSuarl:genre")}
                      </label>
                      <select
                        className="form-select"
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        required
                      >
                        <option value="">
                          {t("formulaire:pvSuarl:choisir")}
                        </option>
                        <option value="Monsieur">
                          {t("formulaire:pvSuarl:monsieur")}
                        </option>
                        <option value="Madame">
                          {t("formulaire:pvSuarl:madame")}
                        </option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="nom" className="form-label">
                        {t("formulaire:pvSuarl:nom")}
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
                        {t("formulaire:pvSuarl:prenom")}
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
                      <label htmlFor="parts" className="form-label">
                        {t("formulaire:pvSuarl:parts")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="parts"
                        name="parts"
                        value={formData.parts}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <br />
                    <hr />
                    <h5>{t("formulaire:pvSuarl:documentsSoumis")}:</h5>
                    <div className="mb-3">
                      <label
                        htmlFor="documentsSoumis"
                        className="form-label"
                      ></label>
                      <textarea
                        className="form-control"
                        id="documentsSoumis"
                        name="documentsSoumis"
                        value={formData.documentsSoumis}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <br />
                    <hr />

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
                        rows={5}
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
                        id="deuxiemeResolution"
                        name="deuxiemeResolution"
                        value={formData.deuxiemeResolution}
                        onChange={handleChange}
                        required
                        rows={5}
                      />
                    </div>
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
                        value={formData.troisiemeResolution}
                        onChange={handleChange}
                        required
                        rows={5}
                      />
                    </div>

                    <div
                      className="mb-3"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <label
                        htmlFor="dateReporte"
                        className="form-label"
                        style={{ marginRight: "10px" }}
                      >
                        - Résultat Reporté au
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="dateReporte"
                        name="dateReporte"
                        value={formData.dateReporte}
                        onChange={handleChange}
                        required
                        style={{ width: "auto" }}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="montantDnt1" className="form-label">
                        Montant en Dinars
                      </label>

                      <input
                        type="Number"
                        className="form-control"
                        id="montantDnt1"
                        name="montantDnt1"
                        value={formData.montantDnt1}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div
                      className="mb-3"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <label
                        htmlFor="beneficeExercice"
                        className="form-label"
                        style={{ marginRight: "10px" }}
                      >
                        - Bénéfice de l'exercice
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="beneficeExercice"
                        name="beneficeExercice"
                        value={formData.beneficeExercice}
                        onChange={handleChange}
                        required
                        style={{ width: "auto" }}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="montantDnt2" className="form-label">
                        Montant en Dinars
                      </label>

                      <input
                        type="Number"
                        className="form-control"
                        id="montantDnt2"
                        name="montantDnt2"
                        value={formData.montantDnt2}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <p>- Dividende à distribuer Brut</p>
                    <br></br>
                    <div className="mb-3">
                      <label htmlFor="montantDnt3" className="form-label">
                        Montant en Dinars
                      </label>

                      <input
                        type="Number"
                        className="form-control"
                        id="montantDnt3"
                        name="montantDnt3"
                        value={formData.montantDnt3}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  
                    {/* <h5>{t("formulaire:pvSuarl:resolutions")}:</h5>
                    {formData.resolutions.map((resolution, index) => (
                      <div key={index}>
                        <div className="mb-3">
                          <label>
                            {t("formulaire:pvSuarl:resolutions")} {index + 1}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={resolution.description}
                            onChange={(e) =>
                              handleResolutionChange(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>
                        <div className="mb-3 form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={`adoptee${index}`}
                            checked={resolution.adoptee}
                            onChange={(e) =>
                              handleResolutionChange(
                                index,
                                "adoptee",
                                e.target.checked
                              )
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`adoptee${index}`}
                          >
                            {t("formulaire:pvSuarl:adoptee")}
                          </label>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveResolution(index)}
                        >
                          {t("formulaire:pvSuarl:supprimerResolution")}
                        </button>
                      </div>
                    ))} */}
                    <br />
                    <button type="button" onClick={handleAddResolution}>
                      {t("formulaire:pvSuarl:ajouterResolution")}
                    </button>

                    <div className="d-grid">
                      <button type="submit" className="btn btn-custom">
                        {t("formulaire:pvSuarl:submit")}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <h2>{t("formulaire:pvSuarl:successMessage")}</h2>
                  <p>
                    {t("formulaire:pvSuarl:pdfMessage")}
                    <a
                      href={`http://localhost:8080/api/v1/forms/ContratPVAGOSuarlPDF/${formSuccess.form._id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("formulaire:pvSuarl:clickHere")}
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

export default FormPVAGOSural;
