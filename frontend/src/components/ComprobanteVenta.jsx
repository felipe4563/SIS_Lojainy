import React, { forwardRef } from "react";
import logoImg from "/logo.png";

const ComprobanteVenta = forwardRef(({ venta }, ref) => {
  if (!venta) return null;

  const {
    id_venta,
    fecha,
    metodo_pago,
    total,
    detalles = [],
    nombre_usuario
  } = venta;

  // Datos de redes sociales
  const redesSociales = {
    instagram: "@lojainy.tienda",
    tiktok: "@lojainy.oficial",
    whatsapp: "+591 123 456 78"
  };

  // Formatear fecha
  const formatearFecha = (fechaString) => {
    return new Date(fechaString).toLocaleString('es-BO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Formatear moneda
  const formatearMoneda = (valor) => `Bs ${Number(valor).toFixed(2)}`;

  return (
    <div ref={ref} className="print-container">
      <style jsx>{`
        @media print {
          @page { size: 80mm auto; margin: 0; padding: 0; }
          body * { visibility: hidden; }
          .ticket-container, .ticket-container * { visibility: visible; }
          .ticket-container { position: absolute; left: 0; top: 0; width: 80mm; }
          * { color: #000 !important; background-color: transparent !important; }
        }

        .ticket-container {
          font-family: 'Courier New', monospace;
          width: 80mm; padding: 5mm;
          box-sizing: border-box; color: #000; background: #fff;
        }

        .header { text-align: center; margin-bottom: 8px; }
        .logo { width: 70px; display: block; margin: 0 auto 4px; }
        .title { font-size: 15px; font-weight: 900; margin: 4px 0; text-transform: uppercase; }
        .subtitle { font-size: 11px; font-weight: bold; margin-bottom: 8px; border-bottom: 1px solid #000; padding-bottom: 4px; display: inline-block; }
        .divider { border-top: 2px solid #000; margin: 10px 0; width: 100%; }
        .light-divider { border-top: 1px dashed #333; margin: 6px 0; }

        .info-section { font-size: 11px; line-height: 1.4; margin-bottom: 10px; }
        .info-row { display: flex; justify-content: space-between; margin-bottom: 3px; }
        .info-label { font-weight: bold; min-width: 40%; }
        .info-value { text-align: right; flex: 1; }

        .products-table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 11px; }
        .products-table th { text-align: left; padding: 4px 0; border-bottom: 2px solid #000; font-weight: 900; background-color: #f0f0f0; }
        .products-table td { padding: 2px 0; border-bottom: 1px solid #ddd; vertical-align: top; }
        .product-name { width: 55%; font-weight: 500; }
        .product-info { font-size: 9px; color: #555; }
        .product-qty { width: 10%; text-align: right; }
        .product-price { width: 35%; text-align: right; font-weight: 600; }

        .total-section { margin-top: 12px; padding-top: 10px; }
        .total-row { display: flex; justify-content: space-between; font-weight: 900; font-size: 15px; border-top: 3px double #000; padding-top: 8px; }

        .redes-sociales { margin-top: 12px; padding-top: 8px; text-align: center; border-top: 1px dashed #000; }
        .redes-title { font-size: 10px; font-weight: bold; margin-bottom: 6px; text-transform: uppercase; }
        .redes-item { font-size: 9px; margin-bottom: 3px; display: flex; justify-content: center; gap: 5px; }
        .footer { text-align: center; font-size: 9px; margin-top: 12px; padding-top: 8px; border-top: 1px dashed #333; line-height: 1.3; }
        .footer-message { font-weight: bold; margin-bottom: 5px; }
        .print-info { font-size: 8px; font-style: italic; color: #555; }
      `}</style>

      <div className="ticket-container">
        <div className="header">
          <img src={logoImg} alt="Logo LOJAINY" className="logo"/>
          <h1 className="title">LOJAINY</h1>
          <div className="subtitle">COMPROBANTE DE VENTA</div>
        </div>

        <div className="divider"></div>

        <div className="info-section">
          <div className="info-row">
            <span className="info-label">N° VENTA:</span>
            <span className="info-value">#{id_venta.toString().padStart(6,'0')}</span>
          </div>
          <div className="info-row">
            <span className="info-label">FECHA Y HORA:</span>
            <span className="info-value">{formatearFecha(fecha)}</span>
          </div>
          <div className="info-row">
            <span className="info-label">ATENDIDO POR:</span>
            <span className="info-value">{nombre_usuario.toUpperCase()}</span>
          </div>
          <div className="info-row">
            <span className="info-label">FORMA DE PAGO:</span>
            <span className="info-value">{metodo_pago.toUpperCase()}</span>
          </div>
        </div>

        <div className="light-divider"></div>

        <table className="products-table">
          <thead>
            <tr>
              <th className="product-name">PRODUCTO</th>
              <th className="product-qty">CANT.</th>
              <th className="product-price">SUBTOTAL</th>
            </tr>
          </thead>
          <tbody>
            {detalles.map((detalle, index) => (
              <tr key={`${detalle.id_producto}-${index}`}>
                <td className="product-name">
                  {detalle.nombre_producto}
                  <div className="product-info">
                    {detalle.categoria} - {detalle.color}
                  </div>
                </td>
                <td className="product-qty">{detalle.cantidad || 1}</td>
                <td className="product-price">{formatearMoneda(detalle.precio * (detalle.cantidad || 1))}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="light-divider"></div>

        <div className="total-section">
          <div className="total-row">
            <span>TOTAL A PAGAR</span>
            <span>{formatearMoneda(total)}</span>
          </div>
        </div>

        <div className="divider"></div>

        <div className="redes-sociales">
          <div className="redes-title">Síguenos en nuestras redes</div>
          <div className="redes-item">📱 WhatsApp: {redesSociales.whatsapp}</div>
          <div className="redes-item">📸 Instagram: {redesSociales.instagram}</div>
          <div className="redes-item">🎵 TikTok: {redesSociales.tiktok}</div>
        </div>

        <div className="light-divider"></div>

        <div className="footer">
          <div className="footer-message">¡Gracias por su compra!</div>
          <div>Visítenos nuevamente</div>
          <div className="print-info">Comprobante emitido: {new Date().toLocaleString('es-BO')}</div>
          <div style={{ fontSize: '7px', marginTop: '4px' }}>
            Este documento es un comprobante de venta no válido como factura
          </div>
        </div>
      </div>
    </div>
  );
});

ComprobanteVenta.displayName = "ComprobanteVenta";

export default ComprobanteVenta;
