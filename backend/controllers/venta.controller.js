import db from '../config/db.js';

/**
 * Crear venta con detalles
 */
export const crearVenta = async (req, res) => {
  const { metodo_pago, total, detalles } = req.body;
  const id_usuario = req.user.id_usuario; // Obtenemos del token

  const METODOS_VALIDOS = ['efectivo', 'qr'];
  if (!METODOS_VALIDOS.includes(metodo_pago)) {
  return res.status(400).json({ message: 'Método de pago inválido' });
  }

  if (!Array.isArray(detalles) || detalles.length === 0) {
    return res.status(400).json({ message: "Debe enviar al menos un producto" });
  }

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // Insertar venta
    const [ventaResult] = await conn.query(
      `INSERT INTO ventas (id_usuario, metodo_pago, total) VALUES (?, ?, ?)`,
      [id_usuario, metodo_pago, total]
    );

    const id_venta = ventaResult.insertId;

    // Insertar detalle de venta y reducir stock
    for (let item of detalles) {
      const { id_producto, precio } = item;
      await conn.query(
        `INSERT INTO detalle_venta (id_venta, id_producto, precio) VALUES (?, ?, ?)`,
        [id_venta, id_producto, precio]
      );

      await conn.query(
        `UPDATE productos SET stock = stock - 1 WHERE id_producto = ?`,
        [id_producto]
      );
    }

    await conn.commit();
    res.status(201).json({ message: 'Venta registrada', id_venta });
  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).json({ message: 'Error al crear venta' });
  } finally {
    conn.release();
  }
};


/**
 * Listar ventas
 */
export const listarVentas = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario; // Obtenemos del token

    const [ventas] = await db.query(`
      SELECT v.id_venta, v.id_usuario, v.fecha, v.metodo_pago, v.total, u.nombre AS nombre_usuario
      FROM ventas v
      LEFT JOIN usuarios u ON v.id_usuario = u.id_usuario
      WHERE v.id_usuario = ?
      ORDER BY v.id_venta DESC
    `, [id_usuario]);

    res.json(ventas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al listar ventas' });
  }
};


/**
 * Obtener venta por ID con detalles
 */
export const obtenerVenta = async (req, res) => {
  const { id } = req.params;

  try {
    const [ventas] = await db.query(
      `SELECT v.id_venta, v.id_usuario, v.fecha, v.metodo_pago, v.total, u.nombre AS nombre_usuario
       FROM ventas v
       LEFT JOIN usuarios u ON v.id_usuario = u.id_usuario
       WHERE v.id_venta = ?`,
      [id]
    );

    if (ventas.length === 0) return res.status(404).json({ message: 'Venta no encontrada' });

    const venta = ventas[0];

    const [detalles] = await db.query(
    `SELECT 
      dv.id_detalle,
      dv.id_producto,
      p.descripcion AS nombre_producto,
      p.categoria,
      p.color,
      dv.precio
   FROM detalle_venta dv
   LEFT JOIN productos p ON dv.id_producto = p.id_producto
   WHERE dv.id_venta = ?`,
  [id]
);

    venta.detalles = detalles;

    res.json(venta);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener venta' });
  }
};
