import { Router } from "express";
import { asyncCatch } from "../utils/asyncCatch.js";
import { userController } from "../controller/userController.js";
import { registerValidation } from "../validate/userValidation.js";

const useRoute = Router();

useRoute.post(
  "/register",
  asyncCatch(registerValidation),
  asyncCatch(userController.register)
);
useRoute.post("/login", asyncCatch(userController.login));
useRoute.post("/logout", asyncCatch(userController.logout));
useRoute.get("/users", asyncCatch(userController.getUsers));
useRoute.get("/user/:id", asyncCatch(userController.getUser));
useRoute.put("/user/:id", asyncCatch(userController.updateUser));
useRoute.delete("/user/:id", asyncCatch(userController.deleteUser));

export default useRoute;
