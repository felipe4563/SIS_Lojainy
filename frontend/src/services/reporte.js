import api from "./api.js";

/**
 * Obtener productos vendidos en un rango de fecha
 * @param {string} start - fecha inicio (YYYY-MM-DD)
 * @param {string} end - fecha fin (YYYY-MM-DD)
 */
export const obtenerProductosVendidos = async (start, end) => {
  const res = await api.get("/reportes/productos-vendidos", {
    params: { start, end }
  });
  return res.data;
};

/**
 * Obtener stock actual
 */
export const obtenerStockActual = async () => {
  const res = await api.get("/reportes/stock");
  return res.data;
};
