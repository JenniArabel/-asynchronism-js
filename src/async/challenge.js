import fetch from "node-fetch"; //Lo primero que se hace es el llamado al fetch importandolo
const API = 'https://api.escuelajs.co/api/v1'; //Luego el llamado a la API

/**Se creará la funcion de fetchData, la cual va a utilizar la API y con esto retornaremos la informacion transformada en un objeto json*/
async function fetchData(urlApi){
    const response = await fetch (urlApi); //Generar una constante llamada response, en la cual se hará uso de fetch y se le pasa como argumento a la urlApi.
    const data = await response.json(); //Turno de transformar los datos en un objeto json => response.json y automáticamente se transforma en (await response).json(). Pero así no es como se quiere usar el await, por lo tanto, se coloca en la línea anterior y antes de response.
    return data; //retornar la informacion traída desde la API
}

/**Funcion que usa async y await
 * Response va por los datos a la API
 * Data convierte los datos en un objeto json
 * Fetch por debajo tiene una lógica de promesa
 * 
 * 
 * Lo siguiente es hacer una funcion que se encargue de solicitar un producto en particular y a la categoría en particular para luego mostrarlos en consola.
 * 
 * También aprenderemos 2 palabrasreservadas en JS para manejar errores en funciones asíncronas: try y catch
 * 
 * La siguiente funcion será na arrow function y así se podrá observar cómo es la lógica de cada una y dónde se posiciona el asyn y el await.
 */

const anotherFuncion = async (urlApi) => {
    try{ //Dentro del bloque de try se ubicará toda la lógica de la aplicación. Aquí dentro se crearan una serie de variables que tendrán la asignación de la funcion fetch data, la cual va a hacer las llamadas sg sea el caso.
        const products = await fetchData(`${urlApi}/products`); //1° Llamado: todos los productos que tiene la API.
        const product = await fetchData(`${urlApi}/products/${products[0].id}`); //2° llamada: hacia un producto en particular. Se requiere transformar nuevamente la url de los productos previamente obtenidos, seleccionando el primer elemento [0] y luego acceder al id, para que luego entregue el 1° elemento que se encuentra en el array.  
        const category = await fetchData (`${urlApi}/categories/${product.category.id}`);//3° llamado: categoria del elemento. Se llama a la url, pero ya no a los productos, sino a las categorias. Y dentro lo que queremos es el llamado al 2° segundo llamado, que es product. Al utilizar product.category.id signf que se accede al id de la categoría.
        
        //Ahora es el turno de presentarlos por consola
        console.log(products);
        console.log(product.title);
        console.log(category.name);
    } catch (error) { //En cambio, si alguna de las promesas llegua en un reject/ a un error, pasará a catch.
        console.error(error); //mostrar el error.
        //Posibles errores con la peticion, el llamado, la API no funcione, etc.
    }
}

//Lo último es llamar a la función
anotherFuncion(API); //Se le pasa la API, la cual v aa prepararse segun sea la necesidad en cada uno de los llamados.