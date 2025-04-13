import { Router } from "express";
import { signup, login, signupAdmin } from "./auth.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/signup/admin", signupAdmin);
router.post("/login", login);


export default router;
