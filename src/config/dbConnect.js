import mongoose from "mongoose";

//mongoose.connect("mongodb://localhost:27017/alura-node");
mongoose.connect(
  "mongodb+srv://alura:123@lucas-node-50-alura.8dsg5he.mongodb.net/"
);

let db = mongoose.connection;

export default db;
