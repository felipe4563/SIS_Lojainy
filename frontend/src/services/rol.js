import api from "./api";

// Listar roles
export const obtenerRoles = async () => {
  const res = await api.get("/roles");
  return res.data;
};

// Obtener rol por ID
export const obtenerRol = async (id) => {
  const res = await api.get(`/roles/${id}`);
  return res.data;
};

// Crear rol
export const crearRol = async (datos) => {
  const res = await api.post("/roles", datos);
  return res.data;
};

// Actualizar rol
export const actualizarRol = async (id, datos) => {
  const res = await api.put(`/roles/${id}`, datos);
  return res.data;
};

// Eliminar rol
export const eliminarRol = async (id) => {
  const res = await api.delete(`/roles/${id}`);
  return res.data;
};
