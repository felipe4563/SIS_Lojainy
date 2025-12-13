import express from "express";
import multer from "multer";
import {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  subirExcelProductos
} from "../controllers/producto.controller.js";

const router = express.Router();

// Middleware de multer para archivos (Excel)
const upload = multer({ storage: multer.memoryStorage() });

// Rutas CRUD
router.get("/", listarProductos);
router.get("/:id_producto", obtenerProducto);
router.post("/", crearProducto);
router.put("/:id_producto", actualizarProducto);
router.delete("/:id_producto", eliminarProducto);

// Ruta para subir productos desde Excel
router.post("/excel", upload.single("archivo"), subirExcelProductos);

export default router;
