const express = require('express')
const app = express()
app.use(express.json())

let productos = [
    {
        id: 1,
        nombre: "coca-cola",
        categoria: "bebidas",
        precioUnitario: 0.8,
        stock: 39,
        unidadMedida: "ml",
        fechaVencimiento: "20-04-2026",
        proveedor: "La constancia",
    },
        {
        id: 2,
        nombre: "pepsi",
        categoria: "bebidas",
        precioUnitario: 0.7,
        stock: 45,
        unidadMedida: "ml",
        fechaVencimiento: "23-06-2026",
        proveedor: "Pepsi proveedor",
    }
];

let ventas = [

];
//#################################################################
//######################### GET Productos #########################
//#################################################################
app.get('/productos', (req, res) => {
    res.json(productos)
})
app.get('/productos/:id', (req, res) => {
    const productosFiltrados = productos.filter( p => {})
})
