// creo clase producto
class Producto {
  constructor(id, instrumento, tipo, marca, nombre, precio, destacado, stock) {
    this.id = id;
    this.instrumento = instrumento;
    this.tipo = tipo;
    this.marca = marca;
    this.nombre = nombre;
    this.precio = precio;
    this.destacado = destacado;
    this.stock = stock;
    this.cantidad = 0;
  }
  agregar() {
    this.cantidad++;
    this.stock--;
  }
  borrar() {
    this.cantidad--;
    this.stock++;
  }
}

// inicializo array productos e inserto los productos disponibles
const productos = [];
productos.push(
  new Producto(
    1,
    "guitarra",
    "electrico",
    "fender",
    "Guitarra Fender Stratocaster",
    150000,
    "si",
    3
  )
);
productos.push(
  new Producto(
    2,
    "guitarra",
    "electrico",
    "gibson",
    "Guitarra Gibson Les Paul",
    180000,
    "si",
    2
  )
);
productos.push(
  new Producto(
    3,
    "bajo",
    "electrico",
    "fender",
    "Bajo Fender Jazz Bass",
    120000,
    "si",
    5
  )
);
productos.push(
  new Producto(
    4,
    "bajo",
    "electrico",
    "fender",
    "Bajo Fender Coronado",
    190000,
    "si",
    4
  )
);
productos.push(
  new Producto(
    5,
    "piano",
    "electrico",
    "yamaha",
    "Piano Yamaha Digital P45 88 teclas",
    92000,
    "si",
    3
  )
);
productos.push(
  new Producto(
    6,
    "estudio",
    "micrófono",
    "shure",
    "Micrófono Shure Glx",
    7428.3,
    "si",
    2
  )
);
productos.push(
  new Producto(
    7,
    "guitarra",
    "encordado",
    "daddario",
    "Encordado guitarra D'addario Exp110 Nickle W",
    2739.45,
    "si",
    1
  )
);
productos.push(
  new Producto(
    8,
    "bajo",
    "encordado",
    "daddario",
    "Encordado bajo D'addario Nyxl50105 4c. Nickel W",
    6640,
    "si",
    5
  )
);
productos.push(
  new Producto(
    9,
    "piano",
    "acustico",
    "yamaha",
    "Piano Vertical Yamaha Ju109",
    800000,
    "no"
  )
);
productos.push(
  new Producto(
    10,
    "bajo",
    "acustico",
    "fender",
    "Bajo Acústico Fender CB-60SCE",
    100000,
    "no"
  )
);
productos.push(
  new Producto(
    11,
    "bajo",
    "electrico",
    "ibanez",
    "Bajo eléctrico 5 cuerdas Ibanez GSRM25BK",
    157463.23,
    "si"
  )
);
productos.push(
  new Producto(
    12,
    "guitarra",
    "puas",
    "dandrea",
    "Puas D'Andrea 12 unidades Cool Plecs",
    1200,
    "si"
  )
);
productos.push(
  new Producto(
    13,
    "guitarra",
    "puas",
    "gibson",
    "Puas para guitarra Gibson six pack",
    1500,
    "no"
  )
);
productos.push(
  new Producto(
    14,
    "guitarra",
    "acustico",
    "fender",
    "Guitarra Acústica Fender Fa125",
    51985.23,
    "no"
  )
);
