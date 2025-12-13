import React, { forwardRef } from "react";
import logoImg from "/logo.png";

const ComprobanteVenta = forwardRef(({ venta }, ref) => {
  if (!venta) return null;

  const { id_venta, fecha, metodo_pago, total, detalles, nombre_usuario } = venta;

  return (
    <div
      ref={ref}
      className="w-[80mm] min-h-full bg-white p-4 font-sans text-xs mx-auto"
      style={{ 
        maxWidth: "80mm",
        minWidth: "80mm",
        width: "80mm"
      }}
    >
      {/* Logo centrado */}
      <div className="flex justify-center items-center mb-4">
        <img 
          src={logoImg} 
          alt="Logo" 
          className="h-16 w-auto object-contain mx-auto"
        />
      </div>

      {/* Título */}
      <div className="text-center mb-5">
        <div className="font-bold text-base uppercase tracking-widest text-gray-900 mb-1">
          COMPROBANTE DE VENTA
        </div>
        <div className="text-[10px] text-gray-600 font-semibold">
          N° {id_venta}
        </div>
      </div>

      {/* Info venta */}
      <div className="mb-5 space-y-3 bg-gradient-to-br from-gray-50 to-white p-3 rounded-lg border border-gray-200 shadow-sm">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Fecha y Hora</div>
            <div className="font-medium text-gray-900">
              {new Date(fecha).toLocaleString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Vendedor</div>
            <div className="font-medium text-gray-900 truncate">{nombre_usuario}</div>
          </div>
        </div>
        <div>
          <div className="text-[10px] font-semibold text-gray-500 uppercase mb-1">Método de Pago</div>
          <div className="flex justify-between items-center bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
            <span className="font-semibold text-blue-800">{metodo_pago}</span>
            <span className="text-blue-600 text-lg">💳</span>
          </div>
        </div>
      </div>

      {/* Tabla de productos - MEJORADA */}
      <div className="mb-5">
        {/* Encabezado de tabla mejorado */}
        <div className="flex items-center mb-2">
          <div className="h-px bg-gray-300 flex-grow"></div>
          <span className="px-3 text-xs font-bold text-gray-700 uppercase tracking-wider">Productos</span>
          <div className="h-px bg-gray-300 flex-grow"></div>
        </div>
        
        {/* Encabezado de columnas */}
        <div className="grid grid-cols-12 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-2 rounded-t-lg">
          <div className="col-span-7 font-bold text-[10px] uppercase tracking-wider pl-3">Descripción</div>
          <div className="col-span-2 font-bold text-[10px] uppercase tracking-wider text-center">Cant.</div>
          <div className="col-span-3 font-bold text-[10px] uppercase tracking-wider text-center pr-3">Precio Unit.</div>
        </div>
        
        {/* Filas de productos mejoradas */}
        <div className="border-x border-gray-300">
          {detalles.map((d, index) => (
            <div 
              key={index} 
              className={`grid grid-cols-12 items-center py-2 px-1 ${
                index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              } ${index === detalles.length - 1 ? '' : 'border-b border-gray-200'}`}
            >
              {/* Nombre del producto */}
              <div className="col-span-7 pl-3 pr-1">
                <div className="font-medium text-gray-900 text-[11px] leading-tight">
                  {d.nombre_producto}
                </div>
                <div className="text-[9px] text-gray-500 mt-0.5">
                  Código: {d.id_producto || 'N/A'}
                </div>
              </div>
              
              {/* Cantidad */}
              <div className="col-span-2 flex justify-center">
                <div className="relative">
                  <span className="bg-white border border-gray-300 text-gray-800 px-2 py-1 rounded-md text-[11px] font-bold min-w-[28px] inline-flex justify-center items-center shadow-sm">
                    {d.cantidad || 1}
                  </span>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-gray-300 rounded-full"></div>
                </div>
              </div>
              
              {/* Precio */}
              <div className="col-span-3 flex justify-end pr-3">
                <div className="text-right">
                  <div className="font-bold text-gray-900 text-[11px]">
                    Bs {Number(d.precio).toFixed(2)}
                  </div>
                  {/* Subtotal por producto */}
                  <div className="text-[9px] text-gray-600 mt-0.5">
                    Sub: Bs {Number(d.precio * (d.cantidad || 1)).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pie de tabla */}
        <div className="bg-gray-100 border-x border-b border-gray-300 rounded-b-lg p-2">
          <div className="flex justify-between items-center text-[10px] text-gray-600">
            <span className="font-medium">Total de productos:</span>
            <span className="font-bold">{detalles.length}</span>
          </div>
        </div>
      </div>

      {/* Total */}
      <div className="mb-5 p-3 bg-gradient-to-r from-green-50 to-emerald-100 border border-green-200 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="font-bold text-gray-800 text-sm">TOTAL A PAGAR</div>
            <div className="text-[10px] text-gray-600">Incluye todos los productos</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-800">Bs {Number(total).toFixed(2)}</div>
            <div className="text-[9px] text-gray-600 mt-1">
              En palabras: <span className="font-medium">Ciento veinte con 00/100 Bolivianos</span>
            </div>
          </div>
        </div>
        
        {/* Desglose del total */}
        <div className="mt-3 pt-3 border-t border-green-300 border-dashed">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-[10px]">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium text-gray-800 ml-2">Bs {Number(total).toFixed(2)}</span>
            </div>
            <div className="text-[10px] text-right">
              <span className="text-gray-600">IVA (0%):</span>
              <span className="font-medium text-gray-800 ml-2">Bs 0.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Información de contacto - Compacta */}
      <div className="mb-5">
        <div className="text-center text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">
          ¡Gracias por su compra!
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-gray-50 border border-gray-200 rounded p-2 text-center">
            <div className="text-green-600 mb-1">📱</div>
            <div className="font-semibold text-gray-800 text-[10px]">WhatsApp</div>
            <div className="text-[9px] text-gray-700 mt-1">+591 123 456 78</div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded p-2 text-center">
            <div className="text-pink-600 mb-1">📸</div>
            <div className="font-semibold text-gray-800 text-[10px]">Instagram</div>
            <div className="text-[9px] text-gray-700 mt-1">@tu_tienda_ok</div>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-blue-600 font-semibold text-[10px] mb-1">www.tutienda.com</div>
          <div className="text-[9px] text-gray-600">Av. Principal #123, Ciudad</div>
        </div>
      </div>

      {/* Mensaje final */}
      <div className="text-center border-t border-gray-300 pt-4">
        <div className="mb-3">
          <div className="inline-block bg-yellow-50 border border-yellow-300 rounded-lg px-3 py-2">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-yellow-600 text-sm">⚠️</span>
              <span className="font-bold text-[10px] text-gray-900">GUARDE SU COMPROBANTE</span>
            </div>
            <div className="text-[9px] text-gray-700">
              Para cambios, garantías o consultas. Válido por 30 días.
            </div>
          </div>
        </div>
        
        <div className="text-[8px] text-gray-500">
          <div className="border-t border-gray-300 pt-2 mt-2">
            ID: {id_venta}-{Date.now().toString().slice(-6)} • 
            Impreso: {new Date().toLocaleString('es-ES', { 
              hour: '2-digit', 
              minute: '2-digit',
              second: '2-digit'
            })} • 
            V: 2.0
          </div>
        </div>
      </div>
    </div>
  );
});

export default ComprobanteVenta;