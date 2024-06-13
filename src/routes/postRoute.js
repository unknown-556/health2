import express from "express";
const router = express.Router()

import { createArticle, updateArticle } from "../controllers/postController.js";
import auth from "../middleware/auth.js";
import upload from "../config/multer.js";
import checkWriter from "../middleware/a.js"

router.post("/article", auth, upload.single('image'), createArticle)

router.put("/article/:id", updateArticle);

export default router