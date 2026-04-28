function mapa(){
    const frutas = new Map();
    frutas.set("Maçã", 500);
    frutas.set("Banana", 300);
    frutas.set("Laranja", 200);

    let preço = frutas.get("Banana");

    console.log(preço);

    console.log(frutas.size);

    console.log(frutas.has('Banana'));
    frutas.forEach((valor, chave) => console.log(`${chave} = $${valor}`))

    for (const x of frutas.keys()){
        console.log(x)
    }
    // coleção contendo todos os valores d'um map
    for (const x of frutas.values()){
        console.log(x)
    }
}
mapa();