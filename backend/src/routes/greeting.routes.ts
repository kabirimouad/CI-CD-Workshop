import { Router } from "express";
import { greetingController } from "../controllers/greeting.controller";

const greetingRouter = Router();

greetingRouter.get("/", greetingController);

export default greetingRouter;
