import api from "./api";

// Listar todos los usuarios
export const obtenerUsuarios = async () => {
  const res = await api.get("/usuarios");
  return res.data;
};

// Obtener un usuario por ID
export const obtenerUsuario = async (id) => {
  const res = await api.get(`/usuarios/${id}`);
  return res.data;
};

// Crear usuario
export const crearUsuario = async (datos) => {
  const res = await api.post("/usuarios", datos);
  return res.data;
};

// Actualizar usuario
export const actualizarUsuario = async (id, datos) => {
  const res = await api.put(`/usuarios/${id}`, datos);
  return res.data;
};

// Activar / desactivar usuario
export const toggleUsuario = async (id) => {
  const res = await api.patch(`/usuarios/toggle/${id}`);
  return res.data;
};
