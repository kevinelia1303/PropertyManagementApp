"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateReq;
const zod_1 = require("zod");
function validateReq(schema) {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const message = error.errors.map((issue) => ({
                    message: `${issue.path.join(".")} ${issue.message}`,
                }));
                res.status(500).send({
                    message: "Not OK",
                    details: message,
                });
                res.send();
                console.log(error);
            }
            else {
                next(error);
            }
        }
    };
}
