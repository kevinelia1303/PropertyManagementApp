import { Request, Response, NextFunction } from "express"
import { z, ZodError } from "zod"

export default function validateReq(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} ${issue.message}`,
        }))
        res.status(500).send({
          message: "Not OK",
          details: message,
        })
        res.send()
        console.log(error)
      } else {
        next(error)
      }
    }
  }
}
