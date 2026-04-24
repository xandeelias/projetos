function callback(){
    const minhaFunc = (num1, num2, operacao) => {
        return operacao(num1, num2);
    }
    const calcular  = (a, b) => a / b

    console.log(minhaFunc(9, 4, calcular));
}
callback();