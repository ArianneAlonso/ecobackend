import type { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Usuario } from "../entidades/Usuarios.js";
import type { DeepPartial } from "typeorm";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import type { JwtPayload, UserRole } from "../interfaces/JwtPayload.js";
import type { CookieOptions } from "express";

declare module "express-session" {
  interface SessionData {
    user?: JwtPayload;
  }
}

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const isProduction = process.env.NODE_ENV === "production";

// Obtenemos el repositorio de TypeORM para interactuar con la tabla Usuario
const usuarioRepository = AppDataSource.getRepository(Usuario);

/**
 * Clase que contiene la lógica de negocio para las operaciones CRUD y autenticación de usuarios.
 */
export class UsuariosController {
  /**
   * GET /usuarios - Obtiene la lista de todos los usuarios.
   */
  async obtenerUsuarios(req: Request, res: Response) {
    // La autenticación ya se encarga de que haya un token/sesión válido
    // para acceder a esta ruta.

    try {
      // .find() omite la contraseña (gracias a select: false en la entidad)
      const usuarios = await usuarioRepository.find();
      return res.status(200).json(usuarios);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      return res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  }
  /**
   * GET /usuarios/:id - Obtiene un usuario por su ID.
   */

  async obtenerUsuarioPorId(req: Request, res: Response) {
    const idParam = req.params.id; // La validación de token y autorización se realiza en un middleware previo.

    if (!idParam) {
      return res
        .status(400)
        .json({ mensaje: "El ID proporcionado no es válido." });
    }

    const id = Number(idParam);

    if (isNaN(id)) {
      return res
        .status(400)
        .json({ mensaje: "El ID proporcionado no es válido." });
    }

    try {
      // TypeORM usa la propiedad de la clase ('id') para la búsqueda.
      const usuario = await usuarioRepository.findOneBy({ id });
      if (!usuario) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
      }
      return res.status(200).json(usuario);
    } catch (error) {
      console.error("Error al obtener usuario por ID:", error);
      return res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  }
  /**
   * POST /usuarios/registrar - Crea un nuevo usuario (Registro).
   */

  async crearUsuario(req: Request, res: Response) {
    // 1. Desestructuración de datos y asignación del rol por defecto
    const { nombre, email, password } = req.body; // Asigna "usuario" si el campo 'rol' no existe o es nulo/vacío
    const rol = req.body.rol || "usuario";

    if (!nombre || !email || !password) {
      return res.status(400).json({
        mensaje: "Faltan campos requeridos: nombre, email y password.",
      });
    }

    try {
      // 2. Encriptar la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt); // 3. Crear la instancia del usuario

      const nuevoUsuario = usuarioRepository.create({
        nombre,
        email,
        password: hashedPassword,
        rol,
      } as DeepPartial<Usuario>); // 4. Guardar en la base de datos

      await usuarioRepository.save(nuevoUsuario); // 5. Generar un JWT (para mantener la consistencia con el flujo de login)

      const token = jwt.sign(
        {
          id: nuevoUsuario.id,
          email: nuevoUsuario.email,
          rol: nuevoUsuario.rol,
        },
        JWT_SECRET,
        {
          expiresIn: "24h",
        }
      ); // 6. Establecer el token como cookie segura (httpOnly) y devolver datos base

      const cookieOptions: CookieOptions = {
        httpOnly: true,
        secure: isProduction, // true en producción (HTTPS), false/undefined en dev (HTTP)
        maxAge: 24 * 60 * 60 * 1000, // 24 horas
        sameSite: isProduction ? "none" : "lax",
      };
      res.cookie("authToken", token, cookieOptions);

      return res.status(201).json({
        mensaje: "Usuario registrado exitosamente",
        usuario: {
          id: nuevoUsuario.id,
          nombre: nuevoUsuario.nombre,
          email: nuevoUsuario.email,
          rol: nuevoUsuario.rol,
          fechaRegistro: nuevoUsuario.fechaRegistro,
        },
      });
    } catch (error: any) {
      if (error.code === "23505") {
        // Código de error de duplicidad de PostgreSQL
        return res
          .status(409)
          .json({ mensaje: "El email ya está registrado." });
      }

      console.error("Error al crear usuario:", error);
      return res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  }
  /**
   * POST /usuarios/login - Inicia sesión y devuelve un token JWT o establece una sesión.
   */

  public iniciarSesion = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ mensaje: "Se requiere email y password." });
    }

    try {
      // 1. Buscar el usuario y validar contraseña
      const usuario = await usuarioRepository.findOne({
        where: { email },
        select: ["id", "nombre", "email", "password", "rol"],
      });

      if (!usuario) {
        return res.status(401).json({ mensaje: "Credenciales inválidas" });
      }

      const passwordValida = await bcrypt.compare(password, usuario.password);

      if (!passwordValida) {
        return res.status(401).json({ mensaje: "Credenciales inválidas" });
      } // 2. Definir el Payload Base

      const userPayload = {
        id: usuario.id,
        email: usuario.email,
        role: usuario.rol as UserRole,
      }; // 3. LÓGICA HÍBRIDA: Decidir el método de autenticación por rol
      const esSesionDeServidor =
        userPayload.role === "administrador" || userPayload.role === "operador";

      if (esSesionDeServidor) {
        // A. Administradores/Operarios: Usan Sesión de Servidor
        // Establecer la sesión. El cliente recibirá la cookie 'connect.sid'.
        req.session.user = userPayload;

        return res.status(200).json({
          mensaje: "Inicio de sesión exitoso (Sesión de Servidor)",
          user: userPayload,
        });
      } else {
        // B. Usuarios Estándar: Usan JWT
        // Generar el token.
        const token = jwt.sign(
          { id: usuario.id, email: usuario.email, rol: usuario.rol },
          JWT_SECRET,
          { expiresIn: "24h" }
        ); // 4. *** CAMBIO CLAVE: Establecer el token como cookie httpOnly ***
        const cookieOptions: CookieOptions = {
          httpOnly: true,
          secure: isProduction, // true en producción (HTTPS), false/undefined en dev (HTTP)
          maxAge: 24 * 60 * 60 * 1000, // 24 horas
          sameSite: isProduction ? "none" : "lax", // Ajuste para CORS
        };

        res.cookie("authToken", token, cookieOptions);

        return res.status(200).json({
          mensaje: "Inicio de sesión exitoso (JWT)",
          user: userPayload, // Se devuelve el payload del usuario, no el token
        });
      }
    } catch (error) {
      console.error("Error en iniciar sesión:", error);
      return res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  };
  /**
   * POST /usuarios/logout - Cierra la sesión eliminando las cookies relevantes.
   */

  async cerrarSesion(req: Request, res: Response) {
    try {
      // 1. Destruir la Sesión en el Servidor (para el flujo de administradores/operadores)
      req.session.destroy((err) => {
        if (err) {
          console.error("Error al destruir la sesión:", err); // A pesar del error, intentaremos borrar la cookie del cliente
        } // 2. Limpiar la cookie del JWT (para el flujo de usuarios estándar)

        res.clearCookie("authToken"); // Opcional: Limpiar explícitamente la cookie de sesión de express-session ('connect.sid' por defecto) // Esto es útil para ser explícito, aunque destroy() a menudo lo maneja. // Solo la borramos si no hubo un error grave en la destrucción.

        if (!err) {
          res.clearCookie(process.env.SESSION_NAME || "connect.sid");
        } // 3. Enviar respuesta de éxito

        return res.status(200).json({ mensaje: "Sesión cerrada exitosamente" });
      });
    } catch (error) {
      console.error("Error al cerrar sesión (catch externo):", error);
      return res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  }
}
