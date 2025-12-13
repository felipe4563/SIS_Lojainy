import express from "express";
import {
  crearRol,
  listarRoles,
  obtenerRol,
  actualizarRol,
  eliminarRol
} from "../controllers/rol.controller.js";

const router = express.Router();

// Listar todos los roles
router.get("/", listarRoles);

// Obtener un rol por ID
router.get("/:id", obtenerRol);

// Crear un nuevo rol
router.post("/", crearRol);

// Actualizar un rol
router.put("/:id", actualizarRol);

// Eliminar un rol
router.delete("/:id", eliminarRol);

export default router;
