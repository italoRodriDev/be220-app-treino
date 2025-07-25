import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
const userNotAuthorized = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'bem-vindo',
    pathMatch: 'full',
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/auth/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'cadastro',
    loadChildren: () =>
      import('./pages/auth/signup/signup.module').then(
        (m) => m.SignupPageModule
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    canActivate: [AngularFireAuthGuard],
    data: { userNotAuthorized },
  },
  {
    path: 'cadastro-aluno',
    loadChildren: () =>
      import('./pages/aluno/cadastro-aluno/cadastro-aluno.module').then(
        (m) => m.CadastroAlunoPageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { userNotAuthorized },
  },
  {
    path: 'cadastro-dia-treino',
    loadChildren: () =>
      import(
        './pages/aluno/cadastro-dia-treino/cadastro-dia-treino.module'
      ).then((m) => m.CadastroDiaTreinoPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { userNotAuthorized },
  },
  {
    path: 'cadastro-exercicios',
    loadChildren: () =>
      import(
        './pages/aluno/cadastro-exercicios/cadastro-exercicios.module'
      ).then((m) => m.CadastroExerciciosPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { userNotAuthorized },
  },
  {
    path: 'termos-de-uso',
    loadChildren: () =>
      import('./pages/auth/termos-de-uso/termos-de-uso.module').then(
        (m) => m.TermosDeUsoPageModule
      ),
  },
  {
    path: 'dados-aluno/:id',
    loadChildren: () =>
      import('./pages/aluno/dados-aluno/dados-aluno.module').then(
        (m) => m.DadosAlunoPageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { userNotAuthorized },
  },
  {
    path: 'dados-dia-treino',
    loadChildren: () =>
      import('./pages/aluno/dados-dia-treino/dados-dia-treino.module').then(
        (m) => m.DadosDiaTreinoPageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { userNotAuthorized },
  },
  {
    path: 'dados-exercicios',
    loadChildren: () =>
      import('./pages/aluno/dados-exercicios/dados-exercicios.module').then(
        (m) => m.DadosExerciciosPageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { userNotAuthorized },
  },
  {
    path: 'bem-vindo',
    loadChildren: () => import('./pages/bem-vindo/bem-vindo.module').then( m => m.BemVindoPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
