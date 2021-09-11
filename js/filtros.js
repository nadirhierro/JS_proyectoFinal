let filtros = document.getElementsByName("filtro"); // selcciono todos los filtros
let subFiltros = document.getElementsByName("subfiltro"); // selecciono todos los subfiltros
let productosFiltrados = []; // inicializo array de filtro
let productosSubFiltrados = [];

// funcion para escuchar filtros
const escucharFiltros = function () {
  filtros.forEach((filtro) => {
    filtro.addEventListener("click", filtrar);
  });
};
//funcion para escuchar subfiltros
const escucharSubFiltros = function () {
  subFiltros.forEach((subfiltro) => {
    subfiltro.addEventListener("click", subFiltrar);
  });
};
//función para sacar negrita a subfiltros
const normalizarSubfiltros = function () {
  subFiltros.forEach((subfiltro) => {
    subfiltro.style.fontWeight = "normal";
  });
};
// función para sacar negrita a filtros y sacar del flujo subfiltros
const normalizarFiltros = function () {
  filtros.forEach((filtro) => {
    filtro.style.fontWeight = "normal";
    filtro.nextElementSibling.style.display = "none";
  });
};

//función para filtrar
const filtrar = function (event) {
  normalizarFiltros(); // primero normalizo los filtros
  normalizarSubfiltros(); // después los subfiltros
  this.style.fontWeight = "bold"; // le aplico negrita al filtro seleccionado
  let listaSubfiltros = this.nextElementSibling; // selecciono subfiltros del filtro seleccionado
  listaSubfiltros.style.display = "block"; // los meto en el flujo del DOM
  limpiarProductos(); // borro productos de la grilla
  let tipoFiltro = this.parentNode.parentNode.className; // me fijo qué tipo de filtro voy a aplicar y guardo los productos en array
  switch (tipoFiltro) {
    case "destacados":
      productosFiltrados = productos.filter(
        (producto) => producto.destacado == "si"
      );
      break;
    case "porInstrumento":
      productosFiltrados = productos.filter(
        (producto) => producto.instrumento == this.id
      );
      break;
    case "porMarca":
      productosFiltrados = productos.filter(
        (producto) => producto.marca == this.id
      );
      break;
  }
  renderizarProductos(productosFiltrados); // renderizo los productos filtrados
};

//función subfiltrar
const subFiltrar = function (event) {
  normalizarSubfiltros(); //normalizo los subfiltros
  this.style.fontWeight = "bold"; // marco en negrita el seleccionado
  limpiarProductos(); // limpio productos de la grilla
  let tipoFiltro = this.parentNode.className; // me fijo el tipo de filtro y guardo los productos en array
  switch (tipoFiltro) {
    case "porInstrumento":
      productosSubFiltrados = productosFiltrados.filter(
        (producto) => producto.instrumento == this.id
      );
      break;
    case "porMarca":
      productosSubFiltrados = productosFiltrados.filter(
        (producto) => producto.marca == this.id
      );
      break;
    case "porTipo":
      productosSubFiltrados = productosFiltrados.filter(
        (producto) => producto.tipo == this.id
      );
      break;
  }
  renderizarProductos(productosSubFiltrados); // renderizo
};
