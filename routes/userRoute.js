import { Router } from "express";
import { asyncCatch } from "../utils/asyncCatch.js";

const useRoute = Router();

useRoute.post("", asyncCatch());

export default useRoute;
