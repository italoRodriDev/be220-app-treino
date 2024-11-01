import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject } from 'rxjs';
import { AlunoModel } from 'src/app/models/aluno.model';

@Injectable({
  providedIn: 'root',
})
export class DadosAlunoService {
  private db = this.fireDatabase.database;
  private bsAluno = new BehaviorSubject<AlunoModel | undefined>(undefined);
  public aluno = this.bsAluno.asObservable();

  constructor(private fireDatabase: AngularFireDatabase) {}

  async getData() {
    const idProfessor = localStorage.getItem('data-p');
    const idAluno = localStorage.getItem('data-a');

    if (idProfessor && idAluno) {
      try {
        const snapshot = await this.db
          .ref('Alunos')
          .child(idProfessor)
          .child(idAluno)
          .once('value');

        const data = snapshot.val();
        if (data) {
          this.bsAluno.next(data);
        } else {
          console.warn('Nenhum dado encontrado para o aluno.');
        }
      } catch (error) {
        console.error('Erro ao obter dados do aluno:', error);
        // Aqui você pode adicionar lógica adicional de tratamento de erros
      }
    } else {
      console.warn('IDs do professor ou aluno não encontrados no localStorage.');
    }
  }
}
