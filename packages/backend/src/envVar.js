"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    env: process.env.NODE_ENV || 'development',
    isDev: process.env.NODE_ENV === 'development',
    port: process.env.PORT,
};
