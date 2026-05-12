//Ejercicio 3: Crear una funcion asincrona llamada obtenerPerfilCompleto que reciba un userId. Usando
//Promise.all, debe lanzar en paralelo tres peticiones al mismo tiempo: los datos del usuario, sus posts
// y sus albumes. Una vez que las tres respuestas lleguen, construye y muestra en consola un objeto
//con la informacion del usuario, la cantidad total de posts que tiene, y los titulos de sus albumes en un arreglo.
//Si cualquiera de las tres falla, muestra un mensaje de error en consola.

const obtenerPerfilCompleto = async (userId) => {
    try {
        const [userResponse, postsResponse, albumsResponse] = await Promise.all([
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
            fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`),
            fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
        ]);
        if (!userResponse.ok) throw new Error('Error al obtener el usuario');
        if (!postsResponse.ok) throw new Error('Error al obtener los posts');
        if (!albumsResponse.ok) throw new Error('Error al obtener los albumes');
        const userData = await userResponse.json();
        const postsData = await postsResponse.json();
        const albumsData = await albumsResponse.json();
        const perfilCompleto = {
            usuario: userData,
            cantidadPosts: postsData.length,
            titulosAlbumes: albumsData.map(album => album.title)
        };
        console.log(perfilCompleto);
    }
    catch (error) {
        console.error('Error al obtener el perfil completo:', error);
    }
};

obtenerPerfilCompleto(5);