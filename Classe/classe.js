function classe(){
    class Carro{
        constructor(nome, ano){
            this.nome = nome;
            this.ano = ano;
        }
        idade(){
            const data = new Date();
            return data.getFullYear() - this.ano;
        }
    }
    let meuCarro = new Carro("Kwid", 2009);
    let frase = "O meu " + meuCarro.nome + " "+  meuCarro.ano + 
                " tem " +meuCarro.idade() + " anos."
    console.log(frase);
    let outraFrase = "Feijão com Farinha."
}
classe();