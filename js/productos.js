// creo clase producto
class Producto {
  constructor(
    id,
    categoria,
    subcategoria,
    marca,
    nombre,
    precio,
    destacado,
    stock
  ) {
    this.id = id;
    this.categoria = categoria;
    this.subcategoria = subcategoria;
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
    "guitarras",
    "guitarras eléctricas",
    "fender",
    "Guitarra eléctrica Fender Stratocaster",
    150000,
    "si",
    3
  )
);
productos.push(
  new Producto(
    2,
    "guitarras",
    "guitarras eléctricas",
    "gibson",
    "Guitarra eléctrica Gibson Les Paul",
    180000,
    "si",
    2
  )
);
productos.push(
  new Producto(
    3,
    "bajos",
    "bajos eléctricos",
    "fender",
    "Bajo eléctrico Fender Jazz Bass",
    120000,
    "si",
    5
  )
);
productos.push(
  new Producto(
    4,
    "bajos",
    "bajos eléctricos",
    "fender",
    "Bajo eléctrico Fender Coronado",
    190000,
    "si",
    4
  )
);
productos.push(
  new Producto(
    5,
    "teclados",
    "digitales",
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
    "micrófonos",
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
    "guitarras",
    "encordados para guitarra",
    "daddario",
    "Encordado guitarra eléctrica D'addario Exp110 Nickle W",
    2739.45,
    "si",
    1
  )
);
productos.push(
  new Producto(
    8,
    "bajos",
    "encordados para bajo",
    "daddario",
    "Encordado bajo eléctrico D'addario Nyxl50105 4c. Nickel W",
    6640,
    "si",
    5
  )
);
productos.push(
  new Producto(
    9,
    "teclados",
    "pianos",
    "yamaha",
    "Piano Vertical Yamaha Ju109",
    800000,
    "no",
    4
  )
);
productos.push(
  new Producto(
    10,
    "bajos",
    "bajos acústicos",
    "fender",
    "Bajo Acústico Fender CB-60SCE",
    100000,
    "no",
    2
  )
);
productos.push(
  new Producto(
    11,
    "bajos",
    "bajos eléctricos",
    "ibanez",
    "Bajo eléctrico 5 cuerdas Ibanez GSRM25BK",
    157463.23,
    "si",
    2
  )
);
productos.push(
  new Producto(
    12,
    "guitarras",
    "accesorios para guitarra",
    "dandrea",
    "Puas para guitarra D'Andrea 12 unidades Cool Plecs",
    1200,
    "si",
    25
  )
);
productos.push(
  new Producto(
    13,
    "guitarras",
    "accesorios para guitarra",
    "gibson",
    "Puas para guitarra Gibson six pack",
    1500,
    "no",
    10
  )
);
productos.push(
  new Producto(
    14,
    "guitarras",
    "guitarras acústicas",
    "fender",
    "Guitarra Acústica Fender Fa125",
    51985.23,
    "no",
    4
  )
);
productos.push(
  new Producto(
    15,
    "guitarras",
    "guitarras acústicas",
    "fender",
    "Fender CC-60SCE Concierto Guitarra Acústica - Natural - Zurdo",
    157986.36,
    2,
    "no",
    2
  )
);
productos.push(
  new Producto(
    16,
    "guitarras",
    "guitarras acusticas",
    "ovation",
    "Ovation CE44P-SM Guitarra Acústica-Eléctrica, Arce Espaltado",
    259999.99,
    1,
    "no",
    3
  )
);
productos.push(
  new Producto(
    17,
    "guitarras",
    "guitarras electricas",
    "ibanez",
    "Ibanez JEMJRWH Steve Vai Signature Guitarra Eléctrica de 6 Cuerdas - Blanco",
    409898.25,
    "si",
    3
  )
);
productos.push(
  new Producto(
    18,
    "guitarras",
    "guitarras eléctricas",
    "ibanez",
    "Ibanez Artcore AS73 guitarra eléctrica semihueca",
    200987.3,
    "no",
    4
  )
);
productos.push(
  new Producto(
    19,
    "guitarras",
    "amplificadores para guitarra",
    "vox",
    "Amplificador Guitarra eléctrica Vox Mini 3 G2 3 Watts Multiefecto",
    119999.99,
    "no",
    2
  )
);
productos.push(
  new Producto(
    20,
    "guitarras",
    "amplificadores para guitarra",
    "marshall",
    "Marshall Amplificador Guitarra Electrica 15 W Efecto Mg15cfx",
    40263.99,
    "no",
    1
  )
);
productos.push(
  new Producto(
    21,
    "guitarras",
    "amplificadores para guitarra",
    "marshall",
    "Amplificador Marshall Guitarra Electrica Mg102 Cfx 100 Watts 2x12 4 Canales",
    125321.25,
    "si",
    3
  )
);
productos.push(
  new Producto(
    22,
    "guitarras",
    "amplificadores para guitarra",
    "blackstar",
    "Amplificador Guitarra Acústica Blackstar Sonnet 60 1x6",
    95999.99,
    "no",
    2
  )
);
productos.push(
  new Producto(
    23,
    "guitarras",
    "encordados para guitarra",
    "fender",
    "Encordado Para Guitarra Fender Electrica Nickel 008",
    1152.25,
    "no",
    5
  )
);
productos.push(
  new Producto(
    24,
    "guitarras",
    "encordados para guitarra",
    "ernie ball",
    "Encordado Ernie Ball Guitarra Electrica P02221 10 46 Regular",
    1450,
    "no",
    6
  )
);
productos.push(
  new Producto(
    25,
    "guitarras",
    "accesorios para guitarra",
    "fender",
    "Microfonos Fender Stratocaster Vintage Noiseless (set X 3) - Guitarra electrica",
    42999.99,
    "no",
    9
  )
);
productos.push(
  new Producto(
    26,
    "guitarras",
    "accesorios para guitarra",
    "ibanez",
    "Afinador Cromatico Ibanez Pantalla Color Apagado Automatico para guitarra o bajo",
    1200,
    "no",
    5
  )
);
productos.push(
  new Producto(
    27,
    "bajos",
    "bajos acusticos",
    "ibanez",
    "Bajo Electro Acustico Ibanez Ewb20wnent",
    100256.25,
    "no",
    3
  )
);
productos.push(
  new Producto(
    28,
    "bajos",
    "bajos acusticos",
    "fender",
    "Bajo Electro Acustico Fender Cb-60sce Fishman Laurel",
    88256.25,
    "si",
    2
  )
);
productos.push(
  new Producto(
    29,
    "bajos",
    "amplificadores para bajo",
    "fender",
    "Amplificador Para Bajo Fender Rumble 100 V3 100w Combo 1x12",
    90256.25,
    "no",
    3
  )
);
productos.push(
  new Producto(
    30,
    "bajos",
    "amplificadores para bajo",
    "fender",
    "Amplificador para bajo Orange Crush Bass B50 12",
    90256.25,
    "si",
    3
  )
);
productos.push(
  new Producto(
    31,
    "bajos",
    "amplificadores para bajo",
    "blackstar",
    "Combo Amplificador Blackstar Unity 60 Para Bajo 60 W 1x10",
    50256.25,
    "no",
    1
  )
);
productos.push(
  new Producto(
    32,
    "bajos",
    "encordados para bajo",
    "ernie ball",
    "Encordado Ernie Ball Bajo Electrico P02835 040 Extra Slinky",
    4999.99,
    "no",
    1
  )
);

productos.push(
  new Producto(
    33,
    "bajos",
    "encordados para bajo",
    "daddario",
    "Encordado D'addario Para Bajo electrico 4 Cuerdas XTB45100 045 - 100",
    5599.99,
    "si",
    1
  )
);
