// import generatePDF from "../pdf.js";

// import path from "path";
// import { fileURLToPath } from "url";
// import fs from "fs";

// // Get the directory name from import.meta.url
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Adjust this to the absolute path where your image is stored
// const imagePath = path.resolve(__dirname, "image/RneImmPhy.jpg");

// // Check if the image exists
// if (!fs.existsSync(imagePath)) {
//   console.error(`Image not found at path: ${imagePath}`);
// } else {
//   console.log(`Image found at path: ${imagePath}`);
// }

// // const RNEPhyImmContartContart = (doc, formData) => {
// //   //Get the page dimensions
// //   const pageWidth = doc.page.width;
// //   const pageHeight = doc.page.height;

// //   // Get the image dimensions
// //   const image = doc.openImage(imagePath);
// //   const imageWidth = image.width;

// //   // Calculate the scale factor based on width only
// //   const scale = pageWidth / imageWidth;

// //   // Calculate the final dimensions of the image
// //   const finalWidth = pageWidth;
// //   const finalHeight = image.height * scale * 0.915; // Adjust this factor as needed

// //   // Calculate the top position to place the image
// //   const top = (pageHeight - finalHeight) / 2;

// //   // Add the image centered on the page width
// //   doc.image(imagePath, 0, top, {
// //     width: finalWidth,
// //     height: finalHeight,
// //     align: "center",
// //     valign: "top",
// //   });

// //   switch (formData.profession) {
// //     case "Métier Libéral - مهنة حرة":
// //       doc.moveDown(2.8);
// //       const x1Position = 530;
// //       doc.fontSize(14).font("Times-Bold").text("X", x1Position, doc.y, {
// //         align: "left",
// //       });
// //       break;

// //     case "Artisan - حرفي":
// //       doc.moveDown(2.8);
// //       const x2Position = 135;
// //       doc.fontSize(14).font("Times-Bold").text("X", x2Position, doc.y, {
// //         align: "center",
// //       });
// //       break;

// //     case "Commerçant - تاجر":
// //       doc.moveDown(2.8);
// //       const x3Position = 160;
// //       doc.fontSize(14).font("Times-Bold").text("X", x3Position, doc.y, {
// //         align: "left",
// //       });
// //       break;
// //   }
// //   doc.moveDown(2.6);

// //   // Format the identifiant with spaces between characters
// //   const formattedIdentifiant = formData.identifiantUnique
// //     .split("")
// //     .join("     ");

// //   // Set the x-coordinate for the starting position
// //   const xPosition = 205; // Adjust this value to move the text from the left

// //   // Add the formattedIdentifiant text at the specified position
// //   doc
// //     .fontSize(16)
// //     .font("Times-Bold")
// //     .text(formattedIdentifiant, xPosition, doc.y, {
// //       align: "left",
// //     });

// //   doc.moveDown(2);

// //   // Format the identifiant with spaces between characters
// //   const formattedCertif = formData.numCertificatReservation
// //     .split("")
// //     .join("      ");

// //   // Set the x-coordinate for the starting position
// //   const certifPosition = 110; // Adjust this value to move the text from the left

// //   // Add the formattedIdentifiant text at the specified position
// //   doc
// //     .fontSize(15)
// //     .font("Times-Bold")
// //     .text(formattedCertif, certifPosition, doc.y, {
// //       align: "left",
// //     });

// //   doc.moveDown(0.5);

// //   doc
// //     .fontSize(14)
// //     .font("Times-Bold")
// //     .text(`${formData.prénom} ${formData.nom}`, {
// //       align: "center",
// //     });

// //   switch (formData.typePieceIdentite) {
// //     case "CIN - بطاقة تعريف":
// //       doc.moveDown(1.7);
// //       const x1Position = 561;
// //       doc.fontSize(14).font("Times-Bold").text("x", x1Position, doc.y, {
// //         align: "left",
// //       });
// //       break;

// //     case "PASSEPORT - رقم جواز سفر":
// //       doc.moveDown(1.7);
// //       const x2Position = 449;
// //       doc.fontSize(14).font("Times-Bold").text("x", x2Position, doc.y, {
// //         align: "left",
// //       });
// //       break;

// //     case "CARTE DE SEJOUR - بطاقة إقامة":
// //       doc.moveDown(1.7);
// //       const x3Position = 319;
// //       doc.fontSize(14).font("Times-Bold").text("x", x3Position, doc.y, {
// //         align: "left",
// //       });
// //       break;

// //     case "CARTE CONSULAIRE - بطاقة قنصلية":
// //       doc.moveDown(1.7);
// //       const x4Position = 166;
// //       doc.fontSize(14).font("Times-Bold").text("x", x4Position, doc.y, {
// //         align: "left",
// //       });
// //       break;
// //   }

// //   doc.moveDown(1.7);

// //   // Format the identifiant with spaces between characters
// //   const formattedID = formData.ID.split("").join("   ");

// //   // Set the x-coordinate for the starting position
// //   const IDPosition = 204; // Adjust this value to move the text from the left

// //   // Add the formattedIdentifiant text at the specified position
// //   doc.fontSize(15).font("Times-Bold").text(formattedID, IDPosition, doc.y, {
// //     align: "left",
// //   });

// //   doc.moveDown(0.4);

// //   const emailPosition = 205; // Adjust this value to move the text from the left

// //   // Add the formattedIdentifiant text at the specified position
// //   doc
// //     .fontSize(15)
// //     .font("Times-Bold")
// //     .text(formData.Email, emailPosition, doc.y, {
// //       align: "left",
// //     });

// //   doc.moveDown(0.4);

// //   const numGSMPosition = 220;
// //   doc
// //     .fontSize(15)
// //     .font("Times-Bold")
// //     .text(formData.numGSM, numGSMPosition, doc.y, {
// //       align: "left",
// //     });

// //   doc.moveDown(0.4);

// //   const nomDéposantPosition = 250;
// //   doc
// //     .fontSize(15)
// //     .font("Times-Bold")
// //     .text(formData.nomDéposant, nomDéposantPosition, doc.y, {
// //       align: "left",
// //     });

// //   doc.moveDown(0.4);

// //   const numIDdéposantPosition = 250;
// //   doc
// //     .fontSize(15)
// //     .font("Times-Bold")
// //     .text(formData.numIDdéposant, numIDdéposantPosition, doc.y, {
// //       align: "left",
// //     });

// //   const date = new Date(formData.date);
// //   const year = date.getFullYear().toString();
// //   const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so add 1
// //   const day = date.getDate().toString().padStart(2, "0");

// //   // Define the positions for day, month, and year
// //   const dayPosition = { x: 127, y: 643 }; // Example position for day
// //   const monthPosition = { x: 104, y: 643 }; // Example position for month
// //   const yearPosition = { x: 62, y: 643 }; // Example position for year

// //   // Add day to the PDF
// //   doc.fontSize(14).font("Times-Bold").text(day, dayPosition.x, dayPosition.y);

// //   // Add month to the PDF
// //   doc
// //     .fontSize(14)
// //     .font("Times-Bold")
// //     .text(month, monthPosition.x, monthPosition.y);

// //   // Add year to the PDF
// //   doc
// //     .fontSize(14)
// //     .font("Times-Bold")
// //     .text(year, yearPosition.x, yearPosition.y);
// // };

// // const generateRNEPhyImmContartPDF = async (formData) => {
// //   return await generatePDF((doc) => RNEPhyImmContartContart(doc, formData));
// // };

// // export default generateRNEPhyImmContartPDF;

// const RNEPhyImmContartContart = (doc, formData) => {
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

//   let currentY = 112; // Start at a fixed y position for the first item

//   switch (formData.profession) {
//     case "Métier Libéral - مهنة حرة":
//       const x1Position = 530;
//       doc.fontSize(14).font("Times-Bold").text("X", x1Position, currentY);
//       break;

//     case "Artisan - حرفي":
//       const x2Position = 331;
//       doc.fontSize(14).font("Times-Bold").text("X", x2Position, currentY);
//       break;

//     case "Commerçant - تاجر":
//       const x3Position = 160;
//       doc.fontSize(14).font("Times-Bold").text("X", x3Position, currentY);
//       break;
//   }

//   currentY += 59; // Adjust this value to move down a bit more after the switch cases

//   // Format the identifiant with spaces between characters
//   const formattedIdentifiant = formData.identifiantUnique
//     .split("")
//     .join("     ");

//   // Set the x-coordinate for the starting position
//   const xPosition = 205; // Adjust this value to move the text from the left

//   // Add the formattedIdentifiant text at the specified position
//   doc
//     .fontSize(16)
//     .font("Times-Bold")
//     .text(formattedIdentifiant, xPosition, currentY);

//   currentY += 54; // Adjust this value to move down after adding the identifiant

//   // Format the certificat with spaces between characters
//   const formattedCertif = formData.numCertificatReservation
//     .split("")
//     .join("      ");

//   // Set the x-coordinate for the starting position
//   const certifPosition = 110; // Adjust this value to move the text from the left

//   // Add the formattedCertif text at the specified position
//   doc
//     .fontSize(15)
//     .font("Times-Bold")
//     .text(formattedCertif, certifPosition, currentY);

//   currentY += 26; // Adjust this value to move down after adding the certificat

//   // Add the name at the specified position
//   doc
//     .fontSize(14)
//     .font("Times-Bold")
//     .text(`${formData.prénom} ${formData.nom}`, 50, currentY, {
//       align: "center",
//     });

//   currentY += 43; // Adjust this value to move down after adding the name

//   switch (formData.typePieceIdentite) {
//     case "CIN - بطاقة تعريف":
//       const x4Position = 561;
//       doc.fontSize(14).font("Times-Bold").text("x", x4Position, currentY);
//       break;

//     case "PASSEPORT - رقم جواز سفر":
//       const x5Position = 449;
//       doc.fontSize(14).font("Times-Bold").text("x", x5Position, currentY);
//       break;

//     case "CARTE DE SEJOUR - بطاقة إقامة":
//       const x6Position = 319;
//       doc.fontSize(14).font("Times-Bold").text("x", x6Position, currentY);
//       break;

//     case "CARTE CONSULAIRE - بطاقة قنصلية":
//       const x7Position = 166;
//       doc.fontSize(14).font("Times-Bold").text("x", x7Position, currentY);
//       break;
//   }

//   currentY += 28; // Adjust this value to move down after adding the typePieceIdentite

//   // Format the ID with spaces between characters
//   const formattedID = formData.ID.split("").join("   ");

//   // Set the x-coordinate for the starting position
//   const IDPosition = 204; // Adjust this value to move the text from the left

//   // Add the formattedID text at the specified position
//   doc.fontSize(15).font("Times-Bold").text(formattedID, IDPosition, currentY);

//   currentY += 25; // Adjust this value to move down after adding the ID

//   // Add the email at the specified position
//   const emailPosition = 205; // Adjust this value to move the text from the left
//   doc
//     .fontSize(15)
//     .font("Times-Bold")
//     .text(formData.Email, emailPosition, currentY);

//   currentY += 23; // Adjust this value to move down after adding the email

//   // Add the GSM number at the specified position
//   const numGSMPosition = 220;
//   doc
//     .fontSize(15)
//     .font("Times-Bold")
//     .text(formData.numGSM, numGSMPosition, currentY);

//   currentY += 24; // Adjust this value to move down after adding the GSM number

//   // Add the deposant name at the specified position
//   const nomDéposantPosition = 250;
//   doc
//     .fontSize(15)
//     .font("Times-Bold")
//     .text(formData.nomDéposant, nomDéposantPosition, currentY);

//   currentY += 24; // Adjust this value to move down after adding the deposant name

//   // Add the deposant ID at the specified position
//   const numIDdéposantPosition = 250;
//   doc
//     .fontSize(15)
//     .font("Times-Bold")
//     .text(formData.numIDdéposant, numIDdéposantPosition, currentY);

//   // Format the date
//   const date = new Date(formData.date);
//   const year = date.getFullYear().toString();
//   const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so add 1
//   const day = date.getDate().toString().padStart(2, "0");

//   // Define the positions for day, month, and year
//   const dayPosition = { x: 127, y: 643 }; // Example position for day
//   const monthPosition = { x: 104, y: 643 }; // Example position for month
//   const yearPosition = { x: 62, y: 643 }; // Example position for year

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

// const generateRNEPhyImmContartPDF = async (formData) => {
//   return await generatePDF((doc) => RNEPhyImmContartContart(doc, formData));
// };

// export default generateRNEPhyImmContartPDF;

import generatePDF from "../pdf.js";

import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Get the directory name from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adjust this to the absolute path where your image is stored
const imagePath = path.resolve(__dirname, "image/RneImmPhy.jpg");

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

const RNEPhyImmContartContart = (doc, formData) => {
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

  let currentY = 112; // Start at a fixed y position for the first item

  switch (formData.profession) {
    case "Métier Libéral - مهنة حرة":
      const x1Position = 530;
      doc.fontSize(14).font("Times-Bold").text("X", x1Position, currentY);
      break;

    case "Artisan - حرفي":
      const x2Position = 331;
      doc.fontSize(14).font("Times-Bold").text("X", x2Position, currentY);
      break;

    case "Commerçant - تاجر":
      const x3Position = 160;
      doc.fontSize(14).font("Times-Bold").text("X", x3Position, currentY);
      break;
  }

  currentY += 59; // Adjust this value to move down a bit more after the switch cases

  // Format the identifiant with spaces between characters
  const formattedIdentifiant = formData.identifiantUnique
    .split("")
    .join("     ");

  // Set the x-coordinate for the starting position
  const xPosition = 205; // Adjust this value to move the text from the left

  // Add the formattedIdentifiant text at the specified position
  doc
    .fontSize(16)
    .font("Times-Bold")
    .text(formattedIdentifiant, xPosition, currentY);

  currentY += 54; // Adjust this value to move down after adding the identifiant

  // Format the certificat with spaces between characters
  const formattedCertif = formData.numCertificatReservation
    .split("")
    .join("      ");

  // Set the x-coordinate for the starting position
  const certifPosition = 110; // Adjust this value to move the text from the left

  // Add the formattedCertif text at the specified position
  doc
    .fontSize(15)
    .font("Times-Bold")
    .text(formattedCertif, certifPosition, currentY);

  // currentY += 26; // Adjust this value to move down after adding the certificat

  // Add the name at the specified position
  const fullName = `${formData.prénom} ${formData.nom}`;
  const isArabic = containsArabic(fullName);

  if (isArabic) {
    const reversedName = fullName.split(" ").reverse().join(" ");
    currentY += 20;
    doc.fontSize(14).font("Amiri").text(reversedName, 50, currentY, {
      align: "center",
    });
    currentY += 48;
  } else {
    currentY += 26;
    doc
      .fontSize(14)
      .font("Times-Bold")
      .text(`${formData.prénom} ${formData.nom}`, 50, currentY, {
        align: "center",
      });
    currentY += 43;
  }

  // currentY += 43; // Adjust this value to move down after adding the name

  switch (formData.typePieceIdentite) {
    case "CIN - بطاقة تعريف":
      const x4Position = 561;
      doc.fontSize(14).font("Times-Bold").text("x", x4Position, currentY);
      break;

    case "PASSEPORT - رقم جواز سفر":
      const x5Position = 449;
      doc.fontSize(14).font("Times-Bold").text("x", x5Position, currentY);
      break;

    case "CARTE DE SEJOUR - بطاقة إقامة":
      const x6Position = 319;
      doc.fontSize(14).font("Times-Bold").text("x", x6Position, currentY);
      break;

    case "CARTE CONSULAIRE - بطاقة قنصلية":
      const x7Position = 166;
      doc.fontSize(14).font("Times-Bold").text("x", x7Position, currentY);
      break;
  }

  currentY += 28; // Adjust this value to move down after adding the typePieceIdentite

  // Format the ID with spaces between characters
  const formattedID = formData.ID.split("").join("   ");

  // Set the x-coordinate for the starting position
  const IDPosition = 204; // Adjust this value to move the text from the left

  // Add the formattedID text at the specified position
  doc.fontSize(15).font("Times-Bold").text(formattedID, IDPosition, currentY);

  currentY += 25; // Adjust this value to move down after adding the ID

  //const emailPosition = 205;
  doc.fontSize(15).font("Times-Bold").text(formData.Email, 50, currentY, {
    align: "center",
  });

  currentY += 23; // Adjust this value to move down after adding the email

  // Add the GSM number at the specified position
  //const numGSMPosition = 220;
  doc.fontSize(15).font("Times-Bold").text(formData.numGSM, 50, currentY, {
    align: "center",
  });

  // currentY += 24; // Adjust this value to move down after adding the GSM number
  // const nomDéposantPosition = 250;
  const fullName2 = `${formData.nomDéposant}`;
  const isArabic2 = containsArabic(fullName2);

  if (isArabic2) {
    const reversedName = fullName2.split(" ").reverse().join(" ");
    currentY += 18;
    doc.fontSize(15).font("Amiri").text(reversedName, 50, currentY, {
      align: "center",
    });
    currentY += 8;
  } else {
    currentY += 24;
    doc
      .fontSize(15)
      .font("Times-Bold")
      .text(formData.nomDéposant, 50, currentY, {
        align: "center",
      });
    currentY += 1;
  }
  // Add the deposant name at the specified position
  // const nomDéposantPosition = 250;
  // doc
  //   .fontSize(15)
  //   .font("Amiri")
  //   .text(formData.nomDéposant, nomDéposantPosition, currentY);

  currentY += 24; // Adjust this value to move down after adding the deposant name

  // Add the deposant ID at the specified position
  //const numIDdéposantPosition = 250;
  doc
    .fontSize(15)
    .font("Times-Bold")
    .text(formData.numIDdéposant, 50, currentY, {
      align: "center",
    });

  // Format the date
  const date = new Date(formData.date);
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so add 1
  const day = date.getDate().toString().padStart(2, "0");

  // Define the positions for day, month, and year
  const dayPosition = { x: 127, y: 643 }; // Example position for day
  const monthPosition = { x: 104, y: 643 }; // Example position for month
  const yearPosition = { x: 62, y: 643 }; // Example position for year

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

const generateRNEPhyImmContartPDF = async (formData) => {
  return await generatePDF((doc) => RNEPhyImmContartContart(doc, formData));
};

export default generateRNEPhyImmContartPDF;
