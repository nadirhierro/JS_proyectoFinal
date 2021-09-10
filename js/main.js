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
let carritoStorageString = localStorage.getItem("carrito");
let carritoStorage = JSON.parse(carritoStorageString);
// inicializo carrito
let carrito = [];

if (carritoStorage != null && carritoStorage.length != 0) {
  // si el carrito de storage no es null o vacío, entonces lo recupero y renderizo
  carrito = carritoStorage;
  carrito.forEach((producto) => {
    let productoID = producto.id; // tomo el id
    let productoStock = producto.stock; // tomo stock y cantidad para emparejar con el array de productos
    let productoCantidad = producto.cantidad;
    productos.forEach((producto) => {
      if (producto.id == productoID) {
        producto["stock"] = parseInt(productoStock); // emparejo
        producto["cantidad"] = parseInt(productoCantidad);
        renderizar(producto); // renderizo
        precioTotal += producto.precio * producto.cantidad; // calculo precio total
        actualizarTotal(precioTotal); // actualizo en carrito
      }
    });
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
