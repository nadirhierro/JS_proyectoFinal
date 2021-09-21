// función para quitar acentos, recuperada de https://desarrolloweb.com/faq/la-mejor-manera-de-eliminar-tildes-o-acentos-en-javascript
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
function numberWithCommas(x) {
  return x
    .toString()
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
const escucharBotonesAgregar = function () {
  $(".botonAgregar").off().on("click", agregarCarrito);
};
// Funciones para escuchar botones agregar y borrar
const escucharBotonesSumar = function () {
  $(`.botonSumar`).off().on("click", agregarCarrito);
};
const escucharBotonesRestar = function () {
  $(".botonRestar").off().on("click", restarCarrito);
};
const escucharBotonesEliminar = function () {
  $(".botonEliminar").off().on("click", eliminarProducto);
};
// Función para emparejar carrito con Storage
const emparejarCarritoStorage = function () {
  // recupero carrito del localStorage
  let carritoStorageString = localStorage.getItem("carrito");
  let carritoStorage = JSON.parse(carritoStorageString);
  // si el carrito de storage no es null o vacío, entonces lo recupero y renderizo
  if (carritoStorage != null && carritoStorage.length != 0) {
    // inserto primero la fila de precio total
    $(".carritoContainer").append(filaTotal);
    // para cada producto del carrito
    carritoStorage.forEach((productoCarrito) => {
      let productoID = productoCarrito.id; // tomo el id
      let productoStock = productoCarrito.stock; // tomo stock y cantidad para emparejar con el array de productos
      let productoCantidad = productoCarrito.cantidad; // tomo la cantidad
      contar += productoCantidad; // lo agrego a la cuenta
      // me fijo qué producto es en producto y emparejo los datos
      productos.forEach((producto) => {
        if (producto.id == productoID) {
          producto["stock"] = parseInt(productoStock); // emparejo stock
          producto["cantidad"] = parseInt(productoCantidad); // emparejo cantidad
          carrito.push(producto); // ahora meto el producto al carrito
          renderizarEnCarrito(producto); // renderizo
          precioTotal += producto.precio * producto.cantidad; // calculo precio total
          actualizarTotal(precioTotal); // actualizo en carrito
        }
      });
    });
    $(".carritoIconCaja").append(carritoContador);
    $(".carritoContador").html(`${contar}`);
    escucharBotonesSumar();
    escucharBotonesRestar();
    escucharBotonesEliminar(); //escucho los nuevos botones
    // si no había carrito
  } else {
    $(".carrito").append(carritoVacio); // dejo mensaje de que está vacío
  }
};

// función para renderizar productos en el DOM
const renderizarProductos = function (arrayProductos) {
  arrayProductos.forEach((producto) => {
    let precioFixed = numberWithCommas(producto.precio.toFixed(2));
    let precioCuotas = numberWithCommas((producto.precio / 18).toFixed(2));
    $(".grillaProductos").append(`
    <div id="${producto.id}" class="tarjeta botonAgregar">
    <div class="tarjetaCuerpo">
      <div class="cajaImagen">
        <img class="img-fluid imagen" src="./img/productos/${producto.id}.jpg" alt="${producto.descripcion}" />
      </div>
      <div class="nombre">${producto.nombre}</div>
      <div class="cuotas">
        <p class="texto">18 cuotas s/interés de</p>
        <p class="texto precioCuotas"> $ ${precioCuotas}
        </p>
      </div>
      <div class="precio"><p class="texto">Final: $${precioFixed}</p></div>
      <div class="agregar">Agregar al carrito</div>
    </div>
  </div>`);
  });
  escucharBotonesSumar();
  escucharBotonesRestar();
  escucharBotonesEliminar();
};

// función para limpiar productos del DOM
const limpiarProductos = function () {
  $(".tarjeta").remove();
};
