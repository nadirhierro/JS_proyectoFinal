// función para quitar acentos, recuperada de https://desarrolloweb.com/faq/la-mejor-manera-de-eliminar-tildes-o-acentos-en-javascript
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Funciones para escuchar botones agregar y borrar
const escucharBotonesAgregar = function () {
  $(`.botonAgregar`).unbind().click(agregarCarrito);
};
const escucharBotonesEliminar = function () {
  $(".botonEliminar").unbind().click(borrarCarrito);
};

// Función para emparejar carrito con Storage
const emparejarCarritoStorage = function () {
  // recupero carrito del localStorage
  let carritoStorageString = localStorage.getItem("carrito");
  let carritoStorage = JSON.parse(carritoStorageString);

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
          renderizarEnCarrito(producto); // renderizo
          precioTotal += producto.precio * producto.cantidad; // calculo precio total
          actualizarTotal(precioTotal); // actualizo en carrito
        }
      });
    });
    escucharBotonesEliminar(); //escucho los nuevos botones
  }
};

// función para renderizar productos en el DOM
const renderizarProductos = function (arrayProductos) {
  arrayProductos.forEach((producto) => {
    $(".grillaProductos").append(`
    <div id="${producto.id}" class="tarjeta botonAgregar">
    <div class="tarjetaCuerpo">
      <div class="cajaImagen">
        <img class="img-fluid imagen" src="./img/${producto.id}.jpg" alt="${
      producto.descripcion
    }" />
      </div>
      <div class="nombre">${producto.nombre}</div>
      <div class="precio">$ ${producto.precio.toFixed(2)}</div>
      <div class="agregar">Agregar al carrito</div>
    </div>
  </div>`);
  });
  escucharBotonesAgregar();
};

// función para limpiar productos del DOM
const limpiarProductos = function () {
  $(".tarjeta").remove();
};
