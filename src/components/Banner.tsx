import React from 'react';
import { motion } from 'motion/react';
import { Clock, MapPin, Sparkles, Star, Store } from 'lucide-react';
import { HERO_BANNER_IMAGE } from '../data';

export const Banner: React.FC = () => {
  return (
    <motion.div
      id="welcome-banner"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full overflow-hidden bg-slate-900 text-white rounded-b-[2.5rem] shadow-xl md:rounded-3xl md:mt-4 md:max-w-5xl md:mx-auto"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={HERO_BANNER_IMAGE}
          alt="Banner Minimarket Punto Express"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-50 scale-105 filter saturate-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-950/40" />
      </div>

      {/* Banner Content */}
      <div className="relative z-10 px-6 pt-24 pb-8 md:p-12 flex flex-col justify-end min-h-[300px] md:min-h-[360px]">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
            <span className="w-2 h-2 rounded-full bg-white inline-block animate-ping"></span>
            Abierto 24/7 online
          </span>
          <span className="inline-flex items-center gap-1 bg-white text-slate-900 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md">
            <Star className="w-3.5 h-3.5 fill-current text-red-600 text-red-600" />
            Minimarket de Confianza
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5.5xl font-black tracking-tight leading-none text-white flex items-center gap-3">
          <span>PUNTO</span>
          <span className="text-red-500 bg-white px-3 py-0.5 rounded-2xl transform -rotate-1 inline-block shadow-lg text-3xl md:text-5xl">EXPRESS</span>
        </h1>
        <p className="text-xs md:text-sm text-slate-200 font-medium max-w-xl mt-3 leading-relaxed">
          Tu despensa completa a un clic de distancia. Frutas, verduras, carnes, lácteos de campo, panadería recién horneada y artículos de aseo con envío ultra rápido.
        </p>

        {/* Delivery Details */}
        <div className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-white/10 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/10 rounded-xl">
              <Clock className="w-4 h-4 text-red-500" />
            </div>
            <div>
              <p className="text-white font-black">Despacho en</p>
              <p className="text-slate-400 text-[11px]">30 - 60 minutos</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/10 rounded-xl">
              <MapPin className="w-4 h-4 text-red-500" />
            </div>
            <div>
              <p className="text-white font-black">Envío Gratis</p>
              <p className="text-slate-400 text-[11px]">En compras sobre $20</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px] font-black text-red-500 tracking-wider uppercase bg-white py-1.5 px-3.5 rounded-full shadow-lg">
        <Store className="w-3.5 h-3.5 text-red-600" />
        Sabor y Frescura
      </div>
    </motion.div>
  );
};
