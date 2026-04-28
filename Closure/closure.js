function meuContador(){
    let contador = 0;
    return() => {
        contador++;
        return contador;
    }
}
const adicionar = meuContador();
function minhaFunc(){
    document.getElementById("demo").innerHTML = adicionar()
}