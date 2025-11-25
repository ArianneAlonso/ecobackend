import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware para proteger rutas y verificar el token
export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const secret = process.env.JWT_SECRET;
      if (!secret) throw new Error('JWT_SECRET no está definido');
      const decoded = jwt.verify(token, secret);
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ message: 'No autorizado, usuario no encontrado' });
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'No autorizado, el token falló' });
    }
  }
  if (!token) {
    res.status(401).json({ message: 'No autorizado, no se encontró un token' });
  }
};

// Middleware para verificar si el usuario es Administrador
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador.' });
  }
};

// Middleware para verificar si el usuario es Conductor
export const isDriver = (req, res, next) => {
  if (req.user && req.user.role === 'driver') {
    next();
  } else {
    res.status(403).json({ message: 'Acceso denegado. Se requiere rol de conductor.' });
  }
};