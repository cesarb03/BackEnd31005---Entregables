//MODULES
import express from "express";
const app = express();
const puerto = 8080;
//Para poder usar el ${__dirname} en ES6. Hay que definir _dirname en proyectos con ES Modules
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import rutas from "./routes/index.js";

//Midleware de Json de express. Config. basica para acceder al req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Seteo la carpeta views, le decimos a express q todas nuestras views van a estar en la carpeta views
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.use("/", rutas);

app.listen(puerto, function (err) {
  if (err) console.log(err);
  console.log(`Servidor escuchando el puerto: ${puerto}`);
});
