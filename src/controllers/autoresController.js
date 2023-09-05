import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores } from "../models/index.js"; //index esta exportando um objeto com os autores

class AutorController {
  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultados = autores.find();
      req.resultad = autoresResultados;

      next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      let autor = await autores.findById(req.params.id);

      if (autor !== null) {
        res.status(200).json(autor);
      } else {
        next(new NaoEncontrado("Id do Autor nao encontrado."));
        //res.status(400).send({ message: "Id do Autor nao encontrado." });
      }
    } catch (erro) {
      //Envia o erro para o Middleware
      next(erro);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);
      const autorResultado = await autor.save();
      res.status(201).send(autorResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const autor = await autores.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });

      if (autor !== null) {
        res.status(200).send({ message: "Autor atualizado com sucesso" });
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const autorResultado = await autores.findByIdAndDelete(req.params.id);

      if (autorResultado !== null) {
        res.status(200).send({ message: "Autor removido com sucesso" });
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default AutorController;
