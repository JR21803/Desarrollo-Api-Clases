const express = require('express')
const app = express()
app.use(express.json())


let tareas = [ 
    { id: 1, hora_registro: new Date(), asignado: "Juan Perez", 
        peso: 15, descripcion: "Corregir diseño", titulo: "Resolución problemas UI",
        comentarios: []},
    { id: 2, hora_registro: new Date(), asignado: "Jose Ramirez", 
        peso: 10, descripcion: "Arreglar bug", titulo: "Corrección de errores finales",
        comentarios: []},
]


// GET -- Obtener todas las tareas
app.get('/tareas', (req, res) => {

    const asignado = req.query.asignado;
    const pesoMinimo = req.query.pesominimo;
    const pesoMaximo = req.query.pesomaximo;
    const fechaInicio = new Date(req.query.fechainicio).getTime();
    const fechaFin = new Date(req.query.fechafin).getTime();
    const pagina = req.query.pagina || 1
    const limite = req.query.limite || 3
    const indexInicial = (pagina - 1) * limite;
    const indexFinal = indexInicial + limite;
    const filtrarPor = req.query.filtrarpor

    
    let tareasFiltradas = tareas.filter(t =>
                (pesoMinimo <= t.peso || !pesoMinimo) 
                && (pesoMaximo >= t.peso || !pesoMaximo)
                && (fechaInicio <= new Date(t.hora_registro).getTime() || !fechaInicio)
                && (fechaFin >= new Date(t.hora_registro).getTime() || !fechaFin)
                && (!asignado || asignado === t.asignado.replace(' ','').toLowerCase()));


    tareasFiltradas = ordenarTareas(tareasFiltradas, filtrarPor)

    tareasFiltradas = tareasFiltradas.slice(indexInicial, indexFinal)


    res.json(tareasFiltradas)
});

// GET -- Obtener tarea por id
app.get('/tareas/:id', (req, res) => {
    const tarea = tareas.find(t => t.id == req.params.id);
    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' })
    res.json(tarea)
});

// POST -- Crear tarea
app.post('/tareas', (req, res) => {
    const nueva = { id: Date.now(), hora_registro: new Date().toISOString(), asignado: req.body.asignado, 
        peso: req.body.peso, descripcion: req.body.descripcion, titulo: req.body.titulo, 
        comentarios: []};
    tareas.push(nueva);
    res.status(201).json(nueva);
});

//PUT -- Actualizar tarea
app.put('/tareas/:id', (req, res) => {
    const tarea = tareas.find(t => t.id == req.params.id);
    if (!tarea) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    tarea.asignado = req.body.asignado;
    tarea.peso = req.body.peso;
    tarea.descripcion = req.body.descripcion;
    tarea.titulo = req.body.titulo;
    res.json(tarea);
});

//DELETE -- Eliminar tarea
app.delete('/tareas/:id', (req, res) => {
    tareas = tareas.filter(t => t.id != req.params.id);
    res.status(204).send();
});


// Post - Crear tareas en batch
app.post('/tareas/batch', (req, res) => {
    const nuevas = req.body.map(t => ({ id: Date.now(), hora_registro: new Date(), asignado: t.asignado, 
        peso: t.peso, descripcion: t.descripcion, titulo: t.titulo }));
    tareas.push(...nuevas);
    res.status(201).json(nuevas);
});

// Eliminar tareas en batch
app.delete('/tareas/batch', (req, res) => {
    tareas = tareas.filter(t => !req.body.includes(t.id));
    res.status(204).send();
});

// Ver comentarios de una tarea
app.get('/tareas/:tareaId/comentarios', (req, res) => {

    const tarea = tareas.find(t => t.id == req.params.tareaId)

    if(!tarea){
        res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }

    res.status(200).json(tarea.comentarios)
});

// Crear comentario para una tarea
app.post('/tareas/:tareaId/comentarios', (req, res) => {


    const tarea = tareas.find(t => t.id == req.params.tareaId);

    if(!tarea){
        res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }

    const comentario = {id: Date.now(), autor: req.body.autor, comentario: req.body.comentario};

    tarea.comentarios.push(comentario);

    res.status(201).json(comentario);
});

// Actualizar Comentario de Tarea
app.put('/tareas/:tareaId/comentarios/:comentarioId', (req,res) => {
    const tarea = tareas.find(t => t.id == req.params.tareaId);

    const comentario = tarea.comentarios.find(c => c.id == req.params.comentarioId)

    if(!tarea){
        res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }

    if(!comentario){
        res.status(404).json({ mensaje: 'Comentario no encontrado' });
    }

    const nuevoComentario = {id: comentario.id, autor: req.body.autor, comentario: req.body.comentario};

    const comentariosActualizados = tarea.comentarios.map(c => {
        if (c.id == nuevoComentario.id) {
            return nuevoComentario
        }

        return c
    });

    tarea.comentarios = comentariosActualizados


    res.status(200).json(nuevoComentario)
})

// Borrar Tarea
app.delete('/tareas/:tareaId/comentarios/:comentarioId', (req,res) => {
    const tarea = tareas.find(t => t.id == req.params.tareaId);

    if(!tarea){
        res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }

    tarea.comentarios = tarea.comentarios.filter(t => t.id != req.params.comentarioId);
    res.status(204).send();    


})

// Cambiar Asignado
app.post('/tareas/:id/cambiar', (req,res) => {

    const tarea = tareas.find(t => t.id == req.params.id);

    if(!tarea){
        res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }

    const nuevoAsignado = req.params.asignado

    if (nuevoAsignado === tarea.asignado){
        res.status(422).json({ mensaje: 'No se puede cambiar al mismo asignado' });
    }

    tarea.asignado = nuevoAsignado

    }
)

//Funcioon para ordenar tareas
function ordenarTareas(tareas, ordenarPor) {

    if(ordenarPor !== 'fecha' && ordenarPor !== 'peso'){
        return tareas
    }

    let tareasOrdenadas = tareas
    
    if(ordenarPor === "fecha"){
        tareasOrdenadas.sort((a,b) => {
        return (new Date(b.hora_registro).getTime()) - (new Date(a.hora_registro).getTime())
    })}

    else{
        tareasOrdenadas.sort((a,b) =>{
            return b.peso - a.peso
        })
    }

    return tareasOrdenadas
}

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));

