"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const news_entity_1 = require("../entities/news.entity");
function createNews(_a) {
    return __awaiter(this, arguments, void 0, function* ({ title, description }) {
        try {
            const news = new news_entity_1.News();
            // const itemRepo = KevDB.getRepository(Item)
            const newNews = yield data_source_1.PMADB.createQueryBuilder()
                .insert()
                .into(news_entity_1.News)
                .values({ title, description })
                .returning("*")
                .execute();
            // const newItem = itemRepo.create({ name, category, stock, lastUpdated })
            return newNews.raw;
        }
        catch (error) {
            throw error;
        }
    });
}
function GetAllNews(_a) {
    return __awaiter(this, arguments, void 0, function* ({ page = 1, pageSize = 2, }) {
        try {
            const skipData = page === 1 ? 0 : (page - 1) * pageSize;
            // const PR = KevDB.getRepository(PurchaseRequest)
            //   .createQueryBuilder("PurchaseRequest")
            //   .leftJoinAndSelect("PurchaseRequest.itemIdId", "item")
            //   .offset((page - 1) * pageSize)
            const PRRepo = data_source_1.PMADB.getRepository(news_entity_1.News);
            const result = yield PRRepo.createQueryBuilder("PurchaseRequest")
                .leftJoinAndSelect("PurchaseRequest.itemId", "item")
                // .offset((page - 1) * pageSize)
                .offset(skipData)
                .limit(pageSize)
                .getManyAndCount();
            return result;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.default = { GetAllNews, createNews };
