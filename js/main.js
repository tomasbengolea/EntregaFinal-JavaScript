import { agregarCarrito } from "./carrito.js";


const productos = [
    { id: 1, nombre: "QUESO", descripcion: "salsa y queso.",precio: 1500},
    { id: 2, nombre: "CHAMPIÑON", descripcion: "salsa, queso y champiñones.",precio: 1800},
    { id: 3, nombre: "VEGETARIANA", descripcion: "salsa, queso, champiñón, aceitunas, cebolla, piña, albahaca y maíz.",precio: 3000},
    { id: 4, nombre: "CEBOLLA", descripcion: "salsa, queso y cebolla.",precio: 1500},
    { id: 5, nombre: "ALBAHACA", descripcion: "salsa, queso y albahaca.",precio: 1800},
    { id: 6, nombre: "LOBO DE MAR", descripcion: "salsa, queso, aceitunas y lagostinos.",precio: 2500},
    { id: 7, nombre: "SUPREMA", descripcion: "salsa, queso, pepperoni, aceitunas, champiñón, salchichas, cebolla y pimiento.",precio: 2700},
    { id: 8, nombre: "PIÑA", descripcion: "salsa, queso y piña.",precio: 2550},
    { id: 9, nombre: "VEGANA", descripcion: "salsa, champiñón, aceitunas, cebolla, pimientos, piña, albahaca y maíz.",precio: 1950},
    { id: 10, nombre: "BEICON", descripcion: "alsa, queso y beicon.",precio: 2300},
    { id: 11, nombre: "HUEVONA", descripcion: "salsa, queso, jamón, huevo frito",precio: 2100},
    { id: 12, nombre: "PALMITO", descripcion: "salsa, queso, jamón, palmitos.",precio: 2000}
];

JSON.parse(localStorage.getItem("productos")) || localStorage.setItem("productos", JSON.stringify(productos));

const contenedor = document.getElementById("contenedor");

export let productoDisponible = JSON.parse(localStorage.getItem("productos"));

document.addEventListener("DOMContentLoaded", () => {
    crearProductos(productoDisponible);
});

const crearProductos = (productos) => {
    
    productos.forEach((producto) => {
        let div = document.createElement("div");
        
        div.className = "tarjetas";
        div.innerHTML = `
        <h2>Pizza ${producto.nombre}</h2>
        <p>Descripcion: ${producto.descripcion}</p>
        <p>Precio: $${producto.precio}</p>
        <button id="agregar${producto.id}" class="btn_agregar">Agregar</button>
        `
    
        let contenedor = document.getElementById("contenedor");
        contenedor.append(div);
        
        const botonAgregar = document.getElementById(`agregar${producto.id}`);
        botonAgregar.addEventListener("click", () => {
            agregarCarrito(producto.id);
        });
    });
}

