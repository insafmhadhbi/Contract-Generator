
import React from "react";
import { Link } from "react-router-dom";
import Title from "../components/Title";
import ContratDot from "../components/ContractDot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const FormesPage = () => {
  const { t } = useTranslation();

  return (
    <div className="contract-container">
      <div className="content-wrapper">
        <Title title={t("formesPage:contractsForms")} />
        <div className="buttons-container">
          <div className="button-wrapper">
            <div className="main-button">{t("formesPage:creationForm")}</div>
            <div className="sub-buttons">
              <Link to="/Contracts/FormContratPersonnePhy" className="button half-button">
                {t("formesPage:personnePhysique")}
              </Link>
              <Link to="/Contracts/FormContratPersonneMorale" className="button half-button">
                {t("formesPage:personneMorale")}
              </Link>
            </div>
          </div>
          <div className="button-wrapper">
            <div className="main-button">{t("formesPage:rentalForm")}</div>
            <div className="sub-buttons">
              <Link to="/formContratLocation" className="button half-button">
                <div className="small-text-container">
                  <span className="small-text">
                    <ContratDot />
                    &nbsp; {t("formesPage:rentalGeneration")}
                  </span>
                </div>
              </Link>

              <Link to="/formResLoc" className="button half-button">
                <div className="small-text-container">
                  <span className="small-text">
                    <ContratDot />
                    &nbsp; {t("formesPage:rentalTermination")}
                  </span>
                </div>
              </Link>
            </div>
          </div>
          <div className="button-wrapper">
            <div className="main-button">{t("formesPage:updateForm")}</div>
            <div className="sub-buttons">
              <Link to="/form_DeclarModifRNEPhysique" className="button half-button">
                <div className="small-text-container">
                  <span className="small-text">
                    <ContratDot />
                    &nbsp; {t("formesPage:rnePhysicalUpdate")}
                  </span>
                </div>
              </Link>
              <Link to="/form_DeclarModifRNESociete" className="button half-button">
                <div className="small-text-container">
                  <span className="small-text">
                    <ContratDot />
                    &nbsp; {t("formesPage:rneCompanyUpdate")}
                  </span>
                </div>
              </Link>
            </div>
          </div>
          <div className="button-wrapper">
            <div className="main-button">{t("formesPage:pvForm")}</div>
            <div className="sub-buttons">
              <Link to="/formPVAGOSarl" className="button half-button">
                <div className="small-text-container">
                  <span className="small-text">
                    <ContratDot />
                    &nbsp; {t("formesPage:pvagoSarl")}
                  </span>
                </div>
              </Link>

              <Link to="/formPVAGOSural" className="button half-button">
                <div className="small-text-container">
                  <span className="small-text">
                    <ContratDot />
                    &nbsp; {t("formesPage:pvagoSuarl")}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormesPage;

