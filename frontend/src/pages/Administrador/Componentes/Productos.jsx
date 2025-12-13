// src/pages/Productos.jsx
import React, { useEffect, useState } from "react";
import { 
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  subirExcelProductos 
} from "../../../services/producto.js";
import EtiquetaQR from "../../../components/EtiquetaQr.jsx";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    categoria: "",
    color: "",
    talla: "",
    precio: "",
    descripcion: "",
    stock: 1
  });
  const [editingId, setEditingId] = useState(null);
  const [archivoExcel, setArchivoExcel] = useState(null);

  const cargarProductos = async () => {
    setLoading(true);
    try {
      const data = await obtenerProductos();
      setProductos(data);
    } catch (error) {
      console.error(error);
      alert("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await actualizarProducto(editingId, form);
        setEditingId(null);
      } else {
        await crearProducto(form);
      }
      setForm({ categoria: "", color: "", talla: "", precio: "", descripcion: "", stock: 1 });
      cargarProductos();
    } catch (error) {
      console.error(error);
      alert("Error al guardar producto");
    }
  };

  const handleEdit = (prod) => {
    setEditingId(prod.id_producto);
    setForm({
      categoria: prod.categoria,
      color: prod.color,
      talla: prod.talla,
      precio: prod.precio,
      descripcion: prod.descripcion,
      stock: prod.stock
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Desea eliminar este producto?")) return;
    try {
      await eliminarProducto(id);
      cargarProductos();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar producto");
    }
  };

  const handleUploadExcel = async () => {
    if (!archivoExcel) return alert("Seleccione un archivo Excel");
    try {
      await subirExcelProductos(archivoExcel);
      setArchivoExcel(null);
      cargarProductos();
      alert("Productos subidos correctamente");
    } catch (error) {
      console.error(error);
      alert("Error al subir Excel");
    }
  };

  // Función simplificada para imprimir QR
// Función simplificada para imprimir QR
const imprimirQR = (producto) => {
  if (!producto.codigo_qr) {
    alert("Este producto no tiene código QR");
    return;
  }
  
  // Crear una nueva ventana para imprimir
  const printWindow = window.open('', '_blank');
  
  // Construir el contenido HTML para imprimir
  const printContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>QR Producto ${producto.id_producto}</title>
        <style>
          @page {
            size: 40mm 40mm;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 0;
            width: 40mm;
            height: 40mm;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: white;
            font-family: Arial, sans-serif;
          }
          .qr-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
          }
          .qr-image {
            width: 35mm;
            height: 35mm;
            object-fit: contain;
          }
          .precio {
            margin-top: -2mm;
            font-size: 12px;
            font-weight: bold;
            color: #000;
            text-align: center;
          }
          
          /* Estilos para modo de impresión */
          @media print {
            body {
              margin: 0 !important;
              padding: 0 !important;
            }
            .no-print {
              display: none !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="qr-container">
          <img src="${import.meta.env.VITE_APP_DOMAIN}/uploads/${producto.codigo_qr}" 
               class="qr-image"
               alt="QR Producto ${producto.id_producto}"
               onload="setTimeout(() => { window.print(); window.close(); }, 300)" />
          <div class="precio">Bs ${parseFloat(producto.precio).toFixed(2)}</div>
        </div>
        <div class="no-print" style="position: fixed; top: 10px; left: 10px; background: #f0f0f0; padding: 10px; border-radius: 5px;">
          <p>Preparando impresión...</p>
          <button onclick="window.print()" style="padding: 5px 10px; background: #007bff; color: white; border: none; border-radius: 3px; cursor: pointer;">
            Imprimir Manualmente
          </button>
          <button onclick="window.close()" style="padding: 5px 10px; background: #dc3545; color: white; border: none; border-radius: 3px; cursor: pointer; margin-left: 10px;">
            Cancelar
          </button>
        </div>
      </body>
    </html>
  `;
  
  // Escribir el contenido en la ventana
  printWindow.document.write(printContent);
  printWindow.document.close();
  
  // Enfocar la ventana
  printWindow.focus();
};

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Productos</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow space-y-3">
        <div className="flex space-x-2">
          <input 
            type="text" 
            name="categoria" 
            placeholder="Categoría" 
            value={form.categoria} 
            onChange={handleChange} 
            className="border p-2 rounded w-full" 
            required 
          />
          <input 
            type="text" 
            name="color" 
            placeholder="Color" 
            value={form.color} 
            onChange={handleChange} 
            className="border p-2 rounded w-full" 
            required 
          />
        </div>
        <div className="flex space-x-2">
          <input 
            type="text" 
            name="talla" 
            placeholder="Talla" 
            value={form.talla} 
            onChange={handleChange} 
            className="border p-2 rounded w-full" 
            required 
          />
          <input 
            type="number" 
            name="precio" 
            placeholder="Precio" 
            value={form.precio} 
            onChange={handleChange} 
            className="border p-2 rounded w-full" 
            required 
            step="0.01"
            min="0"
          />
        </div>
        <div className="flex space-x-2">
          <input 
            type="text" 
            name="descripcion" 
            placeholder="Descripción" 
            value={form.descripcion} 
            onChange={handleChange} 
            className="border p-2 rounded w-full" 
          />
          <input 
            type="number" 
            name="stock" 
            placeholder="Stock" 
            value={form.stock} 
            onChange={handleChange} 
            className="border p-2 rounded w-full" 
            min="1" 
          />
        </div>
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          {editingId ? "Actualizar" : "Crear"}
        </button>
        {editingId && (
          <button 
            type="button" 
            onClick={() => {
              setEditingId(null);
              setForm({ categoria: "", color: "", talla: "", precio: "", descripcion: "", stock: 1 });
            }}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Cancelar
          </button>
        )}
      </form>

      {/* Subir Excel */}
      <div className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Importar desde Excel</h2>
        <div className="flex items-center">
          <input 
            type="file" 
            accept=".xlsx, .xls, .csv" 
            onChange={(e) => setArchivoExcel(e.target.files[0])}
            className="border p-2 rounded flex-grow"
          />
          <button 
            onClick={handleUploadExcel} 
            className="bg-green-500 text-white px-4 py-2 rounded ml-2 hover:bg-green-600 transition-colors"
            disabled={!archivoExcel}
          >
            Subir Excel
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Formatos soportados: .xlsx, .xls, .csv
        </p>
      </div>

      {/* Tabla de productos */}
      <div className="bg-white rounded shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <p className="text-lg">Cargando productos...</p>
            <div className="mt-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            </div>
          </div>
        ) : productos.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-lg text-gray-500">No hay productos registrados</p>
            <p className="text-sm text-gray-400">Comienza creando tu primer producto</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">Categoría</th>
                  <th className="border p-3 text-left">Color</th>
                  <th className="border p-3 text-left">Talla</th>
                  <th className="border p-3 text-left">Precio</th>
                  <th className="border p-3 text-left">Stock</th>
                  <th className="border p-3 text-left">QR</th>
                  <th className="border p-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(p => (
                  <tr key={p.id_producto} className="hover:bg-gray-50">
                    <td className="border p-3">{p.categoria}</td>
                    <td className="border p-3">{p.color}</td>
                    <td className="border p-3">{p.talla}</td>
                    <td className="border p-3">Bs {parseFloat(p.precio).toFixed(2)}</td>
                    <td className="border p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${p.stock > 10 ? 'bg-green-100 text-green-800' : p.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {p.stock} unidades
                      </span>
                    </td>
                    <td className="border p-3">
                      {p.codigo_qr ? (
                        <div className="flex flex-col items-center">
                          <img 
                            src={`${import.meta.env.VITE_APP_DOMAIN}/uploads/${p.codigo_qr}`} 
                            alt="QR" 
                            className="w-16 h-16 border rounded"
                          />
                          <span className="text-xs text-gray-500 mt-1">Código: {p.id_producto}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">Sin QR</span>
                      )}
                    </td>
                    <td className="border p-3">
                      <div className="flex flex-wrap gap-2">
                        <button 
                          onClick={() => handleEdit(p)} 
                          className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition-colors"
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => handleDelete(p.id_producto)} 
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                        >
                          Eliminar
                        </button>
                        {p.codigo_qr && (
                          <button 
                            onClick={() => imprimirQR(p)} 
                            className="bg-blue-700 text-white px-3 py-1 rounded text-sm hover:bg-blue-800 transition-colors flex items-center"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            Imprimir QR
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Información de resumen */}
      {productos.length > 0 && !loading && (
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-4">
          <p className="text-blue-800">
            <span className="font-semibold">Total de productos:</span> {productos.length} | 
            <span className="ml-4 font-semibold">En stock:</span> {productos.filter(p => p.stock > 0).length} | 
            <span className="ml-4 font-semibold">Agotados:</span> {productos.filter(p => p.stock === 0).length}
          </p>
        </div>
      )}
    </div>
  );
};

export default Productos;