import type { Request, Response } from "express";
import { Contenedor } from "../entidades/Contenedor";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";

// Repositorio de Contenedores (Instanciado una vez)
const contenedorRepository: Repository<Contenedor> =
  AppDataSource.getRepository(Contenedor);

/**
 * Clase controladora para manejar todas las operaciones CRUD relacionadas con los Contenedores.
 */
export class ContenedorController {
  /**
   * @route POST /contenedores
   * @desc Crea un nuevo contenedor de reciclaje en la base de datos.
   * @access Restringido (Debería ser 'administrador'/'operador' en un entorno real)
   */
  public async createContenedor(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const {
        nombreIdentificador,
        direccion,
        latitud,
        longitud,
        materialesAceptados,
        diasHorariosRecoleccion,
      } = req.body;

      // Validación básica
      if (
        !nombreIdentificador ||
        latitud === undefined ||
        longitud === undefined ||
        !materialesAceptados
      ) {
        return res.status(400).json({
          message:
            "Faltan campos obligatorios o son inválidos: nombreIdentificador, latitud, longitud, o materialesAceptados.",
        });
      }

      // Crear una nueva instancia de Contenedor
      const nuevoContenedor = contenedorRepository.create({
        nombreIdentificador,
        direccion: direccion || "Dirección no especificada",
        // Asegurar que latitud y longitud son números
        latitud: parseFloat(latitud),
        longitud: parseFloat(longitud),
        materialesAceptados,
        diasHorariosRecoleccion: diasHorariosRecoleccion || null,
      });

      // Guardar en la base de datos
      await contenedorRepository.save(nuevoContenedor);

      return res.status(201).json({
        message: "Contenedor creado exitosamente.",
        contenedor: nuevoContenedor,
      });
    } catch (error: Error | any) {
      // Manejo de errores específicos (ej. nombreIdentificador duplicado)
      if (error.code === "23505") {
        // Código de error de PostgreSQL para UNIQUE violation
        return res.status(409).json({
          message:
            "Error: Ya existe un contenedor con este nombre identificador.",
        });
      }
      console.error("Error al crear contenedor:", error);
      return res
        .status(500)
        .json({
          message: "Error interno del servidor al crear el contenedor.",
        });
    }
  }

  /**
   * @route GET /contenedores
   * @desc Obtiene una lista de todos los contenedores registrados.
   * @access Public
   */
  public async getContenedores(req: Request, res: Response): Promise<Response> {
    try {
      const contenedores = await contenedorRepository.find();

      return res.status(200).json({
        message: "Lista de contenedores obtenida exitosamente.",
        contenedores: contenedores,
      });
    } catch (error) {
      console.error("Error al obtener contenedores:", error);
      return res
        .status(500)
        .json({
          message:
            "Error interno del servidor al obtener la lista de contenedores.",
        });
    }
  }

  /**
   * @route GET /contenedores/:id
   * @desc Obtiene un contenedor por su ID.
   * @access Public
   */
  public async getContenedorById(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const id = parseInt(req.params.id as string);

      if (isNaN(id)) {
        return res.status(400).json({ message: "ID de contenedor inválido." });
      }

      const contenedor = await contenedorRepository.findOne({
        where: { idContenedor: id },
      });

      if (!contenedor) {
        return res.status(404).json({ message: "Contenedor no encontrado." });
      }

      return res.status(200).json({
        message: "Contenedor obtenido exitosamente.",
        contenedor: contenedor,
      });
    } catch (error) {
      console.error("Error al obtener contenedor por ID:", error);
      return res
        .status(500)
        .json({
          message: "Error interno del servidor al obtener el contenedor.",
        });
    }
  }
}
