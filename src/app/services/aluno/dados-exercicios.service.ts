import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject } from 'rxjs';
import { AlunoModel } from 'src/app/models/aluno.model';
import { DiaTreinoModel } from 'src/app/models/dia-treino.model';
import { ExercicioModel } from 'src/app/models/exercicio.model';

@Injectable({
  providedIn: 'root',
})
export class DadosExerciciosService {
  private db = this.fireDatabase.database;
  public bsExercicios = new BehaviorSubject<Array<any>>([]);
  public listExercicios = this.bsExercicios.asObservable();

  public bsExercicio = new BehaviorSubject<ExercicioModel | undefined>(
    undefined
  );
  public exercicio = this.bsExercicio.asObservable();

  constructor(private fireDatabase: AngularFireDatabase) {}

  async getData(aluno: AlunoModel, diaTreino: DiaTreinoModel) {
    const idProfessor = localStorage.getItem('data-p');
    if (idProfessor) {
      try {
        const snapshot = await this.db
          .ref('Exercicios')
          .child(idProfessor)
          .child(aluno.id)
          .child(diaTreino.id)
          .once('value');

        const data = snapshot.val();
        this.bsExercicios.next([]);

        if (data) {
          const array = Object.keys(data).map((key) => data[key]);
          this.bsExercicios.next(array);
        } else {
          console.warn('Nenhum dado encontrado para Exercícios.');
        }
      } catch (error) {
        console.error('Erro ao obter dados de Exercícios:', error);
      }
    } else {
      console.warn('ID do professor não encontrado no localStorage.');
    }
  }
}
