import mongoose from "mongoose";

//validacao global para todos tipos string
mongoose.Schema.Types.String.set("validate", {
  validator: (valor) => valor !== "",
  message: ({ path }) => `O campo ${path} foi fornecido em branco.`,
});
