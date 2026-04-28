function loop(){
    let texto = "";
    let i = 0;

    while(i <= 100000){
        texto += "O Número é " + i + "<br>";
        i++;
    }
    document.getElementById("demo").innerHTML= texto;
}