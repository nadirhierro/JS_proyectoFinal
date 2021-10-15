// clase para el carrito, contiene un array de productos, un contador, el total y método para actualizar
class Carrito {
  constructor(productos, contador, total) {
    this.productos = productos;
    this.contador = contador;
    this.total = total;
  }
  actualizar(precio, cantidad) {
    this.contador += cantidad;
    let subtotal = parseFloat((precio * cantidad).toFixed(2));
    let nuevoTotal = parseFloat((subtotal + this.total).toFixed(2));
    this.total = nuevoTotal;
  }
  // función para actualizar el Storage
  guardarStorage() {
    localStorage.removeItem("carrito"); // lo saco para volver a ponerlo
    localStorage.setItem("carrito", JSON.stringify(this)); // guardo el carrito en sessionStorage
  }
  buscarProducto(productoID) {
    return this.productos.find((producto) => producto.id == productoID);
  }
  agregarProducto(productoID, cantidad) {
    let productoSeleccionado = buscarProducto(productoID, productos); // busco el producto en el array productos del catálogo
    let productoEnCarrito = this.buscarProducto(productoID);
    if (
      // si el producto ya estaba en el carrito y la cantidad que va a sumar no hace superar el stock, entonces agrego
      productoEnCarrito &&
      productoEnCarrito.cantidad + cantidad <= productoSeleccionado.stock
    ) {
      carrito.productos.forEach((producto) => {
        if (producto.id == productoID) {
          producto.agregar(cantidad);
        }
      });
      this.actualizar(productoEnCarrito.precio, cantidad);
      this.guardarStorage();
      return true;
    } else if (
      // si el producto no estaba y hay stock lo pusheo
      productoEnCarrito == undefined &&
      cantidad <= productoSeleccionado.stock
    ) {
      this.productos.push(
        new ProductoCarrito(
          productoSeleccionado.id,
          productoSeleccionado.nombre,
          productoSeleccionado.precio,
          cantidad
        )
      );
      this.actualizar(productoSeleccionado.precio, cantidad);
      this.guardarStorage();
      return true;
    } else {
      return false;
    }
  }
  restarProducto(productoID, cantidad) {
    let productoEnCarrito = this.productos.find(
      (producto) => producto.id == productoID
    );
    this.productos.forEach((producto) => {
      if (producto.id == productoID) {
        producto.devolver(cantidad);
      }
    });
    this.actualizar(productoEnCarrito.precio, cantidad * -1);
    let indexEnCarrito = this.productos.indexOf(productoEnCarrito);
    if (productoEnCarrito.cantidad == 0) {
      this.productos.splice(indexEnCarrito, 1);
    }
    this.guardarStorage();
  }
  // función para limpiar el carrito
  limpiarCarrito() {
    this.productos.splice(0, carrito.productos.length);
    this.contador = 0;
    this.total = 0;
    localStorage.removeItem("carrito");
  }
  // función para emparejar el carrito con el Storage, tiene en cuenta cambios en los precios y stock
  recuperarStorage() {
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
            this.productos.push(
              new ProductoCarrito(
                producto.id,
                producto.nombre,
                producto.precio,
                productoCarrito.cantidad
              )
            );
            this.actualizar(producto.precio, productoCarrito.cantidad);
          } else if (
            producto.id == productoCarrito.id &&
            producto.stock < productoCarrito.cantidad &&
            producto.stock != 0
          ) {
            // si hay menos stock que la cantidad del carrito y el stock es distinto de 0, pusheo el stock
            this.productos.push(
              new ProductoCarrito(
                producto.id,
                producto.nombre,
                producto.precio,
                producto.stock
              )
            );
            this.actualizar(producto.precio, producto.stock);
          }
        });
      });
    }
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
function buscarProducto(productoID, arrayProductos) {
  return arrayProductos.find((producto) => producto.id == productoID);
}
