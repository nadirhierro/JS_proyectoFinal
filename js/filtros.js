// función para buscar, contempla que las palabras no estén en orden,
// busca que todas las palabras ingresadas estén dentro del nombre del producto
function buscar(inputUsuario) {
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
}

//función para filtrar
function filtrar(categoria) {
  if (categoria == "destacados") {
    productosFiltrados = productos.filter(
      (producto) => producto.destacado == "si"
    );
  } else {
    productosFiltrados = productos.filter(
      (producto) =>
        removeAccents(producto.categoria.toLowerCase()) ==
        removeAccents(categoria)
    );
  }
}

//función subfiltrar
function subFiltrar(subcategoriaClass, subcategoria) {
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
}
