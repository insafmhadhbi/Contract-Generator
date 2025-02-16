import generatePDF from "../pdf.js";
import { formatDate } from "../utils/index.js";

const suralContract = (doc, formData) => {
  //Customize the contract content based on form data
  doc.fontSize(16).font("Times-Bold").text(`« ${formData.titre} »`, {
    align: "center",
  });

  doc
    .fontSize(16)
    .font("Times-Bold")
    .text("Société Unipersonnelle à Responsabilité Limitée", {
      align: "center",
    });
  doc
    .fontSize(14)
    .font("Times-Bold")
    .text(`Capital Social : ${formData.capitalSocial} Dinars`, {
      align: "center",
    });
  doc
    .fontSize(14)
    .font("Times-Bold")
    .text(`Siège Social : ${formData.siegeSocial}`, { align: "center" });
  doc
    .fontSize(14)
    .font("Times-Bold")
    .text("STATUTS", { align: "center", underline: true });
  doc.moveDown();
  doc.fontSize(12).font("Times-Bold").text("Le soussigné :");
  doc.moveDown();
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Mr ${formData.nomGerant}, de nationalité Tunisienne, sise à ${formData.siegeSocial}, titulaire du CIN n° ${formData.persons[0].cin}.`
    );
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      "A établi ainsi qu’il suit les statuts d’une société unipersonnelle à responsabilité limitée qu’il a décidé de constituer."
    );
  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("Titre I ", { align: "center", underline: true });
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(" Formation- Objet –Dénomination – siège- durée", {
      align: "center",
      underline: true,
    });
  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("ARTICLE 1er : Formation de la Société", { underline: true });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(` ${formData.Article1}`, { indent: 20 });
  doc.moveDown();

  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("ARTICLE 2 : Objet social", { underline: true });

  doc.moveDown();
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(` ${formData.Article2}`, { indent: 20 });
  doc.moveDown();

  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("ARTICLE 3 : Dénomination", { underline: true });
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(`La société prend la dénomination de « ${formData.denomination} »`);
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      "Dans tous les actes, factures, annonces, publications et autres documents émanant de la société, la dénomination de la société doit toujours être précédée ou suivie des mots « Société Unipersonnelle à Responsabilité Limitée » et de l’énonciation du capital social. "
    );

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("ARTICLE 4 : Siège social", { underline: true });
  doc.moveDown();
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Le siège social de la société est fixé à "${formData.siegeSocial}".`
    );
  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("ARTICLE 5 : Durée", { underline: true });
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `La durée de la société est fixée à quatre-vingt-dix-neuf (99) années à compter de sa constitution définitive, sauf les cas de dissolution anticipée ou de prorogation prévues aux présents statuts.`
    );

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("Titre II", { align: "center", underline: true });
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("Apports – Capital social", { align: "center", underline: true });

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("ARTICLE 6 : Apports", { underline: true });
  doc.moveDown();
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Mr ${formData.nomGerant} apporte à la présente Société la somme de ${formData.montantApport} Dinars et reçoit en rémunération de son apport ${formData.nombreParts} parts de ${formData.valeurPart} Dinars chacune à créer à cet effet.`
    );
  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("ARTICLE 7 : Capital social", { underline: true });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Le capital social est fixé à la somme de ${formData.capitalSocial} Dinars divisé en ${formData.nombreParts} parts sociales de ${formData.valeurPart} Dinars chacune numérotées de 1 à ${formData.nombreParts} inclus.`
    );
  doc.moveDown();
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `L'associée déclare et reconnaît que les parts ont été totalement attribuées et qu'elles sont intégralement libérées, conformément à l'article 97 du Code des Sociétés Commerciales.`
    );
  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("ARTICLE 8 : Parts Sociales – Tenue de Registre des Associés", {
      underline: true,
    });
  doc.moveDown();
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Un registre des associés doit être tenu au siège social de la société sous la responsabilité du gérant où sont consignées les mentions suivantes :`
    );
  doc.moveDown();
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      "- L'identité précise de l'associée et le nombre des parts lui appartenant."
    );
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text("- L'indication des versements effectués.", {});
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      "- Les cessions et transmissions de parts sociales avec mention de la date de l'opération et de son enregistrement en cas de cession entre vifs."
    );
  doc.moveDown();
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Les cessions et transmissions ne seront opposables à la société qu'à dater de leur inscription sur le registre des associés ou de leur signification dans les conditions ci-après déterminées.`
    );

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("Titre III ", { align: "center", underline: true });
  doc.fontSize(12).font("Times-Bold").text(" Administration de la Société", {
    align: "center",
    underline: true,
  });

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("ARTICLE 9 : Gérance", { underline: true });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(`Mr ${formData.nomGerant} est nommé gérant de la société.`);
  doc
    .fontSize(10)
    .text(
      `Le gérant aura les pouvoirs les plus étendus pour agir au nom de la société et pour faire tous actes et toutes opérations compatibles avec l'objet social et dans l'intérêt de la société.`
    );
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Il aura la signature sociale par le simple fait d'apposer sa signature personnelle précédée de la mention indiquant la raison sociale et le gérant.`
    );
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(`Il ne pourra en faire usage que pour les affaires de la société.`);
  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(
      "ARTICLE 10 : Convention entre l'associé unique, Gérant de la société et la Société",
      { underline: true }
    );
  doc.moveDown();
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Toute convention intervenue entre l'associé unique et la société, soit directement soit par personne interposée, devra être annexée aux documents comptables annuels, ainsi que le rapport du commissaire aux comptes, s'il en existe un.`
    );

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("Titre V ", { align: "center", underline: true });
  doc.fontSize(12).font("Times-Bold").text("Décisions de l'associée unique", {
    align: "center",
    underline: true,
  });

  doc.moveDown();
  doc.fontSize(12).font("Times-Bold").text("ARTICLE 11:", { underline: true });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `L'associée unique doit établir le rapport de gestion, l'inventaire, les comptes annuels auxquels est annexé le rapport du commissaire aux comptes, s'il en existe un.`
    );
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Les documents ci-dessus mentionnés doivent être approuvés par l'associée unique dans un délai de trois mois à compter de la clôture des comptes.`
    );
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Toutes les résolutions sociales sont signées et consignées dans un registre spécial coté et paraphé par le greffe du tribunal de première instance du lieu du siège social.`
    );

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("Titre VI ", { align: "center", underline: true });
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(" Exercice Social – Inventaire – Bénéfices", {
      align: "center",
      underline: true,
    });

  doc.moveDown();

  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("ARTICLE 12 : Exercice Social", { underline: true });
  doc.moveDown();
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `L’exercice social commence le 1er janvier et finit le 31 décembre de chaque année.`
    );
  doc.moveDown();

  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("ARTICLE 13 : Comptes", { underline: true });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Il sera tenu par la gérance une comptabilité régulière des opérations sociales, conformément aux lois et usages du commerce.`
    );
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Il sera dressé, en outre, à la fin de chaque exercice social, un rapport de gestion, un inventaire des biens de la société et les comptes annuels.`
    );
  doc.moveDown();

  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("ARTICLE 14 : Affectation et Répartition des Bénéfices", {
      underline: true,
    });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Les produits nets de l’exercice, déduction faite des frais généraux et autres charges sociales, ainsi que de tous amortissements de l’actif social et de toutes provisions pour risques commerciaux, constituent les bénéfices nets.`
    );
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Sur les bénéfices nets, il est prélevé 5% pour la constitution de la réserve légale, jusqu’à ce qu ‘elle ait atteint le dixième du capital social.`
    );
  doc.moveDown();

  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("ARTICLE 15 : Fonds en Compte Courant", { underline: true });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `L’associée peut déposer des fonds en compte courant à la société et en arrêter par une résolution les conditions d’intérêts, de retrait et de remboursement.`
    );

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("Titre VII ", { align: "center", underline: true });
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("Dissolution – Compétence", { align: "center", underline: true });

  doc.moveDown();

  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("ARTICLE 16 : Dissolution", { underline: true });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Si les documents comptables font apparaître que les fonds propres de la société sont inférieurs à la moitié du capital social suite aux pertes qu’elle a subi, l’associé unique doit statuer, dans un délai de deux (02) mois de la constatation des pertes, sur la dissolution anticipée de la société.`
    );
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `La décision est, dans tous les cas inscrits au registre de commerce et publiée au Journal Officiel de la République Tunisienne et dans deux journaux quotidiens dont l’un en langue arabe.`
    );
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `La dissolution anticipée peut résulter à toute époque, en dehors du cas de diminution des fonds propres en deçà de la moitié du capital social, d’une décision de l’associée unique, du décès de l’associée unique, de son incapacité et de sa faillite personnelle.`
    );

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("ARTICLE 17 : Compétence", { underline: true });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Les droits et obligations nés des présents statuts sont soumis au droit tunisien. Toutes contestations qui pourront surgir relativement aux affaires sociales, entre l’associée unique et la société, pendant la durée de la société ou en cours de sa liquidation, seront soumises aux tribunaux du lieu du Siège social.`
    );

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Roman")
    .text(
      `Fait à ${formData.lieuSignature} le le ${formatDate(
        formData.dateSignature
      )}.`,
      {
        align: "right",
      }
    );

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("L’associé unique", { align: "center", underline: true });
  doc.moveDown();
  doc
    .fontSize(10)
    .font("Times-Bold")
    .text(`Mr ${formData.persons[0].nom}`, { align: "center" });
  doc.moveDown();
};

const generateSuralContractPDF = async (formData) => {
  return await generatePDF((doc) => suralContract(doc, formData));
};

export default generateSuralContractPDF;
