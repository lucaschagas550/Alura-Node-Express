const http = require("http");
const port = 3000;

const rotas = {
  "/": "Curso de node",
  "/livros": "Entrei na pagina de livros",
  "/autores": "Listagem de autores",
  "/editora": "Listagem de editora",
};

//Recebe dois parametros
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(rotas[req.url]); //se nao endereco for /livros retorna a mensagem respectiva
});

//passa o valor da port para a arrow function
server.listen(port, () => {
  console.log(`servidor escutando na porta http://localhost:${port}`);
});
