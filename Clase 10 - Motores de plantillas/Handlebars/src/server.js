//MODULES
import express from "express";
const app = express();
const puerto = 8080;
import { engine } from "express-handlebars";
//Para poder usar el ${__dirname} en ES6. Hay que definir _dirname en proyectos con ES Modules
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import rutas from "./routes/index.js";

//Midleware de Json de express. Config. basica para acceder al req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: path.join(__dirname, "./views/layouts/main.hbs"),
    layoutsDir: path.join(__dirname, "./views/layouts"),
    partialsDir: path.join(__dirname, "./views/partials"),
  })
);

//Seteo el motor de plantillas
app.set("view engine", "hbs");
//Seteo la carpeta views, le decimos a express q todas nuestras views van a estar en la carpeta views
app.set("views", path.join(__dirname, "./views"));

app.use("/", rutas);

app.listen(puerto, function (err) {
  if (err) console.log(err);
  console.log(`Servidor escuchando el puerto: ${puerto}`);
});
