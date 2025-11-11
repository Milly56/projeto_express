import express, { Application } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import livroRoutes from "./routes/livroRoutes";
import retiradaRoutes from "./routes/retiradaRoutes";
import usuariosRoutes from "./routes/usuarioRoutes";
import loginRoutes from "./routes/LoginRoutes";

export default class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.swagger();
    this.routes();
  }

  private middlewares() {
    const allowedOrigins = [
      "http://localhost:5173",
      process.env.RENDER_EXTERNAL_URL,
    ].filter(Boolean);

    this.app.use(
      cors({
        origin: (origin, callback) => {
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error("CORS bloqueado para esta origem"));
          }
        },
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );

    this.app.use(express.json());
  }

  private swagger() {
    const swaggerSpec = swaggerJSDoc({
      definition: {
        openapi: "3.0.0",
        info: {
          title: "API do Projeto de Douglas",
          version: "1.0.0",
          description: "Documentação da API usando Swagger com autenticação JWT",
        },
        servers: [
          {
            url:
              process.env.RENDER_EXTERNAL_URL ||
              `http://localhost:${process.env.PORT || 3000}`,
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

    this.app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  private routes() {
    this.app.use("/api/livros", livroRoutes);
    this.app.use("/api/retiradas", retiradaRoutes);
    this.app.use("/api/usuarios", usuariosRoutes);
    this.app.use("/api/login", loginRoutes);
  }

  public getApp(): Application {
    return this.app;
  }
}
