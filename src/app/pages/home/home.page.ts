import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import * as moment from 'moment';
import { AlunoModel } from 'src/app/models/aluno.model';
import { ProfessorModel } from 'src/app/models/professor.model';
import { CadastroAlunoService } from 'src/app/services/aluno/cadastro-aluno.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormService } from 'src/app/services/forms/form.service';
import { DadosProfessorService } from 'src/app/services/professor/dados-professor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('swiperSlides', { static: false }) swiperRef:
  | ElementRef
  | undefined;
 
  professor: ProfessorModel|undefined;
  listAlunos: Array<AlunoModel> = [];
  isShrunk: boolean = false;
  isMobile: boolean = this.platform.is('mobile');
  listObjetivos: Array<any> = this.formService.listObjetivos; 
  listConteudos: Array<any> = this.formService.listEnfaseMusculos;


  constructor(
    private navCtrl: NavController,
    private cadastroAlunoService: CadastroAlunoService,
    private dadosProfessorService: DadosProfessorService,
    private formService: FormService,
    private authService: AuthService,
    private platform: Platform
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.dadosProfessorService.getData();
    this.dadosProfessorService.professor.subscribe((data) => {
      this.isShrunk = true;
      this.professor = data;
      
    });

    this.cadastroAlunoService.getData();
    this.cadastroAlunoService.listAlunos.subscribe((list) => {
      this.listAlunos = list;
    });
  }

  isDayShare(): boolean {
    // Obtém a data atual
    const currentDate = moment();

    // Verifica se a data atual está entre os dias 20 e 28 do mês
    const isBetweenDates = currentDate.date() >= 1 && currentDate.date() <= 15;

    return isBetweenDates;
  }

  onClickOpenInstagram() {
    this.dadosProfessorService.openInstagram();
  }

  onClickEdit(data: AlunoModel) {
    this.cadastroAlunoService.bsAluno.next(data);
    this.navCtrl.navigateForward('cadastro-aluno');
  }

  onClickNew() {
    this.cadastroAlunoService.bsAluno.next(undefined);
    this.navCtrl.navigateForward('cadastro-aluno');
  }

  onClickRemove(data: AlunoModel) {
    this.cadastroAlunoService.showAlertRemove(data);
  }

  onClickExit() {
    this.authService.signOutAccount();
  }

  onClickSignOut() {
    this.authService.signOutAccount();
  }
}
