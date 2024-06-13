import express from "express";
const router = express.Router()
import { signUp,signIn } from "../controllers/userControllers.js";
import { apply, signin } from "../controllers/controller.js";
import upload from "../config/apply.js";


router.post("/signup",signUp)

router.post("/login",signIn)

router.post("/apply", upload.single('image'), apply)
router.post("/signin", signin)

export default router;

