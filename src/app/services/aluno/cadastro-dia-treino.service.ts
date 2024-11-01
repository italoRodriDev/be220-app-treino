import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormService } from '../forms/form.service';
import { AlertsService } from '../alerts/alerts.service';
import { AlertController, NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { AlunoModel } from 'src/app/models/aluno.model';
import { DiaTreinoModel } from 'src/app/models/dia-treino.model';

@Injectable({
  providedIn: 'root',
})
export class CadastroDiaTreinoService {
  formDiaTreino: FormGroup = this.formService.formDiaTreino;
  db = this.fireDatabase.database;
  public bsDiasTreino = new BehaviorSubject<Array<any>>([]);
  listDiasTreino = this.bsDiasTreino.asObservable();

  public bsDiaTreino = new BehaviorSubject<DiaTreinoModel | undefined>(undefined);
  diaTreino = this.bsDiaTreino.asObservable();

  constructor(
    private fireDatabase: AngularFireDatabase,
    private fireAuth: AngularFireAuth,
    private formService: FormService,
    private alertService: AlertsService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  async getData(aluno: AlunoModel) {
    try {
      const user = await this.fireAuth.currentUser;
      if (user?.uid) {
        this.db.ref('DiasTreino').child(user.uid).child(aluno.id).on('value', (snapshot) => {
          const data = snapshot.val();
          this.bsDiasTreino.next([]);
          if (data) {
            const array = Object.keys(data).map((key) => data[key]);
            this.bsDiasTreino.next(this.sortDiasSemana(array));
          }
        });
      } else {
        this.navCtrl.navigateBack('login');
      }
    } catch (error: any) {
      this.alertService.showToast('Erro ao obter dados: ' + error?.message);
    }
  }

  private sortDiasSemana(array: Array<any>) {
    const diasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
    return array.sort((a, b) => diasSemana.indexOf(a.dia) - diasSemana.indexOf(b.dia));
  }

  validFormData(aluno: AlunoModel) {
    if (this.formDiaTreino.valid) {
      const currentID = this.formDiaTreino.controls['id'].value;
      const id = currentID || this.fireDatabase.createPushId();
      this.formDiaTreino.patchValue({ id, idAluno: aluno.id });
      this.saveData(id, aluno);
    }
  }

  async saveData(id: string, aluno: AlunoModel) {
    try {
      const user = await this.fireAuth.currentUser;
      if (user?.uid) {
        await this.db.ref('DiasTreino').child(user.uid).child(aluno.id).child(id).update(this.formDiaTreino.value);
        this.formService.resetDataForm();
        this.alertService.showAlert('Salvo com sucesso!', 'Suas alterações foram salvas com sucesso.');
        this.navCtrl.back();
      } else {
        this.navCtrl.navigateBack('login');
      }
    } catch (error: any) {
      this.alertService.showToast('Erro ao criar cadastro: ' + error?.message);
    }
  }

  async showAlertRemove(data: DiaTreinoModel, aluno: AlunoModel) {
    const alert = await this.alertCtrl.create({
      header: 'Deseja excluir?',
      subHeader: data.dia,
      message: 'Ao confirmar, será excluído.',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {},
        },
        {
          text: 'Excluir',
          handler: () => this.remove(data.id, aluno),
        },
      ],
    });
    await alert.present();
  }

  async remove(id: string, aluno: AlunoModel) {
    try {
      const user = await this.fireAuth.currentUser;
      if (user?.uid) {
        await this.db.ref('DiasTreino').child(user.uid).child(aluno.id).child(id).remove();
        this.alertService.showToast('Excluído com sucesso!');
      } else {
        this.navCtrl.navigateBack('login');
      }
    } catch (error: any) {
      this.alertService.showToast('Erro ao excluir cadastro: ' + error?.message);
    }
  }
}
