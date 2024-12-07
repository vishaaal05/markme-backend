import express, { json } from "express";
import mainRouter from "./routes/index";
import cors from "cors";


const app = express();
app.use(cors());

app.use(json());

app.use("api/v1", mainRouter);

app.listen(3000);