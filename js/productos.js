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
productos.push(
  new Producto(
    34,
    "guitarras",
    "guitarras criollas",
    "valencia",
    "Guitarra Clasica Criolla Valencia Vc104 Tamaño 4/4 Estudio",
    14500,
    "no",
    3
  )
);
productos.push(
  new Producto(
    35,
    "guitarras",
    "guitarras criollas",
    "texas",
    "Guitarra-Clasica-Electro-Criolla-Texas-CG30-con-Funda",
    32000,
    "si",
    2
  )
);
productos.push(
  new Producto(
    36,
    "teclados",
    "digitales",
    "yamaha",
    "Teclado Portátil Yamaha 61 Teclas Sensitivas Psr E373",
    45988,
    "si",
    3
  )
);
productos.push(
  new Producto(
    37,
    "teclados",
    "digitales",
    "casio",
    "Teclado Portable Casio Lk-s450 61 Teclas Sensitivo Midi Usb",
    65989,
    "no",
    2
  )
);

productos.push(
  new Producto(
    38,
    "teclados",
    "accesorios para teclados",
    "monkeysell",
    "Monkeysell 118-131. Funda protectora gruesa para piano",
    10089,
    "no",
    2
  )
);
productos.push(
  new Producto(
    39,
    "teclados",
    "pianos",
    "yamaha",
    "Piano de Cola Yamaha Acustico GB1K PE",
    1500000,
    "no",
    2
  )
);
productos.push(
  new Producto(
    40,
    "teclados",
    "sintetizadores",
    "korg",
    "Sintetizador Monofónico Korg Ms-20 Fs Green",
    120000,
    "no",
    2
  )
);
productos.push(
  new Producto(
    41,
    "teclados",
    "sintetizadores",
    "korg",
    "Teclado Sintetizador Monofónico Korg MS-20 FS Blue",
    119999,
    99,
    "no",
    2
  )
);
productos.push(
  new Producto(
    42,
    "teclados",
    "sintetizadores",
    "korg",
    "Sintetizador FM Alterada 37 Teclas Korg OPSIX 6 Operadores",
    130287.25,
    "si",
    2
  )
);
productos.push(
  new Producto(
    43,
    "teclados",
    "amplificadores para teclados",
    "laney",
    "Amplificador Portatil Laney Multiproposito Ah Con Fx",
    55287.25,
    "si",
    2
  )
);

productos.push(
  new Producto(
    44,
    "teclados",
    "amplificadores para teclados",
    "vox",
    "Combo Vox Vx50kb Para Teclado 50w Nutube-equipped",
    40287.25,
    "si",
    2
  )
);

productos.push(
  new Producto(
    45,
    "teclados",
    "amplificadores para teclados",
    "laney",
    "Amplificador Multiproposito Laney Ah-series 150w 1x12 Ah150",
    53287.25,
    "si",
    2
  )
);

productos.push(
  new Producto(
    46,
    "teclados",
    "accesorios para teclados",
    "korg",
    "Soporte Korg St-wl Con Patas Madera Para Sv-1 Sv-2 & D1",
    53287.25,
    "no",
    2
  )
);

productos.push(
  new Producto(
    47,
    "teclados",
    "accesorios para teclados",
    "skb",
    "Estuche Semirigido Skb Teclado O Piano 88 Teclas Ruedas",
    20287.25,
    "no",
    2
  )
);

productos.push(
  new Producto(
    48,
    "teclados",
    "accesorios para teclados",
    "yamaha",
    "Yamaha Pedal De Sustain Para Teclado O Piano Fc5",
    3287.25,
    "si",
    2
  )
);

productos.push(
  new Producto(
    49,
    "baterias",
    "baterias acusticas",
    "mapex",
    "Bateria Mapex Mars Fusion 5 Cuerpos Bombo 20 Bloodwood",
    112000,
    "no",
    2
  )
);

productos.push(
  new Producto(
    50,
    "baterias",
    "baterias acusticas",
    "mapex",
    "Estuche Semirigido Skb Teclado O Piano 88 Teclas Ruedas",
    400999,
    "no",
    2
  )
);

productos.push(
  new Producto(
    51,
    "baterias",
    "baterias acusticas",
    "sonor",
    "Yamaha Pedal De Sustain Para Teclado O Piano Fc5",
    645800,
    "si",
    2
  )
);

productos.push(
  new Producto(
    52,
    "baterias",
    "baterias electronicas",
    "mapex",
    "Bateria Electrónica Roland TD-07KV V-Drums kit",
    300999,
    "no",
    2
  )
);

productos.push(
  new Producto(
    53,
    "baterias",
    "baterias electronicas",
    "mapex",
    "Bateria Electrónica Octapac Ringway TD78 c/Pedales y Baquetas",
    100999,
    "no",
    2
  )
);

productos.push(
  new Producto(
    54,
    "baterias",
    "baterias electronicas",
    "sonor",
    "Batería Electrónica MultiPad Yamaha Dtxm12 Usb",
    200000,
    "si",
    2
  )
);

productos.push(
  new Producto(
    55,
    "baterias",
    "percusion",
    "sonor",
    "Cajon Profesional Tineo Sonor CAJSTINEO C/Regulador Bordona",
    18999,
    "no",
    2
  )
);

productos.push(
  new Producto(
    56,
    "baterias",
    "percusion",
    "pearl",
    "Redoblante Pearl Sensitone Series 14'' x 5'' 10 torres",
    10999,
    "no",
    2
  )
);

productos.push(
  new Producto(
    57,
    "baterias",
    "percusion",
    "knight",
    "Pandereta KNIGHT 10'' de madera sin parche 8 pares de sonaja",
    64000,
    "si",
    2
  )
);

productos.push(
  new Producto(
    58,
    "baterias",
    "platillos",
    "sabian",
    "Set De 5 Platillos Sabian B8x Performance 45003xg Bronce B8",
    180999,
    "no",
    2
  )
);

productos.push(
  new Producto(
    59,
    "baterias",
    "platillos",
    "zildjian",
    "Set De Platillos Zildjian Zbt Crash 18 Y Hi Hat 13 Zbts3p",
    25999,
    "no",
    2
  )
);

productos.push(
  new Producto(
    60,
    "baterias",
    "platillos",
    "sabian",
    "Set De 5 Platillos Sabian Serie Xsr Hi-hat Crash Ride + Free",
    12000,
    "si",
    2
  )
);

productos.push(
  new Producto(
    61,
    "baterias",
    "accesorios para bateristas",
    "vic firth",
    "Palillos Vic Firth Signature Series Charlie Benante SBEN",
    3000,
    "no",
    2
  )
);

productos.push(
  new Producto(
    62,
    "baterias",
    "accesorios para bateristas",
    "rmv",
    "Parche De Bateria Rmv Phc16 De 16 Pulgadas Hidraulico",
    1200,
    "no",
    2
  )
);

productos.push(
  new Producto(
    63,
    "baterias",
    "accesorios para bateristas",
    "zildjian",
    "Palillos Bateria Zildjian Hickory 5a Punta De Nylon O Madera",
    2300,
    "si",
    2
  )
);

productos.push(
  new Producto(
    64,
    "estudio",
    "auriculares",
    "sennheiser",
    "Auriculares Sennheiser HD407 Cerrados Over Ear",
    6000,
    "no",
    2
  )
);

productos.push(
  new Producto(
    65,
    "estudio",
    "auriculares",
    "sennheiser",
    "Auriculares Inalambricos Sennheiser RS120 Bluetooth Cerrados",
    23000,
    "no",
    2
  )
);

productos.push(
  new Producto(
    66,
    "estudio",
    "auriculares",
    "sennheiser",
    "Auriculares Sennheiser HD4.40 BT Bluetooth Cerrados",
    46000,
    "si",
    2
  )
);

productos.push(
  new Producto(
    67,
    "estudio",
    "consolas",
    "zoom pro",
    "Consola Digital Zoom Grabación Multip. Simultenea 22 Canales",
    226000,
    "no",
    2
  )
);

productos.push(
  new Producto(
    68,
    "estudio",
    "consolas",
    "zoom pro",
    "Consola Digital Zoom Grabación Simultanea 12 Canales",
    80000,
    "no",
    2
  )
);

productos.push(
  new Producto(
    69,
    "estudio",
    "consolas",
    "zoom pro",
    "Consola Digital Zoom Grabación Multip Simultanea 12 Canales",
    146000,
    "si",
    2
  )
);
productos.push(
  new Producto(
    70,
    "estudio",
    "microfonos",
    "proel",
    "Microfono Vincha Inalambrico Uhf Proel Headset Profesional Frecuencias De 40hz A 18000 Hz Disponible En 3 Frecuencias.",
    80000,
    "no",
    2
  )
);

productos.push(
  new Producto(
    71,
    "estudio",
    "microfonos",
    "blue",
    "Microfono Blue Encore 100 Dinamico Cardioide Para Voces",
    146000,
    "no",
    2
  )
);

productos.push(
  new Producto(
    72,
    "estudio",
    "monitores",
    "jbl",
    "Monitor de estudio JBL LRS 305P MKII Woofer 5''",
    46000,
    "si",
    2
  )
);
productos.push(
  new Producto(
    73,
    "estudio",
    "monitores",
    "mackie",
    "Par Monitores Multimedia Mackie CR3-XBT 3'' Bluetooth",
    20000,
    "no",
    2
  )
);

productos.push(
  new Producto(
    74,
    "estudio",
    "monitores",
    "mackie",
    "Monitor de estudio Mackie MR824 NEW 8'' Activo",
    66000,
    "no",
    2
  )
);
productos.push(
  new Producto(
    75,
    "estudio",
    "accesorios para estudio",
    "ddrum",
    "Cable Profesional Ddrum Xlr Plug 4,5 Metros Microfono Canon",
    1500,
    "si",
    2
  )
);
productos.push(
  new Producto(
    76,
    "estudio",
    "accesorios para estudio",
    "hercules",
    "Atril Hercules Bs311b P/director 48x 35 Cm",
    14200,
    "no",
    2
  )
);

productos.push(
  new Producto(
    77,
    "estudio",
    "accesorios para estudio",
    "shure",
    "Cable Lightning a Micro USB Shure AMV-LTG15 38cm Negro",
    6099,
    "no",
    2
  )
);
