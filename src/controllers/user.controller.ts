import { Request, Response, NextFunction } from "express"
import UserService from "../services/user.service"
import { PayloadParams } from "../custom"

export default {
  async Register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name, password } = req.body
      await UserService.register({ email, name, password })
      res.status(200).send({
        message: "OK",
      })
    } catch (error) {
      next(error)
    }
  },
  async Login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await UserService.login(req.body)

      res
        .status(200)
        .cookie("access_token", data.access_token)
        .send({
          message: "OK",
          data: {
            refresh_token: data.access_token,
            session_token: data.session_token,
            user: data.user,
          },
        })
    } catch (error) {
      next(error)
    }
  },
  async RefreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.user as PayloadParams
      const data = await UserService.refreshToken(email)

      res
        .status(200)
        .cookie("access_token", data.access_token)
        .send({
          message: "OK",
          data: {
            session_token: data.session_token,
            user: data.user,
          },
        })
    } catch (error) {
      next(error)
    }
  },
}
