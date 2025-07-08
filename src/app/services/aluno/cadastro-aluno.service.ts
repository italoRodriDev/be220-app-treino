import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormGroup } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AlunoModel } from 'src/app/models/aluno.model';
import { AlertsService } from '../alerts/alerts.service';
import { FormService } from '../forms/form.service';

@Injectable({
  providedIn: 'root',
})
export class CadastroAlunoService {
  formAluno: FormGroup = this.formService.formAluno;
  db = this.fireDatabase.database;
  public bsAlunos = new BehaviorSubject<Array<any>>([]);
  listAlunos = this.bsAlunos.asObservable();

  public bsAluno = new BehaviorSubject<AlunoModel | undefined>(undefined);
  aluno = this.bsAluno.asObservable();

  constructor(
    private fireDatabase: AngularFireDatabase,
    private fireAuth: AngularFireAuth,
    private formService: FormService,
    private alertService: AlertsService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {
    this.getData();
  }

  async getData() {
    try {
      const user = await this.fireAuth.currentUser;
      if (user) {
        this.db
          .ref('Alunos')
          .child(user.uid)
          .on('value', (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            this.bsAlunos.next([]);
            if (data) {
              const array = Object.keys(data).map((key) => data[key]);
              this.bsAlunos.next(array);
            }
          });
      } else {
        this.navCtrl.navigateBack('login');
      }
    } catch (error: any) {
      this.alertService.showToast('Erro ao obter dados: ' + error?.message);
    }
  }

  validFormData() {
    if (this.formAluno.valid) {
      const currentID = this.formAluno.controls['id'].value;
      if (currentID) {
        this.saveData(currentID);
      } else {
        const id = this.fireDatabase.createPushId();
        this.formAluno.patchValue({ id: id });
        this.saveData(id);
      }
    } else {
      this.alertService.showToast('Preencha todos os dados');
    }
  }

  async saveData(id: string) {
    try {
      const user = await this.fireAuth.currentUser;
      if (user?.uid) {
        await this.db
          .ref('Alunos')
          .child(user.uid)
          .child(id)
          .update(this.formAluno.value);
        this.formService.resetDataForm();
        this.alertService.showAlert(
          'Salvo com sucesso!',
          'Suas alterações foram salvas com sucesso.'
        );
        this.navCtrl.back();
      } else {
        this.navCtrl.navigateBack('login');
      }
    } catch (error: any) {
      this.alertService.showToast('Erro ao criar cadastro: ' + error?.message);
    }
  }

  async showAlertRemove(data: AlunoModel) {
    const alert = await this.alertCtrl.create({
      header: 'Deseja excluir?',
      subHeader: data.nome,
      message: 'Ao confirmar, será excluído.',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {},
        },
        {
          text: 'Excluir',
          handler: () => this.remove(data.id),
        },
      ],
    });
    await alert.present(); // Certifique-se de aguardar a apresentação do alerta
  }

  async remove(id: string) {
    try {
      const user = await this.fireAuth.currentUser;
      if (user?.uid) {
        await this.db.ref('Alunos').child(user.uid).child(id).remove();
        await this.db.ref('DiasTreino').child(user.uid).child(id).remove();
        await this.db.ref('Exercicios').child(user.uid).child(id).remove();
        this.alertService.showToast('Excluído com sucesso!');
      } else {
        this.navCtrl.navigateBack('login');
      }
    } catch (error: any) {
      this.alertService.showToast(
        'Erro ao excluir cadastro: ' + error?.message
      );
    }
  }
}
