import fetch from "node-fetch"; //uso de fetch
const API = 'https://api.escuelajs.co/api/v1'; //API

//POST DATA: Agregar información
/**Crear funcion que se llame postData, que recibe 2 argumentos, por un lado, la url q se va a usar y, por otro, la data que se va a usar.
 * 
 * Dentro de la function se creará una constante que se llame reponse, que sea de fetch, pero lo distinto de lo anterior, es que se agregará una
 * estructura de datos para que se entienda que ahora no se hará una solicitud GET, sino POST (guardar datos). Así que dentro de fetch se le 
 * pasa la urlAPI con la cual va a conectarse y un objeto que va a tener esa configuración necesaria para indicar el método que se va a implementar,
 * el modo en que se va a estar utilizando, las credenciales en caso de que se tenga que guardar info con un usuario y contraseña, etc. Así que 
 * dentro de fetch se colocaran cada uno de estos elementos.
 * 
 * Function que se encarga de utilizar fetch y transformarlo a el llamado del método POST con las configuraciones mínimas. Al final lo retorna.
*/
function postData(urlApi, data){
    const response = fetch(urlApi, {
        method: 'POST', //Puede ser GET, POST, PUT. Tiene que ir en mayusculas.
        mode: 'cors', //Mode es el modo. Se trata de los permisos que va a tener y por defecto siempre va a estar en cors.
        credentials: 'same-origin' , //Optional xq por defecto ya tiene ciertas configuraciones. Su valor es de same-origin, que es su valor por defecto. Lo cual indica que si no hay ninguna autenticacion, no pasa nada.
        headers: { //Cabeceras que se envían a la solicitud para que nos reconozca. RECORDAR QUE LA SOLICITUD SE HACE POR MEDIO DE LA CONSOLA, lo que significa que hay que decirle qué ipo de valor le estamos enviando
            'Content-Type': 'application/json'  //El valor que se está enviando es de aplication json. Pero si se estuviera enviando un blog de datos, archivos, etc; se tiene que cambiar el valor.
        },
        body: JSON.stringify(data)//En el body va la información que se quiere transmitir a la API. Se transforma la informacion que se está trayendo en stringify porque normalmente se recibe como un objeto y con esto se envía como texto. Y dentro (data) que es el 2do argumento de la function postData.
    });
    return response; //Para finalizar un return de response 
}

/**Siempre se debe verificar que se cumplan con los elementos mínimos que requiere la API para insertar un nuevo elemento. Ver en la documentacion de la API.
 * 
 * ej.
 * {
    "title": "New Product",
    "price": 10,
    "description": "A description",
    "categoryId": 1,
    "images":[
        "https://placeimg.com/640/480/any"
    ]
}
 */

//DATA que se quiere almacenar
const data ={
    "title": "New Product Course",
    "price": 9999,
    "description": "A description",
    "categoryId": 1,
    "images":[
        "https://placeimg.com/640/480/any"
    ]
}

/*Uso de la funcion: 
* primero el nombre de la funcion, 
* se llama a la API, pero se transforma la url porque se quiere solo products, 
* y luego se pasa lo que es data, que es el objeto que se quiere transmitir a la API. 
* Con esto ya podria funcionar.
*
*Usar postData como una promesa para poder utilizar el .then para transformar la respuesta en un objeto json y después mostrarlo en la consola.
*/
postData(`${API}/products`,data)
.then(response => response.json()) //Para ver qué es lo que va a responder el servidor cuando sucede correctamente almacenar esta info. El console.log de que el response se transforme en json
.then(data => console.log(data)); //la data que ya ha sido transformada se muestre con un console.log


//Con la primer ejecucion hubo un error de BAD REQUEST: podría ser que data no está siendo reconocido y es porque le faltaba una s a headers en la parte de response, dentro de la primer function.
