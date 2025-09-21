import express from "express";
import dotenv from "dotenv";
import personagensRoutes from "./src/routes/personagensRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

const serverPort = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("🧇 Servidor rumo a Hawkins funcionando...");
});

app.use("/personagens", personagensRoutes);

app.listen( serverPort, () => {
    console.log(`📺 Servidor rodando em http://localhost:${serverPort}`);
});