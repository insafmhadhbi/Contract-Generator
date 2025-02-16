import generatePDF from "../pdf.js";

const ContratResLocation = (doc, formData) => {
  doc.fontSize(16)
    .font("Times-Bold")
    .text(`RESILIATION D’UN CONTRAT DE LOCATION`, {
      align: "center",
    });

  doc.moveDown();
  doc.fontSize(12).font("Times-Bold").text(`Entre les soussignés :`, {
    underline: true,
  });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `${formData.gender} ${formData.nom}, titulaire du CIN n° ${formData.cin}, demeurant à ${formData.adresse}.`
    );

  doc.fontSize(10).font("Times-Roman").text(`Et`);

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `La Société ${formData.nomSociété}, sis à ${formData.adresseSociété}, titulaire de l’identifiant unique n° ${formData.ID}, représentée par Mr ${formData.représentant}, titulaire de la CIN N° ${formData.représentantCIN}.`
    );

  doc.moveDown();
  doc.fontSize(12).font("Times-Bold").text(`PREAMBULE :`, {
    underline: true,
  });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Vu le contrat de location à usage professionnel établi en date du ${formData.dateDebut}, et enregistré à la Recette des Finances de ${formData.recette} le ${formData.dateEnregistrement} sous numéro ${formData.numeroEnregistrement} et quittance n° ${formData.numQuitance}.`
    );

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(`Vu l’accord express entre les deux parties.`);

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(`Il a été arrêté et convenu ce qui suit :`, {
      underline: true,
    });

  doc.moveDown();
  doc.fontSize(12).font("Times-Bold").text(`ARTICLE 1 :`, {});
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Les deux parties conviennent de résilier le contrat de location cité au préambule à compter du ${formData.dateRes}, avec respect de toutes les clauses et conditions consenties par les deux parties lors de sa signature.`
    );

  doc.moveDown();
  doc.fontSize(12).font("Times-Bold").text(`ARTICLE 2 :`, {});
  doc.moveDown();
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Le présent document produit son effet juridique à compter du ${formData.dateSignature}.`
    );

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Roman")
    .text(
      `Fait à ${formData.lieuSignature} en tant d’exemplaires que de droit le ${formData.dateSignature}.`,
      {
        align: "right",
      }
    );
  doc.moveDown();
  doc.fontSize(12).font("Times-Bold").text(`SIGNATURE`, {
    align: "center",
    underline: true,
  });

  doc.moveDown();
  doc.fontSize(12).font("Times-Bold").text(`PROPRIETAIRE`, {
    align: "left",

  });

  doc.moveDown();
  doc.fontSize(10).font("Times-Bold").text(`Madame ${formData.nom}`, {
    align: "left",
  });

  doc.fontSize(12).font("Times-Bold").text(`LOCATAIRE`, {
    align: "right",
    underline: true,
  });
};

const generateContratResLocationPDF = async (formData) => {
  return await generatePDF((doc) => ContratResLocation(doc, formData));
};

export default generateContratResLocationPDF;
