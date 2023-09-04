import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
  {
    id: { type: String },
    nome: {
      type: String,
      required: [true, "O nome do(a) autor(a) é obrigatório"],
    },
    nacionalidade: { type: String },
  },
  {
    versionKey: false, //nao vai retornar a variavel de versionamento do mongo, entao versionamento nao existira
  }
);

const autores = mongoose.model("autores", autorSchema);

export default autores;
