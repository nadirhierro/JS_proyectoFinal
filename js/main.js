class Producto {
  constructor(
    id,
    categoria,
    subcategoria,
    marca,
    nombre,
    precio,
    destacado,
    stock
  ) {
    this.id = id;
    this.categoria = categoria;
    this.subcategoria = subcategoria;
    this.marca = marca;
    this.nombre = nombre;
    this.precio = precio;
    this.destacado = destacado;
    this.stock = stock;
  }
}
// Constructor para los datos del cliente
class Cliente {
  constructor(
    nombreApellido,
    email,
    telefono,
    calle,
    entre,
    localidad,
    provincia,
    codigoPostal,
    carrito,
    total
  ) {
    this.nombreApellido = nombreApellido;
    this.email = email;
    this.telefono = telefono;
    this.calle = calle;
    this.entre = entre;
    this.localidad = localidad;
    this.provincia = provincia;
    this.codigoPostal = codigoPostal;
    this.carrito = carrito;
    this.total = total;
  }
}
// inicializo array productos
const productos = [];
const clientes = [];
const carrito = new Carrito([], 0, 0);
let productosFiltrados = []; // inicializo array de productos filtrados
let productosSubFiltrados = []; // inicializo array de productos subfiltrados
let productosBuscados = []; // inicializo array de productos buscados

// función document ready
$(function () {
  $.when(getProductos()).done(() => {
    iniciarTienda(); // inicio tienda
    for (const producto of productosData) {
      productos.push(
        new Producto(
          producto.id,
          producto.categoria,
          producto.subcategoria,
          producto.marca,
          producto.nombre,
          producto.precio,
          producto.destacado,
          producto.stock
        )
      );
    }
    carrito.recuperarStorage(); // emparejo carrito y Storage
    if (carrito.productos.length > 0) {
      iniciarCarrito();
      carrito.productos.forEach((producto) => {
        let subtotal = numberWithCommas(
          (producto.precio * producto.cantidad).toFixed(2)
        );
        $(".carrito").append(offCanvasHtml(producto, subtotal));
        let precioTotalFixed = numberWithCommas(carrito.total.toFixed(2));
        $(".totalPrecio").html(`$ ${precioTotalFixed}`);
        $(".carritoContador").html(`${carrito.contador}`);
      });
    }
    renderizarDestacados(); // renderizo destacados
    animacionInicio(); // animación
  });
});
