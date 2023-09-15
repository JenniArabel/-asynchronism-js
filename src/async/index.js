/** Vamos a hacer una promesa en la que se valide que va a ser resuelta.
 * Luego hacer el llamado de la misma para ver cómo se desenvuelve el concepto de await y de cómo va a estar fluyendo el flujo de la app sin interrumpirla. 
 */

//Se declara una constante como una arrow funtion, la cual va a permitir retornar la promesa y con ella poderla utilizar.
const funcionAsync = () => {
    return new Promise((resolve, reject) => {  //retornar una promesa, a la que se le pasa una funcion anónima, la cual nos envía un resolve y reject, por los cuales vamos a poder manejar los flujos que suele tener una promesa.
        (true)//Dentro se hace una validación, la cual queremos que regrese un string. Para eso se usa un if ternario. Pero al colocar (true) estamos forzando que el if ternario sea verdadero.
        ? setTimeout (() => resolve('Async!!'), 2000) //La primer sentencia es la verdadera: setTimeout el cual recibe una funcion anónima. Dentro de éste, se regresa el resolve con el string que se quiera. En este caso 'Async!!'. Luego de la coma, recibe el segundo argumento de setTimeour, el cual es el tiempo. 2000 = 2 segundos.
        : reject(new Error('Error!')); //Para el caso del else, cuando no se cumpla la condicion, se usa reject.
    });
}

//Condicional if ternario tiene un sintaxis más clara y amigable, con menos código.

/**
 * Ya tenemos la funcion que va a ser tratada como la promesa.
 * 
 * Ahora vamos a hacer la funcion que va a utilizar el concepto de async y con ello hacer el llamado del await, 
 * pero también se ejecutarán otros console.log para ver donde está el proceso y el flujo de nuestra aplicación, y ver hasta donde nos interrumpe.
 */

const anotherfuncion = async () => { //Generamos una nueva constant, que va a utilizar la palabra reservada async antes de los argumentos que pudiera recibir esta funcion.
    const something = await funcionAsync(); //Una vez dentro, podemos dar uso de la palabra reservada await, para ello se puede: generar una constante;  ponerle nombre; usar await y llamar a la funcionAsincronica. Esto retorna una promesa. Por lo tanto, se va a poder mostrar la informacion (sg el caso).
    console.log(something); //mostrar en consola lo anterior.
    console.log('Hello!'); //Qué pasa si la aplicacion tiene que esperar al await a quye cumpla esa promesa? Qué pasa si se coloca otro console.log que diga hello.
}

//Llamar a la siguiente funcion.
console.log('Before'); // Antes de que se llama a la funcion.
anotherfuncion();
console.log('After');

/**USAR LAS PALABRAS RESERVADAS ASYN Y AWAIT
 *  ASYNC: para el cuerpo de la funcion
 *  AWAIT: para dentro de la logica que se implementará, lo cual va a permitir trabajar dentro del asincronismo y trabajar con multiples elementos que se quieran llamar/ejecutar, sin detener el flujo de la aplicacion.
 * 
 * El resultado de la ejecución es: Before, After, Async y Hello.
 * 
 * Esto es porque async y await no bloquean la aplicación, 
 * por lo tanto no está esperando a que la funcionAsync suceda para que todo lo demás que está ejecutandose tenga que suceder.
 * Por lo tanto, 
 * 1° es el Before xq es el primer console.log que puede ser ejecutado,
 * 2° ocurre el llamado a la funcion anotherfuncion, la cual a su vez llama a la primer funcion funcionAsync. Pero como ésta tiene una demora de 2 segundos, por el mientras continúa.
 * 3° Ejecuta el after.
 * 4° Luego de pasado los 2 sg se ejecuta el console.log de la funcionAsync
 * 5° Le sigue el console.log de anotherfuncion
 */