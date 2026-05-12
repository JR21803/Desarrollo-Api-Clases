//ejercicio 2: Crear una funcion asincrona llamada obtenerPostConAutor que reciba un postId como parametro. 
// La funcion debe consumir dos endpoinst de JSONPlaceholder de forma secuencial: primero obtener los datos
// del post usando ese ID, y luego - usando el userId que viene en la respuesta - obtener los datos del usuario
// que escribio el post. Finalmente, muestra en consola un objeto combinado con el titulo del post, el cuerpo y el
// nombre del autor.

const obtenerPostConAutor = async (postId) => {
    try{
        const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        const post = await postResponse.json();

        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
        const user = await userResponse.json();

        return {...post, autor: user.name};
    } catch(error) {
        console.error("Error al obtener post", error);
    }
}

obtenerPostConAutor(1).then(post => console.log(post));
