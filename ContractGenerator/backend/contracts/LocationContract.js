import generatePDF from "../pdf.js";
import { formatDate } from "../utils/index.js";

// Arrays for number-to-word conversion
const unite = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
const dizaine = ["", "dix", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingt", "quatre-vingt-dix"];
const exception = {
  11: "onze",
  12: "douze",
  13: "treize",
  14: "quatorze",
  15: "quinze",
  16: "seize",
  71: "soixante et onze",
  72: "soixante-douze",
  73: "soixante-treize",
  74: "soixante-quatorze",
  75: "soixante-quinze",
  76: "soixante-seize",
  91: "quatre-vingt-onze",
  92: "quatre-vingt-douze",
  93: "quatre-vingt-treize",
  94: "quatre-vingt-quatorze",
  95: "quatre-vingt-quinze",
  96: "quatre-vingt-seize"
};

// Function to convert a number into words
function convertirNombreEnLettre(nombre) {
  if (nombre === 0) return "zéro";

  if (nombre in exception) return exception[nombre];

  if (nombre < 10) return unite[nombre];

  if (nombre < 20) return dizaine[1] + (nombre === 10 ? "" : "-" + unite[nombre - 10]);

  if (nombre < 100) {
    let dix = Math.floor(nombre / 10);
    let reste = nombre % 10;
    let texte = dizaine[dix];
    if (reste === 1 && (dix === 1 || dix > 7)) texte += " et un";
    else if (reste > 0) texte += "-" + unite[reste];
    return texte;
  }

  if (nombre < 1000) {
    let cent = Math.floor(nombre / 100);
    let reste = nombre % 100;
    let texte = (cent > 1 ? unite[cent] + " " : "") + "cent" + (reste > 0 ? " " + convertirNombreEnLettre(reste) : "");
    if (reste === 0 && cent > 1) texte += "s";
    return texte;
  }

  if (nombre < 1000000) {
    let mille = Math.floor(nombre / 1000);
    let reste = nombre % 1000;
    let texte = (mille > 1 ? convertirNombreEnLettre(mille) + " " : "") + "mille" + (reste > 0 ? " " + convertirNombreEnLettre(reste) : "");
    return texte;
  }

  if (nombre < 1000000000) {
    let million = Math.floor(nombre / 1000000);
    let reste = nombre % 1000000;
    let texte = convertirNombreEnLettre(million) + " million" + (million > 1 ? "s" : "") + (reste > 0 ? " " + convertirNombreEnLettre(reste) : "");
    return texte;
  }

  return "Nombre trop grand";
}

// Function to convert a monetary value into words
function convertirMontantEnLettre(montant) {
  const [entier, decimal] = montant.toFixed(2).split(".");
  const partieEntiere = convertirNombreEnLettre(parseInt(entier));
  const partieDecimale = convertirNombreEnLettre(parseInt(decimal));
  let resultat = `${partieEntiere} dinar${parseInt(entier) > 1 ? "s" : ""}`;
  if (parseInt(decimal) > 0) {
    resultat += ` et ${partieDecimale} centime${parseInt(decimal) > 1 ? "s" : ""}`;
  }
  return resultat;
}

// Function to generate the rental contract in the PDF
const LocationContract = (doc, formData) => {
  doc.fontSize(16).font("Times-Bold").text(`CONTRAT DE LOCATION `, {
    align: "center",
  });
  doc.fontSize(16).font("Times-Bold").text(` A USAGE PROFESSIONNEL`, {
    align: "center",
  });
  doc.moveDown();
  doc.moveDown();
  doc.fontSize(12).font("Times-Bold").text(`ENTRE LES SOUSSIGNÉS :`, {});
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Monsieur ${formData.nom}, titulaire du ${formData.typePieceIdentite} n° ${formData.ID}, demeurant à ${formData.adresse},`
    );

  doc.fontSize(10).font("Times-Roman").text(`Et`);
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `La Société ${formData.denomination}, en constitution, représentée par son gérant Monsieur ${formData.representantLegal}, titulaire du ${formData.typeIdentiteRepresentant} n° ${formData.IDrepresentant}.`
    );

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(`IL A ÉTÉ CONVENU CE QUI SUIT :`, {});
  doc.moveDown();

  doc.fontSize(12).font("Times-Bold").text(`ARTICLE 1 :`);
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Par le présent, Monsieur ${formData.nom} loue à la société ${formData.denomination} en constitution, une partie du local situé à ${formData.adresseLocalLoue}, d’une superficie égale à ${formData.superficieLocal} m², et ce pour que la société ${formData.denomination} en constitution y exerce son activité de ${formData.activite}.`
    );

  doc.moveDown();
  doc.fontSize(12).font("Times-Bold").text(`ARTICLE 2 :`);

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Le présent contrat est consenti pour une durée d’une année commençant le ${formatDate(
        formData.dateDebutContrat
      )} et finissant le ${formatDate(
        formData.dateFinContrat
      )}. Faute congé donné par écrit de 3 mois avant l’expiration du terme par l’une des deux parties, le présent contrat sera renouvelé par tacite reconduction d’une année à une autre.`
    );

  doc.moveDown();
  doc.fontSize(12).font("Times-Bold").text(`ARTICLE 3 :`);

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Le loyer mensuel brut hors taxe est fixé à ${formData.montantLoyerHT} DT/HT (${convertirMontantEnLettre(formData.montantLoyerHT)}), à majoré de 19% de TVA ${formData.montantTVA} DT, soit ${formData.montantLoyerTTC} DT/TTC, payable par ${formData.modalitesPaiement}.`
    );

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Une retenue à la source est à appliquer et à verser auprès de la recette des finances territorialement compétente conformément aux dispositions de l’article 52 du code de l’impôt sur les personnes physiques et de l’impôt sur les sociétés.`
    );

  doc.moveDown();
  doc.fontSize(12).font("Times-Bold").text(`ARTICLE 4 :`);

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Le bénéficiaire reconnaît avoir reçu le local mis à sa disposition en parfait état, et il devra le rendre à la fin du bail tel qu’il l'a reçu. Toutes les dépenses nécessaires à l’entretien du local ainsi que les frais d’embellissement resteront à la charge du bénéficiaire qui ne pourra réclamer d’indemnité ou de remboursement.`
    );

  doc.moveDown();
  doc.fontSize(12).font("Times-Bold").text(`ARTICLE 5 :`);

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Les frais d’établissement et d’enregistrement de la présente mise à disposition sont à la charge de la société bénéficiaire.`
    );

  doc.moveDown();
  doc.fontSize(12).font("Times-Bold").text(`ARTICLE 6 :`);

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Tout différent pouvant surgir entre les deux parties à l’occasion de l’exécution du présent contrat, les tribunaux de ${formData.lieu} sont déclarés institutions compétentes.`
    );

  doc.moveDown();
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Fait à ${formData.lieu} le le ${formatDate(formData.dateSignature)}.`,
      {
        align: "right",
      }
    );
  doc.fontSize(12).font("Times-Bold").text(`SIGNATURE`, {
    align: "center",
  });
  doc.fontSize(12).font("Times-Bold").text(`Le BAILLEUR`, {
    align: "left",
  });

  doc.fontSize(10).font("Times-Bold").text(`Le BÉNÉFICIAIRE`, {
    align: "right",
  });

  doc.fontSize(10).font("Times-Bold").text(`Monsieur ${formData.nom}`);
};
const generateContratLocationPDF = async (formData) => {
  return await generatePDF((doc) => LocationContract(doc, formData));
};

export default generateContratLocationPDF;
