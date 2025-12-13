import api from "./api.js";

/**
 * Obtener datos del dashboard avanzado
 * Retorna totales, ventas por día, productos más vendidos, ventas por método y stock bajo
 */
export const obtenerDashboardAvanzado = async () => {
  const res = await api.get("/dashboard/avanzado");
  return res.data;
};
