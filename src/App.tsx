import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Search, Sparkles, AlertCircle, X, ChevronRight, Check, Menu } from 'lucide-react';
import { Banner } from './components/Banner';
import { CategorySidebar } from './components/CategorySidebar';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { PRODUCTS } from './data';
import { CartItem, Category, Product } from './types';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Carnes y pescados');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  // Monitor and capture standard PWA install prompts
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent browser default prompt
      e.preventDefault();
      // Store the event
      setDeferredPrompt(e);
      // Show install banner
      setShowInstallBtn(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // If already in standalone/installed mode, don't show prompt
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallBtn(false);
    }

    // For iOS and mobile web PWA guidelines
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
    const isDismissed = sessionStorage.getItem('pwa_banner_dismissed') === 'true';
    
    // On iOS Safari, beforeinstallprompt isn't supported, but we show how to install
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if ((isMobile || isIOS) && !isInstalled && !isDismissed && !deferredPrompt) {
      setShowInstallBtn(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [deferredPrompt]);

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User installation decision: ${outcome}`);
      setDeferredPrompt(null);
      setShowInstallBtn(false);
    } else {
      // Manual/fallback PWA instructions (e.g., iOS Safari)
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isIOS) {
        triggerToast('📲 Toca "Compartir" (Share) en Safari y selecciona "Agregar a inicio"');
      } else {
        triggerToast('📲 Para instalar, ve al menú del navegador y selecciona "Instalar aplicación"');
      }
    }
  };

  const handleDismissBanner = () => {
    sessionStorage.setItem('pwa_banner_dismissed', 'true');
    setShowInstallBtn(false);
  };

  // Show a momentary toast notification
  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Add item to cart
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += 1;
        triggerToast(`¡Agregado: ${product.name} (x${newCart[existingIndex].quantity})!`);
        return newCart;
      } else {
        triggerToast(`¡Agregado a tu carro: ${product.name}!`);
        return [...prevCart, { product, quantity: 1, notes: '' }];
      }
    });
  };

  // Remove item or decrease quantity
  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === productId);
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        if (newCart[existingIndex].quantity > 1) {
          newCart[existingIndex].quantity -= 1;
          return newCart;
        } else {
          // Remove completely
          const productName = newCart[existingIndex].product.name;
          triggerToast(`Quitado de la canasta: ${productName}`);
          return newCart.filter((item) => item.product.id !== productId);
        }
      }
      return prevCart;
    });
  };

  // Update notes for an item
  const handleUpdateNotes = (productId: string, notes: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, notes } : item
      )
    );
  };

  // Empty the entire cart
  const handleClearCart = () => {
    setCart([]);
    setIsCartOpen(false);
    triggerToast('Tu canasta de compras ha sido vaciada.');
  };

  // Get active item counts by category
  const categoryCounts = useMemo(() => {
    const counts: Record<Category, number> = {
      'Carnes y pescados': 0,
      'Verduras': 0,
      'Lácteos, Huevos y Refrigerados': 0,
      'Panadería y Pastelería': 0,
      'Despensa (Abarrotes)': 0,
      'Desayuno y Merienda': 0,
      'Bebidas y Licores': 0,
      'Congelados': 0,
      'Cuidado Personal y Belleza': 0,
      'Limpieza y Hogar': 0,
      'Bebés y Niños': 0,
      'Mascotas': 0,
    };
    cart.forEach((item) => {
      const cat = item.product.category;
      if (counts[cat] !== undefined) {
        counts[cat] += item.quantity;
      }
    });
    return counts;
  }, [cart]);

  // Filter products by active category and search input
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
      if (searchTerm) {
        return matchesSearch;
      }
      return product.category === selectedCategory;
    });
  }, [selectedCategory, searchTerm]);

  // Aggregate stats
  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row relative">
      {/* Responsive Lateral Sidebar Category Menu */}
      <CategorySidebar
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setSearchTerm('');
        }}
        categoryCounts={categoryCounts}
        isOpenMobile={isSidebarOpenMobile}
        onCloseMobile={() => setIsSidebarOpenMobile(false)}
      />

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden pb-32">
        {/* Top micro status bar */}
        <div className="w-full bg-red-600 text-[10px] text-white py-2.5 px-4 text-center font-mono tracking-widest uppercase shrink-0 flex items-center justify-center gap-2 font-bold shadow-sm">
          <span>⚡ DESPACHO GRATIS EN COMPRAS SOBRE $20 EN PUNTO EXPRESS ⚡</span>
        </div>

        {/* PWA Install Banner */}
        <AnimatePresence>
          {showInstallBtn && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="w-full bg-slate-950 text-white text-xs px-4 py-3 flex items-center justify-between border-b border-slate-800 shrink-0 shadow-md overflow-hidden relative z-50"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl animate-bounce">📲</span>
                <div>
                  <div className="font-black text-slate-100 flex items-center gap-1.5 text-[11px] sm:text-xs">
                    <span>Instalar Punto Express</span>
                    <span className="bg-red-500/10 text-red-400 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border border-red-500/20">PWA</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium leading-normal mt-0.5">
                    Descarga nuestra app oficial para comprar más rápido desde tu pantalla de inicio.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  id="btn-pwa-install"
                  onClick={handleInstallApp}
                  className="bg-red-600 hover:bg-red-700 active:scale-95 text-white text-[10px] font-black px-3.5 py-2 rounded-xl uppercase tracking-wider shadow-md transition-all flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <span>📲 Descargar App</span>
                </button>
                <button
                  id="btn-pwa-dismiss"
                  onClick={handleDismissBanner}
                  className="text-slate-400 hover:text-slate-200 p-1.5 rounded-full hover:bg-slate-800 transition-all shrink-0 cursor-pointer"
                  title="Cerrar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Mobile Menu Toggle Bar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white text-slate-900 shrink-0 shadow-sm border-b border-slate-100">
          <button
            id="btn-trigger-mobile-sidebar"
            onClick={() => setIsSidebarOpenMobile(true)}
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 font-extrabold text-[11px] bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-all"
          >
            <Menu className="w-4 h-4 text-red-600" />
            <span>Categorías</span>
          </button>
          <div className="font-display font-black text-sm tracking-tight text-slate-900">
            PUNTO <span className="text-red-600">EXPRESS</span>
          </div>
          <div className="w-16"></div> {/* Spacer balance */}
        </div>

        {/* Page Inner Container */}
        <div className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8 space-y-8">
          
          {/* Main Hero Banner */}
          <Banner />

          {/* Prominent Main Search Bar */}
          <div id="main-search-container" className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Search className="w-4 h-4 text-red-600" />
              <span>¿Qué deseas comprar hoy en el Minimarket?</span>
            </h3>
            <div className="relative">
              <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-slate-400" />
              </span>
              <input
                id="main-screen-search"
                type="text"
                placeholder="Busca carnes, verduras, aceites, bebidas, lácteos y más..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-sm rounded-2xl pl-12 pr-12 py-4 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-semibold text-slate-800 placeholder-slate-400 shadow-inner"
              />
              {searchTerm && (
                <button
                  id="btn-clear-main-search"
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  title="Limpiar búsqueda"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            {searchTerm && (
              <p className="text-[11px] text-red-600 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block animate-pulse"></span>
                Mostrando resultados de búsqueda en todas las categorías de la tienda.
              </p>
            )}
          </div>

          {/* Interactive Menu Section */}
          <div id="interactive-menu-container" className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-red-600 fill-red-100" />
                  <span>{searchTerm ? `Resultados para "${searchTerm}"` : selectedCategory}</span>
                </h2>
                <p className="text-xs text-slate-450 font-semibold">
                  {searchTerm
                    ? `Hemos encontrado ${filteredProducts.length} productos que coinciden con tu búsqueda.`
                    : 'Explora nuestros productos seleccionados, agrégalos a tu carrito y pide por WhatsApp.'}
                </p>
              </div>
            </div>

            {/* Products List Grid */}
            <div className="relative min-h-[250px]">
              <AnimatePresence mode="popLayout">
                {filteredProducts.length > 0 ? (
                  <motion.div
                    id="products-grid"
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                  >
                    {filteredProducts.map((product) => {
                      const cartItem = cart.find((item) => item.product.id === product.id);
                      const quantity = cartItem ? cartItem.quantity : 0;
                      return (
                        <ProductCard
                          key={product.id}
                          product={product}
                          quantityInCart={quantity}
                          onAdd={() => handleAddToCart(product)}
                          onRemove={() => handleRemoveFromCart(product.id)}
                        />
                      );
                    })}
                  </motion.div>
                ) : (
                  /* No Results State */
                  <motion.div
                    key="empty-search"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center py-16 px-4 space-y-3 bg-white rounded-3xl border border-slate-100 shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 text-lg">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-extrabold text-sm">No encontramos productos</h4>
                      <p className="text-slate-400 text-xs mt-1 max-w-xs">
                        Intenta buscar con otros términos o selecciona otra categoría en el menú lateral.
                      </p>
                    </div>
                    <button
                      id="btn-reset-filters"
                      onClick={() => {
                        setSearchTerm('');
                      }}
                      className="text-xs font-black text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2.5 rounded-xl transition-all border border-red-100"
                    >
                      Limpiar Búsqueda
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Cart Bar */}
      <AnimatePresence>
        {totalCartItems > 0 && !isCartOpen && (
          <motion.div
            id="floating-cart-anchor"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="fixed bottom-6 inset-x-4 md:left-[calc(18rem+1.5rem)] md:right-6 z-40 max-w-md md:max-w-none md:mx-0 mx-auto"
          >
            <button
              id="btn-floating-cart-trigger"
              onClick={() => setIsCartOpen(true)}
              className="w-full flex items-center justify-between bg-slate-950 hover:bg-slate-900 active:scale-[0.99] text-white p-4 rounded-2xl shadow-xl transition-all duration-300 border border-slate-800 group"
            >
              <div className="flex items-center gap-3">
                {/* Pulse bag icon */}
                <div className="relative p-2.5 bg-red-600 rounded-xl text-white shadow-inner">
                  <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
                  <span className="absolute -top-1.5 -right-1.5 bg-white text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded-full border border-slate-950">
                    {totalCartItems}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-450 font-bold uppercase tracking-wider">Ver Mi Canasta</p>
                  <p className="text-sm font-black text-white">${cartSubtotal.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-red-500 font-black text-xs uppercase tracking-wider bg-white py-2 px-3.5 rounded-xl shadow-md group-hover:bg-red-50 transition-all">
                <span>Completar Pedido</span>
                <ChevronRight className="w-4 h-4 text-red-600 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer Sheets Modal */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onAdd={(productId) => {
          const product = PRODUCTS.find((p) => p.id === productId);
          if (product) handleAddToCart(product);
        }}
        onRemove={handleRemoveFromCart}
        onClear={handleClearCart}
        onUpdateNotes={handleUpdateNotes}
      />

      {/* Toast Confirmation Feed */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            id="toast-notification"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed bottom-24 inset-x-6 z-50 max-w-xs mx-auto bg-slate-950/95 text-white backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-white/10 flex items-center gap-2.5"
          >
            <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
            </div>
            <span className="text-xs font-bold text-slate-100">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
