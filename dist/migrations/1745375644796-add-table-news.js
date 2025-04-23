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
exports.AddTableNews1745375644796 = void 0;
class AddTableNews1745375644796 {
    constructor() {
        this.name = 'AddTableNews1745375644796';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "news" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "deletedAt" TIMESTAMP, "createdbyId" uuid, CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_9a4a663db79d25008cc4ef6b5ed" FOREIGN KEY ("createdbyId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_9a4a663db79d25008cc4ef6b5ed"`);
            yield queryRunner.query(`DROP TABLE "news"`);
        });
    }
}
exports.AddTableNews1745375644796 = AddTableNews1745375644796;
