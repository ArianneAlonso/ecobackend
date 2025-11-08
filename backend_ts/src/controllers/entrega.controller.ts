// src/controllers/EntregasController.ts
import type { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { EntregaMaterial } from "../entidades/EntregaMaterial";

const entregaRepository = AppDataSource.getRepository(EntregaMaterial);

export class EntregasController {
  /** POST /entregas - Crea una nueva entrega de materiales */
  static async crearEntrega(req: Request, res: Response) {
    const { nombreMaterial, cantidad, entregadoPor, recibidoPor } = req.body;

    if (!nombreMaterial || !cantidad || !entregadoPor || !recibidoPor) {
      return res.status(400).json({
        mensaje: "Faltan campos requeridos: nombreMaterial, cantidad, entregadoPor, recibidoPor.",
      });
    }

    try {
      const nuevaEntrega = entregaRepository.create({
        nombreMaterial,
        cantidad,
        entregadoPor,
        recibidoPor,
      });

      await entregaRepository.save(nuevaEntrega);

      return res.status(201).json({
        mensaje: "Entrega registrada exitosamente",
        entrega: nuevaEntrega,
      });
    } catch (error) {
      console.error("Error al guardar entrega:", error);
      return res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  }

  /** GET /entregas - Lista todas las entregas */
  static async listarEntregas(req: Request, res: Response) {
    try {
      const entregas = await entregaRepository.find();
      return res.status(200).json(entregas);
    } catch (error) {
      console.error("Error al obtener entregas:", error);
      return res.status(500).json({ mensaje: "Error interno del servidor" });
    }
  }
}