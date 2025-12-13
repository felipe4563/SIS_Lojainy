import db from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { identificador, password } = req.body; // puede ser correo o ci

  try {
    const [rows] = await db.query(
      `SELECT u.*, r.nombre AS nombre_rol
       FROM usuarios u
       LEFT JOIN roles r ON u.id_rol = r.id_rol
       WHERE u.correo = ? OR u.ci = ?`,
      [identificador, identificador]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: 'Usuario no encontrado' });

    const user = rows[0];

    if (user.activo === 0) {
      return res.status(403).json({ message: 'Usuario desactivado' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: 'Contraseña incorrecta' });

    // Generar token 
    const token = jwt.sign(
      { id_usuario: user.id_usuario, id_rol: user.id_rol },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      usuario: {
        id_usuario: user.id_usuario,
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
        ci: user.ci,
        id_rol: user.id_rol,
        nombre_rol: user.nombre_rol
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
