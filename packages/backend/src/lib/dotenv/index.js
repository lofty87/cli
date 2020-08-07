"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var dotenv_1 = require("dotenv");
var serverRoot = fs_1.default.realpathSync(process.cwd());
var resolve = function (relativePath) {
    var resolvedPath = path_1.default.resolve(serverRoot, relativePath);
    return resolvedPath;
};
dotenv_1.config({
    path: resolve('.env'),
});
