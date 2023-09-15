function* funcionGenerador(){ //Funcion para controlar el iterador, lo que permite pausar o retomar. El asterisco permite identificar la estructura.
    yield 1;  //La palabra reservada yield permite tener steps (pasos). 
    yield 2; //Se pueden poner varios, los que se quiera. Se retorna un valor numérico en cada uno.
    yield 3;
}

//cómo llamarlos?

const llamarGenerador = funcionGenerador(); //Esto nos permite tener acceso a la palabra reservada next, la cual va a ir iterando por cada yield.
console.log(llamarGenerador.next().value); //Se obtiene el 1° valor y se puede obtener también su valor.
console.log(llamarGenerador.next().value);
console.log(llamarGenerador.next().value);

/**
 * Otro ejemplo donde se pueda iterar con un array:
 * Con el array se haría una lógica más dinámica para poder utilizar la palabra yield.
 */
function* funcionIterate (array){ //iterate es el valor y se le pasa un array. 
    for (let value of array){ //Estructura for of. Para recorrer cada uno de los elementos del array. Value es el valor que se va a obtener del array, que se está pasando como argumento.
        yield value //retornar valor de cada elemento del array con la lógica de yield.
    }
}

//Llamar a la funcionIterate
const iterar = funcionIterate(['Jenni', 'Katherina']);
console.log(iterar.next()); //resultado: { value: 'Jenni', done: false }
console.log(iterar.next().value); //resultado: Katherina
console.log(iterar.next().value); //Si se ejecuta más de la cantidad de elementos existentes dentro del array, se mostrará en consola undefined.