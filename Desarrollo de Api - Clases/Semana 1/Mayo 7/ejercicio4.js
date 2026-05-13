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

        tags: [],

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

        tags: [],

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


let tags = [
    {
        id: 1,
        nombre: "frontend"
    },

    {
        id: 2,
        nombre: "backend"
    }
];


let webhooks = [];


// CRUD tareas
// listar tareas

app.get('/v2/tareas', (req, res) => {
    res.json(tareas);
});


// obtener tarea por id

app.get('/v2/tareas/:id', (req, res) => {

    const tarea = tareas.find(
        t => t.id == req.params.id
    );

    if (!tarea) {
        return res.status(404).json({
            mensaje: 'Tarea no encontrada'
        });
    }

    res.json(tarea);
});


// crear tarea

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

        tags: [],

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

    const tarea = tareas.find(
        t => t.id == req.params.id
    );

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

    tareas = tareas.filter(
        t => t.id != req.params.id
    );

    res.status(204).send();
});


// Estados
// iniciar tarea

app.post('/tareas/:id/iniciar', (req, res) => {

    const tarea = tareas.find(
        t => t.id == req.params.id
    );

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

    notificarWebhooks(
        'tarea.iniciada',
        tarea
    );

    res.json(tarea);
});


// bloquear tarea

app.post('/tareas/:id/bloquear', (req, res) => {

    const tarea = tareas.find(
        t => t.id == req.params.id
    );

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

    notificarWebhooks(
        'tarea.bloqueada',
        tarea
    );

    res.json(tarea);
});


// reanudar tarea

app.post('/tareas/:id/reanudar', (req, res) => {

    const tarea = tareas.find(
        t => t.id == req.params.id
    );

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

    notificarWebhooks(
        'tarea.reanudada',
        tarea
    );

    res.json(tarea);
});


// completar tarea

app.post('/tareas/:id/completar', (req, res) => {

    const tarea = tareas.find(
        t => t.id == req.params.id
    );

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
        cambio: 'Tarea completada'
    });

    notificarWebhooks(
        'tarea.completada',
        tarea
    );

    res.json(tarea);
});

// buscar tareas

app.get('/tareas/buscar', (req, res) => {

    const q = req.query.q?.toLowerCase();

    if (!q) {
        return res.status(400).json({
            mensaje: 'Debe enviar un query param q'
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

// obtener historial

app.get('/tareas/:id/historial', (req, res) => {

    const tarea = tareas.find(
        t => t.id == req.params.id
    );

    if (!tarea) {
        return res.status(404).json({
            mensaje: 'Tarea no encontrada'
        });
    }

    res.json(tarea.historial);
});


// reportes
// obtener reportes

app.get('/reportes/tareas', (req, res) => {

    const tareasPorAsignado = {};

    tareas.forEach(t => {

        const nombre = t.asignado.nombre;

        if (!tareasPorAsignado[nombre]) {
            tareasPorAsignado[nombre] = 0;
        }

        tareasPorAsignado[nombre]++;
    });

    const distribucionPesos = {

        bajo: tareas.filter(
            t => t.peso <= 10
        ).length,

        medio: tareas.filter(
            t => t.peso > 10 && t.peso <= 20
        ).length,

        alto: tareas.filter(
            t => t.peso > 20
        ).length
    };

    const fechaInicio = req.query.inicio;
    const fechaFin = req.query.fin;

    let completadas = tareas.filter(
        t => t.estado === 'completada'
    );

    if (fechaInicio && fechaFin) {

        completadas = completadas.filter(t => {

            const fecha = new Date(
                t.hora_registro
            ).getTime();

            return (
                fecha >= new Date(fechaInicio).getTime()
                &&
                fecha <= new Date(fechaFin).getTime()
            );
        });
    }

    res.json({
        tareasPorAsignado,
        distribucionPesos,
        tareasCompletadas: completadas.length
    });
});


// tags
// obtener tags

app.get('/tags', (req, res) => {
    res.json(tags);
});


// crear tag

app.post('/tags', (req, res) => {

    const nuevo = {

        id: Date.now(),

        nombre: req.body.nombre
    };

    tags.push(nuevo);

    res.status(201).json(nuevo);
});


// asociar tag a tarea

app.post('/tareas/:id/tags/:tagId', (req, res) => {

    const tarea = tareas.find(
        t => t.id == req.params.id
    );

    const tag = tags.find(
        t => t.id == req.params.tagId
    );

    if (!tarea) {
        return res.status(404).json({
            mensaje: 'Tarea no encontrada'
        });
    }

    if (!tag) {
        return res.status(404).json({
            mensaje: 'Tag no encontrado'
        });
    }

    const existe = tarea.tags.find(
        t => t.id == tag.id
    );

    if (existe) {
        return res.status(409).json({
            mensaje: 'La tarea ya tiene ese tag'
        });
    }

    tarea.tags.push(tag);

    res.json(tarea);
});


// desasociar tag

app.delete('/tareas/:id/tags/:tagId', (req, res) => {

    const tarea = tareas.find(
        t => t.id == req.params.id
    );

    if (!tarea) {
        return res.status(404).json({
            mensaje: 'Tarea no encontrada'
        });
    }

    tarea.tags = tarea.tags.filter(
        t => t.id != req.params.tagId
    );

    res.status(204).send();
});


// webhooks
// obtener webhooks

app.get('/webhooks', (req, res) => {
    res.json(webhooks);
});


// registrar webhook

app.post('/webhooks', (req, res) => {

    const webhook = {

        id: Date.now(),

        url: req.body.url,

        evento: req.body.evento
    };

    webhooks.push(webhook);

    res.status(201).json(webhook);
});


// actualizar webhook

app.put('/webhooks/:id', (req, res) => {

    const webhook = webhooks.find(
        w => w.id == req.params.id
    );

    if (!webhook) {
        return res.status(404).json({
            mensaje: 'Webhook no encontrado'
        });
    }

    webhook.url = req.body.url;
    webhook.evento = req.body.evento;

    res.json(webhook);
});


// eliminar webhook

app.delete('/webhooks/:id', (req, res) => {

    webhooks = webhooks.filter(
        w => w.id != req.params.id
    );

    res.status(204).send();
});


//funcion para notificar webhooks

function notificarWebhooks(evento, tarea) {

    const suscripciones = webhooks.filter(
        w => w.evento === evento
    );

    suscripciones.forEach(w => {

        console.log(`
webhook notificado!

URL: ${w.url}
Evento: ${evento}
Tarea: ${tarea.titulo}
        `);
    });
}

app.listen(3000, () => { console.log('Servidor corriendo en http://localhost:3000')});