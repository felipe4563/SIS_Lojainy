import api from "./api";

// Listar todas las ventas
export const obtenerVentas = async () => {
  const res = await api.get("/venta");
  return res.data;
};

// Obtener una venta por ID
export const obtenerVenta = async (id) => {
  const res = await api.get(`/venta/${id}`);
  return res.data;
};

// Crear una nueva venta
export const crearVenta = async (datos) => {
  // datos = { id_usuario, metodo_pago, total, detalles: [{id_producto, precio}, ...] }
  const res = await api.post("/venta", datos);
  return res.data;
};
