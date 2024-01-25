const btnIntento = document.getElementById('btnIntento');
const btnReinicio = document.getElementById('reiniciar');
const btnAumentar = document.getElementById('btnAumentar');
let numeroMaximo = 10;
let numerosSorteados = [];
let intentos = 3;
let numeroRandom = obtenerNumeroRandom();

function asignarTexto(elemento, texto) {
    let titulo = document.querySelector(elemento);
    titulo.innerHTML = texto;
};

function obtenerNumeroRandom() {
    let numero = Math.floor(Math.random() * numeroMaximo + 1);
    if(numerosSorteados.length === numeroMaximo) {
        asignarTexto('p', 'No hay más números para adivinar!, aumenta el limite!');
    }else{
        if (numerosSorteados.includes(numero)) {
            return obtenerNumeroRandom();
         }else{
             return numero;
         }
    }
    
};

function verficarIntento() {
    let numero = Number(document.getElementById('inputUsuario').value);

    if (numero === numeroRandom) {
        asignarTexto('h1', 'Ganaste!');
        asignarTexto('p', 'El número secreto era: ' + numeroRandom);
        intentos = 3;
        numerosSorteados.push(numeroRandom);
        numeroRandom = obtenerNumeroRandom();
        document.querySelector('#reiniciar').removeAttribute('disabled');

    } else if (numero > numeroRandom && intentos > 0) {
        intentos--;
        asignarTexto('h1', 'Ops!');
        asignarTexto('p', `El número secreto es menor, te queda ${intentos} ${intentos > 1 ? "intentos" : "intento"}`);
    } else if (numero < numeroRandom && intentos > 0) {
        intentos--;
        asignarTexto('h1', 'Ops!');
        asignarTexto('p', `El número secreto es mayor, te queda ${intentos} ${intentos > 1 ? "intentos" : "intento"}`);
    } else {
        asignarTexto('h1', 'Perdiste!');
        asignarTexto('p', 'El número secreto era: ' + numeroRandom);
        intentos = 3;
        numerosSorteados.push(numeroRandom);
        numeroRandom = obtenerNumeroRandom();
};
};

function nuevoJuego() {
    asignarTexto('h1', 'Juego del número secreto');
    asignarTexto('p', `indica un número entre 1 y ${numeroMaximo}`);
    intentos = 3;
    numeroRandom = obtenerNumeroRandom();
    document.getElementById('inputUsuario').value = '';
    document.querySelector('#reiniciar').setAttribute('disabled', true);
};

function aumentarLimite(){
    numeroMaximo += 10;
    asignarTexto('p', `indica un número entre 1 y ${numeroMaximo}`);
    nuevoJuego();
}

asignarTexto('h1', 'Juego del número secreto');
asignarTexto('p', `indica un número entre 1 y ${numeroMaximo}`);

btnIntento.addEventListener('click', verficarIntento);
btnReinicio.addEventListener('click', nuevoJuego);
btnAumentar.addEventListener('click', aumentarLimite);