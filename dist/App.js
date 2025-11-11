"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const livroRoutes_1 = __importDefault(require("./routes/livroRoutes"));
const retiradaRoutes_1 = __importDefault(require("./routes/retiradaRoutes"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const LoginRoutes_1 = __importDefault(require("./routes/LoginRoutes"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.middlewares();
        this.swagger();
        this.routes();
    }
    middlewares() {
        this.app.use(express_1.default.json());
    }
    swagger() {
        const swaggerSpec = (0, swagger_jsdoc_1.default)({
            definition: {
                openapi: "3.0.0",
                info: {
                    title: "API do Projeto de Douglas",
                    version: "1.0.0",
                    description: "Documentação da API usando Swagger com autenticação JWT",
                },
                servers: [
                    {
                        url: "http://localhost:3000",
                    },
                ],
                components: {
                    securitySchemes: {
                        bearerAuth: {
                            type: "http",
                            scheme: "bearer",
                            bearerFormat: "JWT",
                        },
                    },
                },
            },
            apis: ["./src/routes/*.ts"],
        });
        this.app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    }
    routes() {
        this.app.use("/api/livros", livroRoutes_1.default);
        this.app.use("/api/retiradas", retiradaRoutes_1.default);
        this.app.use("/api/usuarios", usuarioRoutes_1.default);
        this.app.use("/api/login", LoginRoutes_1.default);
        this.app.get("/", (req, res) => {
            res.send("API funcionando! 🚀");
        });
    }
    getApp() {
        return this.app;
    }
}
exports.default = App;
