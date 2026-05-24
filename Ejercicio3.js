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


const MAQUINA_ESTADOS = {
    'borrador': { 'enviada': ['cliente'] },
    'enviada': { 'en analisis': ['agente'] },
    'en analisis': { 'en revision': ['agente'] },
    'en revision': {
        'aprobada': ['analista'],
        'rechazada': ['analista'],
        'borrador': ['analista']
    }
};

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

// Endpoint Único de Transición de Máquina de Estados
app.post('/solicitudes/:id/transicion', async (req, res) => {
    const solicitud = solicitudes.find(s => s.id == req.params.id);
    if (!solicitud) return res.status(404).json({ error: 'Solicitud no encontrada' });

    const cliente = clientes.find(c => c.id == solicitud.clienteId);
    const { estadoDestino, rol, ...datosExtra } = req.body;

    const estadoActual = solicitud.estado;

    // 1. Validar que la transición existe
    const transicionesPermitidas = MAQUINA_ESTADOS[estadoActual];
    if (!transicionesPermitidas || !transicionesPermitidas[estadoDestino]) {
        return res.status(400).json({ error: `Transición no válida de '${estadoActual}' a '${estadoDestino}'` });
    }

    // 2. Validar el rol
    const rolesPermitidos = transicionesPermitidas[estadoDestino];
    if (!rolesPermitidos.includes(rol)) {
        return res.status(403).json({ error: `El rol '${rol}' no está autorizado para realizar esta transición` });
    }

    // 3. Acciones específicas por estadoDestino
    try {
        if (estadoDestino === 'en revision') {
            // IA: Análisis o Re-análisis
            let prompt = "";
            let model = "gpt-4o";
            let systemPrompt = "Eres un Agente Virtual de Riesgo Crediticio.";

            if (solicitud.analisis) {
                // Es un re-análisis
                model = "gpt-4o-mini";
                systemPrompt = "Eres un Agente Analista de Riesgos. Estás realizando un RE-ANÁLISIS basado en información nueva.";
                prompt = `RE-ANÁLISIS DE CRÉDITO. 
                El analista pidió más información y el cliente actualizó su expediente.
                Cliente: ${cliente.nombre}. 
                Nuevos Documentos: ${cliente.documentos.join(', ')}.
                Monto: $${solicitud.monto}.
                Por favor, evalúa si con estos nuevos documentos el riesgo ha cambiado.
                Responde en JSON con: score, recomendacion, variablesUtilizadas y justificacion.`;
            } else {
                // Es el primer análisis
                prompt = `
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
            }

            const response = await openai.chat.completions.create({
                model: model,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: prompt }
                ],
                response_format: { type: "json_object" }
            });

            const resultadoIA = JSON.parse(response.choices[0].message.content);

            solicitud.analisis = solicitud.analisis 
                ? { ...resultadoIA, fechaReanalisis: new Date(), esReanalisis: true }
                : resultadoIA;

            solicitud.historial.push({
                fecha: new Date(),
                estado: estadoDestino,
                responsable: 'agente_ia',
                nota: solicitud.analisis.esReanalisis 
                    ? 'Re-análisis completado con éxito tras actualización de documentos.'
                    : `Agente IA recomienda: ${resultadoIA.recomendacion}. Motivo: ${resultadoIA.justificacion}`
            });

        } else if (estadoDestino === 'aprobada' || estadoDestino === 'rechazada') {
            // Analista aprueba/rechaza
            const { justificacion, docsAdicionales } = datosExtra;
            if (!justificacion) return res.status(400).json({ error: 'Debe proveer una justificación' });

            solicitud.revision = {
                analista: rol || "Analista de Turno",
                decisionFinal: estadoDestino,
                justificacion: justificacion,
                docsAdicionales: docsAdicionales || []
            };

            solicitud.historial.push({
                fecha: new Date(),
                estado: estadoDestino,
                responsable: rol,
                nota: justificacion
            });
            
        } else if (estadoDestino === 'borrador') {
            // Analista pide más info (o cliente edita, aunque no está en la matriz actual como acción del cliente retroceder)
            const { mensajeParaCliente } = datosExtra;

            solicitud.historial.push({
                fecha: new Date(),
                estado: 'informacion_pendiente',
                responsable: rol,
                nota: rol === 'analista' ? `El analista solicita: ${mensajeParaCliente || 'Sin mensaje'}` : 'Vuelto a borrador'
            });
        } else {
             // Caso general (ej: de borrador a enviada, enviada a en analisis)
             solicitud.historial.push({
                fecha: new Date(),
                estado: estadoDestino,
                responsable: rol,
                nota: `Transición de ${estadoActual} a ${estadoDestino}`
            });
        }

        // 4. Actualizar estado
        solicitud.estado = estadoDestino;

        res.json({
            mensaje: `Transición a '${estadoDestino}' exitosa`,
            solicitud: solicitud
        });

    } catch (error) {
        console.error("Error en transición:", error);
        res.status(500).json({ error: "Ocurrió un error al procesar la transición." });
    }
});

// CRUD de creditos activos

app.get('/creditos', (req, res) => {
    res.json(creditos);
});

//obtener credito por id

app.get('/creditos/:id', (req, res) => {
    const credito = creditos.find(c => c.id == req.params.id);
    if (!credito) return res.status(404).json({ error: 'Credito no encontrado' });
    res.json(credito);
});

//Crear credito
app.post('/creditos', (req, res)=>{

    const solicitudId = req.body.solicitudId;   
    
    const solicitud = solicitudes.find(s => s.id == solicitudId);

    if(!solicitud){
        return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    if (solicitud.estado !== 'aprobada') {
        return res.status(400).json({ error: 'Solicitud no aprobada' });
    }

    const nuevoCredito = {
        id: Date.now(),
        solicitudId,
        saldoPendiente: solicitud.monto,
        estado: "activo",
        pagos: []
    }
    creditos.push(nuevoCredito);
    res.status(201).json(nuevoCredito);
});

//actualizar credito

app.put('/creditos/:id', (req, res) => {
    const credito = creditos.find(c => c.id == req.params.id);
    if (!credito) return res.status(404).json({ error: 'Credito no encontrado' });

    credito.estado = req.body.estado || credito.estado;
    credito.saldoPendiente = req.body.saldoPendiente || credito.saldoPendiente;

    res.json(credito);
});

//eliminar credito
app.delete('/creditos/:id', (req, res) => {
    const credito = creditos.find(c => c.id == req.params.id);
    if (!credito) return res.status(404).json({ error: 'Credito no encontrado' });

    creditos = creditos.filter(c => c.id != req.params.id);
    
    res.status(204).send();
});

//registrar automaticamente(?)

app.post('/creditos/:id/pagos', (req, res) => {

    const credito = creditos.find(c => c.id == req.params.id);
    if (!credito) return res.status(404).json({ error: 'Credito no encontrado' });

    const montoPago = req.body.montoPago;

    if(!montoPago || montoPago <= 0){
        return res.status(400).json({ error: 'Monto de pago inválido' });
    }

    const pago = {
        id: Date.now(),
        monto: montoPago,
        estado: "pagado"
    }

    credito.pagos.push(pago);

    credito.saldoPendiente -= montoPago;

    if(credito.saldoPendiente < 0){
        credito.saldoPendiente = 0;
    }

    if (credito.saldoPendiente === 0) {
        credito.estado = "cancelado";
    } else if (credito.saldoPendiente > 15000)  {
        credito.estado = "mora";
    } else{
        credito.estado = "activo";
    }

    res.status(201).json({
        mensaje: "Pago registrado con éxito",
        credito
    });
});


//Filtro

app.get('/solicitudes', (req, res) => {
    
    let resultado = [...solicitudes];

    if(req.query.estado){

        resultado = resultado.filter(s => s.estado == req.query.estado);
    }

    res.json(resultado);

});








app.listen(3000, () => {

    console.log(
        'Servidor corriendo en http://localhost:3000'
    );
});