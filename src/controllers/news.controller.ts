import { Request, Response, NextFunction } from "express"
import newsService from "../services/news.service"

async function CreateNews(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, description } = req.body

    const data = await newsService.createNews({
      title,
      description,
    })

    res.status(200).send({
      message: "New News created successfully",
      data,
    })
  } catch (error) {
    next(error)
  }
}

async function GetAllNews(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, description, page, pageSize } = req.query
    const data = await newsService.GetAllNews({
      page: Number(page), // default page
      pageSize: Number(pageSize), // default page size
    })
    res.status(200).json({
      message: "Success",
      News: data,
    })
  } catch (error) {
    next(error)
  }
}

export default { CreateNews, GetAllNews }
