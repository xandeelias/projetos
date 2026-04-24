 async function lagarta(){
    let lagarta = "(_)(_)(_)(_)(_)(Ô.Ô)";
    let encolher = "(_)(__)(_)(__)(_)(ô.Ô)";
    let espaço = "   ";
    let encolher2 = "(__)(_)(__)(_)(__)(Ô.ô)";

    function sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    for(let i = 0;i < 1000000; i++){
          
        lagarta = espaço + lagarta
        console.log(lagarta)
        await sleep(500)
        console.clear()
        encolher = espaço + encolher
        console.log(encolher)
        await sleep(500)
        console.clear()
        encolher2 = espaço + encolher2
        console.log(encolher2)
        await sleep(500)
        console.clear()
        }
}