import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AlunoModel } from 'src/app/models/aluno.model';
import { DiaTreinoModel } from 'src/app/models/dia-treino.model';
import { ExercicioModel } from 'src/app/models/exercicio.model';
import { DadosAlunoService } from 'src/app/services/aluno/dados-aluno.service';
import { DadosDiaTreinoService } from 'src/app/services/aluno/dados-dia-treino.service';
import { DadosExerciciosService } from 'src/app/services/aluno/dados-exercicios.service';
import { FormService } from 'src/app/services/forms/form.service';

@Component({
  selector: 'app-dados-dia-treino',
  templateUrl: './dados-dia-treino.page.html',
  styleUrls: ['./dados-dia-treino.page.scss'],
})
export class DadosDiaTreinoPage implements OnInit {
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
    private dadosAlunoService: DadosAlunoService,
    private dadosDiaTreinoService: DadosDiaTreinoService,
    private dadosExercicioService: DadosExerciciosService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.getDataService();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe(); 
  }

  getDataService() {
    // Inscrevendo-se para aluno
    const alunoSubscription = this.dadosAlunoService.aluno.subscribe((data) => {
      if (data) {
        this.aluno = data;
        this.checkAndFetchExercicios(); // Verifica se pode buscar exercícios
      }
    });

    // Inscrevendo-se para dia de treino
    const diaTreinoSubscription =
      this.dadosDiaTreinoService.diaTreino.subscribe((data) => {
        if (data) {
          this.diaTreino = data;
          this.checkAndFetchExercicios(); // Verifica se pode buscar exercícios
        } else {
          this.blockEdit = false;
        }
      });

    // Adicionando as inscrições ao gerenciamento
    this.subscriptions.add(alunoSubscription);
    this.subscriptions.add(diaTreinoSubscription);
  }

  private checkAndFetchExercicios() {
    if (this.aluno && this.diaTreino) {
      this.dadosExercicioService.getData(this.aluno, this.diaTreino);
      const exercicioSubscription =
        this.dadosExercicioService.bsExercicios.subscribe((list) => {
          this.listExercicios = list;
        });
      this.subscriptions.add(exercicioSubscription); // Adiciona a inscrição da lista de exercícios
    }
  }

  onClickEditarExercicio(data: ExercicioModel) {
    this.dadosExercicioService.bsExercicio.next(data);
    this.navCtrl.navigateBack('dados-exercicios');
  }

  onClickBack() {
    this.navCtrl.back();
  }
}
