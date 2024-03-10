import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import movieRoute from "./routes/movieRoute.js";
import useRoute from "./routes/userRoute.js";
import searchRoute from "./routes/searchRoute.js";
import sortedRoute from "./routes/sortedRoute.js";

dotenv.config();

const sv = express();

sv.use(express.json());
sv.use(morgan("combined"));

sv.use("/v1/movies", movieRoute);
sv.use("/v1/auth", useRoute);
sv.use("/v1/search", searchRoute);
sv.use("/v1/sorted", sortedRoute);

mongoose
  .connect(process.env.MONGODB)
  .then(() =>
    sv.listen(process.env.PORT, () =>
      console.log(
        `server port http://localhost:${process.env.PORT} is running !!!`
      )
    )
  );
