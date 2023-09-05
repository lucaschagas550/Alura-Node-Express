import express from "express";
import LivroController from "../controllers/livrosController.js";
import paginar from "../middleware/paginar.js";

const router = express.Router();

//A ordem das rotas influencia, da mais especifica para menos especifica,se a rota do id for antes da busca vai haver conflito, nunca entrara na busca, sempre na do id
router
  .get("/livros", LivroController.listarLivros, paginar) //Registrando middleware para paginacao, paginar
  .get("/livros/busca", LivroController.listarLivroPorFiltro, paginar)
  .get("/livros/:id", LivroController.listarLivroPorId)
  .post("/livros", LivroController.cadastrarLivro)
  .put("/livros/:id", LivroController.atualizarLivro)
  .delete("/livros/:id", LivroController.excluirLivro);

export default router;
