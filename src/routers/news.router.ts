import { Router, Request, Response, NextFunction } from "express"
import newsController from "../controllers/news.controller"
import { verifyToken } from "../middlewares/auth.middleware"

const router: Router = Router()

//create
router.post("/", newsController.CreateNews)

//get all
router.get("/", verifyToken, newsController.GetAllNews)

export default router
