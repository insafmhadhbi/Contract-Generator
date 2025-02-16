import React from "react";
import { Link } from "react-router-dom";
import Title from "../components/Title";
import ContratDot from "../components/ContractDot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const FormContratPersonneMorale = () => {
  const { t } = useTranslation();

  return (
    <div className="form-contrat-personne-morale">
      <div className="back-button-container">
        <Link to="/Contracts" className="back-link">
          <FontAwesomeIcon icon={faAngleLeft} />
          {/* &nbsp; {t("formContratPersonneMorale:back")} */}
        </Link>
      </div>
      <div className="contract-container">
        <div className="content-wrapper">
          <Title title={t("formContratPersonneMorale:contractForms")} />
          <div className="buttons-container">
            <div className="button-wrapper">
              <div className="subsub-buttons">
                <Link
                  to="/Contracts/FormContratPersonnePhy"
                  className="button half-button"
                >
                  {t("formContratPersonneMorale:personnePhysique")}
                </Link>
                <div className="option-buttons">
                  <Link to="/formSarl" className="button half-button">
                    <div className="small-text-container">
                      <span className="small-text">
                        <ContratDot />
                        &nbsp; {t("formContratPersonneMorale:sarlContractForm")}
                      </span>
                    </div>
                  </Link>
                  <Link to="/formSural" className="button half-button">
                    <div className="small-text-container">
                      <span className="small-text">
                        <ContratDot />
                        &nbsp;{" "}
                        {t("formContratPersonneMorale:suarlContractForm")}
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="button-wrapper">
              <div className="main-button">
                {t("formContratPersonneMorale:rentalForm")}
              </div>
              <div className="sub-buttons">
                <Link to="/formContratLocation" className="button half-button">
                  <div className="small-text-container">
                    <span className="small-text">
                      <ContratDot />
                      &nbsp; {t("formContratPersonneMorale:rentalGeneration")}
                    </span>
                  </div>
                </Link>
                <Link to="/formResLoc" className="button half-button">
                  <div className="small-text-container">
                    <span className="small-text">
                      <ContratDot />
                      &nbsp; {t("formContratPersonneMorale:rentalTermination")}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
            <div className="button-wrapper">
              <div className="main-button">
                {t("formContratPersonneMorale:updateForm")}
              </div>
              <div className="sub-buttons">
                <Link
                  to="/form_DeclarModifRNEPhysique"
                  className="button half-button"
                >
                  <div className="small-text-container">
                    <span className="small-text">
                      <ContratDot />
                      &nbsp; {t("formContratPersonneMorale:rnePhysicalUpdate")}
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
                      &nbsp; {t("formContratPersonneMorale:rneCompanyUpdate")}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
            <div className="button-wrapper">
              <div className="main-button">
                {t("formContratPersonneMorale:pvForm")}
              </div>
              <div className="sub-buttons">
                <Link to="/formPVAGOSarl" className="button half-button">
                  <div className="small-text-container">
                    <span className="small-text">
                      <ContratDot />
                      &nbsp; {t("formContratPersonneMorale:pvagoSarl")}
                    </span>
                  </div>
                </Link>
                <Link to="/formPVAGOSural" className="button half-button">
                  <div className="small-text-container">
                    <span className="small-text">
                      <ContratDot />
                      &nbsp; {t("formContratPersonneMorale:pvagoSuarl")}
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

export default FormContratPersonneMorale;
