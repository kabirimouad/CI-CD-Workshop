import express from "express";
import cookies from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import apiRouter from "./routes";

const app = express();

app.enable("trust proxy");
app.set("trust proxy", true);
app.use(cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan(":method :url :status - :response-time ms"));

app.use(apiRouter);

export default app;
