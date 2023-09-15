import fetch from "node-fetch";

//Llamr a la api como constante xq no va a cambiar
const API = 'https://api.escuelajs.co/api/v1';

/**Function que va a recibir como argumento la url de la api q se quiere llamar y va a retornar el llamado consecuente de fetch, que no es más q una promesa,
 x lo que se van a utilizar las palabras reservadas de then, catch y finally, g sea el caso.
 y con ello hacer multiples elementos p el llamado del 1er recurso (productos), 2d (producto en particular) y 3ro (categoria del elemento del 2do)
 */

 function fetchData(urlApi){
    return fetch(urlApi);
 };

 //llamado a fetchData con la api a la q se quiere llamar y transformar la url a la cual queremos llamar (/products)
 fetchData(`${API}/products`)
 //método .then() para saber qué hay en la respuesta, y se transforma la informacion del 1er llamado (products) a un objeto json
 .then(response => response.json())
 //Mostrar el resultado del primer llamado de .then(), es decir que muestre los productos
 .then(products =>{
    console.log(products);
 })
 //COMO RESULTADO SE PUEDE OBSERVAR QUE SE PUEDEN ANIDAR MULTIPLES .THEN() 
 .then(() => {
    console.log('Hola')
 })
 .catch(error => console.log(error));

 //COMO FETCH YA ES UNA PROMESA NO HACE FALTA USAR LA SINTAXIS DE new Promise PARA DECLARARLA. ESTÁ IMPLÍCITO.


 //2do y 3er llamado: PRODUCTO EN PARTICULAR y SU CATEGORIA
 fetchData(`${API}/products`)
 .then(response => response.json()) //retornar el valor en json
 .then(products => { //lógica de una funcion
    console.log(products) //mopstrar todos los productos
    return fetchData (`${API}/products/${products[0].id}`) //Llamar a fetchData para llamar un producto en particular, el primer elemento y su id
 })
 .then(response => response.json()) //Traer la data anterior en un objeto json
 .then(product => { //hacer otro producto para acceder a su categoria
    console.log(product.title) //mostrar todos los titulos
    return fetchData(`${API}/categories/${product.category.id}`)
 })
 .then (response => response.json()) //esa peticion traerle en un json
 .then (category => { //retornar el nombre de la categoria
    console.log(category.name);
 })
 .catch(error => console.log(error)) //OBLIGATORIO .CATCH
 .finally(() => console.log('Finally'));