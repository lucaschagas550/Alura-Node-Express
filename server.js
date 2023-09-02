import app from "./src/app.js";

const port = process.env.PORT || 3000;

//passa o valor da port para a arrow function
app.listen(port, () => {
  console.log(`servidor escutando na porta http://localhost:${port}`);
});
