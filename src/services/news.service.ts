import { PMADB } from "../data-source"
import { News } from "../entities/news.entity"
import INews from "../interfaces/news.interface"

async function createNews({ title, description }: INews) {
  try {
    const news = new News()
    // const itemRepo = KevDB.getRepository(Item)
    const newNews = await PMADB.createQueryBuilder()
      .insert()
      .into(News)
      .values({ title, description })
      .returning("*")
      .execute()
    // const newItem = itemRepo.create({ name, category, stock, lastUpdated })
    return newNews.raw
  } catch (error) {
    throw error
  }
}

async function GetAllNews({
  page = 1,
  pageSize = 2,
}: {
  page: number
  pageSize: number
}) {
  try {
    const skipData = page === 1 ? 0 : (page - 1) * pageSize
    // const PR = KevDB.getRepository(PurchaseRequest)
    //   .createQueryBuilder("PurchaseRequest")
    //   .leftJoinAndSelect("PurchaseRequest.itemIdId", "item")
    //   .offset((page - 1) * pageSize)

    const PRRepo = PMADB.getRepository(News)
    const result = await PRRepo.createQueryBuilder("PurchaseRequest")
      .leftJoinAndSelect("PurchaseRequest.itemId", "item")
      // .offset((page - 1) * pageSize)
      .offset(skipData)
      .limit(pageSize)
      .getManyAndCount()

    return result
  } catch (error) {
    throw error
  }
}

export default { GetAllNews, createNews }
