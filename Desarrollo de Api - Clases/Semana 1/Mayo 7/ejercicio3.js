const express = require('express');
const app = express();

app.use(express.json());

let tareas = [
    {
        id: 1,
        hora_registro: new Date(),
        asignado: {
            id: 101,
            nombre: "Juan Perez",
            email: "juan@gmail.com"
        },
        peso: 15,
        descripcion: "Corregir diseño principal",
        titulo: "Resolución problemas UI",
        estado: "pendiente",
        historial: [
            {
                fecha: new Date(),
                cambio: "Tarea creada"
            }
        ]
    },

    {
        id: 2,
        hora_registro: new Date(),
        asignado: {
            id: 102,
            nombre: "Jose Ramirez",
            email: "jose@gmail.com"
        },
        peso: 10,
        descripcion: "Arreglar bug del login",
        titulo: "Corrección de errores",
        estado: "en progreso",
        historial: [
            {
                fecha: new Date(),
                cambio: "Tarea creada"
            },
            {
                fecha: new Date(),
                cambio: "Tarea iniciada"
            }
        ]
    }
];

// listar tareas
app.get('/v2/tareas', (req, res) => {
    res.json(tareas);
});

// obtener tarea por id
app.get('/v2/tareas/:id', (req, res) => {

    const tarea = tareas.find(t => t.id == req.params.id);

    if (!tarea) {
        return res.status(404).json({
            mensaje: 'Tarea no encontrada'
        });
    }

    res.json(tarea);
});

//crear tareas

app.post('/v2/tareas', (req, res) => {

    const nueva = {
        id: Date.now(),

        hora_registro: new Date(),

        asignado: {
            id: req.body.asignado.id,
            nombre: req.body.asignado.nombre,
            email: req.body.asignado.email
        },

        peso: req.body.peso,

        descripcion: req.body.descripcion,

        titulo: req.body.titulo,

        estado: "pendiente",

        historial: [
            {
                fecha: new Date(),
                cambio: "Tarea creada"
            }
        ]
    };

    tareas.push(nueva);

    res.status(201).json(nueva);
});

// actualizar tarea
app.put('/v2/tareas/:id', (req, res) => {

    const tarea = tareas.find(t => t.id == req.params.id);

    if (!tarea) {
        return res.status(404).json({
            mensaje: 'Tarea no encontrada'
        });
    }

    tarea.asignado = req.body.asignado;
    tarea.peso = req.body.peso;
    tarea.descripcion = req.body.descripcion;
    tarea.titulo = req.body.titulo;

    tarea.historial.push({
        fecha: new Date(),
        cambio: "Tarea actualizada"
    });

    res.json(tarea);
});

// eliminar tarea
app.delete('/v2/tareas/:id', (req, res) => {

    tareas = tareas.filter(t => t.id != req.params.id);

    res.status(204).send();
});


// Cambios en estados

app.post('/tareas/:id/iniciar', (req, res) => {

    const tarea = tareas.find(t => t.id == req.params.id);

    if (!tarea) {
        return res.status(404).json({
            mensaje: 'Tarea no encontrada'
        });
    }

    if (tarea.estado !== 'pendiente') {
        return res.status(422).json({
            mensaje: 'Solo tareas pendientes pueden iniciarse'
        });
    }

    tarea.estado = 'en progreso';

    tarea.historial.push({
        fecha: new Date(),
        cambio: 'Tarea iniciada'
    });

    res.json(tarea);
});

app.post('/tareas/:id/bloquear', (req, res) => {

    const tarea = tareas.find(t => t.id == req.params.id);

    if (!tarea) {
        return res.status(404).json({
            mensaje: 'Tarea no encontrada'
        });
    }

    if (tarea.estado !== 'en progreso') {
        return res.status(422).json({
            mensaje: 'Solo tareas en progreso pueden bloquearse'
        });
    }

    tarea.estado = 'bloqueada';

    tarea.historial.push({
        fecha: new Date(),
        cambio: 'Tarea bloqueada'
    });

    res.json(tarea);
});

app.post('/tareas/:id/reanudar', (req, res) => {

    const tarea = tareas.find(t => t.id == req.params.id);

    if (!tarea) {
        return res.status(404).json({
            mensaje: 'Tarea no encontrada'
        });
    }

    if (tarea.estado !== 'bloqueada') {
        return res.status(422).json({
            mensaje: 'Solo tareas bloqueadas pueden reanudarse'
        });
    }

    tarea.estado = 'en progreso';

    tarea.historial.push({
        fecha: new Date(),
        cambio: 'Tarea reanudada'
    });

    res.json(tarea);
});


app.post('/tareas/:id/completar', (req, res) => {

    const tarea = tareas.find(t => t.id == req.params.id);

    if (!tarea) {
        return res.status(404).json({
            mensaje: 'Tarea no encontrada'
        });
    }

    if (tarea.estado !== 'en progreso') {
        return res.status(422).json({
            mensaje: 'Solo tareas en progreso pueden completarse'
        });
    }

    tarea.estado = 'completada';

    tarea.historial.push({
        fecha: new Date(),
        cambio: 'tarea completada'
    });

    res.json(tarea);
});

app.get('/tareas/buscar', (req, res) => {

    const q = req.query.q?.toLowerCase();

    if (!q) {
        return res.status(400).json({
            mensaje: 'Debe enviar un query param q para buscar'
        });
    }

    const resultado = tareas.filter(t =>

        t.descripcion.toLowerCase().includes(q)

        ||

        t.asignado.nombre.toLowerCase().includes(q)

        ||

        t.titulo.toLowerCase().includes(q)
    );

    res.json(resultado);
});

app.get('/tareas/:id/historial', (req, res) => {

    const tarea = tareas.find(t => t.id == req.params.id);

    if (!tarea) {
        return res.status(404).json({
            mensaje: 'Tarea no encontrada'
        });
    }

    res.json(tarea.historial);
});


app.listen(3000, () => {console.log('Servidor corriendo en http://localhost:3000')});