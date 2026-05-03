// Jogo da Alunissagem
// 08/04/2026
// versão 0.1.0

/** @type {HTMLCanvasElement} */

document.body.style.fontFamily = "'Press Start 2P', monospace";
// Base do Jogo
let canvas = document.querySelector("#jogo");
let contexto = canvas.getContext("2d"); 
// Foguetes
let foguete = new Image();
foguete.src = "Image/sFoguete.png"
let framesChama = [];
let frameSrcs = ["Image/sFogo1.png", "Image/sFogo2.png", "Image/sFogo3.png", "Image/sFogo4.png"];
frameSrcs.forEach((src, i) => {
    framesChama[i] = new Image();
    framesChama[i].src = src;
});
let frameAtual = 0;
let contadorFrame = 0;
const velocidadeAnimacao = 6;
// Telas do Jogo
let jogoIniciado = false;
let telaFinalAtiva = false;
let instruções = false;
//Músicas e Sons
let musica1 = new Audio("Audio/MúsicaDeFundo.mp3");
musica1.loop = true;
musica1.volume = 0.6;
let musica2 = new Audio("Audio/MúsicaDeResultado.mp3");
musica2.loop = true;
musica2.volume = 0.3;
let somMotor = new Audio("Audio/somMotorFoguete.wav");
somMotor.loop = true;
somMotor.volume = 1;
// Coisas do Espaço
let terra = new Image();
terra.src = "Image/sTerra.png"
let lua = new Image();
lua.src = "Image/sLua.png"
const zonaLuaX1 = 200;
const zonaLuaX2 = 750;
// Funções do Jogo
let lançamento = (Math.round(Math.random()) == 0);
const gravidade = 0.01;
let estrelas = [];
for(let i = 0; i < 500; i++){
    estrelas[i] = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        raio: Math.sqrt(2 * Math.random()),
        brilho: 1.0, 
        apagando: true,
        cintilando: 0.03 * Math.random()
    }
}
let modulolunar = {
    posicao:{
        x: lançamento ? 100 : 700,
        y: 160
    },
    ângulo: lançamento ? -Math.PI/2 : Math.PI/2,
    largura: 128,
    altura: 128,
    cor: "lightgray",
    velocidade:{
        x: lançamento ? 2 : -2,
        y: 0
    },
    motorLigado: false,
    combustível:  lançamento ? 500 : 1000,
    rotaçãoHorario: false,
    rotaçãoAntihorario: false
}

function mostrarIndicador(mensagem, x, y){
    contexto.font = "14px 'Press Start 2P'";
    contexto.textAlign = "left";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "White";
    contexto.fillText(
        mensagem,
        x,
        y
    );
}
function mostrarResultado(mensagem, cor){
    contexto.font = "23px 'Press Start 2P'";
    contexto.textAlign = "center";
    contexto.fillStyle = cor;
    contexto.fillText(mensagem, canvas.width * 0.5, canvas.height * 0.4);
}
function mostrarVelocidade(){
    mostrarIndicador(
        `Velocidade V: ${(modulolunar.velocidade.y * 10).toFixed(2)} m/s H: ${(modulolunar.velocidade.x * 10).toFixed(2)}) m/s} `,
        50,
        40
    );
}
function mostrarCombustível(){
    mostrarIndicador(
        `Combustível: ${(modulolunar.combustível * 0.1).toFixed(0)} %`,
        50,
        100 
    );
}
function mostrarAltitude(){
    mostrarIndicador(
        `Altitude: ${Math.max(0, canvas.height - modulolunar.posicao.y -0.5 * modulolunar.altura).toFixed(0)} m`,
        50,
        80
    );
}
function mostrarAngulo(){
    mostrarIndicador(
        `Ângulo: ${(Math.abs(modulolunar.ângulo) * 180/Math.PI).toFixed(0)}°`,
        50,
        60
    );
}
function consumirCombustível(){
    modulolunar.combustível--;
        if(modulolunar.combustível <= 0){
            modulolunar.motorLigado = false;
        }  
}
function atraçãoGravitacional(){
    modulolunar.posicao.x += modulolunar.velocidade.x;
    modulolunar.posicao.y += modulolunar.velocidade.y;
    modulolunar.velocidade.y += gravidade;

    if(modulolunar.rotaçãoHorario){
        modulolunar.ângulo += Math.PI/180;
    } else if(modulolunar.rotaçãoAntihorario){
        modulolunar.ângulo -= Math.PI/180;
    }
    if(modulolunar.motorLigado){
        modulolunar.velocidade.y -= 0.02 * Math.cos(modulolunar.ângulo)
        modulolunar.velocidade.x += 0.02 * Math.sin(modulolunar.ângulo)
    }
}
function teclaPressionada(evento){
    if((evento.key == "ArrowUp" || evento.key == "w") && modulolunar.combustível > 1){
        modulolunar.motorLigado = true;
        if(somMotor.paused){
            somMotor.play();
        }
    } else if(evento.key == "ArrowRight" || evento.key == "d"){
        modulolunar.rotaçãoHorario = true;
    } else if(evento.key == "ArrowLeft" || evento.key == "a"){
        modulolunar.rotaçãoAntihorario = true;
    }
}
function teclaSolta(evento){
    if(evento.key == "ArrowUp" || evento.key == "w"){
        modulolunar.motorLigado = false;
        somMotor.pause();
        somMotor.currentTime = 0;
    } else if(evento.key == "ArrowRight" || evento.key == "d"){
        modulolunar.rotaçãoHorario = false;
    } else if(evento.key == "ArrowLeft" || evento.key == "a"){
        modulolunar.rotaçãoAntihorario = false;
    }
}
function desenharModuloLunar(){
    contexto.save();
    contexto.translate(modulolunar.posicao.x, modulolunar.posicao.y)
    contexto.rotate(modulolunar.ângulo);
    contexto.imageSmoothingEnabled = false;
    contexto.drawImage(
        foguete,
        modulolunar.largura * -0.5,
        modulolunar.altura * -0.7,
        modulolunar.largura,
        modulolunar.altura
    )
    if(modulolunar.motorLigado){
        desenharChama();
        modulolunar.combustível--;
        if(modulolunar.combustível <= 0){
            modulolunar.motorLigado = false;
        }
    }
    contexto.restore();
}
function desenharChama(){
    contadorFrame++;
    if (contadorFrame >= velocidadeAnimacao) {
        frameAtual = (frameAtual + 1) % framesChama.length;
        contadorFrame = 0;
    }
    contexto.imageSmoothingEnabled = false;
    contexto.drawImage(
        framesChama[frameAtual],
        modulolunar.largura * -0.5,
        modulolunar.altura * -0.15,
        modulolunar.largura,
        modulolunar.altura
    );
}
function desenharEstrelas(){
    contexto.clearRect(0,0, canvas.width, canvas.height);
    contexto.save();
    contexto.fillStyle = " #00011a"
    contexto.fillRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < estrelas.length; i++){
        let estrela = estrelas[i];
        contexto.beginPath();
        contexto.arc(estrela.x, estrela.y, estrela.raio, 0, 2 * Math.PI);
        contexto.closePath();
        contexto.fillStyle = `rgba(255, 255, 255, ${estrela.brilho})`;
        contexto.fill();
        if(estrela.apagando){
            estrela.brilho -= estrela.cintilando;
            if(estrela.brilho <= 0.1){
                estrela.apagando = false;
            }
        } else{
            estrela.brilho += estrela.cintilando;
            if(estrela.brilho > 0.95){
                estrela.apagando = true;
            }
        }
    }
    contexto.restore();
}
function desenharPlaneta(){
    contexto.imageSmoothingEnabled = false;
    contexto.drawImage(
        terra,
        canvas.width - 240,
        -25,
        256,
        256
    );
}
function desenharLua(){
    contexto.imageSmoothingEnabled = false;
    contexto.drawImage(
        lua,
        canvas.width - 1000,
        225,
        1024,
        1024
    );
}
function desenharInstruções(){
    contexto.fillStyle = "rgba(0, 0, 0, 0.7)";
    contexto.fillRect(0, 0, canvas.width, canvas.height);
    // caixa
    let boxX = canvas.width * 0.2;
    let boxY = canvas.height * 0.15;
    let boxW = canvas.width * 0.6;
    let boxH = canvas.height * 0.65;
    contexto.fillStyle = "#0a0a2e";
    contexto.strokeStyle = "#232385"
    contexto.lineWidth = 2;
    contexto.fillRect(boxX, boxY, boxW, boxH);
    contexto.strokeRect(boxX, boxY, boxW, boxH);
    //
    contexto.font = "21px 'Press Start 2P'";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "#f0f0f0";
    contexto.fillText("Instruções para Vencer", canvas.width * 0.5, boxY + 40);
    // instruções
    contexto.font = "12px 'Press Start 2P'";
    contexto.fillStyle = "#dfdfdf";
    let linhas = [
        "Pouse a nave suavimente",
        "na superficie lunar.",
        " ",
        "Use WAD ou as SETAS para se movimentar",
        " ",
        "Siga isso para vencer",
        " ",
        "velocidades precisam ser menor que 5 m/s",
        "e o ângulo precisa ser menor que 5°",
        " ",
        " ",
        "Boa sorte, astronauta!"
    ];
    linhas.forEach((linha, i) => {
        contexto.fillText(linha, canvas.width * 0.5, boxY + 90 + i * 28);
    });
    // botão X
    let xBtn = boxX + boxW - 28;
    let yBtn = boxY + 28;
    contexto.font = "20px 'Press Start 2P'";
    contexto.fillStyle = "red";
    contexto.fillText("X", xBtn, yBtn);
}
function desenhar(){
    atraçãoGravitacional();
    desenharEstrelas();
    desenharPlaneta();
    desenharLua();
    desenharModuloLunar();
    mostrarCombustível();
    mostrarVelocidade();
    mostrarAltitude();
    mostrarAngulo();

    if(encerrarJogo()){
        return;
    }
    requestAnimationFrame(desenhar);
}
function mostrarTelaInicial(){
    desenharEstrelas();
    contexto.imageSmoothingEnabled = false;
    contexto.drawImage(
        terra,
        canvas.width - 1560,
        -270,
        1250,
        1250
    );
    contexto.font = "33px 'Press Start 2P'";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "white";
    contexto.fillText("ALUNISSAGEM", canvas.width * 0.78, canvas.height * 0.54);
    if (Math.floor(Date.now() / 700) % 2 === 0) {
        contexto.font = "12px 'Press Start 2P'";
        contexto.textAlign = "middle"
        contexto.fillStyle = "#faf1ff";
        contexto.fillText("Pressione ENTER para Iniciar o Jogo", canvas.width * 0.745, canvas.height * 0.6);
    }
    if(instruções){
        desenharInstruções();
    }
    if(!jogoIniciado)
    requestAnimationFrame(mostrarTelaInicial);
}
function iniciarJogo(evento){
    if (evento.key == "Enter" && !jogoIniciado){
        document.removeEventListener("keydown", iniciarJogo);
        instruções = true;
    }
}
function encerrarJogo(){
    let naLua = modulolunar.posicao.x >= zonaLuaX1 && 
                modulolunar.posicao.x <= zonaLuaX2;
    if(modulolunar.posicao.y > canvas.height - modulolunar.altura * 1.2 - modulolunar.largura * -0.9){
        if(naLua){
            let sucesso = modulolunar.velocidade.y <= 0.5 && 
                Math.abs(modulolunar.velocidade.x) <= 0.5 && 
                Math.abs(modulolunar.ângulo) * 180/Math.PI <= 5;
            somMotor.pause();
            somMotor.currentTime = 0;
            document.removeEventListener("keydown", teclaPressionada);
            document.removeEventListener("keyup", teclaSolta);
            document.addEventListener("keydown", function reiniciar(evento){
                if(evento.key == "Enter"){
                    document.removeEventListener("keydown", reiniciar);
                    telaFinalAtiva = false;
                    lançamento = (Math.round(Math.random()) == 0);
                    modulolunar.posicao.x = lançamento ? 100 : 700;
                    modulolunar.posicao.y = 160;
                    modulolunar.ângulo = lançamento ? -Math.PI/2 : Math.PI/2;
                    modulolunar.velocidade.x = lançamento ? 2 : -2;
                    modulolunar.velocidade.y = 0;
                    modulolunar.motorLigado = false;
                    modulolunar.combustível = 1000;
                    modulolunar.rotaçãoHorario = false;
                    modulolunar.rotaçãoAntihorario = false;
                    document.addEventListener("keydown", teclaPressionada);
                    document.addEventListener("keyup", teclaSolta);
                    desenhar();
                    musica1.play();
                    musica2.pause();
                    musica2.currentTime = 0;
                } else if(evento.key == "Backspace"){
                    document.removeEventListener("keydown", reiniciar);
                    telaFinalAtiva = false;
                    lançamento = (Math.round(Math.random()) == 0);
                    modulolunar.posicao.x = lançamento ? 100 : 700;
                    modulolunar.posicao.y = 160;
                    modulolunar.ângulo = lançamento ? -Math.PI/2 : Math.PI/2;
                    modulolunar.velocidade.x = lançamento ? 2 : -2;
                    modulolunar.velocidade.y = 0;
                    modulolunar.motorLigado = false;
                    modulolunar.combustível = 1000;
                    modulolunar.rotaçãoHorario = false;
                    jogoIniciado = false;
                    document.addEventListener("keydown", iniciarJogo);
                    mostrarTelaInicial();
                    musica1.play();
                    musica1.volume = 0.6;
                    musica2.pause();
                    musica2.currentTime = 0;
                }
            });
            telaFinalAtiva = true;
            musica1.pause();
            musica1.currentTime = 0;
            setTimeout(() => { musica2.play(); telaFinal(sucesso); }, 950);
            return true;
        }
    }
    //Chão
    if(modulolunar.posicao.y > canvas.height + 100){
        somMotor.pause();
        somMotor.currentTime = 0;
        document.removeEventListener("keydown", teclaPressionada);
        document.removeEventListener("keyup", teclaSolta);
        document.addEventListener("keydown", function reiniciar(evento){
            if(evento.key == "Enter"){
                document.removeEventListener("keydown", reiniciar);
                telaFinalAtiva = false;
                lançamento = (Math.round(Math.random()) == 0);
                modulolunar.posicao.x = lançamento ? 100 : 700;
                modulolunar.posicao.y = 160;
                modulolunar.ângulo = lançamento ? -Math.PI/2 : Math.PI/2;
                modulolunar.velocidade.x = lançamento ? 2 : -2;
                modulolunar.velocidade.y = 0;
                modulolunar.motorLigado = false;
                modulolunar.combustível = 1000;
                modulolunar.rotaçãoHorario = false;
                modulolunar.rotaçãoAntihorario = false;
                document.addEventListener("keydown", teclaPressionada);
                document.addEventListener("keyup", teclaSolta);
                desenhar();
                musica1.play();
                musica2.pause();
                musica2.currentTime = 0;
            } else if(evento.key == "Backspace"){
                document.removeEventListener("keydown", reiniciar);
                telaFinalAtiva = false;
                lançamento = (Math.round(Math.random()) == 0);
                modulolunar.posicao.x = lançamento ? 100 : 700;
                modulolunar.posicao.y = 160;
                modulolunar.ângulo = lançamento ? -Math.PI/2 : Math.PI/2;
                modulolunar.velocidade.x = lançamento ? 2 : -2;
                modulolunar.velocidade.y = 0;
                modulolunar.motorLigado = false;
                modulolunar.combustível = 1000;
                modulolunar.rotaçãoHorario = false;
                jogoIniciado = false;
                document.addEventListener("keydown", iniciarJogo);
                mostrarTelaInicial();
                musica1.play();
                musica1.volume = 0.6;
                musica2.pause();
                musica2.currentTime = 0;
            }
        });
        telaFinalAtiva = true;
        musica1.pause();
        musica1.currentTime = 0;
        setTimeout(() => { musica2.play(); telaEasterEgg(); }, 950);
        return true;
    }
    //Lados
    if(modulolunar.posicao.x < -100 || modulolunar.posicao.x > canvas.width + 100){
    somMotor.pause();
    somMotor.currentTime = 0;
    document.removeEventListener("keydown", teclaPressionada);
    document.removeEventListener("keyup", teclaSolta);
    document.addEventListener("keydown", function reiniciar(evento){
        if(evento.key == "Enter"){
            document.removeEventListener("keydown", reiniciar);
            telaFinalAtiva = false;
            lançamento = (Math.round(Math.random()) == 0);
            modulolunar.posicao.x = lançamento ? 100 : 700;
            modulolunar.posicao.y = 160;
            modulolunar.ângulo = lançamento ? -Math.PI/2 : Math.PI/2;
            modulolunar.velocidade.x = lançamento ? 2 : -2;
            modulolunar.velocidade.y = 0;
            modulolunar.motorLigado = false;
            modulolunar.combustível = 1000;
            modulolunar.rotaçãoHorario = false;
            modulolunar.rotaçãoAntihorario = false;
            document.addEventListener("keydown", teclaPressionada);
            document.addEventListener("keyup", teclaSolta);
            desenhar();
            musica1.play();
            musica2.pause();
            musica2.currentTime = 0;
        } else if(evento.key == "Backspace"){
            document.removeEventListener("keydown", reiniciar);
            telaFinalAtiva = false;
            lançamento = (Math.round(Math.random()) == 0);
            modulolunar.posicao.x = lançamento ? 100 : 700;
            modulolunar.posicao.y = 160;
            modulolunar.ângulo = lançamento ? -Math.PI/2 : Math.PI/2;
            modulolunar.velocidade.x = lançamento ? 2 : -2;
            modulolunar.velocidade.y = 0;
            modulolunar.motorLigado = false;
            modulolunar.combustível = 1000;
            modulolunar.rotaçãoHorario = false;
            jogoIniciado = false;
            document.addEventListener("keydown", iniciarJogo);
            mostrarTelaInicial();
            musica1.play();
            musica1.volume = 0.6;
            musica2.pause();
            musica2.currentTime = 0;
        }
    });
    telaFinalAtiva = true;
    musica1.pause();
    musica1.currentTime = 0;
    setTimeout(() => { musica2.play(); telaEasterEgg(); }, 950);
    return true;
    }
    return false;
}
function telaEasterEgg(){
    if(!telaFinalAtiva) return;
    desenharEstrelas();
    if(telaEasterEgg){
        mostrarResultado("Agora Você Está Navegando pelo Espaço!", "#ff9900")
    }
    contexto.font = "13px 'Press Start 2P'";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "#faf1ff";
    contexto.fillText(`Velocidade V: ${(modulolunar.velocidade.y * 10).toFixed(2)} m/s H: ${(modulolunar.velocidade.x * 10).toFixed(2)}) m/s}`,
        canvas.width * 0.5, canvas.height * 0.5);
    contexto.fillText(`Ângulo: ${(Math.abs(modulolunar.ângulo) * 180/Math.PI).toFixed(0)}°`, canvas.width * 0.5, canvas.height * 0.53);
    contexto.fillText(`Combustível restante: ${(modulolunar.combustível * 0.1).toFixed(0)} %`, canvas.width * 0.5, canvas.height * 0.56);
    if(Math.floor(Date.now() / 1500) % 2 === 0) {
        contexto.font = "13px 'Press Start 2P'";
        contexto.fillStyle = "white";
        contexto.fillText("Pressione ENTER para Jogar Novamente", canvas.width * 0.5, canvas.height * 0.65);
    }else if(Math.floor(Date.now() / 1500) % 2 === 1) {
        contexto.font = "13px 'Press Start 2P'";
        contexto.fillStyle = "white";
        contexto.fillText("Pressione BACKSPACE para Voltar ao Início", canvas.width * 0.5, canvas.height * 0.65);
    }
    requestAnimationFrame(() => telaEasterEgg());
}
function telaFinal(sucesso){
    if(!telaFinalAtiva) return;
    desenharEstrelas();
    if(sucesso){
        mostrarResultado("A sua Alunissagem foi Feita com Sucesso!", "#0bd415");
    } else {
        mostrarResultado("Você Falhou ao Tentar Alunissar!", "red");
    }
    contexto.font = "13px 'Press Start 2P'";
    contexto.textAlign = "center";
    contexto.textBaseline = "middle";
    contexto.fillStyle = "#faf1ff"; 
    contexto.fillText(`Velocidade V: ${(modulolunar.velocidade.y * 10).toFixed(2)} m/s H: ${(modulolunar.velocidade.x * 10).toFixed(2)}) m/s}`, 
    canvas.width * 0.5, canvas.height * 0.5)
    contexto.fillText(`Ângulo: ${(Math.abs(modulolunar.ângulo) * 180/Math.PI).toFixed(0)}°`, canvas.width * 0.5, canvas.height * 0.53);
    contexto.fillText(`Combustível restante: ${(modulolunar.combustível * 0.1).toFixed(0)} %`, canvas.width * 0.5, canvas.height * 0.56);
    if(Math.floor(Date.now() / 1500) % 2 === 0) {
        contexto.font = "13px 'Press Start 2P'";
        contexto.textAlign = "center";
        contexto.textBaseline = "middle";
        contexto.fillStyle = "white";
        contexto.fillText("Pressione ENTER para Jogar Novamente", canvas.width * 0.5, canvas.height * 0.65);
    } else if(Math.floor(Date.now() / 1500) % 2 === 1) {
        contexto.font = "13px 'Press Start 2P'";
        contexto.textAlign = "center";
        contexto.textBaseline = "middle";
        contexto.fillStyle = "white";
        contexto.fillText("Pressione BACKSPACE para Voltar ao Início", canvas.width * 0.5, canvas.height * 0.65);
    }
    requestAnimationFrame(() => telaFinal(sucesso));
}
canvas.addEventListener("click", function(evento){
    if(!instruções) return;
    // mesmos valores da caixa em desenharInstrucoes
    let boxX = canvas.width * 0.2;
    let boxY = canvas.height * 0.15;
    let boxW = canvas.width * 0.6;
    let xBtn = boxX + boxW - 28;
    let yBtn = boxY + 28;
    // área clicável do X
    let rect = canvas.getBoundingClientRect();
    let mouseX = evento.clientX - rect.left;
    let mouseY = evento.clientY - rect.top;

    if(mouseX >= xBtn - 20 && mouseX <= xBtn + 20 &&
       mouseY >= yBtn - 20 && mouseY <= yBtn + 20){
        instruções = false;
        jogoIniciado = true;
        musica1.volume = 0;
        setTimeout(() => {
            document.addEventListener("keydown", teclaPressionada);
            document.addEventListener("keyup", teclaSolta);
            desenhar();
        }, 250);
    }
});
document.addEventListener("keydown", iniciarJogo);
mostrarTelaInicial(musica1.play());