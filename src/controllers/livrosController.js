import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autores, livros } from "../models/index.js"; //index esta exportando um objeto com os livros

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      // let {//valores default da paginacao
      //   limite = 5,
      //   pagina = 1,
      //   campoOrdenacao = "_id",
      //   ordem = -1,
      // } = req.query;

      //Ao fazer a paginacao nao esta usando o await pq esta sendo guardado a query retornado do moogose na propriedade req.resultado
      const buscaLivros = livros.find().populate("autor");

      req.resultado = buscaLivros; //guarda informacoes para ser enviado de um midddleware para outro

      next(); // indicando a próxima função de middleware
    } catch (erro) {
      next(erro); //  indicando a próxima função de middleware
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const livroResultado = await livros
        .findById(req.params.id)
        .populate("autor", "nome")
        .exec();

      if (livroResultado !== null) {
        res.status(200).send(livroResultado);
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id; //Obtem o id do valor da rota

      const livroResultado = await livros.findByIdAndUpdate(id, {
        $set: req.body,
      });

      if (livroResultado !== null) {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const livroResultado = await livros.findByIdAndDelete(req.params.id);

      if (livroResultado !== null) {
        res.status(200).send({ message: "Livro removido com sucesso" });
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (erro) {
      next(erro);
    }
  };

  //Busca por titulo e editora
  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      //Ele está extraindo os valores das chaves editora e titulo da consulta e atribuindo-os às variáveis editora e titulo.
      // const { editora, titulo } = req.query;
      // console.log(`${editora} ${titulo}`);

      // const busca = {}; //cria um objeto vazio
      // if (editora) busca.editora = editora; //verifca se nao esta vazio e seta o valor no objeto
      // if (titulo) busca.titulo = { $regex: titulo, $options: "i" }; //Regex para o moongose o "I" nao identifica maisculas ou minusculas

      if (busca !== null) {
        const livrosResultado = livros.find(busca).populate("autor");
        req.resultado = livrosResultado;
        next();
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  };
}

async function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" }; //Regex para o moongose o "I" nao identifica maisculas ou minusculas

  if (minPaginas || maxPaginas) busca.numeroPaginas = {};

  // gte = Greater Than or Equal = Maior ou igual que
  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  // lte = Less Than or Equal = Menor ou igual que
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });

    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      busca = null;
    }
  }

  return busca;
}

export default LivroController;
