const express = require('express');
const app = express();

app.use(express.json());

let productos = [

    {
        id: 1,
        nombre: "Coca Cola",
        categoria: "bebidas",
        precioUnitario: 1.25,
        stock: 20,
        unidadMedida: "unidad",
        fechaVencimiento: "2026-12-31",
        proveedor: "Coca Cola Company"
    },

    {
        id: 2,
        nombre: "Arroz",
        categoria: "granos",
        precioUnitario: 0.90,
        stock: 4,
        unidadMedida: "libra",
        fechaVencimiento: "2027-01-10",
        proveedor: "Molinos S.A"
    },

    {
        id: 3,
        nombre: "Pollo",
        categoria: "carnes",
        precioUnitario: 2.50,
        stock: 10,
        unidadMedida: "libra",
        fechaVencimiento: "2027-01-15",
        proveedor: "Pollo Fresco S.A"
    }
];


let ventas = [];

// CRUD

// listar productos
app.get('/productos', (req, res) => {

    const nombre = req.query.nombre;
    const categoria = req.query.categoria;

    let resultado = productos;

    if (nombre) {

        resultado = resultado.filter(p =>
            p.nombre.toLowerCase().includes(
                nombre.toLowerCase()
            )
        );
    }

    if (categoria) {

        resultado = resultado.filter(p =>
            p.categoria.toLowerCase() ===
            categoria.toLowerCase()
        );
    }

    res.json(resultado);
});

// productos con stock bajo

app.get('/productos/stock-bajo', (req, res) => {

    const resultado = productos.filter(
        p => p.stock < 5
    );

    res.json(resultado);
});


// obtener producto por id
app.get('/productos/:id', (req, res) => {

    const producto = productos.find(
        p => p.id == req.params.id
    );

    if (!producto) {

        return res.status(404).json({
            mensaje: 'Producto no encontrado'
        });
    }

    res.json(producto);
});


// crear producto
app.post('/productos', (req, res) => {

    const nuevo = {

        id: Date.now(),

        nombre: req.body.nombre,

        categoria: req.body.categoria,

        precioUnitario: req.body.precioUnitario,

        stock: req.body.stock,

        unidadMedida: req.body.unidadMedida,

        fechaVencimiento: req.body.fechaVencimiento,

        proveedor: req.body.proveedor
    };

    productos.push(nuevo);

    res.status(201).json(nuevo);
});


// actualizar producto
app.put('/productos/:id', (req, res) => {

    const producto = productos.find(
        p => p.id == req.params.id
    );

    if (!producto) {

        return res.status(404).json({
            mensaje: 'Producto no encontrado'
        });
    }

    producto.nombre = req.body.nombre;
    producto.categoria = req.body.categoria;
    producto.precioUnitario = req.body.precioUnitario;
    producto.stock = req.body.stock;
    producto.unidadMedida = req.body.unidadMedida;
    producto.fechaVencimiento = req.body.fechaVencimiento;
    producto.proveedor = req.body.proveedor;

    res.json(producto);
});


// eliminar producto
app.delete('/productos/:id', (req, res) => {

    productos = productos.filter(
        p => p.id != req.params.id
    );

    res.status(204).send();
});

// registrar venta
app.post('/ventas', (req, res) => {

    const productosVenta = req.body.productos;

    let total = 0;

    for (const item of productosVenta) {

        const producto = productos.find(
            p => p.id == item.productoId
        );

        if (!producto) {

            return res.status(404).json({
                mensaje: `Producto ${item.productoId} no encontrado`
            });
        }

        if (producto.stock < item.cantidad) {

            return res.status(422).json({
                mensaje: `Stock insuficiente para ${producto.nombre}`
            });
        }
    }

    const detalleProductos = productosVenta.map(item => {

        const producto = productos.find(
            p => p.id == item.productoId
        );

        producto.stock -= item.cantidad;

        const subtotal =
            producto.precioUnitario * item.cantidad;

        total += subtotal;

        return {

            productoId: producto.id,

            nombre: producto.nombre,

            cantidad: item.cantidad,

            precioUnitario: producto.precioUnitario,

            subtotal
        };
    });

    const nuevaVenta = {

        id: Date.now(),

        fecha: new Date(),

        productos: detalleProductos,

        total,

        metodoPago: req.body.metodoPago
    };

    ventas.push(nuevaVenta);

    res.status(201).json(nuevaVenta);
});


// listar ventas del día

app.get('/ventas/hoy', (req, res) => {

    const hoy = new Date().toDateString();

    const resultado = ventas.filter(v =>
        new Date(v.fecha).toDateString() === hoy
    );

    res.json(resultado);
});


// obtener venta por id

app.get('/ventas/:id', (req, res) => {

    const venta = ventas.find(
        v => v.id == req.params.id
    );

    if (!venta) {

        return res.status(404).json({
            mensaje: 'Venta no encontrada'
        });
    }

    res.json(venta);
});

app.listen(3000, () => {console.log('Servidor corriendo en http://localhost:3000');});