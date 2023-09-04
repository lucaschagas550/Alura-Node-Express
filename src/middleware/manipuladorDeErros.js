import mongoose from "mongoose";
import ErroBase from "../erros/ErroBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(erro, req, res, next) {
  if (erro instanceof mongoose.Error.CastError) {
    new RequisicaoIncorreta().enviarResposta(res);
    // res
    //   .status(400)
    //   .send({ message: "Um ou mais dados fornecidos estão incorretos." });
  } else if (erro instanceof mongoose.Error.ValidationError) {
    //com map tu esta interando o array de erros, como se fosse um foreach
    new ErroValidacao(erro).enviarResposta(res);
    // const mensagensErro = Object.values(erro.errors) //Object.values retornar um array
    //   .map((erro) => erro.message)
    //   .join("; ");

    // res.status(400).send({
    //   message: `Os seguintes erros foram encontrados: ${mensagensErro}`,
    // });
  } else if (erro instanceof NaoEncontrado) {
    erro.enviarResposta(res);
  } else {
    new ErroBase().enviarResposta(res);
  }
}

export default manipuladorDeErros;
