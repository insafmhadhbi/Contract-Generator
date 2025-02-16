import pdfParse from "pdf-parse";

export const extractFormData = async (filePath) => {
  try {
    const pdfData = await pdfParse(filePath);
    const textContent = pdfData.text;
    const formData = parseFormData(textContent);

    return formData;
  } catch (error) {
    console.error(error);
    throw new Error("Error extracting form data from PDF");
  }
};

const parseFormData = (textContent) => {
  const formData = {
    nom: "",
    adresse: "",
    typePieceIdentite: "",
    ID: "",
    denomination: "",
    representantLegal: "",
    typeIdentiteRepresentant: "",
    IDrepresentant: "",
    adresseLocalLoue: "",
    superficieLocal: "",
    activite: "",
    dateDebutContrat: "",
    dateFinContrat: "",
    montantLoyerHT: "",
    montantTVA: "",
    montantLoyerTTC: "",
    modalitesPaiement: "",
    lieu: "",
    dateSignature: "",
  };

  // Extracting names
  const nameMatches = textContent.match(/Monsieur [^\n,]+|Madame [^\n,]+/g);
  if (nameMatches && nameMatches.length >= 2) {
    formData.nom = nameMatches[0].split(",")[0].split("Monsieur ")[1].trim();
    formData.representantLegal = nameMatches[1]
      .split(",")[0]
      .split("Monsieur ")[1]
      .trim();
  }
  // Extracting CIN numbers
  const cinMatches = textContent.match(/CIN n°\s*(\d+)/g);
  if (cinMatches && cinMatches.length >= 2) {
    formData.ID = cinMatches[0].split("CIN n°")[1].trim();
    formData.IDrepresentant = cinMatches[1].split("CIN n°")[1].trim();
  }

  // Extracting address
  const addressMatch = textContent.match(/demeurant à [^\n,]+/);
  if (addressMatch) {
    formData.adresse = addressMatch[0].split("demeurant à")[1].trim();
  }

  // Extracting denomination
  const denominationMatch = textContent.match(/La Société [^\n,]+/);
  if (denominationMatch) {
    formData.denomination = denominationMatch[0].split("La Société ")[1].trim();
  }

  // Extracting type of identity document and its ID
  const typePieceIdentiteMatch = textContent.match(
    /titulaire du ([^\n,]+) n° (\d+)/
  );
  if (typePieceIdentiteMatch) {
    formData.typePieceIdentite = typePieceIdentiteMatch[1].trim();
    formData.ID = typePieceIdentiteMatch[2].trim();
  }

  // Extracting typeIdentiteRepresentant
  const typeIdentiteRepresentantMatch = textContent.match(
    /titulaire du ([^\n,]+) n° (\d+)/
  );
  if (
    typeIdentiteRepresentantMatch &&
    typeIdentiteRepresentantMatch.length > 1
  ) {
    formData.typeIdentiteRepresentant = typeIdentiteRepresentantMatch[1].trim();
  }

  // Extracting superficieLocal
  const superficieLocalMatch = textContent.match(
    /d’une superficie égale à (\d+) m²/
  );
  if (superficieLocalMatch) {
    formData.superficieLocal = superficieLocalMatch[1].trim();
  }

  // Extracting activity
  const activiteMatch = textContent.match(/activité de [^\n,]+/);
  if (activiteMatch) {
    formData.activite = activiteMatch[0].split("activité de")[1].trim();
  }

  // Extracting dates
  const datesMatch = textContent.match(/\w{3} \w{3} \d{2} \d{4}/g);
  if (datesMatch && datesMatch.length > 1) {
    formData.dateDebutContrat = new Date(datesMatch[0]);
    formData.dateFinContrat = new Date(datesMatch[1]);
  }

  // Extracting rent amounts
  const montantMatch = textContent.match(
    /Le loyer mensuel brut hors taxe est fixé à (\d+) DT/g
  );
  if (montantMatch && montantMatch.length > 0) {
    formData.montantLoyerHT = parseFloat(
      montantMatch[0].split("est fixé à")[1].trim()
    );
  }

  // Extracting TVA amount
  const montantTVAMatch = textContent.match(/de TVA (\d+) DT/g);
  if (montantTVAMatch && montantTVAMatch.length > 0) {
    formData.montantTVA = parseFloat(
      montantTVAMatch[0].split("de TVA")[1].trim()
    );
  }

  // Extracting total rent amount
  const montantLoyerTTCMatch = textContent.match(/soit (\d+) DT/g);
  if (montantLoyerTTCMatch && montantLoyerTTCMatch.length > 0) {
    formData.montantLoyerTTC = parseFloat(
      montantLoyerTTCMatch[0].split("soit")[1].trim()
    );
  } else {
    formData.montantLoyerTTC = ""; // Set to empty string if not provided
  }

  // Extracting payment method
  const modalitesPaiementMatch = textContent.match(/payable par [^\n,]+/);
  if (modalitesPaiementMatch) {
    formData.modalitesPaiement = modalitesPaiementMatch[0]
      .split("payable par")[1]
      .trim();
  }

  // Extracting location
  const lieuMatch = textContent.match(/Fait à\s*([^\n,]+)/);
  if (lieuMatch) {
    formData.lieu = lieuMatch[1].trim();
  }

  // Extracting signature date
  const dateSignatureMatch = textContent.match(/Fait à [^\n,]+/);
  if (dateSignatureMatch) {
    formData.dateSignature = dateSignatureMatch[0].split("Fait à")[1].trim();
  }

  return formData;
};

export default parseFormData;
