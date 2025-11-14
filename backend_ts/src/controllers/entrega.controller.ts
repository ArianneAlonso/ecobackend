import type { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { EntregaMaterial } from "../entidades/EntregaMaterial";
import { PuntoEcologico, TipoTransaccion } from "../entidades/PuntoEcologico";
import { Usuario } from "../entidades/Usuarios";
import type { AuthenticatedRequest } from "../interfaces/AutenticatedRequest";
import { Repository } from "typeorm";

const PUNTOS_POR_KG = {
    Plastico: 10,
    Papel: 5,
    Vidrio: 8,

};

export class EntregasController {
    // Definimos repositorios como propiedades de la instancia
    private readonly entregaRepository: Repository<EntregaMaterial> = AppDataSource.getRepository(EntregaMaterial);
    private readonly usuarioRepository: Repository<Usuario> = AppDataSource.getRepository(Usuario);

    public crearEntrega = async (req: AuthenticatedRequest, res: Response): Promise<void> => {

        const idUsuario = req.user!.id; 
        const { idContenedor, material, pesoKg } = req.body;

        if (!material || !pesoKg || pesoKg <= 0) {
            res.status(400).json({ message: "Datos de entrega incompletos o inválidos." });
            return;
        }

        const tasaPuntos = PUNTOS_POR_KG[material as keyof typeof PUNTOS_POR_KG] || 0;
        if (tasaPuntos === 0) {
            res.status(400).json({ message: `Material '${material}' no reconocido para puntos.` });
            return;
        }

        const puntosGanados = Math.floor(pesoKg * tasaPuntos);

        if (puntosGanados === 0) {
            res.status(400).json({ message: "El peso es insuficiente para ganar puntos." });
            return;
        }

        // 2. Iniciar Transacción
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const nuevaEntrega = this.entregaRepository.create({
                idUsuario,
                idContenedor: idContenedor || null,
                material,
                pesoKg,
                puntosGanados,
            });
            const entregaGuardada = await queryRunner.manager.save(nuevaEntrega);

            const nuevoPunto = queryRunner.manager.create(PuntoEcologico, {
                idUsuario,
                tipoTransaccion: TipoTransaccion.ENTREGA,
                puntos: puntosGanados, // Los puntos ganados son positivos
                idReferencia: entregaGuardada.idEntrega,
            });
            await queryRunner.manager.save(nuevoPunto);

            // C. Actualizar Saldo 
            await queryRunner.manager.increment(
                Usuario,
                { idUsuario: idUsuario as any }, // 'as any' es necesario si hay conflicto string/number en FK
                "puntosAcumulados",
                puntosGanados
            );

            // 3. Finalizar Transacción
            await queryRunner.commitTransaction();

            res.status(201).json({
                message: "Entrega registrada y puntos otorgados.",
                puntos: puntosGanados,
            });
        } catch (error) {
            // ... (Manejo de errores y rollback) ...
            await queryRunner.rollbackTransaction();
            console.error("Error al registrar la entrega:", error);
            res.status(500).json({ message: "Error interno al procesar la entrega." });
        } finally {
            await queryRunner.release();
        }
    };

    public getEntregasByUsuario = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            const idUsuario = req.user!.id;

            const entregas = await this.entregaRepository.find({
                where: { idUsuario: idUsuario as any }, // Usar 'as any' si idUsuario es string y la entidad espera number
                order: { fechaEntrega: "DESC" },
                relations: ["contenedor"],
            });

            res.status(200).json(entregas);
        } catch (error) {
            console.error("Error al obtener entregas del usuario:", error);
            res.status(500).json({ message: "Error interno del servidor." });
        }
    };

    public getAllEntregas = async (req: Request, res: Response): Promise<void> => {
        try {
            const entregas = await this.entregaRepository.find({
                order: { fechaEntrega: "DESC" },
                relations: ["usuario", "contenedor"],
            });

            res.status(200).json(entregas);
        } catch (error) {
            console.error("Error al obtener todas las entregas:", error);
            res.status(500).json({ message: "Error interno del servidor." });
        }
    };
}