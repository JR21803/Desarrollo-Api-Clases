const express = require('express');
const { OpenAI } = require('openai');
require('dotenv').config();
const app = express();

app.use(express.urlencoded({ extended: true }));

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, 
});

app.use(express.json());


// datos

// clientes
let clientes = [

    {
        id: 1,
        nombre: "Carlos Martinez",
        dui: "01234567-8",
        ingresos: 1200,
        telefono: "7000-1111",
        documentos: [
            "constancia_salarios.pdf",
            "estado_cuenta.pdf"
        ]
    },

    {
        id: 2,
        nombre: "Ana Lopez",
        dui: "11234567-8",
        ingresos: 2500,
        telefono: "7000-2222",
        documentos: [
            "declaracion_renta.pdf"
        ]
    },

    {
        id: 3,
        nombre: "Luis Hernandez",
        dui: "21234567-8",
        ingresos: 1800,
        telefono: "7000-3333",
        documentos: [
            "recibo_luz.pdf"
        ]
    },

    {
        id: 4,
        nombre: "Maria Gomez",
        dui: "31234567-8",
        ingresos: 3000,
        telefono: "7000-4444",
        documentos: [
            "estado_cuenta.pdf"
        ]
    },

    {
        id: 5,
        nombre: "Jose Ramirez",
        dui: "41234567-8",
        ingresos: 1500,
        telefono: "7000-5555",
        documentos: [
            "pasaporte.pdf"
        ]
    },

    {
        id: 6,
        nombre: "Fernanda Cruz",
        dui: "51234567-8",
        ingresos: 2200,
        telefono: "7000-6666",
        documentos: [
            "isss.pdf"
        ]
    },

    {
        id: 7,
        nombre: "Miguel Torres",
        dui: "61234567-8",
        ingresos: 1750,
        telefono: "7000-7777",
        documentos: [
            "constancia_trabajo.pdf"
        ]
    },

    {
        id: 8,
        nombre: "Daniela Flores",
        dui: "71234567-8",
        ingresos: 2800,
        telefono: "7000-8888",
        documentos: [
            "nitscan.pdf"
        ]
    },

    {
        id: 9,
        nombre: "Ricardo Perez",
        dui: "81234567-8",
        ingresos: 1350,
        telefono: "7000-9999",
        documentos: [
            "comprobante_pago.pdf"
        ]
    },

    {
        id: 10,
        nombre: "Sofia Aguilar",
        dui: "91234567-8",
        ingresos: 3200,
        telefono: "7000-0000",
        documentos: [
            "afp.pdf"
        ]
    }
];


// solicitudes de credito

let solicitudes = [

    {
        id: 1,
        clienteId: 1,
        monto: 5000,
        plazo: 24,
        proposito: "Compra de moto",
        estado: "borrador",
        analisis: null,
        revisionHumana: null,
        historial: []
    },

    {
        id: 2,
        clienteId: 2,
        monto: 12000,
        plazo: 36,
        proposito: "Remodelacion",
        estado: "enviada",
        analisis: null,
        revisionHumana: null,
        historial: []
    },

    {
        id: 3,
        clienteId: 3,
        monto: 3000,
        plazo: 12,
        proposito: "Viaje",
        estado: "en analisis",
        analisis: null,
        revisionHumana: null,
        historial: []
    },

    {
        id: 4,
        clienteId: 4,
        monto: 25000,
        plazo: 60,
        proposito: "Vehiculo",
        estado: "en revision",
        analisis: null,
        revisionHumana: null,
        historial: []
    },

    {
        id: 5,
        clienteId: 5,
        monto: 7000,
        plazo: 18,
        proposito: "Negocio",
        estado: "aprobada",
        analisis: null,
        revisionHumana: null,
        historial: []
    },

    {
        id: 6,
        clienteId: 6,
        monto: 9000,
        plazo: 24,
        proposito: "Laptop",
        estado: "rechazada",
        analisis: null,
        revisionHumana: null,
        historial: []
    },

    {
        id: 7,
        clienteId: 7,
        monto: 15000,
        plazo: 48,
        proposito: "Casa",
        estado: "borrador",
        analisis: null,
        revisionHumana: null,
        historial: []
    },

    {
        id: 8,
        clienteId: 8,
        monto: 4000,
        plazo: 10,
        proposito: "Celular",
        estado: "enviada",
        analisis: null,
        revisionHumana: null,
        historial: []
    },

    {
        id: 9,
        clienteId: 9,
        monto: 2000,
        plazo: 6,
        proposito: "Emergencia",
        estado: "en analisis",
        analisis: null,
        revisionHumana: null,
        historial: []
    },

    {
        id: 10,
        clienteId: 10,
        monto: 18000,
        plazo: 72,
        proposito: "Expansion negocio",
        estado: "en revision",
        analisis: null,
        revisionHumana: null,
        historial: []
    }
];


// creditos activos

let creditos = [

    {
        id: 1,
        solicitudId: 5,
        saldoPendiente: 4500,
        estado: "activo",
        pagos: []
    },

    {
        id: 2,
        solicitudId: 10,
        saldoPendiente: 17000,
        estado: "activo",
        pagos: []
    },

    {
        id: 3,
        solicitudId: 4,
        saldoPendiente: 22000,
        estado: "mora",
        pagos: []
    },

    {
        id: 4,
        solicitudId: 2,
        saldoPendiente: 10000,
        estado: "activo",
        pagos: []
    },

    {
        id: 5,
        solicitudId: 8,
        saldoPendiente: 3500,
        estado: "activo",
        pagos: []
    },

    {
        id: 6,
        solicitudId: 1,
        saldoPendiente: 4200,
        estado: "cancelado",
        pagos: []
    },

    {
        id: 7,
        solicitudId: 7,
        saldoPendiente: 14000,
        estado: "activo",
        pagos: []
    },

    {
        id: 8,
        solicitudId: 3,
        saldoPendiente: 2500,
        estado: "mora",
        pagos: []
    },

    {
        id: 9,
        solicitudId: 6,
        saldoPendiente: 8000,
        estado: "activo",
        pagos: []
    },

    {
        id: 10,
        solicitudId: 9,
        saldoPendiente: 1500,
        estado: "activo",
        pagos: []
    }
];

// ENDPOINTS

// CRUD de clientes con documentos

//listar todos los clientes

app.get('/clientes', (req, res) => {
    res.json(clientes);
});

//obtener cliente por id
app.get('/clientes/:id', (req, res) => {
    const cliente = clientes.find(c => c.id == req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(cliente);
});

//Crear cliente

app.post('/clientes', (req, res)=>{
    
    const duiExistente = clientes.find(c => c.dui == req.body.dui);
    if (duiExistente) return res.status(400).json({ error: 'DUI ya existe' });
    
    const nuevo = {
        id: Date.now(),
        nombre: req.body.nombre,
        dui: req.body.dui,
        ingresos: req.body.ingresos,
        telefono: req.body.telefono,
        documentos: []
    }
    clientes.push(nuevo);
    res.status(201).json(nuevo);
});


//actualizar cliente
app.put('/clientes/:id', (req, res) => {
    const cliente = clientes.find(c => c.id == req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    cliente.nombre = req.body.nombre;
    cliente.ingresos = req.body.ingresos;
    cliente.telefono = req.body.telefono;
    res.json(cliente);
});

//eliminar cliente
app.delete('/clientes/:id', (req, res) => {
    clientes = clientes.filter(c => c.id != req.params.id);
    res.status(204).send();
});


//Obtener documentos de un cliente
app.get('/clientes/:id/documentos', (req, res) => {
    const cliente = clientes.find(c=> c.id == req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(cliente.documentos);
});

//Agregar documento a un cliente
app.post('/clientes/:id/documentos', (req, res) => {
    const cliente = clientes.find(c => c.id == req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    cliente.documentos.push(req.body.documento);
    res.status(201).json(cliente);
});

//Eliminar documento de un cliente
app.delete('/clientes/:id/documentos/:documento', (req, res) => {
    const cliente = clientes.find(c => c.id == req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    cliente.documentos = cliente.documentos.filter(d => d != req.params.documento);
    res.status(204).send();
});


// Crear y enviar solicitud de crédito

// Crear solicitud de crédito

app.post('/solicitudes', (req, res) => {

    const cliente = clientes.find(c => c.id == req.body.clienteId);
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });

    const solicitud = {
        id: Date.now(),
        clienteId: req.body.clienteId,
        monto: req.body.monto,
        plazo: req.body.plazo,
        proposito: req.body.proposito,
        estado: "borrador",
        analisis: null,
        revision: null,
        historial: []
    }
    solicitudes.push(solicitud);
    res.status(201).json(solicitud);
});

// Enviar solicitud de crédito - Analisis del agente

async function consultarAgenteIA(cliente, solicitud) {
    const prompt = `
    Eres un Agente Virtual de Riesgo Crediticio. 
    Analiza la siguiente solicitud:
    - Cliente: ${cliente.nombre}
    - Ingresos mensuales: $${cliente.ingresos}
    - Documentos entregados: ${cliente.documentos.join(', ')}
    - Monto solicitado: $${solicitud.monto} a ${solicitud.plazo} meses.
    - Propósito: ${solicitud.proposito}

    Responde ÚNICAMENTE en formato JSON con esta estructura:
    {
        "score": (0 a 100),
        "variablesUtilizadas": ["ingresos", "capacidad_pago", "documentacion"],
        "recomendacion": "aprobar" o "rechazar" o "revisar",
        "confianza": "alta/media/baja",
        "justificacion": "breve explicación de tu decisión",
        "versionModelo": "gpt-4o-agent-v1"
    }`;

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
}

app.post('/solicitudes/:id/enviar', async (req, res) => {
    const solicitud = solicitudes.find(s => s.id == req.params.id);
    if (!solicitud) return res.status(404).json({ error: 'Solicitud no encontrada' });

    const cliente = clientes.find(c => c.id == solicitud.clienteId);

    try {
        // 1. Cambiar estado a enviada
        solicitud.estado = 'enviada';

        // 2. Llamar al Agente Real
        solicitud.estado = 'en analisis';
        const resultadoIA = await consultarAgenteIA(cliente, solicitud);
        
        // 3. Guardar el análisis retornado por la IA
        solicitud.analisis = resultadoIA;
        
        // 4. Pasar a revisión humana si la IA terminó
        solicitud.estado = 'en revision';
        
        solicitud.historial.push({
            fecha: new Date(),
            estado: 'en revision',
            nota: `Agente IA recomienda: ${resultadoIA.recomendacion}. Motivo: ${resultadoIA.justificacion}`
        });

        res.json({
            mensaje: "Análisis del agente completado con IA",
            solicitud: solicitud
        });
    } catch (error) {
        res.status(500).json({ error: "Error conectando con el Agente de IA" });
    }
});


// Consultar análisis del agente

// Ver analisis del agente

// 5. Registrar revisión del analista (Decisión Final)
app.post('/solicitudes/:id/revision', (req, res) => {
    const solicitud = solicitudes.find(s => s.id == req.params.id);
    
    if (!solicitud) return res.status(404).json({ error: 'Solicitud no encontrada' });

    // El analista toma la decisión basada en lo que dijo el agente (IA)
    const { decision, justificacion, analista } = req.body;

    // Validar que la decisión sea válida según la imagen (aprobada o rechazada)
    if (!['aprobada', 'rechazada'].includes(decision)) {
        return res.status(400).json({ error: 'La decisión debe ser: aprobada o rechazada' });
    }

    // 5. Guardar los datos de la revisión humana
    solicitud.revision = {
        analista: analista || "Analista de Turno",
        decisionFinal: decision,
        justificacion: justificacion,
        docsAdicionales: req.body.docsAdicionales || [] // Según tu imagen pide docs adicionales
    };

    // Actualizar estado final
    solicitud.estado = decision;

    // 7. Auditoría Completa: Guardamos quién hizo el cambio y cuándo
    solicitud.historial.push({
        fecha: new Date(),
        estado: decision,
        responsable: 'analista',
        nota: justificacion
    });

    res.json({
        mensaje: `La solicitud ha sido ${decision} por el analista`,
        solicitud: solicitud
    });
});


// 6. El analista solicita más información al cliente
app.post('/solicitudes/:id/solicitar-info', (req, res) => {
    const solicitud = solicitudes.find(s => s.id == req.params.id);
    if (!solicitud) return res.status(404).json({ error: 'Solicitud no encontrada' });

    const { mensajeParaCliente } = req.body;

    // Cambiamos el estado para que el cliente sepa que debe actuar
    solicitud.estado = 'borrador'; // Vuelve a borrador para que pueda editar
    
    solicitud.historial.push({
        fecha: new Date(),
        estado: 'informacion_pendiente',
        quien: 'analista',
        nota: `El analista solicita: ${mensajeParaCliente}`
    });

    res.json({
        mensaje: "Se ha solicitado información adicional al cliente",
        estadoActual: solicitud.estado,
        historial: solicitud.historial
    });
});

// 6. Endpoint de re-análisis con el Agente de IA
app.post('/solicitudes/:id/reanalizar', async (req, res) => {
    const solicitud = solicitudes.find(s => s.id == req.params.id);
    if (!solicitud) return res.status(404).json({ error: 'Solicitud no encontrada' });

    const cliente = clientes.find(c => c.id == solicitud.clienteId);

    try {
        // 1. Cambiamos estado para indicar que el bot está trabajando de nuevo
        solicitud.estado = 'en analisis';

        // 2. Llamada al Agente (IA) - Ahora el prompt incluye los documentos actualizados
        const prompt = `RE-ANÁLISIS DE CRÉDITO. 
        El analista pidió más información y el cliente actualizó su expediente.
        Cliente: ${cliente.nombre}. 
        Nuevos Documentos: ${cliente.documentos.join(', ')}.
        Monto: $${solicitud.monto}.
        Por favor, evalúa si con estos nuevos documentos el riesgo ha cambiado.
        Responde en JSON con: score, recomendacion, variablesUtilizadas y justificacion.`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Eres un Agente Analista de Riesgos. Estás realizando un RE-ANÁLISIS basado en información nueva." },
                { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" }
        });

        // 3. Guardar el nuevo análisis (sobrescribimos el anterior o lo actualizamos)
        const nuevoAnalisis = JSON.parse(completion.choices[0].message.content);
        solicitud.analisis = {
            ...nuevoAnalisis,
            fechaReanalisis: new Date(),
            esReanalisis: true
        };

        // 4. Volver a enviar a revisión humana
        solicitud.estado = 'en revision';

        // 7. Auditoría (Historial)
        solicitud.historial.push({
            fecha: new Date(),
            estado: 'en revision',
            quien: 'agente_ia',
            nota: 'Re-análisis completado con éxito tras actualización de documentos.'
        });

        res.json({
            mensaje: "El agente de IA ha re-evaluado la solicitud con éxito",
            solicitud: solicitud
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "El Agente IA falló durante el re-análisis." });
    }
});


app.listen(3000, () => {

    console.log(
        'Servidor corriendo en http://localhost:3000'
    );
});