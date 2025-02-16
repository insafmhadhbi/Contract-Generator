import React from "react";
import { Link } from "react-router-dom";
import ContratDot from "../components/ContractDot";
import Title from "../components/Title";
import { useTranslation } from "react-i18next";

const FormesDesContraPage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="container">
        <Title title={t("formesDesContraPage:contractGenerationForms")} />
        <br />
        <ul>
          <li>
            <Link to="/formSarl">
              <ContratDot /> {t("formesDesContraPage:formSarl")}
            </Link>
          </li>
          <li>
            <Link to="/formSural">
              <ContratDot /> {t("formesDesContraPage:formSuarl")}
            </Link>
          </li>
          <li>
            <Link to="/formContratLocation">
              <ContratDot /> {t("formesDesContraPage:rentalForm")}
            </Link>
          </li>
          <li>
            <Link to="/formResLoc">
              <ContratDot /> {t("formesDesContraPage:rentalTerminationForm")}
            </Link>
          </li>
          <li>
            <Link to="/form_DeclarModifRNESociete">
              <ContratDot /> {t("formesDesContraPage:rneCompanyUpdateForm")}
            </Link>
          </li>
          <li>
            <Link to="/form_DeclarModifRNEPhysique">
              <ContratDot /> {t("formesDesContraPage:rnePhysicalUpdateForm")}
            </Link>
          </li>
          <li>
            <Link to="/form_DeclarImmRNEPhysique">
              <ContratDot /> {t("formesDesContraPage:rneImmatriculationForm")}
            </Link>
          </li>
        </ul>
      </div>
      <br />

      <div className="container">
        <Title title={t("formesDesContraPage:pvagoGenerationForms")} />
        <br />
        <ul>
          <li>
            <Link to="/formPVAGOSural">
              <ContratDot /> {t("formesDesContraPage:pvagoSuarlForm")}
            </Link>
          </li>
          <li>
            <Link to="/formPVAGOSarl">
              <ContratDot /> {t("formesDesContraPage:pvagoSarlForm")}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FormesDesContraPage;
