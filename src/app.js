import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middleware/manipuladorDeErros.js";
import manipulador404 from "./middleware/manipulador404.js";

db.on("error", console.log.bind(console, "Error de conexao"));
db.once("open", () => {
  console.log("conexao com banco feita com sucesso");
});

const app = express();

//Consegue interpretar o que esta vindo via json para realizar a manipulacao
app.use(express.json());
routes(app);
app.use(manipulador404);

//Middleware funcao do express que eh executada em toda requisicao que eh feita para api ou em determinar requisicoes
//Middleware de erro
app.use(manipuladorDeErros);

//exporta o arquivo para que outros arquivos possam utilizar no import
export default app;
