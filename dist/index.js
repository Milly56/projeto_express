"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const App_1 = __importDefault(require("./App"));
const port = process.env.PORT ? Number(process.env.PORT) : 5000;
const app = new App_1.default().getApp();
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
    console.log(`📑 Swagger disponível em http://localhost:${port}/api-docs`);
});
