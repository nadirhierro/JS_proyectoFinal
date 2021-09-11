// variable para precioTotal
let precioTotal = 0;

// inicializo carrito y emparejo con Storage
let carrito = [];
emparejarCarritoStorage();

// renderizo filtros
let filtrosDiv = document.querySelector(".filtros");
filtrosDiv.innerHTML = `
<h3>Filtros</h3>
        <div class="destacados">
          <ul>
            <li name="filtro" class="destacados">Destacados</li>
            <ul>
              <div class="porInstrumento">
                <li name="subfiltro" class="guitarra">Guitarras</li>
                <li name="subfiltro" class="bajo">Bajos</li>
                <li name="subfiltro" class="piano">Pianos</li>
              </div>
            </ul>
          </ul>
        </div>
        <div class="porInstrumento">
          <p>Por Instrumentos</p>
          <ul>
            <li name="filtro" class="guitarra">Guitarras</li>
            <ul>
              <div class="porTipo">
                <li name="subfiltro" class="electrico">Eléctricas</li>
                <li name="subfiltro" class="acustico">Acústicas</li>
              </div>
              <div class="porMarca">
                <li name="subfiltro" class="fender">Fender</li>
                <li name="subfiltro" class="gibson">Gibson</li>
              </div>
            </ul>
          </ul>
          <ul>
            <li name="filtro" class="bajo">Bajos</li>
            <ul>
              <div class="porTipo">
                <li name="subfiltro" class="electrico">Eléctricos</li>
                <li name="subfiltro" class="acustico">Acústicos</li>
              </div>
              <div class="porMarca">
                <li name="subfiltro" class="fender">Fender</li>
                <li name="subfiltro" class="ibanez">Ibanez</li>
              </div>
            </ul>
          </ul>
          <ul>
            <li name="filtro" class="piano">Piano</li>
            <ul>
              <div class="porTipo">
                <li name="subfiltro" class="electrico">Eléctricos</li>
                <li name="subfiltro" class="acustico">Acústicos</li>
              </div>
              <div class="porMarca">
                <li name="subfiltro" class="yamaha">Yamaha</li>
              </div>
            </ul>
          </ul>
        </div>
        <div class="porMarca">
          <p>Por Marca</p>
          <ul>
            <li name="filtro" class="fender">Fender</li>
            <ul>
              <div class="porInstrumento">
                <li name="subfiltro" class="guitarra">Guitarras</li>
                <li name="subfiltro" class="bajo">Bajos</li>
              </div>
            </ul>
          </ul>
          <ul>
            <li name="filtro" class="gibson">Gibson</li>
            <ul>
              <div class="porInstrumento">
                <li name="subfiltro" class="guitarra">Guitarras</li>
              </div>
              <div class="porTipo">
              <li name="subfiltro" class="puas">Puas</li>
              </div>
            </ul>
          </ul>
        </div>`;

escucharFiltros(); // escucho filtros
escucharSubFiltros(); // escucho subfiltros

// filtro productos destacados para renderizarlos al inicio
let productosDestacados = productos.filter(
  (producto) => producto.destacado == "si"
);
renderizarProductos(productosDestacados);
escucharBotonesAgregar();
