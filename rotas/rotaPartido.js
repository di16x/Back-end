import { Router} from "express";
import PartidoCtrl from "../controle/partido.Crtl.js";

const rotaPartido= Router();
const ctrlPartido = new PartidoCtrl();

rotaPartido.get("/", ctrlPartido.consultar)

.get("/:termoBusca",ctrlPartido.consultar)
.post("/",ctrlPartido.gravar)
.put("/",ctrlPartido.alterar)
.patch("/",ctrlPartido.alterar)
.delete("/",ctrlPartido.excluir);

export default rotaPartido;