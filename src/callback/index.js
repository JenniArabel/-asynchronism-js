function suma(num1, num2){
    return num1 + num2;
}

function calc(num1,num2, callback){
    return callback(num1,num2);
}

console.log(calc(2, 5, suma));

/*Estamos ejecutando una funcion llamada calc, la cual recibe 3 argumentos:
2 valores numéricos y un tercero que es una funcion
No necesariamente la funcion que sirve como argumento se tiene que llamar callback
Se le puede colocar cualquier nombre
Muchas veces se le llama callback para hacer referencia a lo que estamos haciendo */

setTimeout(function(){
    console.log('Hola JS');
},5000)
//Tiempo de 5 segundos

function greeting(name){
    console.log(`Hola ${name}`);
}

setTimeout(greeting, 2000, 'Jenni');
//(funcion, tiempo 2 sgs, mensaje)



