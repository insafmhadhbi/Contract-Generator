import React from "react";
import { Link } from "react-router-dom";
import Title from "../components/Title";
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
              <Link
                to="/Contracts/CreatContract/PersonPhysique"
                className="button half-button"
              >
                {t("formesPage:personnePhysique")}
              </Link>
              <Link
                to="/Contracts/CreatContract/PersonneMoral"
                className="button half-button"
              >
                {t("formesPage:personneMorale")}
              </Link>
            </div>
          </div>
          <div className="button-wrapper">
            <div className="main-button">{t("formesPage:rentalForm")}</div>
            <div className="sub-buttons">
              <Link
                to="/Contracts/FormLocation/Location"
                className="button half-button"
              >
                {t("formesPage:location")}
              </Link>
              <Link
                to="/Contracts/FormLocation/Resiliation"
                className="button half-button"
              >
                {t("formesPage:resiliation")}
              </Link>
            </div>
          </div>
          <div className="button-wrapper">
            <div className="main-button">{t("formesPage:updateForm")}</div>
            <div className="sub-buttons">
              <Link
                to="/Contracts/FormMaj/RneModificationPhysique"
                className="button half-button"
              >
                {t("formesPage:rneModificationPhysique")}
              </Link>
              <Link
                to="/Contracts/FormMaj/RneModificationMoral"
                className="button half-button"
              >
                {t("formesPage:rneModificationMorale")}
              </Link>
            </div>
          </div>
          <div className="button-wrapper">
            <div className="main-button">{t("formesPage:pvForm")}</div>
            <div className="sub-buttons">
              <Link to="/Contracts/FormPv/Sarl" className="button half-button">
                {t("formesPage:sarl")}
              </Link>
              <Link to="/Contracts/FormPv/Suarl" className="button half-button">
                {t("formesPage:suarl")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormesPage;
