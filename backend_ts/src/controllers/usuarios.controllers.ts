import type { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Usuario } from "../entidades/Usuarios.js";
import type { DeepPartial } from "typeorm";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import type { JwtPayload, UserRole} from "../interfaces/JwtPayload.js";

declare module 'express-session' {
  interface SessionData {
    user?: JwtPayload
  }
}

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

// Obtenemos el repositorio de TypeORM para interactuar con la tabla Usuario
const usuarioRepository = AppDataSource.getRepository(Usuario);

/**
 * Clase que contiene la lógica de negocio para las operaciones CRUD y autenticación de usuarios.
 * Se ha eliminado la referencia al campo 'edad' según la solicitud.
 */
export class UsuariosController {
  /**
   * GET /usuarios - Obtiene la lista de todos los usuarios.
   */
  async obtenerUsuarios(req: Request, res: Response) {
    const tokenHeader = req.cookies.authToken;
    if (!tokenHeader) {
      return res.status(401).json({ message: "No se proporcionó token" });
    }

    const token = Array.isArray(tokenHeader) ? tokenHeader[0] : tokenHeader;
    if (!token) {
      return res.status(401).json({ message: "Token inválido" });
    }

    try {
      // .find() omite la contraseña (gracias a select: false) y trae todos los demás campos.
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
    const idParam = req.params.id;
    // Tomamos el token desde los headers de la peticion de la siguiente manera:
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({ message: "Token inválido" });
    }

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
      // TypeORM usa la propiedad de la clase ('id') para la búsqueda, aunque el nombre de columna sea 'id_usuario'.
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
    const { nombre, email, password } = req.body;
    // Asigna "usuario" si el campo 'rol' no existe o es nulo/vacío
    const rol = req.body.rol || "usuario"; 

    if (!nombre || !email || !password) {
        return res.status(400).json({
            mensaje: "Faltan campos requeridos: nombre, email y password.",
        });
    }

    try {
        // 2. Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Crear la instancia del usuario
        const nuevoUsuario = usuarioRepository.create({
            nombre,
            email,
            password: hashedPassword,
            rol, // <-- Usamos la variable 'rol' que ahora tiene el valor por defecto si fue necesario
        } as DeepPartial<Usuario>);

        // 4. Guardar en la base de datos
        await usuarioRepository.save(nuevoUsuario);

        // 5. Generar un JWT
        const token = jwt.sign(
            { id: nuevoUsuario.id, email: nuevoUsuario.email },
            JWT_SECRET,
            {
                expiresIn: "24h",
            }
        );

        // 6. Devolver el token y los datos del usuario
        return res.status(201).json({
            mensaje: "Usuario registrado exitosamente",
            token,
            usuario: {
                id: nuevoUsuario.id,
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email,
                rol: nuevoUsuario.rol, // Asegúrate de que esto sea 'rol' y no 'ril'
                fechaRegistro: nuevoUsuario.fechaRegistro,
            },
        });
    } catch (error: any) {
        // ... (Manejo de errores se mantiene igual)
        if (error.code === "23505") {
            return res
                .status(409)
                .json({ mensaje: "El email ya está registrado." });
        }

        console.error("Error al crear usuario:", error);
        return res.status(500).json({ mensaje: "Error interno del servidor" });
    }
}

  /**
   * POST /usuarios/login - Inicia sesión y devuelve un token JWT.
   */
  public iniciarSesion = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ mensaje: "Se requiere email y password." });
    }

    try {
        // 1. Buscar el usuario y validar contraseña (Tu lógica existente)
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
        }

        // 2. Definir el Payload Base
        const userPayload = {
            id: usuario.id,
            email: usuario.email,
            role: usuario.rol as UserRole // Tipado correcto del rol
        };
        
        // 3. LÓGICA HÍBRIDA: Decidir el método de autenticación por rol
        const esSesionDeServidor = (
            userPayload.role === 'administrador' || userPayload.role === 'operador'
        );

        if (esSesionDeServidor) {
            // A. Administradores/Operarios: Usan Sesión de Servidor
            // Establecer la sesión. El cliente recibirá una cookie de sesión.
            req.session.user = userPayload; 

            return res.status(200).json({
                mensaje: "Inicio de sesión exitoso (Sesión de Servidor)",
                user: userPayload
            });
        } else {
            // B. Usuarios Estándar: Usan JWT
            // Generar y devolver el token.
            const token = jwt.sign(
                { id: usuario.id, email: usuario.email, rol: usuario.rol },
                JWT_SECRET,
                { expiresIn: "24h" }
            );

            return res.status(200).json({
                mensaje: "Inicio de sesión exitoso (JWT)",
                token, // Se devuelve el token
                user: userPayload
            });
        }
    } catch (error) {
        // 4. Manejo de Errores: Usar 'error' capturado, no la clase 'Error'
        console.error("Error en iniciar sesión:", error); 
        return res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};
  // En la clase UsuariosController:

  /**
   * POST /usuarios/logout - Cierra la sesión eliminando la cookie JWT.
   */
  // En la clase UsuariosController:

async cerrarSesion(req: Request, res: Response) {
    try {
        // 1. **Destruir la Sesión en el Servidor (CLAVE para express-session):**
        // Llama a destroy() para eliminar los datos de la sesión del almacén de sesiones
        // y limpiar el objeto req.session.
        req.session.destroy((err) => {
            if (err) {
                console.error("Error al destruir la sesión:", err);
                return res.status(500).json({ 
                    mensaje: "No se pudo cerrar la sesión correctamente en el servidor." 
                });
            }

            // 2. **Eliminar la Cookie de Sesión (Sesion ID):**
            

            // 3. **Enviar respuesta de éxito:**
            return res.status(200).json({ mensaje: "Sesión cerrada exitosamente" });
        });

    } catch (error) {
        console.error("Error al cerrar sesión (catch externo):", error);
        return res.status(500).json({ mensaje: "Error interno del servidor" });
    }
}}