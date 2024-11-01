import {
  Component,
  OnInit
} from '@angular/core';
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
  professor: ProfessorModel | undefined;
  listAlunos: AlunoModel[] = [];
  isShrunk = false;
  isMobile = this.platform.is('mobile');
  listObjetivos = this.formService.listObjetivos;
  listConteudos = this.formService.listEnfaseMusculos;

  constructor(
    private navCtrl: NavController,
    private cadastroAlunoService: CadastroAlunoService,
    private dadosProfessorService: DadosProfessorService,
    private formService: FormService,
    private authService: AuthService,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.initializeData();
  }

  ionViewDidEnter() {
    this.loadProfessorData();
    this.loadAlunosData();
  }

  private initializeData() {
    this.isShrunk = true;
  }

  private loadProfessorData() {
    this.dadosProfessorService.getData();
    this.dadosProfessorService.professor.subscribe((data) => {
      this.professor = data;
    });
  }

  private loadAlunosData() {
    this.cadastroAlunoService.getData();
    this.cadastroAlunoService.listAlunos.subscribe((list) => {
      this.listAlunos = list;
    });
  }

  isDayShare(): boolean {
    const currentDate = moment();
    return currentDate.date() >= 1 && currentDate.date() <= 15;
  }

  onClickOpenInstagram() {
    this.dadosProfessorService.openInstagram();
  }

  onClickEdit(data: AlunoModel) {
    this.navigateToCadastroAluno(data);
  }

  onClickNew() {
    this.navigateToCadastroAluno(undefined);
  }

  private navigateToCadastroAluno(data?: AlunoModel) {
    this.cadastroAlunoService.bsAluno.next(data);
    this.navCtrl.navigateForward('cadastro-aluno');
  }

  onClickRemove(data: AlunoModel) {
    this.cadastroAlunoService.showAlertRemove(data);
  }

  onClickExit() {
    this.signOut();
  }

  onClickSignOut() {
    this.signOut();
  }

  private signOut() {
    this.authService.signOutAccount();
  }
}
