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
exports.AddColumnImageNewsCategory1745396634706 = void 0;
class AddColumnImageNewsCategory1745396634706 {
    constructor() {
        this.name = 'AddColumnImageNewsCategory1745396634706';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "news" ADD "category" character varying`);
            yield queryRunner.query(`ALTER TABLE "news" ADD "imageUrl" character varying`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "news" DROP COLUMN "imageUrl"`);
            yield queryRunner.query(`ALTER TABLE "news" DROP COLUMN "category"`);
        });
    }
}
exports.AddColumnImageNewsCategory1745396634706 = AddColumnImageNewsCategory1745396634706;
