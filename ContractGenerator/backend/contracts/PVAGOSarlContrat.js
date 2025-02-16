import generatePDF from "../pdf.js";

const numberToWord = (dateString) => {
  if (typeof dateString !== "string") {
    dateString = dateString.toISOString().split("T")[0];
  }

  const [year, month, day] = dateString.split("-").map(Number);

  const yearsInWords = [
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
  const tensInWords = [
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
  const teensInWords = [
    "dix",
    "onze",
    "douze",
    "treize",
    "quatorze",
    "quinze",
    "seize",
    "dix-sept",
    "dix-huit",
    "dix-neuf",
  ];
  const monthsInWords = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  let yearInWords = yearsInWords[Math.floor(year / 1000)];
  if (year % 1000 === 0) {
    yearInWords += " mille";
  } else {
    const hundreds = Math.floor((year % 1000) / 100);
    const tens = Math.floor((year % 100) / 10);
    const ones = year % 10;
    yearInWords += ` ${yearsInWords[hundreds]} mille`;
    if (tens > 1) {
      yearInWords += ` ${tensInWords[tens]}`;
      if (ones > 0) {
        yearInWords += `-${yearsInWords[ones]}`;
      }
    } else if (tens === 1) {
      yearInWords += ` ${teensInWords[ones]}`;
    } else {
      if (ones > 0) {
        yearInWords += `-${yearsInWords[ones]}`;
      }
    }
  }

  const monthInWords = monthsInWords[month - 1];

  let dayInWords = "";
  if (day >= 20) {
    const tens = Math.floor(day / 10);
    const ones = day % 10;
    dayInWords += tensInWords[tens];
    if (ones > 0) {
      dayInWords += `-${yearsInWords[ones]}`;
    }
  } else if (day >= 10) {
    dayInWords = teensInWords[day - 10];
  } else {
    dayInWords = yearsInWords[day];
  }

  return `L'an ${yearInWords}, le ${dayInWords} ${monthInWords} `;
};

const numberToWordTime = (num) => {
  const numbersInWords = [
    "",
    "une",
    "deux",
    "trois",
    "quatre",
    "cinq",
    "six",
    "sept",
    "huit",
    "neuf",
    "dix",
    "onze",
    "douze",
    "treize",
    "quatorze",
    "quinze",
    "seize",
    "dix-sept",
    "dix-huit",
    "dix-neuf",
  ];

  const tensInWords = ["", "dix", "vingt", "trente", "quarante", "cinquante"];

  if (num < 20) {
    return numbersInWords[num];
  } else {
    const tens = Math.floor(num / 10);
    const ones = num % 10;
    if (ones === 0) {
      return tensInWords[tens];
    } else {
      return `${tensInWords[tens]}-${numbersInWords[ones]}`;
    }
  }
};

const PVAGOSarlContract = (doc, formData) => {
  doc
    .fontSize(16)
    .font("Times-Bold")
    .text(`SOCIETE ${formData.nomSociet} SARL`, {
      align: "center",
    });

  doc
    .fontSize(11)
    .font("Times-Bold")
    .text(`Capital de  ${formData.capital} DT`, {
      align: "center",
    });

  doc.fontSize(11).font("Times-Bold").text(`Adresse :   ${formData.adresse}`, {
    align: "center",
  });

  doc
    .fontSize(11)
    .font("Times-Bold")
    .text(`Matricule Fiscale: ${formData.matriculeFiscale} `, {
      align: "center",
    });

  const currentY = doc.y;

  doc
    .moveTo(doc.page.margins.left, currentY + 5)
    .lineTo(doc.page.width - doc.page.margins.right, currentY + 5)
    .lineWidth(0.5)
    .stroke();

  doc.moveDown();

  const date = new Date(formData.datePva);
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;

  doc
    .fontSize(10)
    .font("Times-Bold")
    .text(
      `PROCES VERBAL DE L'ASSEMBLEE GENERALE ORDINAIRE DU ${formattedDate}`,
      {
        align: "center",
        underline: true,
      }
    );
  doc.moveDown();

  const dateCloture = new Date(formData.dateClotureExercice);
  const formattedDateCloture = `${dateCloture
    .getDate()
    .toString()
    .padStart(2, "0")}/${(dateCloture.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${dateCloture.getFullYear()}`;

  doc
    .fontSize(10)
    .font("Times-Bold")
    .text(
      `APPROBATION DES COMPTES ET AFFECTATION DU RESULTAT DE L'EXERCICE CLOS LE ${formattedDateCloture}`,
      {
        align: "center",
      }
    );
  doc.moveDown();

  const dateInWords = numberToWord(formData.datePva);
  const hour = formData.hour;
  const hourInWords = numberToWordTime(hour);
  const hourLabel = hour > 1 ? "heures" : "heure";
  let timeInWords = `${hourInWords} ${hourLabel}`;

  if (formData.minute) {
    const minute = formData.minute;
    const minuteInWords = numberToWordTime(minute);
    timeInWords += ` ${minuteInWords} minutes`;
  }

  doc
    .fontSize(11)
    .font("Times-Roman")
    .text(
      `${dateInWords} à ${timeInWords}, les associés de la société ${formData.nomSociet}, se sont réunis sur convocation de la gérance pour délibérer sur l'ordre du jour suivant :`
    );

  formData.But.forEach((item) => {
    doc
      .fontSize(11)
      .font("Times-Bold")
      .text(`- ${item.content}`, { indent: 20 });
  });

  doc.moveDown();
  doc
    .fontSize(11)
    .font("Times-Roman")
    .text(`Etaient présents et ont signé la feuille de présence :`);

  formData.participants.forEach((participant) => {
    doc
      .fontSize(11)

      .font("Times-Bold") // Set font to bold for genre
      .text(
        `- ${participant.genre}`, // Bold text
        { continued: true, indent: 20 } // Keep on the same line
      )
      .font("Times-Roman") // Reset font to normal
      .text(
        ` ${participant.nom} ${participant.prenom}, ${participant.type} ${participant.parts} parts sociales d'une totalité de ${formData.nbParts} constituants le capital social.`
      );
  });

  doc.moveDown();
  const president = formData.presidentAssemblee[0];
  doc.text(
    `L'assemblée est présidée par ${president.presidentGenre} ${president.presidentNom} ${president.presidentPrenom} qui dépose sur le bureau et met à la disposition des membres de l'assemblée les documents suivants :`
  );

  doc
    .fontSize(11)
    .font("Times-Roman")
    .text(`${formData.documentsSoumis} `, { indent: 20 });

  doc.moveDown();

  doc
    .fontSize(11)
    .font("Times-Roman")
    .text(
      `Il constate que tous les associés sont présents conformément à la feuille de présence, l'assemblée est ainsi habilitée à prendre toute décision ordinaire conformément à la loi et aux statuts, et il est considéré comme étant régulièrement constituée.`
    );
  doc.moveDown();
  doc
    .fontSize(11)
    .font("Times-Roman")
    .text(
      `${president.presidentGenre} ${president.presidentNom} ${president.presidentPrenom} donne lecture à l'assemblée du rapport de gestion et déclare que la discussion est ouverte. Personne ne demande la parole, il met successivement aux voix les résolutions suivantes : `
    );
  doc.moveDown();

  doc
    .fontSize(11)
    .font("Times-Bold")
    .text("PREMIERE RESOLUTION", { underline: true });

  doc
    .fontSize(11)
    .font("Times-Roman")

    .text(
      "Les associés ratifient le mode de convocation de l'assemblée et déclarent qu'ils ne portent nullement atteinte à leurs intérêts."
    )
    .text("Cette résolution est adoptée à l'unanimité", {
      align: "right",
      underline: { color: "black", width: 0.1 },
    });

  doc.moveDown();
  doc
    .fontSize(11)
    .font("Times-Bold")
    .text("DEUXIEME RESOLUTION", { underline: true });

  doc.fontSize(11).font("Times-Roman").text(`${formData.deuxiemeResolution}`);

  doc
    .fontSize(11)
    .font("Times-Roman")
    .text(
      `Ces états font apparaître un total bilan de ${formData.totalBilan} dinars et un résultat bénéficiaire de ${formData.resultatBeneficiaire} Dinars.`
    )
    .text("Cette résolution est adoptée à l'unanimité", {
      align: "right",
      underline: { color: "black", width: 0.1 },
    });

  doc.moveDown();
  doc
    .fontSize(11)
    .font("Times-Bold")

    .text("TROISIEME RESOLUTION ", { underline: true });

  const gerantAssocie = formData.participants.find(
    (participant) => participant.type.trim() === "gérant et associé détenant"
  );

  if (gerantAssocie) {
    doc
      .fontSize(11)
      .font("Times-Roman")
      .text(
        `Ayant assuré la gestion de la société au titre de l'exercice 2023, l'Assemblée donne quitus entier, définitif et irrévocable au gérant ${gerantAssocie.genre} ${gerantAssocie.nom} ${gerantAssocie.prenom}.`
      )
      .text("Cette résolution est adoptée à l'unanimité", {
        align: "right",
        underline: { color: "black", width: 0.1 },
      });
  }

  doc.moveDown();
  doc
    .fontSize(11)
    .font("Times-Bold")
    .text("QUATRIEME RESOLUTION", { underline: true });
  doc
    .fontSize(11)
    .font("Times-Roman")
    .text(
      "L'assemblée approuve les conventions règlementées telles que prévues par le code des sociétés commerciales."
    )
    .text("Cette résolution est adoptée à l'unanimité", {
      align: "right",
      underline: { color: "black", width: 0.1 },
    });

  doc.moveDown();
  doc
    .fontSize(11)
    .font("Times-Bold")
    .text("CINQUIEME RESOLUTION", { underline: true });

  doc
    .fontSize(11)
    .font("Times-Roman")
    .text(
      `L'Assemblée décide l'affectaion des resultats de façon suivante: `
    );

  doc
    .fontSize(11)
    .font("Times-Bold")
    .text("RESULTAT REPORT A NOUVEAU n-1", { underline: true });

  //tab
  const tableData = [
    {
      label: formData.resultatExercice,
      value: `${formData.resultatExerciceDinars} Dinars`,
    },
    {
      label: `Solde disponible`,
      value: `${formData.soldeDisponibleDinars} Dinars`,
    },
    {
      label: `Dividende à distribuer brut `,
      value: `${formData.dividendesBrutsDinars} Dinars`,
    },
    {
      label: `10% Retenue à la source sur dividendes  `,
      value: `${formData.retenueSourceDinars} Dinars`,
    },
    {
      label: `Dividende à distribuer net`,
      value: `${formData.dividendesNetDinars} Dinars`,
    },
  ];

  tableData.forEach((row) => {
    doc
      .fontSize(11)
      .font("Times-Roman")
      .text(`- ${row.label}`, { continued: true, indent: 20 })
      .text(`: ${row.value}`, { indent: -20, align: "right" });
  });
  doc.moveDown();

  formData.participants.forEach((participant) => {
    doc
      .fontSize(11)
      .font("Times-Bold")

      .text(
        ` • ${participant.genre} ${participant.nom} ${participant.prenom} :`,
        { continued: true, indent: 50 }
      )
      .text(` ${participant.partDinars} Dinars`, {
        indent: -20,
        align: "right",
      });
  });

  doc
    .fontSize(11)
    .font("Times-Roman")

    // First text block with underline and indent
    .text("RESULTAT REPORTER", {
      underline: true,
      indent: 20,
    })

    // Second text block aligned to the right with underline
    .text("Cette résolution est adoptée à l'unanimité", {
      align: "right",
      underline: { color: "black", width: 0.1 },
    })
    .text("");

  doc.moveDown();
  doc
    .fontSize(11)
    .font("Times-Bold")
    .text("SIXIEME RESOLUTION", { underline: true });
  doc
    .fontSize(11)
    .font("Times-Roman")
    .text(
      "Tous pouvoirs sont donnés au porteur des copies ou d'extrais du présent procès verbal pour effectuer le dépôt et les publications prescrites par la loi. "
    )
    .text("Cette résolution est adoptée à l'unanimité", {
      align: "right",
      underline: { color: "black", width: 0.1 },
    });

  doc.moveDown();

  // Convert hourEnd and minuteEnd to words
  const hourEnd = formData.hourEnd;
  const hourEndInWords = numberToWordTime(hourEnd);
  const hourEndLabel = hourEnd > 1 ? "heures" : "heure";
  let timeEndInWords = `${hourEndInWords} ${hourEndLabel}`;

  if (formData.minuteEnd) {
    const minuteEnd = formData.minuteEnd;
    const minuteEndInWords = numberToWordTime(minuteEnd);
    timeEndInWords += ` ${minuteEndInWords} minutes`;
  }

  doc
    .fontSize(11)
    .font("Times-Roman")
    .text(
      `Rien n'étant à l'ordre du jour, la séance est levée à ${timeEndInWords}. De tout ceci, il a été dressé le présent procès-verbal qui, après lecture, a été signé par l’assemblée.`
    );

  doc.moveDown();

  doc.moveDown();

  doc
    .fontSize(11)
    .font("Times-Bold")
    .text("SIGNATURE", { underline: true, align: "center" });

  doc.moveDown();

  const participants = formData.participants;
  const participantsPerLine = 3;
  const pageWidth =
    doc.page.width - doc.page.margins.left - doc.page.margins.right;

  participants.forEach((participant, index) => {
    if (index % participantsPerLine === 0 && index !== 0) {
      doc.moveDown(); // Move to the next line after every three participants
      doc.moveDown();
      doc.moveDown();
    }

    const participantsInCurrentLine = Math.min(
      participantsPerLine,
      participants.length -
        Math.floor(index / participantsPerLine) * participantsPerLine
    );
    const spaceWidth =
      (pageWidth - participantsInCurrentLine * 50) /
      (participantsInCurrentLine - 1);

    if (index % participantsPerLine !== 0) {
      doc.text(" ".repeat(spaceWidth / 8), { continued: true }); // Add spacing between participants on the same line
    }

    doc
      .fontSize(11)
      .font("Times-Bold")
      .text(
        `Mme /Mr ..............`,
        { continued: index % participantsPerLine !== participantsPerLine - 1 } // Continue on the same line for first two participants in each line
      );
  });

  doc.text(""); // Finish the last line
};

const generatePVAGOSarlContractPDF = async (formData) => {
  return await generatePDF((doc) => PVAGOSarlContract(doc, formData));
};

export default generatePVAGOSarlContractPDF;
