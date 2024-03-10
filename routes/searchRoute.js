import { Router } from "express";
import { asyncCatch } from "../utils/asyncCatch.js";
import { searchController } from "../controller/searchController.js";

const searchRoute = Router();

searchRoute.get("/:query", asyncCatch(searchController.search));

export default searchRoute;
