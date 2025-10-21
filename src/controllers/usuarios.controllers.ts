import type { Request, Response } from 'express';
import { AppDataSource } from '../data-source.js';
import { Usuario } from '../modelos/Usuarios'; 
import type { DeepPartial } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Clave secreta temporal para JWT. ¡Mover a variables de entorno en un entorno real!
const JWT_SECRET = 'Ec0B4ckend-Super-S3cr3t-K3y-2025!'; 

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
    try {
      // .find() omite la contraseña (gracias a select: false) y trae todos los demás campos.
      const usuarios = await usuarioRepository.find();
      return res.status(200).json(usuarios);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  /**
   * GET /usuarios/:id - Obtiene un usuario por su ID.
   */
  async obtenerUsuarioPorId(req: Request, res: Response) {
    const id = parseInt(req.params.id ?? '', 10);

    if (isNaN(id)) {
      return res.status(400).json({ mensaje: 'El ID proporcionado no es válido.' });
    }

    try {
      // TypeORM usa la propiedad de la clase ('id') para la búsqueda, aunque el nombre de columna sea 'id_usuario'.
      const usuario = await usuarioRepository.findOneBy({ id }); 
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
      return res.status(200).json(usuario);
    } catch (error) {
      console.error('Error al obtener usuario por ID:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  /**
   * POST /usuarios/registrar - Crea un nuevo usuario (Registro).
   */
  async crearUsuario(req: Request, res: Response) {
    // Se elimina 'edad' de la desestructuración
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      // Se actualiza el mensaje de error
      return res.status(400).json({ mensaje: 'Faltan campos requeridos: nombre, email y password.' });
    }

    try {
      // 1. Encriptar la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // 2. Crear la instancia del usuario (se elimina la referencia a edad)
      const nuevoUsuario = usuarioRepository.create({
        nombre,
        email,
        password: hashedPassword, // El hash se guardará en la columna 'contraseña'
      } as DeepPartial<Usuario>);

      // 3. Guardar en la base de datos (fechaRegistro se llena automáticamente)
      await usuarioRepository.save(nuevoUsuario);

      // 4. Generar un JWT
      const token = jwt.sign({ id: nuevoUsuario.id, email: nuevoUsuario.email }, JWT_SECRET, {
        expiresIn: '24h', 
      });

      // 5. Devolver el token y los datos del usuario (se elimina la referencia a edad)
      return res.status(201).json({ 
        mensaje: 'Usuario registrado exitosamente',
        token,
        usuario: { 
          id: nuevoUsuario.id, 
          nombre: nuevoUsuario.nombre, 
          email: nuevoUsuario.email, 
          fechaRegistro: nuevoUsuario.fechaRegistro 
        }
      });

    } catch (error: any) {
      // Código de error 23505 es para violación de restricción única en PostgreSQL
      if (error.code === '23505') { 
        return res.status(409).json({ mensaje: 'El email ya está registrado.' });
      }

      console.error('Error al crear usuario:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }

  /**
   * POST /usuarios/login - Inicia sesión y devuelve un token JWT.
   */
  async iniciarSesion(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ mensaje: 'Se requiere email y password.' });
    }

    try {
      // 1. Buscar el usuario por email, *forzando* la selección de la contraseña
      const usuario = await usuarioRepository.findOne({ 
        where: { email },
        // Listamos los campos necesarios para sobrescribir 'select: false' y obtener el hash
        select: ["id", "nombre", "email", "password"], 
      });

      if (!usuario) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
      }

      // 2. Comparar la contraseña proporcionada con el hash (propiedad 'password')
      const passwordValida = await bcrypt.compare(password, usuario.password); 

      if (!passwordValida) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
      }

      // 3. Generar un JWT
      const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, {
        expiresIn: '24h',
      });

      // 4. Devolver el token
      return res.status(200).json({ 
        mensaje: 'Inicio de sesión exitoso',
        token,
        usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email }
      });

    } catch (error) {
      console.error('Error en iniciar sesión:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  }
}