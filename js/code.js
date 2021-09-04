// creo clase producto
class Producto {
  constructor(id, tipo, marca, modelo, precio) {
    this.id = id;
    this.tipo = tipo;
    this.marca = marca;
    this.modelo = modelo;
    this.precio = precio;
  }
}

// inicializo array productos e inserto los productos disponibles
const productos = [];
productos.push(new Producto(1, "Guitarra", "Fender", "Stratocaster", 150000));
productos.push(new Producto(2, "Guitarra", "Gibson", "Les Paul", 180000));
productos.push(new Producto(3, "Bajo", "Fender", "Jazz Bass", 120000));
productos.push(new Producto(4, "Bajo", "Fender", "Coronado", 190000));
productos.push(
  new Producto(5, "Piano", "Yamaha", "Digital P45 88 teclas", 92000)
);
productos.push(new Producto(6, "Micrófono", "Shure", "Glx", 7428.3));
productos.push(
  new Producto(7, "Encordado guitarra", "D'addario", "Exp110 Nickle W", 2739.45)
);
productos.push(
  new Producto(8, "Encordado bajo", "D'addario", "Nyxl50105 4c. Nickel W", 6640)
);

// selecciono container para luego crearle div con cada producto
const container = document.querySelector(".productos");
// función para crear row productos que contendrá las cards de cada producto
const tarjetasProductos = document.createElement("div");
tarjetasProductos.classList = ["row", "productos"].join(" ");
// inicializo variable productoHtml para ir agregándole la estructura html de cada producto
let productosHtml = ``;
// dejo en "blanco" el innerHTML de tarjetasProductos para pisarla luego con todos los productos
tarjetasProductos.innerHTML = ``;
// para cada producto renderizo su tarjeta
productos.forEach((producto) => {
  productosHtml += `
  <div class="card col-3">
    <img src="https://picsum.photos/id/1082/200/200" class="card-img-top" alt="...">
    <div id="${producto.id}" class="card-body d-flex flex-column align-items-center">
        <h5 id="tipo" class="card-title tipo">${producto.tipo}</h5>
        <h6 id="marcaModelo" class="card-title text-center marca">${producto.marca} ${producto.modelo}</h6>
        <p id="precio" class="card-text text-center precio">$${producto.precio}</p>
        <button class="btn btn-primary botonAgregar">Agregar a carrito</button>
    </div>
  </div>`;
});
// ya teniendo todas las tarjetas diagramadas en productosHtml, las inserto en tarjetasProductos.innerHTML
// luego agrego la row con todas las tarjetas en el container
tarjetasProductos.innerHTML = productosHtml;
container.appendChild(tarjetasProductos);

// selecciono todos mis botones de agregar para poder escucharlos
let botonesAgregar = document.querySelectorAll(".botonAgregar");

// variable contar cuantas veces se hizo click en agregar y además luego poder identificar todos los productos seleccionados
let contar = 0;
// variable para precioTotal
let precioTotal = 0;

// función para agregar producto al carrito
const agregarCarrito = function (event) {
  contar++; // cuento el click
  // busco el ID del producto seleccionado dentro del id del nodo
  let productoID = this.parentNode.id;
  console.log("El ID del producto agregado es " + productoID);

  //busco el producto, lo guardo en sessionstorage y lo posteo en el carrito (DOM)
  for (const producto of productos) {
    if (producto.id == productoID) {
      sessionStorage.setItem(
        "Producto " + contar,
        JSON.stringify({ producto })
      ); // guardo en sessionStorage
      let filaCarrito = document.createElement("tr"); // variable para insertar el producto al carrito
      filaCarrito.id = producto.id; // le asigno id al nodo para identificarlo con el producto
      filaCarrito.className = contar; // le asigno clase contar para identificarlo con el orden de selección
      filaCarrito.innerHTML = `
      <th scope="row">${producto.id}</th>
      <td>${producto.tipo}</td>
      <td>${producto.marca}</td>
      <td>${producto.modelo}</td>
      <td class="precio">$${producto.precio}</td>
      <td class="botonEliminar">X</td>`; // defino estructura html de la fila
      let tbody = document.querySelector(".tbody"); // selecciono en el tbody
      tbody.prepend(filaCarrito); // inserto la fila para que salga primera
      let precioProducto = producto.precio; // tomo el precio del producto
      console.log("El precio del producto agregado es $" + precioProducto);
      calcularTotal("agregarCarrito", precioProducto); // lo sumo al total
      actualizarTotal(precioTotal); // actualizo el total en el carrito
      console.log("Precio total actual es $" + precioTotal);
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
  let productoCarrito = this.parentNode; // selecciono al padre del botón eliminar, que tiene un id igual al id del producto y una class igual a contar
  let productoCarritoID = productoCarrito.id; // rescato el id
  let ProductoCarritoClass = productoCarrito.className; // rescato la clase para sessionStorage
  console.log("El ID del producto borrado es " + productoCarritoID);
  // itero los productos para buscar el producto seleccionado
  // si doy con el id del producto sigo
  for (const producto of productos) {
    if (producto.id == productoCarritoID) {
      sessionStorage.setItem(
        "Producto " + ProductoCarritoClass,
        JSON.stringify(null)
      ); // piso el registro que se había generado en el sessionStorage, con un null
      let productoCarritoPadre = productoCarrito.parentNode; // voy al padre de la fila para luego eliminar la fila
      productoCarritoPadre.removeChild(productoCarrito); // elimino el producto del carrito
      let precioProducto = producto.precio; // capto el precio del producto
      console.log("El precio del producto borrado es $" + precioProducto);
      calcularTotal("borrarCarrito", precioProducto); // calculo el nuevo total
      actualizarTotal(precioTotal); // actualizo el total en el carrito
      console.log("El precio total actual es $" + precioTotal);
    }
  }
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
// selecciono la celda a cambiar y cambio su innerHTML
const actualizarTotal = function (precioTotal) {
  let celdaAcambiar = document.querySelector(".precioTotal");
  celdaAcambiar.innerHTML = `$${precioTotal}`;
};
// Escucho el click en el botón de agregar
botonesAgregar.forEach((boton) => {
  boton.addEventListener("click", agregarCarrito);
});
