import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AlunoModel } from 'src/app/models/aluno.model';
import { DiaTreinoModel } from 'src/app/models/dia-treino.model';
import { ExercicioModel } from 'src/app/models/exercicio.model';
import { CadastroAlunoService } from 'src/app/services/aluno/cadastro-aluno.service';
import { CadastroDiaTreinoService } from 'src/app/services/aluno/cadastro-dia-treino.service';
import { CadastroExerciciosService } from 'src/app/services/aluno/cadastro-exercicios.service';
import { FormService } from 'src/app/services/forms/form.service';

@Component({
  selector: 'app-cadastro-exercicios',
  templateUrl: './cadastro-exercicios.page.html',
  styleUrls: ['./cadastro-exercicios.page.scss'],
})
export class CadastroExerciciosPage implements OnInit {
  form: FormGroup = this.formService.formExercicio;
  aluno: AlunoModel | undefined;
  diaTreino: DiaTreinoModel | undefined;
  exercicio: ExercicioModel | undefined;
  listDiaTreino: Array<any> = this.formService.listDiasSemana;
  listDoencasCronicas: Array<any> = this.formService.listDoencasCronicas;
  listEnfase: Array<any> = this.formService.listEnfaseMusculos;
  gifList: string[] = [];
  blockEdit: boolean = false;

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
    this.getGifs();
    this.getDataService();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getGifs() {
    const basePath = 'assets/gifs/';
    const totalGifs = 354; // de 0 a 353

    for (let i = 0; i < totalGifs; i++) {
      this.gifList.push(`${basePath}im_ex${i}.gif`);
    }
    this.removeGif();
  }

  getDataService() {
    // Inscreve-se para os dados do aluno
    const alunoSubscription = this.cadastroAlunoService.aluno.subscribe(
      (data) => {
        if (data) {
          this.aluno = data;
        }
      }
    );

    // Inscreve-se para os dados do dia de treino
    const diaTreinoSubscription =
      this.cadastroDiaTreinoService.diaTreino.subscribe((data) => {
        if (data) {
          this.diaTreino = data;
        }
      });

    // Inscreve-se para os dados do exercício
    const exercicioSubscription =
      this.cadastroExercicioService.exercicio.subscribe((data) => {
        if (data) {
          this.exercicio = data;
          this.setDataForm();
        } else {
          this.blockEdit = false;
        }
      });

    // Adiciona as inscrições à lista de subscrições
    this.subscriptions.add(alunoSubscription);
    this.subscriptions.add(diaTreinoSubscription);
    this.subscriptions.add(exercicioSubscription);
  }

  setDataForm() {
    this.blockEdit = true;
    this.form.patchValue(this.exercicio!);
  }

  onClickSave() {
    this.cadastroExercicioService.validFormData(this.aluno!, this.diaTreino!);
  }

  onClickEdit() {
    this.blockEdit = !this.blockEdit;
  }

  onClickBack() {
    this.navCtrl.back();
  }

  onClickGif(gif: string) {
    this.form.patchValue({ gif: gif });
  }

  removeGif() {
    this.form.patchValue({ gif: '' });
  }
}
