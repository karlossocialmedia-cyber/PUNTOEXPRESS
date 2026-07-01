import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Apple, 
  Salad,
  Beef,
  Milk, 
  Croissant, 
  Package, 
  Coffee, 
  Wine, 
  Snowflake, 
  Heart, 
  Droplet, 
  Baby, 
  Dog, 
  Clock, 
  MapPin, 
  X, 
  Star, 
  Store 
} from 'lucide-react';
import { Category } from '../types';

interface CategorySidebarProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
  categoryCounts: Record<Category, number>;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
  isOpenMobile,
  onCloseMobile,
}) => {
  const categories: { id: Category; label: string; icon: React.ReactNode; color: string; desc: string }[] = [
    {
      id: 'Carnes y pescados',
      label: 'Carnes y Pescados',
      desc: 'Cortes premium de vacuno, aves y pescados',
      icon: <Beef className="w-4 h-4" />,
      color: 'from-red-600 to-rose-700',
    },
    {
      id: 'Verduras',
      label: 'Verduras Frescas',
      desc: 'Hortalizas, papas y hierbas rústicas',
      icon: <Salad className="w-4 h-4" />,
      color: 'from-emerald-500 to-green-600',
    },
    {
      id: 'Lácteos, Huevos y Refrigerados',
      label: 'Lácteos y Huevos',
      desc: 'Leche, quesos, yogures y huevos',
      icon: <Milk className="w-4 h-4" />,
      color: 'from-blue-400 to-indigo-500',
    },
    {
      id: 'Panadería y Pastelería',
      label: 'Panadería y Pastelería',
      desc: 'Pan fresco del día y bollería',
      icon: <Croissant className="w-4 h-4" />,
      color: 'from-amber-400 to-orange-500',
    },
    {
      id: 'Despensa (Abarrotes)',
      label: 'Despensa (Abarrotes)',
      desc: 'Arroz, aceites, pastas y salsas',
      icon: <Package className="w-4 h-4" />,
      color: 'from-yellow-500 to-amber-600',
    },
    {
      id: 'Desayuno y Merienda',
      label: 'Desayuno y Merienda',
      desc: 'Café, té, cereales y untables',
      icon: <Coffee className="w-4 h-4" />,
      color: 'from-amber-600 to-amber-800',
    },
    {
      id: 'Bebidas y Licores',
      label: 'Bebidas y Licores',
      desc: 'Aguas, jugos, cervezas y vinos',
      icon: <Wine className="w-4 h-4" />,
      color: 'from-purple-500 to-red-600',
    },
    {
      id: 'Congelados',
      label: 'Congelados',
      desc: 'Pizzas, vegetales y helados',
      icon: <Snowflake className="w-4 h-4" />,
      color: 'from-cyan-400 to-blue-500',
    },
    {
      id: 'Cuidado Personal y Belleza',
      label: 'Cuidado Personal',
      desc: 'Higiene, champú y desodorantes',
      icon: <Heart className="w-4 h-4" />,
      color: 'from-pink-400 to-rose-500',
    },
    {
      id: 'Limpieza y Hogar',
      label: 'Limpieza y Hogar',
      desc: 'Detergentes, papeles y limpiadores',
      icon: <Droplet className="w-4 h-4" />,
      color: 'from-teal-400 to-emerald-500',
    },
    {
      id: 'Bebés y Niños',
      label: 'Bebés y Niños',
      desc: 'Pañales, fórmulas y toallitas',
      icon: <Baby className="w-4 h-4" />,
      color: 'from-sky-400 to-indigo-500',
    },
    {
      id: 'Mascotas',
      label: 'Mascotas',
      desc: 'Alimento de perros y gatos',
      icon: <Dog className="w-4 h-4" />,
      color: 'from-amber-500 to-orange-700',
    },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white text-slate-800 p-5 justify-between select-none">
      {/* Header Info */}
      <div className="space-y-4 flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍎</span>
            <div>
              <h1 className="font-display font-black text-base tracking-tight text-slate-900 leading-none">
                PUNTO <span className="text-red-600">EXPRESS</span>
              </h1>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">MINIMARKET ONLINE</p>
            </div>
          </div>
          {/* Close button for mobile screen drawer */}
          <button
            onClick={onCloseMobile}
            className="md:hidden p-2 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 rounded-xl transition-colors"
            aria-label="Cerrar panel de categorías"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Short info badge */}
        <div className="bg-slate-50 border border-slate-150 rounded-xl p-3 space-y-2 shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <Clock className="w-3.5 h-3.5 text-red-600" />
            <div>
              <p className="font-bold text-slate-800 text-[11px] leading-tight">Despacho express</p>
              <p className="text-[10px] text-slate-500 font-medium">30 - 60 min hoy mismo</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <MapPin className="w-3.5 h-3.5 text-red-600" />
            <div>
              <p className="font-bold text-slate-800 text-[11px] leading-tight">Envío Gratis</p>
              <p className="text-[10px] text-slate-500 font-medium">Por compras sobre $20</p>
            </div>
          </div>
        </div>

        {/* Category List - beautifully scrollable */}
        <div className="flex-1 flex flex-col min-h-0 pt-2">
          <p className="text-[9px] font-bold uppercase text-slate-600 tracking-wider mb-2 shrink-0">Categorías de Despensa</p>
          <div className="space-y-1 overflow-y-auto pr-1 flex-1 max-h-[calc(100vh-290px)] custom-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  id={`sidebar-category-${cat.id.replace(/\s+/g, '-')}`}
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    onCloseMobile();
                  }}
                  className={`w-full relative flex items-center justify-between p-2.5 rounded-xl text-left transition-all duration-300 group ${
                    isActive
                      ? 'bg-red-50 text-red-600 font-extrabold border border-red-200/50 shadow-sm'
                      : 'hover:bg-slate-50 text-slate-600 hover:text-slate-950 border border-transparent'
                  }`}
                >
                  {/* Left indicator on hover/active */}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategorySidebarIndicator"
                      className={`absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-gradient-to-b ${cat.color}`}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                  )}

                  <div className="flex items-center gap-2.5 relative z-10 pl-1">
                    <div className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                      isActive ? 'bg-red-600 text-white shadow-sm' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                    }`}>
                      {cat.icon}
                    </div>
                    <div>
                      <h4 className={`text-[11.5px] font-extrabold leading-tight ${isActive ? 'text-red-700' : 'text-slate-800'}`}>{cat.label}</h4>
                      <p className={`text-[9px] font-medium transition-colors line-clamp-1 ${isActive ? 'text-red-500' : 'text-slate-450 group-hover:text-slate-600'}`}>
                        {cat.desc}
                      </p>
                    </div>
                  </div>

                  {/* Item Counts badge */}
                  {categoryCounts[cat.id] > 0 && (
                    <span className={`relative z-10 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-600 font-extrabold'
                    }`}>
                      {categoryCounts[cat.id]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sidebar Footer */}
      <div className="pt-4 border-t border-slate-100 space-y-2 shrink-0">
        <div className="flex items-center gap-1.5 text-[10px] text-red-600 font-extrabold justify-center bg-red-50 py-1.5 px-3 rounded-xl border border-red-100">
          <Store className="w-3.5 h-3.5" />
          <span>Atención al Cliente Inmediata</span>
        </div>
        <p className="text-[8px] text-center text-slate-500 font-semibold leading-relaxed">
          © 2026 Punto Express S.A.<br />Frescura garantizada en tu hogar.
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block w-72 shrink-0 h-screen sticky top-0 border-r border-slate-150 bg-white shadow-md z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Slide-out */}
      <AnimatePresence>
        {isOpenMobile && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="md:hidden fixed inset-0 bg-slate-900/40 z-40"
            />

            {/* Sidebar drawer sheet */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] z-50 shadow-2xl h-full border-r border-slate-150 bg-white"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
