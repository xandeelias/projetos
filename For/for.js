function meuFor(){
    let texto = "";

    for(let i = 0; i <= 10; i++){
        texto += "O Número é " + i + "<br>"
    }
    document.getElementById("demo").innerHTML = texto;
}