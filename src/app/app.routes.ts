import { Routes } from '@angular/router';
import { Login } from './shared/auth/login/login';
import { Register } from './shared/auth/register/register';
import { InitialScreen } from './feature/pages/initial-screen/initial-screen';
import { AuthGuard } from './core/guards/auth';
import { MainLayout } from './shared/layout/main-layout/main-layout';

export const routes: Routes = [
    {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./shared/auth/login/login')
            .then(m => m.Login),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./shared/auth/register/register')
            .then(m => m.Register),
      },
    ],
  },
  {
    path: 'home',
    component: InitialScreen,
    canActivate: [AuthGuard],
  },
];
