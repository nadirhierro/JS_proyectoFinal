let filtros = document.getElementsByName("filtro"); //escucho todos los filtros

//función filtrar
const filtrar = function (event) {
  let productosAsacar = document.querySelectorAll(".card"); // selecciono los productos que se encuentran actualmente renderizados
  for (const producto of productosAsacar) {
    // elimino cada producto renderizado
    let padre = producto.parentNode;
    padre.removeChild(producto);
  }
  let productosFiltrados = [];
  if (this.id.toString() == "destacados") {
    productosFiltrados = productos.filter(
      (producto) => producto.destacado == "si"
    );
  } else {
    productosFiltrados = productos.filter(
      (producto) => producto.instrumento == this.id
    );
  } // filtro los productos elegidos para renderizarlos
  let divProductos = document.querySelector(".rowProductos"); // selecciono el row de productos
  // para cada producto renderizo su tarjeta
  for (const producto of productosFiltrados) {
    // para cada producto filtrado inserto su tarjeta
    divProductos.innerHTML += `
    <div class="card col-md-3">
    <img src="https://picsum.photos/id/1082/200/200" class="card-img-top" alt="${producto.marca} ${producto.modelo}">
    <div id="${producto.id}" class="card-body d-flex flex-column align-items-center">
        <h5 class="card-title tipo">${producto.tipo}</h5>
        <h6 class="card-title">${producto.marca} ${producto.modelo}</h6>
        <p id="precio" class="card-text text-center">$${producto.precio}</p>
        <button class="btn btn-primary botonAgregar">Agregar a carrito</button>
    </div>
    </div>`;
  }
  //Escucho el click en el botón de agregar ya que son "nuevos"
  let botonesAgregar = document.querySelectorAll(".botonAgregar");
  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", agregarCarrito);
  });
};

filtros.forEach((filtro) => {
  filtro.addEventListener("click", filtrar);
});
