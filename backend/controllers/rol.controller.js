import db from '../config/db.js';

/**
 * Crear rol
 */
export const crearRol = async (req, res) => {
  const { nombre } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO roles (nombre) VALUES (?)`,
      [nombre]
    );

    res.status(201).json({ message: 'Rol creado', id_rol: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear rol' });
  }
};

/**
 * Listar roles
 */
export const listarRoles = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT * FROM roles ORDER BY id_rol ASC`);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al listar roles' });
  }
};

/**
 * Obtener rol por ID
 */
export const obtenerRol = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(`SELECT * FROM roles WHERE id_rol = ?`, [id]);

    if (rows.length === 0) return res.status(404).json({ message: 'Rol no encontrado' });

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener rol' });
  }
};

/**
 * Actualizar rol
 */
export const actualizarRol = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  try {
    await db.query(`UPDATE roles SET nombre = ? WHERE id_rol = ?`, [nombre, id]);
    res.json({ message: 'Rol actualizado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al actualizar rol' });
  }
};

/**
 * Eliminar rol
 */
export const eliminarRol = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(`DELETE FROM roles WHERE id_rol = ?`, [id]);
    res.json({ message: 'Rol eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al eliminar rol' });
  }
};
