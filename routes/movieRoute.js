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
  "",
  uploader.single("file"),
  asyncCatch(createMovieValid),
  asyncCatch(uploadFileValidate),
  asyncCatch(movieController.createMovie)
);

movieRoute.get("", asyncCatch(movieController.getAllmovie))

movieRoute.delete("/:movieId", asyncCatch(movieController.removeMovie))

movieRoute.put('/:movieId', asyncCatch(movieController.updateMovieWithoutIMG))

movieRoute.put('/img/:movieId', uploader.single("file") ,asyncCatch(movieController.updateMovieIMG))

export default movieRoute;
