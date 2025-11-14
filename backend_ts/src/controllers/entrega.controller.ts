import type { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { EntregaMaterial } from "../entidades/EntregaMaterial";
import { PuntoEcologico, TipoTransaccion } from "../entidades/PuntoEcologico";
import { Usuario } from "../entidades/Usuarios";
import { Material } from "../entidades/Material"; // ⬅️ NUEVA ENTIDAD
import type { AuthenticatedRequest } from "../interfaces/AutenticatedRequest";
import { Repository } from "typeorm";

/*
// Ya no es necesario hardcodear puntos aquí; se manejará mediante consulta.
const PUNTOS_POR_KG = {
    Plastico: 10,
    Papel: 5,
    Vidrio: 8,
};
*/

// Asumiendo que la entidad Material tiene una columna 'puntosPorKg'
interface MaterialConPuntos extends Material {
    puntosPorKg: number;
}


export class EntregasController {
    // Definimos repositorios como propiedades de la instancia
    private readonly entregaRepository: Repository<EntregaMaterial> = AppDataSource.getRepository(EntregaMaterial);
    private readonly usuarioRepository: Repository<Usuario> = AppDataSource.getRepository(Usuario);
    private readonly materialRepository: Repository<MaterialConPuntos> = AppDataSource.getRepository(Material) as Repository<MaterialConPuntos>; // ⬅️ NUEVO REPOSITORIO


    public crearEntrega = async (req: AuthenticatedRequest, res: Response): Promise<void> => {

        const idUsuario = req.user!.id; 
        // El frontend aún debe enviar el nombre del material, pero lo usaremos para buscar el ID
        const { idContenedor, materialNombre, pesoKg } = req.body; 

        if (!materialNombre || !pesoKg || pesoKg <= 0) {
            res.status(400).json({ message: "Datos de entrega incompletos o inválidos." });
            return;
        }

        // 1. OBTENER ID DEL MATERIAL Y TASA DE PUNTOS
        // Se asume que la entidad Material tiene una columna 'puntosPorKg'
        const materialInfo = await this.materialRepository.findOne({
            where: { nombre: materialNombre },
            // Selecciona explícitamente puntosPorKg si no es una columna de la entidad Material
            select: ['idMaterial' as keyof MaterialConPuntos, 'puntosPorKg' as keyof MaterialConPuntos], 
        });

        if (!materialInfo) {
            res.status(400).json({ message: `Material '${materialNombre}' no reconocido.` });
            return;
        }

        // Si la columna 'puntosPorKg' no existe en Material, ajusta esta línea
        const tasaPuntos = materialInfo.puntosPorKg || 0; 

        if (tasaPuntos === 0) {
             res.status(400).json({ message: `Material '${materialNombre}' no genera puntos.` });
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
            // A. Crear Entrega usando idMaterial
            const nuevaEntrega = this.entregaRepository.create({
                idUsuario,
                idContenedor: idContenedor || null,
                idMaterial: materialInfo.idMaterial, // ⬅️ USAR ID DEL MATERIAL
                pesoKg,
                puntosGanados,
            });
            const entregaGuardada = await queryRunner.manager.save(nuevaEntrega);

            // B. Registrar Puntos
            const nuevoPunto = queryRunner.manager.create(PuntoEcologico, {
                idUsuario,
                tipoTransaccion: TipoTransaccion.ENTREGA,
                puntos: puntosGanados,
                idReferencia: entregaGuardada.idEntrega,
            });
            await queryRunner.manager.save(nuevoPunto);

            // C. Actualizar Saldo 
            await queryRunner.manager.increment(
                Usuario,
                { idUsuario: idUsuario as any },
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
            // 4. Manejo de errores y rollback
            await queryRunner.rollbackTransaction();
            console.error("Error al registrar la entrega:", error);
            res.status(500).json({ message: "Error interno al procesar la entrega." });
        } finally {
            await queryRunner.release();
        }
    };

    // ... (getEntregasByUsuario y getAllEntregas no necesitan cambios en la lógica) ...
    public getEntregasByUsuario = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            const idUsuario = req.user!.id;

            const entregas = await this.entregaRepository.find({
                where: { idUsuario: idUsuario as any },
                order: { fechaEntrega: "DESC" },
                relations: ["contenedor", "material"], // ⬅️ Incluir la relación 'material'
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
                relations: ["usuario", "contenedor", "material"], // ⬅️ Incluir la relación 'material'
            });

            res.status(200).json(entregas);
        } catch (error) {
            console.error("Error al obtener todas las entregas:", error);
            res.status(500).json({ message: "Error interno del servidor." });
        }
    };
}