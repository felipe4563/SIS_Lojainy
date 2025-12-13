import api from "./api";

// 📌 Obtener todos los productos
export const obtenerProductos = async () => {
  const res = await api.get("/productos");
  return res.data;
};

// 📌 Obtener un producto por ID
export const obtenerProducto = async (id_producto) => {
  const res = await api.get(`/productos/${id_producto}`);
  return res.data;
};

// 📌 Crear producto (QR se genera automáticamente en backend)
export const crearProducto = async (datos) => {
  const res = await api.post("/productos", datos);
  return res.data;
};

// 📌 Actualizar producto
export const actualizarProducto = async (id_producto, datos) => {
  const res = await api.put(`/productos/${id_producto}`, datos);
  return res.data;
};

// 📌 Eliminar producto
export const eliminarProducto = async (id_producto) => {
  const res = await api.delete(`/productos/${id_producto}`);
  return res.data;
};

// 📌 Subir Excel de productos
export const subirExcelProductos = async (archivo) => {
  const formData = new FormData();
  formData.append("archivo", archivo);

  const res = await api.post("/productos/excel", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
