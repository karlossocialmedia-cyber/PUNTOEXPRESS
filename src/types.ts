export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  unit: string; // e.g. "kg", "unidad", "pack", "litro"
  popular?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export type Category =
  | 'Carnes y pescados'
  | 'Verduras'
  | 'Lácteos, Huevos y Refrigerados'
  | 'Panadería y Pastelería'
  | 'Despensa (Abarrotes)'
  | 'Desayuno y Merienda'
  | 'Bebidas y Licores'
  | 'Congelados'
  | 'Cuidado Personal y Belleza'
  | 'Limpieza y Hogar'
  | 'Bebés y Niños'
  | 'Mascotas';

