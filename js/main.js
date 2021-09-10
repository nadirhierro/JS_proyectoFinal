// selecciono container para luego crearle div con cada producto
const container = document.querySelector(".productos");
// función para crear row productos que contendrá las cards de cada producto
const tarjetasProductos = document.createElement("div");
tarjetasProductos.classList = ["row", "rowProductos"].join(" ");
// inicializo variable productoHtml para ir agregándole la estructura html de cada producto
let productosHtml = ``;
// dejo en "blanco" el innerHTML de tarjetasProductos para pisarla luego con todos los productos
tarjetasProductos.innerHTML = ``;
// para cada producto renderizo su tarjeta
productos.forEach((producto) => {
  productosHtml += `
    <div class="card col-md-3">
      <img src="https://picsum.photos/id/1082/200/200" class="card-img-top" alt="${producto.marca} ${producto.modelo}">
      <div id="${producto.id}" class="card-body d-flex flex-column align-items-center">
          <h5 class="card-title tipo">${producto.tipo}</h5>
          <h6 class="card-title">${producto.marca} ${producto.modelo}</h6>
          <p id="precio" class="card-text text-center">$${producto.precio}</p>
          <button class="btn btn-primary botonAgregar">Agregar a carrito</button>
      </div>
    </div>`;
});
// ya teniendo todas las tarjetas diagramadas en productosHtml, las inserto en tarjetasProductos.innerHTML
// luego agrego la row con todas las tarjetas en el container
tarjetasProductos.innerHTML = productosHtml;
container.appendChild(tarjetasProductos);
// variable para precioTotal
let precioTotal = 0;
// selecciono todos mis botones de agregar para poder escucharlos
let botonesAgregar = document.querySelectorAll(".botonAgregar");
// recupero carrito del localStorage
let carritoStorage = localStorage.getItem("carrito");

let carrito = [];

if (carritoStorage != null) {
  carrito = JSON.parse(carritoStorage);
  console.log(carrito);
  carrito.forEach((producto) => {
    if (producto.cantidad != 0) {
      let productoStock = producto.stock;
      let productoCantidad = producto.cantidad;
      let productoID = producto.id;
      productos.forEach((producto) => {
        if (producto.id == productoID && productoCantidad != 0) {
          producto["stock"] = parseInt(productoStock);
          producto["cantidad"] = parseInt(productoCantidad);
          renderizar(producto);
          precioTotal += producto.precio * producto.cantidad;
          actualizarTotal(precioTotal);
        }
      });
    }
  });
  //Escucho el click en el botón de agregar

  let botonesEliminar = document.querySelectorAll(".botonEliminar");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", borrarCarrito);
  });
  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarCarrito);
  });
}
botonesAgregar.forEach((boton) => {
  boton.addEventListener("click", agregarCarrito);
});
