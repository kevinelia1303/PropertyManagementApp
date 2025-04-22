import express, { Application, Request, Response, NextFunction } from "express"
import { PORT as port } from "./config"
import helmet from "helmet"
import cors from "cors"
import { PMADB } from "./data-source"
import corsOptions from "./configCORS/corsOptions"
import { ErrorMiddleware } from "./middlewares/error.middleware"

// router
import UserRouter from "./routers/user.router"

const PORT = port || 8080
const app: Application = express()

//middleware global
app.use(helmet())
app.use(cors(corsOptions))
app.use(express.json()) // untuk parsing json

app.use("/auth", UserRouter)

app.use(ErrorMiddleware)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const error = err as any
  res.status(500).send(error.message)
})

PMADB.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
    console.log("Database connected")
  })
  .catch((err) => {
    console.log("Database connection failed", err)
  })
