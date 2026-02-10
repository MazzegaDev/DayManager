import express from "express";

import taskRouter from "./routers/taskRouter";
import userRouter from "./routers/userRouter";
import categoryRouter from "./routers/categoryRouter";
import authRouter from "./routers/authRouter";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swaggerOutput.json";

import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("tarefa", taskRouter);
app.use("usuario", userRouter);
app.use("categoria", categoryRouter);
app.use("login", authRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
export default app;