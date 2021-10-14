// clase para el carrito, contiene un array de productos, un contador, el total y método para actualizar
class Carrito {
  constructor(productos, contador, total) {
    this.productos = productos;
    this.contador = contador;
    this.total = total;
  }
  actualizarTotal(productoID, cantidad, operacion) {
    this.productos.forEach((producto) => {
      if (producto.id == productoID) {
        if (operacion == "agregarProducto") {
          this.contador += cantidad;
          this.total += producto.precio * cantidad;
        } else if (operacion == "restar") {
          this.contador -= cantidad;
          this.total -= producto.precio * cantidad;
        }
      }
    });
  }
}

// clase para los productos del carrito, con sus métodos para agregar o devolver
class ProductoCarrito {
  constructor(id, nombre, precio, cantidad) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
  }
  agregar(numero) {
    this.cantidad += numero;
  }
  devolver(numero) {
    this.cantidad -= numero;
  }
}

// funciones para buscar en array productos de productos y carrito
function buscarProducto(productoID) {
  return productos.find((producto) => producto.id == productoID);
}
function buscarEnCarrito(productoID) {
  return carrito.productos.find((producto) => producto.id == productoID);
}

// función para emparejar el carrito con el Storage, tiene en cuenta cambios en los precios y stock
function emparejarCarritoStorage() {
  let carritoStorageString = localStorage.getItem("carrito"); // recupero el carrito del storage
  let carritoStorage = JSON.parse(carritoStorageString); // lo parseo
  if (carritoStorage != null) {
    // si hay carrito en storage, emparejo
    carritoStorage.productos.forEach((productoCarrito) => {
      // itero los productos del storage
      productos.forEach((producto) => {
        // ahora itero los productos del catálogo, por si cambió precio o stock
        if (
          // si hay más stock que cantidad, entonces pusheo la cantidad del storage
          producto.id == productoCarrito.id &&
          producto.stock >= productoCarrito.cantidad
        ) {
          carrito.productos.push(
            new ProductoCarrito(
              producto.id,
              producto.nombre,
              producto.precio,
              productoCarrito.cantidad
            )
          );
          carrito.actualizarTotal(
            producto.id,
            productoCarrito.cantidad,
            "agregarProducto"
          );
        } else if (
          producto.id == productoCarrito.id &&
          producto.stock < productoCarrito.cantidad &&
          producto.stock != 0
        ) {
          // si hay menos stock que la cantidad del carrito y el stock es distinto de 0, pusheo el stock
          carrito.productos.push(
            new ProductoCarrito(
              producto.id,
              producto.nombre,
              producto.precio,
              producto.stock
            )
          );
          carrito.actualizarTotal(
            producto.id,
            producto.stock,
            "agregarProducto"
          );
        }
      });
    });
  }
}

// función para actualizar el Storage
function guardarStorage(carrito) {
  localStorage.removeItem("carrito"); // lo saco para volver a ponerlo
  localStorage.setItem("carrito", JSON.stringify(carrito)); // guardo el carrito en sessionStorage
}

// función para agregar al carrito, contempla la cantidad y el stock
function agregarCarrito(productoID, cantidad) {
  let productoSeleccionado = buscarProducto(productoID); // busco el producto en el array productos
  if (
    // si el producto ya estaba en el carrito y la cantidad que va a sumar no hace superar el stock, entonces agrego
    buscarEnCarrito(productoID) &&
    buscarEnCarrito(productoID).cantidad + cantidad <=
      productoSeleccionado.stock
  ) {
    carrito.productos.forEach((producto) => {
      if (producto.id == productoID) {
        producto.agregar(cantidad);
      }
    });
    carrito.actualizarTotal(productoID, cantidad, "agregarProducto");
    guardarStorage(carrito);
    return true;
  } else if (
    // si el producto no estaba y hay stock lo pusheo
    buscarEnCarrito(productoID) == undefined &&
    cantidad <= productoSeleccionado.stock
  ) {
    carrito.productos.push(
      new ProductoCarrito(
        productoSeleccionado.id,
        productoSeleccionado.nombre,
        productoSeleccionado.precio,
        cantidad
      )
    );
    console.log(carrito.productos);
    carrito.actualizarTotal(productoID, cantidad, "agregarProducto");
    guardarStorage(carrito);
    return true;
  } else {
    // si no hay stock, no sumo
    alert("no hay stock");
    return false;
  }
}

// función para restar, contempla cantidad
function restar(productoID, cantidad) {
  carrito.productos.forEach((producto) => {
    if (producto.id == productoID) {
      producto.devolver(cantidad);
    }
  });
  carrito.actualizarTotal(productoID, cantidad, "restar");
  let productoEnCarrito = buscarEnCarrito(productoID);
  let indexEnCarrito = carrito.productos.indexOf(productoEnCarrito);
  if (productoEnCarrito.cantidad == 0) {
    carrito.productos.splice(indexEnCarrito, 1);
  }
  guardarStorage(carrito);
}

// función para limpiar el carrito
function limpiarCarrito() {
  carrito.productos.splice(0, carrito.productos.length);
  carrito.contador = 0;
  carrito.total = 0;
  localStorage.removeItem("carrito");
}
