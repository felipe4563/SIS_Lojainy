import express from "express";
import {
  crearVenta,
  listarVentas,
  obtenerVenta
} from "../controllers/venta.controller.js";

const router = express.Router();

// Listar todas las ventas
router.get("/", listarVentas);

// Obtener una venta por ID
router.get("/:id", obtenerVenta);

// Crear una nueva venta
router.post("/", crearVenta);

export default router;
