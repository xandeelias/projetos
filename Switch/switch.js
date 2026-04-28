function meuSwitch(){
    let dia;
    let data = new Date().getDay();

    switch(data){
        case 0:
            dia = "Domingo";
            break;
        case 2:
        case 3:
        case 4:
            dia = " o Meio da Semana";
            break;
        case 6:
            dia = "Sábado";
            break;
        default:
            dia = "Dia da Semana";
    }
    document.getElementById("demo").innerHTML = "Hoje é " + dia;
}