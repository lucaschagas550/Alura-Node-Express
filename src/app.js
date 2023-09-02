import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, "Error de conexao"));
db.once("open", () => {
  console.log("conexao com banco feita com sucesso");
});

const app = express();

//Consegue interpretar o que esta vindo via json para realizar a manipulacao
app.use(express.json());

routes(app);

//exporta o arquivo para que outros arquivos possam utilizar no import
export default app;
