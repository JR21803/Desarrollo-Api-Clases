const express = require('express')
const app = express()
app.use(express.json())


let tareas = [ 
    { id: 1, hora_registro: new Date(), asignado: "Juan Perez", 
        peso: 15, descripcion: "Corregir diseño", titulo: "Resolución problemas UI" },
    { id: 2, hora_registro: new Date(), asignado: "Jose Ramirez", 
        peso: 10, descripcion: "Arreglar bug", titulo: "Corrección de errores finales" },
]


// GET -- Obtener todas las tareas
app.get('/tareas', (req, res) => {
    res.json(tareas)
});

// GET -- Obtener tarea por id
app.get('/tareas/:id', (req, res) => {
    const tarea = tareas.find(t => t.id == req.params.id);
    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' })
    res.json(tarea)
});

// POST -- Crear tarea
app.post('/tareas', (req, res) => {
    const nueva = { id: Date.now(), hora_registro: new Date(), asignado: req.body.asignado, 
        peso: req.body.peso, descripcion: req.body.descripcion, titulo: req.body.titulo };
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

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));



