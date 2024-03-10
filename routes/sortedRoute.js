import { Router } from "express";
import { asyncCatch } from "../utils/asyncCatch.js";
import { sortedController } from "../controller/sortedController.js";

const sortedRoute = Router();
sortedRoute.get("/year", asyncCatch(sortedController.year));

export default sortedRoute;
