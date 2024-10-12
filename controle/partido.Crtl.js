import Partido from "../modelo/partido.js";


export default class PartidoCtrl{
    
    gravar (requisicao,resposta){
        if(requisicao.method == "POST" && requisicao.is("application/json")){
            const dados = requisicao.body;
            const nome = dados.nome;
            const sigla = dados.sigla;
            const num_registro = dados.num_registro;
            

            if (nome && sigla && num_registro){
                const partido = new Partido(nome,sigla,num_registro);
                pessoa.incluir() .then (() => {
                    resposta.status(201).json({
                        "status": true,
                        "mensagem": "Partido cadastrado com sucesso!"
                    })
                }).catch((erro)=>{
                    resposta.status(500).json({
                        "status":false,
                        "mensagem": "Erro ao incluir o partido:" + erro.message
                    })
                });
            }
            else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem":"Requisição invalida! Informe todos os dados"
                })
            }

        }
        else {
            resposta.status(405).json({
                "status":false,
                "mensagem": "Requisição inválida!"
            })
        }
    };

    alterar (requisicao,resposta){
        if((requisicao.method == "PUT" || requisicao.method == "PATCH")
            && requisicao.is("application/json")){
            const dados = requisicao.body;
            const nome = dados.nome;
            const sigla = dados.sigla;
            const cnum_registro = dados.num_registro;
            
            if (nome && sigla && num_registro){
                const partido = new Partido(nome,sigla,num_registro);
                pessoa.alterar().then(()=> {
                    resposta.status(200).json({
                        "status" : true,
                        "mensagem":"Partido alterado com sucesso!"

                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao alterar o partido " + erro.message
                })
            })
        }
            else {
                resposta.status(400).json({
                    "status" : false,
                    "mensagem" : "Requisição mal sucedida!"
                })
            }
        }
            else {
                resposta.status(405).json({
                    "status": false,
                    "mensagem":"Requisição inválida!"
                });
                
            }      
        }

        excluir(requisicao, resposta) {
            if (requisicao.method == "DELETE" && requisicao.is("application/json")) {
                const dados = requisicao.body;
                const num_registro = dados.num_registro; 
        
                if (num_registro) {
                    const partido = new Partido(num_registro); 
                    pessoa.excluir().then(() => {
                        resposta.status(200).json({
                            "status": true,
                            "mensagem": "Partido excluído com sucesso!"
                        });
                    }).catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o partido: " + erro.message
                        })
                    })
                } 
                else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "número de registro não fornecido."
                    });
                }
            } else {
                resposta.status(405).json({
                    "status": false,
                    "mensagem": "Método não permitido."
                });
            }
        }
        
    

    consultar(requisicao,resposta) { 
        let termoBusca = requisicao.params.termoBusca;
        if(!termoBusca){
            termoBusca ="";

        }
        if(requisicao.method == "GET"){
            const partido = new Partido();
            partido.consultar(termoBusca).then((partidos) =>{
                return resposta.status(200).json({
                    "status":true,
                    "listaClientes": partidos
                });
            }).catch((erro) =>{
                return resposta.status(500).json({
                    "status:":false,
                    "mensagem": "Erro ao consultar a lista de partidos cadastrados " + erro.message
                })
            })
        } else {
                resposta.status(405).json({
                "status":false,
                "mensagem": "Requisição invalida! Consulte a documentação!"
            });
        }
    }
}
