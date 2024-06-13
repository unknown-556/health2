import express from "express";
const router=express.Router()
import{ getarticles, getArticle, getarticle } from '../controllers/articleController.js'
import { addLike } from "../controllers/postController.js";
import auth from "../middleware/auth.js";

router.get("/", getarticles)
router.get('/articles', auth,  getArticle);
router.get("/:id", getarticle)

router.post("/:id/like", auth, addLike);

export default router