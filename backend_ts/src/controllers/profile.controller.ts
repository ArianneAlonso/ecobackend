// src/controllers/profile.controller.ts

import type { Request, Response } from "express";
import { Usuario } from "../entidades/Usuarios"; // Asegúrate de que la ruta sea correcta
import { AppDataSource } from "../data-source"; // Asume que AppDataSource está importado

// ----------------------------------------------------
// OBTENER PERFIL DEL USUARIO AUTENTICADO
// ----------------------------------------------------

// NOTA: Asume que 'req.user' contiene el objeto del usuario o el ID,
// inyectado por un middleware de autenticación (JWT/Sesión).

export const getProfile = async (req: Request, res: Response) => {
  try {
    // En un sistema real, el middleware de autenticación establece el ID del usuario en req.user.id
    const userId = (req as any).user.id;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "No autenticado o ID de usuario no proporcionado." });
    }

    const userRepository = AppDataSource.getRepository(Usuario);

    // Busca al usuario por ID, excluyendo la contraseña por seguridad.
    const user = await userRepository.findOne({
      where: { id: userId },
      select: ["id", "nombre", "email", "rol", "fechaRegistro"], // Columnas permitidas
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    return res.json(user);
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};

// ----------------------------------------------------
// ACTUALIZAR PERFIL DEL USUARIO AUTENTICADO
// ----------------------------------------------------

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { nombre, email, contraseña } = req.body;

    const userRepository = AppDataSource.getRepository(Usuario);
    let user = await userRepository.findOneBy({ id: userId });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Actualiza solo los campos proporcionados, manteniendo la seguridad
    if (nombre) user.nombre = nombre;
    if (email) user.email = email;

    // La contraseña debe ser hasheada antes de guardar (aquí se omite el hashing por simplicidad)
    if (contraseña) {
      // ** IMPORTANTE: Aquí se debe implementar la lógica de hashing (ej: bcrypt) **
      // user.contraseña = await hash(contraseña);
      return res
        .status(400)
        .json({
          message:
            "La contraseña debe ser actualizada mediante un endpoint seguro dedicado.",
        });
    }

    await userRepository.save(user);

    // Devuelve el perfil actualizado (excluyendo la contraseña)
    const updatedUser = await userRepository.findOne({
      where: { id: userId },
      select: ["id", "nombre", "email", "rol", "fechaRegistro"],
    });

    return res.json({
      message: "Perfil actualizado correctamente.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error al actualizar perfil:", error);
    // Manejo de error de duplicidad de email (si TypeORM lo lanza)
    const err = error as any;

    if (err.code === "23505") {
      return res
        .status(409)
        .json({ message: "El correo electrónico ya está en uso." });
    }
    return res.status(500).json({ message: "Error interno del servidor." });
  }
};
