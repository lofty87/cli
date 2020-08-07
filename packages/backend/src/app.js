"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./lib/dotenv");
var koa_1 = __importDefault(require("koa"));
var koa_logger_1 = __importDefault(require("koa-logger"));
var envVar_1 = __importDefault(require("@envVar/envVar"));
var index_1 = __importDefault(require("@api/index"));
var app = new koa_1.default();
var port = envVar_1.default.port;
app.use(koa_logger_1.default());
app
    .use(index_1.default.routes())
    .use(index_1.default.allowedMethods());
app.listen(port, function () {
    console.log("server is listening to " + port);
});
