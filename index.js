import express from "express";
import rotaPartido from "./rotas/rotaPartido.js";

const app = express();
const host = '0.0.0.0';
const porta = 4000;

app.use(express.json());

app.use('/partido', rotaPartido);

app.listen(porta,host, () => {
    console.log(`Servidor iniciado em http://${porta}`);
})