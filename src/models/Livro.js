import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
  id: { type: String },
  titulo: { type: String, required: [true, "O título do livro é obrigatório"] },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O(a) autor(a) é obrigatório"],
  }, //Referencia para o modelo de autor
  editora: { type: String, required: [true, "A editora é obrigatória"] },
  numeroPaginas: { type: Number },
});

//Ele cria sozinho no banco com base na classe
const livros = mongoose.model("livros", livroSchema);

export default livros;
