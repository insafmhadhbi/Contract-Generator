// import generatePDF from "../pdf.js";
// import PDFDocument from "pdfkit";
// import path from "path";
// import { fileURLToPath } from "url";
// import fs from "fs";

// const insertLineBreaks = (text, maxCharsPerLine) => {
//   const regex = new RegExp(`.{1,${maxCharsPerLine}}`, "g");
//   return text.match(regex).join("\n");
// };

// // Get the directory name from import.meta.url
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Adjust this to the absolute path where your image is stored
// const imagePath = path.resolve(__dirname, "image/RneModifPhy.jpg");

// // Check if the image exists
// if (!fs.existsSync(imagePath)) {
//   console.error(`Image not found at path: ${imagePath}`);
// } else {
//   console.log(`Image found at path: ${imagePath}`);
// }

// const RNEPhyModifContrat = (doc, formData) => {
//   // Get the page dimensions
//   const pageWidth = doc.page.width;
//   const pageHeight = doc.page.height;

//   // Get the image dimensions
//   const image = doc.openImage(imagePath);
//   const imageWidth = image.width;

//   // Calculate the scale factor based on width only
//   const scale = pageWidth / imageWidth;

//   // Calculate the final dimensions of the image
//   const finalWidth = pageWidth;
//   const finalHeight = image.height * scale * 0.915; // Adjust this factor as needed

//   // Calculate the top position to place the image
//   const top = (pageHeight - finalHeight) / 2;

//   // Add the image centered on the page width
//   doc.image(imagePath, 0, top, {
//     width: finalWidth,
//     height: finalHeight,
//     align: "center",
//     valign: "top",
//   });

//   doc.moveDown(4);
//   const formattedIdentifiant = formData.identifiantUnique
//     .split("")
//     .join("     ");

//   doc
//     .fontSize(16)
//     .font("Times-Bold")
//     .text(`                                ${formattedIdentifiant}`, {
//       align: "left",
//     });

//   doc.moveDown(2);
//   const formattedCertificatReservation = formData.certificatReservation
//     .split("")
//     .join("\u200A\u200A  ");

//   doc
//     .fontSize(15)
//     .font("Times-Bold")
//     .text(`           ${formattedCertificatReservation}`, {
//       align: "left",
//     });

//   doc.moveDown(0.3);

//   doc
//     .fontSize(14)
//     .font("Times-Bold")
//     .text(`${formData.nom} ${formData.prenom}`, {
//       align: "center",
//     });

//   doc.moveDown(0.8);
//   const formattedID = formData.numeroIdentiteDeclarant.split("").join("   ");

//   doc
//     .fontSize(15)
//     .font("Times-Bold")
//     .text(`                                    ${formattedID}`, {
//       align: "left",
//     });

//   doc.moveDown(0.15);

//   doc.fontSize(14).font("Times-Bold").text(`${formData.email}`, {
//     align: "center",
//   });

//   doc.moveDown(0.3);

//   doc.fontSize(14).font("Times-Bold").text(`${formData.numGsm}`, {
//     align: "center",
//   });
//   doc.moveDown(0.35);

//   doc
//     .fontSize(14)
//     .font("Times-Bold")
//     .text(`${formData.nomDeclarant} ${formData.prenomDeclarant}`, {
//       align: "center",
//     });

//   doc.moveDown(0.4);

//   doc.fontSize(14).font("Times-Bold").text(`${formData.IDdeclarant}`, {
//     align: "center",
//   });

//   doc.moveDown(2); // Move down before adding content

//   // Conditionally render content based on the selected option
//   switch (formData.typeModification) {
//     case "إضافة أو تغيير الإسم التجاري أو الشارة":
//       doc.moveDown(0.6);
//       const xPosition = 576.5; // Adjust this value to your desired position
//       doc.fontSize(14).font("Times-Bold").text("X", xPosition, doc.y, {
//         align: "right",
//       });
//       break;
//     case "غلق فرع":
//       doc.moveDown(2.7);
//       const x2Position = 576.5; // Adjust this value to your desired position
//       doc.fontSize(14).font("Times-Bold").text("X", x2Position, doc.y, {
//         align: "right",
//       });
//       break;
//     case "التشطيب على شخص طبيعي توقف نهائيا عن النشاط":
//       doc.moveDown(4.4);
//       const x3Position = 576.5; // Adjust this value to your desired position
//       doc.fontSize(14).font("Times-Bold").text("X", x3Position, doc.y, {
//         align: "right",
//       });
//       break;

//     case "التصريح بالإبقاء المؤقت على التسجيل عند الوفاة أو تجديده":
//       doc.moveDown(6.5);
//       const x4Position = 576.5; // Adjust this value to your desired position
//       doc.fontSize(14).font("Times-Bold").text("X", x4Position, doc.y, {
//         align: "right",
//       });
//       break;

//     case "التصريح بالإبقاء إثر التوقف الكلي عن النشاط أو تجديده":
//       doc.moveDown(8.2);
//       const x5Position = 576.5; // Adjust this value to your desired position
//       doc.fontSize(14).font("Times-Bold").text("X", x5Position, doc.y, {
//         align: "right",
//       });
//       break;

//     case "تغيير عنوان المقر أو الفرع":
//       doc.moveDown(0.4);
//       const x6Position = 217; // Adjust this value to your desired position
//       doc.fontSize(14).font("Times-Bold").text("X", x6Position, doc.y, {
//         align: "center",
//       });
//       break;

//     case "تغيير الحالة المدنية":
//       doc.moveDown(2.7);
//       const x7Position = 217; // Adjust this value to your desired position
//       doc.fontSize(14).font("Times-Bold").text("X", x7Position, doc.y, {
//         align: "center",
//       });
//       break;

//     case "التوقف الجزئي عن النشاط":
//       doc.moveDown(4.5);
//       const x8Position = 217; // Adjust this value to your desired position
//       doc.fontSize(14).font("Times-Bold").text("X", x8Position, doc.y, {
//         align: "center",
//       });
//       break;

//     case "تغيير أو إضافة نشاط بالأصل أو الفرع":
//       doc.moveDown(0.4);
//       const x9Position = 233.5; // Adjust this value to your desired position
//       doc.fontSize(14).font("Times-Bold").text("X", x9Position, doc.y, {
//         align: "left",
//       });
//       break;

//     case "إ يداع عقود و وثائق":
//       doc.moveDown(2.95);
//       const x10Position = 233.5; // Adjust this value to your desired position
//       doc.fontSize(14).font("Times-Bold").text("X", x10Position, doc.y, {
//         align: "left",
//       });
//       break;

//     case "إستئناف النشاط":
//       doc.moveDown(4.5);
//       const x11Position = 233.5; // Adjust this value to your desired position
//       doc.fontSize(14).font("Times-Bold").text("X", x11Position, doc.y, {
//         align: "left",
//       });
//       break;

//     case "أخرى":
//       doc.moveDown(6.15);
//       const x12Position = 233.5; // Adjust this value to your desired position
//       const autre = 20;
//       // Insert line breaks after a specific number of characters for formData.autreModification
//       const maxCharsPerLine = 33; // Adjust this value as needed
//       const formattedAutreModification = insertLineBreaks(
//         formData.autreModification,
//         maxCharsPerLine
//       );
//       doc
//         .fontSize(11)
//         .font("Times-Bold")
//         .text("X", x12Position, doc.y, { continued: true })
//         .text(`${formattedAutreModification}`, autre, doc.y, { align: "left" });
//       break;

//     case "إضافة فرع":
//       doc.moveDown(0.4);
//       const x13Position = 98; // Adjust this value to your desired position
//       doc.fontSize(14).font("Times-Bold").text("X", x13Position, doc.y, {
//         align: "left",
//       });
//       break;

//     case "إيداع القوائم المالية":
//       doc.moveDown(2.95);
//       const x14Position = 98; // Adjust this value to your desired position
//       doc.fontSize(14).font("Times-Bold").text("X", x14Position, doc.y, {
//         align: "left",
//       });
//       break;
//   }
//   // Ensure formData.Date is a Date object and convert it to a string in the format "YYYY-MM-DD"
//   const date = new Date(formData.date);
//   const year = date.getFullYear().toString();
//   const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so add 1
//   const day = date.getDate().toString().padStart(2, "0");

//   // Define the positions for day, month, and year
//   const dayPosition = { x: 122, y: 700 }; // Example position for day
//   const monthPosition = { x: 100, y: 700 }; // Example position for month
//   const yearPosition = { x: 58, y: 700 }; // Example position for year

//   // Add day to the PDF
//   doc.fontSize(14).font("Times-Bold").text(day, dayPosition.x, dayPosition.y);

//   // Add month to the PDF
//   doc
//     .fontSize(14)
//     .font("Times-Bold")
//     .text(month, monthPosition.x, monthPosition.y);

//   // Add year to the PDF
//   doc
//     .fontSize(14)
//     .font("Times-Bold")
//     .text(year, yearPosition.x, yearPosition.y);
// };

// const generateRNEPhyModifContratPDF = async (formData) => {
//   return await generatePDF((doc) => RNEPhyModifContrat(doc, formData));
// };

// export default generateRNEPhyModifContratPDF;

import generatePDF from "../pdf.js";

import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const insertLineBreaks = (text, maxCharsPerLine) => {
  const regex = new RegExp(`.{1,${maxCharsPerLine}}`, "g");
  return text.match(regex).join("\n");
};

// Get the directory name from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adjust this to the absolute path where your image is stored
const imagePath = path.resolve(__dirname, "image/RneModifPhy.jpg");

// Check if the image exists
if (!fs.existsSync(imagePath)) {
  console.error(`Image not found at path: ${imagePath}`);
} else {
  console.log(`Image found at path: ${imagePath}`);
}

const containsArabic = (text) => {
  const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
  return arabicRegex.test(text);
};

// Function to load the Arabic font
const loadArabicFont = (doc) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const fontPath = path.join(__dirname, "Amiri", "Amiri-Regular.ttf");
  doc.registerFont("Amiri", fontPath);
};

const RNEPhyModifContrat = (doc, formData) => {
  loadArabicFont(doc);
  // Get the page dimensions
  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;

  // Get the image dimensions
  const image = doc.openImage(imagePath);
  const imageWidth = image.width;

  // Calculate the scale factor based on width only
  const scale = pageWidth / imageWidth;

  // Calculate the final dimensions of the image
  const finalWidth = pageWidth;
  const finalHeight = image.height * scale * 0.915; // Adjust this factor as needed

  // Calculate the top position to place the image
  const top = (pageHeight - finalHeight) / 2;

  // Add the image centered on the page width
  doc.image(imagePath, 0, top, {
    width: finalWidth,
    height: finalHeight,
    align: "center",
    valign: "top",
  });

  doc.moveDown(4);
  const formattedIdentifiant = formData.identifiantUnique
    .split("")
    .join("     ");

  doc
    .fontSize(16)
    .font("Times-Bold")
    .text(`                                ${formattedIdentifiant}`, {
      align: "left",
    });

  doc.moveDown(2);
  const formattedCertificatReservation = formData.certificatReservation
    .split("")
    .join("\u200A\u200A  ");

  doc
    .fontSize(15)
    .font("Times-Bold")
    .text(`           ${formattedCertificatReservation}`, {
      align: "left",
    });

  //doc.moveDown(0.3);

  // doc
  //   .fontSize(14)
  //   .font("Times-Bold")
  //   .text(`${formData.nom} ${formData.prenom}`, {
  //     align: "center",
  //   });

  // const fullName = `${formData.prenom} ${formData.nom}`;
  // const isArabic = containsArabic(fullName);

  // if (isArabic) {
  //   doc.moveDown(0);
  //   doc.fontSize(14).font("Amiri").text(`${formData.nom} ${formData.prenom}`, {
  //     align: "center",
  //   });
  //   doc.moveDown(-0.4);
  // } else {
  //   doc.moveDown(0.3);
  //   doc
  //     .fontSize(14)
  //     .font("Times-Bold")
  //     .text(`${formData.nom} ${formData.prenom}`, {
  //       align: "center",
  //     });
  // }

  const fullName = `${formData.prenom} ${formData.nom}`;
  const isArabic = containsArabic(fullName);

  if (isArabic) {
    // Split the full name into words, reverse the order, and join them back
    const reversedName = fullName.split(" ").reverse().join(" ");

    doc.moveDown(0);
    doc.fontSize(14).font("Amiri").text(reversedName, {
      align: "center",
    });
    doc.moveDown(-0.4);
  } else {
    doc.moveDown(0.3);
    doc.fontSize(14).font("Times-Bold").text(fullName, {
      align: "center",
    });
  }

  doc.moveDown(0.8);
  const formattedID = formData.numeroIdentiteDeclarant.split("").join("   ");

  doc
    .fontSize(15)
    .font("Times-Bold")
    .text(`                                    ${formattedID}`, {
      align: "left",
    });

  doc.moveDown(0.15);

  doc.fontSize(14).font("Times-Bold").text(`${formData.email}`, {
    align: "center",
  });

  doc.moveDown(0.3);

  doc.fontSize(14).font("Times-Bold").text(`${formData.numGsm}`, {
    align: "center",
  });
  // doc.moveDown(0.35);

  // doc
  //   .fontSize(14)
  //   .font("Times-Bold")
  //   .text(`${formData.nomDeclarant} ${formData.prenomDeclarant}`, {
  //     align: "center",
  //   });

  const fullName2 = `${formData.prenomDeclarant} ${formData.nomDeclarant}`;
  const isArabic2 = containsArabic(fullName2);

  if (isArabic2) {
    const reversedName = fullName2.split(" ").reverse().join(" ");
    doc.fontSize(14).font("Amiri").text(reversedName, {
      align: "center",
    });
    doc.moveDown(0.1);
  } else {
    doc.moveDown(0.3);
    doc
      .fontSize(14)
      .font("Times-Bold")
      .text(`${formData.nomDeclarant} ${formData.prenomDeclarant}`, {
        align: "center",
      });
    doc.moveDown(0.5);
  }

  doc.fontSize(14).font("Times-Bold").text(`${formData.IDdeclarant}`, {
    align: "center",
  });

  doc.moveDown(2); // Move down before adding content

  // Conditionally render content based on the selected option
  switch (formData.typeModification) {
    case "إضافة أو تغيير الإسم التجاري أو الشارة":
      doc.moveDown(0.6);
      const xPosition = 576.5; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", xPosition, doc.y, {
        align: "right",
      });
      break;
    case "غلق فرع":
      doc.moveDown(2.7);
      const x2Position = 576.5; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x2Position, doc.y, {
        align: "right",
      });
      break;
    case "التشطيب على شخص طبيعي توقف نهائيا عن النشاط":
      doc.moveDown(4.4);
      const x3Position = 576.5; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x3Position, doc.y, {
        align: "right",
      });
      break;

    case "التصريح بالإبقاء المؤقت على التسجيل عند الوفاة أو تجديده":
      doc.moveDown(6.5);
      const x4Position = 576.5; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x4Position, doc.y, {
        align: "right",
      });
      break;

    case "التصريح بالإبقاء إثر التوقف الكلي عن النشاط أو تجديده":
      doc.moveDown(8.2);
      const x5Position = 576.5; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x5Position, doc.y, {
        align: "right",
      });
      break;

    case "تغيير عنوان المقر أو الفرع":
      doc.moveDown(0.4);
      const x6Position = 217; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x6Position, doc.y, {
        align: "center",
      });
      break;

    case "تغيير الحالة المدنية":
      doc.moveDown(2.7);
      const x7Position = 217; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x7Position, doc.y, {
        align: "center",
      });
      break;

    case "التوقف الجزئي عن النشاط":
      doc.moveDown(4.5);
      const x8Position = 217; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x8Position, doc.y, {
        align: "center",
      });
      break;

    case "تغيير أو إضافة نشاط بالأصل أو الفرع":
      doc.moveDown(0.4);
      const x9Position = 233.5; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x9Position, doc.y, {
        align: "left",
      });
      break;

    case "إ يداع عقود و وثائق":
      doc.moveDown(2.95);
      const x10Position = 233.5; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x10Position, doc.y, {
        align: "left",
      });
      break;

    case "إستئناف النشاط":
      doc.moveDown(4.5);
      const x11Position = 233.5; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x11Position, doc.y, {
        align: "left",
      });
      break;

    case "أخرى":
      doc.moveDown(6.15);
      const x12Position = 233.5; // Adjust this value to your desired position
      const autre = 20;
      // Insert line breaks after a specific number of characters for formData.autreModification
      const maxCharsPerLine = 33; // Adjust this value as needed
      const formattedAutreModification = insertLineBreaks(
        formData.autreModification,
        maxCharsPerLine
      );
      doc
        .fontSize(11)
        .font("Times-Bold")
        .text("X", x12Position, doc.y, { continued: true })
        .text(`${formattedAutreModification}`, autre, doc.y, { align: "left" });
      break;

    case "إضافة فرع":
      doc.moveDown(0.4);
      const x13Position = 98; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x13Position, doc.y, {
        align: "left",
      });
      break;

    case "إيداع القوائم المالية":
      doc.moveDown(2.95);
      const x14Position = 98; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x14Position, doc.y, {
        align: "left",
      });
      break;
  }
  // Ensure formData.Date is a Date object and convert it to a string in the format "YYYY-MM-DD"
  const date = new Date(formData.date);
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so add 1
  const day = date.getDate().toString().padStart(2, "0");

  // Define the positions for day, month, and year
  const dayPosition = { x: 122, y: 700 }; // Example position for day
  const monthPosition = { x: 100, y: 700 }; // Example position for month
  const yearPosition = { x: 58, y: 700 }; // Example position for year

  // Add day to the PDF
  doc.fontSize(14).font("Times-Bold").text(day, dayPosition.x, dayPosition.y);

  // Add month to the PDF
  doc
    .fontSize(14)
    .font("Times-Bold")
    .text(month, monthPosition.x, monthPosition.y);

  // Add year to the PDF
  doc
    .fontSize(14)
    .font("Times-Bold")
    .text(year, yearPosition.x, yearPosition.y);
};

const generateRNEPhyModifContratPDF = async (formData) => {
  return await generatePDF((doc) => RNEPhyModifContrat(doc, formData));
};

export default generateRNEPhyModifContratPDF;
