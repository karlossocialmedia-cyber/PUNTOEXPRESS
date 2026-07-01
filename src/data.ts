import { Product } from './types';

export const HERO_BANNER_IMAGE = 'https://anda.cl/wp-content/uploads/2026/06/Almacen-1024x559.webp';

export const PRODUCTS: Product[] = [
  // 1. Carnes y Pescados
  {
    id: 'cp_lomo',
    name: 'Lomo Vetado Premium Vacuno',
    description: 'Exquisito corte de lomo vetado de vacuno, marmoleado perfecto para asegurar jugosidad y sabor a la parrilla o sartén.',
    price: 12.90,
    category: 'Carnes y pescados',
    image: 'https://profesorklocker.cl/cdn/shop/products/lomovetado1.jpg',
    unit: 'kg',
    popular: true
  },
  {
    id: 'cp_pollo',
    name: 'Pechuga de Pollo Deshuesada',
    description: 'Pechuga de pollo fresca de primera selección, sin piel y deshuesada. Ideal para guisos, milanesas o asados saludables.',
    price: 5.80,
    category: 'Carnes y pescados',
    image: 'https://i.bolder.run/r/czoyMzA1MyxnOjEwMDB4/9129bef6/1082020-Pechuga_Pollo_Ariztia_700Gr.JPG',
    unit: 'kg',
    popular: true
  },
  {
    id: 'cp_salmon',
    name: 'Filete de Salmón Chileno Fresco',
    description: 'Filete de salmón del sur de Chile, rico en Omega-3. Textura firme y sabor suave, perfecto al horno o la plancha con finas hierbas.',
    price: 14.50,
    category: 'Carnes y pescados',
    image: 'https://salmondelsur.cl/wp-content/uploads/2021/03/salmon-filete-sellado-al-vacio-concepcion-talcahuano-san-pedro-chiguante-hortalizas-frutas-puromar-delivery-1-1.jpeg',
    unit: 'kg',
    popular: true
  },
  {
    id: 'cp_cerdo',
    name: 'Chuletas de Cerdo de Selección',
    description: 'Corte tierno de chuleta de cerdo seleccionada de faena controlada. Muy sabroso y jugoso para preparar al horno o a la cacerola.',
    price: 4.90,
    category: 'Carnes y pescados',
    image: 'https://granjamagdalena.cl/cdn/shop/files/chuletas-de-cerdo-parrilleras-cerdo-100-natural-granja-magdalena-967071.jpg',
    unit: 'kg',
    popular: false
  },
  {
    id: 'cp_trutro',
    name: 'Pollo Trutro Corto Envasado 1 kg Ariztia',
    description: 'Trutro corto de pollo seleccionado Ariztia, de carne muy jugosa y tierna, ideal para hornear, asar o cazuelas.',
    price: 4.20,
    category: 'Carnes y pescados',
    image: 'https://www.superpollo.cl/img/productos/6-Envase-Tuto-Entero-Fresco.png',
    unit: '1kg',
    popular: false
  },
  {
    id: 'af3',
    name: 'Tomate de Ensalada de Primera',
    description: 'Tomates jugosos, de color rojo intenso y firme textura, perfectos para ensaladas, salsas y sándwiches.',
    price: 2.20,
    category: 'Verduras',
    image: 'https://cdn6.campograndenews.com.br/uploads/noticias/2025/08/11/4d7347c3eb8ee9531fef234c5381daf6d8905473.jpg',
    unit: 'kg',
    popular: true
  },
  {
    id: 'vd1',
    name: 'Lechuga Costina Premium',
    description: 'Lechuga costina fresca, crujiente, lavada y lista para consumir. Aporta frescura y ligereza a tus ensaladas.',
    price: 1.50,
    category: 'Verduras',
    image: 'https://www.semilleriasanalfonso.cl/wp-content/uploads/2023/08/lechuga-costina.jpg',
    unit: 'unidad',
    popular: true
  },
  {
    id: 'vd2',
    name: 'Zanahoria Selección Lavada',
    description: 'Zanahorias dulces y crujientes de cultivo local, lavadas y seleccionadas por tamaño óptimo.',
    price: 1.20,
    category: 'Verduras',
    image: 'https://www.radioimagina.cl/wp-content/uploads/2021/03/Zanahorias-768x514.jpeg',
    unit: 'kg',
    popular: false
  },
  {
    id: 'vd3',
    name: 'Papa Cardenal Seleccionada',
    description: 'Papas de piel roja y pulpa firme, ideales para puré, fritas, asadas o cocidas.',
    price: 1.80,
    category: 'Verduras',
    image: 'https://redagricola.com/wp-content/uploads/2023/08/papas.jpg',
    unit: 'kg',
    popular: true
  },

  // 2. Lácteos, Huevos y Refrigerados
  {
    id: 'lr1',
    name: 'Leche Entera Premium 1L',
    description: 'Leche natural entera y fresca de vacas pastoreadas en el sur, adicionada con vitaminas A y D.',
    price: 1.45,
    category: 'Lácteos, Huevos y Refrigerados',
    image: 'https://santaisabel.vtexassets.com/arquivos/ids/543185/Leche-Soprole-Entera-Natural-1-L.jpg',
    unit: 'L',
    popular: true
  },
  {
    id: 'lr2',
    name: 'Huevos de Gallina Libres de Jaula',
    description: 'Estuche de 12 huevos frescos seleccionados, de color, puestos por gallinas libres de jaula con alimentación orgánica.',
    price: 3.80,
    category: 'Lácteos, Huevos y Refrigerados',
    image: 'https://www.casadecampo.cl/wp-content/uploads/2021/07/DSC_8937-scaled.jpg',
    unit: '12 uds',
    popular: true
  },
  {
    id: 'lr3',
    name: 'Queso Mantecoso Laminado',
    description: 'Delicioso queso de textura suave, cremoso y fácil de derretir, ideal para sándwiches o aperitivos.',
    price: 4.50,
    category: 'Lácteos, Huevos y Refrigerados',
    image: 'https://unimarc.vtexassets.com/arquivos/ids/237735/000000000000610368-UN-01.jpg',
    unit: '250g',
    popular: false
  },

  // 3. Panadería y Pastelería
  {
    id: 'pp1',
    name: 'Marraquetas Crujientes del Día',
    description: 'Pan tradicional chileno crujiente, recién horneado a la piedra. Sin grasas añadidas, ideal para el desayuno.',
    price: 2.10,
    category: 'Panadería y Pastelería',
    image: 'https://tofuu.getjusto.com/orioneat-local/resized2/bDceQpACpB5xgQNrS-2400-x.webp',
    unit: 'kg',
    popular: true
  },
  {
    id: 'pp2',
    name: 'Croissants de Mantequilla Premium',
    description: 'Facturas de hojaldre francés crujiente horneadas con mantequilla seleccionada, de interior tierno y alveolado.',
    price: 3.50,
    category: 'Panadería y Pastelería',
    image: 'https://media.scoolinary.app/blog/images/2023/11/vista-de-croissant-gourmet-recien-horneados.jpg',
    unit: '4 uds',
    popular: false
  },

  // 4. Despensa (Abarrotes)
  {
    id: 'da1',
    name: 'Arroz Grano Largo Ancho G2',
    description: 'Arroz seleccionado de grano entero y parejo que no se pasa ni se pega, ideal para acompañar tus mejores platos.',
    price: 1.60,
    category: 'Despensa (Abarrotes)',
    image: 'https://i5.walmartimages.cl/asr/c5de3dbf-e2bf-4532-8d36-ebededaf2f8e.f377d2591ea27de567064077dcae3373.jpeg',
    unit: '1kg',
    popular: true
  },
  {
    id: 'da2',
    name: 'Aceite de Oliva Extra Virgen',
    description: 'Aceite de primera prensada en frío de aceitunas seleccionadas, sabor frutado medio y aroma excepcional para ensaladas.',
    price: 7.90,
    category: 'Despensa (Abarrotes)',
    image: 'https://unimarc.vtexassets.com/arquivos/ids/245758/000000000000669503-UN-01.jpg',
    unit: '500ml',
    popular: true
  },
  {
    id: 'da_aceite_maravilla',
    name: 'Aceite Maravilla Botella 900 ml Miraflores',
    description: 'Aceite de maravilla 100% puro, ideal para freír, cocinar y hornear con un sabor neutro y saludable.',
    price: 2.20,
    category: 'Despensa (Abarrotes)',
    image: 'https://cugat.cl/wp-content/uploads/2022/04/cugat.cl-aceite-miraflores-vegetal-900-cc-1.png',
    unit: '900ml',
    popular: true
  },
  {
    id: 'da_aceite_belmont',
    name: 'Aceite Vegetal Botella 1 L Belmont',
    description: 'Aceitera tradicional Belmont de origen vegetal, libre de colesterol y perfecto para todo tipo de preparaciones culinarias.',
    price: 2.45,
    category: 'Despensa (Abarrotes)',
    image: 'https://i5.walmartimages.cl/asr/1cfdac04-364d-42e9-a798-69ea27bbde3a.f83cd2295aa553a9e93ef5cc92ba8e5d.jpeg',
    unit: '1L',
    popular: false
  },
  {
    id: 'da_azucar_iansa',
    name: 'Azúcar Blanca 1kg Iansa',
    description: 'Azúcar blanca granulada de primera calidad de la tradicional marca Iansa. El dulzor perfecto para tus postres y cafés.',
    price: 1.55,
    category: 'Despensa (Abarrotes)',
    image: 'https://cdnx.jumpseller.com/comaac-spa/image/16541885/Azucar_IANSA_1_kg.jpg',
    unit: '1kg',
    popular: true
  },
  {
    id: 'da_papas_fritas',
    name: 'Papas Fritas Snacks Artesanales',
    description: 'Deliciosas y crujientes papas fritas rústicas, sazonadas finamente con sal marina purificada.',
    price: 2.30,
    category: 'Despensa (Abarrotes)',
    image: 'https://patataszone.com.co/wp-content/uploads/2022/11/DSCN0528-4-1006x1024.jpg',
    unit: '180g',
    popular: false
  },

  // 5. Desayuno y Merienda
  {
    id: 'dm1',
    name: 'Café Instantáneo Arabica Gold',
    description: 'Café soluble liofilizado de granos de café 100% Arabica, tueste medio de sabor equilibrado y aroma aromático.',
    price: 5.50,
    category: 'Desayuno y Merienda',
    image: 'https://cafegold.cl/wp-content/uploads/img_producto_Instantaneo_Premier_Liofolizado_Arabica_170gr_01-1.png',
    unit: '170g',
    popular: true
  },
  {
    id: 'dm2',
    name: 'Mermelada de Frambuesa Casera',
    description: 'Elaborada artesanalmente con frutas seleccionadas del huerto, azúcar justa de caña y libre de preservantes.',
    price: 3.20,
    category: 'Desayuno y Merienda',
    image: 'https://fundorequingua.cl/cdn/shop/files/FOTOSWEBFUNSOREQUINGUA-900x900px-7.png',
    unit: '350g',
    popular: false
  },
  {
    id: 'dm_nescafe',
    name: 'Café instantáneo Tradición Tarro 150 g Nescafé',
    description: 'Clásico café instantáneo granulado Tradición de Nescafé. Sabor con cuerpo y el aroma de siempre que te acompaña cada mañana.',
    price: 4.80,
    category: 'Desayuno y Merienda',
    image: 'https://i5.walmartimages.cl/asr/96a42f8b-4ae9-4fe6-9826-0ed37c8472fe.dcd7106187b5c3026a59fd12d3cb263c.png',
    unit: '150g',
    popular: true
  },

  // 6. Bebidas y Licores
  {
    id: 'bl1',
    name: 'Agua Mineral Sin Gas Pure Glaciar',
    description: 'Agua purificada de vertiente andina, baja en sodio y de pureza excepcional ideal para hidratarse.',
    price: 1.00,
    category: 'Bebidas y Licores',
    image: 'https://jumboargentina.vtexassets.com/arquivos/ids/545287/Agua-Baja-En-Sodio-Glaciar-Con-Gas-15-L-2-240110.jpg',
    unit: '1.5L',
    popular: true
  },
  {
    id: 'bl2',
    name: 'Cerveza Artesanal Golden Ale 6-Pack',
    description: 'Cerveza rubia de cuerpo ligero y balanceado con aromas frutales y de amargor suave, ideal para refrescarse.',
    price: 8.40,
    category: 'Bebidas y Licores',
    image: 'https://unimarc.vtexassets.com/arquivos/ids/248053/000000000000675071-UN-01.jpg',
    unit: '6 uds',
    popular: false
  },
  {
    id: 'bl_coca_cola_3l',
    name: 'Bebida Original Botella Retornable 3 L Coca-Cola',
    description: 'Sabor único y refrescante de Coca-Cola original en formato familiar retornable de 3 litros. Ideal para compartir tus comidas.',
    price: 3.10,
    category: 'Bebidas y Licores',
    image: 'https://greatmarket.cl/dashboard/images/productos/1681257803_cocacola_retornable_3lt.png',
    unit: '3L',
    popular: true
  },
  {
    id: 'bl_fanta_3l',
    name: 'Bebida Naranja Original Botella Retornable 3 L Fanta',
    description: 'Bebida gaseosa sabor naranja Fanta original, dulce y burbujeante, en conveniente formato familiar retornable de 3 litros.',
    price: 2.90,
    category: 'Bebidas y Licores',
    image: 'https://alvicl.vtexassets.com/arquivos/ids/164093/000000000000673807-UN-01.jpg',
    unit: '3L',
    popular: true
  },

  // 7. Congelados
  {
    id: 'cg1',
    name: 'Pizza Familiar Tres Quesos Congelada',
    description: 'Masa crujiente artesanal cubierta con salsa de tomates italiana, abundante mozzarella, provolone y queso cheddar.',
    price: 6.80,
    category: 'Congelados',
    image: 'https://santaisabel.vtexassets.com/arquivos/ids/242626/Pizza-Receta-Del-Abuelo-4-quesos-redonda-congelada-560-g.jpg',
    unit: '450g',
    popular: true
  },
  {
    id: 'cg2',
    name: 'Papas Prefritas Corte Bastón',
    description: 'Papas seleccionadas cortadas en bastón listas para freír u hornear en pocos minutos. Crujientes por fuera.',
    price: 3.40,
    category: 'Congelados',
    image: 'https://www.corralesdelsur.cl/cdn/shop/products/papasfritas13.jpg',
    unit: '1kg',
    popular: false
  },

  // 8. Cuidado Personal y Belleza
  {
    id: 'cp1',
    name: 'Crema Dental Triple Acción',
    description: 'Pasta de dientes formulada para una protección anticaries completa, blancura brillante y aliento ultra fresco.',
    price: 2.10,
    category: 'Cuidado Personal y Belleza',
    image: 'https://i5.walmartimages.cl/asr/8a86dbf3-19ad-4599-aa40-7123f4d8730b.4d590352d5ebb18b7dd7e09d1086974d.jpeg',
    unit: '120g',
    popular: false
  },
  {
    id: 'cp2',
    name: 'Champú Orgánico Aloe Vera',
    description: 'Shampoo nutritivo e hidratante formulado con extracto puro de aloe vera orgánico de cultivos certificados.',
    price: 4.80,
    category: 'Cuidado Personal y Belleza',
    image: 'https://cosmetis.com/media/catalog/product/d/r/drorganicaloeverashampoo1.jpg',
    unit: '400ml',
    popular: true
  },

  // 9. Limpieza y Hogar
  {
    id: 'lh1',
    name: 'Detergente Líquido Concentrado',
    description: 'Poderosa fórmula quita manchas difíciles desde el primer lavado, apto para ropa blanca y de color.',
    price: 8.90,
    category: 'Limpieza y Hogar',
    image: 'https://puntolimpieza.cl/cdn/shop/files/101852.jpg',
    unit: '3L',
    popular: true
  },
  {
    id: 'lh2',
    name: 'Papel Higiénico Ultra Soft 4 Rollos',
    description: 'Papel higiénico de doble hoja de textura premium, máxima absorción and suavidad con extracto de algodón.',
    price: 2.50,
    category: 'Limpieza y Hogar',
    image: 'https://ibarramayoreo.com/images/IMAGENES/44832/01.jpg',
    unit: '4 uds',
    popular: false
  },

  // 10. Bebés y Niños
  {
    id: 'bn1',
    name: 'Pampers Premium Care G 72 unidades',
    description: 'Pañales con barreras antiderrame reforzadas y canales de distribución ultrarrápida para mantener seca la piel del bebé.',
    price: 14.90,
    category: 'Bebés y Niños',
    image: 'https://www.panalestintin.cl/wp-content/uploads/2023/12/pampers-premium-G-e1703027073736.jpeg',
    unit: '72 uds',
    popular: true
  },
  {
    id: 'bn2',
    name: 'Toallitas Húmedas Delicadas',
    description: 'Toallitas para bebés con pH neutro, adicionadas con camomila y aloe vera, dermatológicamente probadas.',
    price: 2.90,
    category: 'Bebés y Niños',
    image: 'https://r.bolder.run/3846/original/955110-CPDLTUE045.jpg',
    unit: '80 uds',
    popular: false
  },

  // 11. Mascotas
  {
    id: 'mt1',
    name: 'Alimento Perros Adultos Carne & Pollo',
    description: 'Pellets nutricionalmente balanceados con proteínas animales y vegetales de alta digestibilidad.',
    price: 11.50,
    category: 'Mascotas',
    image: 'https://www.distribuidoralira.cl/wp-content/uploads/2025/07/21P851.jpg',
    unit: '3kg',
    popular: true
  },
  {
    id: 'mt2',
    name: 'Arena Sanitaria Aglutinante Gatos',
    description: 'Fórmula ultra aglutinante con carbón activado que neutraliza olores de inmediato y es fácil de limpiar.',
    price: 6.20,
    category: 'Mascotas',
    image: 'https://cdnx.jumpseller.com/infopet/image/74838365/Arena-sanitaria-limon-topk9-25-kg-vina-del-mar.png',
    unit: '4kg',
    popular: false
  }
];
