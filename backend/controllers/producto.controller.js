import db from "../config/db.js";
import xlsx from "xlsx";
import QRCode from "qrcode";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ==========================
// 📌 LISTAR PRODUCTOS
// ==========================
export const listarProductos = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM productos ORDER BY id_producto DESC");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al listar productos" });
  }
};

// ==========================
// 📌 OBTENER PRODUCTO POR ID
// ==========================
export const obtenerProducto = async (req, res) => {
  const { id_producto } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM productos WHERE id_producto = ?", [id_producto]);
    if (rows.length === 0) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener producto" });
  }
};

// ==========================
// 📌 CREAR PRODUCTO CON QR
// ==========================
export const crearProducto = async (req, res) => {
  const { categoria, color, talla, precio, descripcion, stock = 1 } = req.body;

  try {
    // Insertar primero el producto sin QR
    const [result] = await db.query(
      `INSERT INTO productos (categoria, color, talla, precio, descripcion, stock)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [categoria, color, talla, precio, descripcion, stock]
    );

    const id_producto = result.insertId;

    // Leer dominio desde .env
    const dominio = process.env.DOMINIO || "https://www.lojainy.com";

    // Texto para QR: DOMINIO/ID_PRODUCTO/PRECIO
    const qrText = `${dominio}/${id_producto}/${precio}`;

    // Nombre y ruta del archivo QR
    const qrFileName = `qr_${id_producto}.png`;
    const qrPath = path.join(__dirname, '../uploads', qrFileName);

    // Crear QR y guardar PNG
    await QRCode.toFile(qrPath, qrText, { width: 300 });

    // Actualizar producto con el nombre del QR
    await db.query(
      `UPDATE productos SET codigo_qr = ? WHERE id_producto = ?`,
      [qrFileName, id_producto]
    );

    res.status(201).json({ 
      message: "Producto creado", 
      id_producto, 
      qr: qrFileName 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear producto" });
  }
};

// ==========================
// 📌 ACTUALIZAR PRODUCTO
// ==========================
export const actualizarProducto = async (req, res) => {
  const { id_producto } = req.params;
  const { categoria, color, talla, precio, descripcion, stock } = req.body;

  try {
    await db.query(
      `UPDATE productos
       SET categoria=?, color=?, talla=?, precio=?, descripcion=?, stock=?
       WHERE id_producto=?`,
      [categoria, color, talla, precio, descripcion, stock, id_producto]
    );

    res.json({ message: "Producto actualizado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar producto" });
  }
};

// ==========================
// 📌 ELIMINAR PRODUCTO
// ==========================
export const eliminarProducto = async (req, res) => {
  const { id_producto } = req.params;

  try {
    // Primero obtener el QR para eliminar archivo
    const [rows] = await db.query("SELECT codigo_qr FROM productos WHERE id_producto=?", [id_producto]);
    if (rows.length > 0 && rows[0].codigo_qr) {
      const qrPath = path.join('uploads', rows[0].codigo_qr);
      if (fs.existsSync(qrPath)) fs.unlinkSync(qrPath);
    }

    await db.query("DELETE FROM productos WHERE id_producto=?", [id_producto]);
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar producto" });
  }
};

// ==========================
// 📌 SUBIR PRODUCTOS DESDE EXCEL
// ==========================
export const subirExcelProductos = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Archivo no enviado" });

    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    for (let row of data) {
      const { categoria, color, talla, precio, descripcion, stock } = row;

      // Generar QR automáticamente
      const qrText = `${categoria}-${color}-${talla}-${Date.now()}`;
      const qrFileName = `qr_${Date.now()}.png`;
      const qrPath = path.join('uploads', qrFileName);
      await QRCode.toFile(qrPath, qrText, { width: 300 });

      // Insertar producto
      await db.query(
        `INSERT INTO productos (categoria, color, talla, precio, descripcion, stock, codigo_qr)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [categoria, color, talla, precio, descripcion, stock || 1, qrFileName]
      );
    }

    res.json({ message: "Productos subidos desde Excel correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al subir productos desde Excel" });
  }
};
