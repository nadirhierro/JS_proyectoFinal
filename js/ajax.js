// funcion para obtener productos con ajax
const productosData = [];
function getProductos() {
  return $.ajax({
    type: "GET",
    url: "datos/data.json",
    dataType: "json",
    success: function (response) {
      for (const data of response) {
        productosData.push(data);
      }
    },
  });
}

// función para finalizar compra
// tomo los valores de cada input y luego guardo el cliente y lo "posteo"
function finalizarCompra(event) {
  let nombre = event.target[0].value;
  let email = event.target[1].value;
  let telefono = event.target[2].value;
  let calle = event.target[3].value;
  let entre = event.target[4].value;
  let localidad = event.target[5].value;
  let provincia = event.target[6].value;
  let codigoPostal = event.target[7].value;
  let numeroTarjeta = event.target[8].value;
  let nombreTarjeta = event.target[9].value;
  let desde = event.target[10].value;
  let hasta = event.target[11].value;
  let cvc = event.target[12].value;
  let cuotas = event.target[13].value.replaceAll(
    "_",
    " cuotas sin interés de $"
  );
  let url = "https://jsonplaceholder.typicode.com/posts";
  clientes.push(
    new Cliente(
      nombre,
      email,
      telefono,
      calle,
      entre,
      localidad,
      provincia,
      codigoPostal,
      carrito,
      carrito.total
    )
  );
  $.ajax({
    url: url,
    type: "POST",
    data: {
      nombre: nombre,
      email: email,
      telefono: telefono,
      cuotas: cuotas,
      numeroTarjeta: numeroTarjeta,
      nombreTarjeta: nombreTarjeta,
      cvc: cvc,
      desde: desde,
      hasta: hasta,
      carrito: carrito,
      total: carrito.total,
    },
    beforeSend: function () {
      $(".finalizarCompra").remove(); // saco el carrito y formulario
      $(".main").append(loader); // pongo el loader
      $(".loader").show();
    },
    success: function (data) {
      compraRealizada(data); // pongo la notificaciones en hide
    },
    complete: function () {
      $(".loader").fadeOut(200); // saco el loader
      $(".cajaCompraRealizada").delay(201).fadeIn(200); // muestro el mensaje
      localStorage.removeItem("carrito"); // borro el localStorage para una nueva compra
    },
  });
}
