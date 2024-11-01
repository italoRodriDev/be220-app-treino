import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject } from 'rxjs';
import { AlunoModel } from 'src/app/models/aluno.model';
import { DiaTreinoModel } from 'src/app/models/dia-treino.model';

@Injectable({
  providedIn: 'root',
})
export class DadosDiaTreinoService {
  private db = this.fireDatabase.database;
  public bsDiasTreino = new BehaviorSubject<Array<any>>([]);
  public listDiasTreino = this.bsDiasTreino.asObservable();

  public bsDiaTreino = new BehaviorSubject<DiaTreinoModel | undefined>(
    undefined
  );
  public diaTreino = this.bsDiaTreino.asObservable();

  constructor(private fireDatabase: AngularFireDatabase) {}

  async getData(aluno: AlunoModel) {
    const idProfessor = localStorage.getItem('data-p');
    if (idProfessor) {
      try {
        const snapshot = await this.db
          .ref('DiasTreino')
          .child(idProfessor)
          .child(aluno.id)
          .once('value');

        const data = snapshot.val();
        this.bsDiasTreino.next([]);

        if (data) {
          const array = Object.keys(data).map((key) => data[key]);

          // Função de comparação para os dias da semana
          const diasSemana = [
            'Segunda',
            'Terça',
            'Quarta',
            'Quinta',
            'Sexta',
            'Sábado',
            'Domingo',
          ];

          array.sort((a, b) => {
            return diasSemana.indexOf(a.dia) - diasSemana.indexOf(b.dia);
          });

          this.bsDiasTreino.next(array);
        } else {
          console.warn('Nenhum dado encontrado para Dias de Treino.');
        }
      } catch (error) {
        console.error('Erro ao obter dados de Dias de Treino:', error);
      }
    } else {
      console.warn('ID do professor não encontrado no localStorage.');
    }
  }
}
