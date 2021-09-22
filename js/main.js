// variables globales
let carrito = [];
let precioTotal = 0;
let contar = 0;
let productosFiltrados = []; // inicializo array de productos filtrados
let productosSubFiltrados = []; // inicializo array de productos subfiltrados
let productosBuscados = []; // inicializo array de productos buscados
// estructuras html estáticas

let loader = $(`
<div class="container-fluid">
<div class="row justify-content-center pt-5 loader">
<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
</div>
</div>
`);

let grillaTienda = $(`
  <div class="container-fluid tienda"></div>
  `).hide();

let barraBusqueda = $(`
  <div class="row">
    <div class="col-12 barraBusqueda">
    <h3>Buscá los productos de tu interés</h3>
    <form onsubmit="return false" class="buscador">
      <input
        type="search"
        id="input"
        class="form-control"
        placeholder="Buscar..."
        aria-label="Search"
      />
    </form>
    </div>
    </div>`);

let rowFiltrosProductos = $(`<div class="row filtrosProductos"></div>`);

let filtros = $(`
  <div class="col-5 col-md-2 filtros">
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
  <div class="col-7 col-md-10 grillaProductos"></div>
  `);

let carritoOffcanvas = $(`
  <div
    class="offcanvas offcanvas-end"
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
    </div>
  </div>`);

let carritoVacio = $(`
  <div class="carritoVacio">
    <h4>El carrito está vacío</h4>
  </div>`);

let filaTotal = $(`
  <div class="total">
    <p>TOTAL</p>
    <p class="totalPrecio"></p>
  </div>
  <div class="botonesCarrito">
    <button class="btn rounded-pill limpiarCarrito">Limpiar carrito</button>
    <button class="btn rounded-pill comprarCarrito">Comprar</button>
  </div>`);

let carritoContador = $(`<span class="carritoContador"></span>`);

let finalizarCompraHero = $(`
  <div class="container-fluid hero">
    <div class="row justify-content-center">
      <div
        class="
        col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4
        cajaHeroLogo
        animate__animated animate__fadeIn
        "
      >
        <img
          class="img-fluid heroLogo"
          src="./img/logo_white_large.png"
          alt="Logo Sincopado"
        />
        <p class="heroLema">Siempre la mejor atención</p>
      </div>
    </div>
  </div>`);

let finalizarCompraContainer = $(`
  <div class="container-fluid finalizarCompra">
    <div class="row tituloFinalizar">
      <h2 class="col-12 col-md-4">¡Últimos pasos!</h2>
      <h4 class="col-12 col-md-4">Chequeá tu selección...</h4>
    </div>
    <div class="row carritoYdatos">
    </div>
  </div>`);

let finalizarCompraCarrito = $(`
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th class="columnaImagen" scope="col"></th>
        <th scope="col">Nombre</th>
        <th scope="col">Cantidad</th>
        <th scope="col">Subtotal</th>
        <th scope="col">Quitar</th>
      </tr>
    </thead>
    <tbody class="tbody">
    </tbody>
  </table>`);

let finalizarCompraFormulario = $(`
  <div class="row cajaFormulario">
    <h2 class="col-6 formularioTitulo">
      Ahora te vamos a pedir que completes con tus datos
    </h2>
    <form onsubmit="return false" class="col-12 row finalizarCompraForm">
      <div class="col-md-6 datos">
        <h4>Datos Personales</h3>
        <div class="form-floating mb-3">
          <input
            type="text"
            name="nombre"
            class="form-control"
            id="floatingInputNombre"
            placeholder="Nombre"
            aria-label="nombre"
            value="Juan Perez"
            required
          />
          <label for="floatingInputNombre">Nombre:</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="email"
            name="email"
            class="form-control"
            id="email"
            placeholder="Email"
            aria-label="email"
            value="jperez@unmail.com"
            required
          />
          <label for="email">Email:</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            name="telefono"
            class="form-control"
            id="telefono"
            placeholder="Teléfono"
            aria-label="telefono"
            value="1123546599"
            required
          />
          <label for="telefono">Teléfono:</label>
        </div>
      </div>
      <div class="col-md-6 domicilio">
        <h4>Datos de domicilio</h3>
        <div class="form-floating mb-3">
          <input
            type="text"
            name="calle"
            class="form-control"
            id="calle"
            placeholder="Calle y altura"
            aria-label="calle"
            value="Virrey del Pino 1243"
            required
          />
          <label for="calle">Calle y altura:</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            name="entre"
            class="form-control"
            id="entre"
            placeholder="Entre calles"
            aria-label="entre"
            value="Gomez y Carrasco"
            required
          />
          <label for="entre">Entre calles:</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            name="localidad"
            class="form-control"
            id="localidad"
            placeholder="Localidad"
            aria-label="localidad"
            value="CABA"
            required
          />
          <label for="localidad">Localidad:</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            name="provincia"
            class="form-control"
            id="provincia"
            placeholder="Provincia"
            aria-label="provincia"
            value="CABA"
            required
          />
          <label for="provincia">Provincia:</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            name="cp"
            class="form-control"
            id="cp"
            placeholder="Código postal"
            aria-label="cp"
            value="1489"
            required
          />
          <label for="cp">Código postal:</label>
        </div>
      </div>
      <div class="col-6 tarjeta">
        <h4>Datos de la tarjeta de crédito</h3>
        <div class="form-floating mb-3">
          <input
            type="text"
            name="numeroTarjeta"
            class="form-control"
            id="numeroTarjeta"
            placeholder="Número de la tarjeta"
            aria-label="numeroTarjeta"
            value="2536-5698-5547-5589"
            required
          />
          <label for="numeroTarjeta">Número de la tarjeta:</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            name="nombreTarjeta"
            class="form-control"
            id="nombreTarjeta"
            placeholder="Nombre en la tarjeta"
            aria-label="nombreTarjeta"
            value="Juan Perez"
            required
          />
          <label for="nombreTarjeta">Nombre en la tarjeta:</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            name="desde"
            class="form-control"
            id="desde"
            placeholder="Desde"
            aria-label="desde"
            value="02/20"
            required
          />
          <label for="desde">Desde:</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            name="hasta"
            class="form-control"
            id="hasta"
            placeholder="Hasta"
            aria-label="hasta"
            value="02/25"
            required
          />
          <label for="hasta">Hasta:</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            name="cvc"
            class="form-control"
            id="cvc"
            placeholder="CVC"
            aria-label="cvc"
            value="123"
            required
          />
          <label for="cvc">CVC:</label>
        </div>
        <select class="form-select mb-3" aria-label="Default select example">
          <option selected>Cantidad de cuotas</option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
        </select>    
      </div>
      <button type="submit" class="col-3 btn rounded-pill btnFinalizarCompra">Finalizar Compra</button>
    </form>
  </div>`);

// función document ready
$(function () {
  iniciarTienda(); // inicio tienda
  emparejarCarritoStorage(); // emparejo carrito y Storage
  renderizarDestacados(); // renderizo destacados
  animacionInicio(); // animación
});
