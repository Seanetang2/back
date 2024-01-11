import express, { Application, json } from "express";
import { mainApp } from "./mainApp";
import { dbConfig } from "./utils/dbConfig";
import cors from "cors";

const app: Application = express();
const port: number | string = process.env.PORT || 4000;

app.use(json());
app.use(cors());

mainApp(app);

app.listen(port, () => {
  dbConfig();
});
