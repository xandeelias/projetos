function ternario(){
    let dia;
    let data = new Date().getDay();

    dia = data == 0 ? "Domingo":
        data == 1? "Segunda-Feira":
        data == 2? "Terça-Feira":
        data == 3? "Quarta-Feira":
        data == 4? "Quinta-Feira":
        data == 5? "Sexta-Feira":
        "Sábado"

    document.getElementById("demo").innerHTML =  "Hoje é " + dia
}