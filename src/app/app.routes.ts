import { Routes } from '@angular/router';
import { InitialScreen } from './feature/pages/initial-screen/initial-screen';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./shared/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./shared/auth/register/register').then((m) => m.Register),
  },
  {
    path: 'home',
    component: InitialScreen,
  },
];
