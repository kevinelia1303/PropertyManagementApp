import { NextFunction, Request, Response } from "express"

export class HttpException extends Error {
  public status: number
  public message: string
  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.message = message
  }
}

export const ErrorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status: number = error.status || 500
    const message: string = error.message || "Something went wrong"

    res.status(status).send({
      message,
    })
  } catch (error) {
    next(error)
  }
}
