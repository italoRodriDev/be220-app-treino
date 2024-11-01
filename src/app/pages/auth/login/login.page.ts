import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormService } from 'src/app/services/forms/form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formSignIn: FormGroup = this.formService.formSignIn;
  isLoading = false;
  typePersistence = 'session';
  viewPass = false;

  constructor(
    private authService: AuthService,
    private formService: FormService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  onChangePersistenceAuth(ev: any) {
    this.typePersistence = ev.detail.checked ? 'local' : 'session';
  }

  onClickSignUp() {
    this.navigateTo('cadastro');
  }

  onClickRecoverPassword() {
    this.navigateTo('recuperacao');
  }

  onClickContinue() {
    this.isLoading = true;
    this.authService.signIn().then((loading) => {
      this.isLoading = loading;
    });
  }

  private navigateTo(page: string) {
    this.navCtrl.navigateForward(page);
  }
}
