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
// Date formatting function
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const year = date.getFullYear();
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
  const monthInWords = monthsInWords[date.getMonth()];

  return `${day} ${monthInWords} ${year}`;
};

const formatDate2 = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Define the contract PDF generation function
const PVAGOSuarlContract = (doc, formData) => {
  doc
    .fontSize(22)
    .font("Times-Bold")
    .text(`SOCIETE ${formData.nomSociet} SUARL `, { align: "center" });

  doc
    .fontSize(14)
    .font("Times-Bold")
    .text(`S.U.A.R.L. au capital de ${formData.capital} Dinars`, {
      align: "center",
    });

  doc
    .fontSize(14)
    .font("Times-Bold")
    .text(`Siège Social: ${formData.adresse}`, { align: "center" });

  doc
    .fontSize(14)
    .font("Times-Bold")
    .text(`MF: ${formData.MF}`, { align: "center" });

  // doc.fontSize(14).font("Times-Bold").text("", {
  //   underline: true,
  //   align: "center",
  // });
  doc
    .fontSize(14)
    .font("Times-Bold")
    .text(`PROCES VERBAL DE L'ASSEMBLEE GENERALE ORDINAIRE `, {
      align: "center",
      underline: true,
    });
  doc.moveDown();
  // Format the date and add it to the document
  const formattedDate = formatDate(formData.datePva);

  doc
    .fontSize(14)
    .font("Times-Bold")
    .text(`DU ${formattedDate}`, { underline: true, align: "center" });

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
    .fontSize(12)
    .font("Times-Roman")
    .text(
      `${dateInWords} à ${timeInWords}, l'associée unique de la société ${formData.genre} ${formData.nom} ${formData.prenom}, se réuni au siège social pour délibérer sur l'ordre du jour suivant :`
    );

  doc.moveDown();
  doc.fontSize(12).font("Times-Roman").text(`${formData.ordreDuJour}`);

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Roman")
    .text(`Etait présent et a signé la feuille de présence :`, { indent: 20 });

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Roman")
    .text(
      `-${formData.genre} ${formData.nom} ${formData.prenom}, Associée unique et Gérant, détenant ${formData.parts} parts.`
    );

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Roman")
    .text(
      `L'assemblée est présidée par ${formData.genre} ${formData.nom} ${formData.prenom}.`
    );

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Roman")
    .text(
      `La feuille de présence signée fait apparaître que l'associée est présente ou représentée. L'assemblée est donc habilitée à prendre toute décision ordinaire conformément à la loi et aux statuts et est déclarée comme étant régulièrement constituée.`,
      { indent: 20 }
    );

  // doc.moveDown();
  // doc
  //   .fontSize(12)
  //   .font("Times-Roman")
  //   .text(
  //     `${formData.genre} ${formData.nom} ${formData.prenom}, Présidente de l'Assemblée et Gérante de la société dépose sur le bureau les documents suivants, qui sont soumis à la disposition de l'associé :`,
  //     {
  //       indent: 20,
  //     }
  //   );

  doc.moveDown();

  let title;
  if (formData.genre === "Madame") {
    title = "Présidente de l'Assemblée et Gérante";
  } else if (formData.genre === "Monsieur") {
    title = "Président de l'Assemblée et Gérant";
  }

  doc
    .fontSize(12)
    .font("Times-Roman")
    .text(
      `${formData.genre} ${formData.nom} ${formData.prenom}, ${title} de la société dépose sur le bureau les documents suivants, qui sont soumis à la disposition de l'associé :`,
      {
        indent: 20,
      }
    );

  doc
    .fontSize(12)
    .font("Times-Roman")
    .text(`${formData.documentsSoumis}`, { indent: 20 });

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Roman")
    .text(
      `Puis ${formData.genre} ${formData.nom} ${formData.prenom} rappelle que la présente réunion a été convoquée à ce jour, heure et lieu à l'effet de délibérer sur l'ordre du jour indiqué ci-dessus.`,
      { indent: 20 }
    );

  doc.moveDown();

  let President;
  if (formData.genre === "Madame") {
    President = "La Présidente";
  } else if (formData.genre === "Monsieur") {
    President = "Le Président";
  }

  doc
    .fontSize(12)
    .font("Times-Roman")
    .text(
      `${President} met successivement les résolutions suivantes figurant à l'ordre du jour:`,
      { indent: 20 }
    );

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("PREMIERE RESOLUTION", { underline: true, align: "center" });

  doc.moveDown();
  doc.fontSize(12).font("Times-Roman").text(`${formData.premiereResolution}`, {
    indent: 20,
  });
  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("Cette résolution est adoptée à l'unanimité.", {
      indent: 200,
    });
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("DEUXIEME RESOLUTION", { underline: true, align: "center" });

  doc.moveDown();
  doc.fontSize(12).font("Times-Roman").text(`${formData.deuxiemeResolution}`, {
    indent: 20,
  });
  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("Cette résolution est adoptée à l'unanimité.", {
      indent: 200,
    });

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("TROISIEME RESOLUTION", { underline: true, align: "center" });

  doc.moveDown();
  doc.fontSize(12).font("Times-Roman").text(`${formData.troisiemeResolution}`, {
    indent: 20,
  });

  doc.moveDown();

  const formattedDateReporte = formatDate2(formData.dateReporte);

  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(`Résultat Reporté au ${formattedDateReporte}`, {
      continued: true,
      indent: 60,
    })
    .text(`${formData.montantDnt1} DT`, { align: "right" });

  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(`Bénéfice de l'exercice ${formData.beneficeExercice}`, {
      continued: true,
      indent: 60,
    })
    .text(`${formData.montantDnt2} DT`, { align: "right" });

  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(
      `____________________________________________________________________`,
      { indent: 60 }
    );
  doc.moveDown();
  const somme = formData.montantDnt2 + formData.montantDnt1;
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(`Résultat  Disponible :`, {
      continued: true,
      indent: 60,
    })
    .text(`${somme} DT`, { align: "right" });
  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Roman")
    .text(
      `------------------------------------------------------------------------------------------------------`,
      {
        indent: 60,
      }
    );

  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(`Dividende à distribuer Brut `, {
      continued: true,
      indent: 60,
    })
    .text(`${formData.montantDnt3} DT`, { align: "right" });

  // Calculate 10% of montantEuro3
  const montantDnt3Pourcent = formData.montantDnt3 * 0.1;

  const montantEuro3Pourcent = formData.montantEuro3 * 0.1;
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(`Retenue à la source 10% `, {
      continued: true,
      indent: 60,
    })
    .text(`${montantDnt3Pourcent} DT`, { align: "right" });

  //calcul Dividende à distribuer Net
  const montantDnt4Brut = formData.montantDnt3 - montantDnt3Pourcent;

  const montantEuro4Brut = formData.montantEuro3 - montantEuro3Pourcent;
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(`Dividende à distribuer Net `, {
      continued: true,
      indent: 60,
    })
    .text(`${montantDnt4Brut} DT`, { align: "right" });

  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(
      `------------------------------------------------------------------------------------------------------`,
      {
        indent: 60,
      }
    );

  const repotNouv = somme - formData.montantDnt3;

  doc
    .fontSize(12)
    .font("Times-Bold")
    .text(`Report à nouveau  `, {
      continued: true,
      indent: 60,
    })
    .text(`${repotNouv} DT`, { align: "right" });

  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("Cette résolution est adoptée à l'unanimité.", {
      indent: 200,
    });
  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("QUATRIEME RESOLUTION", { underline: true, align: "center" });
  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Roman")
    .text(
      `Tous pouvoirs sont donnés au porteur des copies ou d'extraits du présent Procès Verbal pour faire tous dépôts et accomplir toutes formalités.`,
      {
        indent: 20,
      }
    );
  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Bold")
    .text("Cette résolution est adoptée à l'unanimité.", {
      indent: 200,
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
    .fontSize(12)
    .font("Times-Roman")
    .text(
      `Rien n'étant à l'ordre du jour, la séance est levée à ${timeEndInWords}.\nAprès lecture faite, le présent Procès Verbal a été signé par les associés présents.`
    );
  doc.moveDown();
  doc.moveDown();
  doc.fontSize(14).font("Times-Bold").text(`Signature`, {
    align: "center",
  });
  doc.moveDown();
  doc
    .fontSize(12)
    .font("Times-Roman")
    .text(
      `Associé unique\n  ${formData.genre} ...................
`,
      {
        align: "center",
      }
    );
};

// Define the function to generate the PDF
const generatePVAGOSuarlContractPDF = async (formData) => {
  return await generatePDF((doc) => PVAGOSuarlContract(doc, formData));
};

export default generatePVAGOSuarlContractPDF;
