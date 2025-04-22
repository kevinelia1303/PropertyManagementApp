import { Router, Request, Response, NextFunction } from "express"
import userController from "../controllers/user.controller"
import { verifyToken } from "../middlewares/auth.middleware"

const router: Router = Router()

//register
router.post("/register", userController.Register)

//login
router.post("/login", userController.Login)

//refresh token
router.get("/refresh", verifyToken, userController.RefreshToken)

export default router
