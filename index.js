import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import movieRoute from "./routes/movieRoute.js";

dotenv.config();

const sv = express();

sv.use(express.json());
sv.use(morgan("combined"));

sv.use("/v1/movie", movieRoute);



mongoose
  .connect(process.env.MONGODB)
  .then(() =>
    sv.listen(process.env.PORT, () =>
      console.log(
        `server port http://localhost:${process.env.PORT} is running !!!`
      )
    )
  );