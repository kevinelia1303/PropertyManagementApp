import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import { PayloadParams } from "../custom"
import { error } from "console"
import { SECRET_KEY } from "../config"
import { HttpException } from "./error.middleware"
export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")
    console.log(token)

    if (!token) {
      throw new HttpException(500, "Unauthorized")
    }
    if (token) {
      const verifyUser = verify(token, SECRET_KEY as string)
      if (!verifyUser) {
        throw new HttpException(500, "Unauthorized")
        // throw new Error("Unauthorized")
      }
      //   console.log(verifyUser)
      req.user = verifyUser as PayloadParams
      next()
    } else {
      throw new Error("Unauthorized")
    }
  } catch (error) {
    next(error)
  }
}

export function adminManagerGuard(roles: string[]) {
  return async function adminGuard(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (req.user?.role !== "ADMIN") {
        throw new HttpException(500, "Admin Only")
        // throw new Error("Admin only")
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}

export async function adminGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.user?.role !== "ADMIN") {
      throw new HttpException(500, "Admin Only")
      // throw new Error("Admin only")
    }
    next()
  } catch (error) {
    next(error)
  }
}
