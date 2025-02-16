import PDFDocument from "pdfkit";
const generatePDF = async (contentGenerator, formData) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();

      contentGenerator(doc, formData);

      const buffers = [];
      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });
      doc.end();
    } catch (error) {
      console.error("Error generating PDF:", error);
      reject(error);
    }
  });
};

export default generatePDF;
