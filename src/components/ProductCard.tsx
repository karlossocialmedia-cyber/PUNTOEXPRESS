import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Plus, Minus, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onAdd: () => void;
  onRemove: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantityInCart,
  onAdd,
  onRemove,
}) => {
  const [isBouncing, setIsBouncing] = React.useState(false);
  const prevQuantityRef = React.useRef(quantityInCart);

  React.useEffect(() => {
    if (quantityInCart > prevQuantityRef.current) {
      setIsBouncing(true);
      const timer = setTimeout(() => setIsBouncing(false), 400);
      return () => clearTimeout(timer);
    }
    prevQuantityRef.current = quantityInCart;
  }, [quantityInCart]);

  return (
    <motion.div
      id={`product-card-${product.id}`}
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={
        isBouncing
          ? { scale: [1, 1.04, 0.97, 1.01, 1], opacity: 1, y: 0 }
          : { scale: 1, opacity: 1, y: 0 }
      }
      exit={{ opacity: 0, y: -15 }}
      transition={
        isBouncing
          ? { duration: 0.4, ease: "easeInOut" }
          : { duration: 0.3 }
      }
      className="relative flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
    >
      {/* Popular Badge / Oferta */}
      {product.popular && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider">
          <Star className="w-3 h-3 fill-current text-amber-300" />
          <span>Popular</span>
        </div>
      )}

      {/* Product Image */}
      <div className="relative w-full aspect-video overflow-hidden bg-slate-50">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-40" />
      </div>

      {/* Card Content */}
      <div className="flex-1 flex flex-col p-4">
        <div className="flex-1">
          <span className="text-red-600 text-[10px] font-black tracking-wider uppercase">
            {product.category}
          </span>
          <h3 className="text-slate-900 font-extrabold text-base mt-0.5 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-slate-500 text-xs mt-1 leading-relaxed line-clamp-3">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
          {/* Price & Unit */}
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Precio / {product.unit}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-slate-950">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">x {product.unit}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center">
            {quantityInCart > 0 ? (
              <motion.div 
                className="flex items-center bg-red-600 text-white rounded-full p-0.5 shadow-sm border border-red-700"
                layout
              >
                <button
                  id={`btn-remove-${product.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                  }}
                  className="p-1.5 hover:bg-red-700 active:scale-90 rounded-full transition-colors"
                  aria-label="Disminuir cantidad"
                >
                  <Minus className="w-4 h-4 stroke-[2.5]" />
                </button>
                <span className="px-3 font-bold text-sm min-w-[20px] text-center select-none">
                  {quantityInCart}
                </span>
                <button
                  id={`btn-add-more-${product.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd();
                  }}
                  className="p-1.5 hover:bg-red-700 active:scale-90 rounded-full transition-colors"
                  aria-label="Aumentar cantidad"
                >
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </button>
              </motion.div>
            ) : (
              <button
                id={`btn-add-${product.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd();
                }}
                className="flex items-center gap-1.5 bg-slate-900 hover:bg-red-600 active:scale-95 text-white font-extrabold text-xs px-4 py-2.5 rounded-full shadow-sm transition-all duration-300 group"
              >
                <ShoppingCart className="w-3.5 h-3.5 stroke-[2.5] group-hover:scale-110 transition-transform duration-300" />
                <span>Agregar</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
