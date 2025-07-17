import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AlunoModel } from 'src/app/models/aluno.model';
import { DiaTreinoModel } from 'src/app/models/dia-treino.model';
import { ExercicioModel } from 'src/app/models/exercicio.model';
import { CadastroAlunoService } from 'src/app/services/aluno/cadastro-aluno.service';
import { CadastroDiaTreinoService } from 'src/app/services/aluno/cadastro-dia-treino.service';
import { CadastroExerciciosService } from 'src/app/services/aluno/cadastro-exercicios.service';
import { FormService } from 'src/app/services/forms/form.service';

@Component({
  selector: 'app-cadastro-dia-treino',
  templateUrl: './cadastro-dia-treino.page.html',
  styleUrls: ['./cadastro-dia-treino.page.scss'],
})
export class CadastroDiaTreinoPage implements OnInit {
  form: FormGroup = this.formService.formDiaTreino;
  aluno: AlunoModel | undefined;
  diaTreino: DiaTreinoModel | undefined;
  listDiaTreino: Array<any> = this.formService.listDiasSemana;
  listDoencasCronicas: Array<any> = this.formService.listDoencasCronicas;
  listEnfase: Array<any> = this.formService.listEnfase;
  blockEdit: boolean = false;
  listExercicios: Array<ExercicioModel> = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private formService: FormService,
    private navCtrl: NavController,
    private cadastroAlunoService: CadastroAlunoService,
    private cadastroDiaTreinoService: CadastroDiaTreinoService,
    private cadastroExercicioService: CadastroExerciciosService
  ) {}

  ngOnInit() {
    this.formService.resetDataForm();
  }

  ionViewDidEnter() {
    this.getDataService();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getDataService() {
    // Inscreve-se para os dados do aluno
    const alunoSubscription = this.cadastroAlunoService.aluno.subscribe(
      (data) => {
        if (data) {
          this.aluno = data;
          this.loadExercicios(); // Carrega os exercícios quando o aluno é atualizado
        }
      }
    );

    // Inscreve-se para os dados do dia de treino
    const diaTreinoSubscription =
      this.cadastroDiaTreinoService.diaTreino.subscribe((data) => {
        if (data) {
          this.diaTreino = data;
          this.setDataForm();
          this.loadExercicios(); // Carrega os exercícios quando o dia de treino é atualizado
        } else {
          this.blockEdit = false; // Caso o dia de treino não seja válido
        }
      });

    // Adiciona as inscrições à lista de subscrições
    this.subscriptions.add(alunoSubscription);
    this.subscriptions.add(diaTreinoSubscription);
  }

  private loadExercicios() {
    if (this.aluno != null && this.diaTreino != null) {
      this.cadastroExercicioService.getData(this.aluno!, this.diaTreino!);
      const exercicioSubscription =
        this.cadastroExercicioService.bsExercicios.subscribe((list) => {
          this.listExercicios = list;
        });
      this.subscriptions.add(exercicioSubscription); // Adiciona a assinatura da lista de exercícios
    }
  }

  setDataForm() {
    this.blockEdit = true;
    this.form.patchValue(this.diaTreino!);
  }

  onClickSave() {
    this.cadastroDiaTreinoService.validFormData(this.aluno!);
  }

  onClickCadastroExercicio() {
    this.cadastroExercicioService.bsExercicio.next(undefined);
    this.navCtrl.navigateBack('cadastro-exercicios');
  }

  onClickEditarExercicio(data: ExercicioModel) {
    this.cadastroExercicioService.bsExercicio.next(data);
    this.navCtrl.navigateBack('cadastro-exercicios');
  }

  onClickExcluirExercicio(data: ExercicioModel) {
    this.cadastroExercicioService.showAlertRemove(
      this.aluno!,
      this.diaTreino!,
      data
    );
  }

  onClickEdit() {
    this.blockEdit = !this.blockEdit;
  }

  onClickBack() {
    this.navCtrl.back();
  }
}
