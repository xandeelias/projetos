function procedimento(){
    function inicio(){
        mensagem(frase = "O Resultado de a² + b² é: " + calcular(a = 9, b = 16));
    }
    function mensagem(frase){
        let linha = "-";
        let i = 0;
        do{
            linha = linha + "-"
            i++;
        }while( i < 78);
        alert(linha + "\n" + frase + "\n" + linha);
    }
    function calcular(a, b){
        return a * a + b * b;
    }
    inicio();
}