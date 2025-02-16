
// export default PdfLink;
import mongoose from "mongoose";

// Define PdfLink schema
const PdfLinkSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      required: true,
    },
    isTrashed: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    formData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    contractName: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const PdfLink = mongoose.model("PdfLink", PdfLinkSchema);

export default PdfLink;
