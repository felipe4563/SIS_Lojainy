import React, { useEffect, useState, useRef } from "react";
import { obtenerVentas, obtenerVenta, crearVenta } from "../../../services/venta.js";
import ComprobanteVenta from "../../../components/ComprobanteVenta.jsx";

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
    try {
      const data = await obtenerVentas();
      setVentas(data);
    } finally {
      setLoading(false);
    }
  };

  const verVenta = async (id) => {
    const data = await obtenerVenta(id);
    setVentaSeleccionada(data);
  };

  const agregarProductoQR = (qrText) => {
    // Formato QR: https://dominio/id_producto/precio
    const partes = qrText.split("/");
    const id_producto = parseInt(partes[partes.length - 2]);
    const precio = parseFloat(partes[partes.length - 1]);

    if (!id_producto || !precio) return;

    setProductosEnVenta(prev => [...prev, { id_producto, precio }]);
  };

  const confirmarVenta = async () => {
  if (productosEnVenta.length === 0) return alert("No hay productos en la venta");

  const total = productosEnVenta.reduce((sum, p) => sum + Number(p.precio), 0);

  const datos = {
    metodo_pago: "efectivo",
    total,
    detalles: productosEnVenta
  };

  const res = await crearVenta(datos);
  alert("Venta creada ID: " + res.id_venta);

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
          <meta charset="utf-8" />
        </head>
        <body>
          ${contenido}
          <script>
            window.onload = function() {
              window.print();
              window.close();
            }
          </script>
        </body>
      </html>
    `);

    ventana.document.close();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Gestión de Ventas
      </h2>

      {/* AGREGAR PRODUCTOS */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Agregar producto por QR
        </h3>

        <input
          type="text"
          placeholder="Escanea o pega el QR y presiona Enter"
          className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-400"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              agregarProductoQR(e.target.value);
              e.target.value = "";
            }
          }}
        />

        <div className="max-h-60 overflow-y-auto border rounded-lg">
          <ul>
            {productosEnVenta.map((p, i) => (
              <li
                key={i}
                className="border-b py-2 px-3 flex justify-between"
              >
                <span className="text-gray-700">
                  Producto #{p.id_producto}
                </span>
                <span className="font-semibold">
                  Bs {Number(p.precio).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={confirmarVenta}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
          >
            Confirmar Venta
          </button>
        </div>
      </div>

      {/* LISTA DE VENTAS */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Lista de ventas
        </h3>

        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className="max-h-72 overflow-y-auto">
            <ul className="space-y-2">
              {ventas.map((v) => (
                <li
                  key={v.id_venta}
                  className="border rounded-lg p-3 flex justify-between items-center"
                >
                  <span className="text-gray-700">
                    ID: {v.id_venta} | Bs{" "}
                    {Number(v.total).toFixed(2)} | {v.nombre_usuario}
                  </span>
                  <button
                    onClick={() => verVenta(v.id_venta)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg"
                  >
                    Ver detalles
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* DETALLES Y COMPROBANTE */}
      {ventaSeleccionada && (
        <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
          <h4 className="text-lg font-semibold text-gray-700">
            Detalles Venta #{ventaSeleccionada.id_venta}
          </h4>

          <div className="max-h-60 overflow-y-auto border rounded-lg">
            <ul>
              {ventaSeleccionada.detalles.map((d) => (
                <li
                  key={d.id_detalle}
                  className="border-b py-2 px-3 flex justify-between items-start"
                >
                  <div>
                    <p className="font-medium">{d.nombre_producto}</p>
                    <p className="text-sm text-gray-500">
                      {d.categoria} - {d.color}
                    </p>
                  </div>
                  <span className="font-semibold">
                    Bs {Number(d.precio).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end">
            <button
              onClick={imprimirComprobante}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg"
            >
              Imprimir Comprobante
            </button>
          </div>

          {/* COMPROBANTE OCULTO */}
          <div className="hidden">
            <ComprobanteVenta ref={comprobanteRef} venta={ventaSeleccionada} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Ventas;
