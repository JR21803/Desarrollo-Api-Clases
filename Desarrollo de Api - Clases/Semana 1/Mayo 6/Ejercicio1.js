//ejercicio 1: Crear una funcion con el jsonplaceholder y que entregue 5 e imprima con console.log

const obtenerUsuarios2 = async () => {
    try{
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/users"); 
        const usuarios = await respuesta.json();
        console.log(usuarios.slice(0, 5));
    } catch(error) {
        console.error("Error al obtener usuarios", error);
    }
};

obtenerUsuarios2();