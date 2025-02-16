import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import colors from "colors";
import {
  errorHandler,
  routeNotFound,
} from "../backend/middlewares/errorMiddleware.js";
import routes from "./routes/index.js";
import formRoutes from "./routes/formRoutes.js";
import connectDB from "./config/db.js";
import PDFRoutes from "./routes/pdfRoute.js";
import LinkRoutes from "./routes/LinkRoute.js";
dotenv.config();
connectDB();
const PORT = process.env.PORT || 2020;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));
app.use("/api", routes);
app.use("/api/v1/forms", LinkRoutes);

app.use("/api/v1/forms", formRoutes);
app.use("/api", PDFRoutes);
app.use(routeNotFound);
app.use(errorHandler);
app.use(express.Router());
// Start the server
app.listen(PORT, () => {
  console.log(
    colors.bgCyan.white(
      `Server running on ${process.env.DEV_MODE} port ${PORT}`
    )
  );
});
