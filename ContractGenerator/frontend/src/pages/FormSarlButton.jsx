import React from "react";
import { Link } from "react-router-dom";
import Title from "../components/Title";
import ContratDot from "../components/ContractDot";
import { useTranslation } from "react-i18next";

const FormSarlButton = () => {
  const { t } = useTranslation();

  return (
    <div className="contract-container">
      <div className="content-wrapper">
        <Title title={t("formSarlButton:contractsForms")} />
        <div className="buttons-container">
          <div className="button-wrapper">
            <div className="subsub-buttons">
              <Link
                to="/Contracts/FormContratPersonnePhy"
                className="button half-button"
              >
                {t("formSarlButton:personnePhysique")}
              </Link>
              <div className="option-buttons">
                <Link to="/formSarl" className="button half-button">
                  <div className="small-text-container">
                    <span className="small-text">
                      <ContratDot />
                      &nbsp; {t("formSarlButton:formSarl")}
                    </span>
                  </div>
                </Link>

                <Link
                  to="/Contracts/CreatContract/Option2"
                  className="button half-button"
                >
                  {t("formSarlButton:suarl")}
                </Link>
              </div>
            </div>
          </div>
          <div className="button-wrapper">
            <div className="main-button">{t("formSarlButton:rentalForm")}</div>
            <div className="sub-buttons">
              <Link
                to="/Contracts/FormLocation/Location"
                className="button half-button"
              >
                {t("formSarlButton:location")}
              </Link>
              <Link
                to="/Contracts/FormLocation/Resiliation"
                className="button half-button"
              >
                {t("formSarlButton:resiliation")}
              </Link>
            </div>
          </div>
          <div className="button-wrapper">
            <div className="main-button">{t("formSarlButton:updateForm")}</div>
            <div className="sub-buttons">
              <Link
                to="/Contracts/FormMaj/RneModificationPhysique"
                className="button half-button"
              >
                {t("formSarlButton:rneModificationPhysique")}
              </Link>
              <Link
                to="/Contracts/FormMaj/RneModificationMoral"
                className="button half-button"
              >
                {t("formSarlButton:rneModificationMorale")}
              </Link>
            </div>
          </div>
          <div className="button-wrapper">
            <div className="main-button">{t("formSarlButton:pvForm")}</div>
            <div className="sub-buttons">
              <Link to="/Contracts/FormPv/Sarl" className="button half-button">
                {t("formSarlButton:sarl")}
              </Link>
              <Link to="/Contracts/FormPv/Suarl" className="button half-button">
                {t("formSarlButton:suarl")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSarlButton;
