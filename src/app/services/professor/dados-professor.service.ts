import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NavController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ProfessorModel } from 'src/app/models/professor.model';
import { AlertsService } from '../alerts/alerts.service';

@Injectable({
  providedIn: 'root',
})
export class DadosProfessorService {
  db = this.fireDatabase.database;
  public bsProfessor = new BehaviorSubject<ProfessorModel | undefined>(undefined);
  professor = this.bsProfessor.asObservable();

  constructor(
    private fireAuth: AngularFireAuth,
    private fireDatabase: AngularFireDatabase,
    private platform: Platform, // Corrigido aqui
    private navCtrl: NavController,
    private alertService: AlertsService
  ) {}

  async getData() {
    try {
      const user = await this.fireAuth.currentUser;
      if (user?.uid) {
        const snapshot = await this.db.ref('Professor').child(user.uid).once('value');
        const data = snapshot.val();
        if (data) {
          this.bsProfessor.next(data);
        }
      } else {
        this.navCtrl.navigateBack('login');
      }
    } catch (error) {
      this.alertService.showToast('Erro: ' + error);
    }
  }

  openInstagram() {
    // Verifica se o dispositivo é um celular
    const isAndroid = this.platform.is('android');
    const isIos = this.platform.is('ios');

    // URL do perfil do Instagram
    const instagramURL = 'https://www.instagram.com/cyberpump_oficial/';

    // Se for um dispositivo móvel, abre o aplicativo do Instagram, caso contrário, abre a página no navegador
    if (isAndroid || isIos) {
      // Abre o aplicativo do Instagram
      window.location.href = 'instagram://user?username=cyberpump_oficial';
    } else {
      // Abre a página do perfil do Instagram no navegador
      window.open(instagramURL, '_blank');
    }
  }
}
