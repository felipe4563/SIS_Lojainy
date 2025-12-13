import React, { useEffect, useState } from "react";
import { obtenerProductosVendidos, obtenerStockActual } from "../../../services/reporte.js";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Reportes = () => {
  const [productosVendidos, setProductosVendidos] = useState([]);
  const [stockActual, setStockActual] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const cargarProductosVendidos = async (start, end) => {
    try {
      const data = await obtenerProductosVendidos(start, end);
      setProductosVendidos(data);
    } catch (err) {
      console.error(err);
      alert("Error al cargar productos vendidos");
    }
  };

  const cargarStockActual = async () => {
    try {
      const data = await obtenerStockActual();
      setStockActual(data);
    } catch (err) {
      console.error(err);
      alert("Error al cargar stock");
    }
  };

  useEffect(() => {
    const hoy = new Date();
    const inicio = hoy.toISOString().slice(0, 10);
    const fin = hoy.toISOString().slice(0, 10);

    setFechaInicio(inicio);
    setFechaFin(fin);

    cargarProductosVendidos(inicio, fin);
    cargarStockActual();
  }, []);

  const exportarPDF = (titulo, columnas, datos, nombreArchivo) => {
    const doc = new jsPDF();
    doc.text(titulo, 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [columnas],
      body: datos.map(row => columnas.map(col => row[col])),
    });

    doc.save(nombreArchivo);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Reportes</h2>

      {/* Productos Vendidos */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Productos Vendidos</h3>
        <div className="flex space-x-4 mb-4">
          <input
            type="date"
            className="border p-2 rounded"
            value={fechaInicio}
            onChange={e => setFechaInicio(e.target.value)}
          />
          <input
            type="date"
            className="border p-2 rounded"
            value={fechaFin}
            onChange={e => setFechaFin(e.target.value)}
          />
          <button
            onClick={() => cargarProductosVendidos(fechaInicio, fechaFin)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 rounded"
          >
            Cargar
          </button>
          <button
            onClick={() =>
              exportarPDF(
                "Reporte de Productos Vendidos",
                ["descripcion", "categoria", "color", "talla", "cantidad_vendida", "total_vendido"],
                productosVendidos,
                "productos_vendidos.pdf"
              )
            }
            className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 rounded"
          >
            Exportar PDF
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-3 py-2 border-r">Producto</th>
                <th className="px-3 py-2 border-r">Categoría</th>
                <th className="px-3 py-2 border-r">Color</th>
                <th className="px-3 py-2 border-r">Talla</th>
                <th className="px-3 py-2 border-r">Cantidad</th>
                <th className="px-3 py-2">Total Bs</th>
              </tr>
            </thead>
            <tbody>
              {productosVendidos.map(p => (
                <tr key={p.id_producto} className="border-b border-gray-200">
                  <td className="px-3 py-2 border-r">{p.descripcion}</td>
                  <td className="px-3 py-2 border-r">{p.categoria}</td>
                  <td className="px-3 py-2 border-r">{p.color}</td>
                  <td className="px-3 py-2 border-r">{p.talla}</td>
                  <td className="px-3 py-2 border-r">{p.cantidad_vendida}</td>
                  <td className="px-3 py-2">{Number(p.total_vendido).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stock Actual */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Stock Actual</h3>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={cargarStockActual}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 rounded"
          >
            Cargar
          </button>
          <button
            onClick={() =>
              exportarPDF(
                "Reporte de Stock Actual",
                ["descripcion", "categoria", "color", "talla", "stock"],
                stockActual,
                "stock_actual.pdf"
              )
            }
            className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 rounded"
          >
            Exportar PDF
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-3 py-2 border-r">Producto</th>
                <th className="px-3 py-2 border-r">Categoría</th>
                <th className="px-3 py-2 border-r">Color</th>
                <th className="px-3 py-2 border-r">Talla</th>
                <th className="px-3 py-2">Stock</th>
              </tr>
            </thead>
            <tbody>
              {stockActual.map(p => (
                <tr key={p.id_producto} className="border-b border-gray-200">
                  <td className="px-3 py-2 border-r">{p.descripcion}</td>
                  <td className="px-3 py-2 border-r">{p.categoria}</td>
                  <td className="px-3 py-2 border-r">{p.color}</td>
                  <td className="px-3 py-2 border-r">{p.talla}</td>
                  <td className="px-3 py-2">{p.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reportes;
