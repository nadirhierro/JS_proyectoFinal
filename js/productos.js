// creo clase producto
class Producto {
  constructor(id, instrumento, tipo, marca, modelo, precio, destacado, stock) {
    this.id = id;
    this.instrumento = instrumento;
    this.tipo = tipo;
    this.marca = marca;
    this.modelo = modelo;
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
    "Guitarra",
    "Guitarra",
    "Fender",
    "Stratocaster",
    150000,
    "si",
    3
  )
);
productos.push(
  new Producto(2, "Guitarra", "Guitarra", "Gibson", "Les Paul", 180000, "si", 2)
);
productos.push(
  new Producto(3, "Bajo", "Bajo", "Fender", "Jazz Bass", 120000, "si", 5)
);
productos.push(
  new Producto(4, "Bajo", "Bajo", "Fender", "Coronado", 190000, "si", 4)
);
productos.push(
  new Producto(
    5,
    "Piano",
    "Piano",
    "Yamaha",
    "Digital P45 88 teclas",
    92000,
    "si",
    3
  )
);
productos.push(
  new Producto(6, "Micrófono", "Micrófono", "Shure", "Glx", 7428.3, "si", 2)
);
productos.push(
  new Producto(
    7,
    "Guitarra",
    "Encordado guitarra",
    "D'addario",
    "Exp110 Nickle W",
    2739.45,
    "si",
    1
  )
);
productos.push(
  new Producto(
    8,
    "Bajo",
    "Encordado bajo",
    "D'addario",
    "Nyxl50105 4c. Nickel W",
    6640,
    "si",
    5
  )
);
