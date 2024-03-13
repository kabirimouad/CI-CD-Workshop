import { Router } from "express";
import greetingRouter from "./greeting.routes";

const apiRouter = Router();

apiRouter.get("/", (_, res) => res.status(200).send("Welcome to the API!"));
apiRouter.use("/greeting", greetingRouter);

export default apiRouter;
