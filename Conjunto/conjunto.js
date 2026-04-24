function conjunto(){
    const letras = new Set();
    letras.add("a");
    letras.add("b");

    console.log(letras.has("g"));

    letras.delete("c");
    console.log(letras);

    for(const x of letras.values()){
        console.log(x);
    }
    // retorna a mesma coleção que values e vice versa
    for(const x of letras.keys()){
        console.log(x);
    }
}
conjunto();