import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
  id: { type: String },
  titulo: { type: String, required: [true, "O título do livro é obrigatório"] },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O(a) autor(a) é obrigatório"],
  }, //Referencia para o modelo de autor
  editora: {
    type: String,
    required: [true, "A editora é obrigatória"],
    enum: {
      values: ["Casa do codigo", "Alura"],
      message: "A editora {VALUE} nao eh permitida.", //{VALUE} valor informado no request
    }, //Valores validos ou seja, o campo so aceitara esses dois valores
  },
  numeroPaginas: {
    type: Number,
    //validador personalizado
    validate: {
      validator: (valor) => {
        return valor >= 10 && valor <= 5000;
      },
    },
    message:
      "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}",
    // min: [
    //   10,
    //   "O número de páginas deve estar entre 10 e 5000. Valor fornecido {VALUE}",
    // ],
    // max: [
    //   5000,
    //   "O número de páginas deve estar entre 10 e 5000. Valor fornecido {VALUE}",
    // ],
  },
});

//Ele cria sozinho no banco com base na classe
const livros = mongoose.model("livros", livroSchema);

export default livros;
