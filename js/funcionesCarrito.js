//función para renderizar en carrito
const renderizarEnCarrito = function (producto) {
  let precio = numberWithCommas(
    (producto.precio * producto.cantidad).toFixed(2)
  );
  $(".carrito").append(`
  <div
            id="carrito-${producto.id}"
            class="productoCarrito"
          >
            <div class="cajaImagen">
              <img
                src="./img/productos/${producto.id}.jpg"
                class="img-carrito"
                alt="${producto.descripcion}"
              />
            </div>
            <div class="infoProducto">
              <div class="texto">
                <p>${producto.nombre}</p>
              </div>
              <div class="precioYbotones">
                <div id="botones-${producto.id}" class="botones">
                  <div class="cajaBoton">
                    <i class="fas fa-minus-circle botonRestar"></i>
                  </div>
                  <div class="${producto.id}-cantidad">${producto.cantidad}</div>
                  <div class="cajaBoton">
                    <i class="fas fa-plus-circle botonSumar"></i>
                  </div>
                </div>
                <div class="${producto.id}-precio precioCarrito">
                  <span>$ ${precio}</span>
                </div>
              </div>
            </div>
            <div class="cajaBoton">
              <i class="fas fa-times-circle botonEliminar"></i>
            </div>
          </div>
  `);
};

//función para cambiar cantidad y precio en carrito
const refreshPrecioCantidad = function (producto) {
  let nuevaCantidad = producto.cantidad; // reviso la nueva cantidad (en la funcion agregarCarrito ya se actualizó)
  let nuevoPrecio = producto.precio * nuevaCantidad; // calculo el nuevo precio
  let nuevoPrecioFixed = numberWithCommas(nuevoPrecio.toFixed(2));
  $(`.${producto.id}-cantidad`).html(`${nuevaCantidad}`); // lo inserto en el DOM
  $(`.${producto.id}-precio`).html(`$${nuevoPrecioFixed}`); // lo inserto en el DOM
};

// función para refresh de carrito
const refreshCarritoArray = function (producto, productoAborrar) {
  let indexEnCarrito = carrito.indexOf(productoAborrar); // tomo el index del producto en el carrito
  carrito.splice(indexEnCarrito, 1); // lo saco del carrito
  // vuelvo a ponerlo, pero ahora con la cantidad actualizada, si la cantidad es 0, no lo vuelvo a poner
  if (producto.cantidad >= 1) {
    carrito.push(producto);
  }
};
const refreshLocalStorage = function (carrito) {
  localStorage.removeItem("carrito"); // lo saco para volver a ponerlo
  localStorage.setItem("carrito", JSON.stringify(carrito)); // guardo el carrito en sessionStorage
};

// función para calcular el total, según se agregue o borre un producto
// fixeo y parseo el precioTotal para evitar que se sumen decimales no deseados
const calcularTotal = function (nombreFuncion, precioProducto) {
  if (nombreFuncion == "borrarCarrito" || nombreFuncion == "restarCarrito") {
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
  let precioTotalFixed = numberWithCommas(precioTotal.toFixed(2));
  $(".totalPrecio").html(`$ ${precioTotalFixed}`);
};

// función para agregar producto al carrito
const agregarCarrito = function (event) {
  // si el carrito estaba vacío
  if (carrito.length == 0) {
    $(".carritoContainer").append(filaTotal); // agrego fila de total
    $(".limpiarCarrito").on("click", limpiarCarrito); // escucho el botón de limpiar
    $(".carritoVacio").remove(); // quito el mensaje de carrito vacío
  }
  let productoID = ""; // inicializo productoID porque necesito saber si se está haciendo click en el carrito o en la grilla productos
  // si el tag es I, entonces busco el id según el DOM
  if ($(this).prop("tagName") == "I") {
    let productoCarritoID = $(this).parent().parent().attr("id"); // rescato el id de producto
    productoID = productoCarritoID.replace("botones-", ""); // lo limpio de la palabra botones
  } else {
    // sino
    productoID = $(this).attr("id"); // busco el ID del producto seleccionado dentro del id del nodo
  }
  //busco el producto
  productos.forEach((producto) => {
    if (producto.id == productoID && producto.stock != 0) {
      // si hay stock
      producto.agregar(); // agrego cantidad y quito stock
      calcularTotal("agregarCarrito", producto.precio); // lo sumo al total
      actualizarTotal(precioTotal); // actualizo el total en el DOM carrito
      // me fijo si el tag es DIV (de la grilla productos) para en tal caso agregarle animación
      if ($(this).prop("tagName") == "DIV") {
        setTimeout(function () {
          $(`#${producto.id}`).css({
            "animation-name": "pulse",
            "animation-duration": "0.8s",
          });
        }, 0);
        setTimeout(function () {
          $(`#${producto.id}`).css({
            "animation-name": "none",
            "animation-duration": "0s",
          }),
            800;
        }, 801);
      }
      let productoAagregar = carrito.find(
        (producto) => producto.id == productoID
      ); // me fijo si ya está en el carrito
      if (productoAagregar == undefined) {
        // si no está
        carrito.push(producto); // guardo el producto en el carrito
        refreshLocalStorage(carrito); // refresh al LocalStorage
        renderizarEnCarrito(producto); // renderizo producto en DOM carrito
        // escucho botones
        escucharBotonesSumar();
        escucharBotonesRestar();
        escucharBotonesEliminar();
      } else {
        // si el producto ya está en el carrito
        refreshCarritoArray(producto, productoAagregar); // refresh al array
        refreshLocalStorage(carrito); // refresh al LocalStorage
        refreshPrecioCantidad(producto); // refresh a la cantidad y precio en DOM carrito
      }
    } else if (producto.id == productoID && producto.stock === 0) {
      alert("No hay Stock");
    }
  });
};

// función para borrar producto del carrito
const restarCarrito = function (event) {
  // selecciono al padre del padre del botón restar, que tiene un id igual al id del producto
  let productoCarritoID = $(this).parent().parent().attr("id"); // rescato el id de producto
  let productoID = productoCarritoID.replace("botones-", ""); // lo limpio de la palabra botones
  let productoArestar = carrito.find((producto) => producto.id == productoID); // lo busco en el carrito
  productos.forEach((producto) => {
    if (producto.id == productoID) {
      producto.borrar(); // actualizo cantidad y stock en array productos
      refreshCarritoArray(producto, productoArestar); // refresh al array carrito
      refreshLocalStorage(carrito); // refresh al LocalStorage
      calcularTotal("restarCarrito", producto.precio); // calculo el nuevo total
      actualizarTotal(precioTotal); // actualizo el total en el DOM carrito
      if (producto.cantidad >= 1) {
        // Si todavía hay cantidad en el carrito
        refreshPrecioCantidad(producto); // refresh a precio y cantidad en DOM
      } else {
        // si no borro el nodo
        $(`#carrito-${producto.id}`).remove();
      }
    }
  });
  // si el carrito quedó vacío
  if (carrito.length == 0) {
    $(".total").remove(); // saco la fila de total
    $(".carrito").append(carritoVacio); // dejo mensaje de que está vacío
  }
};
const eliminarCarrito = function (event) {
  // selecciono al padre del padre del botón eliminar, que tiene un id igual al id del producto
  let productoCarritoID = $(this).parent().parent().attr("id"); // rescato el id de producto
  let productoID = productoCarritoID.replace("carrito-", ""); // lo limpio de la palabra carrito
  let productoAborrar = carrito.find((producto) => producto.id == productoID); // lo busco en el carrito
  console.log(productoAborrar);
  const productoCantidad = productoAborrar.cantidad; // guardo la cantidad para las iteraciones
  // busco el producto en array productos
  productos.forEach((producto) => {
    if (producto.id == productoID) {
      // borro cantidad tantas veces como sea necesario
      for (let i = 0; i < productoCantidad; i++) {
        producto.borrar();
      }
      refreshCarritoArray(producto, productoAborrar); // refresh al array carrito
      refreshLocalStorage(carrito); // refresh al LocalStorage
      calcularTotal("borrarCarrito", producto.precio * productoCantidad); // calculo el nuevo total
      actualizarTotal(precioTotal); // actualizo el total en el DOM carrito
    }
  });
  $(this).parent().parent().remove(); // saco el producto del carrito
  // si el carrito quedó vacío
  if (carrito.length == 0) {
    $(".total").remove(); // saco la fila de total
    $(".carrito").append(carritoVacio); // dejo mensaje de que está vacío
  }
};

// función para limpiar el carrito
const limpiarCarrito = function (event) {
  // para cada producto del array productos aplico el método borrar
  // tantas veces como cantidad se había seleccionado
  productos.forEach((producto) => {
    if (producto.cantidad != 0) {
      const cantidad = producto.cantidad; // guardo la cantidad en una constante, porque voy a modificar producto.cantidad con cada iteración
      for (let i = 0; i < cantidad; i++) {
        producto.borrar(); // descuento 1 con el método
      }
    }
  });
  carrito = []; // Al carrito lo dejo directamente vacío
  localStorage.removeItem("carrito"); // limpio el Storage
  precioTotal = 0; // dejo en 0 el precio total
  $(".productoCarrito").remove(); // saco los productos del dom
  $(".total").remove(); // saco la fila total del dom
  $(".carrito").append(carritoVacio); // dejo mensaje de que está vacío
};
