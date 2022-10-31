import { Application, Router, Context } from "https://deno.land/x/oak/mod.ts"

const app = new Application();
const router = new Router();

router.get("/", (ctx: Context) => {
  ctx.response.body = `
  <!DOCTYPE html>
  <h1 style="text-align:center">Desafío Clase 47<h1>`;
});

router.get("/hola", (ctx: Context) => {
  ctx.response.status = 200;
  ctx.response.body = `
  <!DOCTYPE html>
  <html>
    <head><title>Hello oak!</title><head>
    <body>
      <h1 style="color: pink;text-align:center;">Bienvenido al desafio de la clase 47!<span style='color: blue; font-size: 1rem;'>FINALIZED<span></h1>
    </body>
  </html>
  `;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 3000 });
console.log("Server listening http:127.0.0.1:3000");