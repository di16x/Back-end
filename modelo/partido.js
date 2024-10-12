import partidoDAO from '../persistencia/partidoDAO.js';

export default class Partido{
    #nome
    #sigla
    #num_registro


    constructor(nome,sigla,num_registro){
        this.#nome = nome;
        this.#sigla = sigla;
        this.#num_registro = num_registro;}


    get nome (){
        return this.#nome;
    }

    set nome (novonome){
       this.#nome = novonome; 
    }

    
    get sigla (){
        return this.#sigla;
    }

    set sigla (novasigla){
       this.#sigla = novasigla; 
    }


    
    get num_registro (){
        return this.#num_registro;
    }

    set num_registro (novonum_registro){
       this.#num_registro = novonum_registro; 
    }

    
   
    

    toString(){
        return `Nome: ${this.#nome} 
Sigla: ${this.#sigla} 
Número de Registro: ${this.#num_registro} \n`
    }

    toJSON(){
        return {
            nome:this.#nome,
            sigla:this.#sigla,
            num_registro:this.#num_registro,
           
        }
    }

    async incluir (){
        const partDAO = new partidoDAO();
        await partDAO.gravar(this);
    }

    async alterar (){
        const partDAO = new partidoDAO();
        await partDAO.alterar(this);
    }
    
    async excluir(){
        const partDAO = new partidoDAO();
        await partDAO.excluir(this);
    }

    async consultar(termoBusca){
        const partDAO = new partidoDAO();
        return await partDAO.consultar(termoBusca);
    }
}