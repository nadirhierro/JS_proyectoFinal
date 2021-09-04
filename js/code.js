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
productos.push(new Producto(2, "Guitarra", "Gibson", "Stratocaster", 180000));
productos.push(new Producto(3, "Bajo", "Fender", "Jazz Bass", 120000));
productos.push(new Producto(4, "Bajo", "Fender", "Coronado", 190000));
productos.push(
  new Producto(5, "Piano", "Yamaha", "Digital P45 88 teclas", 92000)
);
// selecciono container para luego crearle div con cada producto
const container = document.querySelector(".productos");
// función para crear div para cada producto, con sus clases
const tarjetasProductos = document.createElement("div");
tarjetasProductos.classList = ["row", "productos"].join(" ");
// inicializo variable productoHtml para ir agregándole la estructura html de cada producto
let productosHtml = ``;
// dejo en "blanco" estructura html de tarjetasProductos para pisarla luego con todos los productos
tarjetasProductos.innerHTML = ``;
// para cada producto establezco su tarjeta
productos.forEach((producto) => {
  productosHtml += `
  <div class="card col-3">
    <img src="https://picsum.photos/id/1082/200/200" class="card-img-top" alt="...">
    <div id="${producto.id}" class="card-body d-flex flex-column align-items-center">
        <h5 id="tipo-${producto.id}" class="card-title tipo">${producto.tipo}</h5>
        <h5 id="marca-${producto.id}" class="card-title marca">${producto.marca}</h5>
        <h5 id="modelo-${producto.id}" class="card-title modelo">${producto.modelo}</h5>
        <p id="precio-${producto.id}" class="card-text text-center precio">$${producto.precio}</p>
        <button class="btn btn-primary botonAgregar">Agregar a carrito</button>
    </div>
  </div>`;
});
// teniendo todas las tarjetas creadas, lo inserto en el div de tarjetasProductos
tarjetasProductos.innerHTML = productosHtml;
// lo agrego al container
container.appendChild(tarjetasProductos);

// selecciono todos mis botones de agregar
let botonesAgregar = document.querySelectorAll(".botonAgregar");
console.log(botonesAgregar);

// contar para los clicks en agregar
let contar = 0;
// variable para precioTotal
let precioTotal = 0;
// función agregar en tabla
const calcularTotal = function (funcion, precioProducto) {
  if (funcion === borrarCarrito) {
    precioTotal = precioTotal - precioProducto;
  } else if (funcion === agregarCarrito) {
    precioTotal += precioProducto;
  }
};
const actualizarTotal = function (precioTotal) {
  let celdaAcambiar = document.querySelector(".precioTotal");
  celdaAcambiar.innerHTML = `$${precioTotal}`;
};
const borrarCarrito = function (event) {
  let productoCarrito = this.parentNode;
  let productoCarritoID = productoCarrito.id;
  let productoCarritoPadre = productoCarrito.parentNode;
  let productoAborrarID = parseInt(productoCarrito.firstElementChild.innerHTML);

  //busco el producto, lo borro de sessionstorage y lo saco del carrito
  for (const producto of productos) {
    if (producto.id === productoAborrarID) {
      sessionStorage.removeItem("Producto " + productoCarritoID);
      contar--;
      productoCarritoPadre.removeChild(productoCarrito);
      let precioProducto = producto.precio;
      console.log(precioProducto);
      calcularTotal(borrarCarrito, precioProducto);
      console.log(precioTotal);
      actualizarTotal(precioTotal);
    }
  }
};

const agregarCarrito = function (event) {
  contar++;
  //busco el ID del producto seleccionado
  let productoID = parseInt(this.parentNode.id);
  console.log(productoID);
  let tbody = document.querySelector(".tbody");
  //busco el producto, lo guardo en sessionstorage y lo posteo en el carrito (DOM)
  for (const producto of productos) {
    if (producto.id === productoID) {
      sessionStorage.setItem(
        "Producto " + contar,
        JSON.stringify({ producto })
      );

      let filaCarrito = document.createElement("tr");
      filaCarrito.id = contar;
      filaCarrito.innerHTML = `
      <th scope="row">${producto.id}</th>
      <td>${producto.tipo}</td>
      <td>${producto.marca}</td>
      <td>${producto.modelo}</td>
      <td class="precio">$${producto.precio}</td>
      <td class="botonEliminar">X</td>`;
      tbody.prepend(filaCarrito);
      let precioProducto = producto.precio;
      calcularTotal(agregarCarrito, precioProducto);
      console.log(precioTotal);
      actualizarTotal(precioTotal);
    }
  }

  let botonesEliminar = document.querySelectorAll(".botonEliminar");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", borrarCarrito);
  });
};

// Escucho el click en el botón de agregar
botonesAgregar.forEach((boton) => {
  boton.addEventListener("click", agregarCarrito);
});
