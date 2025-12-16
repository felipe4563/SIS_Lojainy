import express from "express";
import { crearVenta, listarVentas, obtenerVenta } from "../controllers/venta.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Todas estas rutas requieren que el usuario esté autenticado
router.use(authMiddleware);

// Listar todas las ventas del usuario logueado
router.get("/", listarVentas);

// Obtener una venta específica (del usuario logueado)
router.get("/:id", obtenerVenta);

// Crear una nueva venta (con id_usuario del token)
router.post("/", crearVenta);

export default router;
