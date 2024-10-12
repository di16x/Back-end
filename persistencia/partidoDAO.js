import conectar from "./conexao.js";
import Pessoa from "../modelo/partido.js";
import Partido from "../modelo/partido.js";
export default class partidoDAO {

    constructor(){
        this.init();
    }

    async init (){
        try {
                const conexao = await conectar();
                const sql = `
                CREATE TABLE IF NOT EXISTS partido(
                    nome VARCHAR (50) NOT NULL,
                    sigla VARCHAR (5) NOT NULL,
                    num_registro VARCHAR (14) NOT NULL PRIMARY KEY);
                    `;
        await conexao.execute(sql);
        await global.poolConexoes.releaseConnection(conexao);
        console.log("Banco de dados iniciado!")
    } catch (erro) {
        console.log("O banco de dados deve mal funcionamento!")
    }
    }

    async gravar (partido){
        if (partido instanceof Partido){
            const conexao = await conectar();
            const sql = `INSERT INTO partido (nome,sigla,num_registro)VALUES (?,?,?,?,?);`;
            const parametros = [
                pessoa.nome,
                pessoa.sigla,
                pessoa.num_registro
            ];
            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    async alterar (partido){
        if (partido instanceof Partido){
            const conexao = await conectar();
            const sql = `UPDATE partido SET 
                        nome =?,
                        sigla =?
                        WHERE num_registro =?;`;
            const parametros = [
                pessoa.nome,
                pessoa.sigla,
                pessoa.num_registro
            ];
            await conexao.execute(sql,parametros);
            await global.poolConexoes.releaseConnection(conexao);


        }
    }

    async excluir (partido){
        if(partido instanceof Partido){
            const conexao = await conectar();
            const sql = `DELETE FROM partido WHERE num_registro = ?;`;
            const parametros = [partido.num_registro];
            await conexao.execute(sql, parametros);
            await global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar (termoBusca){
        let sql = "";
        let parametros = [];
        if (termoBusca){
            sql = `SELECT * FROM partido WHERE num_registro = ? order by nome;`;
            parametros.push(termoBusca);
        }
        else { 
            sql = `SELECT * FROM partido order by nome;`;
        }
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql,parametros);
        let listaPartidos = [];
        for (const registro of registros){
            const partido= new Partido(
                registro.nome,
                registro.sigla,
                registro.num_registro
            );
            listaPessoas.push(partido);
        }
        await global.poolConexoes.releaseConnection(conexao);
        return listaPartidos;

    }

}