$(document).ready(function () {
  console.log("El DOM esta listo");
});

// variable para precioTotal
let precioTotal = 0;

// inicializo carrito y emparejo con Storage
let carrito = [];
emparejarCarritoStorage();

// renderizo filtros
let filtrosDiv = document.querySelector(".filtros");
filtrosDiv.innerHTML = `
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
</div>
        </div>`;

let categorias = document.querySelectorAll(".categoria"); // selcciono todos los categorias
let subCategorias = document.querySelectorAll(".subcategoria"); // selecciono todos los subCategorias
escucharCategorias(); // escucho filtros
escucharSubCategorias(); // escucho subfiltros

let barraBusqueda = document.querySelector(".barraBusqueda");

// filtro productos destacados para renderizarlos al inicio
let productosDestacados = productos.filter(
  (producto) => producto.destacado == "si"
);
renderizarProductos(productosDestacados);
escucharBotonesAgregar();

let submit = document.querySelector(".buscador");
submit.addEventListener("submit", buscar);
