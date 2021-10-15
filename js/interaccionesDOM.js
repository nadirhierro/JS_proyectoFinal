// función para quitar acentos, recuperada de https://desarrolloweb.com/faq/la-mejor-manera-de-eliminar-tildes-o-acentos-en-javascript
function removeAccents(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function numberWithCommas(x) {
  return x
    .toString()
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// función para renderizar productos en el DOM
function renderizarEnGrilla(arrayProductos) {
  arrayProductos.forEach((producto) => {
    let precioFixed = numberWithCommas(producto.precio.toFixed(2));
    let precioCuotas = numberWithCommas((producto.precio / 18).toFixed(2));
    let productoHtml = $(`
    <div name="${producto.id}" id="${producto.id}" class="tarjeta botonAgregar">
      <div class="tarjetaCuerpo">
        <div class="cajaImagen">
          <img class="img-fluid imagen" src="./img/productos/${producto.id}.jpg" alt="${producto.nombre}" />
        </div>
        <div class="nombre">
          <p>${producto.nombre}</p>
        </div>
        <div class="cuotas">
          <p class="texto">18 cuotas s/interés de</p>
          <p class="texto precioCuotas"> $ ${precioCuotas}
          </p>
        </div>
        <div class="precio"><p class="texto">Final: $${precioFixed}</p></div>
        <div class="agregar">Agregar al carrito</div>
      </div>
    </div>`);
    $(".grillaProductos").append(productoHtml);
  });
  escucharBotones();
}

// función que devuelve estructura de tabla para producto
function tablaHtml(producto, subtotal) {
  return $(`
      <tr id="carrito-${producto.id}" class="fila">
        <th class="cajaImagenTabla" scope="row">
          <img src="./img/productos/${producto.id}.jpg" alt="" />
        </th>
        <td>Encordado guitarra eléctrica D'addario Exp110 Nickle W</td>
        <td>
          <div id="botones-${producto.id}" class="botones">
            <i class="fas fa-minus-circle botonRestar" name="${producto.id}"></i>
            <p class="${producto.id}-cantidad texto">${producto.cantidad}</p>
            <i class="fas fa-plus-circle botonSumar" name="${producto.id}"></i>
          </div>
        </td>
        <td class="${producto.id}-precio">$ ${subtotal}</td>
        <td class="botonEliminar"><i class="fas fa-times-circle"></i></td>
      </tr>
    `);
}

// función que devuelve estructura de offcanvas para producto
function offCanvasHtml(producto, subtotal) {
  return $(`
      <div
                id="carrito-${producto.id}"
                class="productoCarrito"
              >
                <div class="cajaImagen">
                  <img
                    src="./img/productos/${producto.id}.jpg"
                    class="img-carrito"
                    alt="${producto.descripcion}"
                  />
                </div>
                <div class="infoProducto">
                  <p class="texto">${producto.nombre}</p>
                  <div class="precioYbotones">
                    <div id="botones-${producto.id}" class="botones">
                        <i class="fas fa-minus-circle botonRestar" name="${producto.id}"></i>
                        <p class="${producto.id}-cantidad texto">${producto.cantidad}</p>
                        <i class="fas fa-plus-circle botonSumar" name="${producto.id}"></i>
                    </div>
                    <p class="${producto.id}-precio texto">$ ${subtotal}</p>
                  </div>
                </div>
                <i class="fas fa-times-circle botonEliminar"></i>
              </div>
      `);
}

// función para renderizar en el carrito
// sirve tanto para cuando se está sumando, restando o eliminando (boton = 0 es restar, boton = 1 es sumar)
// primero se fija si el producto ya estaba en el carrito
// después, si la cantidad es mayor a uno o es uno y el boton de restar, entonces actualiza precio y cantidad
// si la cantidad es uno y el botón es agregar, entonces renderiza el producto desde 0
// si el producto ya no está en el carrito, lo desrenderiza
function renderizarCarrito(productoID, boton) {
  let productoEnCarrito = buscarEnCarrito(productoID);
  console.log(productoEnCarrito);
  if (productoEnCarrito) {
    let subtotal = numberWithCommas(
      (productoEnCarrito.precio * productoEnCarrito.cantidad).toFixed(2)
    );
    if (
      productoEnCarrito.cantidad > 1 ||
      (productoEnCarrito.cantidad == 1 && boton == 0)
    ) {
      $(`.${productoID}-cantidad`).html(productoEnCarrito.cantidad);
      $(`.${productoID}-precio`).html(`$ ${subtotal}`);
    } else if (productoEnCarrito.cantidad == 1 && boton == 1) {
      $(`.carrito`).append(offCanvasHtml(productoEnCarrito, subtotal));
      escucharBotones();
    }
  } else {
    $(`#carrito-${productoID}`).remove();
  }
  if (carrito.total > 0) {
    let precioTotalFixed = numberWithCommas(carrito.total.toFixed(2));
    $(".totalPrecio").html(`$ ${precioTotalFixed}`);
    $(".carritoContador").html(`${carrito.contador}`);
  } else {
    limpiarDOMcarrito();
  }
}

// función para renderizar destacados
function renderizarDestacados() {
  // filtro productos destacados para renderizarlos al inicio
  let productosDestacados = productos.filter(
    (producto) => producto.destacado == "si"
  );
  renderizarEnGrilla(productosDestacados);
  escucharBotones();
  $(".destacados").css("font-weight", "bold");
}

// funciones para renderizar la tabla
function renderizarTabla() {
  carrito.productos.forEach((producto) => {
    let subtotal = numberWithCommas(
      (producto.precio * producto.cantidad).toFixed(2)
    );
    $(".tbody").append(tablaHtml(producto, subtotal));
  });
}
function renderizarTotalTabla() {
  let total = numberWithCommas(carrito.total.toFixed(2));
  let filaTotal = $(`
    <tr class="total">
      <td></td>
      <td></td>
      <td class="texto">TOTAL</td>
      <td class="totalPrecio">$ ${total}</td>
      <td></td>
    </tr>
  `);
  $(".tbody").append(filaTotal);
}

// función para notificar los cambios, según se sume o reste/elimine
function notificar(nombreFuncion, productoID, productoCantidad) {
  let producto = buscarProducto(productoID);
  let subtotal = numberWithCommas(
    (producto.precio * productoCantidad).toFixed(2)
  );
  let total = numberWithCommas(carrito.total.toFixed(2));
  if (nombreFuncion == "sumar") {
    let notificacion = $(`
    <div class="notificacion animate__animated animate__bounceInLeft">
      <h4>Producto agregado al carrito!</h4>
        <p>Cantidad: ${productoCantidad}</p>
        <p class="nombre">${producto.nombre}</p>
        <p class="subtotal">Sumaste: $ ${subtotal}</p>
        <p class"total">Llevas un total de : $ ${total}</p>
    </div>`);
    $(".notificacionContainer").append(notificacion);
    $(notificacion).addClass("sumar");
    $(notificacion).delay(3000).fadeOut(2000);
  } else if (nombreFuncion == "restar" || nombreFuncion == "eliminar") {
    let notificacion = $(`
    <div class="notificacion animate__animated animate__bounceInLeft">
      <h4>Productos restados del carrito!</h4>
        <p>Cantidad: ${productoCantidad}</p>
        <p class="nombre">${producto.nombre}</p>
        <p class="subtotal">Restaste: $ ${subtotal}</p>
        <p class"total">Llevas un total de : $ ${total}</p>
    </div>`);
    $(".notificacionContainer").append(notificacion);
    $(notificacion).addClass("restar");
    $(notificacion).delay(3000).fadeOut(2000);
  }
}
// función para notificar sin stock
function sinStock(productoID) {
  let nombreProducto = buscarProducto(productoID).nombre;
  let notificacion = $(`
    <div class="notificacion animate__animated animate__bounceInLeft">
      <h4>¡Producto sin stock!</h4>
      <p class="nombre">${nombreProducto}</p>
    </div>`);
  $(".notificacionContainer").append(notificacion);
  $(notificacion).addClass("restar");
  $(notificacion).delay(3000).fadeOut(2000);
}
// función para animar producto en grilla
function animacionGrilla(id) {
  $(`#${id}`).css({
    "animation-name": "pulse",
    "animation-duration": "0.8s",
  });
  setTimeout(function () {
    $(`#${id}`).css({
      "animation-name": "none",
      "animation-duration": "0s",
    });
  }, 801);
}

// función para normalizar categorías
function normalizarCategorias() {
  $(".categoria").css("font-weight", "normal"); // pongo todas las categorías en fuente normal
  $(".subcategoria").css("font-weight", "normal"); // lo mismo para las subcategorias
  $(".subcategorias").css("display", "none"); // guardo todas las subcategorias
}
// función para normalizar subcategorias
function normalizarSubcategorias() {
  $(".subcategoria").css("font-weight", "normal"); // pongo las subcategorías en fuente normal (puede haber una seleccionada)
}
// función para poner en foco la categoría
function focoCategoria(nodo) {
  $(nodo).css("font-weight", "bold"); // le aplico negrita a la categoria seleccionada
  $(nodo).next().css("display", "block"); // traigo sus subcategorías al DOM
}
// función para poner en foco la subcategoria
function focoSubcategoria(nodo) {
  $(nodo).css("font-weight", "bold"); // le aplico negrita a la categoria seleccionada
}

// función para manejar los eventos de sumar, restar, eliminar y limpiar
function onAdd(event) {
  let productoID = $(this).attr("name");
  let vendido = agregarCarrito(productoID, 1);
  if (vendido) {
    iniciarCarrito();
    renderizarCarrito(productoID, 1);
    notificar("sumar", productoID, 1);
    calcularCuotas();
    if ($(this).prop("tagName") == "DIV") {
      animacionGrilla(productoID);
    }
  } else {
    sinStock(productoID);
  }
}
function onSubstract(event) {
  let productoID = $(this).attr("name");
  restar(productoID, 1);
  renderizarCarrito(productoID, 0);
  notificar("restar", productoID, 1);
  calcularCuotas();
}
function onRemove(event) {
  let eventID = $(this).parent().attr("ID");
  let productoID = eventID.replace("carrito-", "");
  let cantidad = $(`.${productoID}-cantidad`).html();
  restar(productoID, cantidad);
  renderizarCarrito(productoID, 0);
  notificar("eliminar", productoID, cantidad);
  calcularCuotas();
}

function onClean(event) {
  limpiarCarrito();
  limpiarDOMcarrito();
}

function onFilter(event) {
  let categoria = $(this).html().toLowerCase(); // me fijo qué tipo de categoria voy a aplicar
  filtrar(categoria);
  normalizarCategorias();
  focoCategoria(this);
  limpiarProductos(); // borro productos de la grilla
  renderizarEnGrilla(productosFiltrados); // renderizo los productos filtrados
}
function onSubFilter(event) {
  let subcategoriaClass = $(this).attr("class"); // tomo el tipo de subcategoria (está escrito en la clase)
  let subcategoria = $(this).html().toLowerCase(); // tomo el nombre de la subcategoría
  subFiltrar(subcategoriaClass, subcategoria);
  normalizarSubcategorias();
  focoSubcategoria(this);
  limpiarProductos(); // limpio productos de la grilla
  renderizarEnGrilla(productosSubFiltrados); // renderizo
}

function onSearch(event) {
  let inputUsuario = event.target.value; // tomo el input del usuario
  console.log(inputUsuario);
  if (inputUsuario.length > 2) {
    buscar(inputUsuario);
    console.log(productosBuscados);
    limpiarProductos(); // limpio la grilla de productos
    if (productosBuscados.length == 0) {
      $(".grillaProductos").append(
        `<h4 class="sinProductos">No hay productos para tu búsqueda</h4>`
      );
    } else {
      renderizarEnGrilla(productosBuscados); // renderizo los buscados
    }
    productosBuscados = []; // reseteo el array de buscados para una próxima búsqueda
    normalizarCategorias();
    // si es el inicio de la página o el usuario borró la búsqueda, pongo los destacados
  } else if (inputUsuario == "") {
    limpiarProductos(); // limpio la grilla de productos
    renderizarDestacados(); // renderizo destacados
  }
}

// función para comprar
function comprar(event) {
  $("html, body").animate({ scrollTop: 0 });
  limpiarTienda();
  renderizarTabla();
  renderizarTotalTabla();
  escucharBotones();
  $(".carritoYdatos").append(finalizarCompraFormulario);
  calcularCuotas();
  $(".finalizarCompraForm").off().on("submit", finalizarCompra);
}

// función para escuchar los botones de los productos, tanto en el carrito como en la grilla
function escucharBotones() {
  $(".botonAgregar").off().on("click", onAdd);
  $(`.botonSumar`).off().on("click", onAdd);
  $(".botonRestar").off().on("click", onSubstract);
  $(".botonEliminar").off().on("click", onRemove);
}

// función para iniciar tienda
function iniciarTienda() {
  $(".main").append(loader); // loader para mientras se carga
  $(".main").append(grillaTienda); // cargo grilla tienda
  $(".tienda").append(barraBusqueda); // cargo la barra de busqueda
  $(".tienda").append(rowFiltrosProductos);
  $(".filtrosProductos").append(filtros); // cargo filtros
  $(".filtrosProductos").append(grillaProductos); // cargo grilla productos
  $(".tienda").append(carritoOffcanvas); // cargo off canvas
  $(".carrito").append(carritoVacio);
  $(".categoria").off().on("click", onFilter); // escucho las categorias
  $(".subcategoria").off().on("click", onSubFilter); // escucho los filtros
  $("#input").off().on("input", onSearch); // escucho la barra de búsqueda
}

//función para animación de inicio
function animacionInicio() {
  $(".loader").fadeOut(1000); // saco el loader con timing
  $(".tienda").delay(1001).fadeIn(1200); // cuando se va el loader, visibilizo la tienda
}

//función para "iniciar" el carrito
function iniciarCarrito() {
  $(".carritoContainer").append(filaTotal); // agrego fila de total
  $(".limpiarCarrito").off().on("click", onClean); // escucho el botón de limpiar
  $(".carritoVacio").remove(); // quito el mensaje de carrito vacío
  $(".carritoIconCaja").append(carritoContador); // agrego el contador
  $(".comprarCarrito").off().on("click", comprar);
}

// función para limpiar productos del DOM
function limpiarProductos() {
  $(".sinProductos").remove();
  $(".tarjeta").remove();
}

function limpiarTienda() {
  $(".nav-itemCarrito").remove();
  $(".hero").remove();
  $(".tienda").remove();
  $(".main").append(finalizarCompraHero);
  $(".main").append(finalizarCompraContainer);
  $(".carritoYdatos").append(finalizarCompraCarrito);
}

// función para limpiar carrito dom
function limpiarDOMcarrito() {
  $(".productoCarrito").remove(); // saco los productos del dom
  $(".carritoContador").remove(); // saco el contador
  $(".total").remove(); // saco la fila total del dom
  $(".botonesCarrito").remove(); // saco los botones
  $(".table").remove(); // saco la tabla en el caso de que se esté en finalizar compra
  $(".cajaFormulario").remove(); // saco el formulario de finalizar compra
  $(".carrito").append(carritoVacio); // dejo mensaje de que está vacío
  $(".finalizarCompra").append(carritoVacioConBtn); // dejo botón para volver a la tienda en finalizar compra
}

// funcion para calcular cuotas
function calcularCuotas() {
  let cuotas = [1, 3, 6, 12, 18];
  for (let i = 0; i < cuotas.length; i++) {
    precioDeCuotaFixeado = (carrito.total / cuotas[i]).toFixed(2);
    let precioDeCuota = numberWithCommas(precioDeCuotaFixeado);
    $(`.form-select option:nth-child(${i + 1})`).val(
      `${cuotas[i]}_${precioDeCuotaFixeado}`
    );
    $(`.form-select option:nth-child(${i + 1})`).html(
      `${cuotas[i]} cuotas sin interés de $${precioDeCuota}`
    );
  }
}

// funcion para enviar mensaje de compra realizada
function compraRealizada(datos) {
  let ultimos4tarjeta = datos.numeroTarjeta.substr(15);
  let total = numberWithCommas(parseInt(datos.total).toFixed(2));
  let notificacion = `
    <div class="container-fluid cajaCompraRealizada">
      <div class="col-md-12 compraRealizada">
          <h2>¡Gracias por elegirnos, ${datos.nombre}!</h2>
          <p>¡El pago fue realizado con éxito!</p>
          <p>Hemos enviado tu factura y las instrucciones para el envío a tu correo <span class="negrita">${datos.email}</span></p>
          <p>Pagaste $ ${total} en ${datos.cuotas}</p>
          <p>Con la tarjeta número: **** - **** - **** - ${ultimos4tarjeta}</p>
      </div>
    </div>
  `;

  $(".main").append(notificacion);
  $(".cajaCompraRealizada").hide();
}
