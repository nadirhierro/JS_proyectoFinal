let filtros = document.getElementsByName("filtro");
let subFiltros = document.getElementsByName("subfiltro"); // escucho todos los subfiltros
let productosFiltrados = [];

const escucharFiltros = function () {
  filtros.forEach((filtro) => {
    filtro.addEventListener("click", filtrar);
  });
};
const escucharSubFiltros = function () {
  subFiltros.forEach((subfiltro) => {
    subfiltro.addEventListener("click", subFiltrar);
  });
};
const normalizarSubfiltros = function () {
  subFiltros.forEach((subfiltro) => {
    subfiltro.style.fontWeight = "normal";
  });
};
const normalizarFiltros = function () {
  filtros.forEach((filtro) => {
    filtro.style.fontWeight = "normal";
    filtro.nextElementSibling.style.display = "none";
  }); // Le saco negrita a todos los filtros y saco del flujo sus respectivos subfiltros
};
//función filtrar
const subFiltrar = function (event) {
  normalizarSubfiltros();
  this.style.fontWeight = "bold";
  limpiarProductos();
  let productosSubFiltrados = [];
  let tipoFiltro = this.parentNode.className;
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
  renderizarProductos(productosSubFiltrados);
};

const filtrar = function (event) {
  normalizarFiltros();
  normalizarSubfiltros();
  this.style.fontWeight = "bold"; // le aplico negrita al filtro seleccionado
  let listaSubfiltros = this.nextElementSibling; // selecciono subfiltros del filtro seleccionado
  listaSubfiltros.style.display = "block"; // los meto en el flujo del DOM
  limpiarProductos();
  let tipoFiltro = this.parentNode.parentNode.className;
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
  renderizarProductos(productosFiltrados);
};

escucharFiltros();
escucharSubFiltros();
