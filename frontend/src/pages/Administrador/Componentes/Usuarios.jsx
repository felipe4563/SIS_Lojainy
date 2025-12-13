import React, { useEffect, useState } from "react";
import {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  toggleUsuario,
} from "../../../services/usuario.js";
import { obtenerRoles } from "../../../services/rol.js";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    usuario: "",
    ci: "",
    correo: "",
    password: "",
    id_rol: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Cargar usuarios
  const cargarUsuarios = async () => {
    setLoading(true);
    try {
      const data = await obtenerUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error(error);
      alert("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  // Cargar roles
  const cargarRoles = async () => {
    try {
      const data = await obtenerRoles();
      setRoles(data);
      if (!form.id_rol && data.length > 0) {
        setForm((prev) => ({ ...prev, id_rol: data[0].id_rol }));
      }
    } catch (error) {
      console.error(error);
      alert("Error al cargar roles");
    }
  };

  useEffect(() => {
    cargarUsuarios();
    cargarRoles();
  }, []);

  // Generar usuario y correo automáticamente
  useEffect(() => {
    const { nombre, apellido, ci } = form;
    if (nombre && apellido && ci.length >= 2) {
      const ultimos2CI = ci.slice(-2);
      const usuarioGenerado =
        (nombre[0] + apellido).toLowerCase().replace(/\s+/g, "") + ultimos2CI;
      setForm((prev) => ({
        ...prev,
        usuario: usuarioGenerado,
        correo: `${usuarioGenerado}@lojainy.com`,
      }));
    }
  }, [form.nombre, form.apellido, form.ci]);

  // Manejar input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Crear o actualizar usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await actualizarUsuario(editingId, form);
        setEditingId(null);
      } else {
        await crearUsuario(form);
      }
      setForm({
        nombre: "",
        apellido: "",
        usuario: "",
        ci: "",
        correo: "",
        password: "",
        id_rol: roles.length > 0 ? roles[0].id_rol : "",
      });
      cargarUsuarios();
    } catch (error) {
      console.error(error);
      alert("Error al guardar usuario");
    }
  };

  // Editar usuario
  const handleEdit = (usuario) => {
    setEditingId(usuario.id_usuario);
    setForm({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      usuario: usuario.usuario,
      ci: usuario.ci,
      correo: usuario.correo,
      password: "",
      id_rol: usuario.id_rol,
    });
  };

  // Activar / desactivar usuario
  const handleToggle = async (id) => {
    if (!window.confirm("¿Desea activar/desactivar este usuario?")) return;
    try {
      await toggleUsuario(id);
      cargarUsuarios();
    } catch (error) {
      console.error(error);
      alert("Error al cambiar estado");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 bg-white p-4 rounded shadow space-y-3"
      >
        <div className="flex space-x-2">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            name="ci"
            placeholder="CI"
            value={form.ci}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="usuario"
            placeholder="Usuario"
            value={form.usuario}
            readOnly
            className="border p-2 rounded w-full bg-gray-100"
          />
        </div>

        <div className="flex space-x-2">
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={form.correo}
            readOnly
            className="border p-2 rounded w-full bg-gray-100"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="flex space-x-2">
          {/* Select de roles dinámico */}
          <select
            name="id_rol"
            value={form.id_rol}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            {roles.map((rol) => (
              <option key={rol.id_rol} value={rol.id_rol}>
                {rol.nombre}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editingId ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>

      {/* Lista de usuarios */}
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Usuario</th>
              <th className="border p-2">Correo</th>
              <th className="border p-2">CI</th>
              <th className="border p-2">Rol</th>
              <th className="border p-2">Activo</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id_usuario} className="text-center">
                <td className="border p-2">
                  {u.nombre} {u.apellido}
                </td>
                <td className="border p-2">{u.usuario}</td>
                <td className="border p-2">{u.correo}</td>
                <td className="border p-2">{u.ci}</td>
                <td className="border p-2">{u.nombre_rol}</td>
                <td className="border p-2">{u.activo ? "Sí" : "No"}</td>
                <td className="border p-2 space-x-1">
                  <button
                    onClick={() => handleEdit(u)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleToggle(u.id_usuario)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    {u.activo ? "Desactivar" : "Activar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Usuarios;
