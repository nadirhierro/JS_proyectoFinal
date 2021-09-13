// variables globales
let carrito = [];
let precioTotal = 0;
// estructuras html estáticas
let grillaTienda = $(`
  <div class="container-fluid tienda"></div>
  `);

let barraBusqueda = $(`
  <div class="barraBusqueda">
    <h3>Buscá los productos de tu interés</h3>
    <h4>Podés buscar por palabras clave</h4>
    <form onsubmit="return false" class="buscador">
      <input
        type="search"
        id="input"
        class="form-control"
        placeholder="Buscar..."
        aria-label="Search"
      />
      <button type="submit" id="botonBuscar" class="btn">Buscar</button>
    </form>
    </div>`);

let filtros = $(`
  <div class="filtros">
    <h3>Filtros</h3>
    <div class="categorias">
    <ul class="categoriaContenedor">
      <li class="categoria">Guitarras</li>
      <ul class="subcategorias">
        <li class="subcategoria">Guitarras Criollas</li>
        <li class="subcategoria">Guitarras Acústicas</li>
        <li class="subcategoria">Guitarras Eléctricas</li>
        <li class="subcategoria">Amplificadores para Guitarra</li>
        <li class="subcategoria">Encordados para Guitarra</li>
        <li class="subcategoria">Accesorios para Guitarra</li>
        <h5>Marcas</h5>
        <li class="subcategoria marca">Fender</li>
        <li class="subcategoria marca">Gibson</li>
        <li class="subcategoria marca">Ibanez</li>  
      </ul>
    </ul>
    <ul class="categoriaContenedor">
      <li class="categoria">Bajos</li>
      <ul class="subcategorias">
        <li class="subcategoria">Bajos Acústicos</li>
        <li class="subcategoria">Bajos Eléctricos</li>
        <li class="subcategoria">Amplificadores para Bajo</li>
        <li class="subcategoria">Encordados para Bajo</li>
        <li class="subcategoria">Accesorios para Bajo</li>
        <h5>Marcas</h5>
        <li class="subcategoria marca">Fender</li>
        <li class="subcategoria marca">Ibanez</li>  
      </ul>
    </ul>
    <ul class="categoriaContenedor">
      <li class="categoria">Teclados</li>
      <ul class="subcategorias">
        <li class="subcategoria">Digitales</li>
        <li class="subcategoria">Pianos</li>
        <li class="subcategoria">Sintetizadores</li>
        <li class="subcategoria">Amplificadores para Teclados</li>
        <li class="subcategoria">Accesorios para Teclados</li>
      </ul>
    </ul>
    <ul class="categoriaContenedor">
      <li class="categoria">Baterias</li>
      <ul class="subcategorias">
        <li class="subcategoria">Baterías Acústicas</li>
        <li class="subcategoria">Baterías Electrónicas</li>
        <li class="subcategoria">Percusión</li>
        <li class="subcategoria">Platillos</li>
        <li class="subcategoria">Accesorios</li>
      </ul>
    </ul>
    <ul class="categoriaContenedor">
      <li class="categoria">Estudio</li>
      <ul class="subcategorias">
        <li class="subcategoria">Auriculares</li>
        <li class="subcategoria">Consolas</li>
        <li class="subcategoria">Micrófonos</li>
        <li class="subcategoria">Monitores</li>
        <li class="subcategoria">Accesorios</li>
      </ul>
    </ul>
  </div>`);

let grillaProductos = $(`
  <div class="grillaProductos"></div>
  `);

let carritoOffcanvas = $(`
  <div
    class="offcanvas offcanvas-start"
    data-bs-scroll="true"
    data-bs-backdrop="false"
    tabindex="-1"
    id="offcanvasScrolling"
    aria-labelledby="offcanvasScrollingLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasScrollingLabel">
        Carrito
      </h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body carritoContainer">
      <div class="carrito"></div>
      <div class="total">
        <p>TOTAL</p>
        <p class="totalPrecio"></p>
      </div>
    </div>
  </div>`);
// función document ready
$(document).ready(function () {
  $(".main").append(grillaTienda); // cargo grilla tienda
  $(".tienda").append(barraBusqueda); // cargo la barra de busqueda
  $(".tienda").append(filtros); // cargo filtros
  $(".tienda").append(grillaProductos); // cargo grilla productos
  $(".tienda").append(carritoOffcanvas); // cargo off canvas
  $(".categoria").on("click", filtrar); // escucho las categorias
  $(".subcategoria").on("click", subFiltrar); // escucho los filtros
  $(".buscador").submit(buscar); // escucho el buscador
  // filtro productos destacados para renderizarlos al inicio
  let productosDestacados = productos.filter(
    (producto) => producto.destacado == "si"
  );
  renderizarProductos(productosDestacados);
  escucharBotonesAgregar(); // escucho los botones agregar
  emparejarCarritoStorage(); // emparejo carrito y Storage
});
