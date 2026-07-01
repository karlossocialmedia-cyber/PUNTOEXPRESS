import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, Trash2, MessageSquare, Plus, Minus, User, MapPin, ClipboardList, Store, CreditCard } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onAdd: (productId: string) => void;
  onRemove: (productId: string) => void;
  onClear: () => void;
  onUpdateNotes: (productId: string, notes: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onAdd,
  onRemove,
  onClear,
  onUpdateNotes,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [deliveryType, setDeliveryType] = useState<'domicilio' | 'llevar'>('domicilio');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'efectivo' | 'transferencia' | 'tarjeta'>('efectivo');
  const [changeAmount, setChangeAmount] = useState('');
  const [restaurantPhone, setRestaurantPhone] = useState('+56945485053'); // Default WhatsApp phone requested by user
  const [validationError, setValidationError] = useState('');
  const [activeNotesId, setActiveNotesId] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // Free delivery above $20, otherwise $3.00
  const isFreeDelivery = subtotal >= 20 || deliveryType !== 'domicilio';
  const deliveryCharge = deliveryType === 'domicilio' ? (subtotal >= 20 ? 0 : 3.00) : 0;
  const total = subtotal + deliveryCharge;

  // Build the WhatsApp formatted message
  const getWhatsAppLink = () => {
    if (!customerName.trim()) {
      return '#';
    }

    let typeStr = '';
    let detailsStr = '';
    if (deliveryType === 'domicilio') {
      typeStr = '🚚 *Despacho a Domicilio*';
      detailsStr = `📍 *Dirección de Entrega:* ${address.trim() || 'No especificada'}`;
    } else {
      typeStr = '🛍️ *Retiro en Local (Punto Express)*';
    }

    let payStr = '';
    if (paymentMethod === 'efectivo') {
      payStr = '💵 *Efectivo*' + (changeAmount.trim() ? ` (Paga con: $${changeAmount.trim()})` : '');
    } else if (paymentMethod === 'transferencia') {
      payStr = '📱 *Transferencia Bancaria Electrónica*';
    } else {
      payStr = '💳 *Tarjeta de Débito/Crédito (POS al entregar)*';
    }

    let itemsText = '';
    cart.forEach((item) => {
      itemsText += `• *${item.quantity}x* ${item.product.name} [_${item.product.unit}_] - _$${(item.product.price * item.quantity).toFixed(2)}_\n`;
      if (item.notes?.trim()) {
        itemsText += `   └ _Nota: ${item.notes.trim()}_\n`;
      }
    });

    const message = `🛒 *NUEVO PEDIDO - PUNTO EXPRESS* 🍎\n\n` +
      `👤 *Cliente:* ${customerName.trim()}\n` +
      `📋 *Entrega:* ${typeStr}\n` +
      (detailsStr ? `${detailsStr}\n` : '') +
      `💳 *Forma de Pago:* ${payStr}\n` +
      `\n----------------------------------\n` +
      `🛒 *Detalle de Productos:*\n${itemsText}` +
      `----------------------------------\n` +
      `💵 *Resumen del Pedido:*\n` +
      `• Subtotal: $${subtotal.toFixed(2)}\n` +
      (deliveryType === 'domicilio' ? `• Despacho: ${deliveryCharge === 0 ? '¡GRATIS!' : `$${deliveryCharge.toFixed(2)}`}\n` : '') +
      `💰 *TOTAL PEDIDO: $${total.toFixed(2)}*\n\n` +
      `¡Muchas gracias por su atención! Espero la confirmación de mi despacho. 📦`;

    const cleanPhone = restaurantPhone.replace(/[^0-9+]/g, '');
    return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
  };

  const handleCheckoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!customerName.trim()) {
      e.preventDefault();
      setValidationError('Por favor, ingresa tu nombre completo.');
      return;
    }
    if (deliveryType === 'domicilio' && !address.trim()) {
      e.preventDefault();
      setValidationError('Por favor, ingresa tu dirección para el despacho a domicilio.');
      return;
    }
    setValidationError('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950 z-40 cursor-pointer"
          />

          {/* Drawer Container */}
          <motion.div
            id="cart-drawer-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed bottom-0 inset-x-0 bg-slate-50 rounded-t-[2.5rem] shadow-2xl z-50 flex flex-col max-h-[88vh] md:max-h-[85vh] md:max-w-2xl md:mx-auto border-t border-slate-150"
          >
            {/* Grab Handle */}
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto my-3 shrink-0" />

            {/* Header */}
            <div className="px-6 pb-4 flex items-center justify-between border-b border-slate-200 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-red-50 text-red-600 rounded-xl">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-black text-slate-950">Mi Canasta de Compras</h2>
                  <p className="text-xs text-slate-400">
                    {totalItems} {totalItems === 1 ? 'producto' : 'productos'} en tu lista
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {cart.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    {showClearConfirm ? (
                      <div className="flex items-center gap-1 bg-red-50 border border-red-100 rounded-xl px-2 py-1 animate-pulse">
                        <span className="text-[10px] text-red-700 font-bold whitespace-nowrap">¿Seguro?</span>
                        <button
                          id="btn-clear-cart-confirm-yes"
                          onClick={() => {
                            onClear();
                            setShowClearConfirm(false);
                          }}
                          className="bg-red-600 hover:bg-red-700 active:scale-95 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-sm transition-all"
                        >
                          Sí
                        </button>
                        <button
                          id="btn-clear-cart-confirm-no"
                          onClick={() => setShowClearConfirm(false)}
                          className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-black px-2 py-1 rounded-lg transition-all"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        id="btn-clear-cart"
                        onClick={() => setShowClearConfirm(true)}
                        className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-extrabold px-3 py-2 rounded-xl hover:bg-red-50 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Vaciar</span>
                      </button>
                    )}
                  </div>
                )}
                <button
                  id="btn-close-cart"
                  onClick={onClose}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-950 rounded-full transition-colors"
                  aria-label="Cerrar carro"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Drawer Body - Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
              {cart.length === 0 ? (
                /* Empty Cart State */
                <div className="flex flex-col items-center justify-center text-center py-16 px-4 space-y-4">
                  <div className="relative w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-9 h-9 text-red-500 stroke-[1.5]" />
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-bold text-base">Tu carro está vacío</h3>
                    <p className="text-slate-400 text-xs mt-1 max-w-xs">
                      Explora las categorías en nuestro panel izquierdo y agrega alimentos frescos, lácteos, abarrotes y artículos para tu hogar.
                  </p>
                  </div>
                  <button
                    id="btn-add-some-food"
                    onClick={onClose}
                    className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs px-6 py-3 rounded-full shadow-md transition-all"
                  >
                    Explorar la Tienda
                  </button>
                </div>
              ) : (
                /* Active Cart Contents */
                <>
                  {/* Cart Items List */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Productos de Despensa</h4>
                    <div className="space-y-2.5">
                      {cart.map((item) => (
                        <div
                          key={item.product.id}
                          id={`cart-item-row-${item.product.id}`}
                          className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-2.5"
                        >
                          <div className="flex gap-3">
                            {/* Small image */}
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              referrerPolicy="no-referrer"
                              className="w-14 h-14 object-cover rounded-xl shrink-0"
                            />

                            {/* Item details */}
                            <div className="flex-1 min-w-0">
                              <h5 className="text-slate-900 font-bold text-sm truncate">
                                {item.product.name}
                              </h5>
                              <p className="text-[11px] text-slate-400 font-medium">Unidad de venta: {item.product.unit}</p>
                              <p className="text-red-600 text-xs font-black mt-0.5">
                                ${(item.product.price * item.quantity).toFixed(2)}
                                <span className="text-slate-400 text-[10px] font-normal"> (${item.product.price.toFixed(2)} c/u)</span>
                              </p>
                            </div>

                            {/* Quantity buttons */}
                            <div className="flex items-center bg-slate-100 rounded-xl p-0.5 self-start shrink-0">
                              <button
                                id={`cart-row-remove-${item.product.id}`}
                                onClick={() => onRemove(item.product.id)}
                                className="p-1 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors"
                              >
                                <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                              </button>
                              <span className="px-2.5 font-bold text-xs text-slate-800 text-center select-none min-w-[16px]">
                                {item.quantity}
                              </span>
                              <button
                                id={`cart-row-add-${item.product.id}`}
                                onClick={() => onAdd(item.product.id)}
                                className="p-1 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors"
                              >
                                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                              </button>
                            </div>
                          </div>

                          {/* Notes input */}
                          <div className="pt-2 border-t border-slate-50">
                            {activeNotesId === item.product.id ? (
                              <div className="flex gap-2">
                                <input
                                  id={`input-notes-${item.product.id}`}
                                  type="text"
                                  placeholder="Ej. plátanos bien verdes, huevos de color, etc..."
                                  value={item.notes || ''}
                                  onChange={(e) => onUpdateNotes(item.product.id, e.target.value)}
                                  className="flex-1 bg-slate-50 text-xs border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-red-500"
                                  autoFocus
                                />
                                <button
                                  id={`btn-save-notes-${item.product.id}`}
                                  onClick={() => setActiveNotesId(null)}
                                  className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-3 py-1.5 text-xs font-bold transition-all"
                                >
                                  Listo
                                </button>
                              </div>
                            ) : (
                              <button
                                id={`btn-toggle-notes-${item.product.id}`}
                                onClick={() => setActiveNotesId(item.product.id)}
                                className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-red-600 transition-colors"
                              >
                                <MessageSquare className="w-3.5 h-3.5 text-slate-450" />
                                <span>
                                  {item.notes ? `Nota: "${item.notes}" (Editar)` : '+ Agregar nota de producto (especificaciones)'}
                                </span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery details form */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Detalles de Entrega & Factura</h4>
                    
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label htmlFor="customer-name" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <User className="w-4 h-4 text-red-500" />
                          <span>Nombre del Cliente <span className="text-red-500">*</span></span>
                        </label>
                        <input
                          id="customer-name"
                          type="text"
                          required
                          placeholder="Ingresa tu nombre y apellido"
                          value={customerName}
                          onChange={(e) => {
                            setCustomerName(e.target.value);
                            if (e.target.value.trim()) setValidationError('');
                          }}
                          className="w-full bg-slate-50 text-sm border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-red-500 text-slate-800 font-medium"
                        />
                      </div>

                      {/* Delivery type selector pills */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <ClipboardList className="w-4 h-4 text-red-500" />
                          <span>Método de Entrega</span>
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            id="delivery-type-domicilio"
                            type="button"
                            onClick={() => {
                              setDeliveryType('domicilio');
                              setValidationError('');
                            }}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                              deliveryType === 'domicilio'
                                ? 'bg-red-50 border-red-500 text-red-700 font-extrabold shadow-sm'
                                : 'bg-slate-50 border-slate-200 text-slate-500 font-medium'
                            }`}
                          >
                            <span className="text-xl">🚚</span>
                            <span className="text-[11px] mt-1 font-bold">Envío a Domicilio</span>
                          </button>
                          
                          <button
                            id="delivery-type-llevar"
                            type="button"
                            onClick={() => {
                              setDeliveryType('llevar');
                              setValidationError('');
                            }}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                              deliveryType === 'llevar'
                                ? 'bg-red-50 border-red-500 text-red-700 font-extrabold shadow-sm'
                                : 'bg-slate-50 border-slate-200 text-slate-500 font-medium'
                            }`}
                          >
                            <span className="text-xl">🛍️</span>
                            <span className="text-[11px] mt-1 font-bold">Retiro en Minimarket</span>
                          </button>
                        </div>
                      </div>

                      {/* Conditional address input */}
                      {deliveryType === 'domicilio' && (
                        <div className="space-y-1.5 animate-fadeIn">
                          <label htmlFor="delivery-address" className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-red-500" />
                            <span>Dirección del Despacho <span className="text-red-500">*</span></span>
                          </label>
                          <input
                            id="delivery-address"
                            type="text"
                            required
                            placeholder="Calle, número, departamento o puntos de referencia"
                            value={address}
                            onChange={(e) => {
                              setAddress(e.target.value);
                              if (e.target.value.trim()) setValidationError('');
                            }}
                            className="w-full bg-slate-50 text-sm border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-red-500 text-slate-800 font-medium"
                          />
                        </div>
                      )}

                      {/* Payment Method Selector */}
                      <div className="space-y-2 pt-1">
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <CreditCard className="w-4 h-4 text-red-500" />
                          <span>Forma de Pago de tu Pedido</span>
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            id="payment-efectivo"
                            type="button"
                            onClick={() => setPaymentMethod('efectivo')}
                            className={`p-2.5 rounded-xl border text-center text-xs transition-all flex flex-col items-center gap-1 ${
                              paymentMethod === 'efectivo'
                                ? 'bg-red-50 border-red-500 text-red-700 font-extrabold shadow-sm'
                                : 'bg-slate-50 border-slate-200 text-slate-500 font-medium'
                            }`}
                          >
                            <span>💵</span>
                            <span className="text-[10px]">Efectivo</span>
                          </button>
                          <button
                            id="payment-transferencia"
                            type="button"
                            onClick={() => setPaymentMethod('transferencia')}
                            className={`p-2.5 rounded-xl border text-center text-xs transition-all flex flex-col items-center gap-1 ${
                              paymentMethod === 'transferencia'
                                ? 'bg-red-50 border-red-500 text-red-700 font-extrabold shadow-sm'
                                : 'bg-slate-50 border-slate-200 text-slate-500 font-medium'
                            }`}
                          >
                            <span>📱</span>
                            <span className="text-[10px]">Transferencia</span>
                          </button>
                          <button
                            id="payment-tarjeta"
                            type="button"
                            onClick={() => setPaymentMethod('tarjeta')}
                            className={`p-2.5 rounded-xl border text-center text-xs transition-all flex flex-col items-center gap-1 ${
                              paymentMethod === 'tarjeta'
                                ? 'bg-red-50 border-red-500 text-red-700 font-extrabold shadow-sm'
                                : 'bg-slate-50 border-slate-200 text-slate-500 font-medium'
                            }`}
                          >
                            <span>💳</span>
                            <span className="text-[10px]">Tarjeta (POS)</span>
                          </button>
                        </div>

                        {/* Cash change amount field */}
                        {paymentMethod === 'efectivo' && (
                          <div className="mt-2.5 p-3 bg-slate-50 rounded-xl border border-slate-100 animate-fadeIn space-y-1">
                            <label htmlFor="change-amount" className="text-[10px] font-bold text-slate-500 uppercase">
                              ¿Con cuánto vas a pagar? (Para llevar vuelto)
                            </label>
                            <input
                              id="change-amount"
                              type="text"
                              placeholder="Ej: $20.00, $50.00"
                              value={changeAmount}
                              onChange={(e) => setChangeAmount(e.target.value)}
                              className="w-full bg-white text-xs border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500 text-slate-700 font-medium"
                            />
                          </div>
                        )}
                      </div>


                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Sticky bottom summary and WhatsApp CTA */}
            {cart.length > 0 && (
              <div className="p-6 bg-white border-t border-slate-200 rounded-t-3xl shadow-lg shrink-0">
                {/* Price breakdown */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {deliveryType === 'domicilio' && (
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Costo de despacho</span>
                      <span>{deliveryCharge === 0 ? '¡GRATIS!' : `$${deliveryCharge.toFixed(2)}`}</span>
                    </div>
                  )}

                  {deliveryType === 'domicilio' && deliveryCharge > 0 && (
                    <p className="text-[10px] text-red-600 font-bold bg-red-50 px-2.5 py-1.5 rounded-lg border border-red-100/55">
                      💡 ¡Agrega ${(20 - subtotal).toFixed(2)} más en productos para obtener despacho GRATIS!
                    </p>
                  )}

                  <div className="flex justify-between items-end pt-2 border-t border-slate-100">
                    <span className="text-sm font-bold text-slate-800">Total a Pagar</span>
                    <span className="text-xl font-black text-slate-950">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Validation Error Banner */}
                {validationError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-3 bg-red-50 border border-red-200 text-red-600 text-xs font-bold px-3.5 py-2.5 rounded-xl flex items-center gap-2"
                  >
                    <span>⚠️</span>
                    <span>{validationError}</span>
                  </motion.div>
                )}

                {/* WhatsApp button */}
                <a
                  id="btn-whatsapp-submit"
                  href={getWhatsAppLink()}
                  onClick={handleCheckoutClick}
                  target="_top"
                  className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-white font-extrabold text-sm py-4 rounded-2xl shadow-md transition-all duration-300"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.852.002-2.63-1.023-5.101-2.887-6.963C16.48 1.93 14.015.912 11.397.912 5.961.912 1.537 5.332 1.533 10.765c-.001 1.674.453 3.311 1.311 4.757l-.97 3.543 3.635-.953c1.439.784 2.977 1.196 4.548 1.198zM17.16 14.4c-.284-.141-1.68-.83-1.94-.925-.26-.095-.45-.141-.64.141-.19.283-.735.925-.9 1.114-.166.189-.332.213-.616.072-2.822-1.41-3.905-2.03-5.464-4.704-.156-.268-.156-.431-.012-.575.13-.13.284-.33.427-.496.142-.166.19-.284.284-.473.095-.19.047-.355-.024-.496-.071-.141-.64-1.54-.876-2.11-.23-.554-.464-.48-.64-.489-.166-.008-.356-.01-.546-.01-.19 0-.5.07-.76.355-.26.284-.996.973-.996 2.37s1.019 2.747 1.162 2.937c.142.189 2.004 3.06 4.855 4.285.678.292 1.208.466 1.621.597.681.217 1.3.187 1.79.114.545-.081 1.68-.686 1.917-1.348.237-.662.237-1.23.166-1.348-.07-.118-.26-.189-.544-.33z"/>
                  </svg>
                  <span>Enviar Pedido por WhatsApp (+56945485053)</span>
                </a>
                <p className="text-[10px] text-center text-slate-450 mt-2.5 leading-normal">
                  Se generará tu lista de compras ordenada para enviar directamente a la sucursal de <strong>Punto Express</strong>.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
