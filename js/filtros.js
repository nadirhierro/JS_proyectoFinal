let productosFiltrados = []; // inicializo array de productos filtrados
let productosSubFiltrados = []; // inicializo array de productos subfiltrados
let productosBuscados = []; // inicializo array de productos buscados

// función para buscar, contempla que las palabras no estén en orden,
// busca que todas las palabras ingresadas estén dentro del nombre del producto
const buscar = function (event) {
  let inputUsuario = event.target[0].value; // tomo el input del usuario
  let inputMinuscula = inputUsuario.toLowerCase(); // lo transformo a minúscula
  let inputLimpio = removeAccents(inputMinuscula); // le saco acentos o carácteres extraños
  let arrayInput = inputLimpio.split(" "); // armo un array con las palabras
  // itero los productos
  productos.forEach((producto) => {
    let productoLower = producto.nombre.toLowerCase(); // tomo el nombre del producto y lo pongo en minúscula
    let productoNormalizado = removeAccents(productoLower); // le saco acentos (no es que yo lo ingrese con acentos, pero supongamos que puede fallar)
    let contar = 0; // variable contar para luego chequear si todas las palabras están en el producto
    //ahora itero las palabras
    arrayInput.forEach((palabra) => {
      // si la palabra se encuentra en el nombre, entonces cuento
      if (productoNormalizado.indexOf(palabra) > -1) {
        contar++;
      }
    });
    // si conté tantas veces como palabras ingresadas, entonces el producto ingresa como buscado
    if (contar == arrayInput.length) {
      productosBuscados.push(producto);
    }
  });
  limpiarProductos(); // limpio la grilla de productos
  renderizarProductos(productosBuscados); // renderizo los buscados
  productosBuscados = []; // reseteo el array de buscados para una próxima búsqueda
  $(".categoria").css("font-weight", "normal"); // pongo todas las categorías en fuente normal
  $(".subcategoria").css("font-weight", "normal"); // lo mismo para las subcategorias
  $(".subcategorias").css("display", "none"); // guardo todas las subcategorias
};

//función para filtrar
const filtrar = function (event) {
  $(".categoria").css("font-weight", "normal"); // pongo todas las categorías en fuente normal
  $(".subcategoria").css("font-weight", "normal"); // lo mismo para las subcategorias
  $(".subcategorias").css("display", "none"); // guardo todas las subcategorias
  $(this).css("font-weight", "bold"); // le aplico negrita a la categoria seleccionada
  $(this).next().css("display", "block"); // traigo sus subcategorías al DOM
  let categoria = $(this).html().toLowerCase(); // me fijo qué tipo de categoria voy a aplicar
  // filtro los productos de la categoría seleccionada
  productosFiltrados = productos.filter(
    (producto) =>
      removeAccents(producto.categoria.toLowerCase()) ==
      removeAccents(categoria)
  );
  limpiarProductos(); // borro productos de la grilla
  renderizarProductos(productosFiltrados); // renderizo los productos filtrados
};

//función subfiltrar
const subFiltrar = function (event) {
  $(".subcategoria").css("font-weight", "normal"); // pongo las subcategorías en fuente normal (puede haber una seleccionada)
  $(this).css("font-weight", "bold"); // le aplico negrita a la categoria seleccionada
  let subcategoriaClass = $(this).attr("class"); // tomo el tipo de subcategoria (está escrito en la clase)
  let subcategoria = $(this).html().toLowerCase(); // tomo el nombre de la subcategoría
  // si es por marca, filtro por marca, sino por subcategoria estandard
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
