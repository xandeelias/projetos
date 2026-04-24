function calculadora(){
    while(true){
        let resultado = 0.0;
        let operando1;
        let operando2;  
        let operador;
        let continua;
        let operador_valido = true;

        operando1 = parseFloat(prompt("Digite o Primeiro Número"));
        operando2 = parseFloat(prompt("Digite o Segundo Número"));
        operador = prompt("Digite uma das Operações( + - * / ): ");

        if (operador === "+" ) {
        resultado = operando1 + operando2;
        } else if (operador === "-"){
        resultado = operando1 - operando2;
        } else if (operador === "*"){
        resultado = operando1 * operando2;
        } else if (operador === "/"){
            if (operando2 == 0){
                alert("Não é Possível Fazer Esta Divisão");
                continua = prompt("Digite sim para continuar e não para encerrar")
                if(continua === "não"){
                    return
                }
            } else {
                resultado = operando1 / operando2;
            } 
        } else {
            alert("Algo ta Errado Ai!");
            operador_valido = false;
            continua = prompt("Digite sim para continuar e não para encerrar");
            if(continua === "não"){
                return
            }
        }
        if((operador != "/" || operando2 != 0) && operador_valido != false){
            alert("Resultado: " + 
            operando1 + " " + operador + " " + operando2 + " = " + resultado);
        }
    }
}
function minhaFunc(){
    while(true){
        let resultado = 0.0;
        let operando1;
        let operando2;  
        let operador;
        let continua;
        let operador_valido = true;

        operando1 = parseFloat(prompt("Digite o Primeiro Número"));
        operando2 = parseFloat(prompt("Digite o Segundo Número"));
        operador = prompt("Digite uma das Operações( + - * / ): ");

        if (operador === "+" ) {
        resultado = operando1 + operando2;
        } else if (operador === "-"){
        resultado = operando1 - operando2;
        } else if (operador === "*"){
        resultado = operando1 * operando2;
        } else if (operador === "/"){
            if (operando2 == 0){
                alert("Não é Possível Fazer Esta Divisão");
                continua = prompt("Digite sim para continuar e não para encerrar")
                if(continua === "não"){
                    return
                }
            } else {
                resultado = operando1 / operando2;
            } 
        } else {
            alert("Algo ta Errado Ai!");
            operador_valido = false;
            continua = prompt("Digite sim para continuar e não para encerrar");
            if(continua === "não"){
                return
            }
        }
        if((operador != "/" || operando2 != 0) && operador_valido != false){
            alert("Resultado: " + 
            operando1 + " " + operador + " " + operando2 + " = " + resultado);
        }
    }
}