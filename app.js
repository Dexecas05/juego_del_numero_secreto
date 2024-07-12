/// creamos la variable número secreto

let numeroSecreto = 0;
let numeroMaximo = 10;
let cantidadIntentos = 0;
let listaNumerosSorteados = [];


/* lo que hacemos a continuación es: generar una variable con let, a la cual le asignamos
como contenido o valor un título u objeto tipo header, el cual está contenido 
en el archivo index.html.
Luego, hacemos lo mismo pero para un objeto de tipo paragraph o párrafo

let titulo = document.querySelector('h1');
titulo.innerHTML = "Juego del Número Secreto";

let parrafo = document.querySelector('p');
parrafo.innerHTML = "Selecciona un número del 1 al 30" */

/* para optimizar el código, vamos a crear una función con parámetros
    que nos permita replicarla y crear tantas variables como sea necesaria*/

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

// vamos a generar el número secreto

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    console.log("número generado: " + numeroGenerado);
    console.log(listaNumerosSorteados);

    // Si (if) ya fueron sorteados y agregados a la lista todos los números posibles
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', "Ya fueron sorteados todos los números posibles")
        
    } else {
        
        // Si (if) el número generado está incluído en la lista [listaNumerosSorteados]
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            // recursividad: la función se llama a sí misma
            return generarNumeroSecreto();
            
        } else { // si el número generado no está incluído en la lista
            listaNumerosSorteados.push(numeroGenerado); // agregar número a la lista
            return numeroGenerado;
        }
    }

}


/* en el archivo html > en el botón intentar, colocamos una función llamada 'verificarIntento()',
la cual va a activarse onclick, osea al ser presionado.
 La función tiene el argumento vacío, por lo que vamos a completar ese punto ahora,
en este archivo. */

/* no vamos a usar 'querySelector()' porque solo devuelve el primer elemento que coincide
con el criterio, y es seguro que en el futuro vamos a lidiar con más de un elemento del 
mismo tipo. Por lo tanto vamos a usar 'getElementById()'. */

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    console.log("cantidad de intentos: " + cantidadIntentos);
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `Bien hecho! Acertaste! en ${cantidadIntentos} ${cantidadIntentos == 1 ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        
        // el usuario no acierta
    } else {
        if (numeroDeUsuario < numeroSecreto) {
            asignarTextoElemento('p', "Incorrecto. Pista: el número secreto es mayor");
        }
        
        else {
            asignarTextoElemento('p', "Incorrecto. Pista: el número secreto es menor");
        }
        cantidadIntentos++;
        limpiarCampo();
    }
    return;
}


// función para limpiar el campo donde se incerta el número.

function limpiarCampo() {
    let valorCampo = document.getElementById('valorUsuario');
    valorCampo.value = '';
    
}

// función de mensajes iniciales

function condicionesIniciales() {
    // mensajes iniciales
    asignarTextoElemento('h1', "Juego del Número Secreto");
    asignarTextoElemento('p', `Selecciona un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    // console.log("el número secreto es: " + numeroSecreto);
    cantidadIntentos = 1;
}

// función para reiniciar el juego.

function reiniciarJuego() {
    // limpiar la caja
    limpiarCampo();
    // mensajes iniciales + generar el número secreto + reiniciar el contador de intentos
    condicionesIniciales(); 
    // desahilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true'); // usando querySelector con el # antes del nombre del ID es similar a getElementById

}


// llamar funciones

condicionesIniciales();



