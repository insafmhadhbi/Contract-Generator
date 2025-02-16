import React from "react";
import { Link } from "react-router-dom";
import Title from "../components/Title";
import ContratDot from "../components/ContractDot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const FormContratPersonnePhy = () => {
  const { t } = useTranslation();

  return (
    <div className="form-contrat-personne-morale">
      <div className="back-button-container">
        <Link to="/Contracts" className="back-link">
          <FontAwesomeIcon icon={faAngleLeft} />
          {/* &nbsp; {t("formContratPersonnePhy:back")} */}
        </Link>
      </div>
      <div className="contract-container">
        <div className="content-wrapper">
          <Title title={t("formContratPersonnePhy:contractForms")} />
          <div className="buttons-container">
            <div className="button-wrapper">
              <div></div>
              <div className="subsub-buttons">
                <Link
                  to="/form_DeclarImmRNEPhysique"
                  className="button half-button"
                >
                  <div className="small-text-container">
                    <span className="small-text">
                      <ContratDot />
                      &nbsp; {t("formContratPersonnePhy:immatriculationForm")}
                    </span>
                  </div>
                </Link>

                <Link
                  to="/Contracts/FormContratPersonneMorale"
                  className="button half-button always-visible"
                >
                  {t("formContratPersonnePhy:personneMorale")}
                </Link>
              </div>
            </div>
            <div className="button-wrapper">
              <div className="main-button">{t("formContratPersonnePhy:rentalForm")}</div>
              <div className="sub-buttons">
                <Link to="/formContratLocation" className="button half-button">
                  <div className="small-text-container">
                    <span className="small-text">
                      <ContratDot />
                      &nbsp; {t("formContratPersonnePhy:rentalGeneration")}
                    </span>
                  </div>
                </Link>

                <Link to="/formResLoc" className="button half-button">
                  <div className="small-text-container">
                    <span className="small-text">
                      <ContratDot />
                      &nbsp; {t("formContratPersonnePhy:rentalTermination")}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
            <div className="button-wrapper">
              <div className="main-button">{t("formContratPersonnePhy:updateForm")}</div>
              <div className="sub-buttons">
                <Link
                  to="/form_DeclarModifRNEPhysique"
                  className="button half-button"
                >
                  <div className="small-text-container">
                    <span className="small-text">
                      <ContratDot />
                      &nbsp; {t("formContratPersonnePhy:rnePhysicalUpdate")}
                    </span>
                  </div>
                </Link>
                <Link
                  to="/form_DeclarModifRNESociete"
                  className="button half-button"
                >
                  <div className="small-text-container">
                    <span className="small-text">
                      <ContratDot />
                      &nbsp; {t("formContratPersonnePhy:rneCompanyUpdate")}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
            <div className="button-wrapper">
              <div className="main-button">{t("formContratPersonnePhy:pvForm")}</div>
              <div className="sub-buttons">
                <Link to="/formPVAGOSarl" className="button half-button">
                  <div className="small-text-container">
                    <span className="small-text">
                      <ContratDot />
                      &nbsp; {t("formContratPersonnePhy:pvagoSarl")}
                    </span>
                  </div>
                </Link>

                <Link to="/formPVAGOSural" className="button half-button">
                  <div className="small-text-container">
                    <span className="small-text">
                      <ContratDot />
                      &nbsp; {t("formContratPersonnePhy:pvagoSuarl")}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormContratPersonnePhy;
