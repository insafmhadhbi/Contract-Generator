// import generatePDF from "../pdf.js";

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

// // Adjust this to the absolute path where your images are stored
// const imagePath1 = path.resolve(__dirname, "image/RENModifSociete01.jpg");
// const imagePath2 = path.resolve(__dirname, "image/RNEModifSociete02.jpg");

// // Check if the images exist
// if (!fs.existsSync(imagePath1)) {
//   console.error(`Image not found at path: ${imagePath1}`);
// } else {
//   console.log(`Image found at path: ${imagePath1}`);
// }

// if (!fs.existsSync(imagePath2)) {
//   console.error(`Image not found at path: ${imagePath2}`);
// } else {
//   console.log(`Image found at path: ${imagePath2}`);
// }

// const containsArabic = (text) => {
//   const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
//   return arabicRegex.test(text);
// };

// // Function to load the Arabic font
// const loadArabicFont = (doc) => {
//   const __filename = fileURLToPath(import.meta.url);
//   const __dirname = path.dirname(__filename);
//   const fontPath = path.join(__dirname, "Amiri", "Amiri-Regular.ttf");
//   doc.registerFont("Amiri", fontPath);
// };

// const RNESocieteModifContrat = (doc, formData) => {
//   loadArabicFont(doc);

//   // Get the page dimensions
//   const pageWidth = doc.page.width;
//   const pageHeight = doc.page.height;

//   // Function to add an image to the current page
//   const addImageToPage = (imagePath) => {
//     const image = doc.openImage(imagePath);
//     const imageWidth = image.width;

//     // Calculate the scale factor based on width only
//     const scale = pageWidth / imageWidth;

//     // Calculate the final dimensions of the image
//     const finalWidth = pageWidth;
//     const finalHeight = image.height * scale * 0.915; // Adjust this factor as needed

//     // Calculate the top position to place the image
//     const top = (pageHeight - finalHeight) / 2;

//     // Add the image centered on the page width
//     doc.image(imagePath, 0, top, {
//       width: finalWidth,
//       height: finalHeight,
//       align: "center",
//       valign: "top",
//     });
//   };

//   // Add the first image on the first page
//   addImageToPage(imagePath1);
//   doc.moveDown(4.5);
//   const formattedIdentifiant = formData.identifiantUnique
//     .split("")
//     .join("     ");

//   doc
//     .fontSize(16)
//     .font("Times-Bold")
//     .text(`                                ${formattedIdentifiant}`, {
//       align: "left",
//     });
//   doc.moveDown(1.8);
//   const formattedCertificatReservation = formData.certificatReservation
//     .split("")
//     .join("\u200A\u200A  ");

//   doc
//     .fontSize(15)
//     .font("Times-Bold")
//     .text(`           ${formattedCertificatReservation}`, {
//       align: "left",
//     });

//   doc.moveDown(2);
//   const formattedRib = formData.rib.split("").join("     ");

//   doc.fontSize(14).font("Times-Bold").text(`${formattedRib}`, {
//     align: "left",
//     indent: -27,
//   });
//   // Add a new page for the second image
//   doc.addPage();

//   // Add the second image on the second page
//   addImageToPage(imagePath2);
// };

// const generateRNESocieteModifContratPDF = async (formData) => {
//   return await generatePDF((doc) => RNESocieteModifContrat(doc, formData));
// };

// export default generateRNESocieteModifContratPDF;

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

// Adjust this to the absolute path where your images are stored
const imagePath1 = path.resolve(__dirname, "image/RENModifSociete01.jpg");
const imagePath2 = path.resolve(__dirname, "image/RNEModifSociete02.jpg");

// Check if the images exist
if (!fs.existsSync(imagePath1)) {
  console.error(`Image not found at path: ${imagePath1}`);
} else {
  console.log(`Image found at path: ${imagePath1}`);
}

if (!fs.existsSync(imagePath2)) {
  console.error(`Image not found at path: ${imagePath2}`);
} else {
  console.log(`Image found at path: ${imagePath2}`);
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

const RNESocieteModifContrat = (doc, formData) => {
  loadArabicFont(doc);

  // Get the page dimensions
  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;

  // Function to add an image to the current page
  const addImageToPage = (imagePath) => {
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
  };

  // Add the first image on the first page
  addImageToPage(imagePath1);

  // Move down and add formattedIdentifiant
  doc.moveDown(4.5);
  const formattedIdentifiant = formData.identifiantUnique
    .split("")
    .join("     ");
  doc
    .fontSize(16)
    .font("Times-Bold")
    .text(`                                ${formattedIdentifiant}`, {
      align: "left",
    });

  // Move down and add formattedCertificatReservation
  doc.moveDown(1.8);
  const formattedCertificatReservation = formData.certificatReservation
    .split("")
    .join("\u200A\u200A  ");
  doc
    .fontSize(15)
    .font("Times-Bold")
    .text(`           ${formattedCertificatReservation}`, {
      align: "left",
    });

  // Move down and add formattedRib
  doc.moveDown(2.2);
  const formattedRib = formData.rib.split("").join("     ");
  const ribXPosition = 50; // Adjust this value to move the text left or right

  // Set the width to a large value to avoid wrapping
  const maxWidth = pageWidth - ribXPosition - 10; // 10 is an arbitrary right margin

  doc
    .fontSize(15)
    .font("Times-Bold")
    .text(`${formattedRib}`, ribXPosition, doc.y, {
      align: "left",
      width: maxWidth, // Ensure it doesn't wrap by setting a large width
      indent: -9,
    });

  const fullName = `${formData.representantLegalPrénom} ${formData.representantLegalNom}`;
  const isArabic = containsArabic(fullName);

  if (isArabic) {
    // Split the full name into words, reverse the order, and join them back
    const reversedName = fullName.split(" ").reverse().join(" ");

    doc.moveDown(0.4);
    doc.fontSize(14).font("Amiri").text(reversedName, {
      align: "center",
    });
    doc.moveDown(-0.4);
  } else {
    doc.moveDown(0.8);
    doc.fontSize(14).font("Times-Bold").text(fullName, {
      align: "center",
    });
  }

  doc.moveDown(0.8);
  const formattedID = formData.numeroIdentite.split("").join("   ");

  doc.fontSize(15).font("Times-Bold").text(`${formattedID}`, {
    align: "left",
    indent: 152,
  });

  doc.moveDown(0.17);

  doc.fontSize(14).font("Times-Bold").text(`${formData.email}`, {
    align: "center",
  });

  doc.moveDown(0.3);

  doc.fontSize(14).font("Times-Bold").text(`${formData.numeroGSM}`, {
    align: "center",
  });

  const fullName2 = `${formData.prenomDeclarant} ${formData.nomDeclarant}`;
  const isArabic2 = containsArabic(fullName2);

  if (isArabic2) {
    const reversedName = fullName2.split(" ").reverse().join(" ");
    doc.fontSize(14).font("Amiri").text(reversedName, {
      align: "center",
    });
    doc.moveDown(0.3);
  } else {
    doc.moveDown(0.3);
    doc
      .fontSize(14)
      .font("Times-Bold")
      .text(`${formData.prenomDeclarant} ${formData.nomDeclarant}`, {
        align: "center",
      });
    doc.moveDown(0.5);
  }

  doc
    .fontSize(14)
    .font("Times-Bold")
    .text(`${formData.numeroIdentiteDeclarant}`, {
      align: "center",
    });

  doc.moveDown(2); // Move down before adding content

  // Conditionally render content based on the selected option
  switch (formData.typeModification) {
    case "تغيير التسمية الإجتماعية أو الإسم التجاري أو الشارة":
      doc.moveDown(0.6);
      const xPosition = 583; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", xPosition, doc.y, {
        align: "right",
      });
      break;
    case "إيداع المستفيد الحقيقي":
      doc.moveDown(2.5);
      const x2Position = 583; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x2Position, doc.y, {
        align: "right",
      });
      break;
    case "تغيير عنوان المقر الإجتماعي":
      doc.moveDown(4.5);
      const x3Position = 583; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x3Position, doc.y, {
        align: "right",
      });
      break;

    case "إيداع تقرير التصرف والنشاط":
      doc.moveDown(6.6);
      const x4Position = 583; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x4Position, doc.y, {
        align: "right",
      });
      break;

    case "تحيين الشركاء أو المساهمين":
      doc.moveDown(9);
      const x5Position = 583; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x5Position, doc.y, {
        align: "right",
      });
      break;

    case "إيداع مشروع الإندماج والإنقسام":
      doc.moveDown(11.3);
      const x6Position = 583; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x6Position, doc.y, {
        align: "right",
      });
      break;

    case "تغيير الحساب البنكي":
      doc.moveDown(13.5);
      const x7Position = 583; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x7Position, doc.y, {
        align: "right",
      });
      break;

    case "تعيين / تجديد مهام / تغيير المصفي":
      doc.moveDown(15.6);
      const x8Position = 583; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x8Position, doc.y, {
        align: "right",
      });
      break;

    case "تغيير أو إضافة أو حذف نشاط":
      doc.moveDown(0.4);
      const x9Position = 230; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x9Position, doc.y, {
        align: "center",
      });
      break;

    case "فتح فرع":
      doc.moveDown(2.5);
      const x10Position = 230; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x10Position, doc.y, {
        align: "center",
      });
      break;

    case "تعيين أو تجديد مراقب حسابات":
      doc.moveDown(4.6);
      const x11Position = 230; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x11Position, doc.y, {
        align: "center",
      });
      break;

    case "إيداع عقود أو وثائق اخرى":
      doc.moveDown(6.7);
      const x12Position = 230; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x12Position, doc.y, {
        align: "center",
      });
      break;

    case "إحالة الحصص أو إحالة الأسهم":
      doc.moveDown(9.2);
      const x13Position = 230; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x13Position, doc.y, {
        align: "center",
      });
      break;

    case "الإنقسام":
      doc.moveDown(11.5);
      const x14Position = 230; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x14Position, doc.y, {
        align: "center",
      });
      break;

    case "تغيير تاريخ قفل الموازنة":
      doc.moveDown(13.6);
      const x15Position = 230; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x15Position, doc.y, {
        align: "center",
      });
      break;

    case "إيداع ختم القوائم المالية للتصفية":
      doc.moveDown(15.7);
      const x16Position = 230; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x16Position, doc.y, {
        align: "center",
      });
      break;

    case "تعليق السجل أو إيقاف التعليق":
      doc.moveDown(0.4);
      const x17Position = 240; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x17Position, doc.y, {
        align: "left",
      });
      break;

    case "غلق فرع":
      doc.moveDown(2.5);
      const x18Position = 240; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x18Position, doc.y, {
        align: "left",
      });
      break;

    case "إيداع القوائم المالية":
      doc.moveDown(4.6);
      const x19Position = 240; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x19Position, doc.y, {
        align: "left",
      });
      break;

    case "تحيين القانون الأساسي":
      doc.moveDown(6.7);
      const x20Position = 240; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x20Position, doc.y, {
        align: "left",
      });
      break;

    case "تغيير الشكل القانوني":
      doc.moveDown(9.2);
      const x21Position = 240; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x21Position, doc.y, {
        align: "left",
      });
      break;

    case "إيداع مشروع الترفيع في رأس المال":
      doc.moveDown(11.5);
      const x22Position = 240; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x22Position, doc.y, {
        align: "left",
      });
      break;

    case "الحل والتصفية":
      doc.moveDown(13.6);
      const x23Position = 240; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x23Position, doc.y, {
        align: "left",
      });
      break;

    case "ختم أعمال التصفية":
      doc.moveDown(15.7);
      const x24Position = 240; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x24Position, doc.y, {
        align: "left",
      });
      break;

    case "إدراج عقل / قيود إحتياطية":
      doc.moveDown(0.4);
      const x26Position = 103; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x26Position, doc.y, {
        align: "left",
      });
      break;

    case "تغيير عنوان الفرع":
      doc.moveDown(2.5);
      const x27Position = 103; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x27Position, doc.y, {
        align: "left",
      });
      break;

    case "إيداع تقرير مراقب الحصص العينية":
      doc.moveDown(4.6);
      const x28Position = 103; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x28Position, doc.y, {
        align: "left",
      });
      break;

    case "إضافة أو تحيين المسيرين":
      doc.moveDown(6.7);
      const x29Position = 103; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x29Position, doc.y, {
        align: "left",
      });
      break;

    case "التمديد في مدة الشركة":
      doc.moveDown(9.2);
      const x30Position = 103; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x30Position, doc.y, {
        align: "left",
      });
      break;

    case "الإندماج":
      doc.moveDown(11.5);
      const x31Position = 103; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x31Position, doc.y, {
        align: "left",
      });
      break;

    case "التشطيب":
      doc.moveDown(13.6);
      const x32Position = 103; // Adjust this value to your desired position
      doc.fontSize(14).font("Times-Bold").text("X", x32Position, doc.y, {
        align: "left",
      });
      break;
  }

  // Add a new page for the second image
  doc.addPage();

  // Add the second image on the second page
  addImageToPage(imagePath2);

  const date = new Date(formData.date);
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so add 1
  const day = date.getDate().toString().padStart(2, "0");

  // Define the positions for day, month, and year
  const dayPosition = { x: 129, y: 320 }; // Example position for day
  const monthPosition = { x: 104, y: 320 }; // Example position for month
  const yearPosition = { x: 62, y: 320 }; // Example position for year

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

const generateRNESocieteModifContratPDF = async (formData) => {
  return await generatePDF((doc) => RNESocieteModifContrat(doc, formData));
};

export default generateRNESocieteModifContratPDF;
