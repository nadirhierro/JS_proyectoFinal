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
            <li name="filtro" id="destacados" clas>Destacados</li>
            <ul>
              <div class="porInstrumento">
                <li name="subfiltro" id="guitarra">Guitarras</li>
                <li name="subfiltro" id="bajo">Bajos</li>
                <li name="subfiltro" id="piano">Pianos</li>
              </div>
            </ul>
          </ul>
        </div>
        <div class="porInstrumento">
          <p>Por Instrumentos</p>
          <ul>
            <li name="filtro" id="guitarra">Guitarras</li>
            <ul>
              <div class="porTipo">
                <li name="subfiltro" id="electrico">Eléctricas</li>
                <li name="subfiltro" id="acustico">Acústicas</li>
              </div>
              <div class="porMarca">
                <li name="subfiltro" id="fender">Fender</li>
                <li name="subfiltro" id="gibson">Gibson</li>
              </div>
            </ul>
          </ul>
          <ul>
            <li name="filtro" id="bajo">Bajos</li>
            <ul>
              <div class="porTipo">
                <li name="subfiltro" id="electrico">Eléctricos</li>
                <li name="subfiltro" id="acustico">Acústicos</li>
              </div>
              <div class="porMarca">
                <li name="subfiltro" id="fender">Fender</li>
                <li name="subfiltro" id="ibanez">Ibanez</li>
              </div>
            </ul>
          </ul>
          <ul>
            <li name="filtro" id="piano">Piano</li>
            <ul>
              <div class="porTipo">
                <li name="subfiltro" id="electrico">Eléctricos</li>
                <li name="subfiltro" id="acustico">Acústicos</li>
              </div>
              <div class="porMarca">
                <li name="subfiltro" id="yamaha">Yamaha</li>
              </div>
            </ul>
          </ul>
        </div>
        <div class="porMarca">
          <p>Por Marca</p>
          <ul>
            <li name="filtro" id="fender">Fender</li>
            <ul>
              <div class="porInstrumento">
                <li name="subfiltro" id="guitarra">Guitarras</li>
                <li name="subfiltro" id="bajo">Bajos</li>
              </div>
            </ul>
          </ul>
          <ul>
            <li name="filtro" id="gibson">Gibson</li>
            <ul>
              <div class="porInstrumento">
                <li name="subfiltro" id="guitarra">Guitarras</li>
              </div>
              <div class="porTipo">
              <li name="subfiltro" id="puas">Puas</li>
              </div>
            </ul>
          </ul>
        </div>`;

escucharFiltros();
escucharSubFiltros();

// filtro productos destacados para renderizarlos al inicio
let productosDestacados = productos.filter(
  (producto) => producto.destacado == "si"
);
renderizarProductos(productosDestacados);
escucharBotonesAgregar();
