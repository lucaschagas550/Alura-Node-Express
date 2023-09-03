import mongoose from "mongoose";

//mongoose.connect("mongodb://localhost:27017/alura-node");
mongoose.connect(process.env.STRING_CONEXAO_DB);

let db = mongoose.connection;

export default db;
