import { Router } from "express";
import { uploader } from "../utils/uploader.js";
import { asyncCatch } from "../utils/asyncCatch.js";
import { movieController } from "../controller/movieController.js";
import {
  createMovieValid,
  uploadFileValidate,
} from "../validate/movieValidation.js";

const movieRoute = Router();

movieRoute.post(

  "/:userId",

  uploader.single("file"),
  asyncCatch(createMovieValid),
  asyncCatch(uploadFileValidate),
  asyncCatch(movieController.createMovie)
);

movieRoute.get("", asyncCatch(movieController.getAllmovie))

movieRoute.delete("/:userId/:movieId", asyncCatch(movieController.removeMovie))

movieRoute.put('/:movideId', asyncCatch(movieController.updateMovie))

export default movieRoute;
