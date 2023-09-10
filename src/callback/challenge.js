//Reto de trabajar con una API
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

//Llamado a API
//Se coloca en mayuscula xq hace referencia a que es un valor que no va a cambiar en los archivos
const API = 'https://api.escuelajs.co/api/v1';

/*Crear una fx para recibir la url (la API) y el callback, el cual va a ser una fx anónima para recibir la solicitud q nos está entregando el llamado a esta API.
En los argumentos va a recibir: la url y el callback. (El callback va a retornar la data de la API o un error) */
function fetchData(urlApi, callback){
    //llamado de http, x lo tanto generamos una variable "xhttp", q es una referencia a new XMLHttpRequest.
    let xhttp = new XMLHttpRequest();

    /* Ahora trabajaremos con los elementos que integra xhttp 
    .open para abrir una coleccion de la API
    (Dentro de los argumentos que va a recibir):
        'GET' es el tipo de peticion que vamos a hacer, en este caso es OBTENER
        Luego le pasamos la url que va a utilizar --> urlApi
        true es para habilitar */
    xhttp.open('GET', urlApi, true);

    /*Luego vamos a usar xhttp.onreadystatechange, el cual es otro elemento de los que tiene XMLHTTP Request, que sirve para escuchar diferentes estados     que tiene la solicitud, y con esto saber cuando está disponible la informacion. Luego se le pasa una function que recibe un evento. 
    Dentro de la fx se va a validar el tipo de estado en el q se encuentra utilizando un IF.
    La condicion del if va a realizar un triple igualdad (mismo valor y tipo de dato): xhttp.readyState === 4 --> (mirar abajo su significado) 
    Dentro de los distintos estados: 0 es para cuando no se ha inicializado; 1 Loading (todavia no ha sido ejecutado); 2 ya se ejecutó el valor de send; 3 Interactuando (se está descargando o trabajando con la solicitud); y el 4 para cuando se ha completado la llamada (ya está completada la informacion para poder hacer un valor particular).
    Una vez cumplida la validacion,se hace otra validación de xhttp.status === 200, lo cual significa que la solicitud ha sido correcta (el servidor ha respondido de forma correcta).
    Una vez verificado que es correcto, se utilizará el callback para pasarle 2 valores: el 1ro un valor nulo y el 2do va a ser una transformación de la información, por lo tanto se va a usar JSON.parse() para hacer un parsing de datos. Dentro del parse(xhttp.responseText) se recibe lo que entrega el servidor. Lo que recibe, se recibe como texto y si se quiere hacer un objeto, se debe hacer esta transformacion a un valor en JSON.
    El primer IF, tendrá un ELSE para hacer una lógica en caso de haber un error en el manejo de la información. Por lo tanto, se creará una const con nombre de error, lo cual va a ser una referencia a new Error, el cual va a pasar un nombre 'Error'y un valor (sg el caso), como el de urlApi. Significa que el error fue particularmente de la API.
    Luego, dentro del ELSE se retornará el callback pasandole el valor de error y luego el valor de null, xq no se está regresando ningun dato.*/
    xhttp.onreadystatechange = function(event){
        if(xhttp.readyState === 4){
            if(xhttp.status === 200){
               callback(null,JSON.parse(xhttp.responseText));
            } else {
                const error = new Error('Error' + urlApi);
                return callback(error,null);
            }
        }
    }
    //Continuamos con el llamado al xhttp.send 
    xhttp.send();
    /*Con esto ya tenemos una forma q se utilizaba a los inicios de JS. En este caso xmlhttp Request, tiene soporte en todos los navegadores.
    Hay que tener presente que fetch es una implementacion más moderno para hacer más simple el llamado a una solicitud.
    Ambas funcionan, se debe ponderar cual utilizar sg las necesidades y el control que se quiera tener sobre la informacion. */
}
/*Con xmlhttprequest se puede controlar todo el flujo del llamado, pero hay diferentes formar de hacer peticiones a una API */

//se invoca el metodo fetchData() pasandole como argumentos la varible API concatenada con la cadena 'products' para acceder a la URL de la API deseada, y una función anónima -callback - que recibe 2 parámetros (un objeto de error y un arreglo que almacena todos los objetos traidos por la API).
fetchData (`${API}/products`, function(error1, data1){
     //se valida si existe un error, en caso de que exista se detiene el proceso y se imprime el error
    if(error1)return console.error(error1);
    //se invoca nuevamente la función fetchData con el fin de acceder a un objeto puntual del arreglo data1, se envia como parámetros la url de la API apuntando al atributo del primer objeto de arreglo data1 y nuevamente una función anónima.
    fetchData(`${API}/products/${data1[0].id}`, function(error2, data2){
         //si en este punto se identifica un error se imprime en consola y se detiene el proceso
        if(error2) return console.error(error2);
        //Se invoca nuevamente la funcion fetchData con el fin de acceder a la categoria, se envían como parametros la url de la API con la concatenación de 'Categories' y el atributo Id de categoria del objeto data2 de la función anterior
        //en este caso puntual se hace uso de Optional Caining el cual hace una evalucación de las propiedades de un objeto y en vez de arrojar un error devuelve undefined en caso que la propiedad no exista o sea null.
        //igual que las anteriores se envia una funcion anonima con 2 argumentos, un objeto Error y un objeto de datos
        fetchData(`${API}/categories/${data2?.category?.id}`, function(error3, data3){
             //se valida si existe error, en caso de que exista se detiene el proceso y se imprime el error
            if(error3) return console.error(error3);
            //Se imprime el objeto en la posición 1 del arreglo de los objetos obtenidos en el metodo invocado inicialmente
            console.log(data1[0]);
            //Se imprime el titulo del objeto que se consultó en la seguna invocación de la función
            console.log(data2.title);
            //Se imprime el nombre de la categoria a la que pertenece el objeto que se consultó en la seguna invocación del método.
            console.log(data3.name);
        });
    });
});