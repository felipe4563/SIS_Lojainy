import express from "express";
import {
  crearUsuario,
  listarUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  toggleEstadoUsuario
} from "../controllers/user.controller.js";

const router = express.Router();

// Listar todos los usuarios
router.get("/", listarUsuarios);

// Obtener un usuario por ID
router.get("/:id", obtenerUsuario);

// Crear un nuevo usuario
router.post("/", crearUsuario);

// Actualizar usuario
router.put("/:id", actualizarUsuario);

// Activar / desactivar usuario
router.patch("/toggle/:id", toggleEstadoUsuario);

export default router;
