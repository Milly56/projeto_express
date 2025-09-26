import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import livroRoutes from './routes/livroRoutes';       
import retiradaRoutes from './routes/retiradaRoutes'; 

export default class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.swagger();
    this.routes();
  }

  private middlewares() {
    this.app.use(express.json());
  }

  private swagger() {
    const swaggerSpec = swaggerJSDoc({
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'API do Projeto de Douglas',
          version: '1.0.0',
          description: 'Documentação da API usando Swagger',
        },
        servers: [
          {
            url: 'http://localhost:3000',
          },
        ],
      },
      apis: ['./src/routes/*.ts'],
    });

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  private routes() {

    this.app.use('/api/livros', livroRoutes);
    this.app.use('/api/retiradas', retiradaRoutes);

    this.app.get('/', (req, res) => {
      res.send('API funcionando! 🚀');
    });
  }

  public getApp(): Application {
    return this.app;
  }
}
