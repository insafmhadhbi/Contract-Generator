// // PdfApiSlice.js
// import { apiSlice } from "../apiSlice";

// const PDF_URL = "http://localhost:8080/api";

// export const pdfApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     uploadPDF: builder.mutation({
//       query: (file) => ({
//         url: `${PDF_URL}/uploadPDF`, 
//         method: "POST",
//         body: file,
//       }),
//     }),
//     extractData: builder.mutation({
//       query: (file) => ({
//         url: `${PDF_URL}/extractData`,
//         method: "POST",
//         body: file,
//       }),
//     }),
//   }),
// });

// export const { useUploadPDFMutation, useExtractDataMutation } = pdfApiSlice;
