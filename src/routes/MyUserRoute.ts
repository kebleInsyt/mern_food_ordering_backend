import express from "express";
import { createCurrentUser, getCurrentUser, updateCurrentUser } from "../controllers/MyUserController"; 
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validator";
// import { asyncHandler } from "../utils/asyncHandler";

const myUserRouter = express.Router();

myUserRouter.post("/", jwtCheck, createCurrentUser);
myUserRouter.get("/", jwtCheck, jwtParse, getCurrentUser);
myUserRouter.put("/", jwtCheck, jwtParse, validateMyUserRequest, updateCurrentUser);

export default myUserRouter;
