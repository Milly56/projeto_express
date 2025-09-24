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
  }

  private initControllers() {
  
  }

  public getApp(): Express {
    return this.app;
  }
}
