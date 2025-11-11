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

  /** Middlewares globais */
  private middlewares() {
    const allowedOrigins = [
      "http://localhost:5173",
      process.env.RENDER_EXTERNAL_URL,
    ].filter(Boolean);

    this.app.use(
      cors({
        origin: (origin, callback) => {
          // Permite chamadas sem "origin" (como do Swagger ou curl)
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            console.warn(`🚫 CORS bloqueado para origem: ${origin}`);
            callback(new Error("CORS bloqueado para esta origem"));
          }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );

    this.app.use(express.json());
  }

  /** Configuração do Swagger UI */
  private swagger() {
    const swaggerSpec = swaggerJSDoc({
      definition: {
        openapi: "3.0.0",
        info: {
          title: "📚 API do Projeto de Douglas",
          version: "1.0.0",
          description:
            "Documentação interativa da API com autenticação JWT integrada.",
        },
        servers: [
          {
            url:
              process.env.RENDER_EXTERNAL_URL?.startsWith("http")
                ? process.env.RENDER_EXTERNAL_URL
                : `https://${process.env.RENDER_EXTERNAL_URL}`,
            description: "Servidor de produção (Render)",
          },
          {
            url: `http://localhost:${process.env.PORT || 3000}`,
            description: "Servidor local (desenvolvimento)",
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
      apis: ["./src/routes/*.ts"], // caminhos dos endpoints
    });

    // 🚀 Swagger será a página principal
    this.app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Rota para exportar o JSON do Swagger (útil para Postman e integrações)
    this.app.get("/swagger.json", (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    });
  }

  /** Rotas da API */
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
