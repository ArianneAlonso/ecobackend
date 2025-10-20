// src/routes/usuarioRoutes.ts
import { Router } from 'express';
import { Usuario } from '../modelos/Usuarios';
import { AppDataSource } from '../data-source.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();
const repo = AppDataSource.getRepository(Usuario);

// Registro
router.post('/register', async (req, res) => {
  const { nombre, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const usuario = repo.create({ nombre, email, password: hashed });
  await repo.save(usuario);
  res.status(201).json({ message: 'Usuario registrado' });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const usuario = await repo.findOneBy({ email });
  if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  const token = jwt.sign({ email: usuario.email }, 'secreto', { expiresIn: '1h' });
  res.json({ token });
});

export default router;