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

// Funciones para escuchar botones agregar y borrar
const escucharBotonesAgregar = function () {
  let botonesAgregar = document.querySelectorAll(".botonAgregar");
  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarCarrito);
  });
};

const escucharBotonesEliminar = function () {
  let botonesEliminar = document.querySelectorAll(".botonEliminar");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", borrarCarrito);
  });
};

// función para renderizar productos en el DOM
const renderizarProductos = function (arrayProductos) {
  let divProductos = document.querySelector(".grillaProductos");
  for (const producto of arrayProductos) {
    // para cada producto filtrado inserto su tarjeta
    divProductos.innerHTML += `
    <div id="${producto.id}" class="tarjeta botonAgregar">
    <div class="tarjetaCuerpo">
      <div class="cajaImagen">
        <img class="img-fluid imagen" src="./img/${producto.id}.jpg" alt="${producto.descripcion}" />
      </div>
      <div class="nombre">${producto.nombre}</div>
      <div class="precio">$ ${producto.precio}</div>
    </div>
  </div>`;
  }
  escucharBotonesAgregar();
};

// función para limpiar productos del DOM
const limpiarProductos = function () {
  let productosAsacar = document.querySelectorAll(".tarjeta"); // selecciono los productos que se encuentran actualmente renderizados
  for (const producto of productosAsacar) {
    // elimino cada producto renderizado
    let padre = producto.parentNode;
    padre.removeChild(producto);
  }
};

//función para borrar nodo
const borrarNodoCarrito = function (nodo) {
  let nodoPadre = nodo.parentNode; // voy al padre
  nodoPadre.removeChild(nodo); // elimino el nodo
};
