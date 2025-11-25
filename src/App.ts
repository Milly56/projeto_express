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
    this.routes();
    this.swagger();
  }

  private middlewares() {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://project-react-tqhm.vercel.app",
      process.env.RENDER_EXTERNAL_URL,
      process.env.VERCEL_EXTERNAL_URL
    ].filter(Boolean);

    this.app.use(
      cors({
        origin: (origin, callback) => {
          console.log("🌍 Origin recebido:", origin);

          if (!origin) {
            return callback(null, true);
          }

          if (origin.includes("localhost:3000")) {
            return callback(null, true);
          }
          if (allowedOrigins.includes(origin)) {
            return callback(null, true);
          }

          console.warn(`🚫 CORS bloqueado para origem: ${origin}`);
          callback(new Error("CORS bloqueado para esta origem"));
        },
        credentials: true,
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
                : process.env.RENDER_EXTERNAL_URL
                ? `https://${process.env.RENDER_EXTERNAL_URL}`
                : `http://localhost:${process.env.PORT || 3000}`,
            description: process.env.RENDER_EXTERNAL_URL
              ? "Servidor de produção (Render)"
              : "Servidor local (desenvolvimento)",
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

    this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    this.app.get("/swagger.json", (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    });
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
