//función para renderizar
const renderizar = function (producto) {
  let filaCarrito = document.createElement("div"); // variable para insertar el producto al carrito
  filaCarrito.id = `${producto.id}`;
  filaCarrito.classList = [`${producto.id}`, "productoCarrito"].join(" ");
  filaCarrito.innerHTML = `
      <img src="https://picsum.photos/id/1082/200/200" class="card-img-top img-fluid w-25" alt="${
        producto.marca
      } ${producto.modelo}">
      <div class="${producto.id}-cantidad">${producto.cantidad}</div>
      <div class="texto">${producto.tipo} ${producto.marca} ${
    producto.modelo
  }</div>
      <div class="${producto.id}-precio">$${
    producto.precio * producto.cantidad
  } </div>
      <div class="botonEliminar">-</div>`; // defino estructura html de la fila
  let productosCarrito = document.querySelector(".carrito"); // selecciono el div carrito
  productosCarrito.prepend(filaCarrito); // inserto la fila para que salga primera
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
  nuevoprecioDIV.innerHTML = `$${nuevoPrecio}`;
};

// función para refresh de carrito
const refreshCarritoArray = function (producto, productoAborrar) {
  let indexEnCarrito = carrito.indexOf(productoAborrar); // tomo el index del producto en el carrito
  carrito.splice(indexEnCarrito, 1); // lo saco del carrito
  carrito.push(producto); // vuelvo a ponerlo, pero ahora con la cantidad actualizada
};
const refreshLocalStorage = function (carrito) {
  localStorage.removeItem("carrito");
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
  let celdaAcambiar = document.querySelector(".totalPrecio");
  celdaAcambiar.innerHTML = `$${precioTotal}`;
};

// función para agregar producto al carrito
const agregarCarrito = function (event) {
  // busco el ID del producto seleccionado dentro del id del nodo
  let productoID = this.parentNode.id;

  //busco el producto, y lo agrego al array carrito, lo guardo en sessionstorage y lo renderizo
  for (const producto of productos) {
    if (producto.id == productoID && producto.stock != 0) {
      let productoAagregar = carrito.find(
        (producto) => producto.id == productoID
      ); // me fijo si ya está en el carrito
      if (productoAagregar == undefined) {
        producto.agregar();
        carrito.push(producto); // guardo el producto en el carrito
        refreshLocalStorage(carrito);
        renderizar(producto); // renderizo producto
        calcularTotal("agregarCarrito", producto.precio); // lo sumo al total
        actualizarTotal(precioTotal); // actualizo el total en el carrito
      } else if (productoAagregar.cantidad == 0) {
        // si el producto ya está en el carrito pero con cantidad cero
        producto.agregar();
        refreshCarritoArray(producto, productoAagregar);
        refreshLocalStorage(carrito);
        renderizar(producto); // renderizo producto
        calcularTotal("agregarCarrito", producto.precio); // lo sumo al total
        actualizarTotal(precioTotal); // actualizo el total en el carrito
      } else {
        // si el producto ya está en el carrito
        producto.agregar();
        refreshCarritoArray(producto, productoAagregar);
        refreshLocalStorage(carrito);
        refreshPrecioCantidad(producto); // cambio cantidad y precio del producto en el carrito
        calcularTotal("agregarCarrito", producto.precio); // lo sumo al total
        actualizarTotal(precioTotal); // actualizo el total en el carrito
      }
    } else if (producto.id == productoID && producto.stock === 0) {
      alert("No hay Stock");
      break;
    }
  }
  // habiendo agregado el primer elemento al carrito, empiezo a escuchar los botones eliminar, porque antes no existían en el DOM.
  let botonesEliminar = document.querySelectorAll(".botonEliminar");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", borrarCarrito);
  });
};

// función para borrar producto del carrito
const borrarCarrito = function (event) {
  let productoCarrito = this.parentNode; // selecciono al padre del botón eliminar, que tiene un id igual al id del producto
  let productoCarritoID = productoCarrito.id; // rescato el id de producto
  let productoAborrar = carrito.find(
    (producto) => producto.id == productoCarritoID
  ); // lo busco en el carrito

  for (const producto of productos) {
    if (producto.id == productoCarritoID) {
      producto.borrar();
      if (producto.cantidad >= 1) {
        refreshCarritoArray(producto, productoAborrar);
        refreshLocalStorage(carrito);
        refreshPrecioCantidad(producto); // lo vuelvo a renderizar
        calcularTotal("borrarCarrito", producto.precio); // calculo el nuevo total
        actualizarTotal(precioTotal); // actualizo el total en el carrito
      } else {
        refreshCarritoArray(producto, productoAborrar);
        refreshLocalStorage(carrito);
        let productoCarritoPadre = productoCarrito.parentNode; // voy al padre de la fila para luego eliminar la fila
        productoCarritoPadre.removeChild(productoCarrito); // elimino el producto del carrito
        calcularTotal("borrarCarrito", producto.precio); // calculo el nuevo total
        actualizarTotal(precioTotal); // actualizo el total en el carrito
      }
    }
  }
  let botonesEliminar = document.querySelectorAll(".botonEliminar");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", borrarCarrito);
  });
};
