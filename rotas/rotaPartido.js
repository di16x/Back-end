import { Router} from "express";
import PessoaCtrl from "../Controle/pessoa.Ctrl.js";

const rotaPessoa = Router();
const ctrlPessoa = new PessoaCtrl();

rotaPessoa.get("/", ctrlPessoa.consultar)

.get("/:termoBusca",ctrlPessoa.consultar)
.post("/",ctrlPessoa.gravar)
.put("/",ctrlPessoa.alterar)
.patch("/",ctrlPessoa.alterar)
.delete("/",ctrlPessoa.excluir);

export default rotaPessoa;