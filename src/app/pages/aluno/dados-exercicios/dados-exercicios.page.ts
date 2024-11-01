import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlunoModel } from 'src/app/models/aluno.model';
import { DiaTreinoModel } from 'src/app/models/dia-treino.model';
import { ExercicioModel } from 'src/app/models/exercicio.model';
import { DadosAlunoService } from 'src/app/services/aluno/dados-aluno.service';
import { FormService } from 'src/app/services/forms/form.service';
import { DadosDiaTreinoService } from './../../../services/aluno/dados-dia-treino.service';
import { DadosExerciciosService } from './../../../services/aluno/dados-exercicios.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dados-exercicios',
  templateUrl: './dados-exercicios.page.html',
  styleUrls: ['./dados-exercicios.page.scss'],
})
export class DadosExerciciosPage implements OnInit {
  aluno: AlunoModel | undefined;
  diaTreino: DiaTreinoModel | undefined;
  exercicio: ExercicioModel | undefined;
  listDiaTreino: Array<any> = this.formService.listDiasSemana;
  listDoencasCronicas: Array<any> = this.formService.listDoencasCronicas;
  listEnfase: Array<any> = this.formService.listEnfaseMusculos;
  blockEdit: boolean = false;

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
      }
    });
  
    // Inscrevendo-se para dia de treino
    const diaTreinoSubscription = this.dadosDiaTreinoService.diaTreino.subscribe((data) => {
      if (data) {
        this.diaTreino = data;
      }
    });
  
    // Inscrevendo-se para exercício
    const exercicioSubscription = this.dadosExercicioService.exercicio.subscribe((data) => {
      if (data) {
        this.exercicio = data;
      } else {
        this.blockEdit = false; // Se não houver exercício, libera o bloco de edição
      }
    });
  
    this.subscriptions.add(alunoSubscription);
    this.subscriptions.add(diaTreinoSubscription);
    this.subscriptions.add(exercicioSubscription);
  }

  onClickBack() {
    this.navCtrl.back();
  }
}
