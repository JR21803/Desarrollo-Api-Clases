//Funciones de flecha
//Forma tradicional

function suma(a, b) {
    return a + b;
}

// funcion flecha
const suma2 = (a, b) => a + b;

console.log(suma(2, 3));
console.log(suma2(2, 13)); // node Clase6Mayo.js para ejecutar

//Callbacks: mandar funcion a otra
function saludar(nombre, callback) {
    console.log(`Hola ${nombre}`);
    callback();
}

saludar("Jose", () => console.log("Feliz día!"));

//Promesas
const obtenerDatos = () => {
    return new Promise((resolve, reject) => { // Reject se usa para manejar errores
        setTimeout(() => {
            resolve("Datos obtenidos");
            console.log("termino...")
        }, 2000);

        console.log("luego de la promesa...") //Ejecuta esto primero por el timeout de 2000 y luego lo otro
    });
}

obtenerDatos().then(datos => console.log(datos));

//Async/Await
const obtenerUsuarios = async () => {
    try{
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/users"); 
        const usuarios = await respuesta.json();
        console.log(usuarios);
    } catch(error) {
        console.error("Error al obtener usuarios", error);
    }
};

obtenerUsuarios();




