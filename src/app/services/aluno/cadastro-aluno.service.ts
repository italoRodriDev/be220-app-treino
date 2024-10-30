import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormGroup } from '@angular/forms';
import { AlertsService } from '../alerts/alerts.service';
import { FormService } from '../forms/form.service';
import { BehaviorSubject } from 'rxjs';
import { AlunoModel } from 'src/app/models/aluno.model';
import { AlertController, NavController } from '@ionic/angular';

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
  ) {}

  getData() {
    this.fireAuth.currentUser
      .then((user) => {
        if (user) {
          this.db
            .ref('Alunos')
            .child(user.uid)
            .on('value', (snapshot) => {
              const data = snapshot.val();
              this.bsAlunos.next([]);
              if (data) {
                const array = Object.keys(data).map((index) => data[index]);
                this.bsAlunos.next(array);
              }
            });
        } else {
          this.navCtrl.navigateBack('login');
        }
      })
      .catch((error) => {
        this.alertService.showToast('Erro: ' + error.code);
      });
  }

  validFormData() {
    if (this.formAluno.valid) {
      const currentID = this.formAluno.controls['id'].value;
      if (currentID != null) {
        this.saveData(currentID);
      } else {
        const id = this.fireDatabase.createPushId();
        this.formAluno.patchValue({
          id: id,
        });
        this.saveData(id);
      }
    } else {
      this.alertService.showToast('Preencha todos os dados');
    }
  }

  saveData(id: string) {
    this.fireAuth.currentUser
      .then((user) => {
        if (user?.uid != null) {
          this.db
            .ref('Alunos')
            .child(user.uid)
            .child(id)
            .update(this.formAluno.value)
            .then((value) => {
              this.formService.resetDataForm();
              this.alertService.showAlert(
                'Salvo com sucesso!',
                'Suas alterações foram salvas com sucesso.'
              );
              this.navCtrl.back();
            })
            .catch((error) => {
              this.alertService.showToast('Erro ao criar cadastro!');
            });
        } else {
          this.navCtrl.navigateBack('login');
        }
      })
      .catch((error) => {
        this.alertService.showToast('Erro: ' + error.code);
      });
  }

  async showAlertRemove(data: AlunoModel) {
    const alert = await this.alertCtrl.create({
      header: 'Deseja excluir?',
      subHeader: data.nome,
      message: 'Ao confirmar será excluído.',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {},
        },
        {
          text: 'Excluir',
          handler: () => {
            this.remove(data?.id);
          },
        },
      ],
    });
    alert.present();
  }

  remove(id: string) {
    this.fireAuth.currentUser
      .then((user) => {
        if (user?.uid != null) {
          this.db
            .ref('Alunos')
            .child(user.uid)
            .child(id)
            .remove()
            .then((value) => {
              this.db.ref('DiasTreino').child(user.uid).child(id).remove();
              this.db.ref('Exercicios').child(user.uid).child(id).remove();
              this.alertService.showToast('Excludo com sucesso!');
            })
            .catch((error) => {
              this.alertService.showToast('Erro ao excluir cadastro!');
            });
        } else {
          this.navCtrl.navigateBack('login');
        }
      })
      .catch((error) => {
        this.alertService.showToast('Erro: ' + error.code);
      });
  }
}
