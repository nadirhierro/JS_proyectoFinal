//función para renderizar en carrito
const renderizarEnCarrito = function (producto) {
  $(".carrito").append(`
  <div id="carrito-${producto.id}" class="${producto.id} productoCarrito">
    <img src="./img/${producto.id}.jpg" class="card-img-top img-fluid" alt="${
    producto.descripcion
  }">
    <div class="${producto.id}-cantidad">${producto.cantidad}</div>
    <div class="texto">${producto.nombre}</div>
    <div class="${producto.id}-precio">$${(
    producto.precio * producto.cantidad
  ).toFixed(2)} 
    </div>
    <div class="botonEliminar">-</div>
  </div>
  `);
};

//función para cambiar cantidad y precio en carrito
const refreshPrecioCantidad = function (producto) {
  let nuevaCantidad = producto.cantidad;
  let nuevoPrecio = producto.precio * nuevaCantidad;
  let nuevaCantidadDiv = document.querySelector(
    "." + CSS.escape(producto.id) + "-cantidad"
  );
  let nuevoprecioDIV = document.querySelector(
    "." + CSS.escape(producto.id) + "-precio"
  );
  nuevaCantidadDiv.innerHTML = `${nuevaCantidad}`;
  nuevoprecioDIV.innerHTML = `$${nuevoPrecio.toFixed(2)}`;
};

// función para refresh de carrito
const refreshCarritoArray = function (producto, productoAborrar) {
  let indexEnCarrito = carrito.indexOf(productoAborrar); // tomo el index del producto en el carrito
  carrito.splice(indexEnCarrito, 1); // lo saco del carrito
  if (producto.cantidad >= 1) {
    carrito.push(producto);
  } // vuelvo a ponerlo, pero ahora con la cantidad actualizada, si la cantidad es 0, no lo vuelvo a poner
};
const refreshLocalStorage = function (carrito) {
  localStorage.removeItem("carrito"); // lo saco para volver a ponerlo
  localStorage.setItem("carrito", JSON.stringify(carrito)); // guardo el carrito en sessionStorage
};

// función para calcular el total, según se agregue o borre un producto
// fixeo y parseo el precioTotal para evitar que se sumen decimales no deseados
const calcularTotal = function (nombreFuncion, precioProducto) {
  if (nombreFuncion == "borrarCarrito") {
    precioTotal = precioTotal - precioProducto;
    precioTotal = parseFloat(precioTotal.toFixed(2));
  } else if (nombreFuncion == "agregarCarrito") {
    precioTotal += precioProducto;
    precioTotal = parseFloat(precioTotal.toFixed(2));
  }
};

// función para actualizar el total en el carrito
// selecciono su nodo y cambio su innerHTML
const actualizarTotal = function (precioTotal) {
  $(".totalPrecio").html(`$${precioTotal}`);
};

// función para agregar producto al carrito
const agregarCarrito = function (event) {
  let productoID = this.id; // busco el ID del producto seleccionado dentro del id del nodo
  //busco el producto
  for (const producto of productos) {
    if (producto.id == productoID && producto.stock != 0) {
      // si hay stock
      producto.agregar(); // agrego cantidad y quito stock
      calcularTotal("agregarCarrito", producto.precio); // lo sumo al total
      actualizarTotal(precioTotal); // actualizo el total en el DOM carrito
      let productoAagregar = carrito.find(
        (producto) => producto.id == productoID
      ); // me fijo si ya está en el carrito
      if (productoAagregar == undefined) {
        // si no está
        carrito.push(producto); // guardo el producto en el carrito
        refreshLocalStorage(carrito); // refresh al LocalStorage
        renderizarEnCarrito(producto); // renderizo producto en DOM carrito
        escucharBotonesEliminar(); // reescucho botones eliminar, hay uno nuevo
      } else {
        // si el producto ya está en el carrito
        refreshCarritoArray(producto, productoAagregar); // refresh al array
        refreshLocalStorage(carrito); // refresh al LocalStorage
        refreshPrecioCantidad(producto); // refresh a la cantidad y precio en DOM carrito
      }
    } else if (producto.id == productoID && producto.stock === 0) {
      alert("No hay Stock");
      break;
    }
  }
};

// función para borrar producto del carrito
const borrarCarrito = function (event) {
  let productoCarrito = this.parentNode; // selecciono al padre del botón eliminar, que tiene un id igual al id del producto
  let productoCarritoID = productoCarrito.id; // rescato el id de producto
  let productoID = productoCarritoID.replace("carrito-", "");
  let productoAborrar = carrito.find(
    (producto) => producto.id == productoCarritoID
  ); // lo busco en el carrito
  for (const producto of productos) {
    if (producto.id == productoID) {
      producto.borrar(); // actualizo cantidad y stock en array productos
      refreshCarritoArray(producto, productoAborrar); // refresh al array carrito
      refreshLocalStorage(carrito); // refresh al LocalStorage
      calcularTotal("borrarCarrito", producto.precio); // calculo el nuevo total
      actualizarTotal(precioTotal); // actualizo el total en el DOM carrito
      if (producto.cantidad >= 1) {
        // Si todavía hay cantidad en el carrito
        refreshPrecioCantidad(producto); // refresh a precio y cantidad en DOM
      } else {
        // si no borro el nodo
        $(`#${productoCarritoID}`).remove();
      }
    }
  }
};
