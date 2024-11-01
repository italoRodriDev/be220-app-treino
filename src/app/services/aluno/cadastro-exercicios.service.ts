import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AlunoModel } from 'src/app/models/aluno.model';
import { FormService } from '../forms/form.service';
import { AlertsService } from '../alerts/alerts.service';
import { AlertController, NavController } from '@ionic/angular';
import { ExercicioModel } from 'src/app/models/exercicio.model';
import { DiaTreinoModel } from 'src/app/models/dia-treino.model';

@Injectable({
  providedIn: 'root',
})
export class CadastroExerciciosService {
  formExercicio: FormGroup = this.formService.formExercicio;
  db = this.fireDatabase.database;
  public bsExercicios = new BehaviorSubject<Array<any>>([]);
  listExercicios = this.bsExercicios.asObservable();

  public bsExercicio = new BehaviorSubject<ExercicioModel | undefined>(
    undefined
  );
  exercicio = this.bsExercicio.asObservable();

  constructor(
    private fireDatabase: AngularFireDatabase,
    private fireAuth: AngularFireAuth,
    private formService: FormService,
    private alertService: AlertsService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  async getData(aluno: AlunoModel, diaTreino: DiaTreinoModel) {
    const user = await this.fireAuth.currentUser;
    if (user?.uid) {
      this.db
        .ref('Exercicios')
        .child(user.uid)
        .child(aluno.id)
        .child(diaTreino.id)
        .on('value', (snapshot) => {
          const data = snapshot.val();
          this.bsExercicios.next([]);
          if (data) {
            const array = Object.keys(data).map((index) => data[index]);
            this.bsExercicios.next(array);
          }
        });
    } else {
      this.navCtrl.navigateBack('login');
    }
  }

  async validFormData(aluno: AlunoModel, diaTreino: DiaTreinoModel) {
    if (this.formExercicio.valid) {
      const currentID = this.formExercicio.controls['id'].value;

      if (currentID != null) {
        await this.saveData(currentID, aluno, diaTreino);
      } else {
        const id = this.fireDatabase.createPushId();
        this.formExercicio.patchValue({
          id: id,
          idAluno: aluno.id,
          idDiaTreino: diaTreino.id,
        });
        await this.saveData(id, aluno, diaTreino);
      }
    }
  }

  async saveData(id: string, aluno: AlunoModel, diaTreino: DiaTreinoModel) {
    const user = await this.fireAuth.currentUser;
    if (user?.uid) {
      try {
        await this.db
          .ref('Exercicios')
          .child(user.uid)
          .child(aluno.id)
          .child(diaTreino.id)
          .child(id)
          .update(this.formExercicio.value);
        
        this.formService.resetDataForm();
        this.alertService.showAlert(
          'Salvo com sucesso!',
          'Suas alterações foram salvas com sucesso.'
        );
        this.navCtrl.back();
      } catch (error: any) {
        this.alertService.showToast('Erro: ' + error.code);
      }
    } else {
      this.navCtrl.navigateBack('login');
    }
  }

  async showAlertRemove(
    aluno: AlunoModel,
    diaTreino: DiaTreinoModel,
    exercicio: ExercicioModel
  ) {
    const alert = await this.alertCtrl.create({
      header: 'Deseja excluir?',
      subHeader: exercicio.nome,
      message: 'Ao confirmar será excluído.',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {},
        },
        {
          text: 'Excluir',
          handler: () => {
            this.remove(exercicio.id, aluno);
          },
        },
      ],
    });
    alert.present();
  }

  async remove(id: string, aluno: AlunoModel) {
    const user = await this.fireAuth.currentUser;
    if (user?.uid) {
      try {
        await this.db
          .ref('Exercicios')
          .child(user.uid)
          .child(aluno.id)
          .child(id)
          .remove();
        this.alertService.showToast('Excluído com sucesso!');
      } catch (error: any) {
        this.alertService.showToast('Erro: ' + error?.code);
      }
    } else {
      this.navCtrl.navigateBack('login');
    }
  }
}
