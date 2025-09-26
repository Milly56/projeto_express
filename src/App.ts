import { Express } from "express";
import {
  BearerTokenJWT,
  Description,
  SwaggerInitializer,
  Title,
  Version,
  ExpressInitializer,
  SwaggerEndpoint,
  Theme,
  ThemesType,
} from "express-swagger-autoconfigure";
import livroRoutes from "./routes/livroRoutes";
import retiradaRoutes from "./routes/retiradaRoutes";

@SwaggerInitializer
@SwaggerEndpoint("/documentation") 
@Description("Livros")
@Title("Biblioteca de Livros")
@Version("1.0.0")
@BearerTokenJWT(true) 
@Theme(ThemesType.FEELING_BLUE)
export default class App {
  @ExpressInitializer
  private app!: Express; 

  constructor() {
    this.initControllers();
    this.initMiddlewares();
    this.initRoutes();
  }

  private initMiddlewares() {
    // Middleware para parsing JSON
    this.app.use('/api', (req, res, next) => {
      if (req.is('json')) {
        return next();
      }
      next();
    });
  }

  private initRoutes() {
    // Rotas da API
    this.app.use("/api/livros", livroRoutes);
    this.app.use("/api/retiradas", retiradaRoutes);
    
    // Rota de teste
    this.app.get("/api/status", (req, res) => {
      res.json({
        success: true,
        message: "API funcionando!",
        timestamp: new Date().toISOString()
      });
    });
  }

  private initControllers() {
  
  }

  public getApp(): Express {
    return this.app;
  }
}
