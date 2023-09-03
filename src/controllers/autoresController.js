import mongoose from "mongoose";
import autores from "../models/Autor.js";

class AutorController {
  static listarAutores = async (req, res) => {
    try {
      const autoresResultados = await autores.find();
      res.status(200).json(autoresResultados);
    } catch (erro) {
      res.status(500).json({ message: "Error interno no servidor" });
    }
  };

  static listarAutorPorId = async (req, res) => {
    try {
      let autor = await autores.findById(req.params.id);

      if (autor !== null) {
        res.status(200).json(autor);
      } else {
        res.status(400).send({ message: "Id do Autor nao encontrado." });
      }
    } catch (erro) {
      //Erro especifico do mongoose
      if (erro instanceof mongoose.Error.CastError) {
        res
          .status(400)
          .send({ message: "Um ou mais dados fornecidos estão incorretos." });
      } else {
        res.status(500).send({ message: "Erro interno no servidor" });
      }
    }
  };

  static cadastrarAutor = async (req, res) => {
    try {
      let autor = new autores(req.body);
      const autorResultado = await autor.save();
      res.status(201).send(autorResultado.toJSON());
    } catch (erro) {
      res.status(500).json({ message: "Error interno no servidor" });
    }
  };

  static atualizarAutor = async (req, res) => {
    try {
      await autores.findByIdAndUpdate(req.params.id, { $set: req.body });

      res.status(200).send({ message: "Autor atualizado com sucesso" });
    } catch (erro) {
      res.status(500).send({ message: erro.message });
    }
  };

  static excluirAutor = async (req, res) => {
    try {
      await autores.findByIdAndDelete(req.params.id);

      res.status(200).send({ message: "Autor removido com sucesso" });
    } catch (erro) {
      res.status(500).send({ message: erro.message });
    }
  };
}

export default AutorController;
