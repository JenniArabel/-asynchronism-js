//CONSTRUIR UNA PROMESA: Algo que va a pasar ahora, deespues o nunca.
/**Crear una constante llamada "myPromise" =  new Promise, 
 * luego una function anonima que regresa 2 funciones, x las cuales vamos a saber en qué estado se encuentra.
 * Dentro de la function se hará lo que requiera el cód, sg el caso se puede:
 * 1) llamar con exito a resolve y mostrar la info al usuario
 * 2) Hacer alguna validacion a la info q se está recibiendo o validacion del estado de un servidor p luego decirselo al usuario, incluso si arroja error*/
const myPromise = new Promise ( function (resolve, reject) {
    resolve('Hey! Todo ha sido correcto')
});

const vacas = 15;

const contarVacas = new Promise (function (resolve,reject){
    if (vacas > 10){
        resolve(`Tenemos ${vacas} vacas en la granja.`);
    } else{
        reject("No hay suficientes vacas en la granja.")
    }
});

//Arrow function para llamar la promesa
contarVacas.then((resultado) => {
    console.log(resultado);
}).catch((error) => {
    console.log(error);
}).finally(() => console.log('Fin.'));