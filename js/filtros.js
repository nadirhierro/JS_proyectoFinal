let productosFiltrados = []; // inicializo array de categoria
let productosSubFiltrados = [];
let productosBuscados = [];

const buscar = function (event) {
  event.preventDefault();
  let inputUsuario = event.target[0].value;
  let inputMinuscula = inputUsuario.toLowerCase();
  let inputLimpio = removeAccents(inputMinuscula);
  limpiarProductos();
  productos.forEach((producto) => {
    let productoLower = producto.nombre.toLowerCase();
    let productoNormalizado = removeAccents(productoLower);
    if (productoNormalizado.indexOf(inputLimpio) > -1) {
      productosBuscados.push(producto);
    }
  });
  renderizarProductos(productosBuscados);
  productosBuscados = [];
};
// funcion para escuchar categorias
const escucharCategorias = function () {
  categorias.forEach((categoria) => {
    categoria.addEventListener("click", filtrar);
  });
};
//funcion para escuchar subCategorias
const escucharSubCategorias = function () {
  subCategorias.forEach((subCategoria) => {
    subCategoria.addEventListener("click", subFiltrar);
  });
};
//función para sacar negrita a subCategorias
const normalizarsubCategorias = function () {
  subCategorias.forEach((subCategoria) => {
    subCategoria.style.fontWeight = "normal";
  });
};
// función para sacar negrita a categorias y sacar del flujo subCategorias
const normalizarcategorias = function () {
  categorias.forEach((categoria) => {
    categoria.style.fontWeight = "normal";
    categoria.nextElementSibling.style.display = "none";
  });
};

//función para filtrar
const filtrar = function (event) {
  normalizarcategorias(); // primero normalizo los categorias
  normalizarsubCategorias(); // después los subCategorias
  this.style.fontWeight = "bold"; // le aplico negrita al categoria seleccionado
  let listasubCategorias = this.nextElementSibling; // selecciono subCategorias de la categoria seleccionada
  listasubCategorias.style.display = "block"; // los meto en el flujo del DOM
  limpiarProductos(); // borro productos de la grilla
  let categoria = this.innerHTML.toLowerCase(); // me fijo qué tipo de categoria voy a aplicar y guardo los productos en array
  productosFiltrados = productos.filter(
    (producto) =>
      removeAccents(producto.categoria.toLowerCase()) ==
      removeAccents(categoria)
  );

  renderizarProductos(productosFiltrados); // renderizo los productos filtrados
};

//función subfiltrar
const subFiltrar = function (event) {
  normalizarsubCategorias(); //normalizo los subCategorias
  this.style.fontWeight = "bold"; // marco en negrita el seleccionado
  let subcategoriaClass = this.className;
  let subcategoria = this.innerHTML.toLowerCase();
  console.log(subcategoria); // me fijo el tipo de categoria y guardo los productos en array
  if (subcategoriaClass == "subcategoria marca") {
    productosSubFiltrados = productosFiltrados.filter(
      (producto) => producto.marca == subcategoria
    );
  } else {
    productosSubFiltrados = productosFiltrados.filter(
      (producto) =>
        removeAccents(producto.subcategoria.toLowerCase()) ==
        removeAccents(subcategoria)
    );
  }
  limpiarProductos(); // limpio productos de la grilla
  renderizarProductos(productosSubFiltrados); // renderizo
};
