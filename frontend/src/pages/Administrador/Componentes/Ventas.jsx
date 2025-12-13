import React, { useEffect, useState, useRef } from "react";
import { obtenerVentas, obtenerVenta, crearVenta } from "../../../services/venta.js";
import ComprobanteVenta from "../../../components/ComprobanteVenta.jsx"; // Componente del comprobante

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productosEnVenta, setProductosEnVenta] = useState([]);
  const comprobanteRef = useRef();

  useEffect(() => {
    cargarVentas();
  }, []);

  const cargarVentas = async () => {
    setLoading(true);
    const data = await obtenerVentas();
    setVentas(data);
    setLoading(false);
  };

  const verVenta = async (id) => {
    const data = await obtenerVenta(id);
    setVentaSeleccionada(data);
  };

  const agregarProductoQR = (qrText) => {
    // qrText = https://dominio/id_producto/precio
    const partes = qrText.split('/');
    const id_producto = parseInt(partes[partes.length - 2]);
    const precio = parseFloat(partes[partes.length - 1]);

    setProductosEnVenta(prev => [...prev, { id_producto, precio }]);
  };

  const confirmarVenta = async () => {
    if (productosEnVenta.length === 0) return alert("No hay productos");

    const total = productosEnVenta.reduce((sum, p) => sum + Number(p.precio), 0);
    const datos = {
      id_usuario: 1, // Cambiar al usuario logueado
      metodo_pago: "efectivo",
      total,
      detalles: productosEnVenta
    };

    const res = await crearVenta(datos);
    alert("Venta creada ID: " + res.id_venta);

    // Cargar la venta creada para el comprobante
    await verVenta(res.id_venta);

    setProductosEnVenta([]);
    cargarVentas();
  };

  const imprimirComprobante = () => {
    if (!ventaSeleccionada) return;
    const contenido = comprobanteRef.current.innerHTML;
    const ventana = window.open("", "_blank");
    ventana.document.write(`
      <html>
        <head>
          <title>Comprobante de Venta</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .comprobante { max-width: 400px; margin: auto; }
            .border { border-bottom: 1px solid #ccc; padding: 5px 0; }
            .total { font-weight: bold; font-size: 1.2em; margin-top: 10px; }
          </style>
        </head>
        <body>
          ${contenido}
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    ventana.document.close();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center">Gestión de Ventas</h2>

      {/* Sección de agregar productos */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Agregar producto por QR</h3>
        <input
          type="text"
          placeholder="Escanea o pega el QR y presiona Enter"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyDown={e => {
            if (e.key === "Enter") agregarProductoQR(e.target.value);
          }}
        />
        <div className="max-h-60 overflow-y-auto mb-4 border border-gray-100 rounded-lg">
          <ul>
            {productosEnVenta.map((p, i) => (
              <li key={i} className="border-b last:border-b-0 py-2 px-3 flex justify-between items-center">
                <span className="text-gray-700">Producto ID: {p.id_producto}</span>
                <span className="font-semibold text-gray-800">Bs {Number(p.precio).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end">
          <button
            onClick={confirmarVenta}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition"
          >
            Confirmar Venta
          </button>
        </div>
      </div>

      {/* Lista de ventas */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Lista de ventas</h3>
        {loading ? (
          <p className="text-gray-500">Cargando...</p>
        ) : (
          <div className="max-h-72 overflow-y-auto">
            <ul className="space-y-2">
              {ventas.map(v => (
                <li
                  key={v.id_venta}
                  className="border border-gray-100 rounded-lg p-3 flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <span className="text-gray-700">
                    ID: {v.id_venta} - Total: <span className="font-semibold">Bs {v.total ? Number(v.total).toFixed(2) : "0.00"}</span> - Usuario: {v.nombre_usuario}
                  </span>
                  <button
                    onClick={() => verVenta(v.id_venta)}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 rounded-lg transition"
                  >
                    Ver detalles
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Detalles y comprobante de la venta seleccionada */}
      {ventaSeleccionada && (
        <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
          <h4 className="text-lg font-semibold mb-2 text-gray-700">Detalles Venta ID: {ventaSeleccionada.id_venta}</h4>
          <div className="max-h-60 overflow-y-auto border border-gray-100 rounded-lg">
            <ul>
              {ventaSeleccionada.detalles.map(d => (
                <li key={d.id_detalle} className="border-b last:border-b-0 py-2 px-3 flex justify-between items-center">
                  <span className="text-gray-700">{d.nombre_producto}</span>
                  <span className="font-semibold text-gray-800">Bs {d.precio ? Number(d.precio).toFixed(2) : "0.00"}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={imprimirComprobante}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition"
            >
              Imprimir Comprobante
            </button>
          </div>

          {/* Comprobante oculto para impresión */}
          <div className="hidden">
            <ComprobanteVenta ref={comprobanteRef} venta={ventaSeleccionada} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Ventas;
