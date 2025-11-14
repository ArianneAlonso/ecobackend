import type { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { EntregaMaterial } from '../entidades/EntregaMaterial';
import { Usuario } from '../entidades/Usuarios';
import { Contenedor } from '../entidades/Contenedor';
import { Repository } from 'typeorm';

export class DashboardController {
    
    private entregaRepository: Repository<EntregaMaterial>;
    private usuarioRepository: Repository<Usuario>;
    private contenedorRepository: Repository<Contenedor>;

    constructor() {
        this.entregaRepository = AppDataSource.getRepository(EntregaMaterial);
        this.usuarioRepository = AppDataSource.getRepository(Usuario);
        this.contenedorRepository = AppDataSource.getRepository(Contenedor);
    }

    public getKpis = async (req: Request, res: Response): Promise<void> => {
        try {
            // Obtener el inicio y fin del mes actual para comparar tendencias
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            
            // --- CÁLCULOS ASÍNCRONOS ---
        
            const totalUsuarios = this.usuarioRepository.count();

            // 2. Total de Contenedores
            const totalContenedores = this.contenedorRepository.count();

            // 3. Kg Reciclados (Total)
            const totalKgReciclados = this.entregaRepository
                .createQueryBuilder("entrega")
                .select("SUM(entrega.pesoKg)", "sum")
                .getRawOne();
                
            // 4. Kg Reciclados (Este Mes)
            const kgRecicladosEsteMes = this.entregaRepository
                .createQueryBuilder("entrega")
                .select("SUM(entrega.pesoKg)", "sum")
                .where("entrega.fechaEntrega >= :startOfMonth", { startOfMonth })
                .getRawOne();
            
            // Esperar todos los resultados
            const [
                usuariosTotal, 
                contenedoresTotal, 
                kgTotal, 
                kgEsteMes
            ] = await Promise.all([
                totalUsuarios, 
                totalContenedores, 
                totalKgReciclados, 
                kgRecicladosEsteMes
            ]);
            
            // --- CONSOLIDACIÓN DE DATOS ---

            const kgRecicladosValue = parseFloat(kgTotal.sum || '0');
            const kgRecicladosMesValue = parseFloat(kgEsteMes.sum || '0');

            res.status(200).json({
                metricas: {
                    usuariosActivos: usuariosTotal,
                    kgRecicladosTotal: kgRecicladosValue,
                    kgRecicladosEsteMes: kgRecicladosMesValue,
                    totalContenedores: contenedoresTotal,

                },
                charts: {
                }
            });

        } catch (error) {
            console.error("Error al obtener datos del dashboard:", error);
            res.status(500).json({ message: "Error interno al cargar el dashboard." });
        }
    };
}