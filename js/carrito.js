import { productoDisponible } from "./main.js"

JSON.parse(sessionStorage.getItem("carrito")) === null && sessionStorage.setItem("carrito", JSON.stringify([]));

document.addEventListener("DOMContentLoaded", () => {
    crearCarrito();
})

let carrito = JSON.parse(sessionStorage.getItem("carrito"));
const cuerpoCarrito = document.getElementById("items");
const pieCarrito = document.getElementById("totales");

const btnEliminar = document.getElementById("btnEliminar");
const btnComprar = document.getElementById("btnComprar");


export const agregarCarrito = (valorId) => {
    const producto = productoDisponible.find((producto) => producto.id === valorId)

    const productoEnCarrito = carrito.find((producto) => producto.id === valorId)

    if(productoEnCarrito === undefined) {
        const newProductoEnCarrito = {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        }
        carrito.push(newProductoEnCarrito);

        sessionStorage.setItem("carrito", JSON.stringify(carrito));
    } else {
        const index = carrito.findIndex((producto) => producto.id === valorId);

        carrito[index].cantidad++;
        carrito[index]. precio = producto.precio * carrito[index].cantidad;

        sessionStorage.setItem("carrito", JSON.stringify(carrito));
    }

    carrito = JSON.parse(sessionStorage.getItem("carrito"));

    Toastify({
        text: "Se añadio al carrito!!",
        duration: 1000,
        offset: {
            x: 60,
            y: 30 
        },
        style: {
        background: "#8ac98c",
        },
    }).showToast();

    crearCarrito();
}

const crearCarrito = () => {

    cuerpoCarrito.innerHTML = ``
    
    carrito.forEach(producto => {
        
        let card = document.createElement("tr");
        card.className = "card_product_carrito";
        card.innerHTML = `
        <td>${producto.nombre}</td>
        <td>${producto.cantidad}</td>
        <td>$${producto.precio / producto.cantidad}</td>
        <td>$${producto.precio}</td>
        <td>
        <button id="+${producto.id}" class="btn btn-success">+</button>
        <button id="-${producto.id}" class="btn btn-danger">-</button>
        </td>
        ` 

        cuerpoCarrito.append(card);

        const botonSumar = document.getElementById(`+${producto.id}`);
        const botonRestar = document.getElementById(`-${producto.id}`);

        botonSumar.addEventListener("click", () => sumarUnidad(producto.id));
        botonRestar.addEventListener("click", () => restarUnidad(producto.id));
    });

    crearPieCarrito();
    eliminarCarrito();
    comprarCarrito();
}

const crearPieCarrito = () => {

    if(carrito.length > 0) {
        pieCarrito.innerHTML = ""

        let pieTotales = document.createElement("tr");

        pieTotales.innerHTML = `
        <th><b>Resumen</b></th>
        <td></td>
        <td>Cantidad Total: ${crearTotales().unidadesTotales}</td>
        <td></td>
        <td>Total: $${crearTotales().precioTotal}</td>
        `

        pieCarrito.append(pieTotales);
    } else {
        pieCarrito.innerHTML = `<h3>No hay productos en el carrito</h3>`
    }
}

const crearTotales = () => {

    const unidadesTotales = carrito.reduce((acum, {cantidad}) => acum + cantidad, 0);
    const precioTotal = carrito.reduce((acum, {precio}) => acum + precio, 0);

    return {
        unidadesTotales: unidadesTotales,
        precioTotal: precioTotal
    }
}

const sumarUnidad = (valorId) => {

    const index = carrito.findIndex((producto) => producto.id === valorId);
    const precio = carrito[index].precio / carrito[index].cantidad;

    carrito[index].cantidad++;
    carrito[index].precio = precio * carrito[index].cantidad;

    sessionStorage.setItem("carrito", JSON.stringify(carrito));

    crearCarrito();
}
const restarUnidad = (valorId) => {

    const index = carrito.findIndex((producto) => producto.id === valorId);
    const precio = carrito[index].precio / carrito[index].cantidad;

    carrito[index].cantidad--;
    carrito[index].precio = precio * carrito[index].cantidad;

    if(carrito[index].cantidad === 0) {
        carrito.splice(index, 1);
    }

    sessionStorage.setItem("carrito", JSON.stringify(carrito));

    crearCarrito();
}


const eliminarCarrito = () => {

    btnEliminar.addEventListener("click", () => {

        sessionStorage.removeItem("carrito");
        carrito = [];
        cuerpoCarrito.innerHTML = "";
        pieCarrito.innerHTML = `<h3>No hay productos en el carrito</h3>`;

        Swal.fire({
            title: "Carrito Eliminado",
            text: "Esperamos vuelva pronto!!",
            icon: "error",
            confirmButtonColor: '#c72626',
            customClass: {
                title: 'sweet-title',
              }
          });
    })
}
const comprarCarrito = () => {

    btnComprar.addEventListener("click", () => {

        sessionStorage.removeItem("carrito");
        carrito = [];
        cuerpoCarrito.innerHTML = "";
        pieCarrito.innerHTML = `<h3>No hay productos en el carrito</h3>`;

        Swal.fire({
            title: "Compra Realizada",
            text: "Esperamos que lo disfrute!!",
            icon: "success",
            confirmButtonColor: '#008c23',
            customClass: {
                title: 'sweet-title',
              }
          });
    })
}