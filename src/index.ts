import "reflect-metadata"; 
import App from "./App";

const port = process.env.PORT ? Number(process.env.PORT) : 5000;

const app = new App().getApp();

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📑 Swagger disponível em http://localhost:${port}/api-docs`);
});
