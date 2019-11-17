import { Doenca } from '../doencas/doenca.model';
import { Medicamento } from '../medicamentos/medicamento.model';

export class Diagnostico {
    
    descricao: string;
    doencasCuradas: Doenca[];
    doencasDiagnosticadas: Doenca[];
    // examesExigidos: ExameTipo[];
    medicamentosReceitados: Medicamento[];

}