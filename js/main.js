// variable para precioTotal
let precioTotal = 0;

// inicializo carrito y emparejo con Storage
let carrito = [];
emparejarCarritoStorage();

let productosDestacados = productos.filter(
  (producto) => producto.destacado == "si"
);
renderizarProductos(productosDestacados);
escucharBotonesAgregar();
