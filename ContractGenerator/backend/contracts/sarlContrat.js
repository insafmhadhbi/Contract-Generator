import generatePDF from "../pdf.js";
import { formatDate } from "../utils/index.js";

// Arrays for number-to-word conversion
const unite = [
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
const dizaine = [
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
  96: "quatre-vingt-seize",
};

// Function to convert a number into words
function convertirNombreEnLettre(nombre) {
  if (nombre === 0) return "zéro";

  if (nombre in exception) return exception[nombre];

  if (nombre < 10) return unite[nombre];

  if (nombre < 20)
    return dizaine[1] + (nombre === 10 ? "" : "-" + unite[nombre - 10]);

  if (nombre < 100) {
    const dix = Math.floor(nombre / 10);
    const reste = nombre % 10;
    let texte = dizaine[dix];
    if (reste === 1 && (dix === 1 || dix > 7)) texte += " et un";
    else if (reste > 0) texte += "-" + unite[reste];
    return texte;
  }

  if (nombre < 1000) {
    const cent = Math.floor(nombre / 100);
    const reste = nombre % 100;
    let texte =
      (cent > 1 ? unite[cent] + " " : "") +
      "cent" +
      (reste > 0 ? " " + convertirNombreEnLettre(reste) : "");
    if (reste === 0 && cent > 1) texte += "s";
    return texte;
  }

  if (nombre < 1000000) {
    const mille = Math.floor(nombre / 1000);
    const reste = nombre % 1000;
    let texte =
      (mille > 1 ? convertirNombreEnLettre(mille) + " " : "") +
      "mille" +
      (reste > 0 ? " " + convertirNombreEnLettre(reste) : "");
    return texte;
  }

  if (nombre < 1000000000) {
    const million = Math.floor(nombre / 1000000);
    const reste = nombre % 1000000;
    let texte =
      convertirNombreEnLettre(million) +
      " million" +
      (million > 1 ? "s" : "") +
      (reste > 0 ? " " + convertirNombreEnLettre(reste) : "");
    return texte;
  }

  return "Nombre trop grand";
}

// Function to convert a monetary value into words
function convertirMontantEnLettre(montant) {
  const [entier, decimal] = parseFloat(montant).toFixed(2).split(".");
  const partieEntiere = convertirNombreEnLettre(parseInt(entier));
  const partieDecimale = convertirNombreEnLettre(parseInt(decimal));
  let resultat = `${partieEntiere} dinar${parseInt(entier) > 1 ? "s" : ""}`;
  if (parseInt(decimal) > 0) {
    resultat += ` et ${partieDecimale} centime${
      parseInt(decimal) > 1 ? "s" : ""
    }`;
  }
  return resultat;
}

const generateSarlContractContent = (doc, formData) => {
  // Customize the contract content based on form data
  doc.fontSize(16).font("Times-Bold").text("STATUTS", { align: "center" });
  doc
    .fontSize(16)
    .font("Times-Bold")
    .text(`« ${formData.titre} »`, { align: "center" });
  doc
    .fontSize(16)
    .font("Times-Bold")
    .text("Société Unipersonnelle à Responsabilité Limitée", {
      align: "center",
    });

  doc
    .fontSize(14)
    .font("Times-Bold")
    .text(
      `Capital Social : ${convertirMontantEnLettre(
        formData.capitalSocial
      )} Dinars (${formData.capitalSocial} DT)`,
      { align: "center" }
    );
  doc
    .fontSize(14)
    .font("Times-Bold")
    .text(`Siège Social : ${formData.siegeSocial}`, { align: "center" });

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("Entre les soussignés :", { align: "left" });
  doc.moveDown();

  formData.persons.forEach((person) => {
    doc
      .fontSize(10)
      .font("Times-Roman")
      .text(
        `- ${person.gender} ${person.nom} ${person.prénom}, de nationalité Tunisienne, demeurant ${person.adresse}, titulaire du CIN n° ${person.cin}.`,
        { align: "left" }
      );
  });

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("Titre I", { align: "center", underline: true });
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("Formation- Objet –Dénomination – siège- durée", {
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
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `La société prend la dénomination de : « ${formData.denomination} »`,
      { align: "left" }
    );
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      "Dans tous les actes, factures, annonces, publications et autres documents émanant de la société, la dénomination de la société doit toujours être précédée ou suivie des mots « Société à Responsabilité Limitée » et de l’énonciation du capital social.",
      { align: "left" }
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
      `Le siège social de la société est fixé au « ${formData.siegeSocial} »`,
      { align: "left" }
    );

  doc.moveDown();

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("ARTICLE 5 : Durée", { underline: true });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      "La durée de la société est fixée à quatre vingt dix neuf (99) années à compter de sa constitution définitive, sauf les cas de dissolution anticipée ou de prorogation prévues aux présents statuts.",
      { align: "left" }
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

  formData.persons.forEach((person, index) => {
    doc.moveDown();
    doc
      .fontSize(10)
      .font("Times-Roman")
      .text(
        `6.${index + 1} ${person.gender} ${person.nom} ${
          person.prénom
        } apporte à la présente Société la somme de ${convertirMontantEnLettre(
          person.montantApport
        )} Dinars (${
          person.montantApport
        } DT) et reçoit en rémunération de son apport ${convertirMontantEnLettre(
          person.nombreParts
        )} parts (${
          person.nombreParts
        }) de Dix (10) Dinars chacune à créer à cet effet.`,
        { align: "left" }
      );
  });

  doc.moveDown();

  // ARTICLE 7: Capital social
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("ARTICLE 7 : Capital social", { underline: true });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Le capital social est fixé à la somme de ${convertirMontantEnLettre(
        formData.capitalSocial
      )} Dinars (${
        formData.capitalSocial
      } DT) divisé en ${convertirMontantEnLettre(
        formData.nombreParts
      )} parts sociales (${
        formData.valeurPart
      } parts) de Dix (10) Dinars chacune.`,
      { align: "left" }
    );

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text("Ces parts sont réparties comme suit :", { align: "left" });

  // Calculate total number of parts
  let totalParts = 0;
  formData.persons.forEach((person) => {
    totalParts += parseInt(person.nombreParts);
  });

  let partNumber = 1;

  formData.persons.forEach((person) => {
    const nextPartNumber = partNumber + parseInt(person.nombreParts) - 1;
    doc
      .fontSize(10)
      .font("Times-Roman")
      .text(
        `- ${
          person.nombreParts
        } parts numérotées de ${partNumber} à ${nextPartNumber} inclus à ${
          person.gender === "M" ? "Monsieur" : "Madame"
        } ${person.nom} ${
          person.prénom
        } correspondant à ${convertirMontantEnLettre(
          person.montantApport * parseInt(person.nombreParts)
        )} Dinars (${person.montantApport * parseInt(person.nombreParts)} DT).`,
        { align: "left" }
      );
    partNumber = nextPartNumber + 1;
  });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Soit un total de ${
        formData.nombreParts
      } parts correspondant à ${convertirMontantEnLettre(
        formData.capitalSocial
      )} Dinars (${formData.capitalSocial} DT).`,
      { align: "left" }
    );
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      "Les associés déclarent et reconnaissent que les parts ont été souscrites et réparties entre eux dans les proportions sus indiquées et qu’elles sont intégralement libérées, conformément à l’article 97 du Code des Sociétés Commerciales.",
      { align: "left" }
    );

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(`ARTICLE 8 : Augmentation et Réduction du Capital`, {
      underline: true,
    });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `8.1 Le capital social peut être augmenté en une ou plusieurs fois par la création de nouvelles parts.`,
      {
        align: "left",
      }
    );

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `La décision d’augmentation en numéraire doit être approuvée par la majorité des associés représentant les trois quarts (3/4) au moins du capital social.`,
      {
        align: "left",
      }
    );

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `8.2 Chaque associé a le droit de participer à l’augmentation de capital proportionnellement à sa quote part dans le capital social.`,
      {
        align: "left",
      }
    );

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `8.3 En cas d’augmentation de capital au moyen de souscription de parts sociales en numéraire, les fonds recueillis doivent être déposés auprès d’un établissement financier. Ils ne seront retirés par le gérant qu’après l’accomplissement de toutes les formalités légales de l’augmentation de capital.`,
      {
        align: "left",
      }
    );

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `8.4 La décision d’augmenter le capital par incorporation des réserves peut être prise par les associés représentant plus de la moitié (50%) du capital social.`,
      {
        align: "left",
      }
    );

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `8.5 En cas d’augmentation de capital, en tout ou en partie, par des apports en nature, l’évaluation de ces apports doit être faite par un commissaire aux apports.`,
      {
        align: "left",
      }
    );

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `8.6 La décision de réduction du capital social doit être approuvée par la majorité des associés représentant les trois quarts (3/4) au moins des parts sociales après communication du projet de réduction au commissaire aux comptes, trois mois au moins avant la tenue de l’Assemblée Générale Extraordinaire qui doit en délibérer et établissement par ce dernier d’un rapport à cet effet.`,
      {
        align: "left",
      }
    );
  doc.moveDown();

  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(`ARTICLE 9 : Parts Sociales – Tenue de Registre des Associés`, {
      underline: true,
    });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Un registre des associés doit être tenu au siège social de la société sous la responsabilité du gérant où sont consignées les mentions suivantes :`,
      {
        align: "left",
      }
    );

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `- L’identité précise de chaque associé et le nombre des parts lui appartenant.`,
      {
        align: "left",
      }
    );

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(`- L’indication des versements effectués.`, {
      align: "left",
    });

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `- Les cessions et transmissions de parts sociales avec mention de la date de l’opération et de son enregistrement en cas de cession entre vifs.`,
      {
        align: "left",
      }
    );

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Les cessions et transmissions ne seront opposables à la société qu’à dater de leur inscription sur le registre des associés ou de leur signification dans les conditions ci-après déterminées.`,
      {
        align: "left",
      }
    );

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(`Tout associé pourra consulter ce registre.`, {
      align: "left",
    });
  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(`ARTICLE 10 : Cession des Parts Sociales`, {
      underline: true,
    });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `10.1 - Toute cession des parts sociales doit être constatée par un écrit comportant une signature légalisée des parties.`,
      {
        align: "left",
      }
    );

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `10.2 - Les parts sociales sont librement cessibles entre les associés et leurs descendants. Elles ne peuvent être cédées à des tiers étrangers à la société qu’avec le consentement de la majorité des associés représentant au moins les trois quarts (3/4) du capital social.`,
      {
        align: "left",
      }
    );

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `10.3 - Le projet de cession à un tiers doit être notifié, par lettre recommandée, à la société et à chacun des associés. La société doit faire connaître sa décision dans un délai de trois mois à compter de la notification. A défaut de réponse dans ce délai, le consentement de la société à la cession est réputé acquis.`,
      {
        align: "left",
      }
    );

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `10.4 - La décision d’acceptation ou de refus d’agrément du cessionnaire doit être notifiée au cédant par lettre recommandée.`,
      {
        align: "left",
      }
    );

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `10.5 - Si la société refuse de consentir à la cession, les associés sont tenus, dans un délai de trois (03) mois à compter de la date de ce refus, d ‘acquérir ou de faire acquérir les parts objet du projet de cession.`,
      {
        align: "left",
      }
    );

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `10.6 - En cas de désaccord sur le prix de cession, il sera fait recours à un expert comptable inscrit sur la liste des experts judiciaires désigné soit par les parties, soit à la demande de la partie la plus diligente par ordonnance sur requête rendue par le Président du Tribunal du lieu du siége social.`,
      {
        align: "left",
      }
    );

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `10.7 - La société peut, dans le même délai de trois (03) mois de la date de son refus et avec le consentement du cédant, racheter les parts au prix fixé selon les modalités ci-dessus énoncées et réduire son capital du montant de la valeur nominale des parts cédées.`,
      {
        align: "left",
      }
    );

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `10.8 - Si, à l’expiration du délai imparti, aucune des solutions ci-dessus prévues n’est intervenue, l’associé pourra réaliser la cession initialement prévue.`,
      {
        align: "left",
      }
    );

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `10.9 - Les dispositions qui précèdent sont applicables à tous modes de cession, même celles faisant suite à une vente forcée par voie d’adjudication publique, ainsi qu’aux transmissions de parts sociales entre vifs à titre gratuit, ou par suite de décès en faveur d’héritiers ou de légataires.`,
      {
        align: "left",
      }
    );
  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(`ARTICLE 11 : Droits Attachés aux Parts`, {
      underline: true,
    });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Chaque part donne droit à une fraction proportionnelle au nombre de parts sociales dans la propriété de l’actif de la Société et dans le partage des bénéfices.`,
      {
        align: "left",
      }
    );

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")

    .text(`ARTICLE 12 : Indivisibilité des Parts`, {
      underline: true,
    });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `La société ne reconnaît qu’un propriétaire pour chaque part, les copropriétaires indivis de parts sociales sont tenus de se faire représenter auprès de la société par une seule et même personne, désignée d’accord entre eux ou, à défaut d’entente, par le président du tribunal de 1ére instance du lieu de siége, à la requête de la partie la plus diligente.

  Les usufruitiers et nus propriétaires doivent également se faire représenter par une seule et même personne désignée d’accord entre eux, à défaut d’entente, la société considérera l’usufruitier comme représentant valablement le nu propriétaire.`,
      {
        align: "left",
      }
    );

  doc.moveDown();

  doc.fontSize(12).font("Times-Bold").text(`Titre III `, {
    align: "center",
    underline: true,
  });
  doc.fontSize(12).font("Times-Bold").text(`Administration de la Société`, {
    align: "center",
    underline: true,
  });
  doc.moveDown();
  doc.fontSize(12).font("Times-Bold").text(`ARTICLE 13 : Gérance`, {
    underline: true,
  });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `La société sera administrée par un ou plusieurs gérants nommés parmi les associés ou en dehors d’eux.

Le gérant aura les pouvoirs les plus étendus pour agir au nom de la société et pour faire tous actes et toutes opérations compatibles avec l’objet social et dans l’intérêt de la société.

Il aura la signature sociale par le simple fait d’apposer sa signature personnelle précédée de la mention indiquant la raison sociale et le gérant.

Il ne pourra en faire usage que pour les affaires de la société.

Le gérant pourra constituer des mandataires pour un ou plusieurs objets spéciaux et limités.

Par décision de la gérance, il peut être nommé un ou plusieurs directeurs de la société. Ces directeurs pourront avoir, ensemble ou séparément, la signature sociale.

Les rémunérations de ce ou ces directeurs seront fixées par la gérance.`,
      {
        align: "left",
      }
    );
  doc.moveDown();

  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(`ARTICLE 14 : Durée des Fonctions des Gérants – Révocation`, {
      underline: true,
    });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `14.1  Monsieur ${formData.nomGerant} ${formData.prenomGerant}, titulaire du CIN n°${formData.gerantCIN}, est nommé Gérant de la société pour une durée indéterminée.

14.2 Le gérant statutaire est révocable par décisions des associés réunis en assemblée générale représentant au moins les trois quarts (3/4) du capital social.

Le gérant nommé par acte séparé est révocable par une décision des associés représentant plus de la moitié (1/2) du capital social.

Le ou les associés représentant le quart (1/4) du capital social au moins peuvent intenter une action devant le tribunal compétent tendant à obtenir la révocation du gérant pour cause légitime.

Le gérant peut démissionner quand bon lui semble après préavis de six mois à la société notifié par lettre recommandée avec accusé de réception.`,
      {
        align: "left",
      }
    );

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(`ARTICLE 15 : Convention entre le Gérant, un Associé et la Société`, {
      underline: true,
    });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Toute convention intervenue directement ou par personne interposée entre la société et son gérant, associé ou non, ainsi qu’entre la société et l’un des associés, doit faire l’objet d’un rapport présenté à l’Assemblée Générale soit par le gérant, soit par le commissaire aux comptes.

L’Assemblée Générale statue sur ce rapport, sans que le gérant ou l’associé intéressé puisse participer au vote ou que leurs parts soient prises en compte pour le calcul du quorum ou de la majorité.

Les conventions non approuvées produisent leurs effets, mais le gérant ou l’associé contractant seront tenus pour responsables individuellement ou solidairement s’il y a lieu, des dommages subis par la société de ce fait.`,
      {
        align: "left",
      }
    );
  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(`ARTICLE 16 : Conventions Interdites`, {
      underline: true,
    });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Il est interdit à la société d’accorder des crédits à son gérant ou aux associés personnes physiques, sous quelque forme que ce soit ainsi que de cautionner ou d’avaliser leurs engagements envers les tiers.

Cette interdiction s’étend aux représentants légaux des personnes morales associées ainsi qu’aux conjoints, ascendants et descendants de ces représentants.`,
      {
        align: "left",
      }
    );

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(`ARTICLE 17 : Responsabilité des Gérants`, {
      underline: true,
    });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Le ou les gérants sont responsables individuellement ou solidairement, selon le cas, envers la société ou envers les tiers, soit des infractions aux dispositions légales, soit des violations des présents statuts, soit des fautes commises dans leur gestion.`,
      {
        align: "left",
      }
    );
  doc.moveDown();
  doc.fontSize(12).font("Times-Bold").text(`Titre IV`, {
    align: "center",
    underline: true,
  });
  doc.fontSize(12).font("Times-Bold").text(` Les Commissaires aux Comptes`, {
    align: "center",
    underline: true,
  });

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(`ARTICLE 18 : Nomination – Pouvoirs`, {
      underline: true,
    });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `L’Assemblée Générale Ordinaire désigne, conformément au Code des Sociétés Commerciales, un ou plusieurs commissaires remplissant les conditions légales, qui ont mandat de vérifier les livres, la caisse, le portefeuille et les valeurs de la société, de contrôler la régularité et la sincérité des inventaires et des comptes annuels ainsi que l’exactitude des informations données sur les comptes de la société.

Le ou les commissaires sont nommés pour trois années et sont rééligibles.

La rémunération des commissaires est fixée conformément au barème légal.

L’Assemblée Générale ne peut révoquer les commissaires aux comptes, avant l’expiration de la durée de leur mandat, à moins qu’il ne soit établi qu’ils ont commis une faute grave dans l’exercice de leurs fonctions.`,
      {
        align: "left",
      }
    );

  doc.moveDown();
  doc.fontSize(12).font("Times-Bold").text(`Titre V`, {
    align: "center",
    underline: true,
  });
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(` Décisions Collectives des Associés`, {
      align: "center",
      underline: true,
    });

  doc.moveDown();

  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(`ARTICLE 19 : Décisions Collectives Ordinaires et Extraordinaires`, {
      underline: true,
    });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `19.1 Toutes les décisions sociales ordinaires et extraordinaires sont prises par consultation écrite des associés sous la forme de Décisions Collectives sauf pour les délibérations prévues à l’article 20 des présents statuts.

19.2 Toutes les décisions ne sont valablement prises qu’autant qu’elles ont été adoptées par des associés représentant la majorité du capital social. Toutefois, la décision de cession des parts sociales est prise à la majorité des 3/4 du capital social.

19.3 Les décisions collectives sont prises à la demande du gérant ou du commissaire aux comptes.`,
      {
        align: "left",
      }
    );
  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(`ARTICLE 20 : Assemblée Générale Ordinaire`, {
      underline: true,
    });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `20.1 Une Assemblée Générale Ordinaire doit être tenue dans le délai de six (06) mois à compter de la clôture de chaque exercice pour approuver les états financiers de la société.

Trente (30) jours au moins avant la tenue de l’Assemblée Générale, les documents suivants doivent être communiqués aux associés par lettre recommandée avec accusé de réception ou par tout autre moyen ayant trace écrite :

- Le rapport de gestion
- L’inventaire des biens de la société
- Les états financiers
- Le texte des résolutions proposées
- Le rapport du commissaire aux comptes.

La lettre de communication doit indiquer les jours, heure et lieu de la réunion et l’ordre du jour.

20.2 Questions écrites : À compter de la communication ci-dessus prévue, tout associé peut poser par écrit des questions au gérant et ce, huit (08) jours au moins avant la date prévue pour la tenue de l’Assemblée Générale.`,
      {
        align: "left",
      }
    );
  doc.moveDown();
  doc.fontSize(12).font("Times-Bold").text(`20.3 Droit de Vote – Majorité :`);

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Tout associé dispose d’un nombre de voix égal au nombre de parts qu’il détient.

Une délibération n’est adoptée que si elle a été votée par un ou plusieurs associés représentant plus de la moitié du capital social.

Si la majorité requise n’est pas atteinte lors de la première assemblée, une deuxième assemblée doit être tenue dans le délai de quinze (15) jours au moins.

Les associés sont convoqués par lettre recommandée avec accusé de réception huit (08) jours au moins avant la tenue de la deuxième assemblée.

Lors de la seconde assemblée générale, les décisions sont prises à la majorité des voix des associés présents ou représentés quel que soit le nombre des votants.`,
      {
        align: "left",
      }
    );

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(`20.4 Droit de Communication – Expertise de Gestion :`, {});

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `À tout moment de l’année, tout associé peut prendre connaissance des documents visés ci-dessus – en 20.1- concernant les trois derniers exercices et se faire aider par un expert comptable.

Un ou plusieurs associés représentant au moins le dixième (1/10) du capital social peuvent, soit individuellement soit conjointement, demander au juge des référés la désignation d’un expert ou d’un collège d’experts qui aura pour mission de présenter un rapport sur une ou plusieurs opérations de gestion.
Le rapport d’expertise sera communiqué au demandeur, au gérant, ou commissaire aux comptes et à l’Assemblée Générale Ordinaire.`,
      {
        align: "left",
      }
    );
  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(`20.5 Pouvoirs de l’Assemblée Générale Ordinaire :`);

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Les Assemblées Générales Ordinaires ont à statuer sur toutes les questions qui ne sont pas de la compétence de l’Assemblée Générale Extraordinaire.

L’Assemblée Générale Ordinaire doit notamment approuver les comptes de gestion de la société, entendre les réponses du gérant aux questions écrites des associés ainsi que le rapport du commissaire aux comptes.

Elle statue sur l’affectation et la répartition des bénéfices.

Elle nomme, remplace ou réélit le (ou les) commissaires aux comptes.

Elle approuve ou désapprouve les conventions visées par l’article 15 des présents statuts suite à la lecture du rapport du gérant ou du commissaire aux comptes relatifs à ces conventions.

Elle délibère sur toutes les autres propositions portées à son ordre du jour et qui ne comportent pas une modification des statuts.`,
      {
        align: "left",
      }
    );

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(`ARTICLE 21 : Assemblée Générale Extraordinaire`, {
      underline: true,
    });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `L’Assemblée Générale Extraordinaire se compose de tous les associés quel que soit le nombre de leurs parts.

Les résolutions de l’Assemblée Générale Extraordinaire sont prises à la majorité des associés représentant les trois quarts (3/4) au moins du capital social.

L’Assemblée Générale Extraordinaire peut apporter aux statuts toutes modifications quelles qu’elles soient.

Les statuts peuvent être modifiés par le gérant de la société si cette modification est effectuée en application de dispositions légales ou réglementaires qui la prescrivent. Les statuts sont soumis dans leur version modifiée à l’approbation de la première assemblée générale suivante.`,
      {
        align: "left",
      }
    );
  doc.moveDown();
  doc.fontSize(12).font("Times-Bold").text(`Titre VI `, {
    align: "center",
    underline: true,
  });
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(`Exercice Social – Inventaire – Bénéfices`, {
      align: "center",
      underline: true,
    });

  doc.moveDown();
  doc.fontSize(12).font("Times-Bold").text(`ARTICLE 22 : Exercice Social`, {
    underline: true,
  });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `L’exercice social commence le 01 Janvier et finit le 31 décembre de chaque année.
A titre exceptionnel, le 1er exercice social commencera à la date de la constitution définitive de la société et expirera le 31 décembre de l’année qui suit.`,
      {
        align: "left",
      }
    );

  doc.moveDown();
  doc.fontSize(12).font("Times-Bold").text(`ARTICLE 23 : Comptes`, {
    underline: true,
  });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Il sera tenu par la gérance une comptabilité régulière des opérations sociales, conformément aux lois et usages du commerce.

Il sera dressé, en outre, à la fin de chaque exercice social, un rapport de gestion, un inventaire des biens de la société et les comptes annuels.

L’inventaire, le rapport de gestion, le texte des résolutions proposées et les états financiers sont communiqués aux associés par lettre recommandée avec accusé de réception trente (30) jours au moins avant la tenue de l’Assemblée Générale  Ordinaire annuelle.`,
      {
        align: "left",
      }
    );

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(`ARTICLE 24 : Affectation et Répartition des Bénéfices`, {
      underline: true,
    });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Le bénéfice distribuable est constitué du résultat comptable net majoré ou minoré des résultats reportés des exercices antérieurs, et ce, après déduction :
- d’une fraction égale à 5% du bénéfice déterminé comme ci-dessus indiqué au titre de réserve légale. Ce prélèvement cesse d’être obligatoire lorsque la réserve légale atteint le dixième du capital social.

Au cas où des bénéfices sont réalisés, et après constitution des réserves légales, les dividendes seront distribués dans une proportion qui ne peut être inférieure à 30% au moins une fois tous les trois ans, sauf si l’assemblée générale des associés décide le contraire à l’unanimité.

La répartition des bénéfices entre les associés se fait dans la proportion des parts qu’ils possèdent respectivement.`,
      {
        align: "left",
      }
    );

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(`ARTICLE 25 : Fonds en Compte Courant`, {
      underline: true,
    });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Chaque associé peut, avec le consentement de la gérance, déposer des fonds en compte courant à la société. Les conditions d’intérêts, de retrait et de remboursement de ces avances sont arrêtées par les associés et la gérance.`,
      {
        align: "left",
      }
    );

  doc.moveDown();
  doc.fontSize(12).font("Times-Bold").text(`Titre VII `, {
    align: "center",
    underline: true,
  });
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(` Dissolution – Liquidation – Compétence`, {
      align: "center",
      underline: true,
    });
  doc.moveDown();

  doc.fontSize(12).font("Times-Bold").text(`ARTICLE 26 : Dissolution`, {
    underline: true,
  });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Si les documents comptables font apparaître que les fonds propres de la société sont inférieurs à la moitié du capital social suite aux pertes qu’elle a subies, la gérance est tenue d’en avertir les associés et les inviter à statuer, dans un délai de deux (02) mois de la constatation des pertes, sur la dissolution anticipée de la société.
        
    La décision des associés est, dans tous les cas, inscrite au registre de commerce et publiée au Journal Officiel de la République Tunisienne.
    
    La dissolution de la société ne peut être prononcée qu’à la majorité des associés représentant les trois quarts (3/4) au moins du capital social.
    
    La dissolution anticipée peut résulter à toute époque, en dehors du cas de diminution des fonds propres en deçà de la moitié du capital social, d’une décision collective extraordinaire des associés.`,
      {
        align: "left",
      }
    );

  doc.moveDown();
  doc.fontSize(12).font("Times-Bold").text(`ARTICLE 27 : Liquidation`, {
    underline: true,
  });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `À l’expiration de la société ou en cas de dissolution anticipée pour quelque cause que ce soit, les associés, par une décision extraordinaire, règlent le mode de liquidation et nomment un ou plusieurs liquidateurs dont ils déterminent les pouvoirs.`,
      {
        align: "left",
      }
    );

  doc.moveDown();
  doc.fontSize(12).font("Times-Bold").text(`ARTICLE 28 : Compétence`, {
    underline: true,
  });
  doc.moveDown();

  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Les droits et obligations nés des présents statuts sont soumis au droit tunisien.
    Toutes contestations qui pourront surgir relativement aux affaires sociales, entre les associés et la société, pendant la durée de la société ou en cours de sa liquidation, seront soumises aux tribunaux du lieu du siège social.`,
      {
        align: "left",
      }
    );

  doc.moveDown();
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(
      `Fait à ${formData.lieuSignature} le ${formatDate(
        formData.dateSignature
      )}.`,
      {
        align: "right",
      }
    );
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("L’associé unique", { align: "center", underline: true });
  doc.moveDown();
  formData.persons.forEach((person) => {
    doc
      .fontSize(10)
      .font("Times-Roman")
      .text(`- ${person.gender} ${person.nom} ${person.prénom} `, {
        align: "left",
      });
  });
};

const generateSarlContractPDF = async (formData) => {
  return generatePDF(generateSarlContractContent, formData);
};

export default generateSarlContractPDF;
